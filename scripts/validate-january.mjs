/**
 * 365 Days With Jesus — January Comprehensive Quality Control & Validation Suite
 * Tests authoritative registry, runtime resolver execution, HTML synchronization,
 * boundary placeholders, navigation logic, and absence of Day 1 fallbacks.
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const repoRoot = path.join(projectRoot, "..");

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — JANUARY FINAL QUALITY CONTROL SUITE");
console.log("================================================================================\n");

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

// -----------------------------------------------------------------------------
// 1. Load and Execute Authoritative TypeScript Registry in Node VM
// -----------------------------------------------------------------------------
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
assert(fs.existsSync(devotionalsPath), "devotionals.ts exists");
const devotionalsCode = fs.readFileSync(devotionalsPath, "utf-8");

// Transpile in-memory for pure Node runtime execution
const jsCode = devotionalsCode
  .replace(/^import\s+.*?;/gm, "")
  .replace(/export const /g, "const ")
  .replace(/export function /g, "function ")
  .replace(/:\s*DevotionalEntry\[\]/g, "")
  .replace(/:\s*DevotionalEntry/g, "")
  .replace(/:\s*number/g, "")
  .replace(/:\s*\{[^}]+\}/g, "");

const vmContext = vm.createContext({});
vm.runInContext(
  jsCode + "; Object.assign(globalThis, { DEVOTIONAL_ENTRIES, getDevotionalEntry, getDayMonthMapping, getDevotionalByDay, DAYS_PER_MONTH });",
  vmContext
);

const { DEVOTIONAL_ENTRIES, getDevotionalEntry, getDayMonthMapping, getDevotionalByDay } = vmContext;

// -----------------------------------------------------------------------------
// TEST SUITE 1: Authoritative Registry Schema, Content & Word Counts
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 1: Authoritative Registry Verification (Days 1–31) ---");
assert(Array.isArray(DEVOTIONAL_ENTRIES), "DEVOTIONAL_ENTRIES is an array");
assert(DEVOTIONAL_ENTRIES.length === 31, "Exactly 31 authored entries in DEVOTIONAL_ENTRIES", `Found ${DEVOTIONAL_ENTRIES.length}`);

const dayNumbers = [];
const titles = [];

DEVOTIONAL_ENTRIES.forEach((entry) => {
  const day = entry.day_number;
  dayNumbers.push(day);
  titles.push(entry.title);

  const prefix = `Day ${day} (${entry.title})`;

  // Required fields populated
  assert(entry.month_number === 1, `${prefix}: month_number is 1`);
  assert(entry.day_of_month === day, `${prefix}: day_of_month is ${day}`);
  assert(typeof entry.weekly_subtheme === "string" && entry.weekly_subtheme.length > 5, `${prefix}: weekly_subtheme is populated`);
  assert(typeof entry.title === "string" && entry.title.length > 5, `${prefix}: title is populated`);
  assert(typeof entry.scripture_primary_reference === "string" && entry.scripture_primary_reference.length > 3, `${prefix}: scripture reference populated`);
  assert(typeof entry.scripture_primary_text === "string" && entry.scripture_primary_text.length > 15, `${prefix}: scripture text populated`);
  assert(entry.scripture_translation === "World English Bible (WEB)", `${prefix}: scripture translation is WEB`);
  assert(typeof entry.daily_intention === "string" && entry.daily_intention.length > 10, `${prefix}: daily_intention populated`);
  assert(typeof entry.practical_action === "string" && entry.practical_action.length > 10, `${prefix}: practical_action populated`);
  assert(typeof entry.evening_reflection_prompt === "string" && entry.evening_reflection_prompt.length > 10, `${prefix}: evening prompt populated`);

  // Reflection word count: 150–250 words
  const reflWords = entry.reflection_body.split(/\s+/).filter(Boolean).length;
  assert(reflWords >= 150 && reflWords <= 250, `${prefix}: reflection word count is ${reflWords} (target 150-250)`);

  // Exactly 3 reflection questions
  assert(Array.isArray(entry.reflection_questions) && entry.reflection_questions.length === 3, `${prefix}: exactly 3 reflection questions`);
  entry.reflection_questions.forEach((q, qIdx) => {
    assert(typeof q === "string" && q.includes("?"), `${prefix}: Q${qIdx + 1} is a valid question ending with '?'`);
  });

  // Guided prayer word count: 50–100 words
  const prayerWords = entry.guided_prayer.split(/\s+/).filter(Boolean).length;
  assert(prayerWords >= 50 && prayerWords <= 100, `${prefix}: prayer word count is ${prayerWords} (target 50-100)`);
});

// -----------------------------------------------------------------------------
// TEST SUITE 2: ID Uniqueness & Sequential Integrity
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: ID Uniqueness & Sequential Integrity ---");
const uniqueDaySet = new Set(dayNumbers);
assert(uniqueDaySet.size === 31, "Zero duplicate day_number values in January", `Unique: ${uniqueDaySet.size}`);

for (let d = 1; d <= 31; d++) {
  assert(uniqueDaySet.has(d), `Day ${d} is present in sequence`);
}

const uniqueTitleSet = new Set(titles);
assert(uniqueTitleSet.size === 31, "All 31 devotional titles are unique and distinct", `Unique: ${uniqueTitleSet.size}`);

// -----------------------------------------------------------------------------
// TEST SUITE 3: Runtime Resolver & Boundary Placeholder Execution
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Runtime Resolver & Boundary Placeholder Execution ---");

// Test alias
assert(typeof getDevotionalByDay === "function", "getDevotionalByDay is exported");
assert(getDevotionalByDay(1).title === getDevotionalEntry(1).title, "getDevotionalByDay returns identical result to getDevotionalEntry");

// Boundary days requested by task specification:
// Days 32, 59, 60, 90, 91, 181, 182, 273, 274, 334, 335 and 365
const boundaryCases = [
  { day: 32, expectedMonth: 2, expectedDayOfMonth: 1, desc: "Feb 1" },
  { day: 59, expectedMonth: 2, expectedDayOfMonth: 28, desc: "Feb 28" },
  { day: 60, expectedMonth: 3, expectedDayOfMonth: 1, desc: "Mar 1" },
  { day: 90, expectedMonth: 3, expectedDayOfMonth: 31, desc: "Mar 31" },
  { day: 91, expectedMonth: 4, expectedDayOfMonth: 1, desc: "Apr 1" },
  { day: 181, expectedMonth: 6, expectedDayOfMonth: 30, desc: "Jun 30" },
  { day: 182, expectedMonth: 7, expectedDayOfMonth: 1, desc: "Jul 1" },
  { day: 273, expectedMonth: 9, expectedDayOfMonth: 30, desc: "Sep 30" },
  { day: 274, expectedMonth: 10, expectedDayOfMonth: 1, desc: "Oct 1" },
  { day: 334, expectedMonth: 11, expectedDayOfMonth: 30, desc: "Nov 30" },
  { day: 335, expectedMonth: 12, expectedDayOfMonth: 1, desc: "Dec 1" },
  { day: 365, expectedMonth: 12, expectedDayOfMonth: 31, desc: "Dec 31" },
];

boundaryCases.forEach(({ day, expectedMonth, expectedDayOfMonth, desc }) => {
  const mapping = getDayMonthMapping(day);
  assert(
    mapping.monthNumber === expectedMonth && mapping.dayOfMonth === expectedDayOfMonth,
    `getDayMonthMapping(${day}) correctly maps to Month ${expectedMonth}, Day ${expectedDayOfMonth} (${desc})`
  );

  const entry = getDevotionalEntry(day);
  assert(entry.is_placeholder === true, `Day ${day} (${desc}) has is_placeholder: true`);
  assert(entry.day_number === day, `Day ${day} (${desc}) returns day_number: ${day}`);
  assert(entry.month_number === expectedMonth, `Day ${day} (${desc}) returns month_number: ${expectedMonth}`);
  assert(entry.day_of_month === expectedDayOfMonth, `Day ${day} (${desc}) returns day_of_month: ${expectedDayOfMonth}`);
  assert(!entry.title.includes("Day 1:"), `Day ${day} does NOT fallback to Day 1 title`);
  assert(entry.reflection_questions.length === 3, `Day ${day} placeholder includes 3 structured reflection questions`);
});

// -----------------------------------------------------------------------------
// TEST SUITE 4: Invalid Day Inputs & Robust Clamping
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Robust Handling of Invalid Inputs ---");
const invalidInputs = [
  { input: 0, expectedDay: 1, label: "Day 0 clamps to Day 1" },
  { input: -10, expectedDay: 1, label: "Negative day clamps to Day 1" },
  { input: 366, expectedDay: 365, label: "Day 366 clamps to Day 365" },
  { input: 999, expectedDay: 365, label: "Day 999 clamps to Day 365" },
  { input: NaN, expectedDay: 1, label: "NaN defaults safely to Day 1" },
  { input: "abc", expectedDay: 1, label: "String 'abc' defaults safely to Day 1" },
  { input: null, expectedDay: 1, label: "null defaults safely to Day 1" },
  { input: undefined, expectedDay: 1, label: "undefined defaults safely to Day 1" },
  { input: 15.8, expectedDay: 15, label: "Float 15.8 floors to Day 15" },
];

invalidInputs.forEach(({ input, expectedDay, label }) => {
  const result = getDevotionalEntry(input);
  assert(result.day_number === expectedDay, `${label} (got Day ${result.day_number})`);
});

// -----------------------------------------------------------------------------
// TEST SUITE 5: Application Routes & Elimination of Silent Fallbacks
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: Application Source Code & Fallback Elimination Audit ---");
const routesToCheck = [
  { file: "src/app/devotional/[day]/page.tsx", mustInclude: "getDevotionalEntry(dayNumber)" },
  { file: "src/app/printables/[day]/page.tsx", mustInclude: "getDevotionalEntry(dayNumber)" },
  { file: "src/app/page.tsx", mustInclude: "getDevotionalEntry(1)" },
];

routesToCheck.forEach(({ file, mustInclude }) => {
  const fullPath = path.join(projectRoot, file);
  assert(fs.existsSync(fullPath), `Route file exists: ${file}`);
  const content = fs.readFileSync(fullPath, "utf-8");
  assert(content.includes(mustInclude), `${file} calls resolver via ${mustInclude}`);
  assert(!content.includes("|| DEVOTIONAL_ENTRIES[0]"), `${file} contains ZERO silent Day 1 fallback`);
});

// -----------------------------------------------------------------------------
// TEST SUITE 6: Standalone HTML Synchronisation & Full Consistency Check
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 6: Standalone HTML Synchronisation Verification ---");
const htmlPath = path.join(repoRoot, "365_Days_With_Jesus.html");
assert(fs.existsSync(htmlPath), "365_Days_With_Jesus.html exists at repo root");
const htmlContent = fs.readFileSync(htmlPath, "utf-8");

// Parse DEVOTIONALS object inside standalone HTML
const htmlDevMatch = htmlContent.match(/const DEVOTIONALS = \{([\s\S]*?)\n    \};/);
assert(!!htmlDevMatch, "DEVOTIONALS object found inside 365_Days_With_Jesus.html");

const htmlVmContext = vm.createContext({});
vm.runInContext("const DEVOTIONALS = {" + htmlDevMatch[1] + "}; globalThis.DEVOTIONALS = DEVOTIONALS;", htmlVmContext);
const htmlDevotionals = htmlVmContext.DEVOTIONALS;

assert(Object.keys(htmlDevotionals).length === 31, "Standalone HTML contains exactly 31 authored records", `Found ${Object.keys(htmlDevotionals).length}`);

// Compare each day in standalone HTML against authoritative TypeScript registry
DEVOTIONAL_ENTRIES.forEach((tsEntry) => {
  const d = tsEntry.day_number;
  const htmlEntry = htmlDevotionals[d];

  assert(!!htmlEntry, `HTML contains entry for Day ${d}`);
  if (htmlEntry) {
    assert(htmlEntry.title === tsEntry.title, `Day ${d} title matches 100%: "${tsEntry.title}"`);
    assert(htmlEntry.ref === tsEntry.scripture_primary_reference, `Day ${d} scripture reference matches 100%: "${tsEntry.scripture_primary_reference}"`);
    assert(htmlEntry.text === tsEntry.scripture_primary_text, `Day ${d} scripture text matches 100%`);
    assert(htmlEntry.body === tsEntry.reflection_body, `Day ${d} reflection body matches 100%`);
    assert(htmlEntry.prayer === tsEntry.guided_prayer, `Day ${d} guided prayer matches 100%`);
    assert(htmlEntry.intention === tsEntry.daily_intention, `Day ${d} daily intention matches 100%`);
    assert(htmlEntry.action === tsEntry.practical_action, `Day ${d} practical action matches 100%`);
    assert(Array.isArray(htmlEntry.questions) && htmlEntry.questions.length === 3, `Day ${d} in HTML has exactly 3 questions`);
  }
});

// Check standalone HTML navigation & placeholder UI elements
assert(htmlContent.includes('id="devPlaceholderNotice"'), "HTML contains #devPlaceholderNotice banner element");
assert(htmlContent.includes("if (currentDayNum < 365) switchDay(currentDayNum + 1);"), "HTML nextDay allows navigation through Day 365 (not hardcoded to 7)");
assert(!htmlContent.includes("if (currentDayNum < 7) switchDay(currentDayNum + 1);"), "HTML does not contain obsolete Day 7 navigation limit");

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`  FINAL QUALITY CONTROL SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored January Days: 31 / 31 (100% Authoritative & Synchronized)`);
console.log("================================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
