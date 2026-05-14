"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Bu program performansımı nasıl geliştirir?",
    a: "Program, pelvik taban kaslarını güçlendiren Kegel egzersizleri ve Duyusal Kontrol Tekniği (SKT) ile dayanıklılığı, ereksiyonu ve genel cinsel sağlığı bilimsel yöntemlerle artırır.",
  },
  {
    q: "Durumum herkesten farklıysa ne olur?",
    a: "Quiz ile kişisel durumunu analiz ediyoruz ve sana özel program oluşturuyoruz. Her kullanıcının başlangıç noktası farklıdır; plan buna göre uyarlanır.",
  },
  {
    q: "Planıma nasıl erişirim?",
    a: "Satın alma sonrası e-posta adresine aktivasyon linki gönderilir. Telefon tarayıcından doğrudan erişebilirsin, uygulama indirmen gerekmez.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-[430px] mx-auto space-y-7">
        <h2 className="text-2xl font-black text-white">Sıkça Sorulan Sorular</h2>

        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={i}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left">
                <p className="text-white text-sm font-medium pr-3">{f.q}</p>
                <span className={`text-[#C9A84C] text-lg shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-[#888] text-sm leading-relaxed border-t border-[#2A2A2A] pt-4">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
