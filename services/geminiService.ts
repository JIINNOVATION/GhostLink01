import type { Citation, AIResponse } from '../types';

// Remote API base URL (for Render or other hosted backend).
// If `REACT_APP_REMOTE_API_URL` is set at build time, use it as the base
// (e.g. https://ghostlink-api.onrender.com). Otherwise fall back to
// relative serverless endpoints (`/api/*`) for Vercel/Netlify deployments.
const REMOTE_API_BASE = (process.env.REACT_APP_REMOTE_API_URL || '').replace(/\/$/, '');
const GENERATE_IMAGE_URL = REMOTE_API_BASE ? `${REMOTE_API_BASE}/api/generate-image` : '/api/generate-image';
const ASK_HISTORIAN_URL = REMOTE_API_BASE ? `${REMOTE_API_BASE}/api/ask-historian` : '/api/ask-historian';

// Helper function to call serverless endpoints
const callServerFunction = async (endpoint: string, payload: any) => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API error: ${res.status} ${text}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Server function call failed to ${endpoint}:`, error);
    throw error;
  }
};

export const askHistorian = async (question: string, context: string, locationName: string): Promise<AIResponse> => {
  try {
    const result = await callServerFunction(ASK_HISTORIAN_URL, {
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
    const result = await callServerFunction(GENERATE_IMAGE_URL, { prompt });
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
    const result = await callServerFunction(ASK_HISTORIAN_URL, {
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
