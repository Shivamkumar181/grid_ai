import { TavilySearch } from "@langchain/tavily";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

export const searchTool = new TavilySearch({
  apiKey: process.env.TAVILY_API_KEY,
  maxResults: 5,
  topic: "general",
  includeImages:true
});
