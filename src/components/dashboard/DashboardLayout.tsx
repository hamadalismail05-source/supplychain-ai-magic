import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bell,
  Boxes,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/Logo";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "OR Schedule", to: "/or-schedule", icon: CalendarDays },
  { label: "Inventory", to: "/inventory", icon: Boxes },
];

type Props = {
  children: ReactNode;
  alertCount?: number;
};

export const DashboardLayout = ({ children, alertCount = 0 }: Props) => {
  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <Link
          to="/"
          className="h-16 flex items-center px-5 border-b border-border hover:bg-secondary/50 transition-colors"
        >
          <Logo asLink={false} />
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-3 w-3 rotate-180" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search SKU, surgeon, OR…"
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toast.info("Global search indexing in progress.");
                    (e.target as HTMLInputElement).blur();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.success("All alerts caught up.")}
              className="relative h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border hover:bg-secondary"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-danger text-[10px] font-semibold text-danger-foreground inline-flex items-center justify-center">
                  {alertCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-semibold">
                AS
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-foreground">Admin · St. Mary's</div>
                <div className="text-[10px] text-muted-foreground">Hospital Administrator</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};