import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { WaitlistDialog } from "./WaitlistDialog";

type Props = {
  className?: string;
  size?: "default" | "lg";
  buttonLabel?: string;
};

export const WaitlistForm = ({ className, size = "default", buttonLabel }: Props) => {
  const { t } = useI18n();
  const big = size === "lg";
  const label = buttonLabel ?? t("form.cta");

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <WaitlistDialog
        trigger={
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm transition-colors hover:bg-primary/90",
              big ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm"
            )}
          >
            {label}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        }
      />
      <p className="mt-3 text-xs text-muted-foreground">{t("form.note")}</p>
    </div>
  );
};