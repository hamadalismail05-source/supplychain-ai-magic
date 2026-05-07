import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, Send, ArrowLeft, Sparkles } from "lucide-react";

type Msg = { role: "ai" | "user"; text: string };

const INITIAL: Msg = {
  role: "ai",
  text:
    "مرحباً! أنا الوكيل الذكي لـ The Inventory Oracle. يمكنني إجابتكم على أي تفاصيل تخص دراسة السوق، فريقنا (حمد وولاء والوكلاء الرقميين)، التقنية المستخدمة، أو خطط التوسع. تفضلوا بطرح أسئلتكم.",
};

const Pitch = () => {
  const [messages, setMessages] = useState<Msg[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = () => {
    const text = input.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "شكراً على سؤالكم. هذه نسخة عرض تجريبية للوكيل الذكي. سيتم ربطها قريباً بنموذج لغوي متقدم للإجابة بتفصيل عن دراسة السوق والفريق والتقنية وخطط التوسع.",
        },
      ]);
      setThinking(false);
    }, 1400);
  };

  return (
    <div
      dir="rtl"
      lang="ar"
      style={{ fontFamily: "'Cairo', sans-serif" }}
      className="min-h-screen bg-slate-900 text-slate-100"
    >
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            عرض لجنة التحكيم
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            مرحباً بلجنة التحكيم في{" "}
            <span className="text-emerald-500">The Inventory Oracle</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            استكشفوا مستقبل سلاسل الإمداد الطبية. يمكنكم تصفح النظام الحي أو طرح
            أسئلتكم على وكيلنا الذكي هنا.
          </p>
          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/50 sm:text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              الدخول إلى النظام الحي (Live Demo)
            </Link>
          </div>
        </header>

        {/* Chat */}
        <section className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-800 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center gap-3 border-b border-slate-700/60 bg-slate-800/80 px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">الوكيل الذكي الاستثماري</h2>
              <p className="text-xs text-slate-400">متصل · جاهز للإجابة على أسئلتكم</p>
            </div>
            <span className="mr-auto inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px] shadow-emerald-500" />
          </div>

          <div ref={scrollRef} className="h-[440px] space-y-4 overflow-y-auto px-6 py-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-5 py-3 text-sm leading-relaxed sm:text-base ${
                    m.role === "user"
                      ? "bg-emerald-500 text-slate-900"
                      : "bg-slate-700/70 text-slate-100"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-end">
                <div className="rounded-2xl bg-slate-700/70 px-5 py-3 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    جاري التفكير
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400" />
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-700/60 bg-slate-800/80 px-4 py-4 sm:px-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل وكيلنا هنا..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-slate-900 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="إرسال"
              >
                <Send className="h-5 w-5 -scale-x-100" />
              </button>
            </form>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          The Inventory Oracle © 2026 · جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Pitch;