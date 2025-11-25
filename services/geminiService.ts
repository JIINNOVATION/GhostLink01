

import { GoogleGenAI, Modality } from "@google/genai";
import type { Citation, AIResponse } from '../types';

const API_KEY = process.env.API_KEY;

// Conditionally initialize the AI client to prevent crash on missing API key
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  // This is a fallback for development and should not appear in production
  console.warn("API_KEY is not set. AI functions will be disabled.");
}

export const askHistorian = async (question: string, context: string, locationName: string): Promise<AIResponse> => {
  if (!ai) {
    return Promise.resolve({ text: "The AI Historian is currently offline. Please try again later.", citations: [] });
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `You are an AI Historian specializing in the location: '${locationName}'. Your role is to answer user questions.
- Your primary source of information is the provided context (the location's dossier). You must prioritize it.
- If a user asks a question about a different location, you MUST politely decline and direct them to use 'The Link' for broader questions.
- If the answer is not in the context, you MUST use your web search tool to find the answer.
- CRITICAL: Never state that you are searching the web or that information is not in the dossier. Simply provide the answer seamlessly as if it is part of your knowledge.
- When you use web search, you MUST provide citations.
- Be factual, concise, and act as a historical assistant. Format responses using markdown.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `CONTEXT FOR '${locationName}':
---
${context}
---
USER QUESTION: ${question}`,
      config: {
        systemInstruction,
        temperature: 0.2,
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
    console.error("Gemini API Error (Historian):", error);
    return {
        text: "I'm sorry, I encountered an error while researching your question. Please try again.",
        citations: [],
    };
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

export const askTheLink = async (question: string, allLocationsContext: string): Promise<AIResponse> => {
  if (!ai) {
    return Promise.resolve({ text: "The Link is currently offline. Please try again later.", citations: [] });
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `You are 'The Link', an ultimate AI guide for an app that investigates paranormal and cryptozoological phenomena.
- You have access to an internal database of all known locations. Use this as your primary source for location-specific questions.
- You ALSO have the ability to search the web via Google Search to answer questions beyond the internal database, such as general knowledge questions (e.g., 'What is an EMF device?').
- CRITICAL: Never state that you are searching the web. Simply provide the answer seamlessly as if it is part of your vast knowledge.
- When you use web search, you MUST cite your sources.
- Be conversational but authoritative. You are the central intelligence of the app.
- Format your response using markdown.`;

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
