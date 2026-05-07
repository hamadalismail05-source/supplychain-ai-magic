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
      className="min-h-screen bg-background text-foreground"
    >
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-soft px-4 py-1.5 text-xs font-medium text-success">
            <Sparkles className="h-3.5 w-3.5" />
            عرض لجنة التحكيم
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
            مرحباً بلجنة التحكيم في{" "}
            <span className="text-success">The Inventory Oracle</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            استكشفوا مستقبل سلاسل الإمداد الطبية. يمكنكم تصفح النظام الحي أو طرح
            أسئلتكم على وكيلنا الذكي هنا.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 sm:text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              تصفح الموقع الكامل (Check Out the Full Website)
            </Link>
          </div>
        </header>

        {/* Chat */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">الوكيل الذكي الاستثماري</h2>
              <p className="text-xs text-muted-foreground">متصل · جاهز للإجابة على أسئلتكم</p>
            </div>
            <span className="mr-auto inline-flex h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_10px] shadow-success/60" />
          </div>

          <div ref={scrollRef} className="h-[440px] space-y-4 overflow-y-auto bg-background/40 px-6 py-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-5 py-3 text-sm leading-relaxed sm:text-base ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground border border-border"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-end">
                <div className="rounded-2xl border border-border bg-secondary px-5 py-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    جاري التفكير
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-success [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-success [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-success" />
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-secondary/40 px-4 py-4 sm:px-6">
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
                className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-success focus:outline-none focus:ring-2 focus:ring-success/30 sm:text-base"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground transition-colors hover:bg-success/90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="إرسال"
              >
                <Send className="h-5 w-5 -scale-x-100" />
              </button>
            </form>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          The Inventory Oracle © 2026 · جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Pitch;