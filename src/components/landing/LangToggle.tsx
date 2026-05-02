import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export const LangToggle = ({ className }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs shadow-[0_2px_8px_-2px_rgba(15,23,42,0.12)] ring-1 ring-black/5",
        className
      )}
      dir="ltr"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "uppercase tracking-wider transition-colors",
          lang === "en"
            ? "font-semibold text-foreground"
            : "font-medium text-slate-400 hover:text-slate-600"
        )}
      >
        EN
      </button>
      <span className="text-slate-400 select-none" aria-hidden>|</span>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={cn(
          "uppercase tracking-wider transition-colors",
          lang === "ar"
            ? "font-semibold text-foreground"
            : "font-medium text-slate-400 hover:text-slate-600"
        )}
      >
        AR
      </button>
    </div>
  );
};