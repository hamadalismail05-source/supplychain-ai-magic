import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, RotateCcw, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const SCRIPT = [
  "› Scanning regional inventory network…",
  "› Match found: sister facility OR-North · 3 units available.",
  "› Drafting transfer + backup PO to Stryker (NET-30)…",
  "› Notifying Dr. Patel's coordinator.",
  "✓ Resolution complete in 11.4s.",
];

type Phase = "idle" | "running" | "resolved";

export const Sandbox = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [lines, setLines] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const timers = useRef<number[]>([]);

  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const reset = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setPhase("idle");
    setLines([]);
    setTyped("");
  };

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const run = () => {
    if (phase !== "idle") return;
    setPhase("running");
    setLines([]);
    setTyped("");

    if (reduce) {
      setLines(SCRIPT);
      const t = window.setTimeout(() => setPhase("resolved"), 600);
      timers.current.push(t);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (lineIdx >= SCRIPT.length) {
        const t = window.setTimeout(() => setPhase("resolved"), 400);
        timers.current.push(t);
        return;
      }
      const current = SCRIPT[lineIdx];
      if (charIdx <= current.length) {
        setTyped(current.slice(0, charIdx));
        charIdx++;
        const t = window.setTimeout(tick, 22);
        timers.current.push(t);
      } else {
        setLines((prev) => [...prev, current]);
        setTyped("");
        lineIdx++;
        charIdx = 0;
        const t = window.setTimeout(tick, 280);
        timers.current.push(t);
      }
    };
    tick();
  };

  const resolved = phase === "resolved";
  const running = phase === "running";

  return (
    <section className="relative py-24 sm:py-32 bg-secondary/30 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Try it out</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
            Experience the Agent.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A simulation of a live risk on today's schedule. Click run and watch the agent resolve it.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-border bg-card shadow-[0_20px_60px_-20px_hsl(var(--foreground)/0.15)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground">OR-4 · 09:30 · Dr. Patel</div>
              <div className="text-base font-semibold text-foreground mt-0.5">Total Hip Arthroplasty</div>
            </div>
            {resolved ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" /> Resolved · PO Drafted
              </span>
            ) : (
              <span className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-3 py-1 text-xs font-medium text-danger",
                !running && "animate-pulse-ring"
              )}>
                <AlertTriangle className="h-3.5 w-3.5" /> Critical Risk · Missing implant
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
                  <div className="text-sm font-medium text-foreground">Titanium Femoral Stem · Size 12</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {resolved ? "3 units inbound from OR-North · backup PO #4471 drafted" : "0 in stock · supplier lead 48h"}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">SKU-7782</span>
            </div>
          </div>

          {/* Console */}
          {(running || resolved) && (
            <div className="px-5 py-4 border-b border-border bg-secondary/40">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Terminal className="h-3.5 w-3.5" /> Agent trace
              </div>
              <div className="font-mono text-[13px] leading-6 text-foreground/80 space-y-0.5 min-h-[120px]">
                {lines.map((l, i) => (
                  <div key={i} className={l.startsWith("✓") ? "text-success" : ""}>{l}</div>
                ))}
                {running && typed && <div className="caret-blink">{typed}</div>}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            {resolved ? (
              <>
                <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-medium text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Saved $14,200 · 0 surgery delay
                </span>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset demo
                </button>
              </>
            ) : (
              <>
                <div className="text-xs text-muted-foreground">
                  {running ? "Agent is working…" : "Human-in-the-loop. Nothing is sent without approval."}
                </div>
                <button
                  onClick={run}
                  disabled={running}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {running ? "Resolving…" : "Run AI Resolution"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};