"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BusinessSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kawanJualan");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((key) => {
        const input = document.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLSelectElement;
        if (input) input.value = parsed[key];
      });
    }
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const data = {
      nama: form.get("nama"),
      produk: form.get("produk"),
      target: form.get("target"),
      budget: form.get("budget"),
      lokasi: form.get("lokasi"),
      lastFeatureSelected: "business",
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("kawanJualan", JSON.stringify(data));

    router.push("/business/result");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Rencana Bisnis UMKM</h1>
          <p className="text-gray-500 text-sm">
            Isi data singkat — AI bantu susun strategi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="nama"
            required
            placeholder="Nama usaha (contoh: Kopi Merakyat)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="produk"
            required
            placeholder="Produk/Jasa (contoh: es kopi susu gula aren)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="target"
            required
            placeholder="Target pembeli (contoh: karyawan, mahasiswa, ibu rumah tangga)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="budget"
            placeholder="Budget awal (opsional)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="lokasi"
            placeholder="Lokasi usaha (opsional)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg text-white transition ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Generating..." : "Buat Rencana"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs">
          Tanpa ribet, tanpa teori panjang.
        </p>

      </div>
    </div>
  );
}