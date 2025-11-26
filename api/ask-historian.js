import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { question, context: dossierContext, locationName } = req.body || {};
    if (!question || !dossierContext || !locationName) return res.status(400).json({ error: 'Missing fields' });

    const systemInstruction = `You are an AI Historian specializing in the location: '${locationName}'. Your role is to answer user questions and prioritize the provided context.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `CONTEXT FOR '${locationName}':\n---\n${dossierContext}\n---\nUSER QUESTION: ${question}`,
      config: {
        systemInstruction,
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || response.candidates?.[0]?.content?.text || '';
    const citations = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    for (const chunk of chunks) {
      if (chunk.web) citations.push({ uri: chunk.web.uri, title: chunk.web.title || chunk.web.uri });
    }

    return res.json({ text, citations });
  } catch (err) {
    console.error('ask-historian error:', err);
    return res.status(500).json({ error: 'Historian query failed', details: err.message });
  }
}
