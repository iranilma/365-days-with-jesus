/**
 * 365 Days With Jesus — Master i18n & Regression QA Test Runner
 * Orchestrates all 6 validation suites and produces a comprehensive summary report.
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("\n================================================================================");
console.log("  365 DAYS WITH JESUS — MASTER INTERNATIONALIZATION & REGRESSION TEST SUITE");
console.log("================================================================================\n");

const testSuites = [
  {
    name: "Suite 1: English Baseline & Content Regression",
    script: "scripts/test_i18n_baseline.mjs",
  },
  {
    name: "Suite 2: Dictionaries, Key Parity & Diacritic Verification",
    script: "scripts/test_i18n_dictionaries_diacritics.mjs",
  },
  {
    name: "Suite 3: Language Switching & LocalStorage Persistence",
    script: "scripts/test_i18n_switching_storage.mjs",
  },
  {
    name: "Suite 4: Navigation Continuity & Calendar Alignment",
    script: "scripts/test_i18n_navigation_calendar.mjs",
  },
  {
    name: "Suite 5: User Progress, Prayer, Gratitude & Journal Preservation",
    script: "scripts/test_i18n_user_data_preservation.mjs",
  },
  {
    name: "Suite 6: Unavailable Devotional Fallback & Pastoral Notice",
    script: "scripts/test_i18n_unavailable_devotional.mjs",
  },
  {
    name: "Suite 7: Two-Edition Architecture Certification",
    script: "scripts/test_two_editions_architecture.mjs",
  },
  {
    name: "Suite 8: UI Corrections, Flags Removal & Text-Size Controls",
    script: "scripts/test_ui_corrections_and_flags.mjs",
  },
];

let totalPassed = 0;
let totalFailed = 0;
const results = [];

for (const suite of testSuites) {
  console.log(`\n>>> Running ${suite.name}...`);
  try {
    const output = execSync(`node ${suite.script}`, {
      cwd: projectRoot,
      encoding: "utf-8",
    });
    console.log(output);

    // Parse counts from output
    const match = output.match(/(\d+)\s+passed,\s+(\d+)\s+failed/i);
    const passCount = match ? parseInt(match[1], 10) : 1;
    const failCount = match ? parseInt(match[2], 10) : 0;

    totalPassed += passCount;
    totalFailed += failCount;

    results.push({
      name: suite.name,
      status: failCount === 0 ? "PASSED" : "FAILED",
      passCount,
      failCount,
    });
  } catch (err) {
    console.error(`Error executing ${suite.name}:`, err.stdout || err.message);
    totalFailed++;
    results.push({
      name: suite.name,
      status: "FAILED",
      passCount: 0,
      failCount: 1,
    });
  }
}

console.log("\n================================================================================");
console.log("  365 DAYS WITH JESUS — OVERALL QA CERTIFICATION SUMMARY");
console.log("================================================================================");

for (const res of results) {
  const icon = res.status === "PASSED" ? "✓ [PASS]" : "✗ [FAIL]";
  console.log(`  ${icon.padEnd(10)} ${res.name.padEnd(55)} (${res.passCount} passed, ${res.failCount} failed)`);
}

console.log("--------------------------------------------------------------------------------");
console.log(`  Total Assertions: ${totalPassed + totalFailed}`);
console.log(`  Total Passed:     ${totalPassed}`);
console.log(`  Total Failed:     ${totalFailed}`);
console.log("================================================================================\n");

if (totalFailed > 0) {
  console.error("❌ QA Certification FAILED: Issues were detected that require resolution.");
  process.exit(1);
} else {
  console.log("🌟 QA Certification PASSED: All i18n & regression tests succeeded with 0 defects!");
  process.exit(0);
}
