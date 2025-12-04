"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6 text-center select-none">
      
      <div className="space-y-6 max-w-lg">
        
        {/* LOGO / BRAND */}
        <h1 className="text-5xl font-bold tracking-tight">
          Kawan<span className="text-green-600">Jualan</span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-600 text-lg leading-relaxed">
          Bantu UMKM bikin konten marketing otomatis.
          Cukup isi data bisnis, sisanya biarkan AI yang kerjain.
        </p>

        {/* CTA BUTTON */}
        <button
          className="bg-green-600 hover:bg-green-700 active:scale-[0.97] transition rounded-xl px-6 py-3 text-lg font-semibold text-white w-full max-w-xs mx-auto shadow-md"
          onClick={() => router.push("/setup")}
        >
          Mulai Sekarang
        </button>

        {/* FOOTER MINI */}
        <p className="text-gray-400 text-sm pt-4">
          Gratis & tanpa login.
        </p>
      </div>

      {/* Decorative blob */}
      <div className="absolute -z-10 top-10 blur-3xl opacity-20 w-[400px] h-[400px] bg-green-400 rounded-full" />
    </main>
  );
}