"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { exportToDOC } from "@/src/utils/exportDOC";

export default function BusinessResult() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [businessOutput, setBusinessOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // fetch hasil dari API pas halaman dibuka
  useEffect(() => {
    const savedData = localStorage.getItem("kawanJualan");
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);

    async function fetchBusinessPlan() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/business", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        });

        const result = await response.json();
        setBusinessOutput(result?.result || "");
      } catch {
        setBusinessOutput(" AI mengalami gangguan, coba generate ulang.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBusinessPlan();
  }, []);

  // format teks AI jadi beberapa bagian
  const formattedSections = isLoading
    ? []
    : businessOutput
        .split("---")
        .map((section) => section.trim())
        .filter((section) => section.length > 5);

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      
      <h1 className="text-3xl font-bold text-center">Rencana Bisnis 📄</h1>

      {/* loading skeleton */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((index) => (
            <div key={index} className="p-5 rounded-xl border bg-gray-200 shadow-sm">
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-4/6 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* hasil AI */}
      {!isLoading && (
        <div className="space-y-4">
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">KAWANJUALAN</h2>
            <p className="text-sm text-gray-500">Business Strategy AI Report</p>
            <hr className="my-4 border-gray-300" />
          </div>

          {formattedSections.map((sec, i) => (
            <div key={i} className="bg-white border p-5 rounded-xl shadow-sm">
              <p className="whitespace-pre-wrap leading-relaxed">{sec}</p>
            </div>
          ))}

          <hr className="my-4 border-gray-300" />
          <p className="text-center text-xs text-gray-400">
            Dibuat oleh AI · {new Date().toLocaleDateString("id-ID")}
          </p>
        </div>
      )}

      {/* tombol aksi */}
      {!isLoading && formattedSections.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 pt-4">

          <button
            onClick={() => {
              navigator.clipboard.writeText(businessOutput);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className={`px-5 py-3 rounded-lg text-white transition ${
              copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {copied ? "✓ Disalin" : "Copy Semua"}
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Generate Ulang
          </button>

          <button
            onClick={() => exportToDOC("BusinessPlan", formattedSections)}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Export DOCX
          </button>

          <button
            onClick={() => router.push("/choose")}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
}