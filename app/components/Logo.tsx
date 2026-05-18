import Link from "next/link";

export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Altın arka plan */}
      <rect width="40" height="40" rx="10" fill="#C9A84C" />

      {/* Anime hız çizgileri — okun ucundan yukarı-sağa fışkırıyor */}
      <line x1="28" y1="8"  x2="33" y2="2"  stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.60"/>
      <line x1="31" y1="12" x2="38" y2="9"  stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.42"/>
      <line x1="26" y1="5"  x2="29" y2="0"  stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.30"/>

      {/* K — dikey çubuk */}
      <path d="M12 9 L12 31" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round"/>

      {/* K — alt kol */}
      <path d="M12 20 L26 31" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round"/>

      {/* K — üst kol (oka kadar) */}
      <path d="M12 20 L26 9" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round"/>

      {/* Ok ucu — üst kolun ucunda, yukarı-sağa işaret ediyor */}
      <path d="M20 10 L26 9 L25 15" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoIcon size={34} />
      <div className="flex flex-col leading-none">
        <span className="font-black text-white text-[13px] tracking-[0.06em] uppercase">Kegel</span>
        <span className="font-black text-[#C9A84C] text-[13px] tracking-[0.10em] uppercase">Max</span>
      </div>
    </Link>
  );
}
