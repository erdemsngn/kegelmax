"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 58, label: "Kontrol",    desc: "Dayanma ve kontrol arttı" },
  { value: 41, label: "Sıklık",     desc: "Haftada daha sık seks" },
  { value: 39, label: "Libido",     desc: "Cinsel istek arttı" },
  { value: 55, label: "Memnuniyet", desc: "Genel tatmin arttı" },
];

function useCountUp(target: number) {
  const [n, setN] = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const start = performance.now();
        const dur   = 1800;
        const tick  = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return { n, ref };
}

function StatCard(s: (typeof STATS)[0]) {
  const { n, ref } = useCountUp(s.value);
  return (
    <div ref={ref} className="text-center space-y-1 p-5 bg-[#141414] border border-[#2A2A2A] rounded-2xl">
      <p className="text-4xl font-black text-[#C9A84C] tabular-nums">{n}%</p>
      <p className="text-white font-bold text-sm">{s.label}</p>
      <p className="text-[#888] text-xs">{s.desc}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[430px] mx-auto space-y-7">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-white">Beklenen Sonuçlar</h2>
          <p className="text-[#888] text-sm">4 hafta sonra kullanıcıların yarısından fazlası fark ediyor</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
