-- inventory_stock
CREATE TABLE public.inventory_stock (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sku text NOT NULL,
  item_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.inventory_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read inventory_stock" ON public.inventory_stock FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert inventory_stock" ON public.inventory_stock FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update inventory_stock" ON public.inventory_stock FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete inventory_stock" ON public.inventory_stock FOR DELETE TO anon, authenticated USING (true);

-- surgical_schedule
CREATE TABLE public.surgical_schedule (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  or_room text NOT NULL,
  surgeon_name text NOT NULL,
  procedure_name text NOT NULL,
  required_sku text NOT NULL,
  status text NOT NULL DEFAULT 'Critical Risk',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.surgical_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read surgical_schedule" ON public.surgical_schedule FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert surgical_schedule" ON public.surgical_schedule FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update surgical_schedule" ON public.surgical_schedule FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete surgical_schedule" ON public.surgical_schedule FOR DELETE TO anon, authenticated USING (true);

-- purchase_orders
CREATE TABLE public.purchase_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generated_for_sku text NOT NULL,
  quantity_ordered integer NOT NULL DEFAULT 0,
  supplier text NOT NULL,
  status text NOT NULL DEFAULT 'Drafted',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read purchase_orders" ON public.purchase_orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert purchase_orders" ON public.purchase_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update purchase_orders" ON public.purchase_orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete purchase_orders" ON public.purchase_orders FOR DELETE TO anon, authenticated USING (true);

-- updated_at trigger (reuse existing helper if present, else create)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_inventory_stock_updated BEFORE UPDATE ON public.inventory_stock
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_surgical_schedule_updated BEFORE UPDATE ON public.surgical_schedule
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_purchase_orders_updated BEFORE UPDATE ON public.purchase_orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed data
INSERT INTO public.inventory_stock (sku, item_name, quantity)
VALUES ('SKU-7782', 'Titanium Femoral Stem · Size 12', 0);

INSERT INTO public.surgical_schedule (or_room, surgeon_name, procedure_name, required_sku, status)
VALUES ('OR-4', 'Dr. Patel', 'Total Hip Arthroplasty', 'SKU-7782', 'Critical Risk');