"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    id: "caption",
    title: "Bikin Caption Cepat",
    desc: "Buat caption otomatis untuk Instagram, TikTok, atau WhatsApp.",
  },
  {
    id: "business",
    title: "Rencana Bisnis Praktis",
    desc: "Analisa usaha + strategi marketing singkat dan actionable.",
  },
  {
    id: "finance",
    title: "Cek Pinjaman UMKM",
    desc: "Simulasi cicilan, saran nominal wajar, dan tips keuangan.",
  },
];

export default function ChoosePage() {
  const router = useRouter();
  const [lastFeature, setLastFeature] = useState("");

  // cek apakah user sebelumnya udah pakai fitur
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kawanJualan");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      setLastFeature(parsed?.lastFeatureSelected || "");
    } catch {
      // silent fail
    }
  }, []);

  // simpan pilihan user dan redirect
  const handleSelect = (id: string) => {
    const existing = JSON.parse(localStorage.getItem("kawanJualan") || "{}");

    localStorage.setItem(
      "kawanJualan",
      JSON.stringify({
        ...existing,
        lastFeatureSelected: id,
        timestamp: new Date().toISOString(),
      })
    );

    router.push(`/${id}`);
  };

  return (
    <main className="min-h-screen p-6 max-w-xl mx-auto flex flex-col gap-8 select-none">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Pilih Fitur</h1>
        <p className="text-gray-600">
          Mau mulai dari yang mana? Bisa balik kapan aja.
        </p>
      </div>

      <div className="space-y-4">
        {FEATURES.map((feature) => (
          <button
            key={feature.id}
            onClick={() => handleSelect(feature.id)}
            className="w-full p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:bg-green-50 transition text-left active:scale-[0.98]"
          >
            <h2 className="font-semibold text-lg">{feature.title}</h2>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </button>
        ))}
      </div>

      {lastFeature && (
        <button
          onClick={() => router.push(`/${lastFeature}`)}
          className="mt-4 bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition active:scale-[0.97]"
        >
          Lanjutkan Fitur Terakhir
        </button>
      )}

      <div className="absolute -z-10 blur-3xl opacity-25 w-[300px] h-[300px] bg-green-400 rounded-full bottom-10 right-10" />
    </main>
  );
}