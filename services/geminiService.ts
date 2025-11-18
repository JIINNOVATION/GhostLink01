
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and should not appear in production
  console.warn("API_KEY is not set. AI Historian will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askHistorian = async (question: string, context: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("The AI Historian is currently offline. Please try again later.");
  }

  const model = "gemini-2.5-pro";
  const systemInstruction = `You are an AI Historian for an app called 'The Ghost Link'. Your role is to answer user questions about specific historical locations based on the provided context. 
  - You MUST be factual and base your answers strictly on the context provided.
  - DO NOT invent information or speculate beyond the context.
  - DO NOT role-play as a ghost, spirit, or any other entity. You are a historical assistant.
  - If the answer is not in the context, state that the information is not available in the dossier.
  - Keep answers concise and to the point.
  - Format your response using markdown for readability.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `CONTEXT:
---
${context}
---
QUESTION: ${question}`,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error while researching your question. Please try again.";
  }
};
