import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid prompt in request body." });
    }

    const chatCompletion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
      messages: [
        {
          role: "system",
          content: `
            You are a warm, motivational, and professional Technology Readiness Level (TRL) advisor.
            Speak clearly and supportively. Never include meta-text like “Here’s your response” or “As an AI model.”
            Respond strictly according to the prompt provided by the user.
          `
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    // Return the AI response
    const reply = chatCompletion.choices?.[0]?.message?.content || "⚠️ AI returned no valid response.";
    res.json({ reply });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));