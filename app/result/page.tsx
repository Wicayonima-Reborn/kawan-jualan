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
        setOutput(json.result || "Tidak ada hasil");
      } catch (err) {
        setOutput("Error generating content.");
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, []);

  // Clean formatting
  const formatChunks = (text: string) => {
    return text
      .split(/\n\s*\n/)
      .filter((block) => block.trim() !== "")
      .map((block) => block
        .replace(/^\d+\)\s*/g, "")         // Remove "1), 2), 3)"
        .replace(/\*\*/g, "")              // Remove bold markdown
        .trim()
      );
  };

  const chunks = formatChunks(output);

  const handleCopySection = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(output);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Konten Siap Pakai 🎉</h1>
      <p className="text-gray-600">Copy caption di bawah atau generate ulang untuk variasi lain.</p>

      {loading ? (
        <p className="animate-pulse text-gray-600 mt-4">⏳ Sedang generate...</p>
      ) : (
        chunks.map((text, i) => {
          const [title, ...content] = text.split("\n");

          return (
            <div key={i} className="bg-gray-100 p-4 rounded shadow space-y-4">
              <p className="font-semibold text-lg capitalize">{title}</p>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                {content.join("\n")}
              </p>

              <button
                className={`px-4 py-2 rounded text-white transition-all duration-300 ${
                  copiedIndex === i
                    ? "bg-green-600 scale-105"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => handleCopySection(content.join("\n"), i)}
              >
                {copiedIndex === i ? "Disalin!" : "Copy Bagian Ini"}
              </button>
            </div>
          );
        })
      )}

      {!loading && (
        <div className="flex gap-4 pt-4">
          <button
            className={`px-4 py-3 rounded text-white transition-all duration-300 ${
              copiedAll ? "bg-green-600 scale-105" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleCopyAll}
          >
            {copiedAll ? "Semua sudah disalin!" : "Copy Semua"}
          </button>

          <button
            className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-all"
            onClick={() => window.location.reload()}
          >
            Generate Ulang
          </button>
        </div>
      )}
    </div>
  );
}