"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "../components/Logo";

// ── Step 1: Loading ─────────────────────────────────────────────────────────
const BARS = [
  "Sağlık göstergeleri",
  "Cinsel davranışlar",
  "Psikoloji durumu",
  "Kegel planı",
];

function LoadingStep({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const targets = [100, 100, 100, 87];
    const delays  = [0, 400, 800, 1200];
    const timers: ReturnType<typeof setTimeout>[] = [];

    targets.forEach((target, i) => {
      timers.push(setTimeout(() => {
        const start = performance.now();
        const dur = 700;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setProgress(prev => {
            const next = [...prev];
            next[i] = Math.round(p * target);
            return next;
          });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delays[i]));
    });

    timers.push(setTimeout(onDone, 3200));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="flex flex-col flex-1 justify-between px-4 py-10">
      <div className="space-y-3">
        <LogoIcon size={32} />
        <h2 className="text-2xl font-black text-white pt-4">Cevapların analiz ediliyor...</h2>
        <p className="text-[#888] text-sm">Kişisel planın hazırlanıyor</p>
      </div>

      <div className="space-y-5">
        {BARS.map((label, i) => (
          <div key={label} className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#888]">
              <span>{label}</span>
              <span className="text-[#C9A84C] font-bold tabular-nums">{progress[i]}%</span>
            </div>
            <div className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A84C] rounded-full transition-all duration-100"
                style={{ width: `${progress[i]}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 space-y-3">
        <p className="text-xs text-[#888] text-center">1.000.000+ kullanıcı tarafından güvenildi</p>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C]/30 to-transparent flex items-center justify-center text-sm shrink-0">A</div>
          <div>
            <p className="text-white text-xs font-medium">@ahmetyilmaz35</p>
            <p className="text-[#888] text-xs mt-0.5">"Birkaç ayda inanılmaz değişim. Kesinlikle tavsiye ederim."</p>
            <p className="text-[#C9A84C] text-xs mt-1">★★★★★</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Goal ────────────────────────────────────────────────────────────
const BULLETS = [
  { icon: "💪", text: "Nazik ama etkili egzersizlerle kontrol ve dayanıklılık" },
  { icon: "🏃", text: "Ekipmansız dayanıklılık antrenmanları" },
  { icon: "🧠", text: "Daha uzun sürmek için özel ipuçları ve teknikler" },
  { icon: "🤖", text: "7/24 Cinsel Performans Koçun" },
];

function GoalStep({ onNext }: { onNext: () => void }) {
  const goalDate = new Date();
  goalDate.setDate(goalDate.getDate() + 28);
  const dateStr = goalDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });

  return (
    <div className="flex flex-col flex-1 gap-6 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <p className="text-[#888] text-sm">Hedef tarihine ulaş</p>
        <h2 className="text-2xl font-black text-white">
          Hedefine Ulaş:{" "}
          <span className="text-[#C9A84C] underline underline-offset-4">{dateStr}</span>
        </h2>
      </motion.div>

      {/* Animated S-curve */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4">
        <svg viewBox="0 0 280 145" className="w-full overflow-visible">
          {/* Grid lines */}
          {[0, 40, 80, 120].map((y, i) => (
            <line key={i} x1="30" y1={130 - y} x2="270" y2={130 - y} stroke="#1E1E1E" strokeWidth="1" />
          ))}
          {[0, 40, 80, 120].map((y, i) => (
            <text key={i} x="5" y={134 - y} fill="#444" fontSize="8">{i * 100}%</text>
          ))}

          {/* Gradient area fill — static */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M40 125 C80 125 100 105 130 85 S185 30 255 12 L255 130 L40 130Z"
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          />

          {/* Animated main line */}
          <motion.path
            d="M40 125 C80 125 100 105 130 85 S185 30 255 12"
            stroke="#C9A84C"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Dots + week labels — appear sequentially */}
          {[
            { x: 40,  y: 125, l: "Hafta 1", delay: 0.3 },
            { x: 110, y: 100, l: "Hafta 2", delay: 0.8 },
            { x: 180, y: 52,  l: "Hafta 3", delay: 1.3 },
            { x: 255, y: 12,  l: "Hafta 4", delay: 1.8 },
          ].map(p => (
            <motion.g key={p.l}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: p.delay, duration: 0.3 }}>
              <circle cx={p.x} cy={p.y} r="4" fill="#C9A84C" />
              <text x={p.x} y={p.y - 8} textAnchor="middle" fill="#888" fontSize="7">{p.l}</text>
            </motion.g>
          ))}

          {/* "İlk Sonuçlar" label */}
          <motion.text
            x="80" y="108" textAnchor="middle" fill="#888" fontSize="7"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}>
            İlk Sonuçlar
          </motion.text>

          {/* "Hedef" label */}
          <motion.text
            x="255" y="5" textAnchor="middle" fill="#C9A84C" fontSize="8" fontWeight="700"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}>
            Hedef ↑
          </motion.text>

          <text x="148" y="72" textAnchor="middle" fill="#C9A84C" fontSize="7.5" fontWeight="600">
            Mahrem Hayat Seviyesi
          </text>
        </svg>
      </div>

      {/* Staggered bullets */}
      <div className="space-y-3">
        {BULLETS.map((b, i) => (
          <motion.div
            key={b.icon}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.1 + i * 0.3, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <span className="text-xl shrink-0">{b.icon}</span>
            <p className="text-white/80 text-sm leading-relaxed">{b.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 0.4 }}
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors btn-glow"
      >
        Dönüşüme Başla 🚀
      </motion.button>
    </div>
  );
}

// ── Step 3: Comparison table ─────────────────────────────────────────────────
function ComparisonStep() {
  const router = useRouter();

  const rows = [
    { label:"Kegel Seviyesi",       before:"Başlangıç",         after:"Uzman" },
    { label:"SKT Seviyesi",          before:"Keşfediliyor",      after:"Kontrolde" },
    { label:"Partner Memnuniyeti",   before:"Ortalamanın altı",  after:"Yüksek" },
    { label:"Dayanıklılık",          before:"Ortalama",          after:"Mükemmel" },
  ];

  return (
    <div className="flex flex-col flex-1 gap-7 px-4 py-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white">Kişisel 28 Günlük<br/>Kegel Meydan Okuması</h2>
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-[#2A2A2A]">
          <div className="p-3 col-span-1" />
          <div className="p-3 border-l border-[#2A2A2A] text-center">
            <p className="text-xs text-[#666] font-semibold">Önce</p>
          </div>
          <div className="p-3 border-l border-[#C9A84C]/30 text-center bg-[#C9A84C]/5">
            <p className="text-xs text-[#C9A84C] font-semibold">Sonra</p>
          </div>
        </div>
        {rows.map((r, i) => (
          <div key={r.label}
            className={`grid grid-cols-3 ${i < rows.length - 1 ? "border-b border-[#1E1E1E]" : ""}`}>
            <div className="p-3 flex items-center">
              <p className="text-xs text-[#888] leading-snug">{r.label}</p>
            </div>
            <div className="p-3 border-l border-[#2A2A2A] flex items-center justify-center">
              <p className="text-xs text-[#555]">{r.before}</p>
            </div>
            <div className="p-3 border-l border-[#C9A84C]/30 bg-[#C9A84C]/5 flex items-center justify-center">
              <p className="text-xs text-[#C9A84C] font-bold">{r.after}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => router.push("/checkout")}
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors">
        Planımı Almak İstiyorum →
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ResultPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col max-w-[430px] mx-auto">
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col flex-1">
          {step === 0 && <LoadingStep onDone={() => setStep(1)} />}
          {step === 1 && <GoalStep    onNext={() => setStep(2)} />}
          {step === 2 && <ComparisonStep />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
