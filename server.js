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

// test endpoint for your Wix site to call
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const chatCompletion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      reply: chatCompletion.choices[0].message.content,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
