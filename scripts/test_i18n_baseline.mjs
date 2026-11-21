/**
 * Test Suite 1: English Baseline Verification
 * Confirms all 365 days, 12 monthly themes, existing tests, and routes remain 100% intact.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  TEST SUITE 1: ENGLISH BASELINE & REGRESSION VERIFICATION");
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, description, errorDetail = "") {
  if (condition) {
    console.log(`  [PASS] ${description}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${description} -> ${errorDetail}`);
    failed++;
  }
}

// 1. Check devotionals.ts exists and has 365 entries
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
assert(fs.existsSync(devotionalsPath), "devotionals.ts exists in src/lib/content/");

const devContent = fs.readFileSync(devotionalsPath, "utf-8");
const entryMatches = [...devContent.matchAll(/day_number:\s*(\d+)/g)];
assert(entryMatches.length === 365, `Exactly 365 devotional entries present (found ${entryMatches.length})`);

// 2. Check all days 1 to 365 are present sequentially
const daysFound = new Set(entryMatches.map((m) => parseInt(m[1], 10)));
let allSequential = true;
for (let d = 1; d <= 365; d++) {
  if (!daysFound.has(d)) {
    allSequential = false;
    break;
  }
}
assert(allSequential, "All days from 1 to 365 are sequentially present without gaps");

// 3. Check themes.ts exists and has 12 monthly themes
const themesPath = path.join(projectRoot, "src/lib/content/themes.ts");
assert(fs.existsSync(themesPath), "themes.ts exists in src/lib/content/");
const themesContent = fs.readFileSync(themesPath, "utf-8");
const monthMatches = [...themesContent.matchAll(/month_number:\s*(\d+)/g)];
assert(monthMatches.length === 12, `Exactly 12 monthly themes present (found ${monthMatches.length})`);

// 4. Verify all core routes exist in src/app/
const requiredRoutes = [
  "src/app/page.tsx",
  "src/app/app/page.tsx",
  "src/app/calendar/page.tsx",
  "src/app/devotional/[day]/page.tsx",
  "src/app/gratitude/page.tsx",
  "src/app/journal/page.tsx",
  "src/app/onboarding/welcome/page.tsx",
  "src/app/prayer/page.tsx",
  "src/app/printables/[day]/page.tsx",
  "src/app/sales/page.tsx",
  "src/app/sanctuary/page.tsx",
];

for (const route of requiredRoutes) {
  const fullPath = path.join(projectRoot, route);
  assert(fs.existsSync(fullPath), `Route component exists: ${route}`);
}

// 5. Run existing full-year regression test
try {
  const output = execSync("node scripts/validate-full-year.mjs", {
    cwd: projectRoot,
    encoding: "utf-8",
  });
  const hasZeroFailed = output.includes("0 FAILED") || output.includes("21 PASSED");
  assert(hasZeroFailed, "Existing test:full-year validation passes with 0 failures");
} catch (err) {
  assert(false, "Existing test:full-year validation failed", err.message);
}

// 6. Run existing content validation test
try {
  const output = execSync("node scripts/validate-content.mjs", {
    cwd: projectRoot,
    encoding: "utf-8",
  });
  const hasZeroFailed = output.includes("0 FAILED") || output.includes("32 PASSED");
  assert(hasZeroFailed, "Existing test:content validation passes with 0 failures");
} catch (err) {
  assert(false, "Existing test:content validation failed", err.message);
}

console.log(`\nBaseline Test Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
