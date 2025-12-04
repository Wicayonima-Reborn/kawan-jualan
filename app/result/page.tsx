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

  // CLEANER PARSER (only extract 1., 2., 3. style captions — remove intro/footer)
  const formatChunks = (text: string) => {
    if (!text) return [];

    const cleaned = text
      .replace(/(\d+)\)/g, "$1.") // 1) -> 1.
      .replace(/\-\-\-/g, "") // remove ---
      .trim();

    // Pecah berdasarkan angka diawal
    const rawParts = cleaned.split(/(?=\d+\.\s)/g);

    // Ambil yang valid (mulai angka diawal)
    let captions = rawParts.filter((p) => /^\d+\./.test(p.trim()));

    // **Jika tidak ditemukan format angka, fallback: pecah per paragraf**
    if (captions.length === 0) {
      captions = cleaned
        .split(/\n\s*\n/)
        .filter((line) => line.trim().length > 20); // hindari noise pendek
    }

    // Cleanup footer pada caption terakhir (jika ada)
    if (captions.length > 0) {
      const last = captions[captions.length - 1]
        .split("\n")
        .filter((line) => {
          const l = line.toLowerCase();
          return (
            !l.includes("semua caption") &&
            !l.includes("bisa disesuaikan") &&
            !l.includes("instagram") &&
            !l.includes("facebook") &&
            !l.includes("tiktok") &&
            line.trim() !== ""
          );
        })
        .join("\n");

      captions[captions.length - 1] = last;
    }

    // Final format: hapus angka dan markdown
    return captions.map((c) =>
      c
        .replace(/^\d+\.\s*/g, "") // buang angka
        .replace(/\*\*/g, "") // buang bold markdown
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
    await navigator.clipboard.writeText(chunks.join("\n\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Konten Siap Pakai 🎉</h1>
      <p className="text-gray-600">Copy caption di bawah atau generate ulang untuk variasi lain.</p>

      {loading ? (
        <p className="animate-pulse text-gray-600 mt-4 text-lg">⏳ Sedang generate...</p>
      ) : chunks.length === 0 ? (
        <p className="text-gray-500 italic">Tidak ada konten yang dapat diproses.</p>
      ) : (
        chunks.map((text, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded shadow space-y-4">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{text}</p>

            <button
              className={`px-4 py-2 rounded text-white transition-all duration-300 ${
                copiedIndex === i
                  ? "bg-green-600 scale-105"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => handleCopySection(text, i)}
            >
              {copiedIndex === i ? "✓ Disalin!" : "Copy Bagian Ini"}
            </button>
          </div>
        ))
      )}

      {!loading && chunks.length > 0 && (
        <div className="flex gap-4 pt-4">
          <button
            className={`px-4 py-3 rounded text-white transition-all duration-300 ${
              copiedAll ? "bg-green-600 scale-105" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleCopyAll}
          >
            {copiedAll ? "✓ Semua Disalin!" : "Copy Semua"}
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