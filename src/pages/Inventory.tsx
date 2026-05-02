import { useEffect, useState } from "react";
import { Boxes, Loader2, PackageCheck, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type StockItem = {
  id: string;
  sku: string;
  item_name: string;
  quantity: number;
};

const Inventory = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [drafts, setDrafts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inventory_stock")
      .select("id, sku, item_name, quantity")
      .order("item_name", { ascending: true });
    if (!error && data) {
      setItems(data as StockItem[]);
      const next: Record<string, number> = {};
      (data as StockItem[]).forEach((i) => (next[i.id] = i.quantity));
      setDrafts(next);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (item: StockItem) => {
    const next = drafts[item.id];
    if (next === undefined || Number.isNaN(next)) {
      toast.error("Enter a valid quantity");
      return;
    }
    setSavingId(item.id);
    const { error } = await supabase
      .from("inventory_stock")
      .update({ quantity: next })
      .eq("id", item.id);
    setSavingId(null);
    if (error) {
      toast.error("Failed to update stock");
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: next } : i)));
    toast.success(`${item.item_name} updated to ${next} units.`);
  };

  const lowCount = items.filter((i) => i.quantity <= 0).length;

  return (
    <DashboardLayout alertCount={lowCount}>
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live stock levels across every tracked SKU.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Boxes className="h-3 w-3" />
          {items.length} SKUs tracked
        </span>
      </div>

      <section className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium">Current</th>
                <th className="px-5 py-3 font-medium">Adjust Stock</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                    Loading inventory…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    No items tracked yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const draft = drafts[item.id] ?? item.quantity;
                  const dirty = draft !== item.quantity;
                  const low = item.quantity <= 0;
                  return (
                    <tr key={item.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                      <td className="px-5 py-4 text-foreground font-medium">{item.item_name}</td>
                      <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{item.sku}</td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            low
                              ? "bg-danger-soft text-danger border-danger/20"
                              : "bg-success-soft text-success border-success/20"
                          )}
                        >
                          <PackageCheck className="h-3 w-3" />
                          {item.quantity} in stock
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min={0}
                          value={Number.isNaN(draft) ? "" : draft}
                          onChange={(e) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [item.id]: parseInt(e.target.value, 10),
                            }))
                          }
                          className="w-24 rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => save(item)}
                          disabled={!dirty || savingId === item.id}
                          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {savingId === item.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Save className="h-3 w-3" />
                          )}
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Inventory;