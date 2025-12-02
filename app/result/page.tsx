"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Hasil Konten</h1>

      {loading ? (
        <p className="animate-pulse text-gray-600">Sedang generate...</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-gray-800">
          {output}
        </pre>
      )}

      <div className="flex gap-4">
        {!loading && (
          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded ${
              copied
                ? "bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } transition`}
          >
            {copied ? "Tersalin!" : "Copy"}
          </button>
        )}

        <button
          className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition"
          onClick={() => window.location.reload()}
        >
          Generate Ulang
        </button>
      </div>
    </div>
  );
}