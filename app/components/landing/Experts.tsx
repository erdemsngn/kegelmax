const EXPERTS = [
  {
    name: "Dr. Justin Houman",
    title: "Üroloji & Erkek Sağlığı Uzmanı",
    creds: "MD · Cedars-Sinai Medical Center, Los Angeles · Erkek Üreme Tıbbı Uzmanı",
    photo: "https://cdn-ilcmmbp.nitrocdn.com/bDoXZAqzTaiQhfyDYINwhZkkknsYnYLj/assets/images/optimized/rev-ab346e9/houmanmd.com/wp-content/uploads/2022/06/Houman_Doctor-Photo2.jpg",
    quote: "Pelvik taban egzersizleri, erektil disfonksiyon ve erken boşalma için klinik olarak kanıtlanmış en etkili ilaçsız yöntemdir. Hastalarıma ilk adım olarak öneririm.",
    link: "https://houmanmd.com",
  },
  {
    name: "Dr. Susie Gronski",
    title: "Pelvik Taban Fizyoterapisti",
    creds: "DPT · Sertifikalı Pelvik Rehabilitasyon Uzmanı · AASECT Cinsel Sağlık Eğitimcisi",
    photo: "https://images.squarespace-cdn.com/content/v1/638976360f9ac40c8f08f3c0/ef0bf872-6784-448b-b8d6-24deb39aad0f/Susie-Gronski.jpg",
    quote: "Erkeklerin pelvik taban sağlığı kronik olarak göz ardı ediliyor. Doğru egzersiz programı cinsel performansı, idrar kontrolünü ve özgüveni köklü biçimde değiştirebilir.",
    link: "https://drsusieg.com",
  },
  {
    name: "Gerard Greene",
    title: "Erkek Sağlığı Fizyoterapisti",
    creds: "MSc · Coventry Üniversitesi Kıdemli Öğretim Üyesi · Londra Erkek Sağlığı Kliniği",
    photo: "https://myopainseminars.com/wp-content/uploads/2019/10/gerard-img.png",
    quote: "Yıllar boyunca erkeklerin bu konuda profesyonel yardım aramaktan çekindiğini gördüm. Dijital programlar bu engeli ortadan kaldırıyor ve hayat kalitesini ciddi ölçüde yükseltiyor.",
    link: "https://londonmenshealth.physio",
  },
];

export default function Experts() {
  return (
    <section className="py-16 px-4 bg-[#0A0A0A]">
      <div className="max-w-[430px] mx-auto space-y-7">

        {/* Başlık */}
        <div className="space-y-1.5">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Uzman Danışmanlar</p>
          <h2 className="text-2xl font-black text-white leading-tight">
            Alanında Kanıtlanmış<br />
            <span className="text-[#C9A84C]">Uzmanlarca Onaylandı</span>
          </h2>
          <p className="text-[#888] text-sm">
            Programımız üroloji, pelvik fizyoterapi ve cinsel sağlık alanlarında çalışmalar yürütmüş uzmanlarla geliştirildi.
          </p>
        </div>

        {/* Uzman kartları */}
        <div className="space-y-3">
          {EXPERTS.map(e => (
            <div key={e.name}
              className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-5 space-y-3">

              {/* Üst — foto + isim */}
              <div className="flex items-center gap-3">
                <img
                  src={e.photo}
                  alt={e.name}
                  className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#C9A84C]/30 shrink-0 bg-[#1E1E1E]"
                />
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm leading-tight">{e.name}</p>
                  <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{e.title}</p>
                  <p className="text-[#555] text-[10px] leading-snug mt-0.5 line-clamp-2">{e.creds}</p>
                </div>
              </div>

              {/* Alıntı */}
              <div className="border-l-2 border-[#C9A84C]/40 pl-3">
                <p className="text-white/70 text-xs leading-relaxed italic">
                  &ldquo;{e.quote}&rdquo;
                </p>
              </div>

              {/* Kaynak linki */}
              <a
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#555] text-[10px] hover:text-[#888] transition-colors"
              >
                🔗 Profili incele
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[#444] text-[10px]">
          Uzmanlarımız yayımlanmış çalışmaları ve klinik deneyimleriyle bu alanda referans kabul edilmektedir.
        </p>
      </div>
    </section>
  );
}
