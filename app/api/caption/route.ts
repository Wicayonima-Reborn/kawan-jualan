import { NextResponse } from "next/server";
import { generatePrompt } from "@/src/core/promptEngine";
import { runAI } from "@/src/core/aiClient";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const prompt = generatePrompt("caption", data);
    const result = await runAI(prompt);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("API ERROR:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}