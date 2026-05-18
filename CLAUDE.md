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
**Vizyon:** The Coach app (the.coach) tarzında Türkçe erkek sağlığı web funneli. Uygulama indirmeye gerek yok, telefon tarayıcısından açılır (mobile-first web app).

---

## Tasarım Sistemi

| Token | Değer |
|---|---|
| Arka plan | `#0A0A0A` (derin siyah) |
| Ana vurgu | `#C9A84C` (altın/bronz) |
| Altın açık | `#E8C97A` |
| Kart | `#141414` ve `#1E1E1E` |
| Metin | `#FFFFFF` |
| İkincil metin | `#888888` |
| Border | `#2A2A2A` |
| Font | Plus Jakarta Sans (Google Fonts) |
| Max genişlik | `430px`, `margin: auto` (telefon görünümü) |

### Logo
`app/components/Logo.tsx` — Altın kare (#C9A84C) + siyah K harfi + ok ucu + anime hız çizgileri (SVG).
Navbar'da `<Logo />` ve `<LogoIcon size={34} />` şeklinde kullanılıyor.

---

## Tech Stack

- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animasyonlar)

### Geliştirme Komutları
```bash
npm run dev      # geliştirme sunucusu
npm run build    # production build
npx tsc --noEmit # type check (her değişiklik sonrası çalıştır)
```

---

## Sayfa Yapısı

| Sayfa | Dosya | Durum |
|---|---|---|
| `/` | `app/page.tsx` | ✅ Tam |
| `/quiz` | `app/quiz/page.tsx` | ✅ Tam |
| `/result` | `app/result/page.tsx` | ✅ Tam |
| `/checkout` | `app/checkout/page.tsx` | ✅ Tam |
| `/success` | `app/success/page.tsx` | ✅ Tam |
| `/program` | — | 🔲 YAPILMADI |

---

## Landing Page Bölüm Sırası (`app/page.tsx`)

```
Navbar → UrgencyBar → Hero → WhyUnique → Badges → MediaLogos →
Experts → Programs → Stats → HowItWorks → Comparison →
Testimonials → FAQ → Guarantee → FinalCTA → Footer → StickyCtaBar
```

### Önemli Landing Bileşenleri

| Bileşen | Dosya | Not |
|---|---|---|
| Navbar | `components/landing/Navbar.tsx` | Sadece Logo + "Başla →" butonu |
| UrgencyBar | `components/landing/UrgencyBar.tsx` | Fixed top-14, altın bar, toplam üye sayacı |
| StickyCtaBar | `components/landing/StickyCtaBar.tsx` | Fixed bottom-0, canlı izleyici sayacı |
| Hero | `components/landing/Hero.tsx` | Badge 350bin+, gizlilik metni, metrik kartlar |
| MediaLogos | `components/landing/MediaLogos.tsx` | Sonsuz yatay marquee (22s) |
| Experts | `components/landing/Experts.tsx` | 3 gerçek yabancı uzman + fotoğraflar |
| QuizStartButton | `components/landing/QuizStartButton.tsx` | PrivacyModal açar |
| PrivacyModal | `components/PrivacyModal.tsx` | 2 adımlı KVKK/ToS bottom sheet |

### UrgencyBar Üye Sayısı Formülü
Lansman: 1 Ocak 2024. Günde ~200 yeni kullanıcı.
`250_000 + daysSinceLaunch * 200` → şu an ~350k

---

## Quiz Akışı (`app/quiz/page.tsx`)

26 soru + ara ekranlar. Header'da "X/26" sayacı var.

**Bölüm 1 — Giriş:** Yaş, motivasyon, ARA ekran
**Bölüm 2 — Performans & Kontrol:** 9 soru + 2 ARA ekran
**Bölüm 3 — Psikoloji & İlişkiler:** 9 soru + 1 ARA ekran
**Bölüm 4 — Farkındalık & Eğitim:** 3 soru + 1 ARA ekran
**Bölüm 5 — Yaşam Tarzı:** 4 soru

---

## Result Sayfası (`app/result/page.tsx`)

3 adım:
1. **LoadingStep** — 4 progress bar (hepsi %100), BAR_DURATION=1900ms, log mesajları gold renk geçişli, tamamlanınca canvas confetti
2. **GoalStep** — "Hedefine Ulaş [bugün+28gün]", animasyonlu S-eğrisi grafik ("Şimdi" / "4 Hafta Sonra" baloncukları), bullet listesi
3. **ComparisonStep** — Önce/sonra karşılaştırma tablosu

---

## Checkout Sayfası (`app/checkout/page.tsx`)

- Açılışta canvas confetti (altın + beyaz)
- Kupon kodu: `skill_may2026` (geri sayım sayacı)
- 3 plan: Haftalık ₺199, 28 Gün ₺599 (varsayılan), Yıllık ₺1.599
- Seçilen plana göre dinamik fine print

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

## Hesaplar & Servisler

| Servis | Durum |
|---|---|
| GitHub | `erdemsngn/kegelmax` ✅ |
| Vercel | ✅ kegelmax.vercel.app — GitHub push → otomatik deploy |
| Stripe | 🔲 Hesap var, entegrasyon ortakla yapılacak |
| Supabase | 🔲 KURULMADI |
| E-posta | 🔲 KURULMADI |

---

## Yapılacaklar (Öncelik Sırası)

1. ✅ Landing page (tüm bölümler)
2. ✅ Quiz (26 soru + ara ekranlar + sayaç)
3. ✅ Result sayfası (loading + grafik + karşılaştırma + confetti)
4. ✅ Checkout sayfası (3 plan + kupon + confetti)
5. ✅ Success sayfası
6. ✅ KVKK/Privacy modal (2 adım)
7. ✅ UrgencyBar + StickyCtaBar
8. ✅ Logo yenileme (altın K + anime hız çizgileri)
9. ✅ Vercel deploy
10. 🔲 **Egzersiz / program ekranı** — satın alan kullanıcıya gösterilecek 28 günlük içerik
11. 🔲 Kullanıcı auth (satın alım sonrası giriş)
12. 🔲 Stripe ödeme entegrasyonu
13. 🔲 Supabase veritabanı
14. 🔲 E-posta gönderimi

---

## Ekip

- **Erdem:** kurucu, Claude Code ile geliştiriyor, teknik bilgisi yok
- **Yazılımcı:** ilerleyen aşamada devreye girecek
- **Hedef:** The Coach tarzı Türkçe erkek sağlığı funneli

---

## Önemli Notlar

- React StrictMode: state updater'ı dışında yan etki yapma (idx++ gibi şeyleri updater dışında tut)
- Turkish characters Edit tool'unda bazen string matching bozuyor → o zaman Write ile tam yeniden yaz
- `style jsx` Tailwind projede çalışıyor (MediaLogos marquee animasyonu için kullanıldı)
- Canvas confetti: dependency-free, hem result hem checkout'ta aynı pattern
