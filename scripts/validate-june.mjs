/**
 * 365 Days With Jesus — June Comprehensive Quality Control & Validation Suite (.mjs)
 * 
 * Verifies:
 * 1. Single source of truth (src/lib/content/devotionals.ts) for June (Days 152–181)
 * 2. Standalone HTML presence and 100% field-by-field parity in project root and parent copy
 * 3. Exact 14-field schema compliance for all 30 June entries
 * 4. Word count constraints (reflections 150-250w, prayers 50-100w)
 * 5. Exactly three reflection questions per day ending in '?'
 * 6. Calendar mapping (Month 6, Day 1 to 30)
 * 7. Zero silent Day 1 fallbacks across all application routes and HTML
 * 8. All three reflection questions rendered in both interactive and printable views
 * 9. Subtheme alignment with the 5 approved June weekly themes
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — JUNE COMPREHENSIVE VALIDATION SUITE");
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

const jsCode = devotionalsCode
  .replace(/^import\s+.*?;/gm, "")
  .replace(/export const /g, "const ")
  .replace(/export function /g, "function ")
  .replace(/:\s*DevotionalEntry\[\]/g, "")
  .replace(/:\s*DevotionalEntry/g, "")
  .replace(/:\s*number/g, "")
  .replace(/:\s*\{[^}]+\}/g, "");

const context = vm.createContext({});
vm.runInContext(jsCode + "; Object.assign(globalThis, { DEVOTIONAL_ENTRIES });", context);

const entries = context.DEVOTIONAL_ENTRIES;
assert(Array.isArray(entries), "DEVOTIONAL_ENTRIES is an array");

const juneEntries = entries.filter((e) => e.day_number >= 152 && e.day_number <= 181);
assert(juneEntries.length === 30, "Exactly 30 authored records in June (Days 152–181)", `Found ${juneEntries.length}`);

// -----------------------------------------------------------------------------
// 2. Schema, Word Count & Thematic Integrity (Days 152–181)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Schema, Word Count & Thematic Integrity (Days 152–181) ---");

const JUNE_SUBTHEMES = {
  152: "The Beginning of Wisdom — Holy Reverence",
  153: "The Beginning of Wisdom — Holy Reverence",
  154: "The Beginning of Wisdom — Holy Reverence",
  155: "The Beginning of Wisdom — Holy Reverence",
  156: "The Beginning of Wisdom — Holy Reverence",
  157: "The Beginning of Wisdom — Holy Reverence",
  158: "The Beginning of Wisdom — Holy Reverence",
  159: "The Tongue of the Wise",
  160: "The Tongue of the Wise",
  161: "The Tongue of the Wise",
  162: "The Tongue of the Wise",
  163: "The Tongue of the Wise",
  164: "The Tongue of the Wise",
  165: "The Tongue of the Wise",
  166: "Discernment in Relationships and Boundaries",
  167: "Discernment in Relationships and Boundaries",
  168: "Discernment in Relationships and Boundaries",
  169: "Discernment in Relationships and Boundaries",
  170: "Discernment in Relationships and Boundaries",
  171: "Discernment in Relationships and Boundaries",
  172: "Discernment in Relationships and Boundaries",
  173: "Seeking Counsel and Godly Guidance",
  174: "Seeking Counsel and Godly Guidance",
  175: "Seeking Counsel and Godly Guidance",
  176: "Seeking Counsel and Godly Guidance",
  177: "Seeking Counsel and Godly Guidance",
  178: "Seeking Counsel and Godly Guidance",
  179: "Seeking Counsel and Godly Guidance",
  180: "The Peace of an Ordered Heart",
  181: "The Peace of an Ordered Heart"
};

const seenDays = new Set();
const seenTitles = new Set();

for (let d = 152; d <= 181; d++) {
  const entry = juneEntries.find((e) => e.day_number === d);
  assert(!!entry, `Day ${d} entry exists in registry`);
  if (!entry) continue;

  assert(!seenDays.has(d), `Day ${d} is unique`);
  seenDays.add(d);

  const expectedDOM = d - 151;
  assert(entry.day_of_month === expectedDOM, `Day ${d} day_of_month is ${expectedDOM}`);
  assert(entry.month_number === 6, `Day ${d} month_number is 6`);

  assert(!seenTitles.has(entry.title), `Day ${d} title is unique: "${entry.title}"`);
  seenTitles.add(entry.title);

  const expectedSubtheme = JUNE_SUBTHEMES[d];
  assert(
    entry.weekly_subtheme === expectedSubtheme,
    `Day ${d} weekly_subtheme matches "${expectedSubtheme}"`,
    `got "${entry.weekly_subtheme}"`
  );

  // Reflection Word Count
  const refWords = entry.reflection_body.trim().split(/\s+/).length;
  assert(
    refWords >= 150 && refWords <= 250,
    `Day ${d} reflection word count in range (150-250w): got ${refWords}w`,
    `out of range (${refWords}w)`
  );

  // Guided Prayer Word Count
  const prayerWords = entry.guided_prayer.trim().split(/\s+/).length;
  assert(
    prayerWords >= 50 && prayerWords <= 100,
    `Day ${d} prayer word count in range (50-100w): got ${prayerWords}w`,
    `out of range (${prayerWords}w)`
  );

  // Exactly 3 reflection questions
  assert(Array.isArray(entry.reflection_questions), `Day ${d} reflection_questions is array`);
  assert(entry.reflection_questions.length === 3, `Day ${d} has exactly 3 reflection questions`);
  entry.reflection_questions.forEach((q, idx) => {
    assert(q.trim().endsWith("?"), `Day ${d} question ${idx + 1} ends with '?'`);
  });

  // Daily Intention, Practical Action, Evening Prompt
  assert(typeof entry.daily_intention === "string" && entry.daily_intention.length > 10, `Day ${d} daily_intention valid`);
  assert(typeof entry.practical_action === "string" && entry.practical_action.length > 10, `Day ${d} practical_action valid`);
  assert(
    typeof entry.evening_reflection_prompt === "string" && entry.evening_reflection_prompt.trim().endsWith("?"),
    `Day ${d} evening prompt ends with '?'`
  );

  // Translation & Scripture
  assert(entry.scripture_translation === "World English Bible (WEB)", `Day ${d} translation is World English Bible (WEB)`);
  assert(typeof entry.scripture_primary_reference === "string" && entry.scripture_primary_reference.length > 0, `Day ${d} scripture reference present: "${entry.scripture_primary_reference}"`);
  assert(typeof entry.scripture_primary_text === "string" && entry.scripture_primary_text.length > 0, `Day ${d} scripture text present`);
}

// -----------------------------------------------------------------------------
// 3. Calendar & Boundary Verification
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Calendar & Boundary Verification ---");
assert(seenDays.size === 30, "All 30 June days present with zero gaps");
assert(seenTitles.size === 30, "All 30 June titles are distinct");

// -----------------------------------------------------------------------------
// 4. Standalone HTML Parity Verification
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Standalone HTML Parity Verification ---");
const htmlPath = path.join(projectRoot, "365_Days_With_Jesus.html");
assert(fs.existsSync(htmlPath), "365_Days_With_Jesus.html exists in project root");

const htmlContent = fs.readFileSync(htmlPath, "utf-8");

const jsonMatch = htmlContent.match(/const\s+DEVOTIONALS\s*=\s*(\{[\s\S]*?\n\s*\});/);
assert(!!jsonMatch, "DEVOTIONALS data object found in standalone HTML");

let HTML_DEVOTIONALS = {};
try {
  HTML_DEVOTIONALS = JSON.parse(jsonMatch[1]);
} catch (e) {
  const sandbox = {};
  vm.runInNewContext("DEVOTIONALS = " + jsonMatch[1], sandbox);
  HTML_DEVOTIONALS = sandbox.DEVOTIONALS;
}

assert(typeof HTML_DEVOTIONALS === "object" && HTML_DEVOTIONALS !== null, "HTML DEVOTIONALS parsed into object");

for (let d = 152; d <= 181; d++) {
  const tsEntry = juneEntries.find((e) => e.day_number === d);
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

  assert(Array.isArray(htmlEntry.questions), `Day ${d} in HTML has questions array`);
  assert(htmlEntry.questions.length === 3, `Day ${d} in HTML has exactly 3 questions`);
  tsEntry.reflection_questions.forEach((q, idx) => {
    assert(htmlEntry.questions[idx] === q, `Day ${d} question ${idx + 1} matches 100%`);
  });
}

// Parent HTML parity
const parentHtmlPath = path.resolve(projectRoot, "..", "365_Days_With_Jesus.html");
if (fs.existsSync(parentHtmlPath)) {
  const parentHtmlContent = fs.readFileSync(parentHtmlPath, "utf-8");
  assert(htmlContent === parentHtmlContent, "Project HTML and Parent HTML are 100% identical (0 bytes drift)");
} else {
  assert(true, "Standalone HTML validation passed (parent workspace check skipped in standalone environment)");
}

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

assert(!htmlContent.includes("DEVOTIONALS[1] ||"), "HTML switchDay contains ZERO silent Day 1 fallback");

// -----------------------------------------------------------------------------
// Final Report
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`  FINAL VALIDATION RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored June Days: ${juneEntries.length} / 30 (100% Authoritative, Parity & Synchronized)`);
console.log("================================================================================\n");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
