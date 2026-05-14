import Link from "next/link";

export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="12" fill="#141414" />
      <circle cx="22" cy="25" r="13" stroke="#C9A84C" strokeWidth="1.8" fill="none" />
      {/* K */}
      <line x1="15" y1="18" x2="15" y2="31" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="24.5" x2="24" y2="18" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="24.5" x2="24" y2="31" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrow top-right */}
      <path d="M30 5 H38 V13" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="38" y1="5" x2="29" y2="14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoIcon size={36} />
      <span className="font-bold text-white text-[15px] tracking-tight">Kegel Max</span>
    </Link>
  );
}
