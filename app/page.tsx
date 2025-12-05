"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6 text-center select-none relative">
      
      <div className="space-y-6 max-w-lg">

        {/* Logo */}
        <h1 className="text-5xl font-bold tracking-tight">
          Kawan<span className="text-green-600">Jualan</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg leading-relaxed">
          Bantu UMKM bikin caption, strategi bisnis, dan simulasi keuangan
          otomatis. Cukup isi data, sisanya biar AI kerjain.
        </p>

        {/* Main CTA */}
        <button
          className="bg-green-600 hover:bg-green-700 active:scale-[0.97] transition rounded-xl px-6 py-3 text-lg font-semibold text-white w-full max-w-xs mx-auto shadow-md"
          onClick={() => router.push("/choose")}
        >
          Mulai Sekarang
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm pt-4">
          Gratis & tanpa login.
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute -z-10 top-10 blur-3xl opacity-20 w-[400px] h-[400px] bg-green-400 rounded-full" />
    </main>
  );
}