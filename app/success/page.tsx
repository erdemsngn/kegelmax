import Link from "next/link";
import { LogoIcon } from "../components/Logo";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center max-w-[430px] mx-auto px-4 text-center gap-8">
      <LogoIcon size={40} />

      {/* Checkmark */}
      <div className="animate-success-pop w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
        <span className="text-emerald-400 text-3xl font-black">✓</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-black text-white">Hoş Geldin!</h1>
        <p className="text-xl font-bold text-[#C9A84C]">Planın Hazır.</p>
        <p className="text-[#888] text-sm leading-relaxed">
          E-posta adresine aktivasyon linki gönderdik.
          <br />İnbox'ını kontrol et!
        </p>
      </div>

      <Link href="/"
        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors text-center">
        Programa Başla →
      </Link>

      <p className="text-[#555] text-xs">
        Sorularınız için{" "}
        <a href="mailto:destek@kegelmax.com" className="text-[#C9A84C] hover:underline">
          destek@kegelmax.com
        </a>
      </p>
    </div>
  );
}
