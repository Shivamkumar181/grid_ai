import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";
import { tavily } from "@tavily/core";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env files
dotenv.config({ path: path.resolve(__dirname, "../backend/services/agent/.env") });
dotenv.config({ path: path.resolve(__dirname, "../backend/services/auth/.env") });

async function verifyAll() {
  console.log("=========================================");
  console.log("🔍 Testing Live Cloud Services & APIs");
  console.log("=========================================");

  let allOk = true;

  // 1. MongoDB Connection
  try {
    console.log("1. Testing MongoDB Connection...");
    await mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 5000 });
    console.log("   ✅ MongoDB: Connected successfully");
    await mongoose.disconnect();
  } catch (err) {
    console.error("   ❌ MongoDB Error:", err.message);
    allOk = false;
  }

  // 2. Groq LLM (Used by Chat, Image, PPT)
  try {
    console.log("2. Testing Groq API (Chat / Supervisor)...");
    const groq = new ChatGroq({
      model: "llama-3.3-70b-versatile",
      apiKey: process.env.GROQ_API_KEY
    });
    const res = await groq.invoke("Say 'Groq Connected' in two words");
    console.log("   ✅ Groq API Working:", res.content.trim());
  } catch (err) {
    console.error("   ❌ Groq API Error:", err.message);
    allOk = false;
  }

  // 3. Google Gemini (Used by Vision Agent)
  try {
    console.log("3. Testing Google Gemini API...");
    const gemini = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GOOGLE_API_KEY
    });
    const res = await gemini.invoke("Say 'Gemini Connected' in two words");
    console.log("   ✅ Gemini API Working:", res.content.trim());
  } catch (err) {
    console.error("   ❌ Gemini API Error:", err.message);
    allOk = false;
  }

  // 4. OpenRouter API (Used by Coding Agent)
  try {
    console.log("4. Testing OpenRouter API (Coding Agent)...");
    const openRouter = new ChatOpenRouter({
      model: "deepseek/deepseek-chat",
      apiKey: process.env.OPENROUTER_API_KEY,
      maxTokens: 50
    });
    const res = await openRouter.invoke("Say 'OpenRouter Connected' in two words");
    console.log("   ✅ OpenRouter Working:", res.content.trim());
  } catch (err) {
    console.error("   ❌ OpenRouter API Error:", err.message);
    allOk = false;
  }

  // 5. Tavily Search API (Used by Search Agent)
  try {
    console.log("5. Testing Tavily Web Search API...");
    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
    const res = await tvly.search("Grid AI platform test", { maxResults: 1 });
    console.log("   ✅ Tavily Search Working: Found", res.results?.length || 0, "results");
  } catch (err) {
    console.error("   ❌ Tavily Search Error:", err.message);
    allOk = false;
  }

  // 6. Firebase Admin Authentication (Used for User Login)
  try {
    console.log("6. Testing Firebase Admin Auth Init & Service Account...");
    const serviceAccountPath = path.resolve(__dirname, "../backend/services/auth/serviceAccount.json");
    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error("serviceAccount.json file not found at " + serviceAccountPath);
    }
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
    const fbApp = getApps().length > 0 ? getApps()[0] : initializeApp({
      credential: cert(serviceAccount)
    });
    const auth = getAuth(fbApp);
    console.log("   ✅ Firebase Admin Auth: Initialized successfully for project", serviceAccount.project_id);
  } catch (err) {
    console.error("   ❌ Firebase Admin Error:", err.message);
    allOk = false;
  }

  console.log("=========================================");
  if (allOk) {
    console.log("🎉 ALL LIVE SERVICES & APIS VERIFIED SUCCESSFULLY!");
  } else {
    console.log("⚠️ Some services encountered issues, check output above.");
  }
  console.log("=========================================");
}

verifyAll().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
