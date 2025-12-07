"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { exportToDOC } from "@/src/utils/exportDOC";

export default function FinanceResult() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [financeOutput, setFinanceOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // ambil hasil simulasi dari server
  const fetchFinancePlan = useCallback(async () => {
    const savedData = localStorage.getItem("kawanJualan");
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);
    setIsLoading(true);

    try {
      const response = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();
      setFinanceOutput(result?.result || "");
    } catch {
      setFinanceOutput(" AI sedang sibuk, coba generate ulang.");
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  }, []);

  // load saat halaman pertama muncul
  useEffect(() => {
    fetchFinancePlan();
  }, [fetchFinancePlan]);

  // pisah output AI jadi beberapa bagian
  const formattedSections = isLoading
    ? []
    : financeOutput
        .split("---")
        .map((section) => section.trim())
        .filter((section) => section.length > 5);

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      
      <h1 className="text-3xl font-bold text-center">Simulasi Keuangan 💰</h1>

      {/* skeleton loading */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="p-5 rounded-xl border bg-gray-200 shadow-sm"
            >
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* konten hasil simulasi */}
      {!isLoading &&
        formattedSections.map((text, index) => (
          <div
            key={index}
            className="bg-white border p-5 rounded-xl shadow-sm space-y-4"
          >
            <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
          </div>
        ))}

      {/* action button */}
      {!isLoading && formattedSections.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 pt-4">

          <button
            onClick={() => {
              navigator.clipboard.writeText(financeOutput);
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
            onClick={() => {
              setIsRegenerating(true);
              fetchFinancePlan();
            }}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            {isRegenerating ? "🔄 Generating..." : "🔁 Generate Ulang"}
          </button>

          <button
            onClick={() => exportToDOC("FinanceReport", formattedSections)}
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