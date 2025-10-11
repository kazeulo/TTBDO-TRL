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
    const { prompt, techType, highestCompletedTRL, nextLevel, lackingForNextLevel } = req.body;

    if (!techType || highestCompletedTRL === undefined) {
      return res.status(400).json({ error: "Missing required TRL data." });
    }

    const chatCompletion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
      messages: [
        {
          role: "system",
          content: `
          You are a warm, motivational, and professional Technology Readiness Level (TRL) advisor.
          Speak clearly and supportively. Never include any meta-text like “Here’s your response” or “As an AI model.”

          The user's technology type is: ${techType}.
          They have completed up to TRL ${highestCompletedTRL}.
          They are progressing toward TRL ${nextLevel}.

          Missing items:
          ${lackingForNextLevel.join("\n")}

          IMPORTANT:
          - If highestCompletedTRL = 0, return only an HTML message explaining no items are complete and recommend starting carefully. No next steps list.
          - If highestCompletedTRL = 9, return only a congratulatory HTML message. No next steps list.
          - For other TRL levels, return HTML with:
            - <h3>Your technology readiness level is TRL ${highestCompletedTRL}</h3>
            - Explanation of TRL meaning
            - Encouragement
            - <b>Here’s where you can focus next to reach TRL ${nextLevel}</b> with bullet points from missing items
          `
        },
        { role: "user", content: prompt },
      ],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});