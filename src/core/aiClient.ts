export async function runAI(prompt: string) {
  // cek API key
  if (!process.env.KOLOSAL_API_KEY) {
    throw new Error("Missing Kolosal API Key");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  // request ke API Kolosal
  const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
    method: "POST",
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${process.env.KOLOSAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Kolosal Error: ${response.status} - ${errorDetails}`);
  }

  const result = await response.json();
  return result?.choices?.[0]?.message?.content || "";
}