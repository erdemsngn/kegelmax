# CLAUDE.md

Bu dosya Claude Code'un ~/kegelmax projesinde nasıl çalışacağını tanımlar.

## İletişim
Türkçe konuş. Kısa ve öz cevaplar ver. Önce sonucu söyle, gerekirse kısa açıklama ekle.
Hata mesajları Türkçe olsun. Her açıklama sade ve anlaşılır olsun.

## Çalışma Stili
- Minimum değişiklik yap. Dosyanın tamamını yeniden yazmak yerine sadece gerekli kısmı düzenle.
- Büyük görevleri küçük adımlara böl; her adımdan sonra bir sonraki kritik adımı öner.
- Hata ayıklarken önce kök nedeni bul, belirsizse bir kısa soru sor.
- Adım adım açıkla, acele etme, hataları söyle.

---

## Proje: Kegel Max — Pelvik Güç

**Site:** kegel.max
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
| Logo | Siyah kare + altın daire + K harfi + sağ üste ok (SVG) |

---

## Tech Stack

- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animasyonlar)
- **Node.js**

### Geliştirme Komutları
```bash
npm run dev      # geliştirme sunucusu
npm run build    # production build
npm run lint     # lint kontrolü
npx tsc --noEmit # type check
```

---

## Sayfa Yapısı

| Sayfa | Açıklama |
|---|---|
| `/` | Landing page (The Coach tarzı ikna edici) |
| `/quiz` | 26 soruluk kişiselleştirme quiz'i |
| `/result` | Analiz + hedef tarihi + karşılaştırma tablosu |
| `/checkout` | Fiyatlandırma + Stripe ödeme |
| `/success` | Ödeme sonrası başarı |

---

## Quiz Akışı (26 Soru + Ara Ekranlar)

**Bölüm 1 — Giriş:**
- Yaş seçimi (18-29 / 30-39 / 40-49 / 50+) görsel kartlar
- Ana motivasyon (ikonlu liste)
- ARA: "Gücün Buradan Başlar" + anatomi SVG

**Bölüm 2 — Performans & Kontrol:**
- Ne kadar dayanıyorsun?
- İdeal kontrol süresi?
- Ne sıklıkla erken bitiriyorsun?
- Yüksek uyarılmada dayanma süresi
- Yoğunluğu bilinçli azaltabilir misin?
- Uzun sürmek için ne önemli?
- Ereksiyon puanı (1-5 slider)
- Libido puanı (1-5 slider)
- Seks isteği sıklığı
- ARA: "1M+ erkek kontrolünü geliştirdi" + S eğrisi grafik
- ARA: "Kegel + SKT = Daha İyi Performans" + uyarılma grafiği

**Bölüm 3 — Psikoloji & İlişkiler:**
- Seks sırasında özgüven?
- Mevcut performanstan memnuniyet?
- Yakınlık öncesi kaygı?
- Partnerle bağ?
- Kontrol özgüven için ne kadar önemli?
- Gerilimi yavaşlatabilir misin? (1-5 slider)
- Sertliği geri kazanma hızı (1-5 slider)
- Pozisyon değiştirme sıklığı
- Nefes kullanımı
- ARA: "İkiniz İçin De İyi Hissettiriyor" + çift görseli

**Bölüm 4 — Farkındalık & Eğitim:**
- Haftalık pratik sıklığı
- Seans uzunluğu tercihi
- Yoğunluk seviyesi
- ARA: "Harika Haber! Günde 5 dk yeterli"

**Bölüm 5 — Yaşam Tarzı:**
- Aktivite seviyesi
- Günlük oturma süresi
- Alkol sıklığı
- Uyku süresi

---

## Result Sayfası

- **Adım 1:** Analiz loading (4 progress bar, 3sn)
- **Adım 2:** "Hedefine Ulaş [bugün+28gün]"
  - S eğrisi grafik animasyonlu (yavaşça çizilsin)
  - Alt maddeler birer birer fade-in
  - Buton: "Dönüşüme Başla 🚀" (pulse animasyonu)
- **Adım 3:** Önce/Sonra karşılaştırma tablosu

---

## Checkout Sayfası

Açılışta confetti animasyonu (altın + beyaz, 1.5sn)
Kupon kodu: `skill_may2026` (geri sayım sayacı)

**3 Plan:**

| Plan | Eski Fiyat | Yeni Fiyat | İndirim |
|---|---|---|---|
| Haftalık | ~~₺399~~ | ₺199 | %50 |
| 28 Gün ⭐ EN POPÜLER *(varsayılan)* | ~~₺1.599~~ | ₺599 | %63 |
| Yıllık EN MANTIKLI | ~~₺2.499~~ | ₺1.599 | %36 (günde ₺4) |

Eski fiyatlar üstü çizik **ve** büyük görünsün. 30 gün para iade garantisi.

---

## Motivasyon Ekranları (Quiz İçi)

Her 2-3 soruda bir Unsplash fotoğraflı motivasyon ekranı:

| Tema | URL |
|---|---|
| Egzersiz | unsplash.com/photo-1571019613454-1cb2f99b2d8b |
| Meditasyon | unsplash.com/photo-1544367567-0f2fcb009e0b |
| Çift | unsplash.com/photo-1552196563-55cd4e45efb3 |
| Özgüven | unsplash.com/photo-1571019614242-c5c5dee9f50b |
| Güç | unsplash.com/photo-1517836357463-d25dfeac3438 |

---

## Hesaplar & Servisler

| Servis | Durum |
|---|---|
| GitHub | `erdemsngn/kegelmax` ✅ oluşturuldu |
| Stripe | Hesap var, entegrasyon YAPILMADI |
| Supabase | KURULMADI |
| Vercel | ✅ Deploy edildi — kegelmax.vercel.app |
| E-posta servisi | KURULMADI |

---

## Yapılacaklar (Öncelik Sırası)

1. ✅ Landing page
2. ✅ Quiz akışı (26 soru + ara ekranlar)
3. ✅ Result sayfası
4. ✅ Checkout sayfası
5. ✅ Motivasyon görselleri
6. ✅ GitHub'a yükle (erdemsngn/kegelmax)
7. ✅ Vercel deploy (internete aç) — kegelmax.vercel.app
8. 🔲 Stripe ödeme entegrasyonu
9. 🔲 Supabase veritabanı
10. 🔲 E-posta gönderimi
11. 🔲 Kullanıcı auth sistemi
12. 🔲 Egzersiz ekranı (kaldırıldı, geri eklenecek)

---

## Ekip

- **Erdem:** kurucu, Claude ile geliştiriyor
- **Yazılımcı:** 2-3 gün yoğun, sonra devreye girecek
- **Patron:** The Coach tarzı vizyon onayladı

---

## Önemli Notlar

- Kullanıcı teknik bilgisi yok, her şey sıfırdan öğreniyor
- Tüm açıklamalar Türkçe ve sade olsun
- Claude Code'da çalışıyoruz, Claude Design ayrı
- `CLAUDE.local.md` gizli bilgiler için kullanılacak
- `tasks/lessons.md` hata defteri olarak tutulsun
