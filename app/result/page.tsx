"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("businessData");
    if (!saved) return;

    const data = JSON.parse(saved);

    async function generate() {
      setLoading(true);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json = await res.json();
        setOutput(json.result);
      } catch {
        setOutput("❌ Error! AI lagi ngopi, coba ulang.");
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, []);

  const formatChunks = (text: string) => {
    if (!text) return [];

    const cleaned = text.replace(/---/g, "").trim();
    const parts = cleaned.split(/(?=\d\))/g);

    return parts
      .map((p) => p.replace(/^\d\)\s*/g, "").trim())
      .filter((x) => x.length > 10);
  };

  const chunks = formatChunks(output);

  // Sort shortest → longest
  const sorted = chunks
    .map((text) => ({ text, length: text.length }))
    .sort((a, b) => a.length - b.length);

  const labels = ["Caption Pendek", "Caption Medium", "Caption Soft Selling"];

  const handleCopySection = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(sorted.map((s) => s.text).join("\n\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Konten Siap Pakai 🎉</h1>
      <p className="text-gray-600 text-center">
        Copy caption atau regenerate kalau kurang cocok.
      </p>

      {loading ? (
        <p className="text-center animate-pulse text-gray-600 mt-4">
          ⏳ AI lagi mikir...
        </p>
      ) : (
        sorted.map((item, i) => (
          <div key={i} className="bg-white border p-5 rounded-xl shadow space-y-4">
            <p className="font-semibold text-gray-600 text-sm">{labels[i]}</p>
            <p className="whitespace-pre-wrap">{item.text}</p>

            <button
              onClick={() => handleCopySection(item.text, i)}
              className={`w-full py-2 rounded-lg text-white transition ${
                copiedIndex === i ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {copiedIndex === i ? "✓ Disalin!" : "Copy Bagian Ini"}
            </button>
          </div>
        ))
      )}

      {!loading && sorted.length > 0 && (
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleCopyAll}
            className={`px-5 py-3 rounded-lg text-white ${
              copiedAll ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {copiedAll ? "✓ Semua Dicopy" : "Copy Semua"}
          </button>

          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            Generate Ulang
          </button>
        </div>
      )}
    </div>
  );
}
