const REVIEWS = [
  {
    handle: "@ahmetyilmaz35",
    name: "Ahmet Y.",
    program: "Daha Uzun Dayanma",
    weeks: 3,
    text: "İlk haftada bile bir şeylerin değiştiğini hissettim. 3. haftada partnerim farkı açıkça söyledi. Çok şüpheciydim ama bu gerçekten işe yarıyor.",
    date: "14 Mart 2025",
  },
  {
    handle: "@murat.k.42",
    name: "Murat K.",
    program: "Güçlü Ereksiyon",
    weeks: 4,
    text: "37 yaşındayım ve son 2 yıldır sorun yaşıyordum. İlaç kullanmak istemedim. 4 hafta sonra kendimi 10 yıl önceki gibi hissediyorum. Keşke daha önce bulsaydım.",
    date: "2 Nisan 2025",
  },
  {
    handle: "@emre.t.izmir",
    name: "Emre T.",
    program: "Daha Uzun Dayanma",
    weeks: 2,
    text: "Günde sadece 5-7 dakika. 2. haftanın sonunda kontrolün tamamen bende olduğunu fark ettim. Partneriyle ilişkisi olan herkese öneririm.",
    date: "27 Mart 2025",
  },
  {
    handle: "@burakcan44",
    name: "Burak C.",
    program: "Cinsellik Bir Beceridir",
    weeks: 6,
    text: "Sadece fiziksel değil zihinsel olarak da çok şey öğrendim. Artık kaygılanmıyorum, o kaygının kendisi de sorunu büyütüyormuş zaten. Altı hafta inanılmaz geçti.",
    date: "9 Mayıs 2025",
  },
  {
    handle: "@serkan.demir88",
    name: "Serkan D.",
    program: "Genel Sağlık",
    weeks: 8,
    text: "Prostat şikayetlerim vardı, doktorum egzersiz önermişti ama nasıl yapacağımı bilmiyordum. Bu program tam olarak ihtiyacım olandı. 2 ayda şikayetlerim büyük ölçüde azaldı.",
    date: "18 Nisan 2025",
  },
  {
    handle: "@onur.b.istanbul",
    name: "Onur B.",
    program: "Daha Uzun Dayanma",
    weeks: 3,
    text: "Karım farkı o kadar çabuk fark etti ki şoke oldu. 'Ne yaptın?' diye sordu. Bu programı yaptım dedim. Şimdi o da tavsiye ediyor 😄",
    date: "1 Mayıs 2025",
  },
];

const STATS = [
  { pct: "58%", label: "Kontrol ve dayanıklılıkta iyileşme bildirdi" },
  { pct: "41%", label: "Haftada daha sık cinsel ilişki yaşıyor" },
  { pct: "39%", label: "Libidolarında belirgin artış hissetti" },
  { pct: "55%", label: "Genel cinsel memnuniyeti arttı" },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 px-4 bg-[#0D0D0D]">
      <div className="max-w-[430px] mx-auto space-y-8">

        {/* Başlık */}
        <div className="space-y-1.5">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Gerçek Kullanıcılar</p>
          <h2 className="text-2xl font-black text-white">
            Hayatlarını Değiştirenler<br />
            <span className="text-[#888] font-normal text-lg">Ne Söylüyor?</span>
          </h2>
        </div>

        {/* İstatistik özeti */}
        <div className="grid grid-cols-2 gap-3">
          {STATS.map(s => (
            <div key={s.pct} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 space-y-1">
              <p className="text-[#C9A84C] text-2xl font-black">{s.pct}</p>
              <p className="text-[#888] text-[11px] leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-[#444] text-[10px] text-center -mt-2">
          * 4 haftalık kullanım sonrası öz-bildirim anketi (n=12.400)
        </p>

        {/* Yorumlar */}
        <div className="space-y-3">
          {REVIEWS.map(r => (
            <div key={r.handle}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C]/40 to-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-xs font-black shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{r.name}</p>
                    <p className="text-[#555] text-[10px] font-mono">{r.handle}</p>
                  </div>
                </div>
                <span className="text-[#C9A84C] text-xs tracking-tight">★★★★★</span>
              </div>

              <p className="text-white/80 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>

              <div className="flex items-center justify-between pt-1 border-t border-[#1E1E1E]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#555]">{r.date}</span>
                  <span className="text-[#333]">·</span>
                  <span className="text-[10px] text-[#555]">{r.weeks}. hafta</span>
                </div>
                <span className="text-[10px] text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded-full border border-[#C9A84C]/20">
                  {r.program}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* App Store özet */}
        <div className="flex items-center justify-center gap-6 py-4 border border-[#1E1E1E] rounded-2xl">
          <div className="text-center">
            <p className="text-white font-black text-xl">4.7</p>
            <p className="text-[#C9A84C] text-xs">★★★★★</p>
            <p className="text-[#555] text-[10px]">App Store</p>
          </div>
          <div className="w-px h-10 bg-[#1E1E1E]" />
          <div className="text-center">
            <p className="text-white font-black text-xl">7.000+</p>
            <p className="text-[#555] text-[10px]">5 yıldızlı yorum</p>
          </div>
          <div className="w-px h-10 bg-[#1E1E1E]" />
          <div className="text-center">
            <p className="text-white font-black text-xl">1M+</p>
            <p className="text-[#555] text-[10px]">Kullanıcı</p>
          </div>
        </div>
      </div>
    </section>
  );
}
