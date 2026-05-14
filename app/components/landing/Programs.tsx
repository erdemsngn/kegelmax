"use client";
import { useState } from "react";
import Link from "next/link";

const PROGRAMS = [
  {
    tab: "Cinsellik Bir Beceridir",
    contents: ["30 günlük kapsamlı program", "Bilim destekli dersler", "Adım adım teknikler", "Günlük egzersizler", "İleri seviye teknikler"],
    results:  ["Daha yoğun orgazm", "Artan cinsel özgüven", "Güçlendirilmiş pelvik kaslar", "Daha iyi iletişim", "Beden farkındalığı"],
  },
  {
    tab: "Daha Uzun Dayanma",
    contents: ["8 haftalık program", "Fizyoloji modülü", "Psikoloji modülü", "Beceri & Teknikler", "Takviyeler"],
    results:  ["%250 süre artışı", "Tam kontrol", "Pelvik taban güçlendirme", "Erken boşalmayı unut", "Artırılmış özgüven"],
  },
  {
    tab: "Güçlü Ereksiyon",
    contents: ["Kan akışı egzersizleri", "Pelvik güçlendirme", "Yaşam tarzı planı", "Stres yönetimi", "Beslenme rehberi"],
    results:  ["Daha güçlü ereksiyon", "Artırılmış güven", "Daha iyi dolaşım", "Azalmış kaygı", "Uzun vadeli sağlık"],
  },
  {
    tab: "Genel Sağlık",
    contents: ["Bütünsel pelvik plan", "İdrar sağlığı", "Prostat desteği", "Core güçlendirme", "Stres azaltma"],
    results:  ["Daha iyi idrar kontrolü", "Azalan şikayetler", "Güçlü core kasları", "Kaliteli uyku", "Yaşam kalitesi artışı"],
  },
];

export default function Programs() {
  const [active, setActive] = useState(0);
  const p = PROGRAMS[active];

  return (
    <section id="programs" className="py-16 px-4 bg-[#0D0D0D]">
      <div className="max-w-[430px] mx-auto space-y-7">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-white">Programını Seç</h2>
          <p className="text-[#888] text-sm">Hedefine özel, bilim destekli program</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {PROGRAMS.map((prog, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                active === i
                  ? "bg-[#C9A84C] text-black"
                  : "bg-[#141414] border border-[#2A2A2A] text-[#888] hover:text-white"
              }`}>
              {prog.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">İçerik</p>
            <ul className="space-y-2">
              {p.contents.map(c => (
                <li key={c} className="flex items-start gap-2 text-xs text-[#888]">
                  <span className="text-[#C9A84C] mt-0.5">→</span>{c}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">Sonuçlar</p>
            <ul className="space-y-2">
              {p.results.map(r => (
                <li key={r} className="flex items-start gap-2 text-xs text-[#888]">
                  <span className="text-[#C9A84C] font-bold mt-0.5">✓</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link href="/quiz"
          className="block w-full text-center py-3.5 rounded-2xl bg-[#C9A84C] text-black font-bold text-sm hover:bg-[#E8C97A] transition-colors">
          Programına Başla →
        </Link>
      </div>
    </section>
  );
}
