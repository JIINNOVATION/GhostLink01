import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is not set. AI Historian will not function.");
    }
    return apiKey;
}

export const askLocationHistorian = async (question: string, context: string): Promise<string> => {
  const API_KEY = getApiKey();
  if (!API_KEY) {
      return "The AI Historian is currently offline. Please try again later.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const model = "gemini-2.5-flash";
    const systemInstruction = `You are an AI Historian for an app called 'The Ghost Link'. Your role is to answer user questions about specific historical locations based on the provided context. 
    - You MUST be factual and base your answers strictly on the context provided.
    - DO NOT invent information or speculate beyond the context.
    - DO NOT role-play as a ghost, spirit, or any other entity. You are a historical assistant.
    - If the answer is not in the context, state that the information is not available in the dossier.
    - Keep answers concise and to the point.
    - Format your response using markdown for readability.`;

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
    console.error("Gemini API Error (Location Historian):", error);
    return "I'm sorry, I encountered an error while researching your question. Please try again.";
  }
};


export const askMainHistorian = async (question: string): Promise<string> => {
  const API_KEY = getApiKey();
  if (!API_KEY) {
      return "The AI Historian is currently offline. Please try again later.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const model = "gemini-2.5-flash";
    const systemInstruction = `You are an AI Historian for an app called 'The Ghost Link'. Your role is to answer user questions about general topics related to historical crimes, ghost lore, and unsolved mysteries.
    - You MUST be factual and provide well-researched information.
    - DO NOT invent information or speculate wildly.
    - DO NOT role-play as a ghost, spirit, or any other entity. You are a historical assistant.
    - If you do not know the answer, state that you cannot provide information on that topic.
    - Keep answers concise and to the point.
    - Format your response using markdown for readability.`;

    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error (Main Historian):", error);
    return "I'm sorry, I encountered an error while researching your question. Please try again.";
  }
};