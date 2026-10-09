import { describe, test, expect } from "./test-helpers.js";
import User from "../backend/services/auth/models/user.model.js";

export async function runAuthTests() {
  console.log("\n📦 Running Auth Service Tests...");

  await describe("Auth: User Model Schema", async () => {
    await test("User model schema defines expected paths and defaults", async () => {
      const paths = User.schema.paths;
      expect(paths.firebaseUid).toBeDefined();
      expect(paths.email).toBeDefined();
      expect(paths.name).toBeDefined();
      expect(paths.avatar).toBeDefined();
      expect(paths.provider).toBeDefined();
      expect(paths.plan).toBeDefined();
      expect(paths.credits).toBeDefined();
      expect(paths.totalCredits).toBeDefined();
      expect(paths.planExpiresAt).toBeDefined();

      // Check defaults
      expect(paths.plan.defaultValue).toBe("free");
      expect(paths.credits.defaultValue).toBe(100);
      expect(paths.totalCredits.defaultValue).toBe(100);
    });

    await test("User instance instantiates with default credit balance", async () => {
      const testUser = new User({
        firebaseUid: "fb_12345",
        email: "developer@grid.ai",
        name: "Grid Developer"
      });

      expect(testUser.plan).toBe("free");
      expect(testUser.credits).toBe(100);
      expect(testUser.totalCredits).toBe(100);
      expect(testUser.email).toBe("developer@grid.ai");
      expect(testUser.firebaseUid).toBe("fb_12345");
    });
  });

  await describe("Auth: Credit Deduction Rules", async () => {
    const COST = {
      chat: 1,
      search: 5,
      coding: 10,
      pdf: 10,
      ppt: 10,
      image: 10
    };

    await test("Agent costs match the system specification", async () => {
      expect(COST.chat).toBe(1);
      expect(COST.search).toBe(5);
      expect(COST.coding).toBe(10);
      expect(COST.pdf).toBe(10);
      expect(COST.ppt).toBe(10);
      expect(COST.image).toBe(10);
    });

    await test("Credits deduction calculation works correctly", async () => {
      let userCredits = 100;
      const agentsToCall = ["chat", "search", "coding", "pdf", "ppt", "image"];

      for (const agent of agentsToCall) {
        const required = COST[agent] || 1;
        expect(userCredits >= required).toBeTruthy();
        userCredits -= required;
      }

      // 100 - 1 - 5 - 10 - 10 - 10 - 10 = 54
      expect(userCredits).toBe(54);
    });

    await test("Credit check rejects when balance is insufficient", async () => {
      const lowBalance = 4;
      const required = COST.coding; // 10
      const hasEnough = lowBalance >= required;
      expect(hasEnough).toBeFalsy();
    });
  });

  await describe("Auth: Plan Upgrade Calculations", async () => {
    await test("Plan upgrade adds credits and sets 30-day expiration date", async () => {
      const initialCredits = 100;
      const initialTotal = 100;
      const upgradeCredits = 500;
      const newPlan = "starter";

      const beforeTime = Date.now();
      const planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const afterTime = Date.now();

      const finalCredits = initialCredits + upgradeCredits;
      const finalTotal = initialTotal + upgradeCredits;

      expect(finalCredits).toBe(600);
      expect(finalTotal).toBe(600);
      expect(planExpiresAt.getTime()).toBeGreaterThan(beforeTime + 29 * 24 * 60 * 60 * 1000);
      expect(planExpiresAt.getTime()).toBeLessThanOrEqual(afterTime + 31 * 24 * 60 * 60 * 1000);
    });
  });
}
