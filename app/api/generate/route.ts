import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nama, produk, target, tone } = await req.json();

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

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KOLOSAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Qwen 3 30BA3B",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    console.log("RAW RESPONSE:", data);

    const result =
      data?.choices?.[0]?.message?.content ||
      data?.output_text ||
      data?.text ||
      JSON.stringify(data, null, 2);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}