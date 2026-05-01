import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <a href="#top" className={cn("flex items-center gap-2 group", className)}>
    <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    </span>
    <span className="font-semibold tracking-tight text-foreground">
      Inventory <span className="text-muted-foreground">Oracle</span>
    </span>
  </a>
);