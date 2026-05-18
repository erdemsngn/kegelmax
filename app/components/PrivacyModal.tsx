"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Sayfa 1: KVKK / Gizlilik Politikası ────────────────────────────────────
const POLICY = `Gizlilik Politikası, Kişisel Verilerin İşlenmesi Aydınlatma Metni ve Açık Rıza Beyanı
Yürürlük Tarihi: 1 Ocak 2025 | Son Güncelleme: 5 Mart 2026

Madde 1 (Tanımlar)
İşbu metinde geçen Kegel Max ("biz", "bizim" veya "bize") https://kegelmax.com/ uzantılı web sitesini ve dijital platformu; Veri Sorumlusu, Kegel Max Marka Sahibini; Hizmet, platform üzerinden sunulan kişisel kegel programı ve koçluk hizmetlerini; Kişisel Veri, kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgiyi ifade eder.

Madde 2 (Doğrudan Sağlanan Veriler)
Kegel Max, kullanıcıların Hizmet'e erişimi ve kaydı esnasında sağladıkları; ad, e-posta adresi, yaş, cinsiyet ve kişisel hedefler gibi kayıt bilgilerini; kişisel program oluşturulması amacıyla yanıtlanan kişilik özellikleri ve sağlık durumu içerikli quiz sorularını ve ödeme işlemlerinin Stripe aracılığıyla güvenli şekilde yürütülmesi için gereken finansal verileri işlemektedir.

Madde 3 (Otomatik Toplanan Teknik Veriler)
Hizmet'in kullanımı sırasında; reklam kimlikleri dahil cihaz tanımlayıcıları, işletim sistemi sürümü, teknik kullanım verileri ve analiz çıktıları gibi bilgiler, uygulama işlevselliğinin iyileştirilmesi amacıyla otomatik yöntemlerle toplanmaktadır.

Madde 4 (Veri İşleme Amaçları)
Toplanan veriler; kişiselleştirilmiş kegel programlarının oluşturulması, aboneliklerin yönetilmesi, ödeme süreçlerinin yürütülmesi, quiz yanıtlarına göre kullanıcı deneyiminin özelleştirilmesi, uygulama güncellemeleri ve güvenlik bildirimlerinin iletilmesi, dolandırıcılığın önlenmesi ve platform güvenliğinin tesisi amaçlarıyla sınırlı olarak işlenmektedir.

Madde 5 (Üçüncü Taraf Hizmet Sağlayıcılar)
Kegel Max, ödeme süreçleri için PCI-DSS uyumlu Stripe altyapısını ve uygulama iyileştirme süreçleri için anonim veri odaklı analiz hizmetlerini kullanmakta olup; tüm iş ortakları katı gizlilik ve veri koruma standartlarına uymakla yükümlüdür.

Madde 6 (Veri Saklama ve İmha Koşulları)
Kegel Max, profil bilgilerini aktif üyelik süresince saklamakta ve abonelik sona erdikten sonra yasal/muhasebe yükümlülükleri gereği verileri maksimum 6 yıl boyunca muhafaza etmektedir.

Madde 7 (Uluslararası Veri Transferi)
Hizmet'in teknik altyapısı gereği veriler yurt dışına aktarılabilmekte olup; bu süreçte GDPR uyumlu Standart Sözleşme Maddeleri ve tüm ilgili mevzuatlara uyumlu açık rıza mekanizmaları işletilerek uluslararası transfer güvenliği sağlanmaktadır. Kişisel verilerin üçüncü taraflarla paylaşımı ve uluslararası transferi anonimleştirilerek gerçekleştirilmekte olup kullanıcının kimliğinin belirlenebilirliği önlenmektedir.

Madde 8 (Veri Sahibi Hakları)
Kullanıcılar; verilerine erişim, yanlış verilerin düzeltilmesi, verilerin silinmesi, taşınabilirliği, işleme faaliyetine itiraz ve onayını geri çekme haklarına sahip olup; bu haklarını destek@kegelmax.com adresi üzerinden kullanabilirler.

Madde 9 (Çocukların Gizliliği)
Kegel Max hizmetleri münhasıran 18 yaş ve üzeri bireyler için tasarlanmış olup; platform üzerinden 18 yaş altındaki çocuklardan bilerek veri toplanmadığı ve bu yöndeki verilerin tespiti halinde derhal silineceği taahhüt edilir.

Madde 10 (Teknik ve İdari Güvenlik Önlemleri)
Kegel Max, kişisel verilerin yetkisiz erişim, ifşa, kayıp veya imhaya karşı korunması amacıyla uluslararası standartlarla uyumlu uygun teknik ve organizasyonel güvenlik önlemlerini uygulamaktadır.

Madde 11 (Politika Değişiklikleri)
İşbu Gizlilik Politikası zaman zaman güncellenebilir; mali yükümlülükleri veya veri güvenliğini etkileyen önemli değişiklikler yürürlüğe girmeden en az 15 gün önce kullanıcılara e-posta yoluyla bildirilir.

Madde 12 (Açık Rıza Beyanı)
Kullanıcı, Kegel Max platformu üzerinden veri girişi yapmadan önce sunulan bu onay mekanizmasını kabul ederek; kişisel verilerin Hizmet'in sunulabilmesi için gereken kimlik ve iletişim bilgilerinin Gizlilik Politikası'nda belirtilen amaçlarla sınırlı olarak işlenmesine ve üçüncü taraf hizmet sağlayıcılarla paylaşılmasına; kişisel verilerin hizmetin teknik altyapısı ve analizlerinin yürütülmesi amacıyla yurt dışı lokasyonlu sunuculara aktarılmasına ve burada işlenmesine bilgilendirilmiş bir şekilde açık rıza verdiğini beyan ve taahhüt eder.

İletişim: destek@kegelmax.com`;

// ── Sayfa 2: Kullanım Koşulları ────────────────────────────────────────────
const TERMS = `Kullanım Koşulları ve Hizmet Sözleşmesi
Yürürlük Tarihi: 1 Ocak 2025 | Son Güncelleme: 5 Mart 2026

Madde 1 (Tanımlar)
İşbu sözleşmede geçen; Kegel Max ("biz", "bizim" veya "bize") https://kegelmax.com/ uzantılı web sitesini ve dijital platformu; Hizmet, bilim destekli kişisel kegel programları, pelvik taban egzersiz rehberleri ve 7/24 koçluk içeriklerini; Kullanıcı, platforma üye olan gerçek kişiyi ifade eder. Bu Kullanım Koşulları ve Hizmet Sözleşmesi ("Koşullar", "Sözleşme"), Kegel Max web sitesini kullanımınızı düzenler.

Madde 2 (Yaş ve Ehliyet)
Kegel Max'i kullanmak için en az 18 yaşında olmalısınız; hizmeti kullanarak bu yaş şartını ve işbu sözleşmeye taraf olmak için gereken tam fiil ehliyetine sahip olduğunuzu onaylarsınız.

Madde 3 (Hesap Sorumluluğu)
Kullanıcı, hesap oluştururken doğru ve güncel bilgi sağlamayı, giriş bilgilerini üçüncü kişilerle paylaşmamayı ve yetkisiz erişim şüphesini derhal Kegel Max'e bildirmeyi kabul eder.

Madde 4 (İşletme ve Fikri Mülkiyet)
Hizmetin tüm içeriği, özellikleri ve işlevselliği Kegel Max'e aittir ve telif hakkı, ticari marka ve diğer fikri mülkiyet yasalarıyla korunmaktadır.

Madde 5 (Abonelik Modeli)
Kegel Max; Haftalık (₺199), 28 Günlük (₺599) ve Yıllık (₺1.599) abonelik seçenekleriyle çalışmaktadır. Seçilen plandaki indirimli fiyat yalnızca ilk satın alım dönemine aittir; bu süre sonunda iptal edilmediği takdirde abonelik tam liste fiyatından (sırasıyla ₺399, ₺1.599, ₺2.499) otomatik olarak yenilenir.

Madde 6 (Ödeme ve Otomatik Yenileme)
Seçilen abonelik döneminin bitiminden önce iptal işlemi yapılmadığı takdirde, abonelik otomatik olarak yenilenir ve tanımlı ödeme yönteminden ilgili tam fiyat tahsil edilir. Ödemeler Stripe aracılığıyla güvenli şekilde işlenir. Fiyatlar vergiler dahil olup bölgeye göre değişiklik gösterebilir.

Madde 7 (Şeffaflık Beyanı)
Kullanıcı, ödeme ekranında yer alan indirim ve yenileme bilgilerini görerek işlemi başlattığını, fiyat geçişi ve otomatik yenileme şartları hakkında tam olarak bilgilendirildiğini kabul eder.

Madde 8 (Hizmet İçeriği)
Abonelik kapsamında; kişiselleştirilmiş kegel ve pelvik taban egzersiz programları, bilim destekli eğitim içerikleri, dayanıklılık ve kontrol teknikleri, 7/24 cinsel performans koçluğu ile düzenli içerik güncellemelerine erişim sunulmaktadır.

Madde 9 (İptal Politikası)
Aboneliğinizi istediğiniz zaman destek@kegelmax.com üzerinden iptal edebilirsiniz; iptal durumunda abonelik mevcut fatura döneminin sonuna kadar aktif kalmaya devam eder.

Madde 10 (Cayma Hakkı ve İstisnalar)
İlgili mevzuat kapsamında satın alma tarihinden itibaren 14 gün içinde cayma hakkınız bulunmaktadır. Cayma talebinizi destek@kegelmax.com adresine e-posta göndererek iletebilirsiniz. Şartları taşıyan cayma talebiniz, talebin tarafımıza ulaşmasından itibaren 14 gün içinde değerlendirilir.

Madde 11 (Memnuniyet ve İade)
Kegel Max, 30 günlük para iade garantisi sunar. Hizmetten beklenen verimi alamayan kullanıcıların iade taleplerini iyi niyet çerçevesinde değerlendirir; teknik sorunlar veya hatalı ücretlendirme durumunda tam iade yapılır.

Madde 12 (Sağlık Beyanı)
Kegel Max, egzersiz ve yaşam tarzı koçluğu hizmetleri sunmaktadır. Hizmet içerikleri genel bilgi amaçlıdır; tıbbi teşhis veya tedavi yerine geçmez, herhangi bir sağlık profesyonelinin tavsiyesinin alternatifi olarak değerlendirilemez.

Madde 13 (Yasaklanan Faaliyetler)
Hizmeti kullanarak; platformu yasadışı amaçlar için kullanmayacağınızı, diğer kullanıcılara yönelik hukuki sorumluluk doğuracak eylemlerden kaçınacağınızı, hizmetin yetkisiz alanlarına erişmeye çalışmayacağınızı, platformu tersine mühendislik yapmak veya kaynak kodlarına erişmeye çalışmak suretiyle fikri mülkiyet haklarını ihlal edecek herhangi bir girişimde bulunmayacağınızı kabul edersiniz.

Madde 14 (Hesap Sonlandırma ve Silme)
Kullanıcılar, Kegel Max hesaplarını diledikleri zaman herhangi bir ek ücret ödemeksizin kalıcı olarak silebilirler. Kegel Max ise; Kullanım Koşulları'nın ihlal edilmesi, hizmetin suistimal edilmesi veya yasal bir zorunluluk doğması durumunda kullanıcı hesabını önceden bildirimde bulunmaksızın askıya alma veya sonlandırma hakkını saklı tutar.

Madde 15 (İletişim ve Destek)
Bu Koşullar, abonelik süreçleri veya teknik destek hakkındaki tüm soru ve taleplerinizi destek@kegelmax.com e-posta adresi üzerinden iletebilirsiniz.

Madde 16 (Değişiklik ve Onay)
Kegel Max, koşulları güncelleyebilir ve önemli değişiklikleri 15 gün önceden e-posta ile bildirir. Kegel Max platformunu kullanarak; bu Kullanım Koşullarını ve Hizmet Sözleşmesini okuduğunuzu, tüm maddeleri anladığınızı ve belirtilen şartlara bağlı kalmayı hukuken kabul ve taahhüt ettiğinizi beyan edersiniz.

İletişim: destek@kegelmax.com`;

const PAGES = [
  { step: "1/2", title: "Kişisel Verilerin İşlenmesi", subtitle: "Gizlilik & KVKK", content: POLICY },
  { step: "2/2", title: "Kullanım Koşulları",          subtitle: "Hizmet Sözleşmesi",  content: TERMS  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ open, onClose }: Props) {
  const router  = useRouter();
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const current = PAGES[page];
  const isLast  = page === PAGES.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
      router.push("/quiz");
    } else {
      setPage(1);
      // scroll to top on page change
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: "instant" }), 50);
    }
  };

  const handleClose = () => {
    setPage(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto bg-[#111] rounded-t-3xl border-t border-[#2A2A2A] flex flex-col"
            style={{ maxHeight: "88vh" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-[#333]" />
            </div>

            {/* Header */}
            <div className="px-5 pt-2 pb-3 border-b border-[#1E1E1E] shrink-0 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#888] uppercase tracking-widest">{current.subtitle}</p>
                <h3 className="text-white font-black text-base mt-0.5">{current.title}</h3>
              </div>
              {/* Step indicator */}
              <div className="flex items-center gap-1.5">
                {PAGES.map((_, i) => (
                  <div key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === page ? "w-5 h-1.5 bg-[#C9A84C]" : i < page ? "w-1.5 h-1.5 bg-[#C9A84C]/50" : "w-1.5 h-1.5 bg-[#333]"
                    }`}
                  />
                ))}
                <span className="text-[#555] text-[10px] ml-1 font-mono">{current.step}</span>
              </div>
            </div>

            {/* Scrollable content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                ref={scrollRef}
                className="overflow-y-auto flex-1 px-5 py-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <pre className="text-[11px] text-[#666] leading-relaxed whitespace-pre-wrap font-sans">
                  {current.content}
                </pre>
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="px-5 py-5 pb-8 border-t border-[#1E1E1E] shrink-0 space-y-3">
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl bg-[#C9A84C] text-black font-black text-base hover:bg-[#E8C97A] transition-colors"
              >
                {isLast ? "Kabul Et ve Devam Et →" : "Devam Et →"}
              </button>
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl bg-transparent text-[#666] text-sm font-semibold hover:text-white transition-colors"
              >
                İptal
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
