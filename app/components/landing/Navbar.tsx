"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../Logo";

const NAV = [
  { label: "Programlar",    href: "#programs" },
  { label: "Nasıl Çalışır", href: "#how"      },
  { label: "Yorumlar",      href: "#reviews"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-black/85 backdrop-blur-md border-b border-[#2A2A2A]" : ""
    }`}>
      <div className="max-w-[430px] mx-auto px-4 h-14 flex items-center justify-between">
        <Logo />

        <div className="hidden sm:flex items-center gap-6">
          {NAV.map(l => (
            <a key={l.href} href={l.href}
               className="text-xs text-[#888] hover:text-white transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <Link href="/quiz"
            className="text-xs px-4 py-2 rounded-full bg-[#C9A84C] text-black font-bold hover:bg-[#E8C97A] transition-colors">
            Şimdi Başla
          </Link>
        </div>

        {/* Mobile: just CTA + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <Link href="/quiz"
            className="text-xs px-3 py-1.5 rounded-full bg-[#C9A84C] text-black font-bold">
            Başla
          </Link>
          <button onClick={() => setOpen(v => !v)}
            className="text-white text-lg w-8 h-8 flex items-center justify-center">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden bg-[#141414] border-t border-[#2A2A2A] px-4 py-5 max-w-[430px] mx-auto space-y-3">
          {NAV.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="block text-white/70 py-1 text-sm">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
