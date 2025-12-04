import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nama, produk, target, tone, format } = await req.json();

    if (!process.env.KOLOSAL_API_KEY) {
      throw new Error("Missing KOLOSAL_API_KEY");
    }

    const toneStyle: any = {
      genz: "Santai, gaul, playful, dan relatable gaya Gen-Z.",
      formal: "Profesional, rapi, dan nada bisnis.",
      soft: "Soft selling, hangat, dan mengajak.",
      hard: "Hard selling, kuat CTA, urgensi tinggi.",
      story: "Storytelling natural seperti cerita pengalaman."
    };

    const formatStyle: any = {
      instagram: "Format caption Instagram dengan paragraf pendek.",
      tiktok: "Caption pendek catchy untuk TikTok.",
      reels: "Format script reels 15-30 detik.",
      product_desc: "Deskripsi produk marketplace.",
      whatsapp: "Singkat, to the point, mudah dicopy."
    };

    const prompt = `
Buat 3 caption marketing untuk bisnis berikut:

Nama Usaha: ${nama}
Produk: ${produk}
Target Pembeli: ${target}

Tone tulisan: ${toneStyle[tone]}
Format output: ${formatStyle[format]}

FORMAT WAJIB OUTPUT:
1) Caption pendek (maksimal 2 kalimat)
---
2) Caption medium (3–5 kalimat)
---
3) Caption soft selling (lebih emosional, ajak pembaca)

PERATURAN:
- Jangan tulis pembuka/penutup.
- Jangan beri catatan tambahan.
    `.trim();

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KOLOSAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME || "Qwen 3 30BA3B",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const result =
      data?.choices?.[0]?.message?.content || data?.text || "Tidak ada output.";

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}