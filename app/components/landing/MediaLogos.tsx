const MEDIA = ["Harvard Medical School", "Stanford Medicine", "Men's Health", "USA Today"];

export default function MediaLogos() {
  return (
    <section className="py-10 px-4 border-y border-[#1A1A1A]">
      <div className="max-w-[430px] mx-auto">
        <p className="text-center text-xs text-[#555] uppercase tracking-widest mb-5 font-medium">
          Medyada Yer Aldı
        </p>
        <div className="grid grid-cols-2 gap-3">
          {MEDIA.map(m => (
            <div key={m}
              className="text-center text-xs text-[#444] font-semibold py-2 px-3 rounded-lg border border-[#1E1E1E]">
              {m}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
