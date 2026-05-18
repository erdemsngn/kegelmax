import Link from "next/link";

export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Altın arka plan */}
      <rect width="40" height="40" rx="10" fill="#C9A84C" />
      {/* K harfi — siyah, kalın */}
      <path
        d="M13 10 L13 30"
        stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round"
      />
      <path
        d="M13 20 L25 11"
        stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round"
      />
      <path
        d="M13 20 L25 30"
        stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round"
      />
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
