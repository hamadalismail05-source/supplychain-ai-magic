import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { supabase } from "@/integrations/supabase/client";

const phoneSchema = z
  .string()
  .trim()
  .min(1)
  .max(20)
  .regex(/^\+?[0-9\s\-()]{6,20}$/);

type Props = {
  className?: string;
  size?: "default" | "lg";
  buttonLabel?: string;
};

export const WaitlistForm = ({ className, size = "default", buttonLabel }: Props) => {
  const { t, lang } = useI18n();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = value.trim();
    if (!trimmed) {
      setError(t("form.error.required"));
      return;
    }
    const parsed = phoneSchema.safeParse(trimmed);
    if (!parsed.success) {
      setError(t("form.error.invalid"));
      return;
    }
    setLoading(true);
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ whatsapp_number: trimmed, locale: lang });
    setLoading(false);
    if (dbError) {
      setError(t("form.error.invalid"));
      return;
    }
    setValue("");
    toast.success(t("form.success"), {
      description: t("form.success.desc"),
    });
  };

  const big = size === "lg";
  const label = buttonLabel ?? t("form.submit");

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-xl", className)} noValidate>
      <div
        className={cn(
          "flex flex-col sm:flex-row items-stretch gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm",
          big && "p-2"
        )}
      >
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder={t("form.placeholder")}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-label={t("form.placeholder")}
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
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 rtl:rotate-180" />}
          {label}
        </button>
      </div>
      {error && <p className="mt-2 pl-2 text-sm text-destructive">{error}</p>}
      <p className="mt-2 px-2 text-xs text-muted-foreground">{t("form.note")}</p>
    </form>
  );
};