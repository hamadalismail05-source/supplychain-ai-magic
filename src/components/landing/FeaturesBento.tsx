import { Calendar, FileText, LineChart, Activity } from "lucide-react";

export const FeaturesBento = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Platform</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
            One agent. Three pillars.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Built around the actual workflow of perioperative teams — not generic supply chain dashboards.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large card */}
          <div className="lg:col-span-2 lg:row-span-2 group relative rounded-2xl border border-border bg-card p-6 sm:p-8 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground">01</span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">Real-Time EHR Sync</h3>
            <p className="mt-2 text-muted-foreground max-w-md">
              Connects directly to your surgery scheduling system — Epic, Cerner, Meditech — and mirrors changes the moment they happen.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-background p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">OR Schedule</div>
                <div className="space-y-2">
                  {["07:30 · Knee", "09:30 · Hip", "11:00 · Spine"].map((t) => (
                    <div key={t} className="text-xs font-mono text-foreground/80 rounded bg-secondary px-2 py-1.5">{t}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Inventory Pull</div>
                <div className="space-y-2">
                  {["Trays · 4/4", "Implants · 12/14", "Disposables · ok"].map((t, i) => (
                    <div key={t} className="text-xs font-mono rounded px-2 py-1.5 bg-secondary text-foreground/80 flex items-center justify-between">
                      <span>{t}</span>
                      <span className={i === 1 ? "h-1.5 w-1.5 rounded-full bg-danger" : "h-1.5 w-1.5 rounded-full bg-success"} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5" /> Synced 4 seconds ago
            </div>
          </div>

          {/* Small 1 */}
          <div className="group relative rounded-2xl border border-border bg-card p-6 sm:p-7 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                <LineChart className="h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground">02</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">Predictive Risk Engine</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Flags expiring items and stockouts 72 hours in advance.
            </p>

            <div className="mt-6 relative h-24 rounded-lg border border-border bg-background p-3">
              <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
                <path d="M0 60 L30 50 L60 55 L90 35 L120 40 L150 25 L180 30 L200 20" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <line x1="150" y1="0" x2="150" y2="80" stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <circle cx="150" cy="25" r="4" fill="hsl(var(--danger))" />
              </svg>
              <span className="absolute right-3 top-2 text-[10px] font-mono text-danger">+72h risk</span>
            </div>
          </div>

          {/* Small 2 */}
          <div className="group relative rounded-2xl border border-border bg-card p-6 sm:p-7 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground">03</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">Autonomous PO Generation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              AI drafts supplier orders for human-in-the-loop approval.
            </p>

            <div className="mt-6 rounded-lg border border-border bg-background p-3 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-muted-foreground">PO #4471</span>
                <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Awaiting approval
                </span>
              </div>
              <div className="space-y-1 text-foreground/80">
                <div className="flex justify-between"><span>Stryker · Stem Sz 12</span><span className="font-mono">×3</span></div>
                <div className="flex justify-between text-muted-foreground"><span>NET-30</span><span className="font-mono">$11,820</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};