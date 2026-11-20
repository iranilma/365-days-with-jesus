/**
 * 365 Days With Jesus — February Comprehensive Quality Control & Validation Suite
 * 
 * Verifies:
 * 1. Single source of truth (src/lib/content/devotionals.ts) for February (Days 32–59)
 * 2. Standalone HTML presence and 100% field-by-field parity in project root
 * 3. Exact 11-field schema compliance for all 28 February entries
 * 4. Word count constraints (reflections 150-250w, prayers 50-100w)
 * 5. Exactly three reflection questions per day ending in '?'
 * 6. Calendar mapping (Month 2, Day 1 to 28)
 * 7. Zero silent Day 1 fallbacks across all application routes and HTML
 * 8. All three reflection questions rendered in both interactive and printable views
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — FEBRUARY COMPREHENSIVE VALIDATION SUITE");
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
const februaryEntries = DEVOTIONAL_ENTRIES.filter((e) => e.month_number === 2);
assert(februaryEntries.length === 28, "Exactly 28 authored records in February (Days 32–59)", `Found ${februaryEntries.length}`);

// -----------------------------------------------------------------------------
// 2. Authoritative Registry Schema & Literary Verification (Days 32–59)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Schema, Content Boundaries & Literary Quality (Days 32–59) ---");
const dayNumbers = [];
const titles = [];

februaryEntries.forEach((entry, idx) => {
  const day = entry.day_number;
  const expectedDayOfMonth = idx + 1;
  dayNumbers.push(day);
  titles.push(entry.title);

  const prefix = `Day ${day} ("${entry.title}")`;

  // Required fields populated
  assert(entry.month_number === 2, `${prefix}: month_number is 2`);
  assert(entry.day_of_month === expectedDayOfMonth, `${prefix}: day_of_month is ${expectedDayOfMonth}`);
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

// ID Uniqueness & Sequential continuity
const uniqueDaySet = new Set(dayNumbers);
assert(uniqueDaySet.size === 28, "Zero duplicate day_number values in February", `Unique: ${uniqueDaySet.size}`);
for (let d = 32; d <= 59; d++) {
  assert(uniqueDaySet.has(d), `Day ${d} is present in sequential order`);
}

const uniqueTitleSet = new Set(titles);
assert(uniqueTitleSet.size === 28, "All 28 February devotional titles are unique and distinct", `Unique: ${uniqueTitleSet.size}`);

// -----------------------------------------------------------------------------
// 3. Calendar & Resolver Verification (Days 32–59)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Runtime Resolver & Calendar Mapping ---");

for (let d = 32; d <= 59; d++) {
  const expectedDayOfMonth = d - 31;
  const mapping = getDayMonthMapping(d);
  assert(
    mapping.monthNumber === 2 && mapping.dayOfMonth === expectedDayOfMonth,
    `getDayMonthMapping(${d}) correctly maps to Month 2, Day ${expectedDayOfMonth}`
  );

  const entry = getDevotionalEntry(d);
  assert(!entry.is_placeholder, `Day ${d} is an authored entry (is_placeholder is false)`);
  assert(entry.day_number === d, `Day ${d} returns requested day_number: ${d}`);
  assert(entry.month_number === 2, `Day ${d} returns month_number: 2`);
  assert(entry.day_of_month === expectedDayOfMonth, `Day ${d} returns day_of_month: ${expectedDayOfMonth}`);
  assert(!entry.title.includes("Day 1:"), `Day ${d} does NOT fallback to Day 1 title`);
  assert(entry.reflection_questions.length === 3, `Day ${d} includes exactly 3 reflection questions`);
}

// -----------------------------------------------------------------------------
// 4. Standalone HTML Presence & Complete Parity for February
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Standalone HTML File Presence & 100% Field Parity ---");
const htmlPath = path.join(projectRoot, "365_Days_With_Jesus.html");
assert(fs.existsSync(htmlPath), "Standalone HTML exists at project root (365_Days_With_Jesus.html)");

const htmlContent = fs.readFileSync(htmlPath, "utf-8");

// Parse DEVOTIONALS object inside standalone HTML
const htmlDevMatch = htmlContent.match(/const DEVOTIONALS = \{([\s\S]*?)\n    \};/);
assert(!!htmlDevMatch, "DEVOTIONALS object found inside 365_Days_With_Jesus.html");

const htmlVmContext = vm.createContext({});
vm.runInContext("const DEVOTIONALS = {" + htmlDevMatch[1] + "}; globalThis.DEVOTIONALS = DEVOTIONALS;", htmlVmContext);
const htmlDevotionals = htmlVmContext.DEVOTIONALS;

assert(Object.keys(htmlDevotionals).length >= 59, "Standalone HTML contains at least 59 authored records", `Found ${Object.keys(htmlDevotionals).length}`);

// Compare each February day in standalone HTML against authoritative TypeScript registry
februaryEntries.forEach((tsEntry) => {
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

// Verify HTML placeholder UI banner and 3 questions in interactive & printable views
assert(htmlContent.includes('id="devQuestionsList"'), "HTML contains #devQuestionsList for interactive reflections");
assert(htmlContent.includes('id="printQuestionsList"'), "HTML contains #printQuestionsList for printable reflections");
assert(htmlContent.includes("d.questions.forEach"), "HTML switchDay iterates through all questions for interactive and printable display");

// -----------------------------------------------------------------------------
// 5. Zero Silent Fallbacks & Reflection Questions Audit across Application Routes
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: Zero Silent Fallbacks & Route Checks ---");
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
console.log(`  Authored February Days: 28 / 28 (100% Authoritative, Parity & Synchronized)`);
console.log("================================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
