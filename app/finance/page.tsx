"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function FinanceSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kawanJualan");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((key) => {
        const input = document.querySelector(`[name="${key}"]`) as HTMLInputElement;
        if (input) input.value = parsed[key];
      });
    }
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const data = {
      nominal: form.get("nominal"),
      tujuan: form.get("tujuan"),
      pendapatan: form.get("pendapatan"),
      tenor: form.get("tenor"),
      lastFeatureSelected: "finance",
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("kawanJualan", JSON.stringify(data));

    router.push("/finance/result");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Simulasi Pinjaman UMKM</h1>
          <p className="text-gray-500 text-sm">
            Bantu kamu cek pinjaman sehat atau berat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="nominal"
            required
            placeholder="Nominal pinjaman (contoh: 5000000)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="tujuan"
            required
            placeholder="Tujuan pinjaman (contoh: modal awal, beli alat, stok barang)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="pendapatan"
            required
            placeholder="Pendapatan bulanan (contoh: 3500000)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            name="tenor"
            required
            placeholder="Tenor utama (contoh: 6 bulan)"
            className="border p-3 rounded w-full focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg text-white transition ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Menghitung..." : "Buat Simulasi"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs">
          Data hanya tersimpan di perangkat kamu.
        </p>
      </div>
    </div>
  );
}