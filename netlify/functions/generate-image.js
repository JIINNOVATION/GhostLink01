import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts: [{ text: prompt }] },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (!imagePart?.inlineData?.data) {
      return new Response(JSON.stringify({ error: "No image data returned" }), { status: 502 });
    }

    const base64Image = imagePart.inlineData.data;
    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64Image}` }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("generate-image error:", err);
    return new Response(JSON.stringify({ error: "Image generation failed" }), { status: 500 });
  }
};
