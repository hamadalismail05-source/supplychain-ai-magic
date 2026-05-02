import { AlertTriangle, Phone, Mail, FileSpreadsheet, CheckCircle2, Clock } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export const ProblemSection = () => {
  const { t } = useI18n();
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("problem.kicker")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
            {t("problem.title")}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("problem.sub")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today */}
          <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 overflow-hidden min-h-[420px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("problem.today")}</div>
                <div className="text-lg font-semibold text-foreground mt-1">{t("problem.manual")}</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-1 text-xs font-medium text-danger">
                <AlertTriangle className="h-3 w-3" /> {t("problem.reactive")}
              </span>
            </div>

            <div className="relative h-[300px]">
              <div className="absolute top-2 left-2 w-44 rotate-[-3deg] rounded-md bg-yellow-100 px-3 py-2 text-xs text-foreground/80 shadow-sm">
                "Where are the size 12 stems??"
              </div>
              <div className="absolute top-16 right-4 w-48 rotate-[2deg] rounded-md bg-yellow-100 px-3 py-2 text-xs text-foreground/80 shadow-sm">
                Call vendor — backorder?
              </div>
              <div className="absolute top-32 left-6 w-56 rounded-md border border-border bg-background px-3 py-2 text-xs font-mono text-muted-foreground shadow-sm">
                <div className="flex items-center gap-2 mb-1.5"><FileSpreadsheet className="h-3 w-3" /> inventory_v47_FINAL.xlsx</div>
                <div className="line-through opacity-60">SKU-7781 · 4 units</div>
                <div>SKU-7782 · ?</div>
              </div>
              <div className="absolute bottom-12 right-2 w-52 rounded-md border border-border bg-background px-3 py-2 text-xs shadow-sm">
                <div className="line-through text-muted-foreground">09:30 — Total Hip · Patel</div>
                <div className="mt-1 inline-flex items-center gap-1 rounded bg-danger-soft px-1.5 py-0.5 text-[10px] font-medium text-danger">
                  CANCELLED
                </div>
              </div>
              <div className="absolute bottom-2 left-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> 14 calls</span>
                <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> 9 threads</span>
              </div>
              <span className="absolute top-24 right-20 h-2 w-2 rounded-full bg-danger animate-pulse" />
              <span className="absolute bottom-32 left-32 h-2 w-2 rounded-full bg-danger animate-pulse" />
            </div>
          </div>

          {/* With Oracle */}
          <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 overflow-hidden min-h-[420px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("problem.withOracle")}</div>
                <div className="text-lg font-semibold text-foreground mt-1">{t("problem.autonomous")}</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                <Clock className="h-3 w-3" /> {t("problem.ahead")}
              </span>
            </div>

            <div className="space-y-3">
              {[
                { t: "Risk detected", d: "Titanium Stem Sz 12 — 0 in stock", icon: CheckCircle2 },
                { t: "Transfer arranged", d: "OR-North · 3 units · ETA 18:00", icon: CheckCircle2 },
                { t: "Backup PO drafted", d: "Stryker · NET-30 · awaiting approval", icon: CheckCircle2 },
                { t: "Team notified", d: "Dr. Patel + coordinator", icon: CheckCircle2 },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-background/60 px-4 py-3">
                  <step.icon className="h-4 w-4 mt-0.5 text-success shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{step.t}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{step.d}</div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{`T+${i * 4}s`}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-success-soft px-4 py-3 mt-2">
                <span className="text-sm font-medium text-success">{t("problem.onSchedule")}</span>
                <span className="text-xs font-mono text-success" dir="ltr">{t("problem.saved")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl border border-border bg-border overflow-hidden">
          {[
            { k: "1 in 10", v: "Surgeries delayed by supply issues" },
            { k: "$4,800", v: "Average cost of a cancelled procedure" },
            { k: "82%", v: "Are preventable with predictive workflows" },
          ].map((s) => (
            <div key={s.k} className="bg-card p-6 sm:p-8">
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Industry estimates, illustrative.</p>
      </div>
    </section>
  );
};