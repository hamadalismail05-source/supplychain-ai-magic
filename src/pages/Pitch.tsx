import { Bot, ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Pitch = () => {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-slate-900 text-slate-100"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        {/* Header */}
        <header className="mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            عرض لجنة التحكيم
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            مرحباً بلجنة التحكيم في{" "}
            <span className="text-emerald-500">The Inventory Oracle</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            استكشفوا مستقبل سلاسل الإمداد الطبية. تصفحوا النظام الحي أو اطرحوا
            أسئلتكم على وكيلنا الذكي أدناه.
          </p>
          <div className="mt-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/50 sm:text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              الدخول إلى النظام الحي (Live Demo)
            </Link>
          </div>
        </header>

        {/* Chatbase */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              اسأل وكيلنا الذكي الاستثماري
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-2 shadow-2xl shadow-emerald-500/10 sm:p-4">
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
        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                الفريق الهجين
              </h3>
              <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                <span className="font-semibold text-emerald-400">حمد وولاء</span>{" "}
                (المؤسسون) جنباً إلى جنب مع فريق من{" "}
                <span className="font-semibold text-emerald-400">
                  الوكلاء الرقميين
                </span>{" "}
                لمهام البرمجة والبحث والعمليات.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-slate-500">
          The Inventory Oracle © 2026 · جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Pitch;