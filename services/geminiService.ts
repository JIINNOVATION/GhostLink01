import type { Citation, AIResponse } from '../types';

// Netlify Functions URLs (relative paths work on same domain)
const GENERATE_IMAGE_URL = '/.netlify/functions/generate-image';
const ASK_HISTORIAN_URL = '/.netlify/functions/ask-historian';

// Helper function to call Netlify Functions
const callNetlifyFunction = async (endpoint: string, payload: any) => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Netlify Function call failed to ${endpoint}:`, error);
    throw error;
  }
};

export const askHistorian = async (question: string, context: string, locationName: string): Promise<AIResponse> => {
  try {
    const result = await callNetlifyFunction(ASK_HISTORIAN_URL, {
      question,
      context,
      locationName,
    });
    return {
      text: result.text || '',
      citations: result.citations || [],
    };
  } catch (error) {
    console.error('Historian query failed:', error);
    return {
      text: 'I encountered an error while researching your question. Please try again.',
      citations: [],
    };
  }
};

export const generateLocationImage = async (prompt: string): Promise<string> => {
  try {
    const result = await callNetlifyFunction(GENERATE_IMAGE_URL, { prompt });
    if (!result.image) throw new Error('No image returned');
    return result.image;
  } catch (error) {
    console.error('Image generation failed:', error);
    // Return fallback SVG if generation fails
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIj48L3JlY3Q+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNFRDZEQUIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5JbWFnZSBHZW5lcmF0aW9uIEZhaWxlZDwvdGV4dD48L3N2Zz4=';
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  // Speech generation not yet implemented in Netlify Functions
  console.warn('Speech generation is not yet implemented.');
  return null;
};

export const askTheLink = async (question: string, allLocationsContext: string): Promise<AIResponse> => {
  try {
    const result = await callNetlifyFunction(ASK_HISTORIAN_URL, {
      question,
      context: allLocationsContext,
      locationName: 'The Link - Global Database',
    });
    return {
      text: result.text || '',
      citations: result.citations || [],
    };
  } catch (error) {
    console.error('The Link query failed:', error);
    return {
      text: 'I seem to be experiencing a connection issue. Please try your question again.',
      citations: [],
    };
  }
};
