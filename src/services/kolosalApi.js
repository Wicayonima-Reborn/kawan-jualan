export async function runAI(model, messages) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages })
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "No response.";
}