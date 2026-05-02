import { useState, ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  hospital: z.string().trim().min(1).max(160),
  whatsapp: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^\+?[0-9\s\-()]{6,20}$/),
});

type Props = {
  trigger: ReactNode;
};

export const WaitlistDialog = ({ trigger }: Props) => {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<{ name?: string; hospital?: string; whatsapp?: string }>({});
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setName("");
    setHospital("");
    setWhatsapp("");
    setErrors({});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = t("dialog.error.name");
    if (!hospital.trim()) next.hospital = t("dialog.error.hospital");
    const phone = whatsapp.trim();
    if (!phone) next.whatsapp = t("form.error.required");
    setErrors(next);
    if (Object.keys(next).length) return;

    const parsed = schema.safeParse({ name: name.trim(), hospital: hospital.trim(), whatsapp: phone });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] && t("dialog.error.name"),
        hospital: fieldErrors.hospital?.[0] && t("dialog.error.hospital"),
        whatsapp: fieldErrors.whatsapp?.[0] && t("form.error.invalid"),
      });
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from("waitlist").insert({
      full_name: parsed.data.name,
      hospital: parsed.data.hospital,
      whatsapp_number: parsed.data.whatsapp,
      locale: lang,
    });
    setLoading(false);
    if (dbError) {
      toast.error(t("form.error.invalid"));
      return;
    }
    reset();
    setOpen(false);
    toast.success(t("form.success"), { description: t("form.success.desc") });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {t("dialog.title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t("dialog.sub")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-2 space-y-4" noValidate>
          <Field
            id="wl-name"
            label={t("dialog.name.label")}
            placeholder={t("dialog.name.placeholder")}
            value={name}
            onChange={(v) => {
              setName(v);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="wl-hospital"
            label={t("dialog.hospital.label")}
            placeholder={t("dialog.hospital.placeholder")}
            value={hospital}
            onChange={(v) => {
              setHospital(v);
              if (errors.hospital) setErrors({ ...errors, hospital: undefined });
            }}
            error={errors.hospital}
            autoComplete="organization"
          />
          <Field
            id="wl-whatsapp"
            label={t("dialog.whatsapp.label")}
            placeholder={t("dialog.whatsapp.placeholder")}
            value={whatsapp}
            onChange={(v) => {
              setWhatsapp(v);
              if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
            }}
            error={errors.whatsapp}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            ltr
          />

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            )}
            {loading ? t("dialog.submitting") : t("dialog.submit")}
          </button>

          <p className="text-center text-xs text-muted-foreground">{t("form.note")}</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  ltr?: boolean;
};

const Field = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  ltr,
}: FieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-xs font-medium text-foreground">
      {label}
    </label>
    <input
      id={id}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      dir={ltr ? "ltr" : undefined}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error}
      className={cn(
        "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40 transition",
        error ? "border-danger" : "border-border"
      )}
    />
    {error && <p className="text-xs text-danger">{error}</p>}
  </div>
);