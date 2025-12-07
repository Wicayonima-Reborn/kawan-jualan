import { NextResponse } from "next/server";
import { runAI } from "@/src/core/aiClient";
import { generatePrompt } from "@/src/core/promptEngine";

export async function POST(req: Request) {
  try {
    const userInput = await req.json();

    const prompt = generatePrompt("finance", userInput);

    // request ke AI model
    const result = await runAI(prompt);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("FINANCE API ERROR:", err?.message);
    return NextResponse.json(
      { success: false, error: err?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}