import { ChatGoogleGenerativeAI }
  from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq"
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();
import { ChatOpenRouter } from "@langchain/openrouter";

const openRouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens:2500
  // other params...
});


export const gemini =
  new ChatGoogleGenerativeAI({
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    apiKey: process.env.GOOGLE_API_KEY
  });

const groq = new ChatGroq({
  model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
  maxTokens: undefined,
  maxRetries: 2,
});


export const getModel =
  (agent) => {

    switch (agent) {

      case "coding":
        return openRouter;

      case "image":
        return groq;

      case "search":
        return groq;

      case "chat":
        return groq;
      case "vision":
        return gemini;
      default:
        return groq;

    }

  }