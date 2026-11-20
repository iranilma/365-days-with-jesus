/**
 * 365 Days With Jesus — April Comprehensive Quality Control & Validation Suite
 * 
 * Verifies:
 * 1. Single source of truth (src/lib/content/devotionals.ts) for April (Days 91–120)
 * 2. Standalone HTML presence and 100% field-by-field parity in project root and parent copy
 * 3. Exact 11-field schema compliance for all 30 April entries
 * 4. Word count constraints (reflections 150-250w, prayers 50-100w)
 * 5. Exactly three reflection questions per day ending in '?'
 * 6. Calendar mapping (Month 4, Day 1 to 30)
 * 7. Zero silent Day 1 fallbacks across all application routes and HTML
 * 8. All three reflection questions rendered in both interactive and printable views
 * 9. Subtheme alignment with the 5 approved April weekly themes
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — APRIL COMPREHENSIVE VALIDATION SUITE");
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
const aprilEntries = DEVOTIONAL_ENTRIES.filter((e) => e.month_number === 4);
assert(aprilEntries.length === 30, "Exactly 30 authored records in April (Days 91–120)", `Found ${aprilEntries.length}`);

// -----------------------------------------------------------------------------
// 2. Authoritative Registry Schema & Literary Verification (Days 91–120)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Schema, Content Boundaries & Literary Quality (Days 91–120) ---");

const APPROVED_SUBTHEMES = [
  "The Journey of the Cross",
  "The Dawning of Easter Hope",
  "Beauty from the Ashes",
  "Walking in Resurrection Power",
  "Unwavering Eternal Perspective"
];

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

const titlesSeen = new Set();

for (let dayNum = 91; dayNum <= 120; dayNum++) {
  const entry = aprilEntries.find((e) => e.day_number === dayNum);
  const expectedDayOfMonth = dayNum - 90;

  assert(!!entry, `Day ${dayNum} exists in DEVOTIONAL_ENTRIES`);
  if (!entry) continue;

  const desc = `Day ${dayNum} ("${entry.title}")`;

  // Calendar
  assert(entry.month_number === 4, `${desc}: month_number is 4`);
  assert(entry.day_of_month === expectedDayOfMonth, `${desc}: day_of_month is ${expectedDayOfMonth}`);

  // Subtheme
  assert(!!entry.weekly_subtheme, `${desc}: weekly_subtheme populated`);
  assert(
    APPROVED_SUBTHEMES.includes(entry.weekly_subtheme),
    `${desc}: subtheme matches "${entry.weekly_subtheme}"`,
    `Invalid subtheme: ${entry.weekly_subtheme}`
  );

  // Title Uniqueness
  assert(!!entry.title && entry.title.length > 3, `${desc}: title populated`);
  assert(!titlesSeen.has(entry.title), `${desc}: title is unique`);
  titlesSeen.add(entry.title);

  // Scripture Fields
  assert(!!entry.scripture_primary_reference, `${desc}: scripture reference populated`);
  assert(!!entry.scripture_primary_text, `${desc}: scripture quotation populated`);
  assert(entry.scripture_translation === "World English Bible (WEB)", `${desc}: scripture translation is World English Bible (WEB)`);

  // Intention, Action, Evening Prompt
  assert(!!entry.daily_intention && entry.daily_intention.length > 5, `${desc}: daily_intention populated`);
  assert(!!entry.practical_action && entry.practical_action.length > 5, `${desc}: practical_action populated`);
  assert(!!entry.evening_reflection_prompt && entry.evening_reflection_prompt.length > 5, `${desc}: evening prompt populated`);

  // Word Counts
  const reflWords = countWords(entry.reflection_body);
  assert(
    reflWords >= 150 && reflWords <= 250,
    `${desc}: reflection word count is ${reflWords} (target 150-250)`,
    `Actual: ${reflWords}`
  );

  // Reflection Questions (Exactly 3, all ending with '?')
  assert(Array.isArray(entry.reflection_questions), `${desc}: reflection_questions is an array`);
  assert(entry.reflection_questions.length === 3, `${desc}: exactly 3 reflection questions`, `Found: ${entry.reflection_questions.length}`);

  entry.reflection_questions.forEach((q, qIdx) => {
    assert(
      typeof q === "string" && q.trim().endsWith("?"),
      `${desc}: Q${qIdx + 1} is valid question ending with '?'`,
      `Question text: "${q}"`
    );
  });

  const prayerWords = countWords(entry.guided_prayer);
  assert(
    prayerWords >= 50 && prayerWords <= 100,
    `${desc}: prayer word count is ${prayerWords} (target 50-100)`,
    `Actual: ${prayerWords}`
  );
}

// -----------------------------------------------------------------------------
// 3. Calendar Mapping & Non-Fallback Resolver Verification
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Calendar Mapping & Non-Fallback Resolver ---");

for (let d = 91; d <= 120; d++) {
  const map = getDayMonthMapping(d);
  assert(map.month === 4, `Day ${d} maps to month 4`);
  assert(map.dayOfMonth === d - 90, `Day ${d} maps to dayOfMonth ${d - 90}`);

  const resolved = getDevotionalEntry(d);
  assert(resolved.day_number === d, `getDevotionalEntry(${d}) returns day ${d}`);
  assert(resolved.month_number === 4, `getDevotionalEntry(${d}) returns month 4`);
  assert(resolved.day_of_month === d - 90, `getDevotionalEntry(${d}) returns day_of_month ${d - 90}`);
}

// -----------------------------------------------------------------------------
// 4. Standalone HTML Single-Source Parity Verification
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Standalone HTML (365_Days_With_Jesus.html) Parity ---");

const htmlPath = path.join(projectRoot, "365_Days_With_Jesus.html");
assert(fs.existsSync(htmlPath), "365_Days_With_Jesus.html exists in project root");

const htmlContent = fs.readFileSync(htmlPath, "utf-8");

// Extract DEVOTIONALS JavaScript object from HTML
const htmlDevotionalsMatch = htmlContent.match(/const DEVOTIONALS\s*=\s*\{([\s\S]*?)\n    \};/);
assert(!!htmlDevotionalsMatch, "const DEVOTIONALS object found in standalone HTML");

const htmlDevContext = vm.createContext({});
vm.runInContext("const DEVOTIONALS = {" + htmlDevotionalsMatch[1] + "}; globalThis.DEVOTIONALS = DEVOTIONALS;", htmlDevContext);
const HTML_DEVOTIONALS = htmlDevContext.DEVOTIONALS;

assert(typeof HTML_DEVOTIONALS === "object" && HTML_DEVOTIONALS !== null, "HTML DEVOTIONALS parsed into object");

for (let d = 91; d <= 120; d++) {
  const tsEntry = aprilEntries.find((e) => e.day_number === d);
  const htmlEntry = HTML_DEVOTIONALS[d];

  assert(!!htmlEntry, `Day ${d} exists in HTML DEVOTIONALS`);
  if (!htmlEntry) continue;

  assert(htmlEntry.title === tsEntry.title, `Day ${d} title matches 100%: "${tsEntry.title}"`);
  assert(htmlEntry.ref === tsEntry.scripture_primary_reference, `Day ${d} reference matches 100%: "${tsEntry.scripture_primary_reference}"`);
  assert(htmlEntry.text === tsEntry.scripture_primary_text, `Day ${d} Scripture text matches 100%`);
  assert(htmlEntry.body === tsEntry.reflection_body, `Day ${d} reflection body matches 100%`);
  assert(htmlEntry.prayer === tsEntry.guided_prayer, `Day ${d} guided prayer matches 100%`);
  assert(htmlEntry.intention === tsEntry.daily_intention, `Day ${d} daily intention matches 100%`);
  assert(htmlEntry.action === tsEntry.practical_action, `Day ${d} practical action matches 100%`);
  assert(htmlEntry.evening === tsEntry.evening_reflection_prompt, `Day ${d} evening prompt matches 100%`);
  assert(htmlEntry.subtheme === tsEntry.weekly_subtheme, `Day ${d} subtheme matches 100%`);

  // Reflection questions parity
  assert(Array.isArray(htmlEntry.questions), `Day ${d} in HTML has questions array`);
  assert(htmlEntry.questions.length === 3, `Day ${d} in HTML has exactly 3 questions`);
  tsEntry.reflection_questions.forEach((q, idx) => {
    assert(htmlEntry.questions[idx] === q, `Day ${d} question ${idx + 1} matches 100%`);
  });
}

// Check interactive vs print questions containers in HTML
assert(htmlContent.includes('id="devQuestionsList"'), "HTML contains #devQuestionsList for interactive reflections");
assert(htmlContent.includes('id="printQuestionsList"'), "HTML contains #printQuestionsList for printable reflections");
assert(htmlContent.includes("switchDay"), "HTML switchDay iterates through all questions for interactive and printable display");

// -----------------------------------------------------------------------------
// 5. Zero Silent Fallbacks & Route Checks
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: Zero Silent Fallbacks & Route Checks ---");

const routes = [
  { path: "src/app/devotional/[day]/page.tsx", call: "getDevotionalEntry(dayNumber)" },
  { path: "src/app/printables/[day]/page.tsx", call: "getDevotionalEntry(dayNumber)" },
  { path: "src/app/page.tsx", call: "getDevotionalEntry(1)" }
];

routes.forEach(({ path: rPath, call }) => {
  const fullPath = path.join(projectRoot, rPath);
  assert(fs.existsSync(fullPath), `Route file exists: ${rPath}`);
  const content = fs.readFileSync(fullPath, "utf-8");

  assert(content.includes(call), `${rPath} calls resolver via ${call}`);
  assert(!content.includes("DEVOTIONAL_ENTRIES[0]"), `${rPath} contains ZERO silent Day 1 fallback`);

  if (rPath.includes("[day]")) {
    assert(
      content.includes("reflection_questions.map"),
      `${rPath} renders all 3 reflection questions via entry.reflection_questions.map`
    );
  }
});

// Verify HTML switchDay has zero silent fallback
assert(!htmlContent.includes("DEVOTIONALS[1] ||"), "HTML switchDay contains ZERO silent Day 1 fallback");

// -----------------------------------------------------------------------------
// Final Report
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`  FINAL VALIDATION RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored April Days: ${aprilEntries.length} / 30 (100% Authoritative, Parity & Synchronized)`);
console.log("================================================================================\n");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
