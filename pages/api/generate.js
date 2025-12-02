export default async function handler(req, res) {
  try {
    const { model, messages } = req.body;

    const response = await fetch("https://api.kolosal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.KOLOSAL_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7
      })
    });

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: "Error connecting to Kolosal API" });
  }
}