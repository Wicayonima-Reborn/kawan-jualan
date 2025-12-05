"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { exportToDOC } from "@/src/utils/exportDOC";

export default function BusinessResult() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // ---------------------------------
  // Fetch AI Response on Page Load
  // ---------------------------------
  useEffect(() => {
    const storedData = localStorage.getItem("kawanJualan");

    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    async function fetchBusinessPlan() {
      setLoading(true);

      try {
        const response = await fetch("/api/business", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        });

        const result = await response.json();
        setOutput(result?.result || "");
      } catch {
        setOutput("⚠️ AI mengalami gangguan, coba ulang.");
      } finally {
        setLoading(false);
      }
    }

    fetchBusinessPlan();
  }, []);

  // ---------------------------------
  // Format AI Output
  // ---------------------------------
  const formattedSections = loading
    ? []
    : output
        .split("---") // split output by separator
        .map((section) => section.trim()) // remove whitespace
        .filter((section) => section.length > 5); // remove empty parts

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      
      <h1 className="text-3xl font-bold text-center">Rencana Bisnis 📄</h1>

      {/* ---------------------------------
         Loading Skeleton
      --------------------------------- */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((index) => (
            <div key={index} className="p-5 rounded-xl border bg-gray-200 shadow-sm">
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------
         Render Business Content
      --------------------------------- */}
      {!loading && (
        <div id="pdf-content" className="space-y-4">

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">KAWANJUALAN</h2>
            <p className="text-sm text-gray-500">Business Strategy AI Report</p>
            <hr className="my-4 border-gray-300" />
          </div>

          {/* Content Sections */}
          {formattedSections.map((businessText, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm"
            >
              <p className="whitespace-pre-wrap leading-relaxed">{businessText}</p>
            </div>
          ))}

          {/* Footer timestamp */}
          <hr className="my-4 border-gray-300" />
          <p className="text-center text-xs text-gray-400">
            Dibuat oleh AI · {new Date().toLocaleDateString("id-ID")}
          </p>
        </div>
      )}

      {/* ---------------------------------
         Action Buttons
      --------------------------------- */}
      {!loading && formattedSections.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 pt-4">

          {/* Copy All Button */}
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
            onClick={() => window.location.reload()}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Generate Ulang
          </button>

          {/* Export DOCX */}
          <button
            onClick={() => exportToDOC("BusinessPlan", formattedSections)}
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