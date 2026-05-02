import { ArrowUpRight, Activity, ShieldCheck, Sparkles } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import { useI18n } from "@/i18n/I18nProvider";
import { LangToggle } from "./LangToggle";

export const Hero = () => {
  const { t } = useI18n();
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-background via-background to-transparent pointer-events-none" aria-hidden />

      <LangToggle className="absolute top-20 right-4 sm:right-6 z-40" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            {t("hero.badge")}
          </span>

          <h1 id="waitlist" className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground text-balance max-w-4xl leading-[1.05]">
            {t("hero.title.pre")}{" "}
            <span className="relative whitespace-nowrap inline-block rtl:pb-3">
              {t("hero.title.accent")}
              <svg
                className="absolute -bottom-2 rtl:-bottom-1 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 7 Q 50 2, 100 5 T 198 6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>{" "}
            {t("hero.title.post")}
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
            {t("hero.sub")}
          </p>

          <div className="mt-8 w-full flex justify-center">
            <WaitlistForm size="lg" />
          </div>

          <div className="mt-12 flex justify-center">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("hero.builtwith")}
            </span>
          </div>
        </div>

        {/* Product mockup */}
        <div className="relative mt-16 sm:mt-20 mx-auto max-w-5xl">
          <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" aria-hidden />
          <div className="relative rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_hsl(var(--foreground)/0.15)] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
              </div>
              <div className="ms-3 text-xs text-muted-foreground" dir="ltr">{t("hero.mock.title")}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border">
              <aside className="md:col-span-3 p-5 space-y-4">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("hero.mock.today")}</div>
                {[
                  { i: Activity, l: t("hero.mock.schedule"), a: true },
                  { i: ShieldCheck, l: t("hero.mock.risk"), a: false },
                  { i: Sparkles, l: t("hero.mock.agents"), a: false },
                ].map(({ i: I, l, a }) => (
                  <div key={l} className={`flex items-center gap-2 text-sm ${a ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    <I className="h-4 w-4" /> {l}
                  </div>
                ))}
              </aside>
              <div className="md:col-span-9 p-5 space-y-3">
                {[
                  { or: "OR-1", time: "07:30", proc: "Knee Arthroscopy", status: "ok" },
                  { or: "OR-2", time: "08:15", proc: "Lap Cholecystectomy", status: "ok" },
                  { or: "OR-4", time: "09:30", proc: "Total Hip Arthroplasty", status: "risk" },
                  { or: "OR-3", time: "11:00", proc: "Spinal Fusion L4-L5", status: "warn" },
                  { or: "OR-1", time: "13:45", proc: "Rotator Cuff Repair", status: "ok" },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-4 py-3">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground w-12">{row.or}</span>
                      <span className="text-xs font-mono text-muted-foreground w-12">{row.time}</span>
                      <span className="text-sm text-foreground">{row.proc}</span>
                    </div>
                    {row.status === "ok" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-medium text-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("status.ready")}
                      </span>
                    )}
                    {row.status === "warn" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /> {t("status.reviewing")}
                      </span>
                    )}
                    {row.status === "risk" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-medium text-danger">
                        <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" /> {t("status.criticalRisk")}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};