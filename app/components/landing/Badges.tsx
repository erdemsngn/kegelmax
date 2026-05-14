export default function Badges() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-[430px] mx-auto text-center space-y-5">
        <p className="text-white font-bold text-base">
          1+ Milyon kullanıcı bizimle mahrem hayatını geliştirdi
        </p>

        <div className="flex justify-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-black text-[#C9A84C]">⭐ 4.7/5</p>
            <p className="text-xs text-[#888] mt-0.5">11.000+ 5 yıldız</p>
          </div>
          <div className="w-px bg-[#2A2A2A]" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">1M+</p>
            <p className="text-xs text-[#888] mt-0.5">Aktif kullanıcı</p>
          </div>
        </div>

        {/* Store badges */}
        <div className="flex justify-center gap-3">
          {["App Store", "Google Play"].map(s => (
            <div key={s}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141414] border border-[#2A2A2A] text-xs text-white/60 font-medium">
              {s === "App Store" ? "🍎" : "▶"} {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
