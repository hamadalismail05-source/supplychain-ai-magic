import { useEffect, useMemo, useState } from "react";
import { AlertOctagon, CalendarDays, CheckCircle2, Eye, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ScheduleRow = {
  id: string;
  or_room: string;
  surgeon_name: string;
  procedure_name: string;
  required_sku: string;
  status: string;
  created_at: string;
};

const statusStyle = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("critical") || s.includes("risk")) return "bg-danger-soft text-danger border-danger/20";
  if (s.includes("review") || s.includes("warn")) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-success-soft text-success border-success/20";
};

const rowAccent = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("critical") || s.includes("risk")) return "before:bg-danger";
  if (s.includes("review") || s.includes("warn")) return "before:bg-amber-400";
  return "before:bg-success";
};

const OrSchedule = () => {
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<ScheduleRow | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("surgical_schedule")
      .select("id, or_room, surgeon_name, procedure_name, required_sku, status, created_at")
      .order("created_at", { ascending: true });
    if (!error && data) setRows(data as ScheduleRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from("surgical_schedule").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      toast.error("Failed to cancel surgery");
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast.success("Surgery cancelled & removed from schedule.");
  };

  const criticalCount = useMemo(
    () => rows.filter((r) => r.status.toLowerCase().includes("critical") || r.status.toLowerCase().includes("risk")).length,
    [rows]
  );

  return (
    <DashboardLayout alertCount={criticalCount}>
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">OR Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage every scheduled surgery across all operating rooms.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          {rows.length} scheduled
        </span>
      </div>

      <section className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">OR</th>
                <th className="px-5 py-3 font-medium">Surgeon</th>
                <th className="px-5 py-3 font-medium">Procedure</th>
                <th className="px-5 py-3 font-medium">Required SKU</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                    Loading schedule…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    No surgeries scheduled.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
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
                    <td className="px-5 py-4">
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
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelected(row)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
                        >
                          <Eye className="h-3 w-3" /> View Details
                        </button>
                        <button
                          onClick={() => cancel(row.id)}
                          disabled={deletingId === row.id}
                          className="inline-flex items-center gap-1.5 rounded-md border border-danger/30 bg-danger-soft px-2.5 py-1.5 text-xs text-danger hover:bg-danger hover:text-danger-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {deletingId === row.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Cancel Surgery
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Surgery Details</DialogTitle>
            <DialogDescription>Full record from the surgical schedule.</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <DetailRow label="OR Room" value={selected.or_room} mono />
              <DetailRow label="Surgeon" value={selected.surgeon_name} />
              <DetailRow label="Procedure" value={selected.procedure_name} />
              <DetailRow label="Required SKU" value={selected.required_sku} mono />
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                    statusStyle(selected.status)
                  )}
                >
                  {selected.status}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>Created</span>
                <span>{new Date(selected.created_at).toLocaleString()}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

const DetailRow = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className={cn("text-foreground", mono && "font-mono text-xs")}>{value}</span>
  </div>
);

export default OrSchedule;