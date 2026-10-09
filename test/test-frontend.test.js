import { describe, test, expect } from "./test-helpers.js";
import { detectLanguage } from "../frontend/src/utils/detectLanguage.js";
import { store } from "../frontend/src/redux/store.js";
import userReducer, { setUserData } from "../frontend/src/redux/user.slice.js";
import conversationReducer, {
  setConversations,
  addConversation,
  setSelectedConversation,
  setConvTitle
} from "../frontend/src/redux/conversation.slice.js";
import messageReducer, {
  setMessages,
  addMessage,
  setIsLoading,
  setArtifacts
} from "../frontend/src/redux/message.slice.js";

export async function runFrontendTests() {
  console.log("\n📦 Running Frontend Tests...");

  await describe("Frontend: detectLanguage Utility", async () => {
    await test("detectLanguage correctly maps file extensions", async () => {
      expect(detectLanguage("index.html")).toBe("html");
      expect(detectLanguage("style.css")).toBe("css");
      expect(detectLanguage("app.js")).toBe("javascript");
      expect(detectLanguage("Component.jsx")).toBe("javascript");
      expect(detectLanguage("server.ts")).toBe("typescript");
      expect(detectLanguage("App.tsx")).toBe("typescript");
      expect(detectLanguage("package.json")).toBe("json");
      expect(detectLanguage("main.py")).toBe("python");
      expect(detectLanguage("Application.java")).toBe("java");
      expect(detectLanguage("engine.cpp")).toBe("cpp");
      expect(detectLanguage("helper.c")).toBe("c");
      expect(detectLanguage("notes.txt")).toBe("plaintext");
      expect(detectLanguage("")).toBe("plaintext");
    });
  });

  await describe("Frontend: Redux user.slice", async () => {
    await test("userSlice initializes with null userData and handles setUserData", async () => {
      const state0 = userReducer(undefined, { type: "@@INIT" });
      expect(state0.userData).toBeNull();

      const userPayload = {
        _id: "usr_1",
        email: "alice@grid.ai",
        name: "Alice",
        plan: "pro",
        credits: 1000
      };

      const state1 = userReducer(state0, setUserData(userPayload));
      expect(state1.userData).toBeDefined();
      expect(state1.userData.email).toBe("alice@grid.ai");
      expect(state1.userData.plan).toBe("pro");

      const state2 = userReducer(state1, setUserData(null));
      expect(state2.userData).toBeNull();
    });
  });

  await describe("Frontend: Redux conversation.slice", async () => {
    await test("conversationSlice manages conversation state and active selection", async () => {
      const state0 = conversationReducer(undefined, { type: "@@INIT" });
      expect(state0.conversations.length).toBe(0);
      expect(state0.selectedConversation).toBeNull();

      const convList = [
        { _id: "c1", title: "Chat 1" },
        { _id: "c2", title: "Chat 2" }
      ];
      const state1 = conversationReducer(state0, setConversations(convList));
      expect(state1.conversations.length).toBe(2);

      const newConv = { _id: "c3", title: "Chat 3" };
      const state2 = conversationReducer(state1, addConversation(newConv));
      expect(state2.conversations.length).toBe(3);
      expect(state2.conversations[0]._id).toBe("c3"); // unshifted to top

      const state3 = conversationReducer(state2, setSelectedConversation(newConv));
      expect(state3.selectedConversation._id).toBe("c3");

      const state4 = conversationReducer(
        state3,
        setConvTitle({ conversationId: "c3", title: "Updated Chat 3 Title" })
      );
      expect(state4.selectedConversation.title).toBe("Updated Chat 3 Title");
      expect(state4.conversations[0].title).toBe("Updated Chat 3 Title");
    });
  });

  await describe("Frontend: Redux message.slice", async () => {
    await test("messageSlice handles message adding, loading, and artifacts", async () => {
      const state0 = messageReducer(undefined, { type: "@@INIT" });
      expect(state0.messages.length).toBe(0);
      expect(state0.isLoading).toBe(false);
      expect(state0.artifacts.length).toBe(0);

      const state1 = messageReducer(state0, setIsLoading(true));
      expect(state1.isLoading).toBe(true);

      const state2 = messageReducer(
        state1,
        addMessage({ role: "user", content: "Create Grid dashboard" })
      );
      expect(state2.messages.length).toBe(1);
      expect(state2.messages[0].content).toBe("Create Grid dashboard");

      const mockArtifacts = [
        {
          id: 1,
          type: "project",
          title: "Grid App",
          files: [{ name: "index.html", content: "<h1>Grid</h1>" }]
        }
      ];
      const state3 = messageReducer(state2, setArtifacts(mockArtifacts));
      expect(state3.artifacts.length).toBe(1);
      expect(state3.artifacts[0].title).toBe("Grid App");
    });
  });

  await describe("Frontend: Redux Store Integration", async () => {
    await test("Configured Redux store combines all slice reducers", async () => {
      const globalState = store.getState();
      expect(globalState.user).toBeDefined();
      expect(globalState.conversation).toBeDefined();
      expect(globalState.message).toBeDefined();
    });
  });
}
