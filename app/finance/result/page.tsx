"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { exportToDOC } from "@/src/utils/exportDOC";

export default function FinanceResult() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // ---------------------------------
  // Function: Fetch Financial Report
  // ---------------------------------
  const fetchFinancePlan = useCallback(async () => {
    const storedData = localStorage.getItem("kawanJualan");
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);
    setLoading(true);

    try {
      const response = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();
      setOutput(result?.result || "");
    } catch {
      setOutput("⚠️ AI sedang sibuk, coba generate ulang.");
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  }, []);

  // Run on first load
  useEffect(() => {
    fetchFinancePlan();
  }, [fetchFinancePlan]);

  // ---------------------------------
  // Format Output into Sections
  // ---------------------------------
  const formattedSections = loading
    ? []
    : output
        .split("---")
        .map((section) => section.trim())
        .filter((section) => section.length > 5);

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      
      <h1 className="text-3xl font-bold text-center">Simulasi Keuangan 💰</h1>

      {/* ---------------------------------
          Skeleton Loading
      --------------------------------- */}
      {loading && (
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

      {/* ---------------------------------
          AI Output Content
      --------------------------------- */}
      {!loading &&
        formattedSections.map((financeText, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4"
          >
            <p className="whitespace-pre-wrap leading-relaxed">{financeText}</p>
          </div>
        ))}

      {/* ---------------------------------
          Action Buttons
      --------------------------------- */}
      {!loading && formattedSections.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 pt-4">

          {/* Copy All */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className={`px-5 py-3 rounded-lg text-white transition ${
              copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {copied ? "✓ Disalin" : "Copy Semua"}
          </button>

          {/* Regenerate */}
          <button
            onClick={() => {
              setRegenerating(true);
              fetchFinancePlan();
            }}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            {regenerating ? "🔄 Generating..." : "🔁 Generate Ulang"}
          </button>

          {/* Export DOCX */}
          <button
            onClick={() => exportToDOC("FinanceReport", formattedSections)}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Export DOCX
          </button>

          {/* Back */}
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