import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { question, context: dossierContext, locationName } = await req.json();
    if (!question || !dossierContext || !locationName) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const systemInstruction = `You are an AI Historian specializing in the location: '${locationName}'. Your role is to answer user questions and prioritize the provided context.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `CONTEXT FOR '${locationName}':\n---\n${dossierContext}\n---\nUSER QUESTION: ${question}`,
      config: {
        systemInstruction,
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || response.candidates?.[0]?.content?.text || "";
    const citations = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    for (const chunk of chunks) {
      if (chunk.web) citations.push({ uri: chunk.web.uri, title: chunk.web.title || chunk.web.uri });
    }

    return new Response(
      JSON.stringify({ text, citations }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("ask-historian error:", err);
    return new Response(JSON.stringify({ error: "Historian query failed" }), { status: 500 });
  }
};
