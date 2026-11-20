/**
 * 365 Days With Jesus — October Comprehensive Quality Control & Validation Suite (.mjs)
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — OCTOBER COMPREHENSIVE VALIDATION SUITE");
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

const octoberEntries = entries.filter((e) => e.day_number >= 274 && e.day_number <= 304);
assert(octoberEntries.length === 31, "Exactly 31 authored records in October (Days 274–304)", `Found ${octoberEntries.length}`);

// -----------------------------------------------------------------------------
// 2. Schema, Word Count & Thematic Integrity (Days 274–304)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Schema, Word Count & Thematic Integrity (Days 274–304) ---");

const OCTOBER_SUBTHEMES = {
  274: "Commanded to Be Brave",
  275: "Commanded to Be Brave",
  276: "Commanded to Be Brave",
  277: "Commanded to Be Brave",
  278: "Commanded to Be Brave",
  279: "Commanded to Be Brave",
  280: "Commanded to Be Brave",
  281: "The Courage of Quiet Obedience",
  282: "The Courage of Quiet Obedience",
  283: "The Courage of Quiet Obedience",
  284: "The Courage of Quiet Obedience",
  285: "The Courage of Quiet Obedience",
  286: "The Courage of Quiet Obedience",
  287: "The Courage of Quiet Obedience",
  288: "Standing Firm in Spiritual Armor",
  289: "Standing Firm in Spiritual Armor",
  290: "Standing Firm in Spiritual Armor",
  291: "Standing Firm in Spiritual Armor",
  292: "Standing Firm in Spiritual Armor",
  293: "Standing Firm in Spiritual Armor",
  294: "Standing Firm in Spiritual Armor",
  295: "Courage to Speak Truth in Love",
  296: "Courage to Speak Truth in Love",
  297: "Courage to Speak Truth in Love",
  298: "Courage to Speak Truth in Love",
  299: "Courage to Speak Truth in Love",
  300: "Courage to Speak Truth in Love",
  301: "Courage to Speak Truth in Love",
  302: "Leaving a Legacy of Faithfulness",
  303: "Leaving a Legacy of Faithfulness",
  304: "Leaving a Legacy of Faithfulness"
};

const seenDays = new Set();
const seenTitles = new Set();

for (let d = 274; d <= 304; d++) {
  const entry = octoberEntries.find((e) => e.day_number === d);
  assert(!!entry, `Day ${d} entry exists in registry`);
  if (!entry) continue;

  assert(!seenDays.has(d), `Day ${d} is unique`);
  seenDays.add(d);

  const expectedDOM = d - 273;
  assert(entry.day_of_month === expectedDOM, `Day ${d} day_of_month is ${expectedDOM}`);
  assert(entry.month_number === 10, `Day ${d} month_number is 10`);

  assert(!seenTitles.has(entry.title), `Day ${d} title is unique: "${entry.title}"`);
  seenTitles.add(entry.title);

  const expectedSubtheme = OCTOBER_SUBTHEMES[d];
  assert(
    entry.weekly_subtheme === expectedSubtheme,
    `Day ${d} weekly_subtheme matches "${expectedSubtheme}"`,
    `Got "${entry.weekly_subtheme}"`
  );

  const refWords = entry.reflection_body.trim().split(/\s+/).length;
  assert(
    refWords >= 150 && refWords <= 250,
    `Day ${d} reflection word count in range (150-250w): got ${refWords}w`,
    `Actual: ${refWords}`
  );

  const prayerWords = entry.guided_prayer.trim().split(/\s+/).length;
  assert(
    prayerWords >= 50 && prayerWords <= 100,
    `Day ${d} prayer word count in range (50-100w): got ${prayerWords}w`,
    `Actual: ${prayerWords}`
  );

  assert(Array.isArray(entry.reflection_questions), `Day ${d} reflection_questions is array`);
  assert(entry.reflection_questions.length === 3, `Day ${d} has exactly 3 reflection questions`);
  entry.reflection_questions.forEach((q, idx) => {
    assert(
      typeof q === "string" && q.trim().endsWith("?"),
      `Day ${d} question ${idx + 1} ends with '?'`
    );
  });

  assert(typeof entry.daily_intention === "string" && entry.daily_intention.length > 10, `Day ${d} daily_intention valid`);
  assert(typeof entry.practical_action === "string" && entry.practical_action.length > 10, `Day ${d} practical_action valid`);
  assert(
    typeof entry.evening_reflection_prompt === "string" && entry.evening_reflection_prompt.trim().endsWith("?"),
    `Day ${d} evening prompt ends with '?'`
  );

  assert(entry.scripture_translation === "World English Bible (WEB)", `Day ${d} translation is World English Bible (WEB)`);
  assert(typeof entry.scripture_primary_reference === "string" && entry.scripture_primary_reference.length > 0, `Day ${d} scripture reference present: "${entry.scripture_primary_reference}"`);
  assert(typeof entry.scripture_primary_text === "string" && entry.scripture_primary_text.length > 0, `Day ${d} scripture text present`);
}

// -----------------------------------------------------------------------------
// 3. Calendar & Boundary Verification
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Calendar & Boundary Verification ---");
assert(seenDays.size === 31, "All 31 October days present with zero gaps");
assert(seenTitles.size === 31, "All 31 October titles are distinct");

// -----------------------------------------------------------------------------
// 4. Standalone HTML Synchronisation & Field-by-Field Parity
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Standalone HTML Synchronisation & Parity (Project & Parent) ---");

const projectHtmlPath = path.join(projectRoot, "365_Days_With_Jesus.html");
const parentHtmlPath = path.resolve(path.join(projectRoot, "..", "365_Days_With_Jesus.html"));

assert(fs.existsSync(projectHtmlPath), "Project HTML file exists (365_Days_With_Jesus.html)");
assert(fs.existsSync(parentHtmlPath), "Parent HTML file exists (../365_Days_With_Jesus.html)");

const projectHtml = fs.readFileSync(projectHtmlPath, "utf-8");
const parentHtml = fs.readFileSync(parentHtmlPath, "utf-8");

const jsonMatch = projectHtml.match(/const\s+DEVOTIONALS\s*=\s*(\{[\s\S]*?\n\s*\});/);
assert(!!jsonMatch, "DEVOTIONALS object matched in Project HTML");

let HTML_DEVOTIONALS = {};
try {
  HTML_DEVOTIONALS = JSON.parse(jsonMatch[1]);
} catch (e) {
  const sandbox = {};
  vm.runInNewContext("DEVOTIONALS = " + jsonMatch[1], sandbox);
  HTML_DEVOTIONALS = sandbox.DEVOTIONALS;
}

assert(typeof HTML_DEVOTIONALS === "object" && HTML_DEVOTIONALS !== null, "HTML DEVOTIONALS parsed into object");

for (let d = 274; d <= 304; d++) {
  const tsEntry = octoberEntries.find((e) => e.day_number === d);
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

assert(projectHtml === parentHtml, "Project HTML and Parent HTML are 100% identical (0 bytes drift)");

// -----------------------------------------------------------------------------
// 5. Zero Silent Fallbacks & Route Checks
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: Zero Silent Fallbacks & Route Checks ---");

const routeDevotional = path.join(projectRoot, "src/app/devotional/[day]/page.tsx");
assert(fs.existsSync(routeDevotional), "Route file exists: src/app/devotional/[day]/page.tsx");
const routeDevotionalCode = fs.readFileSync(routeDevotional, "utf-8");
assert(routeDevotionalCode.includes("getDevotionalEntry(dayNumber)"), "src/app/devotional/[day]/page.tsx calls resolver via getDevotionalEntry(dayNumber)");
assert(!routeDevotionalCode.includes("DEVOTIONAL_ENTRIES[0]"), "src/app/devotional/[day]/page.tsx contains ZERO silent Day 1 fallback");
assert(routeDevotionalCode.includes("entry.reflection_questions.map"), "src/app/devotional/[day]/page.tsx renders all 3 reflection questions via entry.reflection_questions.map");

const routePrintables = path.join(projectRoot, "src/app/printables/[day]/page.tsx");
assert(fs.existsSync(routePrintables), "Route file exists: src/app/printables/[day]/page.tsx");
const routePrintablesCode = fs.readFileSync(routePrintables, "utf-8");
assert(routePrintablesCode.includes("getDevotionalEntry(dayNumber)"), "src/app/printables/[day]/page.tsx calls resolver via getDevotionalEntry(dayNumber)");
assert(!routePrintablesCode.includes("DEVOTIONAL_ENTRIES[0]"), "src/app/printables/[day]/page.tsx contains ZERO silent Day 1 fallback");
assert(routePrintablesCode.includes("entry.reflection_questions.map"), "src/app/printables/[day]/page.tsx renders all 3 reflection questions via entry.reflection_questions.map");

const routeHome = path.join(projectRoot, "src/app/page.tsx");
assert(fs.existsSync(routeHome), "Route file exists: src/app/page.tsx");
const routeHomeCode = fs.readFileSync(routeHome, "utf-8");
assert(routeHomeCode.includes("getDevotionalEntry(1)"), "src/app/page.tsx calls resolver via getDevotionalEntry(1)");
assert(!routeHomeCode.includes("DEVOTIONAL_ENTRIES[0]"), "src/app/page.tsx contains ZERO silent Day 1 fallback");

assert(!projectHtml.includes("DEVOTIONALS[1] ||"), "HTML switchDay contains ZERO silent Day 1 fallback");

console.log("\n================================================================================");
console.log(`  FINAL VALIDATION RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored October Days: ${octoberEntries.length} / 31 (100% Authoritative, Parity & Synchronized)`);
console.log("================================================================================\n");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
