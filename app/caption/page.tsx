"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CaptionForm() {
  const router = useRouter();

  // buat nandain tombol lagi proses submit atau engga
  const [isLoading, setIsLoading] = useState(false);

  // fungsi yang jalan pas form di-submit
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // ambil semua input dari form
    const formData = new FormData(event.currentTarget);

    // data yang mau disimpen ke localStorage
    const storedData = {
      namaUsaha: formData.get("nama"),
      produk: formData.get("produk"),
      targetPembeli: formData.get("target"),
      toneCaption: formData.get("tone"),
      outputFormat: formData.get("format"),

      // buat tracking terakhir user pakai fitur apa
      lastFeatureSelected: "caption",

      // timestamp sekalian.
      timestamp: new Date().toISOString(),
    };

    // simpan ke localStorage
    localStorage.setItem("kawanJualan", JSON.stringify(storedData));

    // push ke halaman result
    router.push("/caption/result");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">

        {/* Judul dan subtext */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Buat Caption Jualan</h1>
          <p className="text-gray-500 text-sm">
            Isi bentar, sisanya AI yang mikir.
          </p>
        </div>

        {/* Form input */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="nama"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500 transition"
            placeholder="Nama Usaha (contoh: Kopi Santai)"
            autoComplete="off"
            required
          />

          <input
            name="produk"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500 transition"
            placeholder="Produk (contoh: Kopi Susu Gula Aren)"
            autoComplete="off"
            required
          />

          <input
            name="target"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500 transition"
            placeholder="Target Pembeli (contoh: mahasiswa)"
            autoComplete="off"
            required
          />

          {/* tone caption */}
          <label className="text-sm font-semibold">Tone Tulisan</label>
          <select
            name="tone"
            className="border p-3 rounded w-full bg-white"
            defaultValue="genz"
          >
            <option value="genz">Santai Gen-Z</option>
            <option value="formal">Formal Bisnis</option>
            <option value="soft">Soft Selling</option>
            <option value="hard">Hard Selling</option>
            <option value="story">Storytelling</option>
          </select>

          {/* format output */}
          <label className="text-sm font-semibold">Format Output</label>
          <select
            name="format"
            className="border p-3 rounded w-full bg-white"
            defaultValue="instagram"
          >
            <option value="instagram">Caption Instagram</option>
            <option value="tiktok">Caption TikTok</option>
            <option value="reels">Script Reels / TikTok</option>
            <option value="product_desc">Deskripsi Produk</option>
            <option value="whatsapp">Caption WhatsApp Story</option>
          </select>

          {/* submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Sebentar..." : "Buat Caption"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs">
          Dengan klik lanjut, kamu lebih produktif hari ini.
        </p>
      </div>
    </div>
  );
}