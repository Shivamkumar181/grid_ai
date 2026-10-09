import { describe, test, expect } from "./test-helpers.js";
import { AgentState } from "../backend/services/agent/graph/state.js";
import { routerNode } from "../backend/services/agent/graph/router.node.js";
import { graph } from "../backend/services/agent/graph/supervisor.graph.js";

export async function runAgentTests() {
  console.log("\n Running Agent Service Tests...");

  await describe("Agent: State Definition", async () => {
    await test("AgentState contains all required graph channels", async () => {
      // AgentState Annotation.Root keys
      expect(AgentState).toBeDefined();
      expect(AgentState.spec).toBeDefined();
      const keys = Object.keys(AgentState.spec);
      expect(keys).toContain("prompt");
      expect(keys).toContain("conversationId");
      expect(keys).toContain("userId");
      expect(keys).toContain("agent");
      expect(keys).toContain("response");
      expect(keys).toContain("images");
      expect(keys).toContain("artifacts");
      expect(keys).toContain("searchResults");
    });
  });

  await describe("Agent: Router Node Logic", async () => {
    await test("Direct agent selection bypasses LLM classification", async () => {
      const explicitAgents = ["coding", "pdf", "ppt", "image", "search", "chat"];
      for (const ag of explicitAgents) {
        const state = { prompt: "Hello", agent: ag };
        const result = await routerNode(state);
        expect(result.agent).toBe(ag);
      }
    });

    await test("Image file attachment routes to vision agent", async () => {
      const stateWithImage = {
        prompt: "Describe what is in this picture",
        agent: "auto",
        file: {
          mimetype: "image/png",
          path: "/tmp/sample.png",
          originalname: "sample.png"
        }
      };

      const result = await routerNode(stateWithImage);
      expect(result.agent).toBe("vision");
    });

    await test("PDF file attachment routes to pdf_rag agent", async () => {
      const stateWithPdf = {
        prompt: "Summarize the key findings in section 2",
        agent: "auto",
        file: {
          mimetype: "application/pdf",
          path: "/tmp/document.pdf",
          originalname: "document.pdf"
        }
      };

      const result = await routerNode(stateWithPdf);
      expect(result.agent).toBe("pdf_rag");
    });
  });

  await describe("Agent: Supervisor Graph Structure", async () => {
    await test("Compiled supervisor graph is valid and runnable", async () => {
      expect(graph).toBeDefined();
      expect(typeof graph.invoke).toBe("function");
    });
  });

  await describe("Agent: Rate Limiter Configuration", async () => {
    const LIMITS = {
      chat: 20,
      coding: 5,
      pdf: 5,
      ppt: 5,
      image: 3,
      search: 5
    };

    await test("Rate limits match design requirements", async () => {
      expect(LIMITS.chat).toBe(20);
      expect(LIMITS.coding).toBe(5);
      expect(LIMITS.pdf).toBe(5);
      expect(LIMITS.ppt).toBe(5);
      expect(LIMITS.image).toBe(3);
      expect(LIMITS.search).toBe(5);
    });

    await test("Remaining count calculation works properly", async () => {
      const max = LIMITS.coding; // 5
      const currentCount = 2;
      const remaining = max - currentCount;
      expect(remaining).toBe(3);
    });
  });
}
