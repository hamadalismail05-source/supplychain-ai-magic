import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-background">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{t("footer.product")}</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#how" className="hover:text-foreground">{t("nav.how")}</a></li>
            <li><a href="#roi" className="hover:text-foreground">{t("nav.roi")}</a></li>
            <li><a href="#waitlist" className="hover:text-foreground">{t("footer.waitlist")}</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{t("footer.company")}</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">{t("footer.about")}</a></li>
            <li><a href="#" className="hover:text-foreground">{t("footer.contact")}</a></li>
            <li><a href="#" className="hover:text-foreground">{t("footer.security")}</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Inventory Oracle, Inc. {t("footer.rights")}</p>
        <p className="text-xs text-muted-foreground">{t("footer.compliance")}</p>
      </div>
    </div>
    </footer>
  );
};