const WITHOUT = [
  "Çok erken bitmekten utanma",
  "Seks sırasında gergin hissetme",
  "Kontrol eksikliği",
  "Performans kaygısı",
  "Düşük enerji ve libido",
];
const WITH = [
  "Performans kaygısını azalt",
  "SKT ve dayanıklılık artır",
  "Kontrol ve tempo kazan",
  "Suçsuz, baskısız bağlantı",
  "Uzun süre için hızlı teknikler",
];

export default function Comparison() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[430px] mx-auto space-y-7">
        <h2 className="text-2xl font-black text-white">Fark Ne?</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Without */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-[#888] uppercase tracking-wider">Kegel Max Olmadan</p>
            <ul className="space-y-2.5">
              {WITHOUT.map(w => (
                <li key={w} className="flex items-start gap-2 text-xs text-[#666] leading-snug">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span>{w}
                </li>
              ))}
            </ul>
          </div>
          {/* With */}
          <div className="bg-[#141414] border border-[#C9A84C]/30 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">Kegel Max İle</p>
            <ul className="space-y-2.5">
              {WITH.map(w => (
                <li key={w} className="flex items-start gap-2 text-xs text-white/80 leading-snug">
                  <span className="text-[#C9A84C] mt-0.5 shrink-0 font-bold">✓</span>{w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
