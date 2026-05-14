import Logo from "../Logo";

const LINKS = ["Programlar", "Hakkımızda", "Gizlilik", "KVKK"];

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] py-10 px-4 bg-[#0A0A0A]">
      <div className="max-w-[430px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-4">
            {["📸", "🐦", "▶️"].map(icon => (
              <button key={icon}
                className="w-8 h-8 rounded-lg bg-[#141414] border border-[#2A2A2A] flex items-center justify-center text-sm hover:border-[#C9A84C]/40 transition-colors">
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map(l => (
            <a key={l} href="#" className="text-xs text-[#555] hover:text-white transition-colors">{l}</a>
          ))}
        </div>

        <p className="text-xs text-[#333]">© 2025 Kegel Max. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}
