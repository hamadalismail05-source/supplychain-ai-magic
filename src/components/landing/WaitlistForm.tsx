import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Enter a valid work email" })
  .max(255, { message: "Email is too long" });

type Props = {
  className?: string;
  size?: "default" | "lg";
  buttonLabel?: string;
};

export const WaitlistForm = ({ className, size = "default", buttonLabel = "Join the Waitlist" }: Props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setEmail("");
    toast.success("You're on the list.", {
      description: "We'll be in touch when your access is ready.",
    });
  };

  const big = size === "lg";

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-xl", className)} noValidate>
      <div
        className={cn(
          "flex flex-col sm:flex-row items-stretch gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm",
          big && "p-2"
        )}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-label="Work email"
          aria-invalid={!!error}
          className={cn(
            "flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none",
            big && "text-base py-3 px-4"
          )}
        />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70",
            big && "px-5 py-3 text-base"
          )}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          {buttonLabel}
        </button>
      </div>
      {error && <p className="mt-2 pl-2 text-sm text-destructive">{error}</p>}
      <p className="mt-2 pl-2 text-xs text-muted-foreground">
        No spam. HIPAA-aware. Unsubscribe anytime.
      </p>
    </form>
  );
};