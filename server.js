import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Load your Hugging Face API key from environment variables
const HF_API_KEY = process.env.HF_API_KEY;

// The model we'll use — small and efficient
const MODEL_URL = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-128k-instruct";

app.get("/", (req, res) => {
  res.send("TRL Bridge is running!");
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Missing 'prompt'");

  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const textBody = await response.text(); // read raw text

    // Try to parse JSON if possible
    let data;
    try {
      data = JSON.parse(textBody);
    } catch {
      return res.status(response.status).send(`Hugging Face API error: ${textBody}`);
    }

    // Extract generated text
    let output = "";
    if (Array.isArray(data) && data[0]?.generated_text) output = data[0].generated_text;
    else if (data.generated_text) output = data.generated_text;
    else output = JSON.stringify(data);

    res.send(output);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error contacting Hugging Face API");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
