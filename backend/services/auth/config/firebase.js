import { initializeApp, cert, getApps } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = path.resolve(__dirname, "../serviceAccount.json");

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const parsed =
      typeof process.env.FIREBASE_SERVICE_ACCOUNT === "string"
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
        : process.env.FIREBASE_SERVICE_ACCOUNT;
    credential = cert(parsed);
  } catch (e) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", e.message);
  }
}

if (!credential && fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
    credential = cert(serviceAccount);
  } catch (e) {
    console.error("Failed to read serviceAccount.json:", e.message);
  }
}

export const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential,
      });