import Link from "next/link";
import { LogoIcon } from "../components/Logo";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center max-w-[430px] mx-auto px-4 text-center gap-6">
      <LogoIcon size={40} />

      {/* Checkmark */}
      <div className="animate-success-pop w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
        <span className="text-emerald-400 text-3xl font-black">✓</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">Hoş Geldin!</h1>
        <p className="text-xl font-bold text-[#C9A84C]">Planın Hazırlanıyor.</p>
      </div>

      {/* Adımlar */}
      <div className="w-full bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 space-y-4 text-left">
        {[
          { icon: "📧", title: "E-postanı kontrol et", desc: "Aktivasyon bağlantısı birkaç dakika içinde gelecek. Spam klasörünü de kontrol et." },
          { icon: "⏱", title: "48 saat içinde aktif", desc: "Hesabın hazırlanıyor. En geç 48 saat içinde erişimin açılacak." },
          { icon: "💬", title: "Sorun mu var?", desc: "destek@kegelmax.com adresine yaz, hemen dönelim." },
        ].map(s => (
          <div key={s.icon} className="flex items-start gap-3">
            <span className="text-xl shrink-0">{s.icon}</span>
            <div>
              <p className="text-white text-sm font-bold">{s.title}</p>
              <p className="text-[#888] text-xs leading-relaxed mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/"
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors text-center">
        Ana Sayfaya Dön →
      </Link>
    </div>
  );
}
