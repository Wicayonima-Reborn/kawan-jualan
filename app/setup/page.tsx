"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Setup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    const data = {
      nama: formData.get("nama"),
      produk: formData.get("produk"),
      target: formData.get("target"),
      tone: formData.get("tone"),
      format: formData.get("format"),
    };

    localStorage.setItem("businessData", JSON.stringify(data));

    setTimeout(() => {
      router.push("/result");
    }, 600);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      
      <div className="w-full max-w-md space-y-6">
        
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Isi Data Bisnismu</h1>
          <p className="text-gray-500 text-sm">
            Santai, cuma 30 detik. Setelah ini AI bantu sisanya.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            name="nama"
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Nama Usaha (contoh: Kopi Santai)"
            required
          />

          <input
            name="produk"
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Produk / jasa (contoh: Es kopi susu gula aren)"
            required
          />

          <input
            name="target"
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Target Audience (contoh: mahasiswa dan pekerja)"
            required
          />

          {/* Tone Selector */}
          <label className="block font-semibold text-sm text-gray-700 mt-2">Tone Tulisan</label>
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

          {/* Format Selector */}
          <label className="block font-semibold text-sm text-gray-700">Format Output</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg text-lg font-semibold text-white transition ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Menghasilkan..." : "Buat Konten"}
          </button>
        </form>

        {/* Helper Text */}
        <p className="text-center text-gray-400 text-xs">
          Dengan klik lanjut, kamu setuju bahwa kamu makin produktif.
        </p>

      </div>
    </div>
  );
}