const FEATURES = [
  { icon: "🔗", title: "Kegel + SKT Sinerjisi",  desc: "Kas gücü ve Duyusal Kontrol Tekniği birlikte çalışır." },
  { icon: "🏥", title: "Klinik Doğrulanmış",      desc: "Kanıta dayalı, uzman onaylı yöntemler." },
  { icon: "🧠", title: "Mental Destek",            desc: "Kaygıyı azalt, kontrolü geri kazan." },
  { icon: "👨‍⚕️", title: "Uzman Rehberliği",      desc: "Lider cinsel sağlık uzmanlarıyla geliştirilen program." },
  { icon: "🎧", title: "Rehberli Meditasyon",     desc: "Uyarılmayı ve ereksiyon kalitesini güçlendir." },
];

export default function WhyUnique() {
  return (
    <section className="py-16 px-4 bg-[#0D0D0D]">
      <div className="max-w-[430px] mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.28em] uppercase text-[#C9A84C] font-semibold">Fark</p>
          <h2 className="text-2xl font-black text-white">Neden Programımız Eşsiz?</h2>
        </div>

        <div className="space-y-3">
          {FEATURES.map(f => (
            <div key={f.title}
              className="flex gap-4 items-start p-4 bg-[#141414] border border-[#2A2A2A] rounded-2xl hover:border-[#C9A84C]/30 transition-colors">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <p className="font-bold text-white text-sm">{f.title}</p>
                <p className="text-[#888] text-xs mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
