import { NextResponse } from "next/server";

// Fonction qui envoie la question à OpenAI et récupère la réponse
async function askAI(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_OPENAI}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || "Je ne sais pas.";
}

// API Route : reçoit une question du front-end, interroge l'IA puis renvoie la réponse
export async function POST(req) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json(
        { error: "Aucune question fournie" },
        { status: 400 }
      );
    }

    const aiResponse = await askAI(
      `Cette plante est-elle toxique pour les chats ? ${query}`
    );
    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
