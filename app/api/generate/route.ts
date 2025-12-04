import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const toneStyle: any = {
      genz: "Gunakan gaya santai Gen-Z, playful, simple, sedikit slang tapi tetap sopan.",
      formal: "Gunakan bahasa formal profesional seperti brand besar.",
      soft: "Gunakan tone soft selling, hangat, persuasi halus, tidak agresif.",
      hard: "Gunakan hard selling, langsung ke CTA, singkat, urgent.",
      story: "Gunakan storytelling dengan alur personal seperti cerita pengalaman."
    };

    const formatStyle: any = {
      instagram: "Format caption Instagram rapi dengan baris baru.",
      tiktok: "Format pendek dan punchy seperti caption TikTok viral.",
      reels: "Format script video pendek seperti Reels/TikTok berdurasi 15-30 detik.",
      product_desc: "Format seperti deskripsi produk marketplace.",
      whatsapp: "Pendek, simple, dan CTA jelas seperti caption WA Story."
    };

    if (!process.env.KOLOSAL_API_KEY) {
      throw new Error("Missing KOLOSAL_API_KEY");
    }

    const prompt = `
Buat 3 caption marketing untuk bisnis berikut dengan kualitas copywriting profesional:

Nama bisnis: ${body.nama}
Produk: ${body.produk}
Target pembeli: ${body.target}

Tone: ${toneStyle[body.tone]}
Format konten: ${formatStyle[body.format]}

Brand personality wajib:
- Human, friendly, dan relevan dengan anak muda
- Bukan AI tone, bukan robotik
- Hindari bahasa terlalu kaku atau terlalu banyak kata sifat

Peraturan caption:

1) Caption Pendek (8–15 kata)
- Punchy, cepat, catchy.
- Harus mengandung satu value kuat (contoh: rasa, suasana, urgency, lifestyle)
- Maksimal 1 emoji, tidak wajib.

2) Caption Medium (18–35 kata)
- Sedikit lebih bercerita, tapi tetap straight to the point.
- Kombinasikan benefit + situasi relatable + mini CTA.
- Maksimal 2 emoji natural (boleh tanpa emoji).

3) Caption Soft Selling (35–60 kata)
- Emotional tone, seolah ngobrol sama pelanggan.
- Harus memiliki alur singkat: situasi → rasa/experience → CTA halus
- Tidak boleh hard selling.

Format output WAJIB seperti ini:

1) <caption pendek>
---
2) <caption medium>
---
3) <caption soft selling>

Larangan:
- Jangan tulis judul seperti "caption pendek", "caption 1", dll.
- Jangan memberi pembuka atau penutup seperti “Berikut ini…”, “Semoga membantu…”
- Hindari repetisi kata yang sama dalam 3 caption.
`.trim();


    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KOLOSAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.MODEL_NAME,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Kolosal API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "Output kosong.";

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("API Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.name === "AbortError" ? 504 : 500 }
    );
  }
}