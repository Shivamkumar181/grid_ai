import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pre-load all service environment files
loadEnv(path.resolve(__dirname, "../backend/services/agent/.env"));
loadEnv(path.resolve(__dirname, "../backend/gateway/.env"));
loadEnv(path.resolve(__dirname, "../backend/services/auth/.env"));
loadEnv(path.resolve(__dirname, "../backend/services/billing/.env"));
loadEnv(path.resolve(__dirname, "../backend/services/chat/.env"));

import { getStats } from "./test-helpers.js";
import { runGatewayTests } from "./test-gateway.test.js";
import { runAuthTests } from "./test-auth.test.js";
import { runChatTests } from "./test-chat.test.js";
import { runBillingTests } from "./test-billing.test.js";
import { runAgentTests } from "./test-agent.test.js";
import { runFrontendTests } from "./test-frontend.test.js";
import { runBrandingTests } from "./test-branding.test.js";

async function main() {
  console.log("=================================================");
  console.log("Starting Grid (formerly Cortex AI) Test Suite");
  console.log("=================================================");
  const startTime = Date.now();

  try {
    await runGatewayTests();
    await runAuthTests();
    await runChatTests();
    await runBillingTests();
    await runAgentTests();
    await runFrontendTests();
    await runBrandingTests();
  } catch (err) {
    console.error("\n❌ Unexpected error running tests:", err);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const stats = getStats();

  console.log("\n=================================================");
  console.log("TEST EXECUTION SUMMARY");
  console.log("=================================================");
  console.log(`  Total Tests : ${stats.total}`);
  console.log(`  Passed      : ${stats.passed}`);
  console.log(`  Failed      : ${stats.failed}`);
  console.log(`  Duration    : ${duration}s`);
  console.log("=================================================");

  if (stats.failed > 0) {
    console.error(`\nTEST SUITE FAILED with ${stats.failed} failures.\n`);
    process.exit(1);
  } else {
    console.log(`\n ALL ${stats.total} TESTS PASSED SUCCESSFULLY!\n`);
    process.exit(0);
  }
}

main();
