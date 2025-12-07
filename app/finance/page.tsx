"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function FinanceSetup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // auto isi form kalau user pernah pakai fitur ini sebelumnya
  useEffect(() => {
    const savedData = localStorage.getItem("kawanJualan");
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);

    Object.keys(parsedData).forEach((key) => {
      const input = document.querySelector(
        `[name="${key}"]`
      ) as HTMLInputElement;

      if (input) input.value = parsedData[key];
    });
  }, []);

  // submit form
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const storedData = {
      nominal: formData.get("nominal"),
      tujuan: formData.get("tujuan"),
      pendapatan: formData.get("pendapatan"),
      tenor: formData.get("tenor"),
      lastFeatureSelected: "finance",
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("kawanJualan", JSON.stringify(storedData));

    router.push("/finance/result");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Simulasi Pinjaman UMKM</h1>
          <p className="text-gray-500 text-sm">
            Cek apakah pinjaman kamu aman atau terlalu berat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="nominal"
            required
            placeholder="Nominal pinjaman (contoh: 5000000)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <input
            name="tujuan"
            required
            placeholder="Tujuan pinjaman (contoh: modal, alat, stok barang)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <input
            name="pendapatan"
            required
            placeholder="Pendapatan bulanan (contoh: 3500000)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
            autoComplete="off"
          />

          <input
            name="tenor"
            required
            placeholder="Tenor utama (contoh: 6 bulan)"
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
            {isLoading ? "Menghitung..." : "Buat Simulasi"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs">
          Data hanya tersimpan di perangkat kamu.
        </p>
      </div>
    </div>
  );
}