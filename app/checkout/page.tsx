"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogoIcon } from "../components/Logo";

// ── Confetti (canvas, altın + beyaz, dependency-free) ──────────────────────
function useConfetti() {
  useEffect(() => {
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

    type Particle = { x:number; y:number; w:number; h:number; color:string; vy:number; vx:number; rot:number; rotV:number; opacity:number };
    const colors = ["#C9A84C","#E8C97A","#ffffff","#FFD700","#C9A84C"];
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x:      Math.random() * canvas.width,
      y:      -Math.random() * 300 - 10,
      w:      Math.random() * 9 + 4,
      h:      Math.random() * 5 + 2,
      color:  colors[Math.floor(Math.random() * colors.length)],
      vy:     Math.random() * 3.5 + 1.5,
      vx:     (Math.random() - 0.5) * 2.5,
      rot:    Math.random() * 360,
      rotV:   (Math.random() - 0.5) * 6,
      opacity:1,
    }));

    const start  = Date.now();
    let raf: number;

    const draw = () => {
      const elapsed = Date.now() - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y   += p.vy;
        p.x   += p.vx;
        p.rot += p.rotV;
        if (elapsed > 1000) p.opacity = Math.max(0, p.opacity - 0.025);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < 1800) {
        raf = requestAnimationFrame(draw);
      } else {
        if (document.body.contains(canvas)) document.body.removeChild(canvas);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, []);
}

// ── Countdown timer ──────────────────────────────────────────────────────────
function useCountdown(initialSeconds: number) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ── Plan data ────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id:       "weekly",
    label:    "Haftalık Plan",
    sub:      "İlk hafta için",
    price:    "₺199",
    priceNum: 199,
    original: "₺399",
    saving:   "%50",
    savingClr:"text-[#888]",
    note:     "Haftada ₺199",
    badge:    null,
    badgeCls: "",
  },
  {
    id:       "28d",
    label:    "28 Günlük Plan",
    sub:      "İlk 28 gün için",
    price:    "₺599",
    priceNum: 599,
    original: "₺1.599",
    saving:   "%63",
    savingClr:"text-[#C9A84C]",
    note:     "Günde sadece ₺21",
    badge:    "EN POPÜLER",
    badgeCls: "bg-[#C9A84C] text-black",
  },
  {
    id:       "yearly",
    label:    "Yıllık Plan",
    sub:      "Yıllık abonelik",
    price:    "₺1.599",
    priceNum: 1599,
    original: "₺2.499",
    saving:   "%36",
    savingClr:"text-[#888]",
    note:     "Günde sadece ₺4 — en ucuz seçenek",
    badge:    "EN MANTIKLI",
    badgeCls: "bg-emerald-600 text-white",
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router    = useRouter();
  const [plan, setPlan] = useState("28d");
  const countdown = useCountdown(9 * 60 + 33);
  useConfetti();

  const selected = PLANS.find(p => p.id === plan)!;

  function handlePay() {
    alert("Ödeme sistemi yakında aktif olacak!");
    router.push("/success");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col max-w-[430px] mx-auto px-4 py-8 gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[#888] text-xl w-8 h-8 flex items-center justify-center">←</button>
        <LogoIcon size={28} />
        <div className="w-8" />
      </div>

      <h1 className="text-2xl font-black text-white">Kişisel Kegel Planını Al</h1>

      {/* Coupon code + countdown */}
      <div className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#C9A84C] rounded-2xl">
        <div className="flex items-center gap-2.5">
          <span className="text-[#C9A84C] font-black text-base">✓</span>
          <div>
            <p className="text-white text-sm font-bold leading-tight">skill_may2026</p>
            <p className="text-[#888] text-xs mt-0.5">Kupon uygulandı</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#888] uppercase tracking-wider mb-0.5">Sona eriyor</p>
          <p className="text-[#C9A84C] font-black text-lg tabular-nums leading-none">{countdown}</p>
        </div>
      </div>

      {/* Plan cards */}
      <div className="space-y-3">
        {PLANS.map(p => {
          const isActive = plan === p.id;
          return (
            <button key={p.id} onClick={() => setPlan(p.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all relative ${
                isActive
                  ? "border-[#C9A84C] bg-[#C9A84C]/8"
                  : "border-[#2A2A2A] bg-[#141414] hover:border-[#3A3A3A]"
              }`}>

              {/* Badge */}
              {p.badge && (
                <span className={`absolute -top-2.5 left-4 text-[10px] px-2.5 py-0.5 rounded-full font-black ${p.badgeCls}`}>
                  {p.badge}
                </span>
              )}

              <div className="flex items-start justify-between gap-3">
                {/* Left */}
                <div className="flex-1 space-y-0.5">
                  <p className={`font-black text-sm ${isActive ? "text-white" : "text-white/80"}`}>{p.label}</p>
                  <p className="text-[#888] text-xs">{p.sub}</p>
                  <p className={`text-xs font-semibold mt-1.5 ${isActive ? "text-[#C9A84C]" : "text-[#666]"}`}>{p.note}</p>
                </div>

                {/* Right — prices */}
                <div className="text-right shrink-0 space-y-0.5">
                  {/* Original — bigger, strikethrough, gray */}
                  <p className="text-[#555] text-base line-through leading-tight">{p.original}</p>
                  {/* New price — gold */}
                  <p className="text-[#C9A84C] font-black text-2xl leading-tight">{p.price}</p>
                  {/* Save badge */}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/5 ${p.savingClr}`}>
                    Save {p.saving}
                  </span>
                </div>
              </div>

              {/* Active dot */}
              {isActive && (
                <div className="absolute right-3 top-3 w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center">
                  <span className="text-black font-black" style={{ fontSize: 9 }}>✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Today's price box */}
      <div className="p-5 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[#888] text-xs uppercase tracking-wider font-semibold">Bugün Ödenecek</p>
            <p className="text-emerald-400 text-xs font-semibold">Otomatik indirim uygulandı ✓</p>
          </div>
          <div className="text-right">
            {/* Old price — bigger than usual, clearly struck */}
            <p className="text-[#555] text-lg line-through leading-tight font-semibold">{selected.original}</p>
            {/* New price — large, gold */}
            <p className="text-[#C9A84C] text-4xl font-black leading-tight">{selected.price}</p>
          </div>
        </div>
        <p className="text-emerald-400 text-xs font-bold">%{selected.saving.replace("%","")} tasarruf edersiniz</p>
        <p className="text-[#555] text-xs">İstediğin zaman iptal edebilirsin</p>
      </div>

      {/* Pay button */}
      <button onClick={handlePay}
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-lg hover:bg-[#E8C97A] active:scale-95 transition-all btn-glow">
        PLANIMI AL 🔒
      </button>

      {/* Fine print */}
      <p className="text-center text-[10px] text-[#444] leading-relaxed">
        İndirim otomatik uygulandı. Abonelik seçilen süre sonunda tam fiyattan yenilenir.
        İstediğin zaman iptal et:{" "}
        <span className="text-[#666]">destek@kegelmax.com</span>
      </p>

      {/* Guarantee card */}
      <div className="border border-[#C9A84C]/35 rounded-2xl p-5 text-center space-y-2 bg-[#141414]">
        <p className="text-3xl">🛡️</p>
        <p className="text-white font-black text-base">30 Gün Para İade Garantisi</p>
        <p className="text-[#888] text-xs leading-relaxed">
          Sonuç görmezseniz tam iade
        </p>
      </div>

      {/* Legal links */}
      <div className="flex justify-center gap-5 text-[10px] text-[#444] pb-4">
        {["Kullanım Koşulları", "Gizlilik", "İptal Politikası"].map(l => (
          <a key={l} href="#" className="hover:text-[#777] transition-colors">{l}</a>
        ))}
      </div>
    </div>
  );
}
