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

// testing end point
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("🟢 Received prompt:", prompt);

    const chatCompletion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
      messages: [
        { role: "user", content: prompt },
      ],
    });

    console.log("🟣 HF Response:", JSON.stringify(chatCompletion, null, 2));

    const reply = chatCompletion?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.json({ reply: "⚠️ Model returned no text." });
    }

    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});
