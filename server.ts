import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Lazily initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please add it via AI Studio Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to generate a quiz
app.post("/api/quiz/generate", async (req, res) => {
  try {
    const { topic, targetAudience, difficulty, questionCount, includeTrueFalse } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const ai = getGeminiClient();

    const prompt = `
      Create a deep, intellectually stimulating, and highly accurate quiz based on the following preferences:
      - Topic: ${topic}
      - Target Audience: ${targetAudience || "General Public"}
      - Target Difficulty: ${difficulty || "Intermediate"}
      - Number of Questions: ${questionCount || 5}
      - Include True/False Questions: ${includeTrueFalse ? "Yes, mix of Multiple Choice and True/False" : "No, Multiple Choice only"}

      CRITICAL PEDAGOGICAL AND FACTUAL INSTRUCTIONS:
      1. Factuality: Every question must be grounded in verified, objective, and up-to-date facts. Do not make up facts, dates, or details.
      2. Distractor Quality: For MultipleChoice questions, incorrect choices (distractors) must be highly plausible, challenging, and directly target common misconceptions or close-but-incorrect alternatives. Avoid obvious filler or jokes.
      3. Clarity: Questions must be unambiguous, direct, and concisely written.
      4. Detailed Explanations: Provide a comprehensive, detailed, and educational explanation for each question. It should explain:
         - Why the correctAnswer is right.
         - Why the major distractors are incorrect (contextualizing their error).
         - Background information/trivia to enrich the user's knowledge.
      5. Cognitive Diversity: Vary the cognitive levels of the questions: include direct recall (e.g., "What was the date of..."), application (e.g., "Given this scenario, what would happen..."), and analysis/reasoning.
      6. For True/False questions:
         - Set questionType to 'TrueFalse'.
         - options must contain exactly ["True", "False"].
         - correctAnswer must be exactly "True" or "False".
      7. For MultipleChoice questions:
         - Set questionType to 'MultipleChoice'.
         - options must contain exactly 4 unique options.
         - correctAnswer must match one of the options exactly.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: {
              type: Type.STRING,
              description: "A creative, highly engaging, and scholarly title for this specific quiz."
            },
            topic: {
              type: Type.STRING,
              description: "The specific subject area or theme of the quiz."
            },
            difficulty: {
              type: Type.STRING,
              description: "The cognitive depth and difficulty level of the quiz (Beginner, Intermediate, Advanced, Expert)."
            },
            questions: {
              type: Type.ARRAY,
              description: "An array of highly detailed quiz questions.",
              items: {
                type: Type.OBJECT,
                properties: {
                  questionNumber: {
                    type: Type.INTEGER
                  },
                  questionText: {
                    type: Type.STRING,
                    description: "The core question being asked. Must be clear and grammatically precise."
                  },
                  questionType: {
                    type: Type.STRING,
                    description: "The formatting style of the question: 'MultipleChoice' or 'TrueFalse'."
                  },
                  options: {
                    type: Type.ARRAY,
                    description: "The list of potential answers. If True/False, this must contain exactly 'True' and 'False'. If MultipleChoice, it must contain exactly 4 unique options.",
                    items: {
                      type: Type.STRING
                    }
                  },
                  correctAnswer: {
                    type: Type.STRING,
                    description: "The exact string match of the correct option from the options array."
                  },
                  difficultyRating: {
                    type: Type.INTEGER,
                    description: "A specific difficulty rating from 1 (easiest) to 10 (hardest) for this individual question."
                  },
                  hint: {
                    type: Type.STRING,
                    description: "A subtle, clever clue that points toward the correct answer without giving it away entirely."
                  },
                  detailedExplanation: {
                    type: Type.STRING,
                    description: "An in-depth, educational breakdown explaining why the correctAnswer is true and contextualizing the topic."
                  }
                },
                required: [
                  "questionNumber",
                  "questionText",
                  "questionType",
                  "options",
                  "correctAnswer",
                  "difficultyRating",
                  "hint",
                  "detailedExplanation"
                ]
              }
            }
          },
          required: ["quizTitle", "topic", "difficulty", "questions"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }

    let cleanedText = resultText.trim();
    // Clean markdown code blocks if the model wrapped the response
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```(?:json)?\n?/i, "");
      cleanedText = cleanedText.replace(/\n?```$/, "");
      cleanedText = cleanedText.trim();
    }

    const quizData = JSON.parse(cleanedText);
    return res.json(quizData);
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    return res.status(500).json({ 
      error: "Failed to generate quiz", 
      details: error.message || String(error) 
    });
  }
});

// Vite middleware for development or Static Asset Serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Quiz server is running on http://localhost:${PORT}`);
  });
}

startServer();
