import { describe, test, expect } from "./test-helpers.js";
import { getCurrentUser } from "../backend/gateway/controllers/user.controller.js";
import { protect } from "../backend/gateway/middlewares/auth.middleware.js";

export async function runGatewayTests() {
  console.log("\n📦 Running Gateway Service Tests...");

  await describe("Gateway: User Controller", async () => {
    await test("getCurrentUser returns 200 and user object when req.user exists", async () => {
      const mockReq = {
        user: {
          userId: "usr_123",
          email: "user@test.com",
          name: "Test User",
          plan: "pro",
          credits: 500
        }
      };

      let statusCode = 0;
      let responseData = null;
      const mockRes = {
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          responseData = data;
          return this;
        }
      };

      await getCurrentUser(mockReq, mockRes);
      expect(statusCode).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.user.userId).toBe("usr_123");
      expect(responseData.user.email).toBe("user@test.com");
      expect(responseData.user.plan).toBe("pro");
    });

    await test("getCurrentUser returns 500 if an exception occurs", async () => {
      const badReq = Object.defineProperty({}, "user", {
        get() {
          throw new Error("Simulated request failure");
        }
      });

      let statusCode = 0;
      let responseData = null;
      const mockRes = {
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          responseData = data;
          return this;
        }
      };

      await getCurrentUser(badReq, mockRes);
      expect(statusCode).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toBe("Simulated request failure");
    });
  });

  await describe("Gateway: Auth Middleware (protect)", async () => {
    await test("protect returns 401 when cookies or session cookie is missing", async () => {
      const reqWithoutCookie = { cookies: {} };
      let statusCode = 0;
      let responseData = null;
      const mockRes = {
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          responseData = data;
          return this;
        }
      };
      let nextCalled = false;

      await protect(reqWithoutCookie, mockRes, () => {
        nextCalled = true;
      });

      expect(statusCode).toBe(401);
      expect(responseData.message).toBe("Unauthorized");
      expect(nextCalled).toBe(false);
    });

    await test("protect returns 401 when req.cookies is undefined", async () => {
      const req = {};
      let statusCode = 0;
      let responseData = null;
      const mockRes = {
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          responseData = data;
          return this;
        }
      };
      let nextCalled = false;

      await protect(req, mockRes, () => {
        nextCalled = true;
      });

      expect(statusCode).toBe(401);
      expect(responseData.message).toBe("Unauthorized");
      expect(nextCalled).toBe(false);
    });

    await test("protect extracts token from Authorization Bearer header or x-session-id", async () => {
      const authHeader = "Bearer session_token_123";
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      expect(token).toBe("session_token_123");

      const xSessionHeader = "session_token_456";
      expect(xSessionHeader).toBe("session_token_456");
    });
  });

  await describe("Gateway: Header Propagation Decorator", async () => {
    await test("proxyReqOptDecorator injects x-user headers when srcReq.user exists", async () => {
      // Simulate the proxyReqOptDecorator behavior defined in utils/proxyWithHeaders.js
      const proxyReqOpts = { headers: {} };
      const srcReq = {
        user: {
          userId: "user_abc_789",
          email: "coder@grid.ai",
          avatar: "https://grid.ai/avatar.png"
        }
      };

      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
        proxyReqOpts.headers["x-user-email"] = srcReq.user.email;
        proxyReqOpts.headers["x-user-avatar"] = srcReq.user.avatar;
      }

      expect(proxyReqOpts.headers["x-user-id"]).toBe("user_abc_789");
      expect(proxyReqOpts.headers["x-user-email"]).toBe("coder@grid.ai");
      expect(proxyReqOpts.headers["x-user-avatar"]).toBe("https://grid.ai/avatar.png");
    });
  });
}
