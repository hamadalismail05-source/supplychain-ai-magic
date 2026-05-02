import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertOctagon,
  CalendarDays,
  CheckCircle2,
  Loader2,
  PackageCheck,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type ScheduleRow = {
  id: string;
  or_room: string;
  surgeon_name: string;
  procedure_name: string;
  required_sku: string;
  status: string;
};

type PendingOrder = {
  id: string;
  generated_for_sku: string;
  quantity_ordered: number;
  supplier: string;
  status: string;
  created_at: string;
};

const statusStyle = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("critical") || s.includes("risk")) {
    return "bg-danger-soft text-danger border-danger/20";
  }
  if (s.includes("review") || s.includes("warn")) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  return "bg-success-soft text-success border-success/20";
};

const rowAccent = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("critical") || s.includes("risk")) return "before:bg-danger";
  if (s.includes("review") || s.includes("warn")) return "before:bg-amber-400";
  return "before:bg-success";
};

const Dashboard = () => {
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const loadSchedule = async () => {
    setLoadingSchedule(true);
    const { data, error } = await supabase
      .from("surgical_schedule")
      .select("id, or_room, surgeon_name, procedure_name, required_sku, status")
      .order("created_at", { ascending: true });
    if (!error && data) setSchedule(data as ScheduleRow[]);
    setLoadingSchedule(false);
  };

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from("purchase_orders")
      .select("id, generated_for_sku, quantity_ordered, supplier, status, created_at")
      .eq("status", "Drafted")
      .order("created_at", { ascending: false });
    if (!error && data) setPendingOrders(data as PendingOrder[]);
  };

  useEffect(() => {
    loadSchedule();
    loadOrders();
  }, []);

  const approve = async (id: string) => {
    setApprovingId(id);
    const { data: po, error } = await supabase
      .from("purchase_orders")
      .update({ status: "Approved" })
      .eq("id", id)
      .select("generated_for_sku")
      .maybeSingle();
    if (error) {
      setApprovingId(null);
      toast.error("Failed to approve order");
      return;
    }

    const sku = po?.generated_for_sku ?? "SKU-7782";
    await supabase
      .from("surgical_schedule")
      .update({ status: "Ready" })
      .eq("or_room", "OR-4")
      .eq("required_sku", sku);

    setApprovingId(null);
    toast.success("PO Approved & Sent to Supplier");
    await Promise.all([loadOrders(), loadSchedule()]);
  };

  const reject = async (id: string) => {
    setApprovingId(id);
    const { error } = await supabase
      .from("purchase_orders")
      .update({ status: "Rejected" })
      .eq("id", id);
    setApprovingId(null);
    if (error) {
      toast.error("Failed to reject order");
      return;
    }
    setPendingOrders((prev) => prev.filter((p) => p.id !== id));
    toast.warning("PO Rejected. Alerting OR Coordinator for manual intervention.");
  };


  const criticalCount = useMemo(
    () => schedule.filter((r) => r.status.toLowerCase().includes("critical") || r.status.toLowerCase().includes("risk")).length,
    [schedule]
  );

  const inventoryHealth = useMemo(() => {
    if (schedule.length === 0) return 100;
    const healthy = schedule.length - criticalCount;
    return Math.round((healthy / schedule.length) * 100);
  }, [schedule, criticalCount]);

  const fallbackPending = pendingOrders.length === 0;

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <Link to="/" className="h-16 flex items-center px-5 border-b border-border hover:bg-secondary/50 transition-colors">
          <Logo asLink={false} />
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/dashboard";
            if (!active) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={lockedModule}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground text-left"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            }
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-3 w-3 rotate-180" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search SKU, surgeon, OR…"
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toast.info("Global search indexing in progress.");
                    (e.target as HTMLInputElement).blur();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.success("All alerts caught up.")}
              className="relative h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border hover:bg-secondary"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              {criticalCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-danger text-[10px] font-semibold text-danger-foreground inline-flex items-center justify-center">
                  {criticalCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-semibold">
                AS
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-foreground">Admin · St. Mary's</div>
                <div className="text-[10px] text-muted-foreground">Hospital Administrator</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-x-hidden">
          {/* Heading */}
          <div className="flex items-end justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Command Center
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Live operational view of your surgical pipeline & autonomous agents.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              All agents online
            </span>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Total Surgeries (7 Days)
                </span>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-foreground">142</span>
                <span className="inline-flex items-center text-xs font-medium text-success">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +8.2%
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">vs. previous week</div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Inventory Health
                </span>
                <PackageCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-foreground">{inventoryHealth}%</span>
                <span className="text-xs font-medium text-muted-foreground">SKUs ready</span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-success transition-all"
                  style={{ width: `${inventoryHealth}%` }}
                />
              </div>
            </div>

            <div className={cn(
              "rounded-xl border p-5 shadow-sm",
              criticalCount > 0
                ? "border-danger/30 bg-danger-soft/60"
                : "border-border bg-card"
            )}>
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-xs uppercase tracking-wider font-medium",
                  criticalCount > 0 ? "text-danger" : "text-muted-foreground"
                )}>
                  AI Alerts
                </span>
                <ShieldAlert className={cn(
                  "h-4 w-4",
                  criticalCount > 0 ? "text-danger" : "text-muted-foreground"
                )} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className={cn(
                  "text-3xl font-semibold",
                  criticalCount > 0 ? "text-danger" : "text-foreground"
                )}>
                  {criticalCount}
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  criticalCount > 0 ? "text-danger" : "text-muted-foreground"
                )}>
                  {criticalCount === 1 ? "Shortage Detected" : "Shortages Detected"}
                </span>
              </div>
              <div className={cn(
                "mt-2 text-xs",
                criticalCount > 0 ? "text-danger/80" : "text-muted-foreground"
              )}>
                {criticalCount > 0 ? "Review pending PO below" : "All cases stocked"}
              </div>
            </div>
          </div>

          {/* Approvals */}
          <section className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  AI Drafted Orders Pending Approval
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {pendingOrders.length || 1} awaiting review
              </span>
            </div>

            <div className="p-5 space-y-3">
              {fallbackPending ? (
                <ApprovalCard
                  title="Titanium Femoral Stem · Size 12"
                  sku="SKU-7782"
                  qty={3}
                  supplier="Stryker"
                  reason="Required by Dr. Patel · OR-4 · Total Hip Arthroplasty"
                  pending
                  disabled
                  onApprove={() => toast.message("Run the simulation on the landing page to draft a PO")}
                />
              ) : (
                pendingOrders.map((po) => (
                  <ApprovalCard
                    key={po.id}
                    title="Titanium Femoral Stem · Size 12"
                    sku={po.generated_for_sku}
                    qty={po.quantity_ordered}
                    supplier={po.supplier}
                    reason="Required by Dr. Patel · OR-4 · Total Hip Arthroplasty"
                    pending
                    loading={approvingId === po.id}
                    onApprove={() => approve(po.id)}
                    onReject={() => reject(po.id)}
                  />
                ))
              )}
            </div>
          </section>

          {/* Live Schedule */}
          <section className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-base font-semibold text-foreground">Live OR Schedule</h2>
              </div>
              <button
                onClick={loadSchedule}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Refresh
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 font-medium">OR</th>
                    <th className="px-5 py-3 font-medium">Surgeon</th>
                    <th className="px-5 py-3 font-medium">Procedure</th>
                    <th className="px-5 py-3 font-medium">Required SKU</th>
                    <th className="px-5 py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingSchedule ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                        Loading schedule…
                      </td>
                    </tr>
                  ) : schedule.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                        No surgeries scheduled.
                      </td>
                    </tr>
                  ) : (
                    schedule.map((row) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "relative border-t border-border hover:bg-secondary/40 transition-colors",
                          "before:absolute before:inset-y-0 before:left-0 before:w-1",
                          rowAccent(row.status)
                        )}
                      >
                        <td className="px-5 py-4 font-mono text-xs text-foreground">{row.or_room}</td>
                        <td className="px-5 py-4 text-foreground">{row.surgeon_name}</td>
                        <td className="px-5 py-4 text-foreground">{row.procedure_name}</td>
                        <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{row.required_sku}</td>
                        <td className="px-5 py-4 text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                              statusStyle(row.status)
                            )}
                          >
                            {row.status.toLowerCase().includes("critical") || row.status.toLowerCase().includes("risk") ? (
                              <AlertOctagon className="h-3 w-3" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

type ApprovalCardProps = {
  title: string;
  sku: string;
  qty: number;
  supplier: string;
  reason: string;
  pending?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onApprove: () => void;
  onReject?: () => void;
};

const ApprovalCard = ({ title, sku, qty, supplier, reason, loading, disabled, onApprove, onReject }: ApprovalCardProps) => (
  <div className="rounded-lg border border-border bg-background p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-start gap-3 min-w-0">
      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center shrink-0">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{sku}</span>
          <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Drafted by Agent
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{reason}</div>
        <div className="text-xs text-foreground mt-2">
          Order <span className="font-semibold">{qty} units</span> from{" "}
          <span className="font-semibold">{supplier}</span> · Est. delivery 24h
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={onReject}
        disabled={loading || disabled || !onReject}
        className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reject
      </button>
      <button
        onClick={onApprove}
        disabled={loading || disabled}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
        Approve Order
      </button>
    </div>
  </div>
);

export default Dashboard;