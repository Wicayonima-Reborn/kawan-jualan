import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

<<<<<<< HEAD
    if (!nama || !produk || !target || !tone) {
      return NextResponse.json(
        { success: false, error: "Semua input wajib diisi." },
        { status: 400 }
      );
    }

    if (!process.env.KOLOSAL_API_KEY) {
      throw new Error("Missing KOLOSAL_API_KEY");
    }
=======
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
>>>>>>> 576fd30 (feat(ui): redesigned setup onboarding form for cleaner UX)

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
    const timeout = setTimeout(() => controller.abort(), 20000); // safety

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.KOLOSAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
<<<<<<< HEAD
        model: "qwen/qwen3-vl-30b-a3b-instruct",
=======
        model: process.env.MODEL_NAME,
>>>>>>> 576fd30 (feat(ui): redesigned setup onboarding form for cleaner UX)
        messages: [{ role: "user", content: prompt }],
      }),
    });

<<<<<<< HEAD
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Kolosal API error: ${response.statusText}`);
    }

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content ||
      data?.output_text ||
      data?.text ||
      JSON.stringify(data, null, 2);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("API Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.name === "AbortError" ? 504 : 500 }
    );
=======
    const json = await response.json();
    return NextResponse.json({ result: json.choices?.[0]?.message?.content || "" });

  } catch (error) {
    return NextResponse.json({ error: "Terjadi error saat generate." }, { status: 500 });
>>>>>>> 576fd30 (feat(ui): redesigned setup onboarding form for cleaner UX)
  }
}