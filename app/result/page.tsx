"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "../components/Logo";

// ── Konfeti (canvas, dependency-free) ───────────────────────────────────────
function fireConfetti() {
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed", top: "0", left: "0",
    width: "100%", height: "100%",
    pointerEvents: "none", zIndex: "9999",
  });
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  type P = { x:number; y:number; w:number; h:number; color:string; vy:number; vx:number; rot:number; rotV:number; opacity:number };
  const colors = ["#C9A84C","#E8C97A","#ffffff","#FFD700","#C9A84C"];
  const particles: P[] = Array.from({ length: 90 }, () => ({
    x:       Math.random() * canvas.width,
    y:       -Math.random() * 200 - 10,
    w:       Math.random() * 9 + 4,
    h:       Math.random() * 5 + 2,
    color:   colors[Math.floor(Math.random() * colors.length)],
    vy:      Math.random() * 3.5 + 1.5,
    vx:      (Math.random() - 0.5) * 2.5,
    rot:     Math.random() * 360,
    rotV:    (Math.random() - 0.5) * 6,
    opacity: 1,
  }));

  const start = Date.now();
  let raf: number;
  const draw = () => {
    const elapsed = Date.now() - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.rotV;
      if (elapsed > 900) p.opacity = Math.max(0, p.opacity - 0.03);
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (elapsed < 1600) raf = requestAnimationFrame(draw);
    else if (document.body.contains(canvas)) document.body.removeChild(canvas);
  };
  raf = requestAnimationFrame(draw);
}

// ── Analiz log mesajları ─────────────────────────────────────────────────────
const LOG_MSGS = [
  "Quiz cevapları okunuyor...",
  "Yaş ve hedefler değerlendiriliyor...",
  "Pelvik taban kas profili çıkarılıyor...",
  "Kontrol skoru hesaplanıyor...",
  "Davranışsal örüntüler analiz ediliyor...",
  "Özgüven parametreleri işleniyor...",
  "Psikoloji profili oluşturuluyor...",
  "Partner memnuniyet endeksi hesaplanıyor...",
  "Bilim destekli teknikler eşleştiriliyor...",
  "Günlük egzersiz yoğunluğu ayarlanıyor...",
  "Kişisel kegel programı derleniyor...",
  "✓ Analiz tamamlandı. Planın hazır!",
];
const MSG_INTERVAL = 460; // ms

// ── Step 1: Loading ─────────────────────────────────────────────────────────
const BARS = [
  "Sağlık göstergeleri",
  "Cinsel davranışlar",
  "Psikoloji durumu",
  "Kegel planı",
];
const TARGETS = [100, 100, 100, 87];
const BAR_DURATION = 1100;

function LoadingStep({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [activeBar, setActiveBar] = useState(0);
  const [done, setDone]           = useState(false);
  const [logs, setLogs]           = useState<string[]>([LOG_MSGS[0]]);
  const logRef                    = useRef<HTMLDivElement>(null);

  // Sıralı bar animasyonu
  useEffect(() => {
    let cancelled = false;
    let rafId: number;

    function fillBar(barIndex: number) {
      if (cancelled || barIndex >= BARS.length) {
        if (!cancelled) {
          setDone(true);
          fireConfetti();
        }
        return;
      }
      setActiveBar(barIndex);
      const start = performance.now();
      const target = TARGETS[barIndex];

      const tick = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - start) / BAR_DURATION, 1);
        setProgress(prev => {
          const next = [...prev];
          next[barIndex] = Math.round(p * target);
          return next;
        });
        if (p < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setTimeout(() => fillBar(barIndex + 1), 300);
        }
      };
      rafId = requestAnimationFrame(tick);
    }

    fillBar(0);
    return () => { cancelled = true; cancelAnimationFrame(rafId); };
  }, []);

  // Kayan log mesajları
  useEffect(() => {
    let idx = 1;
    const id = setInterval(() => {
      if (idx >= LOG_MSGS.length) { clearInterval(id); return; }
      const msg = LOG_MSGS[idx++];          // updater dışında artır
      setLogs(prev => [...prev, msg]);
      setTimeout(() => {
        if (logRef.current) {
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
      }, 30);
    }, MSG_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-6 px-4 py-10">
      {/* Başlık */}
      <div className="space-y-1">
        <LogoIcon size={32} />
        <h2 className="text-2xl font-black text-white pt-4">
          {done ? "Planın hazır! 🎉" : "Cevapların analiz ediliyor..."}
        </h2>
        <p className="text-[#888] text-sm">Kişisel programın oluşturuluyor</p>
      </div>

      {/* Progress barlar */}
      <div className="space-y-4">
        {BARS.map((label, i) => (
          <div key={label} className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#888]">
              <span className={i === activeBar && !done ? "text-white font-semibold" : ""}>{label}</span>
              <span className="text-[#C9A84C] font-bold tabular-nums">{progress[i]}%</span>
            </div>
            <div className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9A84C] rounded-full transition-all duration-75"
                style={{ width: `${progress[i]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Kayan analiz logu */}
      <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl p-4">
        <p className="text-[10px] text-[#555] uppercase tracking-widest mb-3 font-mono">Analiz Logu</p>
        <div
          ref={logRef}
          className="space-y-2 max-h-[148px] overflow-hidden flex flex-col"
        >
          <AnimatePresence initial={false}>
            {logs.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-2 text-xs font-mono shrink-0 ${
                  i === logs.length - 1
                    ? msg.startsWith("✓") ? "text-[#C9A84C]" : "text-white"
                    : "text-[#3a3a3a]"
                }`}
              >
                <span className="shrink-0 mt-0.5 select-none">
                  {msg.startsWith("✓") ? "" : "›"}
                </span>
                <span>{msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Buton — sadece tüm barlar dolunca görünür */}
      <motion.button
        onClick={onDone}
        initial={{ opacity: 0, y: 10 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        disabled={!done}
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors disabled:pointer-events-none disabled:opacity-0 mt-auto"
      >
        Analizlerimi Gör →
      </motion.button>
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
          {[0, 40, 80, 120].map((y, i) => (
            <line key={i} x1="30" y1={130 - y} x2="270" y2={130 - y} stroke="#1E1E1E" strokeWidth="1" />
          ))}
          {[0, 40, 80, 120].map((y, i) => (
            <text key={i} x="5" y={134 - y} fill="#444" fontSize="8">{i * 100}%</text>
          ))}
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
          <motion.text x="80" y="108" textAnchor="middle" fill="#888" fontSize="7"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}>
            İlk Sonuçlar
          </motion.text>
          <motion.text x="255" y="5" textAnchor="middle" fill="#C9A84C" fontSize="8" fontWeight="700"
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

// ── Step 3: Comparison ───────────────────────────────────────────────────────
const METRICS = [
  {
    label: "SERTLEŞME HIZI",
    leftVal: "Yavaş başlar",
    rightVal: "Hızlı ve güvenilir",
    leftBar: 25,
    rightBar: 85,
  },
  {
    label: "SERTLİK SEVİYESİ",
    leftVal: "Düşük",
    rightVal: "Yüksek",
    leftBar: 20,
    rightBar: 90,
  },
  {
    label: "PARTNER MEMNUNİYETİ",
    leftVal: "Ortalamanın altında",
    rightVal: "Yüksek",
    leftBar: 18,
    rightBar: 88,
  },
];

function ComparisonStep() {
  const router = useRouter();

  return (
    <div className="flex flex-col px-4 py-6 gap-4 overflow-y-auto">
      {/* Tab Header */}
      <div className="flex rounded-xl overflow-hidden border border-[#C9A84C]/40">
        <div className="flex-1 py-3 px-2 text-center text-white font-black text-sm bg-[#1E1E1E]">
          ŞİMDİKİ HALİN 😞
        </div>
        <div className="flex-1 py-3 px-2 text-center font-black text-sm text-[#C9A84C] border-l border-[#C9A84C]/40 bg-[#C9A84C]/10">
          HEDEFİN 🙂
        </div>
      </div>

      {/* Split Fotoğraf */}
      <div className="relative rounded-2xl border border-[#C9A84C]/50 overflow-hidden flex" style={{ height: 280 }}>

        {/* Sol yarı — grayscale */}
        <div
          className="relative w-[42%] overflow-hidden"
          style={{
            backgroundImage: "url('/info-simdiki-hedef.jpg')",
            backgroundSize: "238% 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(100%) brightness(0.6)",
          }}
        >
          {/* Kırmızı etiketler — altta */}
          <div className="absolute bottom-3 left-2 flex flex-col gap-1.5">
            {[
              { icon: "📉", label: "Özgüven Düşük" },
              { icon: "👥", label: "Partner Stresi" },
              { icon: "⚠️", label: "Performans Kaygısı" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-red-600/90 flex items-center justify-center shrink-0 text-[9px]">
                  {item.icon}
                </div>
                <span className="text-white text-[9px] font-semibold drop-shadow">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orta — parlayan oklar + badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-2">
          {/* Parlayan >> */}
          <div className="flex gap-0.5" style={{ filter: "drop-shadow(0 0 8px #C9A84C) drop-shadow(0 0 16px #C9A84C88)" }}>
            <span className="text-[#E8C97A] text-2xl font-black leading-none">›</span>
            <span className="text-[#C9A84C] text-2xl font-black leading-none">›</span>
            <span className="text-[#B8922A] text-2xl font-black leading-none">›</span>
          </div>
          {/* 7 GÜN SONRA badge */}
          <div className="bg-black/90 border border-[#C9A84C] rounded-xl px-3 py-2 text-center"
            style={{ boxShadow: "0 0 12px #C9A84C55" }}>
            <div className="text-[#C9A84C] text-base mb-0.5">📅</div>
            <p className="text-[#C9A84C] text-[10px] font-black leading-tight">7 GÜN</p>
            <p className="text-[#C9A84C] text-[10px] font-black leading-tight">SONRA</p>
          </div>
        </div>

        {/* Sağ yarı — renkli */}
        <div
          className="relative w-[58%] overflow-hidden"
          style={{
            backgroundImage: "url('/info-simdiki-hedef.jpg')",
            backgroundSize: "172% 100%",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            boxShadow: "inset 0 0 30px #C9A84C22",
          }}
        >
          {/* %94 badge */}
          <div className="absolute top-2 right-2 flex flex-col items-center">
            <div className="bg-[#C9A84C] rounded-full w-14 h-14 flex flex-col items-center justify-center border-2 border-[#E8C97A]"
              style={{ boxShadow: "0 0 12px #C9A84C88" }}>
              <p className="text-black text-[11px] font-black leading-tight">%94</p>
              <p className="text-black text-[7px] font-bold leading-tight text-center">KULLANICI</p>
              <p className="text-black text-[7px] font-bold leading-tight text-center">MEM.</p>
            </div>
            <p className="text-[#C9A84C] text-[8px] mt-0.5">★★★★★</p>
          </div>
        </div>
      </div>

      {/* 4 Metrik Satırı */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        {METRICS.map((m, i) => (
          <div key={m.label}>
            <div className="grid grid-cols-2">
              {/* Sol */}
              <div className="p-3 pr-2 border-r border-[#2A2A2A]">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#555]" />
                  </div>
                  <p className="text-[#888] text-[9px] font-black tracking-wide leading-tight">{m.label}</p>
                </div>
                <p className="text-white text-[11px] mb-2 leading-tight">{m.leftVal}</p>
                <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${m.leftBar}%` }} />
                </div>
              </div>
              {/* Sağ */}
              <div className="p-3 pl-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                  </div>
                  <p className="text-[#C9A84C] text-[9px] font-black tracking-wide leading-tight">{m.label}</p>
                </div>
                <p className="text-[#C9A84C] text-[11px] mb-2 leading-tight">{m.rightVal}</p>
                <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${m.rightBar}%` }} />
                </div>
              </div>
            </div>
            {i < METRICS.length - 1 && <div className="h-px bg-[#2A2A2A]" />}
          </div>
        ))}

        {/* Son satır — CİNSEL YAŞAM SEVİYESİ (segmented dots) */}
        <div className="h-px bg-[#2A2A2A]" />
        <div className="grid grid-cols-2">
          <div className="p-3 pr-2 border-r border-[#2A2A2A]">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#555]" />
              </div>
              <p className="text-[#888] text-[9px] font-black tracking-wide leading-tight">CİNSEL YAŞAM SEVİYESİ</p>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-sm ${i < 2 ? "bg-[#555]" : "bg-[#2A2A2A]"}`} />
              ))}
            </div>
          </div>
          <div className="p-3 pl-2">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              </div>
              <p className="text-[#C9A84C] text-[9px] font-black tracking-wide leading-tight">CİNSEL YAŞAM SEVİYESİ</p>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-sm ${i < 7 ? "bg-[#C9A84C]" : "bg-[#2A2A2A]"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Butonu */}
      <button
        onClick={() => router.push("/checkout")}
        className="w-full py-4 rounded-2xl font-black text-base text-black transition-colors"
        style={{ background: "linear-gradient(90deg, #B8922A 0%, #E8C97A 50%, #B8922A 100%)" }}
      >
        ⚡ DÖNÜŞÜMÜ BAŞLAT &gt;
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
