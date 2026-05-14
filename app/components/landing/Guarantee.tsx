import Link from "next/link";

export default function Guarantee() {
  return (
    <section className="py-16 px-4 bg-[#0D0D0D]">
      <div className="max-w-[430px] mx-auto">
        <div className="border border-[#C9A84C]/35 rounded-3xl p-7 text-center space-y-5 bg-[#141414]">
          <span className="text-5xl">🛡️</span>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-white">%100 Para İade Garantisi</h2>
            <p className="text-[#888] text-sm leading-relaxed">
              30 gün boyunca deneyin. Sonuç görmezseniz{" "}
              <span className="text-[#C9A84C] font-semibold">tam iade</span> yapıyoruz.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-[#888]">
            {["🔒 Güvenli Ödeme", "⭐ 4.7/5 Puan", "👥 1M+ Kullanıcı"].map(b => (
              <span key={b} className="px-3 py-1 rounded-full bg-[#1E1E1E] border border-[#2A2A2A]">{b}</span>
            ))}
          </div>
          <Link href="/quiz"
            className="block w-full py-3.5 rounded-2xl bg-[#C9A84C] text-black font-bold text-sm hover:bg-[#E8C97A] transition-colors">
            Ücretsiz Başla →
          </Link>
        </div>
      </div>
    </section>
  );
}
