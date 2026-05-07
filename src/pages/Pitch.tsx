import { Bot, ArrowLeft, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Pitch = () => {
  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        {/* Header */}
        <header className="mb-32 text-center sm:mb-40">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            عرض لجنة التحكيم
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
            مرحباً بلجنة التحكيم في{" "}
            <span className="text-foreground">The Inventory Oracle</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            استكشفوا مستقبل سلاسل الإمداد الطبية. تصفحوا الموقع الكامل أو اطرحوا
            أسئلتكم على وكيلنا الذكي أدناه.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 sm:text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              ادخل إلى الموقع (Enter the Website)
            </Link>
          </div>
        </header>

        {/* Chatbase */}
        <section className="mb-32 sm:mb-40">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              اسأل وكيلنا الذكي الاستثماري
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl sm:p-4">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/dwfu5ThHvvg2OavZeioSp"
              width="100%"
              style={{ height: "100%", minHeight: 700 }}
              frameBorder="0"
              allow="microphone"
            ></iframe>
          </div>
        </section>

        {/* Team */}
        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
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
        </section>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          The Inventory Oracle © 2026 · جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Pitch;