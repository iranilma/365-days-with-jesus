/**
 * 365 Days With Jesus — Full Year (365 Days) Comprehensive Validation Suite (.mjs)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — FULL YEAR (DAYS 1–365) COMPREHENSIVE VALIDATION SUITE");
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

// Read devotionals.ts
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
const content = fs.readFileSync(devotionalsPath, "utf-8");

// Extract DEVOTIONAL_ENTRIES array by importing or parsing
// Since it's TypeScript, let's parse via regex / extraction
const entryRegex = /\{\s*day_number:\s*(\d+),[\s\S]*?\n  \}/g;
const matches = [...content.matchAll(entryRegex)];

assert(matches.length === 365, "Exactly 365 devotional entries found in devotionals.ts", `Found ${matches.length}`);

const DAYS_IN_MONTH = {
  1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
  7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

const seenDays = new Set();
const seenTitles = new Set();
let allReflectionsValid = true;
let allPrayersValid = true;
let allQuestionsValid = true;
let allDatesValid = true;
let allTranslationsValid = true;
let allActionItemsValid = true;

for (let i = 0; i < matches.length; i++) {
  const block = matches[i][0];
  const day = parseInt(block.match(/day_number:\s*(\d+)/)[1], 10);
  const month = parseInt(block.match(/month_number:\s*(\d+)/)[1], 10);
  const dom = parseInt(block.match(/day_of_month:\s*(\d+)/)[1], 10);
  const title = block.match(/title:\s*"([^"]+)"/)[1];
  const translation = block.match(/scripture_translation:\s*"([^"]+)"/)[1];
  const intn = block.match(/daily_intention:\s*"([^"]+)"/)[1];
  const act = block.match(/practical_action:\s*"([^"]+)"/)[1];
  const eve = block.match(/evening_reflection_prompt:\s*"([^"]+)"/)[1];

  // Reflection body
  const reflMatch = block.match(/reflection_body:\s*"([\s\S]*?)",\s*\n\s*reflection_questions:/);
  const reflText = JSON.parse(`"${reflMatch[1]}"`);
  const rw = reflText.trim().split(/\s+/).length;

  // Prayer
  const prayerMatch = block.match(/guided_prayer:\s*"([\s\S]*?)",\s*\n\s*daily_intention:/);
  const prayerText = JSON.parse(`"${prayerMatch[1]}"`);
  const pw = prayerText.trim().split(/\s+/).length;

  // Questions
  const qsMatch = block.match(/reflection_questions:\s*(\[[\s\S]*?\]),\s*\n\s*guided_prayer:/);
  // Parse questions handling any trailing comma
  const qsClean = qsMatch[1].replace(/,\s*\]/, "]");
  const qs = JSON.parse(qsClean);

  // Day sequence
  if (seenDays.has(day)) {
    assert(false, `Day ${day} is duplicate`);
  }
  seenDays.add(day);

  // Title uniqueness
  if (seenTitles.has(title)) {
    assert(false, `Title '${title}' is duplicate on day ${day}`);
  }
  seenTitles.add(title);

  // Calendar
  if (month < 1 || month > 12 || dom < 1 || dom > DAYS_IN_MONTH[month]) {
    allDatesValid = false;
    assert(false, `Day ${day} has invalid date ${month}/${dom}`);
  }

  // Translation
  if (translation !== "World English Bible (WEB)") {
    allTranslationsValid = false;
    assert(false, `Day ${day} has invalid translation '${translation}'`);
  }

  // Word counts
  if (rw < 150 || rw > 250) {
    allReflectionsValid = false;
    assert(false, `Day ${day} reflection word count ${rw} outside [150, 250]`);
  }

  if (pw < 50 || pw > 100) {
    allPrayersValid = false;
    assert(false, `Day ${day} prayer word count ${pw} outside [50, 100]`);
  }

  // Questions
  if (qs.length !== 3) {
    allQuestionsValid = false;
    assert(false, `Day ${day} must have exactly 3 questions, found ${qs.length}`);
  }
  for (const q of qs) {
    if (!q.trim().endsWith("?")) {
      allQuestionsValid = false;
      assert(false, `Day ${day} question '${q}' must end with '?'`);
    }
  }

  // Actions
  if (!intn || intn.length < 10 || !act || act.length < 10 || !eve || eve.length < 10) {
    allActionItemsValid = false;
    assert(false, `Day ${day} has missing or incomplete action items`);
  }
}

assert(seenDays.size === 365, "All 365 days (1 to 365) are present and unique");
assert(seenTitles.size === 365, "All 365 titles are 100% unique across the entire year");
assert(allDatesValid, "All 365 dates correctly match month and day_of_month bounds");
assert(allTranslationsValid, "All 365 entries use 'World English Bible (WEB)'");
assert(allReflectionsValid, "All 365 reflection bodies strictly between 150 and 250 words");
assert(allPrayersValid, "All 365 guided prayers strictly between 50 and 100 words");
assert(allQuestionsValid, "Every single day has exactly 3 reflection questions ending with '?'");
assert(allActionItemsValid, "All 365 entries have daily intention, practical action, and evening prompt");

// Verify monthly distribution counts
for (let m = 1; m <= 12; m++) {
  const monthDays = matches.filter(b => parseInt(b[0].match(/month_number:\s*(\d+)/)[1], 10) === m);
  assert(monthDays.length === DAYS_IN_MONTH[m], `Month ${m} has exactly ${DAYS_IN_MONTH[m]} devotionals`);
}

console.log("\n================================================================================");
console.log(`  FULL YEAR VALIDATION SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Total Devotionals Authored: ${seenDays.size} / 365`);
console.log(`  Unique Titles: ${seenTitles.size} / 365`);
console.log("================================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
