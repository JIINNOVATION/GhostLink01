

import { GoogleGenAI, Modality } from "@google/genai";
import type { Citation } from '../types';

export interface AskTheLinkResponse {
    text: string;
    citations: Citation[];
}

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
            // Using 'Charon' for a deep, calming, story-teller voice as requested.
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

export const askTheLink = async (question: string, allLocationsContext: string): Promise<AskTheLinkResponse> => {
  if (!ai) {
    return Promise.resolve({ text: "The Link is currently offline. Please try again later.", citations: [] });
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `You are 'The Link', an ultimate AI guide for an app that investigates paranormal and cryptozoological phenomena. The app has two feeds: 'The Ghost Link' for ghosts and mysteries, and 'The Rift Tracker' for aliens and cryptids.
- You have access to a database of all known locations across both feeds. Use this as your primary source of information.
- You ALSO have the ability to search the web via Google Search to answer questions beyond the internal database, such as general knowledge questions (e.g., 'What is an EMF device?') or practical, real-world questions (e.g., 'What are some good restaurants near the Winchester Mystery House?').
- When you use web search, you MUST cite your sources.
- If a user asks a subjective question (e.g., 'which is scarier?'), provide a comparative analysis based on the facts in the internal database.
- Be conversational but authoritative. You are the central intelligence of the app.
- Format your response using markdown for readability.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `INTERNAL DATABASE CONTEXT:
---
${allLocationsContext}
---
USER QUESTION: ${question}`,
      config: {
        systemInstruction,
        temperature: 0.5,
        tools: [{googleSearch: {}}],
      },
    });

    const citations: Citation[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        for (const chunk of response.candidates[0].groundingMetadata.groundingChunks) {
            if (chunk.web) {
                citations.push({ uri: chunk.web.uri, title: chunk.web.title || chunk.web.uri });
            }
        }
    }

    return {
        text: response.text,
        citations,
    };
  } catch (error) {
    console.error("Gemini API Error (The Link):", error);
    return {
        text: "I'm sorry, I seem to be experiencing a connection issue. Please try your question again.",
        citations: [],
    };
  }
};