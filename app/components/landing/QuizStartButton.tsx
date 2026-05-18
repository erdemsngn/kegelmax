"use client";
import { useState } from "react";
import PrivacyModal from "../PrivacyModal";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function QuizStartButton({
  className = "inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-all btn-glow",
  children = "Programını Al →",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <PrivacyModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
