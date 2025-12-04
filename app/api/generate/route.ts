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
    Buat 3 caption untuk bisnis berikut:

    Nama bisnis: ${body.nama}
    Produk: ${body.produk}
    Audience: ${body.target}

    Tone: ${toneStyle[body.tone]}
    Format: ${formatStyle[body.format]}

    Output aturan:
    - Jangan beri judul atau pembuka.
    - Format: "1) ...", "2) ...", "3) ..."
    - Pisahkan antar caption dengan "---"
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