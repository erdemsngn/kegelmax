import Link from "next/link";

const METRICS = [
  { icon: "📊", label: "Kontrol",    value: "%58", cls: "float-1" },
  { icon: "❤️", label: "Libido",     value: "%39", cls: "float-2" },
  { icon: "🔥", label: "Sıklık",     value: "%41", cls: "float-3" },
  { icon: "😊", label: "Memnuniyet", value: "%55", cls: "float-4" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
      {/* Radial gold glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(201,168,76,0.13) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-[430px] mx-auto px-4 py-12 space-y-7">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs text-[#C9A84C] font-semibold">
          ⭐ 4.7 App Store Puanı &nbsp;•&nbsp; 1M+ Kullanıcı
        </div>

        {/* Heading */}
        <h1 className="text-[2.6rem] font-black leading-[1.05] tracking-tight">
          KEGEL MAX:<br />
          <span className="text-[#C9A84C]">Erkek Sağlığı</span> Koçu
        </h1>

        {/* Subtitle */}
        <p className="text-[#888] text-base leading-relaxed">
          Cinsel sağlığını ve performansını geliştirmek için{" "}
          <span className="text-[#E8C97A]">kişisel rehberin.</span>
        </p>

        {/* CTA */}
        <Link href="/quiz"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-all btn-glow">
          Ücretsiz Değerlendirmeni Al →
        </Link>

        {/* Float metric cards 2×2 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {METRICS.map(m => (
            <div key={m.label}
              className={`${m.cls} bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 space-y-1`}>
              <span className="text-xl">{m.icon}</span>
              <p className="text-xs text-[#888]">{m.label}</p>
              <p className="text-2xl font-black text-[#C9A84C]">{m.value}</p>
              <p className="text-[10px] text-[#555]">artış</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
