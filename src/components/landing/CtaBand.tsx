import { WaitlistForm } from "./WaitlistForm";

export const CtaBand = () => (
  <section className="relative py-24 sm:py-32">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16 text-center shadow-sm">
        <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" aria-hidden />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
            Stop cancelling surgeries you could have saved.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join the waitlist for early access. We're onboarding a small group of forward-thinking surgical teams in 2026.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm size="lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
);