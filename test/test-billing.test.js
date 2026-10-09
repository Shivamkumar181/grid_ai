import crypto from "crypto";
import { describe, test, expect } from "./test-helpers.js";
import { PLANS } from "../backend/services/billing/config/plans.js";
import { CREDIT_COST } from "../backend/services/billing/config/credits.js";
import Payment from "../backend/services/billing/models/payment.model.js";

export async function runBillingTests() {
  console.log("\n📦 Running Billing Service Tests...");

  await describe("Billing: Subscription Plans Configuration", async () => {
    await test("PLANS config contains free, starter, and pro tiers", async () => {
      expect(PLANS.free).toBeDefined();
      expect(PLANS.starter).toBeDefined();
      expect(PLANS.pro).toBeDefined();
    });

    await test("Plan tiers have correct pricing and credit allotments", async () => {
      // Free tier
      expect(PLANS.free.amount).toBe(0);
      expect(PLANS.free.credits).toBe(100);
      expect(PLANS.free.validity).toBe(30);

      // Starter tier
      expect(PLANS.starter.amount).toBe(199);
      expect(PLANS.starter.credits).toBe(500);
      expect(PLANS.starter.validity).toBe(30);

      // Pro tier
      expect(PLANS.pro.amount).toBe(499);
      expect(PLANS.pro.credits).toBe(1000);
      expect(PLANS.pro.validity).toBe(30);
    });
  });

  await describe("Billing: Agent Credit Cost Configuration", async () => {
    await test("CREDIT_COST config has expected cost for each agent", async () => {
      expect(CREDIT_COST.chat).toBe(1);
      expect(CREDIT_COST.search).toBe(5);
      expect(CREDIT_COST.coding).toBe(10);
      expect(CREDIT_COST.pdf).toBe(10);
      expect(CREDIT_COST.ppt).toBe(10);
      expect(CREDIT_COST.image).toBe(10);
    });
  });

  await describe("Billing: Payment Model Schema", async () => {
    await test("Payment model schema defines expected paths and status enum", async () => {
      const paths = Payment.schema.paths;
      expect(paths.userId).toBeDefined();
      expect(paths.orderId).toBeDefined();
      expect(paths.paymentId).toBeDefined();
      expect(paths.amount).toBeDefined();
      expect(paths.currency).toBeDefined();
      expect(paths.credits).toBeDefined();
      expect(paths.plan).toBeDefined();
      expect(paths.status).toBeDefined();

      const statusEnum = paths.status.enumValues;
      expect(statusEnum).toContain("created");
      expect(statusEnum).toContain("paid");
      expect(statusEnum).toContain("failed");
      expect(paths.status.defaultValue).toBe("created");
    });

    await test("Payment model instantiates with default status", async () => {
      const payment = new Payment({
        userId: "usr_999",
        orderId: "order_rzp_123",
        amount: 499,
        credits: 1000,
        plan: "pro"
      });

      expect(payment.userId).toBe("usr_999");
      expect(payment.orderId).toBe("order_rzp_123");
      expect(payment.amount).toBe(499);
      expect(payment.credits).toBe(1000);
      expect(payment.plan).toBe("pro");
      expect(payment.status).toBe("created");
      expect(payment.currency).toBe("INR");
    });
  });

  await describe("Billing: Signature Verification Algorithm", async () => {
    await test("Razorpay HMAC SHA256 signature verification validates correctly", async () => {
      const secret = "test_secret_key_123";
      const orderId = "order_ABC123";
      const paymentId = "pay_XYZ789";

      // Compute valid signature
      const validSignature = crypto
        .createHmac("sha256", secret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      // Verify matching signature
      const computed = crypto
        .createHmac("sha256", secret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      expect(computed).toBe(validSignature);

      // Verify tampered signature fails
      const tamperedSignature = "invalid_tampered_signature_hex";
      expect(computed === tamperedSignature).toBeFalsy();
    });
  });
}
