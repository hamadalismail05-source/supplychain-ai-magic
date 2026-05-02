import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT =
  "You are an autonomous supply chain agent for a hospital. You will be given a surgery requirement and current inventory. Calculate the shortfall. Return ONLY a JSON object with sku, supplier (choose a realistic medical supplier), and quantity_to_order.";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");
    if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase env not configured");

    const body = await req.json().catch(() => ({}));
    const { surgery_id, surgeon_name } = body ?? {};

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // 1. Look up the surgery row
    let surgeryQuery = supabase
      .from("surgical_schedule")
      .select("id, or_room, surgeon_name, procedure_name, required_sku, status");
    if (surgery_id) {
      surgeryQuery = surgeryQuery.eq("id", surgery_id);
    } else if (surgeon_name) {
      surgeryQuery = surgeryQuery.eq("surgeon_name", surgeon_name);
    } else {
      surgeryQuery = surgeryQuery.ilike("status", "%critical%");
    }
    const { data: surgery, error: sErr } = await surgeryQuery.maybeSingle();
    if (sErr) throw sErr;
    if (!surgery) {
      return new Response(
        JSON.stringify({ error: "Surgery not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Look up current stock for that SKU
    const { data: stock } = await supabase
      .from("inventory_stock")
      .select("sku, item_name, quantity")
      .eq("sku", surgery.required_sku)
      .maybeSingle();

    const currentQty = stock?.quantity ?? 0;
    const itemName = stock?.item_name ?? surgery.required_sku;

    // 3. Ask the LLM to compute the order
    const userPrompt = `Surgery: ${surgery.procedure_name} in ${surgery.or_room} for ${surgery.surgeon_name}.
Required SKU: ${surgery.required_sku} (${itemName}).
Units required for the case: 1.
Current inventory on hand: ${currentQty} units.
Buffer policy: order at least 3 units when restocking implants.

Return ONLY JSON: { "sku": string, "supplier": string, "quantity_to_order": number }.`;

    const aiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      }),
    });

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      console.error("OpenAI error:", aiResp.status, txt);
      return new Response(
        JSON.stringify({ error: "AI provider error", detail: txt }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiJson = await aiResp.json();
    const raw = aiJson.choices?.[0]?.message?.content ?? "{}";
    let parsed: { sku?: string; supplier?: string; quantity_to_order?: number } = {};
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse LLM JSON:", raw);
      return new Response(
        JSON.stringify({ error: "Invalid LLM response", raw }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const sku = parsed.sku || surgery.required_sku;
    const supplier = parsed.supplier || "Stryker";
    const quantity =
      typeof parsed.quantity_to_order === "number" && parsed.quantity_to_order > 0
        ? Math.floor(parsed.quantity_to_order)
        : 3;

    // 4. Insert the dynamic PO
    const { data: inserted, error: insErr } = await supabase
      .from("purchase_orders")
      .insert({
        generated_for_sku: sku,
        quantity_ordered: quantity,
        supplier,
        status: "Drafted",
      })
      .select()
      .maybeSingle();
    if (insErr) throw insErr;

    return new Response(
      JSON.stringify({
        ok: true,
        purchase_order: inserted,
        ai: { sku, supplier, quantity_to_order: quantity },
        surgery: { id: surgery.id, or_room: surgery.or_room, required_sku: surgery.required_sku },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("agent-resolution error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});