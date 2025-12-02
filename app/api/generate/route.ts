import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nama, produk, target, tone } = await req.json();

    if (!nama || !produk || !target || !tone) {
      return NextResponse.json(
        { success: false, error: "Semua input wajib diisi." },
        { status: 400 }
      );
    }

    if (!process.env.KOLOSAL_API_KEY) {
      throw new Error("Missing KOLOSAL_API_KEY");
    }

    const prompt = `
Buat 3 contoh caption marketing untuk bisnis berikut:

Nama Usaha: ${nama}
Produk: ${produk}
Target Pembeli: ${target}
Gaya Konten: ${tone}

Format output:
1) Caption pendek
2) Caption medium
3) Caption soft selling
`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // safety

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KOLOSAL_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "qwen/qwen3-vl-30b-a3b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

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
  }
}