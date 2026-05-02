import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.how": "How it Works",
  "nav.roi": "ROI",
  "nav.cta": "Join Waitlist",
  "hero.badge": "Now in private beta · Q3 2026",
  "hero.title.pre": "Agentic AI for the Modern",
  "hero.title.accent": "Surgical",
  "hero.title.post": "Supply Chain.",
  "hero.sub": "Bridge the gap between your OR schedule and your inventory. Predict shortages, automate procurement, and never cancel a surgery due to a missing implant again.",
  "hero.builtwith": "Designed for the modern Saudi healthcare system.",
  "hero.mock.title": "oracle.app · Today's OR Schedule",
  "hero.mock.today": "Today",
  "hero.mock.schedule": "OR Schedule",
  "hero.mock.risk": "Risk Engine",
  "hero.mock.agents": "Agents",
  "status.ready": "Ready",
  "status.reviewing": "Reviewing",
  "status.criticalRisk": "Critical Risk",
  "form.placeholder": "Enter your WhatsApp number",
  "form.submit": "Join the Waitlist",
  "form.error.required": "WhatsApp number is required",
  "form.error.invalid": "Enter a valid WhatsApp number",
  "form.success": "Added to waitlist!",
  "form.success.desc": "We'll be in touch on WhatsApp when access is ready.",
  "form.note": "No spam. Your data is secure.",
  "form.cta": "Join the Waitlist",
  "dialog.title": "Request Early Access",
  "dialog.sub": "Join forward-thinking surgical teams.",
  "dialog.name.label": "Full Name",
  "dialog.name.placeholder": "Dr. Jane Smith",
  "dialog.hospital.label": "Hospital / Organization",
  "dialog.hospital.placeholder": "Mercy Health",
  "dialog.whatsapp.label": "WhatsApp Number",
  "dialog.whatsapp.placeholder": "+1 555 123 4567",
  "dialog.submit": "Submit Request",
  "dialog.submitting": "Submitting…",
  "dialog.error.name": "Please enter your full name",
  "dialog.error.hospital": "Please enter your hospital or organization",
  "problem.kicker": "The Problem",
  "problem.title": "The hidden cost of fragmented inventory.",
  "problem.sub": "Every cancelled procedure begins the same way — a missing implant nobody knew was missing. Manual workflows can't keep up with the volume or complexity of modern surgical care.",
  "problem.today": "Today",
  "problem.manual": "Manual Inventory",
  "problem.reactive": "Reactive",
  "problem.withOracle": "With The Oracle",
  "problem.autonomous": "Autonomous Resolution",
  "problem.ahead": "72h ahead",
  "problem.onSchedule": "Surgery on schedule",
  "problem.saved": "Saved $14,200",
  "sandbox.kicker": "Try it out",
  "sandbox.title": "Experience the Agent.",
  "sandbox.sub": "A simulation of a live risk on today's schedule. Click run and watch the agent resolve it.",
  "sandbox.case": "Total Hip Arthroplasty",
  "sandbox.criticalBadge": "Critical Risk · Missing implant",
  "sandbox.resolvedBadge": "Resolved · PO Drafted",
  "sandbox.itemTitle": "Titanium Femoral Stem · Size 12",
  "sandbox.itemRiskDesc": "0 in stock · supplier lead 48h",
  "sandbox.itemResolvedDesc": "PO Drafted: 3 units ordered",
  "sandbox.run": "Run AI Resolution",
  "sandbox.running": "Agent Processing…",
  "sandbox.toastSuccess": "Autonomous PO Drafted & Sent for Approval",
  "sandbox.toastError": "Couldn't draft PO. Please try again.",
  "sandbox.resetSim": "Reset Simulation",
  "sandbox.resetToast": "Simulation reset",
  "sandbox.reset": "Reset demo",
  "sandbox.savedChip": "Saved $14,200 · 0 surgery delay",
  "sandbox.hint": "Human-in-the-loop. Nothing is sent without approval.",
  "features.kicker": "Platform",
  "features.title": "One agent. Three pillars.",
  "features.sub": "Built around the actual workflow of perioperative teams — not generic supply chain dashboards.",
  "features.ehr.title": "Real-Time EHR Sync",
  "features.ehr.desc": "Connects directly to your surgery scheduling system — Epic, Cerner, Meditech — and mirrors changes the moment they happen.",
  "features.risk.title": "Predictive Risk Engine",
  "features.risk.desc": "Flags expiring items and stockouts 72 hours in advance.",
  "features.po.title": "Autonomous PO Generation",
  "features.po.desc": "AI drafts supplier orders for human-in-the-loop approval.",
  "roi.kicker": "ROI",
  "roi.title": "Measurable from week one.",
  "roi.sub": "We instrument every resolution so finance, clinical leadership, and supply chain see the same numbers.",
  "cta.title": "Stop cancelling surgeries you could have saved.",
  "cta.sub": "Join the waitlist for early access. We're onboarding a small group of forward-thinking surgical teams in 2026.",
  "footer.tagline": "Agentic AI for the modern surgical supply chain.",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.about": "About",
  "footer.contact": "Contact",
  "footer.security": "Security",
  "footer.waitlist": "Waitlist",
  "footer.rights": "All rights reserved.",
  "footer.compliance": "Empowering surgical teams with Agentic AI.",
};

const ar: Dict = {
  "nav.how": "كيف يعمل",
  "nav.roi": "العائد",
  "nav.cta": "انضم لقائمة الانتظار",
  "hero.badge": "إصدار تجريبي خاص · الربع الثالث 2026",
  "hero.title.pre": "ذكاء اصطناعي وكيل لسلسلة",
  "hero.title.accent": "الإمداد الجراحي",
  "hero.title.post": "الحديثة.",
  "hero.sub": "اربط جدول غرف العمليات بمخزونك. توقّع النواقص، وأتمتة المشتريات، ولا تلغِ عملية جراحية بسبب غرسة مفقودة مرة أخرى.",
  "hero.builtwith": "مُصمم لنظام الرعاية الصحية السعودي الحديث.",
  "hero.mock.title": "oracle.app · جدول العمليات اليوم",
  "hero.mock.today": "اليوم",
  "hero.mock.schedule": "جدول العمليات",
  "hero.mock.risk": "محرّك المخاطر",
  "hero.mock.agents": "الوكلاء",
  "status.ready": "جاهز",
  "status.reviewing": "قيد المراجعة",
  "status.criticalRisk": "خطر حرج",
  "form.placeholder": "أدخل رقم واتساب",
  "form.submit": "انضم لقائمة الانتظار",
  "form.error.required": "رقم واتساب مطلوب",
  "form.error.invalid": "أدخل رقم واتساب صالح",
  "form.success": "تمت إضافتك إلى القائمة!",
  "form.success.desc": "سنتواصل معك عبر واتساب عند جاهزية وصولك.",
  "form.note": "بدون رسائل مزعجة. بياناتك آمنة.",
  "form.cta": "انضم لقائمة الانتظار",
  "dialog.title": "طلب وصول مبكر",
  "dialog.sub": "انضم إلى فرق جراحية رائدة.",
  "dialog.name.label": "الاسم الكامل",
  "dialog.name.placeholder": "د. سارة أحمد",
  "dialog.hospital.label": "المستشفى / المنظمة",
  "dialog.hospital.placeholder": "مستشفى الملك فيصل",
  "dialog.whatsapp.label": "رقم الواتساب",
  "dialog.whatsapp.placeholder": "+966 50 123 4567",
  "dialog.submit": "إرسال الطلب",
  "dialog.submitting": "جارٍ الإرسال…",
  "dialog.error.name": "يرجى إدخال الاسم الكامل",
  "dialog.error.hospital": "يرجى إدخال اسم المستشفى أو المنظمة",
  "problem.kicker": "المشكلة",
  "problem.title": "التكلفة الخفية للمخزون المجزّأ.",
  "problem.sub": "كل عملية ملغاة تبدأ بنفس الطريقة — غرسة مفقودة لم يعلم بها أحد. سير العمل اليدوي لا يواكب حجم وتعقيد الرعاية الجراحية الحديثة.",
  "problem.today": "اليوم",
  "problem.manual": "مخزون يدوي",
  "problem.reactive": "تفاعلي",
  "problem.withOracle": "مع Oracle",
  "problem.autonomous": "حلّ ذاتي",
  "problem.ahead": "قبل 72 ساعة",
  "problem.onSchedule": "العملية في موعدها",
  "problem.saved": "وفّرت 14,200 دولار",
  "sandbox.kicker": "جرّبه",
  "sandbox.title": "اختبر الوكيل.",
  "sandbox.sub": "محاكاة لخطر حقيقي على جدول اليوم. اضغط تشغيل وراقب الوكيل وهو يحلّه.",
  "sandbox.case": "استبدال مفصل الورك الكامل",
  "sandbox.criticalBadge": "خطر حرج · غرسة مفقودة",
  "sandbox.resolvedBadge": "تمّ الحل · أمر شراء جاهز",
  "sandbox.itemTitle": "ساق فخذية تيتانيوم · مقاس 12",
  "sandbox.itemRiskDesc": "لا يوجد مخزون · مدة المورد 48 ساعة",
  "sandbox.itemResolvedDesc": "أمر شراء جاهز: تم طلب 3 وحدات",
  "sandbox.run": "تشغيل حل الذكاء الاصطناعي",
  "sandbox.running": "الوكيل يعالج…",
  "sandbox.toastSuccess": "تم إعداد أمر الشراء تلقائيًا وإرساله للموافقة",
  "sandbox.toastError": "تعذر إعداد أمر الشراء. حاول مرة أخرى.",
  "sandbox.resetSim": "إعادة ضبط المحاكاة",
  "sandbox.resetToast": "تمت إعادة ضبط المحاكاة",
  "sandbox.reset": "إعادة العرض",
  "sandbox.savedChip": "وفّرت 14,200 دولار · بدون تأخير",
  "sandbox.hint": "إنسان في الحلقة. لا يُرسل شيء دون موافقة.",
  "features.kicker": "المنصة",
  "features.title": "وكيل واحد. ثلاثة أركان.",
  "features.sub": "مبنية حول سير العمل الفعلي لفِرق ما حول العملية — وليست لوحات تحكم عامة لسلسلة الإمداد.",
  "features.ehr.title": "مزامنة EHR لحظية",
  "features.ehr.desc": "تتصل مباشرة بنظام جدولة العمليات لديك — Epic وCerner وMeditech — وتعكس التغييرات لحظيًا.",
  "features.risk.title": "محرّك مخاطر تنبّؤي",
  "features.risk.desc": "ينبّه للمنتجات منتهية الصلاحية والنواقص قبل 72 ساعة.",
  "features.po.title": "إنشاء أوامر شراء ذاتية",
  "features.po.desc": "يصيغ الذكاء الاصطناعي أوامر الموردين لمراجعة بشرية.",
  "roi.kicker": "العائد",
  "roi.title": "قابل للقياس من الأسبوع الأول.",
  "roi.sub": "نُسجّل كل عملية حلّ كي ترى الإدارة المالية والقيادة السريرية وسلسلة الإمداد نفس الأرقام.",
  "cta.title": "توقّف عن إلغاء عمليات كان يمكن إنقاذها.",
  "cta.sub": "انضم لقائمة الانتظار للوصول المبكر. نُدمج مجموعة صغيرة من الفرق الجراحية الرائدة في 2026.",
  "footer.tagline": "ذكاء اصطناعي وكيل لسلسلة الإمداد الجراحي الحديثة.",
  "footer.product": "المنتج",
  "footer.company": "الشركة",
  "footer.about": "من نحن",
  "footer.contact": "تواصل",
  "footer.security": "الأمان",
  "footer.waitlist": "قائمة الانتظار",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.compliance": "تمكين الفرق الجراحية بواسطة الذكاء الاصطناعي.",
};

const dicts: Record<Lang, Dict> = { en, ar };

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const Ctx = createContext<I18nCtx | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("lang");
    return stored === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value = useMemo<I18nCtx>(() => ({
    lang,
    setLang: (l) => setLangState(l),
    t: (key) => dicts[lang][key] ?? dicts.en[key] ?? key,
    dir: lang === "ar" ? "rtl" : "ltr",
  }), [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};