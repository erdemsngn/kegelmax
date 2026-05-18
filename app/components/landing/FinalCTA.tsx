import QuizStartButton from "./QuizStartButton";

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(201,168,76,0.09) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-[430px] mx-auto text-center space-y-6">
        <h2 className="text-3xl font-black text-white leading-tight">
          Dönüşümüne<br /><span className="text-[#C9A84C]">Bugün Başla</span>
        </h2>
        <p className="text-[#888] text-sm">50.000+ erkek bu programla sonuç aldı</p>
        <QuizStartButton className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-all btn-glow">
          Kendini Yeniden Keşfet →
        </QuizStartButton>
        <p className="text-[#555] text-xs">Kredi kartı gerekmez &nbsp;·&nbsp; İstediğin zaman iptal et</p>
      </div>
    </section>
  );
}
