import { NextResponse } from "next/server";
import { runAI } from "@/src/core/aiClient";
import { generatePrompt } from "@/src/core/promptEngine";

export async function POST(req: Request) {
  try {
    const userInput = await req.json();

    const prompt = generatePrompt("business", userInput);

    // request ke model AI
    const result = await runAI(prompt);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("BUSINESS API ERROR:", err?.message);
    return NextResponse.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}