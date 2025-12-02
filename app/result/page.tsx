"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<null | number | "all">(null);

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

  const blocks = output ? output.split(/\n\s*\n/) : [];

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-8">
      
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Konten Siap Pakai 🎉</h1>
        {!loading && (
          <p className="text-gray-500">
            Copy caption di bawah atau generate ulang untuk variasi lain.
          </p>
        )}
      </header>

      {loading ? (
        <p className="animate-pulse text-gray-600">Sedang generate...</p>
      ) : (
        <div className="space-y-6">
          {blocks.map((block, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="text-gray-800 whitespace-pre-wrap">{block.trim()}</p>

              <button
                className={`mt-3 px-3 py-2 text-sm rounded transition ${
                  copied === index
                    ? "bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                onClick={() => {
                  navigator.clipboard.writeText(block.trim());
                  setCopied(index);
                  setTimeout(() => setCopied(null), 2000);
                }}
              >
                {copied === index ? "✔ Tersalin" : "Copy Bagian Ini"}
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(output);
              setCopied("all");
              setTimeout(() => setCopied(null), 2000);
            }}
            className={`px-4 py-3 rounded transition ${
              copied === "all"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {copied === "all" ? "Semua Disalin" : "Copy Semua"}
          </button>

          <button
            className="px-4 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition"
            onClick={() => window.location.reload()}
          >
            Generate Ulang
          </button>
        </div>
      )}
    </div>
  );
}