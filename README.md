# KawanJualan

AI-assisted content & strategy generator untuk UMKM.  
Tujuan aplikasi ini adalah membantu pemilik usaha kecil menghasilkan:

- Caption Marketing
- Business Strategy
- Financial Simulation
- Export hasil dalam format DOCX
- No login, no database – semua data disimpan di perangkat pengguna.

Aplikasi ini dibuat dengan fokus pada **real impact untuk UMKM**, bukan sekadar tools AI biasa.

---

## 🎯 Kenapa KawanJualan?

UMKM sering kali tidak punya waktu atau skill marketing. KawanJualan membantu:

| Tantangan UMKM | Solusi Aplikasi |
|---|---|
| Sulit bikin caption promosi | AI generate 3 style caption otomatis |
| Tidak tahu strategi bisnis | Rencana bisnis otomatis berdasarkan input |
| Tidak paham simulasi keuangan | AI hitung simulasi cicilan, risiko, dan tips finansial |
| Tidak mau ribet | Data tersimpan lokal, tidak perlu login |

---

## 🧠 Fitur Utama

- AI Caption Generator (3 format: pendek, medium, storytelling)
- AI Business Planner
- AI Finance Simulation
- Export hasil ke `.docx`
- Regenerate result
- Copy all content (1 klik)
- LocalStorage session resume

Detail fitur lengkap ada di `FEATURES.md`.

---

## 🛠️ Teknologi

| Layer | Stack |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind v4 |
| AI | Qwen 3B via KolosalAI |
| Export | DOCX (docx.js) |
| Storage | LocalStorage (client-only) |
| Deployment | Vercel |

---

## 📦 Instalasi

Lihat `INSTALL_GUIDE.md`.

---

## 🧪 Status Development

| Status | Keterangan |
|---|---|
| Stable Build | ✔ |
| Deployment | ✔ Live di Vercel |
| Fitur Export DOCX | ✔ |
| Database Support | ❌ (bukan kebutuhan MVP) |
| Auth | ❌ (bypass effort untuk UMKM simplicity) |

---

## 📸 Screenshot

> [Tambahkan setelah semua final]  
> Folder: `/docs/screenshots`

---

## 🎥 Video Demo

> Link Video: _(upload setelah jadi)_

---

## 🏆 Hackathon Criteria Mapping

| Rubrik | Bukti |
|---|---|
| Functionality (50 poin) | Semua fitur bekerja end-to-end |
| Innovation (40 poin) | Integrasi AI realtime untuk UMKM (use-case spesifik) |
| Architecture (20 poin) | Modular: `/api`, `/utils`, `/core`, `/app/*.tsx` |
| Code Quality (10 poin) | Variable jelas, tidak ada dead code |
| Documentation & Video (80 poin) | README + GUIDE + Video + Screenshots |

(Dokumen ini dibuat mengikuti rubrik penilaian hackathon.) :contentReference[oaicite:1]{index=1}

---

## 👥 Kontributor

- Frontend + Logic: Eldric (Wicayonima)
- Prompt Engineering: Custom in-house
- UI/UX: Minimalist Clean Approach (User-first)

---

## 📄 Lisensi

MIT — bebas digunakan untuk manfaat UMKM.

