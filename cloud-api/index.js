import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenAI, Modality } from '@google/genai';

const PORT = process.env.PORT || 8080;
const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL || 'https://jiinnovation.github.io';

// Initialize Google GenAI client with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const app = express();

// Configure CORS to allow GitHub Pages origin
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from GitHub Pages and localhost (for testing)
    const allowedOrigins = [GITHUB_PAGES_URL, 'http://localhost:3000', 'http://localhost:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/debug', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    githubPagesUrl: GITHUB_PAGES_URL,
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});

app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
    }

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
    return res.status(500).json({ error: 'Image generation failed' });
  }
});

app.post('/api/ask-historian', async (req, res) => {
  const { question, context, locationName } = req.body || {};
  if (!question || !context || !locationName) return res.status(400).json({ error: 'Missing fields' });

  try {
    const systemInstruction = `You are an AI Historian specializing in the location: '${locationName}'. Your role is to answer user questions and prioritize the provided context.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `CONTEXT FOR '${locationName}':\n---\n${context}\n---\nUSER QUESTION: ${question}`,
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
    return res.status(500).json({ error: 'Historian query failed' });
  }
});

// Basic index route
app.get('/', (req, res) => res.send('GhostLink Cloud API: OK'));

app.listen(PORT, () => {
  console.log(`GhostLink API Server listening on port ${PORT}`);
  console.log(`CORS allowed origin: ${GITHUB_PAGES_URL}`);
  console.log(`Gemini API Key configured: ${!!process.env.GEMINI_API_KEY}`);
});
