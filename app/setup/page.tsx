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
    }, 500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Isi Data Bisnis</h1>
          <p className="text-gray-500 text-sm">
            Cuma 30 detik, AI bantu sisanya.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nama"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Nama usaha (ex: Kopi Santai)"
            required
          />

          <input
            name="produk"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Produk/jasa (ex: es kopi susu)"
            required
          />

          <input
            name="target"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Target audience (ex: mahasiswa)"
            required
          />

          <label className="text-sm font-semibold">Tone Tulisan</label>
          <select name="tone" className="border p-3 rounded w-full" defaultValue="genz">
            <option value="genz">Santai Gen-Z</option>
            <option value="formal">Formal Bisnis</option>
            <option value="soft">Soft Selling</option>
            <option value="hard">Hard Selling</option>
            <option value="story">Storytelling</option>
          </select>

          <label className="text-sm font-semibold">Format Output</label>
          <select
            name="format"
            className="border p-3 rounded w-full"
            defaultValue="instagram"
          >
            <option value="instagram">Caption Instagram</option>
            <option value="tiktok">Caption TikTok</option>
            <option value="reels">Script Reels/TikTok</option>
            <option value="product_desc">Deskripsi Produk</option>
            <option value="whatsapp">Caption WA Story</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg text-lg font-semibold text-white transition ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Membuat Konten..." : "Generate Konten"}
          </button>
        </form>
      </div>
    </div>
  );
}