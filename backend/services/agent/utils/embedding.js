import { GoogleGenerativeAIEmbeddings }
from "@langchain/google-genai";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

export const embeddings =
new GoogleGenerativeAIEmbeddings({

    apiKey:
    process.env.GOOGLE_API_KEY,

    model:
    "gemini-embedding-001"

});