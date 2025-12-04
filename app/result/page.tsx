"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("businessData");
    if (!saved) return;

    const data = JSON.parse(saved);

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => setOutput(data.result || ""))
      .finally(() => setLoading(false));
  }, []);

  const cleanSections = (output: string) => {
    return output
      .split("---")
      .map(v => v.trim())
      .filter(v => v.match(/^\d+\)/)); // hanya yang diawali angka 1), 2), 3)
  };

  const sections = cleanSections(output);

  const copyOne = async (txt: string, i: number) => {
    await navigator.clipboard.writeText(txt);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 1100);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(sections.join("\n\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1100);
  };

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Konten Siap Pakai 🎉</h1>
      <p className="text-gray-600 mb-6">Copy caption di bawah atau generate ulang.</p>

      {loading ? (
        <p className="animate-pulse">⏳ Menghasilkan konten...</p>
      ) : (
        sections.map((txt, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded mb-6 shadow space-y-3">
            <p className="whitespace-pre-wrap text-gray-800">{txt.replace(/^\d+\)\s*/, "")}</p>

            <button
              className={`px-4 py-2 text-white rounded transition ${
                copiedIndex === i ? "bg-green-600 scale-105" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => copyOne(txt.replace(/^\d+\)\s*/, ""), i)}
            >
              {copiedIndex === i ? "Disalin!" : "Copy Bagian Ini"}
            </button>
          </div>
        ))
      )}

      {!loading && (
        <div className="flex gap-4">
          <button
            className={`px-4 py-3 text-white rounded ${
              copiedAll ? "bg-green-600 scale-105" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={copyAll}
          >
            {copiedAll ? "Semua Disalin!" : "Copy Semua"}
          </button>

          <button
            className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Generate Ulang
          </button>
        </div>
      )}
    </div>
  );
}
