import Link from "next/link";

export function LogoIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C97A"/>
          <stop offset="55%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#A07830"/>
        </linearGradient>
      </defs>

      {/* Koyu arka plan */}
      <rect width="60" height="60" rx="14" fill="#111"/>

      {/* Altın çerçeve */}
      <rect width="60" height="60" rx="14" fill="none"
        stroke="url(#gold)" strokeWidth="2.2" filter="url(#glow)"/>

      {/* Daire */}
      <circle cx="28" cy="30" r="15.5"
        stroke="url(#gold)" strokeWidth="2.8" fill="none" filter="url(#glow)"/>

      {/* K harfi — kalın, net */}
      {/* Dikey sol çubuk */}
      <line x1="21" y1="19" x2="21" y2="41"
        stroke="url(#gold)" strokeWidth="3.8" strokeLinecap="round"/>
      {/* Üst kol */}
      <line x1="21" y1="30" x2="32" y2="19"
        stroke="url(#gold)" strokeWidth="3.8" strokeLinecap="round"/>
      {/* Alt kol */}
      <line x1="21" y1="30" x2="32" y2="41"
        stroke="url(#gold)" strokeWidth="3.8" strokeLinecap="round"/>

      {/* Mars oku — daireden sağ üste uzanır */}
      {/* Gövde çizgisi */}
      <line x1="39" y1="19" x2="50" y2="8"
        stroke="url(#gold)" strokeWidth="2.8" strokeLinecap="round" filter="url(#glow)"/>
      {/* Ok başı — L şekli */}
      <polyline points="43,8 50,8 50,15"
        stroke="url(#gold)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glow)"/>
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <LogoIcon size={44} />
      <div className="flex flex-col leading-none">
        <span className="font-black text-white text-[16px] tracking-[0.06em] uppercase">Kegel</span>
        <span className="font-black text-[#C9A84C] text-[16px] tracking-[0.10em] uppercase">Max</span>
      </div>
    </Link>
  );
}
