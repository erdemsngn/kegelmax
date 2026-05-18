import QuizStartButton from "./QuizStartButton";

const METRICS = [
  { icon: "📊", label: "Kontrol",    value: "%58", cls: "float-1" },
  { icon: "❤️", label: "Libido",     value: "%39", cls: "float-2" },
  { icon: "🔥", label: "Sıklık",     value: "%41", cls: "float-3" },
  { icon: "😊", label: "Memnuniyet", value: "%55", cls: "float-4" },
];

// Unsplash CDN — ücretsiz, crop + boyut optimize
const BEFORE_IMG = "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=420&q=75&fit=crop&crop=faces,top";
const AFTER_IMG  = "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=420&q=75&fit=crop&crop=faces,top";

export default function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* ── Before / After fotoğraf şeridi ─────────────────────── */}
      <div className="relative w-full flex" style={{ height: 260 }}>
        {/* Sol — before (grayscale, karanlık) */}
        <div className="relative w-[45%] overflow-hidden">
          <img
            src={BEFORE_IMG}
            alt="Öncesi"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: "grayscale(100%) brightness(0.55)" }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)" }} />
          {/* Etiket */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 border border-red-500/40 text-red-400 text-[9px] font-bold px-2 py-1 rounded-lg">
              ŞİMDİ
            </span>
          </div>
        </div>

        {/* Orta ayraç — parlayan ok */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ left: "calc(45% - 22px)" }}>
          <div className="w-11 h-11 rounded-full bg-[#0A0A0A] border-2 border-[#C9A84C] flex items-center justify-center"
            style={{ boxShadow: "0 0 16px #C9A84C66" }}>
            <span className="text-[#C9A84C] text-base font-black">›</span>
          </div>
        </div>

        {/* Sağ — after (renkli, sıcak) */}
        <div className="relative w-[55%] overflow-hidden">
          <img
            src={AFTER_IMG}
            alt="Sonrası"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Hafif altın overlay */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 60%), linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)" }} />
          {/* Etiket */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-[#C9A84C] text-black text-[9px] font-black px-2 py-1 rounded-lg">
              28 GÜN SONRA
            </span>
          </div>
        </div>

        {/* Altta metin geçişi için gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0A0A0A)" }} />
      </div>

      {/* ── Radial glow ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-64"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%)" }} />

      {/* ── Metin + CTA ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[430px] mx-auto px-4 pt-5 pb-10 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs text-[#C9A84C] font-semibold">
          ⭐ 4.7 App Store Puanı &nbsp;•&nbsp; 1M+ Kullanıcı
        </div>

        {/* Heading */}
        <h1 className="text-[2.4rem] font-black leading-[1.05] tracking-tight">
          KEGEL MAX:<br />
          <span className="text-[#C9A84C]">Erkek Sağlığı</span> Koçu
        </h1>

        {/* Subtitle */}
        <p className="text-[#888] text-base leading-relaxed">
          Cinsel sağlığını ve performansını geliştirmek için{" "}
          <span className="text-[#E8C97A]">kişisel rehberin.</span>
        </p>

        {/* CTA */}
        <QuizStartButton />

        {/* Float metric cards 2×2 */}
        <div className="grid grid-cols-2 gap-3 pt-1">
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
