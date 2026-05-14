# Kegel Max — Proje Bağlamı

## Genel Bilgiler

| Alan | Değer |
|------|-------|
| İsim | Kegel Max — Erkek Sağlığı Koçu |
| Site adı | kegel.max |
| Platform | Mobile-first web app |
| Hedef kitle | Erkekler, 18+ |
| Para modeli | Tamamen ücretli (freemium yok) |
| Aşama | Aktif geliştirme |
| Başlangıç tarihi | 2026-05-10 |

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Backend/DB:** PostgreSQL (henüz bağlanmadı)
- **Deployment:** TBD

## Renk Paleti

| Token | Değer |
|-------|-------|
| `--bg` | `#0A0A0A` |
| `--gold` | `#C9A84C` |
| `--gold-light` | `#E8C97A` |
| `--card` | `#141414` |
| `--card-2` | `#1E1E1E` |
| `--border` | `#2A2A2A` |
| `--text-muted` | `#888888` |

## Rota Yapısı

| Rota | Açıklama |
|------|----------|
| `/` | Landing page (The Coach tarzı) |
| `/onboarding` | Onboarding akışı (5 adım, purple tema — güncellenmeli) |
| `/exercise` | Egzersiz ekranı (streak + haptic) |

## Tamamlanan Bileşenler

### Landing Page (`app/components/landing/`)
- `Navbar.tsx` — Sticky navbar, scroll blur, hamburger menü
- `Hero.tsx` — 2 sütun, floating metric kartlar (CSS float animasyonu)
- `Programs.tsx` — 4 tab, program içeriği + sonuçlar
- `Features.tsx` — 4 özellik kartı
- `Results.tsx` — Scroll'da animasyonlu sayaç (Intersection Observer)
- `HowItWorks.tsx` — 3 adım
- `Experts.tsx` — 4 uzman kartı
- `Testimonials.tsx` — 6 yorum kartı (3x2 grid)
- `Guarantee.tsx` — %100 para iade garantisi
- `FinalCTA.tsx` — Son çağrı bölümü
- `Footer.tsx` — Linkler + sosyal + copyright

### Egzersiz Uygulaması
- `app/exercise/page.tsx` — Squeeze/Hold/Relax circle, streak, haptic feedback
- `app/hooks/useStreak.ts` — localStorage streak sistemi
- `app/hooks/useHaptic.ts` — navigator.vibrate wrapper

## Yapılacaklar

- [ ] Onboarding renk paletini landing ile uyumlu hale getir (sarı/siyah)
- [ ] 42 adımlı tam onboarding akışı (kişiselleştirme soruları + satış sayfası)
- [ ] Backend entegrasyonu (PostgreSQL)
- [ ] Ödeme sistemi (Stripe)
- [ ] Ana uygulama ekranları (Plan / Topluluk / Öğren / Profil)

## Notlar

- Hassas konu: dil sade, tıbbi değil, güven verici olmalı.
- Privacy-first yaklaşım pazarlama mesajının merkezinde.
- "Şimdi Başla" / CTA butonları `/onboarding`'e yönlendirir.
