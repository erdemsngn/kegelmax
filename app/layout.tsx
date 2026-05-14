import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kegel Max — Erkek Sağlığı Koçu",
  description: "Cinsel sağlığını ve performansını geliştir. Bilim destekli kişisel kegel programı.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={font.variable}>
      <body className="bg-[#0A0A0A] text-white antialiased">{children}</body>
    </html>
  );
}
