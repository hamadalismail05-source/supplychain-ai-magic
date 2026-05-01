export const RoiStrip = () => {
  const items = [
    { k: "98%", v: "of supply-related delays prevented", sub: "Pilot cohort, 6 months" },
    { k: "11h", v: "saved per OR coordinator weekly", sub: "Less calls, fewer spreadsheets" },
    { k: "6.4×", v: "average return on investment", sub: "Year-one across pilot sites" },
  ];
  return (
    <section id="roi" className="relative py-24 sm:py-32 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">ROI</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
            Measurable from week one.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We instrument every resolution so finance, clinical leadership, and supply chain see the same numbers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.k} className="rounded-2xl border border-border bg-card p-8">
              <div className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground">{it.k}</div>
              <div className="mt-4 text-sm text-foreground">{it.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};