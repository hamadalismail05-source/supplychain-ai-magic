## The Inventory Oracle — Landing Page

A premium, Linear-style landing page for an agentic AI medical supply chain platform. Light theme only, monochrome UI with strict accent usage.

### Design system

- **Background**: near-white `#F8FAFC` page, pure white cards with `1px` slate-200 borders.
- **Type**: Inter, tight tracking on headlines (-0.02em), generous line-height on body. Large hero (~64px desktop), section titles ~40px.
- **Color rules**:
  - Monochrome slate (900 → 500) for all primary UI, text, and the dark CTA button.
  - Emerald `#059669` ONLY for resolved/success/saved states (badges, success toasts, the resolution card).
  - Rose `#E11D48` ONLY for critical risk states (risk badges, the "at-risk" surgery card).
- **Surfaces**: subtle shadows (`shadow-sm`), 12px radius on cards, soft dotted/grid background accents in hero.
- Lock to light mode: remove the `.dark` class path from being toggled; design tokens overridden in `index.css`.

### Page sections

1. **Top Nav** (sticky, blurred white)
   - Left: small mark (abstract "O" glyph) + "Inventory Oracle" wordmark.
   - Right: "How it Works", "ROI" (anchor links) + solid dark "Join Waitlist" button that scrolls to hero form.

2. **Hero**
   - Eyebrow chip: "Now in private beta · Q3 2026".
   - Headline: "Agentic AI for the Modern Surgical Supply Chain."
   - Subheadline as specified.
   - Inline waitlist form: email input + dark "Join the Waitlist" button. Zod-validated email; success → sonner toast "You're on the list."
   - Trust row underneath: muted "Built with clinicians from" + 4–5 grayscale placeholder hospital wordmarks.
   - Right/below: a soft product mockup card hinting at the dashboard.

3. **The Problem** — "The hidden cost of fragmented inventory."
   - Two-column comparison:
     - Left card "Today" — chaotic: scattered sticky-note style elements, rose dots for stockouts, crossed-out surgery, spreadsheet snippet, phone/email icons. Subtle jitter.
     - Right card "With The Oracle" — calm: single timeline with green check, neat PO row, "72h ahead" chip.
   - Three stat tiles below: surgeries delayed annually, avg cost per cancellation, % preventable (illustrative figures clearly labeled "industry estimate").

4. **Interactive Sandbox** — "Experience the Agent."
   - Centered card, white, 1px border.
   - Header: "OR-4 · 09:30 · Total Hip Arthroplasty — Dr. Patel"
   - Risk badge (rose): "Critical Risk · Missing implant"
   - Item row: "Titanium Femoral Stem (Size 12) — 0 in stock · supplier lead 48h"
   - Primary button: "Run AI Resolution".
   - On click: button shows spinner → a "console" panel below streams typed lines (typewriter effect, ~25ms/char):
     1. "Scanning regional inventory network…"
     2. "Match found: Sister facility OR-North, 3 units available."
     3. "Drafting transfer + backup PO to Stryker (NET-30)…"
     4. "Notifying Dr. Patel's coordinator."
   - Card transitions: rose badge → emerald "Resolved · PO Drafted", item row gets green check, a small "Saved: $14,200 · 0 surgery delay" footer chip appears.
   - "Reset demo" link to replay.

5. **Features (Bento)** — 3 cards, asymmetric grid (1 large left, 2 stacked right on desktop; stacked on mobile).
   - **Real-Time EHR Sync** (large): mini visual of schedule rows syncing to inventory rows with animated connecting lines.
   - **Predictive Risk Engine**: mini chart with a 72h horizon marker and a rose risk dot.
   - **Autonomous PO Generation**: mock PO doc with "Awaiting clinician approval" pill.
   - Each card: icon (lucide), title, 2-line description, subtle hover lift.

6. **ROI strip** (anchor target for nav): three large numbers with captions (delays prevented, hours saved per OR/week, avg ROI). Plain, monochrome, large type.

7. **Secondary CTA band**: restated value prop + email form (reuses hero form component).

8. **Footer**: left wordmark + tagline; right columns (Product, Company, Legal); bottom row copyright + small "SOC 2 in progress" line.

### Interactions & polish

- Email validation with zod; trimmed, max 255 chars; error inline + toast on success.
- Sonner toaster already mounted in `App.tsx`.
- Subtle fade/slide-in on scroll for sections (intersection observer, no heavy lib).
- Reduced-motion respected for typewriter and animations.
- Fully responsive: nav collapses to icon menu (sheet) under `md`, bento stacks, hero form wraps.

### Technical notes

- New components under `src/components/landing/`: `Nav`, `Hero`, `WaitlistForm`, `ProblemSection`, `Sandbox`, `FeaturesBento`, `RoiStrip`, `CtaBand`, `Footer`.
- Replace `src/pages/Index.tsx` to compose them.
- Update `src/index.css` tokens: keep light palette, set `--primary` to slate-900, add CSS vars `--success: 152 76% 31%` (emerald-600) and `--danger: 347 77% 50%` (rose-600). Remove dark-mode toggling by not applying `.dark` anywhere (no theme provider added).
- Tailwind: extend colors with `success` and `danger` mapped to the new vars; add Inter via `<link>` in `index.html`; set `font-sans` to Inter.
- Typewriter: small custom hook `useTypewriter(lines, speed)` — no extra deps.
- Email validation: add `zod` (already typical in shadcn stack — will install if missing).
- No backend; waitlist submit is purely visual (toast). Easy to wire to Lovable Cloud later.
- Keep `NotFound` route untouched.
