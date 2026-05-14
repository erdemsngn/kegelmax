const REVIEWS = [
  {
    handle: "@ahmetyilmaz35",
    text: "Birkaç ay içinde inanılmaz değişim. Kendimi daha kontrollü hissediyorum, partnerim de farkı fark etti.",
    date: "14 Mart 2025",
    program: "Daha Uzun Dayanma",
  },
  {
    handle: "@mehmetS28",
    text: "Artık kendime güveniyorum. Bu program hayatımı değiştirdi, gerçekten çok memnunum.",
    date: "2 Nisan 2025",
    program: "Güçlü Ereksiyon",
  },
  {
    handle: "@emre.t.izmir",
    text: "Bilimsel yaklaşımı çok beğendim. Gerçekten işe yarıyor, iki ay içinde somut sonuç aldım.",
    date: "27 Mart 2025",
    program: "Genel Sağlık",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 px-4 bg-[#0D0D0D]">
      <div className="max-w-[430px] mx-auto space-y-7">
        <h2 className="text-2xl font-black text-white">Kullanıcılarımızdan Gerçek Yorumlar</h2>

        <div className="space-y-3">
          {REVIEWS.map(r => (
            <div key={r.handle}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C]/40 to-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] text-xs font-black">
                    {r.handle[1].toUpperCase()}
                  </div>
                  <p className="text-xs text-[#888] font-mono">{r.handle}</p>
                </div>
                <span className="text-[#C9A84C] text-xs">★★★★★</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">"{r.text}"</p>
              <div className="flex items-center justify-between pt-1 border-t border-[#2A2A2A]">
                <p className="text-[#555] text-xs">{r.date}</p>
                <span className="text-[10px] text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded-full">{r.program}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
