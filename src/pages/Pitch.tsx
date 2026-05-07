import { Bot, ArrowLeft, Users, Sparkles, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Pitch = () => {
  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-background via-background to-transparent pointer-events-none" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            عرض لجنة التحكيم
          </span>

          <h1 className="mt-6 max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground text-balance leading-[1.15]">
            مرحباً بلجنة التحكيم في{" "}
            <span className="relative whitespace-nowrap inline-block pb-3">
              The Inventory Oracle
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 7 Q 50 2, 100 5 T 198 6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
            استكشفوا مستقبل سلاسل الإمداد الطبية. تصفحوا الموقع الكامل أو اطرحوا
            أسئلتكم على وكيلنا الذكي أدناه.
          </p>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_20px_50px_-15px_hsl(var(--foreground)/0.4)] transition-all hover:bg-primary/90 hover:-translate-y-0.5 sm:text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              ادخل إلى الموقع (Enter the Website)
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> ذكاء اصطناعي وكيل</span>
            <span className="inline-flex items-center gap-2"><Activity className="h-3.5 w-3.5" /> سلاسل إمداد طبية</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> جاهز للمؤسسات</span>
          </div>
        </div>
      </section>

      {/* Chatbase */}
      <section className="mx-auto max-w-6xl px-6 pb-32 sm:pb-40">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm">
            <Bot className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            اسأل وكيلنا الذكي الاستثماري
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            احصلوا على إجابات فورية حول الفريق، التقنية، دراسة السوق وخطط التوسع.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_hsl(var(--foreground)/0.15)]">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70 bg-[hsl(45_93%_58%)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              </div>
              <span className="ms-2 text-xs font-medium text-muted-foreground">Investor Agent · Live</span>
              <span className="ms-auto inline-flex items-center gap-1.5 text-xs text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                متصل
              </span>
            </div>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/dwfu5ThHvvg2OavZeioSp"
              width="100%"
              style={{ height: "100%", minHeight: 700, display: "block" }}
              frameBorder="0"
              allow="microphone"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/60 text-foreground">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                الفريق الهجين
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                <span className="font-semibold text-foreground">حمد وولاء</span>{" "}
                (المؤسسون) جنباً إلى جنب مع فريق من{" "}
                <span className="font-semibold text-foreground">الوكلاء الرقميين</span>{" "}
                لمهام البرمجة والبحث والعمليات.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          The Inventory Oracle © 2026 · جميع الحقوق محفوظة
        </p>
      </section>
    </div>
  );
};

export default Pitch;