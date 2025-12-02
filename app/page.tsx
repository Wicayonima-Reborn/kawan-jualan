"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">KawanJualan</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Bantu UMKM bikin konten marketing otomatis hanya dengan isi data bisnis kamu.
      </p>

      <button
        onClick={() => router.push("/setup")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg"
      >
        Mulai
      </button>
    </main>
  );
}