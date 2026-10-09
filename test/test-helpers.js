/**
 * Simple, zero-dependency async test runner for Grid test suite.
 */

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const currentSuite = { name: "", results: [] };
const allSuites = [];

export function describe(suiteName, fn) {
  const suite = { name: suiteName, tests: [] };
  allSuites.push(suite);
  return fn(suite);
}

export async function test(testName, fn) {
  totalTests++;
  const start = Date.now();
  try {
    await fn();
    passedTests++;
    const duration = Date.now() - start;
    console.log(`  ✓ ${testName} (${duration}ms)`);
    return { name: testName, passed: true, duration };
  } catch (err) {
    failedTests++;
    const duration = Date.now() - start;
    console.error(`  ✗ ${testName} (${duration}ms)`);
    console.error(`    Error: ${err.message}`);
    return { name: testName, passed: false, duration, error: err };
  }
}

export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
      }
    },
    toEqual(expected) {
      const a = JSON.stringify(actual);
      const b = JSON.stringify(expected);
      if (a !== b) {
        throw new Error(`Expected deep equality:\nExpected: ${b}\nReceived: ${a}`);
      }
    },
    toBeDefined() {
      if (actual === undefined) {
        throw new Error(`Expected value to be defined, but got undefined`);
      }
    },
    toBeNull() {
      if (actual !== null) {
        throw new Error(`Expected null, but got ${JSON.stringify(actual)}`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy value, but got ${JSON.stringify(actual)}`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected falsy value, but got ${JSON.stringify(actual)}`);
      }
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`);
      }
    },
    toBeLessThanOrEqual(expected) {
      if (!(actual <= expected)) {
        throw new Error(`Expected ${actual} to be less than or equal to ${expected}`);
      }
    },
    toContain(expected) {
      if (typeof actual === "string" && !actual.includes(expected)) {
        throw new Error(`Expected string "${actual}" to contain "${expected}"`);
      } else if (Array.isArray(actual) && !actual.includes(expected)) {
        throw new Error(`Expected array to contain ${JSON.stringify(expected)}`);
      }
    },
    toThrow(expectedMessage) {
      let threw = false;
      let thrownError = null;
      try {
        if (typeof actual === "function") {
          actual();
        }
      } catch (err) {
        threw = true;
        thrownError = err;
      }
      if (!threw) {
        throw new Error(`Expected function to throw, but it did not throw`);
      }
      if (expectedMessage && !thrownError.message.includes(expectedMessage)) {
        throw new Error(`Expected error message containing "${expectedMessage}", got "${thrownError.message}"`);
      }
    }
  };
}

export function getStats() {
  return {
    total: totalTests,
    passed: passedTests,
    failed: failedTests,
    success: failedTests === 0
  };
}
