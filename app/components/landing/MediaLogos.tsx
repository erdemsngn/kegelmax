"use client";

const MEDIA = [
  "Harvard Medical School",
  "Stanford Medicine",
  "Men's Health",
  "USA Today",
  "Mayo Clinic",
  "WebMD",
  "Healthline",
  "Cleveland Clinic",
];

// Sonsuz kayma için listeyi çift yap
const ITEMS = [...MEDIA, ...MEDIA];

export default function MediaLogos() {
  return (
    <section className="py-10 border-y border-[#1A1A1A] overflow-hidden">
      <p className="text-center text-xs text-[#555] uppercase tracking-widest mb-5 font-medium">
        Medyada Yer Aldı
      </p>

      {/* Marquee wrapper */}
      <div className="relative">
        {/* Sol fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
          style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
        {/* Sağ fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
          style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />

        <div className="flex gap-3 marquee-track pl-3">
          {ITEMS.map((m, i) => (
            <div
              key={i}
              className="shrink-0 text-center text-xs text-[#555] font-semibold py-2 px-4 rounded-lg border border-[#1E1E1E] whitespace-nowrap"
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
