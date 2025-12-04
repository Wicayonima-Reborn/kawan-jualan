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

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.KOLOSAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const json = await response.json();
    return NextResponse.json({ result: json.choices?.[0]?.message?.content || "" });

  } catch (error) {
    return NextResponse.json({ error: "Terjadi error saat generate." }, { status: 500 });
  }
}