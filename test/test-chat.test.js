import { describe, test, expect } from "./test-helpers.js";
import Conversation from "../backend/services/chat/models/conversation.model.js";
import Message from "../backend/services/chat/models/message.model.js";

export async function runChatTests() {
  console.log("\n📦 Running Chat Service Tests...");

  await describe("Chat: Conversation Model Schema", async () => {
    await test("Conversation model schema defines required paths", async () => {
      const paths = Conversation.schema.paths;
      expect(paths.userId).toBeDefined();
      expect(paths.title).toBeDefined();
      expect(paths.createdAt).toBeDefined();
      expect(paths.updatedAt).toBeDefined();
      expect(paths.title.defaultValue).toBe("New Chat");
    });

    await test("Conversation instance can be created with defaults", async () => {
      const conv = new Conversation({
        userId: "usr_abc_123"
      });

      expect(conv.userId).toBe("usr_abc_123");
      expect(conv.title).toBe("New Chat");
    });
  });

  await describe("Chat: Message Model Schema", async () => {
    await test("Message model schema defines expected paths and role enum", async () => {
      const paths = Message.schema.paths;
      expect(paths.conversationId).toBeDefined();
      expect(paths.role).toBeDefined();
      expect(paths.content).toBeDefined();
      expect(paths.images).toBeDefined();
      expect(paths.artifacts).toBeDefined();

      const roleEnum = paths.role.enumValues;
      expect(roleEnum).toContain("user");
      expect(roleEnum).toContain("assistant");
    });

    await test("Message instance accepts valid user and assistant messages with artifacts", async () => {
      const userMsg = new Message({
        conversationId: "507f1f77bcf86cd799439011",
        role: "user",
        content: "Build a landing page for Grid"
      });
      expect(userMsg.role).toBe("user");
      expect(userMsg.content).toBe("Build a landing page for Grid");

      const assistantMsg = new Message({
        conversationId: "507f1f77bcf86cd799439011",
        role: "assistant",
        content: "Here is your landing page",
        images: ["https://example.com/screenshot.png"],
        artifacts: [
          {
            id: 123456,
            type: "project",
            title: "Grid Landing Page",
            files: [
              { name: "index.html", content: "<h1>Grid</h1>" },
              { name: "style.css", content: "body { margin: 0; }" }
            ],
            createdAt: new Date().toISOString()
          }
        ]
      });

      expect(assistantMsg.role).toBe("assistant");
      expect(assistantMsg.images.length).toBe(1);
      expect(assistantMsg.artifacts.length).toBe(1);
      expect(assistantMsg.artifacts[0].title).toBe("Grid Landing Page");
      expect(assistantMsg.artifacts[0].files.length).toBe(2);
      expect(assistantMsg.artifacts[0].files[0].name).toBe("index.html");
    });
  });
}
