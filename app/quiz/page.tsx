"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogoIcon } from "../components/Logo";

// ─── Types ────────────────────────────────────────────────────────────────────
type QKind = "cards" | "age" | "slider" | "icon";
type Step =
  | { type: "q"; id: string; section: string; q: string; kind: QKind; opts?: string[]; left?: string; right?: string }
  | { type: "info"; title: string; body: string; illus: "anatomy" | "chart" | "couple" | "simple" };

// ─── Quiz data ────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  // ── Section 1: Giriş
  { type:"q", id:"age",       section:"Giriş", q:"Kaç yaşındasın?",                            kind:"age",   opts:["18-29","30-39","40-49","50+"] },
  { type:"q", id:"motivation",section:"Giriş", q:"Ana hedefin ne?",                             kind:"icon",  opts:["⏳ Daha uzun dayanmak","💪 Daha güçlü ereksiyon","🔥 Daha fazla güven","⚡ Genel performansı artırmak"] },
  { type:"info", title:"Gücün Buradan Başlar!", body:"Stres, hareketsizlik ve zayıf pelvik kaslar kan akışını ve kontrolü azaltır. Kegel antrenmanı pelvik tabanı güçlendirerek kontrolü ve sertliği geri kazandırır.", illus:"anatomy" },
  // ── Section 2: Performans & Kontrol
  { type:"q", id:"duration",    section:"Performans & Kontrol", q:"Genellikle ne kadar dayanıyorsun?",                          kind:"cards", opts:["2 dakikadan az","2-7 dakika","15 dakikaya kadar","15+ dakika","Değişiyor"] },
  { type:"q", id:"ideal",       section:"Performans & Kontrol", q:"İdeal kontrol süren nedir?",                                 kind:"cards", opts:["5-10 dakika","10-20 dakika","20-30 dakika","30+ dakika"] },
  { type:"q", id:"early_freq",  section:"Performans & Kontrol", q:"Ne sıklıkla istediğinden erken bitiriyorsun?",               kind:"cards", opts:["Hiç","Bazen","Sık sık","Neredeyse her zaman"] },
  { type:"q", id:"high_ar",    section:"Performans & Kontrol", q:"Yüksek uyarılmada ne kadar dayanabilirsin?",                  kind:"cards", opts:["1 dakikadan az","2-5 dakika","5-10 dakika","10+ dakika","Söylemek zor"] },
  { type:"q", id:"reduce",      section:"Performans & Kontrol", q:"Durdurmadan yoğunluğu bilinçli azaltabilir misin?",           kind:"cards", opts:["Evet","Hayır","Söylemek zor"] },
  { type:"q", id:"important",   section:"Performans & Kontrol", q:"Uzun sürmek için hangisi daha önemli?",                      kind:"cards", opts:["Güçlü pelvik kaslar","Uyarılma kontrolü","İkisi eşit önemde"] },
  { type:"q", id:"erection",    section:"Performans & Kontrol", q:"Ereksiyonunu değerlendir",                                   kind:"slider", left:"Düşük kontrol", right:"Tam kontrol" },
  { type:"q", id:"libido",      section:"Performans & Kontrol", q:"Libidonuzu değerlendir",                                     kind:"slider", left:"Zayıf", right:"Güçlü" },
  { type:"q", id:"sex_freq",    section:"Performans & Kontrol", q:"Ne sıklıkla seks yapmak istiyorsun?",                        kind:"cards", opts:["Neredeyse her gün","Haftada birkaç","Haftada bir","Ayda birkaç","Nadiren","Ruh halime göre"] },
  { type:"info", title:"Kegel + SKT = Daha İyi Performans", body:"Sadece Kegel değil. Sonuçlarını ileri taşıyan güçlü bir Duyusal Kontrol Tekniği (SKT) de öğreneceksin.", illus:"chart" },
  // ── Section 3: Psikoloji & İlişkiler
  { type:"q", id:"confidence",  section:"Psikoloji & İlişkiler", q:"Seks sırasında ne kadar güvenli hissediyorsun?",            kind:"cards", opts:["Çok güvenli","Daha iyi olabilir","Çoğunlukla kararsız","Hiç güvenim yok"] },
  { type:"q", id:"satisfaction",section:"Psikoloji & İlişkiler", q:"Mevcut performansından memnun musun?",                      kind:"cards", opts:["Çok memnun","Biraz memnun","Pek değil","Hiç değil"] },
  { type:"q", id:"anxiety",     section:"Psikoloji & İlişkiler", q:"Yakınlık öncesi ne sıklıkla kaygı hissediyorsun?",          kind:"cards", opts:["Hiç","Bazen","Sık sık","Neredeyse her zaman"] },
  { type:"q", id:"bond",        section:"Psikoloji & İlişkiler", q:"Partnerinle bağ hissediyor musun?",                         kind:"cards", opts:["Çok bağlıyım","Biraz bağlıyım","Pek değil","İlişkim yok"] },
  { type:"q", id:"ctrl_import", section:"Psikoloji & İlişkiler", q:"Kontrol, özgüvenin için ne kadar önemli?",                  kind:"cards", opts:["Son derece önemli","Biraz önemli","Emin değilim"] },
  { type:"q", id:"slow_down",   section:"Psikoloji & İlişkiler", q:"Yaklaştığında cinsel gerilimi yavaşlatabilir misin?",       kind:"slider", left:"Yavaşlatamam", right:"Tam kontrol" },
  { type:"q", id:"regain",      section:"Psikoloji & İlişkiler", q:"Sertliği kaybettikten sonra ne kadar kolay geri kazanıyorsun?", kind:"slider", left:"Çok zor", right:"Hızlı" },
  { type:"q", id:"position",    section:"Psikoloji & İlişkiler", q:"Kontrolü korumak için pozisyon değiştiriyor musun?",        kind:"cards", opts:["Hiç","Bazen","Sık sık","Neredeyse her zaman"] },
  { type:"q", id:"breathing",   section:"Psikoloji & İlişkiler", q:"Yoğunluğu yönetmek için nefes kullanıyor musun?",           kind:"cards", opts:["Evet","Bazen","Hayır"] },
  { type:"info", title:"İkiniz İçin De İyi Hissettiriyor", body:"Partnerinin önce gelebilmesi için sen kontrol altında kalman çok önemli. Bu program tam olarak bunu öğretir.", illus:"couple" },
  // ── Section 4: Farkındalık & Eğitim
  { type:"q", id:"prac_freq",   section:"Farkındalık & Eğitim", q:"Haftada kaç kez pratik yapmaya hazırsın?",                  kind:"cards", opts:["Haftada 2'den az","2-3 kez","4-5 kez","5'ten fazla"] },
  { type:"q", id:"sess_len",    section:"Farkındalık & Eğitim", q:"Tercih ettiğin seans uzunluğu nedir?",                      kind:"cards", opts:["2-5 dakika","5-10 dakika (önerilen)","11-15 dakika","15+ dakika"] },
  { type:"q", id:"intensity",   section:"Farkındalık & Eğitim", q:"Hangi yoğunluk seviyesi sana uygun?",                       kind:"cards", opts:["Kolay & gizli","Dengeli","Meydan okumaya hazırım"] },
  { type:"info", title:"Harika Haber!", body:"Kegel Max planı programına uyum sağlar. Günde sadece 5 dakikayla başlayabilirsin.", illus:"simple" },
  // ── Section 5: Yaşam Tarzı
  { type:"q", id:"activity",    section:"Yaşam Tarzı", q:"Yaşam tarzın ne kadar aktif?",                                       kind:"cards", opts:["Pek aktif değil","Dengeli","Düzenli antrenman (2-3x/hafta)","Çok aktif"] },
  { type:"q", id:"sitting",     section:"Yaşam Tarzı", q:"Günde kaç saat oturuyorsun?",                                        kind:"cards", opts:["Tüm gün","4-7 saat","1-3 saat","1 saatten az"] },
  { type:"q", id:"alcohol",     section:"Yaşam Tarzı", q:"Ne sıklıkla alkol alıyorsun?",                                       kind:"cards", opts:["Hiç","Ara sıra","Haftada birkaç","Her gün"] },
  { type:"q", id:"sleep",       section:"Yaşam Tarzı", q:"Genellikle ne kadar uyuyorsun?",                                     kind:"cards", opts:["5 saatten az","5-7 saat","7-8 saat","8+ saat"] },
];

const TOTAL_Q = STEPS.filter(s => s.type === "q").length;

// ─── Illustration components ───────────────────────────────────────────────────
function AnatomySVG() {
  return (
    <svg viewBox="0 0 200 140" className="w-full max-w-[220px]">
      <ellipse cx="100" cy="80" rx="70" ry="45" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5"/>
      <ellipse cx="100" cy="80" rx="45" ry="28" fill="#1E1E1E" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7"/>
      <path d="M70 80 Q100 55 130 80 Q100 105 70 80Z" fill="#C9A84C" opacity="0.15"/>
      <path d="M70 80 Q100 55 130 80" stroke="#C9A84C" strokeWidth="2" fill="none" strokeDasharray="3 2"/>
      <path d="M85 65 L75 50" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M115 65 L125 50" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="75" cy="47" r="3" fill="#C9A84C" opacity="0.8"/>
      <circle cx="125" cy="47" r="3" fill="#C9A84C" opacity="0.8"/>
      <text x="100" y="20" textAnchor="middle" fill="#C9A84C" fontSize="9" fontWeight="600">Pelvik Taban</text>
    </svg>
  );
}

function ChartSVG() {
  return (
    <svg viewBox="0 0 220 120" className="w-full max-w-[240px]">
      <line x1="20" y1="10" x2="20" y2="100" stroke="#2A2A2A" strokeWidth="1"/>
      <line x1="20" y1="100" x2="210" y2="100" stroke="#2A2A2A" strokeWidth="1"/>
      {[0,25,50,75].map((y,i) => (
        <line key={i} x1="18" y1={100-y} x2="210" y2={100-y} stroke="#1E1E1E" strokeWidth="1"/>
      ))}
      <path d="M20 90 C60 90 80 70 110 55 S160 25 200 15"
        stroke="#C9A84C" strokeWidth="2.5" fill="none"/>
      <path d="M20 90 C60 90 80 70 110 55 S160 25 200 15 L200 100 L20 100Z"
        fill="#C9A84C" opacity="0.08"/>
      {[
        {x:20,y:90,l:"Başlangıç"},{x:80,y:70,l:"Hafta 2"},{x:140,y:38,l:"Hafta 3"},{x:200,y:15,l:"Hafta 4"}
      ].map(p => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#C9A84C"/>
          <text x={p.x} y={p.y-8} textAnchor="middle" fill="#888" fontSize="7">{p.l}</text>
        </g>
      ))}
      <text x="115" y="42" textAnchor="middle" fill="#C9A84C" fontSize="8">Kontrol Seviyesi ↑</text>
    </svg>
  );
}

function CoupleSVG() {
  return (
    <svg viewBox="0 0 160 100" className="w-full max-w-[180px]">
      <circle cx="60" cy="35" r="18" fill="#1E1E1E" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7"/>
      <path d="M42 65 Q60 55 78 65 L80 95 L40 95Z" fill="#1E1E1E" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>
      <circle cx="100" cy="35" r="18" fill="#1E1E1E" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7"/>
      <path d="M82 65 Q100 55 118 65 L120 95 L80 95Z" fill="#1E1E1E" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>
      <path d="M75 50 Q80 45 85 50" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="80" y="110" textAnchor="middle" fill="#888" fontSize="8">Birlikte daha iyi</text>
    </svg>
  );
}

function SimpleIllus() {
  return (
    <div className="w-20 h-20 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center text-4xl">
      ✅
    </div>
  );
}

// ─── Option components ─────────────────────────────────────────────────────────
const AGE_PHOTOS: Record<string, string> = {
  "18-29": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop&q=80",
  "30-39": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
  "40-49": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop&q=80",
  "50+":   "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop&q=80",
};

function AgeCards({ opts, onSelect }: { opts: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {opts.map(o => (
        <button key={o} onClick={() => onSelect(o)}
          className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#C9A84C] active:scale-95 transition-all aspect-[3/4]">
          {/* Photo */}
          <img
            src={AGE_PHOTOS[o]}
            alt={o}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
            <span className="text-white font-black text-lg leading-none">{o}</span>
            <span className="text-[#C9A84C] font-black text-lg leading-none">›</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function IconCards({ opts, onSelect }: { opts: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="space-y-2.5">
      {opts.map(o => {
        const [icon, ...rest] = o.split(" ");
        return (
          <button key={o} onClick={() => onSelect(o)}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C] active:scale-[0.98] text-left transition-all">
            <span className="text-2xl shrink-0">{icon}</span>
            <span className="text-white text-sm font-medium">{rest.join(" ")}</span>
          </button>
        );
      })}
    </div>
  );
}

function CardOptions({ opts, selected, onSelect }: { opts: string[]; selected?: string; onSelect: (v: string) => void }) {
  return (
    <div className="space-y-2.5">
      {opts.map(o => (
        <button key={o} onClick={() => onSelect(o)}
          className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all active:scale-[0.98] ${
            selected === o
              ? "border-[#C9A84C] bg-[#C9A84C]/10 text-white"
              : "bg-[#1A1A1A] border-[#2A2A2A] text-white/75 hover:border-[#C9A84C]/50"
          }`}>
          <span>{o}</span>
          {selected === o && <span className="text-[#C9A84C] font-bold text-xs">✓</span>}
        </button>
      ))}
    </div>
  );
}

function SliderPills({ id, left, right, selected, onSelect }: {
  id: string; left: string; right: string; selected?: number; onSelect: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={() => onSelect(n)}
            className={`flex-1 py-4 rounded-xl text-base font-black transition-all active:scale-95 ${
              selected === n ? "bg-[#C9A84C] text-black" : "bg-[#1A1A1A] border border-[#2A2A2A] text-white/50 hover:border-[#C9A84C]/40"
            }`}>
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-[#555]">
        <span>← {left}</span>
        <span>{right} →</span>
      </div>
    </div>
  );
}

// ─── Main quiz page ────────────────────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [sliderVal, setSliderVal] = useState<number | undefined>();
  const [direction, setDirection] = useState(1);

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  // Progress: count question steps completed so far
  const qsDone = STEPS.slice(0, step).filter(s => s.type === "q").length;
  const progress = Math.round((qsDone / TOTAL_Q) * 100);

  // Section label
  const section = current.type === "q" ? current.section : "";

  function goNext() {
    if (isLast) {
      localStorage.setItem("km_answers", JSON.stringify(answers));
      router.push("/result");
      return;
    }
    setDirection(1);
    setSliderVal(undefined);
    setStep(s => s + 1);
  }

  function goBack() {
    if (step === 0) return;
    setDirection(-1);
    setStep(s => s - 1);
  }

  function handleSelect(id: string, value: string | number) {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    // Auto-advance after short delay (show selection state)
    setTimeout(() => {
      if (isLast) {
        localStorage.setItem("km_answers", JSON.stringify(newAnswers));
        router.push("/result");
      } else {
        setDirection(1);
        setSliderVal(undefined);
        setStep(s => s + 1);
      }
    }, 280);
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  // Age step — tam sayfa özel layout
  if (current.type === "q" && current.kind === "age") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col max-w-[430px] mx-auto px-4 py-4">
        {/* Adım sayacı + progress */}
        <div className="space-y-2 mb-5">
          <p className="text-xs text-[#888]">
            Adım <span className="text-[#C9A84C] font-bold">1</span> / {TOTAL_Q}
          </p>
          <div className="w-full h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
            <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: "4%" }} />
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <LogoIcon size={36} />
          <div>
            <p className="text-white font-black text-base leading-none">Kegel Max</p>
            <p className="text-[#C9A84C] text-xs font-semibold leading-none mt-0.5">Pelvic Güç</p>
          </div>
        </div>

        {/* Başlık */}
        <h1 className="text-3xl font-black text-white leading-tight mb-3">
          Kontrolünü Güçlendir<br />Performansını Yükselt
        </h1>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#C9A84C] text-sm">⏱</span>
          <span className="text-[#888] text-sm font-medium">1 Dakikalık Quiz</span>
        </div>

        {/* Fotoğraflı kartlar */}
        <div className="flex-1">
          <AgeCards opts={current.opts!} onSelect={v => handleSelect(current.id, v)} />
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-center gap-2 py-4 mt-2">
          <span className="text-[#555] text-xs">🔒</span>
          <span className="text-[#555] text-xs">%100 gizli</span>
          <span className="text-[#333] text-xs">•</span>
          <span className="text-[#555] text-xs">Güvenli</span>
          <span className="text-[#333] text-xs">•</span>
          <span className="text-[#555] text-xs">Bilimsel</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col max-w-[430px] mx-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 space-y-3">
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="text-[#888] text-xl w-8 h-8 flex items-center justify-center hover:text-white transition-colors">
            ←
          </button>
          <LogoIcon size={28} />
          <div className="w-8" />
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          {section && <p className="text-[10px] text-[#555] uppercase tracking-widest">{section}</p>}
          <div className="w-full h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A84C] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-hidden px-4 pb-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            {current.type === "info" ? (
              /* ── Interstitial ── */
              <div className="flex flex-col flex-1 items-center justify-between py-8 gap-8">
                <div className="flex flex-col items-center gap-6 flex-1 justify-center">
                  {/* Illustration */}
                  <div className="flex items-center justify-center">
                    {current.illus === "anatomy" && <AnatomySVG />}
                    {current.illus === "chart"   && <ChartSVG />}
                    {current.illus === "couple"  && <CoupleSVG />}
                    {current.illus === "simple"  && <SimpleIllus />}
                  </div>
                  {/* Text */}
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-black text-white">{current.title}</h2>
                    <p className="text-[#888] text-sm leading-relaxed">{current.body}</p>
                  </div>
                </div>
                <button onClick={goNext}
                  className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base tracking-wide hover:bg-[#E8C97A] transition-colors">
                  DEVAM ET
                </button>
              </div>
            ) : (
              /* ── Question ── */
              <div className="flex flex-col gap-6 pt-6">
                <h2 className="text-xl font-black text-white leading-snug">{current.q}</h2>

                {current.kind === "age"    && <AgeCards opts={current.opts!} onSelect={v => handleSelect(current.id, v)} />}
                {current.kind === "icon"   && <IconCards opts={current.opts!} onSelect={v => handleSelect(current.id, v)} />}
                {current.kind === "cards"  && (
                  <CardOptions
                    opts={current.opts!}
                    selected={answers[current.id] as string}
                    onSelect={v => handleSelect(current.id, v)}
                  />
                )}
                {current.kind === "slider" && (
                  <>
                    <SliderPills
                      id={current.id}
                      left={current.left!}
                      right={current.right!}
                      selected={sliderVal}
                      onSelect={v => { setSliderVal(v); setAnswers(a => ({ ...a, [current.id]: v })); }}
                    />
                    {sliderVal !== undefined && (
                      <button onClick={goNext}
                        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors mt-2">
                        Devam Et
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
