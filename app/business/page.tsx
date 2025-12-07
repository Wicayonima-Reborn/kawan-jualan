"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BusinessSetup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // load data lama kalau user pernah isi
  useEffect(() => {
    const savedData = localStorage.getItem("kawanJualan");
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);

    Object.keys(parsedData).forEach((key) => {
      const input = document.querySelector(
        `[name="${key}"]`
      ) as HTMLInputElement | HTMLSelectElement;

      if (input) input.value = parsedData[key];
    });
  }, []);

  // submit form
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const storedData = {
      nama: formData.get("nama"),
      produk: formData.get("produk"),
      target: formData.get("target"),
      budget: formData.get("budget"),
      lokasi: formData.get("lokasi"),
      lastFeatureSelected: "business",
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("kawanJualan", JSON.stringify(storedData));

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
            autoComplete="off"
          />

          <input
            name="produk"
            required
            placeholder="Produk/Jasa (contoh: es kopi susu gula aren)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <input
            name="target"
            required
            placeholder="Target pembeli (contoh: mahasiswa, pekerja)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <input
            name="budget"
            placeholder="Budget awal (opsional)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <input
            name="lokasi"
            placeholder="Lokasi usaha (opsional)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-lg text-white transition ${
              isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Generating..." : "Buat Rencana"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs">
          Tanpa ribet, tanpa teori panjang.
        </p>

      </div>
    </div>
  );
}