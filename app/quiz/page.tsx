"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogoIcon } from "../components/Logo";

// ─── Types ────────────────────────────────────────────────────────────────────
type QKind = "cards" | "age" | "slider" | "icon";
type Step =
  | { type: "q";        id: string; section: string; q: string; kind: QKind; opts?: string[]; left?: string; right?: string }
  | { type: "info";     title: string; body: string; illus: "anatomy" | "chart" | "couple" | "simple" }
  | { type: "info-img"; img: string }
  | { type: "agree";    id: string; section: string; img: string };

// ─── Quiz data ────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  // ── Section 1: Giriş
  { type:"q",        id:"age",        section:"Giriş",               q:"Kaç yaşındasın?",                                                        kind:"age",    opts:["18-29","30-39","40-49","50+"] },
  { type:"q",        id:"motivation", section:"Giriş",               q:"Ana hedefin ne?",                                                        kind:"icon",   opts:["⏳ Daha uzun dayanmak","💪 Daha güçlü ereksiyon","🔥 Daha fazla güven","⚡ Genel performansı artırmak"] },
  { type:"info-img", img:"info-milyon.jpg" },
  { type:"info",     title:"Gücün Buradan Başlar!", body:"Stres, hareketsizlik ve zayıf pelvik kaslar kan akışını ve kontrolü azaltır. Kegel antrenmanı pelvik tabanı güçlendirerek kontrolü ve sertliği geri kazandırır.", illus:"anatomy" },
  { type:"info-img", img:"info-bilim.jpg" },

  // ── Section 2: Performans & Kontrol
  { type:"q",        id:"duration",   section:"Performans & Kontrol", q:"Genellikle ne kadar dayanıyorsun?",                                     kind:"cards",  opts:["2 dakikadan az","2-7 dakika","15 dakikaya kadar","15+ dakika","Değişiyor"] },
  { type:"q",        id:"ideal",      section:"Performans & Kontrol", q:"İdeal kontrol süren nedir?",                                            kind:"cards",  opts:["5-10 dakika","10-20 dakika","20-30 dakika","30+ dakika"] },
  { type:"info-img", img:"info-dayaniklilik.jpg" },
  { type:"q",        id:"early_freq", section:"Performans & Kontrol", q:"Ne sıklıkla istediğinden erken bitiriyorsun?",                          kind:"cards",  opts:["Hiç","Bazen","Sık sık","Neredeyse her zaman"] },
  { type:"q",        id:"high_ar",    section:"Performans & Kontrol", q:"Yüksek uyarılmada ne kadar dayanabilirsin?",                            kind:"cards",  opts:["1 dakikadan az","2-5 dakika","5-10 dakika","10+ dakika","Söylemek zor"] },
  { type:"info-img", img:"info-60sn.jpg" },
  { type:"q",        id:"reduce",     section:"Performans & Kontrol", q:"Durdurmadan yoğunluğu bilinçli azaltabilir misin?",                     kind:"cards",  opts:["Evet","Hayır","Söylemek zor"] },
  { type:"q",        id:"important",  section:"Performans & Kontrol", q:"Uzun sürmek için hangisi daha önemli?",                                 kind:"cards",  opts:["Güçlü pelvik kaslar","Uyarılma kontrolü","İkisi eşit önemde"] },
  { type:"q",        id:"erection",   section:"Performans & Kontrol", q:"Ereksiyonunu değerlendir",                                              kind:"slider", left:"Düşük kontrol", right:"Tam kontrol" },
  { type:"q",        id:"libido",     section:"Performans & Kontrol", q:"Libidonuzu değerlendir",                                                kind:"slider", left:"Zayıf", right:"Güçlü" },
  { type:"q",        id:"sex_freq",   section:"Performans & Kontrol", q:"Ne sıklıkla seks yapmak istiyorsun?",                                   kind:"cards",  opts:["Neredeyse her gün","Haftada birkaç","Haftada bir","Ayda birkaç","Nadiren","Ruh halime göre"] },

  // ── Section 3: Psikoloji & İlişkiler
  { type:"info-img", img:"info-zihin-kontrol.jpg" },
  { type:"agree",    id:"basarisiz_ses",   section:"Psikoloji & İlişkiler", img:"info-basarisiz-ses.jpg" },
  { type:"agree",    id:"elestiri",        section:"Psikoloji & İlişkiler", img:"info-elestiri.jpg" },
  { type:"q",        id:"confidence",      section:"Psikoloji & İlişkiler", q:"Seks sırasında ne kadar güvenli hissediyorsun?",                  kind:"cards",  opts:["Çok güvenli","Daha iyi olabilir","Çoğunlukla kararsız","Hiç güvenim yok"] },
  { type:"q",        id:"satisfaction",    section:"Psikoloji & İlişkiler", q:"Mevcut performansından memnun musun?",                            kind:"cards",  opts:["Çok memnun","Biraz memnun","Pek değil","Hiç değil"] },
  { type:"info-img", img:"info-kacınma.jpg" },
  { type:"q",        id:"anxiety",         section:"Psikoloji & İlişkiler", q:"Yakınlık öncesi ne sıklıkla kaygı hissediyorsun?",               kind:"cards",  opts:["Hiç","Bazen","Sık sık","Neredeyse her zaman"] },
  { type:"agree",    id:"ozguven_sarsil",  section:"Psikoloji & İlişkiler", img:"info-ozguven-sarsil.jpg" },
  { type:"q",        id:"bond",            section:"Psikoloji & İlişkiler", q:"Partnerinle bağ hissediyor musun?",                               kind:"cards",  opts:["Çok bağlıyım","Biraz bağlıyım","Pek değil","İlişkim yok"] },
  { type:"q",        id:"ctrl_import",     section:"Psikoloji & İlişkiler", q:"Kontrol, özgüvenin için ne kadar önemli?",                        kind:"cards",  opts:["Son derece önemli","Biraz önemli","Emin değilim"] },
  { type:"q",        id:"slow_down",       section:"Psikoloji & İlişkiler", q:"Yaklaştığında cinsel gerilimi yavaşlatabilir misin?",             kind:"slider", left:"Yavaşlatamam", right:"Tam kontrol" },
  { type:"q",        id:"regain",          section:"Psikoloji & İlişkiler", q:"Sertliği kaybettikten sonra ne kadar kolay geri kazanıyorsun?",  kind:"slider", left:"Çok zor", right:"Hızlı" },

  // ── Section 4: Partner
  { type:"agree",    id:"katiliyor_partner", section:"Partner", img:"info-katiliyor.jpg" },
  { type:"info-img", img:"info-ozguven-cift.jpg" },
  { type:"q",        id:"position",  section:"Partner", q:"Kontrolü korumak için pozisyon değiştiriyor musun?",   kind:"cards", opts:["Hiç","Bazen","Sık sık","Neredeyse her zaman"] },
  { type:"q",        id:"breathing", section:"Partner", q:"Yoğunluğu yönetmek için nefes kullanıyor musun?",      kind:"cards", opts:["Evet","Bazen","Hayır"] },

  // ── Section 5: Farkındalık & Eğitim
  { type:"q",        id:"prac_freq", section:"Farkındalık & Eğitim", q:"Haftada kaç kez pratik yapmaya hazırsın?",            kind:"cards", opts:["Haftada 2'den az","2-3 kez","4-5 kez","5'ten fazla"] },
  { type:"q",        id:"sess_len",  section:"Farkındalık & Eğitim", q:"Tercih ettiğin seans uzunluğu nedir?",                kind:"cards", opts:["2-5 dakika","5-10 dakika (önerilen)","11-15 dakika","15+ dakika"] },
  { type:"q",        id:"intensity", section:"Farkındalık & Eğitim", q:"Hangi yoğunluk seviyesi sana uygun?",                 kind:"cards", opts:["Kolay & gizli","Dengeli","Meydan okumaya hazırım"] },
  { type:"info-img", img:"info-5dk.jpg" },

  // ── Section 6: Yaşam Tarzı
  { type:"q",        id:"activity",      section:"Yaşam Tarzı", q:"Yaşam tarzın ne kadar aktif?",              kind:"cards", opts:["Pek aktif değil","Dengeli","Düzenli antrenman (2-3x/hafta)","Çok aktif"] },
  { type:"info-img", img:"info-aliskanlik.jpg" },
  { type:"q",        id:"sitting",       section:"Yaşam Tarzı", q:"Günde kaç saat oturuyorsun?",               kind:"cards", opts:["Tüm gün","4-7 saat","1-3 saat","1 saatten az"] },
  { type:"agree",    id:"masturbasyon",  section:"Yaşam Tarzı", img:"info-masturbasyon.jpg" },
  { type:"q",        id:"alcohol",       section:"Yaşam Tarzı", q:"Ne sıklıkla alkol alıyorsun?",              kind:"cards", opts:["Hiç","Ara sıra","Haftada birkaç","Her gün"] },
  { type:"agree",    id:"porno_tv",      section:"Yaşam Tarzı", img:"info-porno-tv.jpg" },
  { type:"q",        id:"sleep",         section:"Yaşam Tarzı", q:"Genellikle ne kadar uyuyorsun?",            kind:"cards", opts:["5 saatten az","5-7 saat","7-8 saat","8+ saat"] },
  { type:"agree",    id:"sagliksiz",     section:"Yaşam Tarzı", img:"info-sagliksiz.jpg" },
  { type:"agree",    id:"porno_ihtiyac", section:"Yaşam Tarzı", img:"info-porno-ihtiyac.jpg" },

  // ── Kapanış
  { type:"info-img", img:"info-binlerce.jpg" },
];

const TOTAL_Q = STEPS.filter(s => s.type === "q").length;

// ─── Illustration components ──────────────────────────────────────────────────
function AnatomyInfo({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 gap-5 pt-4">
      <h2 className="text-3xl font-black text-white leading-tight">
        Ereksiyonun sırrı <span className="text-[#C9A84C]">tek bir</span> kas grubunda.
      </h2>
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">🫀</span>
          <p className="text-sm text-white font-semibold">
            Ereksiyon gücü = <span className="text-[#C9A84C]">Pelvik taban gücü</span>
          </p>
        </div>
        <p className="text-[#888] text-sm leading-relaxed">
          Zayıf kaslar, kanın çok kolay kaçmasına neden olur. Aşırı gergin kaslar ise kanın girmesini engeller.
        </p>
        <p className="text-white text-sm font-black">İkisi de <span className="text-[#C9A84C]">düzeltilebilir.</span></p>
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden min-h-[200px]">
        <img src="/anatomy.jpg" alt="Pelvik taban" className="w-full h-full object-cover object-top" />
      </div>
      <button onClick={onNext} className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors">
        DEVAM ET
      </button>
    </div>
  );
}

// ─── Görsel başına kırpma miktarı (px) ───────────────────────────────────────
// 0 = kırpma yok (görselin altı önemli içerik taşıyor)
// >0 = görselin içindeki buton alanı kadar kırp
const IMG_CROP: Record<string, number> = {
  // DEVAM ET butonu olan görseller
  "info-dayaniklilik.jpg":  72,
  "info-60sn.jpg":          72,
  "info-5dk.jpg":           72,
  "info-aliskanlik.jpg":    72,
  "info-binlerce.jpg":      72,
  "info-ozguven-cift.jpg":  72,
  // Hayır/Evet butonu olan görseller
  "info-elestiri.jpg":      64,
  "info-katiliyor.jpg":     64,
  "info-masturbasyon.jpg":  64,
  "info-porno-ihtiyac.jpg": 64,
  "info-porno-tv.jpg":      64,
  "info-sagliksiz.jpg":     64,
  // Alt kısmı önemli → kırpma yok
  "info-milyon.jpg":         0,   // GQ/Men's Health logolar
  "info-bilim.jpg":          0,   // Mayo Clinic kartı
  "info-kacınma.jpg":        0,   // döngü diyagramı
  "info-zihin-kontrol.jpg":  0,   // döngü diyagramı
  "info-basarisiz-ses.jpg":  0,   // içeride buton yok
  "info-ozguven-sarsil.jpg": 0,   // içeride buton yok
};

// ─── Info-img: tam görsel ekran ───────────────────────────────────────────────
function InfoImgStep({ img, onNext }: { img: string; onNext: () => void }) {
  const crop = IMG_CROP[img] ?? 0;
  return (
    <div className="flex flex-col gap-4 pt-2 pb-2">
      <div className="rounded-2xl overflow-hidden">
        <img src={`/${img}`} alt="" className="w-full block" loading="lazy"
          style={crop ? { marginBottom: `-${crop}px` } : undefined} />
      </div>
      <button onClick={onNext}
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-lg hover:bg-[#E8C97A] transition-colors">
        DEVAM ET →
      </button>
    </div>
  );
}

// ─── Agree: Katılıyor musun? ──────────────────────────────────────────────────
function AgreeStep({ img, onSelect }: { img: string; onSelect: (v: string) => void }) {
  const crop = IMG_CROP[img] ?? 0;
  return (
    <div className="flex flex-col gap-4 pt-2 pb-2">
      <div className="rounded-2xl overflow-hidden">
        <img src={`/${img}`} alt="" className="w-full block" loading="lazy"
          style={crop ? { marginBottom: `-${crop}px` } : undefined} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onSelect("hayır")}
          className="py-4 rounded-2xl border border-[#2A2A2A] bg-[#141414] text-white font-bold flex items-center justify-center gap-2 hover:border-[#555] transition-colors">
          <span className="text-red-400">✕</span> Hayır <span className="text-[#555]">›</span>
        </button>
        <button onClick={() => onSelect("evet")}
          className="py-4 rounded-2xl bg-[#C9A84C] text-black font-bold flex items-center justify-center gap-2 hover:bg-[#E8C97A] transition-colors">
          <span>✓</span> Evet <span>›</span>
        </button>
      </div>
    </div>
  );
}

// ─── Option components ────────────────────────────────────────────────────────
const AGE_SPRITE: Record<string, string> = {
  "18-29": "0% 0%",
  "30-39": "100% 0%",
  "40-49": "0% 100%",
  "50+":   "100% 100%",
};

function AgeCards({ opts, onSelect }: { opts: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {opts.map(o => (
        <button key={o} onClick={() => onSelect(o)}
          className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#C9A84C] active:scale-95 transition-all aspect-[3/4]">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('/age-grid.jpg')",
            backgroundSize: "200% 200%",
            backgroundPosition: AGE_SPRITE[o],
          }} />
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

function SliderPills({ left, right, selected, onSelect }: {
  left: string; right: string; selected?: number; onSelect: (v: number) => void;
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [sliderVal, setSliderVal] = useState<number | undefined>();
  const [direction, setDirection] = useState(1);

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  const qsDone  = STEPS.slice(0, step).filter(s => s.type === "q").length;
  const progress = Math.round((qsDone / TOTAL_Q) * 100);
  const section  = current.type === "q" || current.type === "agree" ? current.section : "";

  function goNext() {
    if (isLast) { localStorage.setItem("km_answers", JSON.stringify(answers)); router.push("/result"); return; }
    setDirection(1); setSliderVal(undefined); setStep(s => s + 1);
  }

  function goBack() {
    if (step === 0) return;
    setDirection(-1); setStep(s => s - 1);
  }

  function handleSelect(id: string, value: string | number) {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (isLast) { localStorage.setItem("km_answers", JSON.stringify(newAnswers)); router.push("/result"); }
      else { setDirection(1); setSliderVal(undefined); setStep(s => s + 1); }
    }, 280);
  }

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ?  40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 :  40, opacity: 0 }),
  };

  // Yaş sorusu — tam sayfa özel layout
  if (current.type === "q" && current.kind === "age") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col max-w-[430px] mx-auto px-4 py-4">
        <div className="space-y-2 mb-5">
          <p className="text-xs text-[#888]">Adım <span className="text-[#C9A84C] font-bold">1</span> / {TOTAL_Q}</p>
          <div className="w-full h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
            <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: "4%" }} />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <LogoIcon size={36} />
          <div>
            <p className="text-white font-black text-base leading-none">Kegel Max</p>
            <p className="text-[#C9A84C] text-xs font-semibold leading-none mt-0.5">Pelvic Güç</p>
          </div>
        </div>
        <h1 className="text-3xl font-black text-white leading-tight mb-3">Kontrolünü Güçlendir<br />Performansını Yükselt</h1>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#C9A84C] text-sm">⏱</span>
          <span className="text-[#888] text-sm font-medium">1 Dakikalık Quiz</span>
        </div>
        <div className="flex-1">
          <AgeCards opts={current.opts!} onSelect={v => handleSelect(current.id, v)} />
        </div>
        <div className="flex items-center justify-center gap-2 py-4 mt-2">
          <span className="text-[#555] text-xs">🔒 %100 gizli</span>
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
          <button onClick={goBack} className="text-[#888] text-xl w-8 h-8 flex items-center justify-center hover:text-white transition-colors">←</button>
          <LogoIcon size={28} />
          <div className="w-8" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            {section
              ? <p className="text-[10px] text-[#555] uppercase tracking-widest">{section}</p>
              : <span />}
            <p className="text-[10px] text-[#888] font-mono tabular-nums">
              <span className="text-[#C9A84C] font-bold">{qsDone + (current.type === "q" ? 1 : 0)}</span>
              <span className="text-[#444]">/{TOTAL_Q}</span>
            </p>
          </div>
          <div className="w-full h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
            <div className="h-full bg-[#C9A84C] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            {/* Info-img */}
            {current.type === "info-img" && (
              <InfoImgStep img={current.img} onNext={goNext} />
            )}

            {/* Agree */}
            {current.type === "agree" && (
              <AgreeStep img={current.img} onSelect={v => handleSelect(current.id, v)} />
            )}

            {/* Info (SVG) */}
            {current.type === "info" && (
              current.illus === "anatomy" ? (
                <AnatomyInfo onNext={goNext} />
              ) : (
                <div className="flex flex-col flex-1 items-center justify-between py-8 gap-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-black text-white">{current.title}</h2>
                    <p className="text-[#888] text-sm leading-relaxed">{current.body}</p>
                  </div>
                  <button onClick={goNext} className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors">
                    DEVAM ET
                  </button>
                </div>
              )
            )}

            {/* Question */}
            {current.type === "q" && (
              <div className="flex flex-col gap-6 pt-6">
                <h2 className="text-xl font-black text-white leading-snug">{current.q}</h2>
                {current.kind === "icon"   && <IconCards opts={current.opts!} onSelect={v => handleSelect(current.id, v)} />}
                {current.kind === "cards"  && <CardOptions opts={current.opts!} selected={answers[current.id] as string} onSelect={v => handleSelect(current.id, v)} />}
                {current.kind === "slider" && (
                  <>
                    <SliderPills left={current.left!} right={current.right!} selected={sliderVal} onSelect={v => { setSliderVal(v); setAnswers(a => ({ ...a, [current.id]: v })); }} />
                    {sliderVal !== undefined && (
                      <button onClick={goNext} className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors mt-2">
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
