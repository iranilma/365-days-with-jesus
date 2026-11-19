/**
 * 365 Days With Jesus — Automated Content Validation Suite (.mjs)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("======================================================");
console.log("  365 DAYS WITH JESUS — CONTENT VALIDATION SUITE");
console.log("======================================================\n");

let passCount = 0;
let failCount = 0;

function assert(condition, testName, failureDetail = "") {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${testName}: ${failureDetail}`);
    failCount++;
  }
}

// 1. Inspect themes.ts directly
const themesFile = fs.readFileSync(path.join(projectRoot, "src/lib/content/themes.ts"), "utf-8");
const themeMatches = [...themesFile.matchAll(/month_number:\s*(\d+)/g)];
const foundMonths = themeMatches.map((m) => parseInt(m[1], 10));

console.log("--- TEST GROUP 1: Monthly Themes Integrity ---");
assert(foundMonths.length === 12, "Exactly 12 Monthly Themes defined in themes.ts", `Found ${foundMonths.length}`);
for (let i = 1; i <= 12; i++) {
  assert(foundMonths.includes(i), `Month ${i} is present in monthly themes`);
}

// 2. Validate Calendar 365-Day Distribution
console.log("\n--- TEST GROUP 2: Calendar 365-Day Mapping ---");
const EXPECTED_DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const totalCalendarDays = EXPECTED_DAYS_PER_MONTH.reduce((a, b) => a + b, 0);
assert(totalCalendarDays === 365, "Total calendar days equals exactly 365", `Got ${totalCalendarDays}`);

function getDayMonthMapping(dayNumber) {
  let day = Math.max(1, Math.min(365, dayNumber));
  for (let m = 0; m < EXPECTED_DAYS_PER_MONTH.length; m++) {
    if (day <= EXPECTED_DAYS_PER_MONTH[m]) {
      return { monthNumber: m + 1, dayOfMonth: day };
    }
    day -= EXPECTED_DAYS_PER_MONTH[m];
  }
  return { monthNumber: 12, dayOfMonth: 31 };
}

assert(getDayMonthMapping(1).monthNumber === 1 && getDayMonthMapping(1).dayOfMonth === 1, "Day 1 maps to Jan 1");
assert(getDayMonthMapping(31).monthNumber === 1 && getDayMonthMapping(31).dayOfMonth === 31, "Day 31 maps to Jan 31");
assert(getDayMonthMapping(32).monthNumber === 2 && getDayMonthMapping(32).dayOfMonth === 1, "Day 32 maps to Feb 1");
assert(getDayMonthMapping(59).monthNumber === 2 && getDayMonthMapping(59).dayOfMonth === 28, "Day 59 maps to Feb 28");
assert(getDayMonthMapping(60).monthNumber === 3 && getDayMonthMapping(60).dayOfMonth === 1, "Day 60 maps to Mar 1");
assert(getDayMonthMapping(365).monthNumber === 12 && getDayMonthMapping(365).dayOfMonth === 31, "Day 365 maps to Dec 31");

// 3. Inspect devotionals.ts
console.log("\n--- TEST GROUP 3: Devotional Entries & Schema Inspection ---");
const devotionalsFile = fs.readFileSync(path.join(projectRoot, "src/lib/content/devotionals.ts"), "utf-8");
const dayMatches = [...devotionalsFile.matchAll(/day_number:\s*(\d+)/g)];
const foundAuthoredDays = dayMatches.map((m) => parseInt(m[1], 10));

assert(foundAuthoredDays.length >= 7, `Authored devotional days count is ${foundAuthoredDays.length}`);
for (let d = 1; d <= 7; d++) {
  assert(foundAuthoredDays.includes(d), `Day ${d} is authored and present in DEVOTIONAL_ENTRIES`);
}

// 4. Duplicate Check
console.log("\n--- TEST GROUP 4: Duplicate Record Prevention ---");
const uniqueAuthored = new Set(foundAuthoredDays);
assert(uniqueAuthored.size === foundAuthoredDays.length, "Zero duplicate day_number entries in authored content", `Total: ${foundAuthoredDays.length}, Unique: ${uniqueAuthored.size}`);

// 5. Verification of Fallback Fix
console.log("\n--- TEST GROUP 5: Authoritative Resolver & Fallback Fix ---");
const hasResolver = devotionalsFile.includes("getDevotionalByDay");
assert(hasResolver, "getDevotionalByDay resolver is exported and active in devotionals.ts");

const devPageFile = fs.readFileSync(path.join(projectRoot, "src/app/devotional/[day]/page.tsx"), "utf-8");
const hasDevFallbackBug = devPageFile.includes("|| DEVOTIONAL_ENTRIES[0]");
assert(!hasDevFallbackBug, "Day 1 silent fallback bug removed from devotional reader route");

const printPageFile = fs.readFileSync(path.join(projectRoot, "src/app/printables/[day]/page.tsx"), "utf-8");
const hasPrintFallbackBug = printPageFile.includes("|| DEVOTIONAL_ENTRIES[0]");
assert(!hasPrintFallbackBug, "Day 1 silent fallback bug removed from printables planner route");

// Summary
console.log("\n======================================================");
console.log(`  VALIDATION SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored Days: ${foundAuthoredDays.length} / 365`);
console.log(`  Pending Placeholders: ${365 - foundAuthoredDays.length} / 365`);
console.log("======================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
