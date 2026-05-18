"use client";
import { useState, useEffect } from "react";
import PrivacyModal from "../PrivacyModal";

// 9-48 arası rastgele ama stabil görünen bir sayı (her oturumda sabit kalır)
function useViewerCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // İlk sayı: 9-48 arası rastgele
    const initial = Math.floor(Math.random() * 40) + 9;
    setCount(initial);

    // Her 18-35 saniyede bir ±1-2 değişsin → gerçekçi görünüm
    const id = setInterval(() => {
      setCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return Math.min(48, Math.max(9, next));
      });
    }, Math.floor(Math.random() * 17_000) + 18_000);

    return () => clearInterval(id);
  }, []);

  return count;
}

export default function StickyCtaBar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const viewers = useViewerCount();

  // Sayfa biraz kaydırılınca göster
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto
                      bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#2A2A2A]
                      px-4 py-3 flex items-center gap-3">
        {/* Live sayaç */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <p className="text-[#888] text-[11px] whitespace-nowrap">
            <span className="text-white font-bold">{viewers || "…"}</span> kişi inceliyor
          </p>
        </div>

        {/* CTA Butonu */}
        <button
          onClick={() => setOpen(true)}
          className="flex-1 py-3 rounded-xl bg-[#C9A84C] text-black font-black text-sm
                     hover:bg-[#E8C97A] transition-colors text-center whitespace-nowrap"
        >
          Programa Hemen Başla →
        </button>
      </div>

      <PrivacyModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
