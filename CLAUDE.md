# CLAUDE.md

Bu dosya Claude Code'un ~/kegelmax projesinde nasıl çalışacağını tanımlar.

## İletişim
Türkçe konuş. Kısa ve öz cevaplar ver. Önce sonucu söyle, gerekirse kısa açıklama ekle.
Hata mesajları Türkçe olsun. Her açıklama sade ve anlaşılır olsun.

## Çalışma Stili
- Minimum değişiklik yap. Dosyanın tamamını yeniden yazmak yerine sadece gerekli kısmı düzenle.
- Büyük görevleri küçük adımlara böl; her adımdan sonra bir sonraki kritik adımı öner.
- Hata ayıklarken önce kök nedeni bul, belirsizse bir kısa soru sor.
- Her değişiklikten sonra `npx tsc --noEmit` çalıştır, sonra `git add + commit + push` yap.

---

## Proje: Kegel Max — Pelvik Güç

**Canlı site:** https://kegelmax.vercel.app
**GitHub:** https://github.com/erdemsngn/kegelmax
**Vizyon:** The Coach app (the.coach) tarzında Türkçe erkek sağlığı web funneli. Mobile-first web app.

---

## Tasarım Sistemi

| Token | Değer |
|---|---|
| Arka plan | `#0A0A0A` |
| Ana vurgu | `#C9A84C` (altın) |
| Altın açık | `#E8C97A` |
| Kart | `#141414` / `#1E1E1E` |
| Metin | `#FFFFFF` |
| İkincil metin | `#888888` |
| Border | `#2A2A2A` |
| Font | Plus Jakarta Sans |
| Max genişlik | `430px` margin auto |

### Logo (`app/components/Logo.tsx`)
- SVG: 60x60 viewBox, koyu kare (#111) + altın çerçeve (glow filter)
- Daire (cx=28, cy=30, r=15.5) + K harfi (dikey + iki kol) + Mars oku (sağ üste)
- Navbar'da `<LogoIcon size={44} />` + "KEGEL/MAX" text-[16px]

---

## Tech Stack

- **Next.js 14** App Router, **TypeScript**, **Tailwind CSS**, **Framer Motion**

```bash
npm run dev
npx tsc --noEmit  # her değişiklik sonrası
git add . && git commit -m "..." && git push  # Vercel otomatik deploy
```

---

## Sayfa Yapısı

| Sayfa | Dosya | Durum |
|---|---|---|
| `/` | `app/page.tsx` | ✅ |
| `/quiz` | `app/quiz/page.tsx` | ✅ |
| `/result` | `app/result/page.tsx` | ✅ |
| `/checkout` | `app/checkout/page.tsx` | ✅ |
| `/success` | `app/success/page.tsx` | ✅ |
| `/program` | — | 🔲 Yapılmadı |

---

## Landing Page Bölüm Sırası (`app/page.tsx`)

```
Navbar → UrgencyBar → Hero → WhyUnique → Badges → MediaLogos →
Experts → Programs → Stats → HowItWorks → Comparison →
Testimonials → FAQ → Guarantee → FinalCTA → Footer → StickyCtaBar
```

### Önemli Bileşenler

| Bileşen | Dosya | Not |
|---|---|---|
| Navbar | `components/landing/Navbar.tsx` | Logo (44px) + "Başla →" gold buton |
| UrgencyBar | `components/landing/UrgencyBar.tsx` | Fixed top-14, toplam üye: `250_000 + daysSinceJan2024 * 200` |
| StickyCtaBar | `components/landing/StickyCtaBar.tsx` | Fixed bottom-0, canlı izleyici sayacı |
| Hero | `components/landing/Hero.tsx` | Badge 350bin+, gizlilik metni |
| MediaLogos | `components/landing/MediaLogos.tsx` | Sonsuz yatay marquee (22s) |
| Experts | `components/landing/Experts.tsx` | 3 gerçek yabancı uzman |
| QuizStartButton | `components/landing/QuizStartButton.tsx` | PrivacyModal açar |
| PrivacyModal | `components/PrivacyModal.tsx` | 2 adımlı KVKK/ToS |

---

## CTA Buton Metinleri

| Konum | Metin |
|---|---|
| Hero (varsayılan) | Programını Al → |
| FinalCTA | Kendini Yeniden Keşfet → |
| Guarantee | Programa Hemen Başla → |
| StickyCtaBar | Programa Hemen Başla → |
| Navbar | Başla → |

---

## Quiz (`app/quiz/page.tsx`)

- 26 soru + ara ekranlar, header'da "X/26" sayacı
- `info-bilim.jpg` ekranı → statik JPG değil, `BilimScreen` React bileşeni
  - Stanford, Harvard, Johns Hopkins, Mayo Clinic → gerçek araştırma linkleri
- Ara ekranlar: `info-img` type → `InfoImgStep` fonksiyonu

---

## Result Sayfası (`app/result/page.tsx`)

**3 adım:**

1. **LoadingStep**
   - 4 bar, hepsi %100, `BAR_DURATION = 1900ms`
   - Log mesajları: son → gold `#E8C97A`, öncekiler kademeli solar
   - Tamamlanınca canvas confetti

2. **GoalStep** — S-eğrisi grafiği
   - "Şimdi" baloncuğu (sol alt) + "4 Hafta Sonra" baloncuğu (sağ üst)
   - "Mahrem Hayat Seviyesi" floating label (eğri ortasında)
   - Bitiş noktasında **zıplayan ok animasyonu** (bounce, Framer Motion)
   - "Performans Seviyeniz" başlığı YOK (kaldırıldı)

3. **ComparisonStep**
   - Görsel: `public/info-simdiki-hedef.jpg` (sol B&W üzgün adam, sağ sıcak ışık çift)
   - "28 GÜN SONRA" badge (orta)
   - Etiketler (Özgüven Düşük, Partner Stresi, Performans Kaygısı) → parent'a absolute, z-20
   - %94 rozeti sağ üst

---

## Checkout Sayfası (`app/checkout/page.tsx`)

- Açılışta canvas confetti
- **JoinNotificationBar**: üstte canlı katılım bildirimi (10 nickname, 5sn'de bir)
  - Nicknames: Arda K., Mert B., Can Y., Burak S., Emre T., Kaan D., Berk A., Tuna M., Ege C., Alp R.
- Kupon: `skill_may2026` + geri sayım
- **TestimonialCarousel**: 16 yorum, tek kart, sağdan sola slide (6sn, 0.65s animasyon)
  - Her oturumda random başlangıç indeksi
- 3 plan: Haftalık ₺199, 28 Gün ₺599 (varsayılan), Yıllık ₺1.599
  - Yıllık plan: "Save %36" YOK → "Günde ₺4" yazıyor
- Abonelik fine print: küçük gri text (görünür ama göze batmıyor)
- 30 gün garanti kartı

---

## Hesaplar & Servisler

| Servis | Durum |
|---|---|
| GitHub | `erdemsngn/kegelmax` ✅ |
| Vercel | ✅ kegelmax.vercel.app — push → otomatik deploy |
| Stripe | 🔲 Entegrasyon ortakla yapılacak |
| Supabase | 🔲 Kurulmadı |
| E-posta | 🔲 Kurulmadı |

---

## Yapılacaklar

1. ✅ Landing page
2. ✅ Quiz (26 soru + BilimScreen tıklanabilir linkler)
3. ✅ Result sayfası (loading + grafik + karşılaştırma + confetti)
4. ✅ Checkout (testimonial carousel + join bar + fine print)
5. ✅ Success sayfası
6. ✅ Logo (K + daire + Mars oku, 44px)
7. ✅ Vercel deploy
8. 🔲 **Egzersiz / program ekranı** — satın alan kullanıcıya 28 günlük içerik
9. 🔲 Kullanıcı auth
10. 🔲 Stripe entegrasyonu
11. 🔲 Supabase + e-posta

---

## Teknik Notlar

- React StrictMode: state updater içinde yan etki yapma (idx++ dışarıda)
- Türkçe karakter Edit tool'unu bozabilir → o zaman Write ile yeniden yaz
- Canvas confetti: dependency-free, result + checkout'ta aynı pattern
- `style jsx` Tailwind projede çalışıyor (MediaLogos marquee)
- Framer Motion import: result ve checkout sayfalarında mevcut
- Remote Control: `cd ~/kegelmax && claude remote-control --name "Kegel Max"`

---

## Ekip

- **Erdem:** kurucu, Claude Code ile geliştiriyor
- **Hedef:** The Coach tarzı Türkçe erkek sağlığı funneli
