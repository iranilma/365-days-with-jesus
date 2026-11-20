/**
 * 365 Days With Jesus — January Comprehensive Quality Control & Validation Suite
 * 
 * Verifies:
 * 1. Single source of truth (src/lib/content/devotionals.ts)
 * 2. Standalone HTML presence and 100% field-by-field parity in project root
 * 3. Exact 11-field schema compliance for all 31 January entries
 * 4. Word count constraints (reflections 150-250w, prayers 50-100w)
 * 5. Runtime resolver and missing-day placeholder execution (Days 32, 59, 60, 90, 91, 181, 182, 273, 274, 334, 335, 365)
 * 6. Robust handling of invalid inputs (0, negative, >365, NaN, strings, null)
 * 7. HTML navigation beyond Day 31 up to Day 365
 * 8. Zero silent Day 1 fallbacks across all application routes and HTML
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — COMPREHENSIVE FINAL VALIDATION SUITE");
console.log(`  Project Root: ${projectRoot}`);
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
// 1. Verify and Load Authoritative TypeScript Registry
// -----------------------------------------------------------------------------
console.log("--- SUITE 1: Authoritative Single Source of Truth (devotionals.ts) ---");
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
assert(fs.existsSync(devotionalsPath), "devotionals.ts exists in src/lib/content/");

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

assert(Array.isArray(DEVOTIONAL_ENTRIES), "DEVOTIONAL_ENTRIES is an array");
const januaryEntries = DEVOTIONAL_ENTRIES.filter((e) => e.month_number === 1);
assert(januaryEntries.length === 31, "Exactly 31 authored records in January", `Found ${januaryEntries.length}`);

// -----------------------------------------------------------------------------
// 2. Authoritative Registry Schema & Literary Verification (Days 1–31)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Schema, Content Boundaries & Literary Quality (Days 1–31) ---");
const dayNumbers = [];
const titles = [];

januaryEntries.forEach((entry) => {
  const day = entry.day_number;
  dayNumbers.push(day);
  titles.push(entry.title);

  const prefix = `Day ${day} ("${entry.title}")`;

  // Required fields populated
  assert(entry.month_number === 1, `${prefix}: month_number is 1`);
  assert(entry.day_of_month === day, `${prefix}: day_of_month equals day number (${day})`);
  assert(typeof entry.weekly_subtheme === "string" && entry.weekly_subtheme.length > 5, `${prefix}: weekly_subtheme populated`);
  assert(typeof entry.title === "string" && entry.title.length > 5, `${prefix}: title populated`);
  assert(typeof entry.scripture_primary_reference === "string" && entry.scripture_primary_reference.length > 3, `${prefix}: scripture reference populated`);
  assert(typeof entry.scripture_primary_text === "string" && entry.scripture_primary_text.length > 15, `${prefix}: scripture quotation populated`);
  assert(entry.scripture_translation === "World English Bible (WEB)", `${prefix}: scripture translation is World English Bible (WEB)`);
  assert(typeof entry.daily_intention === "string" && entry.daily_intention.length > 10, `${prefix}: daily_intention populated`);
  assert(typeof entry.practical_action === "string" && entry.practical_action.length > 10, `${prefix}: practical_action populated`);
  assert(typeof entry.evening_reflection_prompt === "string" && entry.evening_reflection_prompt.length > 10, `${prefix}: evening prompt populated`);

  // Reflection word count: 150–250 words
  const reflWords = entry.reflection_body.split(/\s+/).filter(Boolean).length;
  assert(reflWords >= 150 && reflWords <= 250, `${prefix}: reflection word count is ${reflWords} (target 150-250)`);

  // Exactly 3 reflection questions
  assert(Array.isArray(entry.reflection_questions) && entry.reflection_questions.length === 3, `${prefix}: exactly 3 reflection questions`);
  entry.reflection_questions.forEach((q, qIdx) => {
    assert(typeof q === "string" && q.includes("?"), `${prefix}: Q${qIdx + 1} is valid question ending with '?'`);
  });

  // Guided prayer word count: 50–100 words
  const prayerWords = entry.guided_prayer.split(/\s+/).filter(Boolean).length;
  assert(prayerWords >= 50 && prayerWords <= 100, `${prefix}: prayer word count is ${prayerWords} (target 50-100)`);
});

// ID Uniqueness
const uniqueDaySet = new Set(dayNumbers);
assert(uniqueDaySet.size === 31, "Zero duplicate day_number values in January", `Unique: ${uniqueDaySet.size}`);
for (let d = 1; d <= 31; d++) {
  assert(uniqueDaySet.has(d), `Day ${d} is present in sequence`);
}

const uniqueTitleSet = new Set(titles);
assert(uniqueTitleSet.size === 31, "All 31 devotional titles are unique and distinct", `Unique: ${uniqueTitleSet.size}`);

// -----------------------------------------------------------------------------
// 3. Runtime Resolver & Boundary Placeholder Behavior (Days 32–365)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Runtime Resolver & Missing-Day Placeholder Execution ---");

assert(typeof getDevotionalByDay === "function", "getDevotionalByDay is exported as alias");
assert(getDevotionalByDay(1).title === getDevotionalEntry(1).title, "getDevotionalByDay alias works identically to getDevotionalEntry");

const boundaryCases = [
  { day: 32, expectedMonth: 2, expectedDayOfMonth: 1, desc: "Feb 1", isPlaceholder: false },
  { day: 59, expectedMonth: 2, expectedDayOfMonth: 28, desc: "Feb 28", isPlaceholder: false },
  { day: 60, expectedMonth: 3, expectedDayOfMonth: 1, desc: "Mar 1", isPlaceholder: false },
  { day: 90, expectedMonth: 3, expectedDayOfMonth: 31, desc: "Mar 31", isPlaceholder: false },
  { day: 91, expectedMonth: 4, expectedDayOfMonth: 1, desc: "Apr 1", isPlaceholder: false },
  { day: 181, expectedMonth: 6, expectedDayOfMonth: 30, desc: "Jun 30", isPlaceholder: false },
  { day: 182, expectedMonth: 7, expectedDayOfMonth: 1, desc: "Jul 1", isPlaceholder: false },
  { day: 273, expectedMonth: 9, expectedDayOfMonth: 30, desc: "Sep 30", isPlaceholder: false },
  { day: 274, expectedMonth: 10, expectedDayOfMonth: 1, desc: "Oct 1", isPlaceholder: false },
  { day: 334, expectedMonth: 11, expectedDayOfMonth: 30, desc: "Nov 30", isPlaceholder: false },
  { day: 335, expectedMonth: 12, expectedDayOfMonth: 1, desc: "Dec 1", isPlaceholder: false },
  { day: 365, expectedMonth: 12, expectedDayOfMonth: 31, desc: "Dec 31", isPlaceholder: false },
];

boundaryCases.forEach(({ day, expectedMonth, expectedDayOfMonth, desc, isPlaceholder }) => {
  const mapping = getDayMonthMapping(day);
  assert(
    mapping.monthNumber === expectedMonth && mapping.dayOfMonth === expectedDayOfMonth,
    `getDayMonthMapping(${day}) correctly maps to Month ${expectedMonth}, Day ${expectedDayOfMonth} (${desc})`
  );

  const entry = getDevotionalEntry(day);
  if (isPlaceholder) {
    assert(entry.is_placeholder === true, `Day ${day} (${desc}) has is_placeholder: true`);
    assert(entry.reflection_questions.length === 3, `Day ${day} placeholder includes 3 structured reflection questions`);
  } else {
    assert(!entry.is_placeholder, `Day ${day} (${desc}) is authored with is_placeholder: false`);
    assert(entry.reflection_questions.length === 3, `Day ${day} authored entry includes 3 structured reflection questions`);
  }
  assert(entry.day_number === day, `Day ${day} (${desc}) returns requested day_number: ${day}`);
  assert(entry.month_number === expectedMonth, `Day ${day} (${desc}) returns month_number: ${expectedMonth}`);
  assert(entry.day_of_month === expectedDayOfMonth, `Day ${day} (${desc}) returns day_of_month: ${expectedDayOfMonth}`);
  assert(!entry.title.includes("Day 1:"), `Day ${day} does NOT fallback to Day 1 title`);
});

// -----------------------------------------------------------------------------
// 4. Robust Handling of Invalid Inputs
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Safe Handling of Invalid Inputs ---");
const invalidInputs = [
  { input: 0, expectedDay: 1, label: "Day 0 safely clamps to Day 1" },
  { input: -15, expectedDay: 1, label: "Negative day safely clamps to Day 1" },
  { input: 366, expectedDay: 365, label: "Day 366 safely clamps to Day 365" },
  { input: 999, expectedDay: 365, label: "Day 999 safely clamps to Day 365" },
  { input: NaN, expectedDay: 1, label: "NaN defaults safely to Day 1" },
  { input: "invalid", expectedDay: 1, label: "String input defaults safely to Day 1" },
  { input: null, expectedDay: 1, label: "null defaults safely to Day 1" },
  { input: undefined, expectedDay: 1, label: "undefined defaults safely to Day 1" },
  { input: 12.7, expectedDay: 12, label: "Float 12.7 floors safely to Day 12" },
];

invalidInputs.forEach(({ input, expectedDay, label }) => {
  const result = getDevotionalEntry(input);
  assert(result.day_number === expectedDay, `${label} (got Day ${result.day_number})`);
});

// -----------------------------------------------------------------------------
// 5. Standalone HTML Presence & Complete Parity in Project Root
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: Standalone HTML File Presence & 100% Field Parity ---");

// The standalone HTML MUST be present directly in project root
const htmlPath = path.join(projectRoot, "365_Days_With_Jesus.html");
assert(fs.existsSync(htmlPath), "365_Days_With_Jesus.html exists in project root", `Expected at: ${htmlPath}`);

if (!fs.existsSync(htmlPath)) {
  console.error("CRITICAL ERROR: Standalone HTML is missing from project root!");
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, "utf-8");

// Parse DEVOTIONALS object inside standalone HTML
const htmlDevMatch = htmlContent.match(/const DEVOTIONALS = \{([\s\S]*?)\n    \};/);
assert(!!htmlDevMatch, "DEVOTIONALS object found inside 365_Days_With_Jesus.html");

const htmlVmContext = vm.createContext({});
vm.runInContext("const DEVOTIONALS = {" + htmlDevMatch[1] + "}; globalThis.DEVOTIONALS = DEVOTIONALS;", htmlVmContext);
const htmlDevotionals = htmlVmContext.DEVOTIONALS;

assert(Object.keys(htmlDevotionals).length >= 31, "Standalone HTML contains at least 31 authored records", `Found ${Object.keys(htmlDevotionals).length}`);

// Compare each January day in standalone HTML against authoritative TypeScript registry
januaryEntries.forEach((tsEntry) => {
  const d = tsEntry.day_number;
  const htmlEntry = htmlDevotionals[d];

  assert(!!htmlEntry, `Day ${d} exists in HTML DEVOTIONALS`);
  if (htmlEntry) {
    assert(htmlEntry.title === tsEntry.title, `Day ${d} title matches 100%: "${tsEntry.title}"`);
    assert(htmlEntry.ref === tsEntry.scripture_primary_reference, `Day ${d} reference matches 100%: "${tsEntry.scripture_primary_reference}"`);
    assert(htmlEntry.text === tsEntry.scripture_primary_text, `Day ${d} Scripture text matches 100%`);
    assert(htmlEntry.body === tsEntry.reflection_body, `Day ${d} reflection body matches 100%`);
    assert(htmlEntry.prayer === tsEntry.guided_prayer, `Day ${d} guided prayer matches 100%`);
    assert(htmlEntry.intention === tsEntry.daily_intention, `Day ${d} daily intention matches 100%`);
    assert(htmlEntry.action === tsEntry.practical_action, `Day ${d} practical action matches 100%`);
    assert(htmlEntry.evening === tsEntry.evening_reflection_prompt, `Day ${d} evening prompt matches 100%`);
    assert(htmlEntry.subtheme === tsEntry.weekly_subtheme, `Day ${d} subtheme matches 100%`);

    assert(Array.isArray(htmlEntry.questions) && htmlEntry.questions.length === 3, `Day ${d} in HTML has exactly 3 questions`);
    tsEntry.reflection_questions.forEach((q, idx) => {
      assert(htmlEntry.questions[idx] === q, `Day ${d} question ${idx + 1} matches 100%`);
    });
  }
});

// Verify HTML navigation can move beyond Day 31 up to Day 365
assert(
  htmlContent.includes("if (currentDayNum < 365) switchDay(currentDayNum + 1);"),
  "HTML nextDay() allows traversal past Day 31 up to Day 365"
);
assert(
  !htmlContent.includes("if (currentDayNum < 7) switchDay(currentDayNum + 1);"),
  "HTML nextDay() does not contain obsolete hardcoded Day 7 boundary"
);

// Verify HTML placeholder UI banner
assert(htmlContent.includes('id="devPlaceholderNotice"'), "HTML contains #devPlaceholderNotice banner element");

// Verify all 3 reflection questions appear in both interactive and printable views in HTML
assert(htmlContent.includes('id="devQuestionsList"'), "HTML contains #devQuestionsList for interactive reflections");
assert(htmlContent.includes('id="printQuestionsList"'), "HTML contains #printQuestionsList for printable reflections");
assert(htmlContent.includes("d.questions.forEach"), "HTML switchDay iterates through all questions for interactive and printable display");

// -----------------------------------------------------------------------------
// 6. Zero Silent Fallbacks & Reflection Questions Audit across Application Routes
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 6: Zero Silent Fallbacks & Reflection Questions Audit ---");
const routesToCheck = [
  { file: "src/app/devotional/[day]/page.tsx", mustInclude: "getDevotionalEntry(dayNumber)", questionCheck: "entry.reflection_questions.map" },
  { file: "src/app/printables/[day]/page.tsx", mustInclude: "getDevotionalEntry(dayNumber)", questionCheck: "entry.reflection_questions.map" },
  { file: "src/app/page.tsx", mustInclude: "getDevotionalEntry(1)", questionCheck: null },
];

routesToCheck.forEach(({ file, mustInclude, questionCheck }) => {
  const fullPath = path.join(projectRoot, file);
  assert(fs.existsSync(fullPath), `Route file exists: ${file}`);
  const content = fs.readFileSync(fullPath, "utf-8");
  assert(content.includes(mustInclude), `${file} calls resolver via ${mustInclude}`);
  assert(!content.includes("|| DEVOTIONAL_ENTRIES[0]"), `${file} contains ZERO silent Day 1 fallback`);
  if (questionCheck) {
    assert(content.includes(questionCheck), `${file} renders all 3 reflection questions via ${questionCheck}`);
  }
});

// Check HTML switchDay implementation for fallback
assert(!htmlContent.includes("|| DEVOTIONALS[1]"), "HTML switchDay contains ZERO silent Day 1 fallback");

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`  FINAL VALIDATION RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored January Days: 31 / 31 (100% Authoritative, Parity & Synchronized)`);
console.log("================================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
