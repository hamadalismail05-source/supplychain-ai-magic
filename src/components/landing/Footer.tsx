import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Agentic AI for the modern surgical supply chain.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">Product</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#how" className="hover:text-foreground">How it works</a></li>
            <li><a href="#roi" className="hover:text-foreground">ROI</a></li>
            <li><a href="#waitlist" className="hover:text-foreground">Waitlist</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">Company</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Inventory Oracle, Inc. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">SOC 2 Type II — in progress · HIPAA aligned</p>
      </div>
    </div>
  </footer>
);