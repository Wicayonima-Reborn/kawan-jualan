// generate prompt sesuai jenis fitur yang dipilih user
export function generatePrompt(
  type: "caption" | "business" | "finance",
  data: Record<string, any>
) {
  const baseRules = `
Gunakan bahasa santai, natural, dan langsung ke hasil.
Tidak perlu kalimat pembuka, tidak perlu disclaimers.
Output harus rapi dan mudah di-copy user UMKM.
`.trim();

  const preset = {
    caption: `
Kamu akan membuat 3 caption marketing untuk sebuah bisnis.

Informasi bisnis:
- Nama usaha: ${data.nama}
- Produk: ${data.produk}
- Target pembeli: ${data.target}
- Tone: ${data.tone}
- Format konten: ${data.format}

OUTPUT RULES:
- Output harus langsung berupa hasil caption, tanpa penjelasan tambahan.
- Dilarang menulis judul seperti "Caption Pendek", "Caption Medium", atau "Soft Selling".
- Dilarang menulis batas kata seperti "(maks 15 kata)" atau angka ketentuan format.
- Dilarang menulis pembuka atau penutup seperti "Ini hasilnya:", "Berikut captionnya:", "Selesai", atau sejenisnya.
- Tidak boleh menjelaskan apa yang kamu lakukan.

FORMAT AKHIR YANG WAJIB:
1) <caption pendek maksimal 15 kata>
---
2) <caption medium 20–35 kata>
---
3) <caption soft selling storytelling 35–60 kata>

Hanya tampilkan output persis dalam format itu, tanpa perubahan lain.
`.trim(),

    business: `
Kamu akan membuat rencana bisnis singkat untuk UMKM berdasarkan data berikut:

- Nama usaha: ${data.nama}
- Produk: ${data.produk}
- Target market: ${data.target}
- Budget awal: ${data.budget || "-"}
- Lokasi: ${data.lokasi || "-"}

ATURAN OUTPUT:
- Hanya tampilkan isi rencana bisnis tanpa penjelasan atau label instruksi.
- Jangan menggunakan judul seperti "Ringkasan:" "Strategi:" dll. Formatnya langsung sebagai konten markdown sederhana.

FORMAT FINAL (WAJIB IKUTI):
Ringkasan usaha (2-4 kalimat)
---
Analisa pasar (5 poin)
---
Value proposition (3 poin)
---
Rekomendasi harga + alasan singkat
---
Strategi marketing (6 poin: 3 online, 3 offline)
---
Action plan:
- 7 hari
- 30 hari
- 90 hari

Hanya hasil akhir dalam format di atas. Tidak ada tambahan teks lain.
`.trim(),

    finance: `
Kamu akan membuat simulasi pinjaman UMKM berdasarkan data berikut:

- Nominal diajukan: Rp ${data.nominal}
- Tujuan pinjaman: ${data.tujuan}
- Pendapatan bulanan: Rp ${data.pendapatan}
- Tenor yang diinginkan: ${data.tenor} bulan

ATURAN OUTPUT:
- Output hanya hasil akhir, tanpa penjelasan atau intro.
- Jangan menulis judul atau label seperti "Simulasi:", "Catatan:", dll.
- Format harus ringkas dan mudah dibaca oleh pelaku UMKM.

FORMAT AKHIR WAJIB:
Evaluasi kelayakan (1 paragraf)
---
Estimasi nominal pinjaman ideal
---
Simulasi cicilan:
- 3 bulan
- 6 bulan
- 12 bulan
---
Warning (jika cicilan >35% dari pemasukan)
---
3 tips pengelolaan keuangan

Hanya tampilkan hasil, tanpa instruksi tambahan.
`.trim(),
  };

  return `${baseRules}\n\n${preset[type]}`;
}