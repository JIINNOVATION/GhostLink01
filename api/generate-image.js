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
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (!imagePart?.inlineData?.data) {
      console.error('No image data in response', response);
      return res.status(502).json({ error: 'No image data returned from AI' });
    }

    const base64Image = imagePart.inlineData.data;
    return res.json({ image: `data:image/png;base64,${base64Image}` });
  } catch (err) {
    console.error('generate-image error:', err);
    return res.status(500).json({ error: 'Image generation failed', details: err.message });
  }
}
