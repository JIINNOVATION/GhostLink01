

import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

// Conditionally initialize the AI client to prevent crash on missing API key
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  // This is a fallback for development and should not appear in production
  console.warn("API_KEY is not set. AI functions will be disabled.");
}


export const askHistorian = async (question: string, context: string, appName: string): Promise<string> => {
  if (!ai) {
    return Promise.resolve("The AI Historian is currently offline. Please try again later.");
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `You are an AI Historian for an app called '${appName}'. Your role is to answer user questions about specific locations based on the provided context. 
  - You MUST be factual and base your answers strictly on the context provided.
  - DO NOT invent information or speculate beyond the context.
  - DO NOT role-play as a ghost, spirit, alien or any other entity. You are a historical assistant.
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

export const generateLocationImage = async (prompt: string): Promise<string> => {
  if (!ai) {
    console.warn("API_KEY is not set. Image generation is disabled.");
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIj48L3JlY3Q+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNFRDZEQUIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5JbWFnZSBHZW5lcmF0aW9uIE9mZmxpbmU8L3RleHQ+PC9zdmc+";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Safely access image data
    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      const base64ImageBytes: string = imagePart.inlineData.data;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
    
    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIj48L3JlY3Q+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNFRDZEQUIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5JbWFnZSBHZW5lcmF0aW9uIEZhaWxlZDwvdGV4dD48L3N2Zz4=";
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  if (!ai) {
    console.warn("API_KEY is not set. Speech generation is disabled.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // Using 'Charon' for a deep, calm, story-teller-like voice.
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return base64Audio;
    }
    
    throw new Error("No audio data found in response.");
  } catch (error) {
    console.error("Gemini Speech Generation Error:", error);
    return null;
  }
};
