import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

type Phase = "idle" | "running" | "resolved";

export const Sandbox = () => {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<number | null>(null);

  const reset = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setPhase("idle");
  };

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const run = () => {
    if (phase !== "idle") return;
    setPhase("running");
    timer.current = window.setTimeout(() => setPhase("resolved"), 1500);
  };

  const resolved = phase === "resolved";
  const running = phase === "running";

  return (
    <section className="relative py-24 sm:py-32 bg-secondary/30 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("sandbox.kicker")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
            {t("sandbox.title")}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("sandbox.sub")}
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-border bg-card shadow-[0_20px_60px_-20px_hsl(var(--foreground)/0.15)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground" dir="ltr">OR-4 · 09:30 · Dr. Patel</div>
              <div className="text-base font-semibold text-foreground mt-0.5">{t("sandbox.case")}</div>
            </div>
            {resolved ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success animate-fade-up">
                <CheckCircle2 className="h-3.5 w-3.5" /> {t("sandbox.resolvedBadge")}
              </span>
            ) : (
              <span className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-3 py-1 text-xs font-medium text-danger",
                !running && "animate-pulse-ring"
              )}>
                <AlertTriangle className="h-3.5 w-3.5" /> {t("sandbox.criticalBadge")}
              </span>
            )}
          </div>

          {/* Item row */}
          <div className="px-5 py-5 border-b border-border">
            <div className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3 transition-colors",
              resolved ? "border-success/30 bg-success-soft/40" : "border-border bg-background"
            )}>
              <div className="flex items-center gap-3">
                {resolved ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-danger" />
                )}
                <div>
                  <div className="text-sm font-medium text-foreground">{t("sandbox.itemTitle")}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {resolved ? t("sandbox.itemResolvedDesc") : t("sandbox.itemRiskDesc")}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground" dir="ltr">SKU-7782</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            {resolved ? (
              <>
                <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-medium text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {t("sandbox.savedChip")}
                </span>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> {t("sandbox.reset")}
                </button>
              </>
            ) : (
              <>
                <div className="text-xs text-muted-foreground">
                  {running ? t("sandbox.running") : t("sandbox.hint")}
                </div>
                <button
                  onClick={run}
                  disabled={running}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  <Sparkles className={cn("h-4 w-4", running && "animate-spin")} />
                  {running ? t("sandbox.running") : t("sandbox.run")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};