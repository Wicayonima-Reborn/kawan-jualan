"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    produk: "",
    target: "",
    tone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    localStorage.setItem("businessData", JSON.stringify(form));
    router.push("/result");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 max-w-lg mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Data Bisnis</h1>
        <p className="text-gray-500 mt-2">
          Isi data singkat agar sistem bisa membuat konten otomatis.
        </p>
      </div>

      <div className="space-y-4">
        <input
          name="nama"
          placeholder="Nama usaha"
          className="border p-3 rounded w-full"
          autoComplete="off"
          onChange={handleChange}
        />

        <input
          name="produk"
          placeholder="Produk utama"
          className="border p-3 rounded w-full"
          autoComplete="off"
          onChange={handleChange}
        />

        <input
          name="target"
          placeholder="Target pembeli (contoh: pelajar, ibu rumah tangga)"
          className="border p-3 rounded w-full"
          autoComplete="off"
          onChange={handleChange}
        />

        <select
          name="tone"
          className="border p-3 rounded w-full"
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>Pilih gaya komunikasi</option>
          <option value="Friendly">Friendly</option>
          <option value="Gen-Z">Gen-Z</option>
          <option value="Formal">Formal</option>
          <option value="Soft Selling">Soft Selling</option>
        </select>

        <button
          onClick={handleNext}
          className="bg-green-600 text-white font-semibold w-full p-3 rounded hover:bg-green-700 transition"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}