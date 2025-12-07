# 📘 KawanJualan – Panduan Instalasi & Penggunaan

Selamat datang di **KawanJualan**, aplikasi AI yang membantu UMKM membuat caption marketing, rencana bisnis, dan simulasi finansial secara otomatis menggunakan AI.

Panduan ini menjelaskan langkah instalasi, konfigurasi, penggunaan, hingga deployment.

---

## 🚀 1. Persyaratan Sistem

Pastikan perangkat sudah memiliki:

| Komponen | Minimal    |
| -------- | ---------- |
| Node.js  | 18+        |
| npm      | 9+         |
| Git      | (Opsional) |

Cek versi Node:

```
node -v
```

Jika kurang dari Node 18, update dari [https://nodejs.org](https://nodejs.org).

---

## 📥 2. Clone Repository

```
git clone https://github.com/Wicayonima-Reborn/kawan-jualan.git
cd kawan-jualan
```

---

## 📦 3. Install Dependencies

```
npm install
```

---

## 🔧 4. Setup Environment

Buat file `.env.local` di root folder:

```
KOLOSAL_API_KEY=your-api-key-here
MODEL_NAME=Qwen/Qwen2.5-32B-Instruct
```

Jika belum punya API key, daftar di KolosalAI.

---

## ▶️ 5. Menjalankan Aplikasi

```
npm run dev
```

Akses website di browser:

```
http://localhost:3000
```

---

## ☁️ 6. Deploy ke Vercel (Opsional)

Install CLI jika belum:

```
npm i -g vercel
```

Deploy:

```
vercel deploy
```

Isi ulang environment variable ketika diminta.

---

## 🧠 7. Cara Menggunakan Aplikasi

Aplikasi berjalan tanpa login dan tanpa database, data tersimpan lokal.

### 1) Mulai

Klik tombol:

```
Mulai Sekarang
```

### 2) Pilih Fitur

| Fitur             | Fungsi                                         |
| ----------------- | ---------------------------------------------- |
| Caption Marketing | Membuat caption Pendek / Medium / Soft Selling |
| Rencana Bisnis    | Membuat Business Plan otomatis                 |
| Simulasi Keuangan | Simulasi pinjaman, resiko, dan rekomendasi     |

### 3) Isi Form

Contoh data:

| Field           | Contoh                 |
| --------------- | ---------------------- |
| Nama Usaha      | Kopi Santai            |
| Produk          | Es Kopi Susu Gula Aren |
| Target Audience | Mahasiswa              |

Klik:

```
Generate
```

### 4) Hasil AI

Output dapat:

* Dicopy
* Di-regenerate (AI ulang)
* Diexport `.docx`

---

## 📄 8. Export File

| Jenis | Status        |
| ----- | ------------- |
| DOCX  | ✔ Tersedia    |

Untuk export klik:

```
Export DOCX
```

---

## 🛠 9. Troubleshooting

| Masalah            | Solusi                            |
| ------------------ | --------------------------------- |
| AI tidak muncul    | Cek API key di `.env.local`       |
| Style tidak muncul | Restart server: `npm run dev`     |
| Deploy gagal       | Pastikan environment sudah terisi |

Jika error tetap:

```
npm install --force
npm run dev
```

---

## ⭐ Penutup

KawanJualan dibuat agar UMKM bisa punya branding modern tanpa ribet. Jika ada saran, request fitur, atau bug — silakan laporkan.

Terima kasih sudah menggunakan KawanJualan.
