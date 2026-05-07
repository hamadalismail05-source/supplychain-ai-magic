import { useEffect, useRef, useState } from "react";
import { Search, FileText, Zap, Send, Bot, User, Activity, ShieldCheck, ArrowLeft } from "lucide-react";

type Msg = { role: "ai" | "user"; content: string };

const initialMessages: Msg[] = [
  {
    role: "ai",
    content:
      "مرحباً بأعضاء لجنة التحكيم! أنا الوكيل الذكي لـ The Inventory Oracle. يمكنني إجابتكم على أي سؤال يخص دراسة السوق، فريقنا الرقمي والهجين، التقنية المستخدمة، أو خططنا للتوسع. كيف يمكنني مساعدتكم اليوم؟",
  },
];

const features = [
  {
    icon: Search,
    title: "تنبؤ استباقي",
    text: "اكتشاف النواقص قبل العملية بـ 48 ساعة.",
  },
  {
    icon: FileText,
    title: "أتمتة الطلبات",
    text: "إنشاء مسودات طلبات الشراء (POs) للموردين تلقائياً.",
  },
  {
    icon: Zap,
    title: "قرار لحظي",
    text: "تحويل دور الكادر الطبي إلى الاعتماد بضغطة زر واحدة.",
  },
];

const Index = () => {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    return () => {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          content:
            "شكراً على سؤالك. هذه نسخة تجريبية من الوكيل — في النسخة الكاملة، سيتم ربط هذا الحوار بقاعدة معرفة ديناميكية تشمل بيانات السوق ($2.1B TAM إقليمياً)، وثائق الفريق، وخريطة الطريق التقنية. هل ترغب في حجز عرض حي للاطلاع على لوحة التحكم؟",
        },
      ]);
    }, 1400);
  };

  const scrollToChat = () => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-slate-900 text-slate-50" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div dir="ltr" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30">
              <Activity className="h-4 w-4 text-emerald-500" />
            </span>
            <span className="text-emerald-500 font-bold tracking-tight">The Inventory Oracle</span>
          </div>
          <button
            onClick={scrollToChat}
            className="rounded-lg border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-500 transition-all hover:bg-emerald-500 hover:text-slate-900"
          >
            احجز عرضاً حياً
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                الجيل القادم من إدارة المخزون الجراحي
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-50">
                إمدادات استباقية لغرف عمليات{" "}
                <span className="text-emerald-500">لا تتوقف</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                وكيل ذكاء اصطناعي يربط جداول الجراحين بالمستودعات لحظياً، يتنبأ بالنواقص، ويؤتمت طلبات الشراء لضمان نسبة تأجيل 0%.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={scrollToChat}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/50"
                >
                  تحدث مع وكيلنا الذكي الآن
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mock dashboard */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/40 via-emerald-500/10 to-transparent blur-xl" />
              <div className="relative rounded-2xl border border-emerald-500/40 bg-slate-800 p-1 shadow-[0_0_60px_-15px_rgba(16,185,129,0.5)]">
                <div className="rounded-xl bg-slate-900/80 p-5">
                  <div dir="ltr" className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-mono text-slate-400">Command Center · Live</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { l: "العمليات اليوم", v: "24" },
                      { l: "تنبيهات نشطة", v: "3", danger: true },
                      { l: "مدخرات", v: "$48K" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                        <div className="text-xs text-slate-400">{s.l}</div>
                        <div className={`mt-1 text-2xl font-bold ${s.danger ? "text-rose-400" : "text-emerald-500"}`}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { or: "OR-4", proc: "Total Hip Arthroplasty", status: "risk" },
                      { or: "OR-2", proc: "Lap Cholecystectomy", status: "ok" },
                      { or: "OR-1", proc: "Knee Arthroscopy", status: "ok" },
                    ].map((r, i) => (
                      <div key={i} dir="ltr" className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-400 w-12">{r.or}</span>
                          <span className="text-sm text-slate-200">{r.proc}</span>
                        </div>
                        {r.status === "ok" ? (
                          <span className="text-xs font-medium text-emerald-400">● Ready</span>
                        ) : (
                          <span className="text-xs font-medium text-rose-400">● At Risk</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">لماذا The Inventory Oracle؟</h2>
            <p className="mt-4 text-slate-300">منصة متكاملة تجمع بين الذكاء الاصطناعي والأتمتة لتحويل سلسلة الإمداد الجراحية.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-700 bg-slate-800 p-7 transition-all hover:border-emerald-500/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.3)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30 transition-colors group-hover:bg-emerald-500/20">
                  <f.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-50">{f.title}</h3>
                <p className="mt-2 text-slate-300 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat */}
      <section id="chat" className="py-20 sm:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">اسأل وكيلنا الذكي الاستثماري</h2>
            <p className="mt-4 text-slate-300">هل لديك أسئلة عن نموذج العمل، التقنية، أو حجم السوق؟ اسأل وكيلنا الآن.</p>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl shadow-emerald-500/5 overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-700 bg-slate-800/50 px-5 py-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/40">
                <Bot className="h-4 w-4 text-emerald-500" />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-50">Oracle Agent</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> متصل
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="h-[420px] overflow-y-auto p-5 space-y-4 bg-slate-900/40">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <span
                    className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ${
                      m.role === "ai"
                        ? "bg-emerald-500/10 ring-emerald-500/40 text-emerald-500"
                        : "bg-slate-700 ring-slate-600 text-slate-200"
                    }`}
                  >
                    {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "ai"
                        ? "bg-slate-800 text-slate-200 border border-slate-700"
                        : "bg-emerald-500 text-slate-900 font-medium"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex gap-3">
                  <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/40 text-emerald-500">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      جاري التفكير
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.3s]" />
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={send} className="border-t border-slate-700 bg-slate-800 p-4 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-3 text-slate-900 transition-all hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 -scale-x-100" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">فريق العمل الهجين</h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            نموذج فريد يجمع بين الخبرة البشرية والوكلاء الرقميين لتحقيق أقصى سرعة وكفاءة.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-50">المؤسسون</h3>
              <p className="mt-3 text-slate-300">مرتضى وولاء — قيادة الرؤية، استراتيجية المنتج، والعلاقات مع المستشفيات.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
                <Bot className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-50">فريق الوكلاء الرقميين</h3>
              <p className="mt-3 text-slate-300">باحث، مسوق، مبرمج، ومدير عمليات — يعملون 24/7 لتسريع التنفيذ والابتكار.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div dir="ltr" className="text-emerald-500 font-bold">The Inventory Oracle</div>
          <div className="text-sm text-slate-400">© 2026 The Inventory Oracle. جميع الحقوق محفوظة.</div>
          <a href="mailto:contact@inventoryoracle.ai" className="text-sm text-slate-300 hover:text-emerald-500 transition-colors" dir="ltr">
            contact@inventoryoracle.ai
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
