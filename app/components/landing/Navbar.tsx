"use client";
import Logo from "../Logo";
import QuizStartButton from "./QuizStartButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#1A1A1A]">
      <div className="max-w-[430px] mx-auto px-4 h-14 flex items-center justify-between">
        <Logo />
        <QuizStartButton className="text-xs px-4 py-2 rounded-full bg-[#C9A84C] text-black font-black hover:bg-[#E8C97A] transition-colors tracking-wide">
          Başla →
        </QuizStartButton>
      </div>
    </nav>
  );
}
