const STEPS = [
  { n: "01", icon: "🎯", title: "Değerlendirmeni Al",  desc: "Kısa quiz ile ihtiyaçlarını ve hedeflerini belirle." },
  { n: "02", icon: "🤖", title: "Kişisel Planını Al",  desc: "AI destekli sistem sana özel program oluşturur." },
  { n: "03", icon: "🚀", title: "Dönüşümü Yaşa",       desc: "Günlük rehberlik ile hedefine 4 haftada ulaş." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 px-4 bg-[#0D0D0D]">
      <div className="max-w-[430px] mx-auto space-y-7">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-white">Nasıl Çalışır?</h2>
          <p className="text-[#888] text-sm">3 adımda başla, 4 haftada farkı hisset</p>
        </div>

        <div className="space-y-3">
          {STEPS.map(s => (
            <div key={s.n}
              className="flex gap-4 items-start p-5 bg-[#141414] border border-[#2A2A2A] rounded-2xl">
              <p className="text-3xl font-black text-[#C9A84C]/20 leading-none tabular-nums shrink-0">
                {s.n}
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <p className="font-bold text-white text-sm">{s.title}</p>
                </div>
                <p className="text-[#888] text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
