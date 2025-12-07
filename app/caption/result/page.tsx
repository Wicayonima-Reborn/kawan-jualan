"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { exportToDOC } from "@/src/utils/exportDOC";

export default function CaptionResult() {
  const router = useRouter();

  // state UI
  const [isLoading, setIsLoading] = useState(true);
  const [captionResult, setCaptionResult] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isCopiedAll, setIsCopiedAll] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // ambil hasil caption dari API
  const fetchCaptions = useCallback(async () => {
    const savedData = localStorage.getItem("kawanJualan");
    if (!savedData) return;

    setIsLoading(true);
    const parsedData = JSON.parse(savedData);

    try {
      const response = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const apiResult = await response.json();
      setCaptionResult(apiResult?.result || "");
    } catch {
      setCaptionResult(" AI tidak merespons, Coba generate ulang.");
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  }, []);

  // jalan waktu halaman kebuka
  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  // format hasil AI biar clean
  const formattedCaptions = isLoading
    ? []
    : captionResult
        .split("---")
        .map((text) => text.trim())
        .filter((text) => text.length > 5);

  const captionLabels = [
    "Caption Pendek",
    "Caption Medium",
    "Caption Soft Selling",
  ];

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6 pt-10">
      
      <h1 className="text-3xl font-bold text-center">Caption Siap Pakai 🎉</h1>

      {/* loading skeleton */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 rounded-xl border bg-gray-200 shadow-sm">
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-4/5 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-2/3 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* hasil caption */}
      {!isLoading &&
        formattedCaptions.map((captionText, index) => (
          <div
            key={index}
            className="bg-white border p-5 rounded-xl shadow-sm space-y-3"
          >
            <p className="font-semibold text-gray-600 text-sm">
              {captionLabels[index] || `Hasil ${index + 1}`}
            </p>

            <p className="whitespace-pre-wrap text-lg">
              {captionText}
            </p>

            {/* copy per item */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(captionText);
                setCopiedIndex(index);
                setTimeout(() => setCopiedIndex(null), 1200);
              }}
              className={`w-full py-2 rounded-xl text-white font-semibold transition ${
                copiedIndex === index ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {copiedIndex === index ? "✓ Disalin" : "Copy"}
            </button>
          </div>
        ))}

      {/* aksi footer */}
      {!isLoading && formattedCaptions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 pt-4">

          {/* copy semua */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(formattedCaptions.join("\n\n"));
              setIsCopiedAll(true);
              setTimeout(() => setIsCopiedAll(false), 1300);
            }}
            className={`px-5 py-3 rounded-xl text-white transition ${
              isCopiedAll ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isCopiedAll ? "✓ Semua Disalin" : "Copy Semua"}
          </button>

          {/* regenerate */}
          <button
            onClick={() => {
              setIsRegenerating(true);
              fetchCaptions();
            }}
            className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
          >
            {isRegenerating ? "🔄 Generating..." : "🔁 Generate Ulang"}
          </button>

          {/* export docx */}
          <button
            onClick={() => exportToDOC("Caption_Jualan", formattedCaptions)}
            className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
          >
            Export DOCX
          </button>

          {/* back */}
          <button
            onClick={() => router.push("/choose")}
            className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
}