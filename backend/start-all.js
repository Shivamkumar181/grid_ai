import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const services = [
  { name: "Auth Service", dir: "services/auth", port: process.env.AUTH_PORT || 8001 },
  { name: "Chat Service", dir: "services/chat", port: process.env.CHAT_PORT || 8002 },
  { name: "Agent Service", dir: "services/agent", port: process.env.AGENT_PORT || 8003 },
  { name: "Billing Service", dir: "services/billing", port: process.env.BILLING_PORT || 8004 },
  { name: "Gateway", dir: "gateway", port: process.env.PORT || 8000 }
];

console.log("==========================================");
console.log("🚀 Starting Grid Backend Services Suite");
console.log("==========================================");

const processes = [];

services.forEach((service) => {
  const cwd = path.resolve(__dirname, service.dir);
  const child = spawn("node", ["index.js"], {
    cwd,
    env: {
      ...process.env,
      PORT: service.port,
      AUTH_SERVICE: process.env.AUTH_SERVICE || `http://localhost:${process.env.AUTH_PORT || 8001}`,
      CHAT_SERVICE: process.env.CHAT_SERVICE || `http://localhost:${process.env.CHAT_PORT || 8002}`,
      AGENT_SERVICE: process.env.AGENT_SERVICE || `http://localhost:${process.env.AGENT_PORT || 8003}`,
      BILLING_SERVICE: process.env.BILLING_SERVICE || `http://localhost:${process.env.BILLING_PORT || 8004}`,
    },
    stdio: "inherit"
  });

  child.on("error", (err) => {
    console.error(`[${service.name}] Error:`, err);
  });

  child.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.warn(`[${service.name}] Exited with code ${code}`);
    }
  });

  processes.push(child);
});

process.on("SIGINT", () => {
  console.log("\nShutting down all services...");
  processes.forEach((p) => p.kill("SIGINT"));
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nTerminating all services...");
  processes.forEach((p) => p.kill("SIGTERM"));
  process.exit(0);
});
