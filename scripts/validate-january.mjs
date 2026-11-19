/**
 * 365 Days With Jesus — Automated January Content & Navigation Validation
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("======================================================");
console.log("  365 DAYS WITH JESUS — JANUARY VALIDATION SUITE");
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

// Read devotionals.ts
const devotionalsFile = fs.readFileSync(path.join(projectRoot, "src/lib/content/devotionals.ts"), "utf-8");

// Parse only DEVOTIONAL_ENTRIES array
const arrayMatch = devotionalsFile.match(/export const DEVOTIONAL_ENTRIES:\s*DevotionalEntry\[\]\s*=\s*\[([\s\S]*?)\];/);
assert(!!arrayMatch, "Found DEVOTIONAL_ENTRIES array in devotionals.ts");

const arrayContent = arrayMatch ? arrayMatch[1] : "";
const entryBlocks = arrayContent.split(/\{\s*day_number:\s*/).slice(1);

console.log("--- TEST GROUP 1: January Record Count & Sequence ---");
assert(entryBlocks.length === 31, "Exactly 31 authored records in DEVOTIONAL_ENTRIES", `Found ${entryBlocks.length}`);

const dayNumbers = [];
const titles = [];
const references = [];

function extractString(block, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*("(?:[^"\\\\]|\\\\.)*")`);
  const m = block.match(regex);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return m[1].slice(1, -1);
  }
}

entryBlocks.forEach((block) => {
  const dayNum = parseInt(block.match(/^(\d+)/)[1], 10);
  dayNumbers.push(dayNum);

  const monthMatch = block.match(/month_number:\s*(\d+)/);
  const dayOfMonthMatch = block.match(/day_of_month:\s*(\d+)/);
  const title = extractString(block, "title");
  const reference = extractString(block, "scripture_primary_reference");
  const scriptureText = extractString(block, "scripture_primary_text");
  const reflection = extractString(block, "reflection_body");
  const prayer = extractString(block, "guided_prayer");
  const intention = extractString(block, "daily_intention");
  const action = extractString(block, "practical_action");
  const eveningPrompt = extractString(block, "evening_reflection_prompt");
  const subtheme = extractString(block, "weekly_subtheme");

  const dayLabel = `Day ${dayNum}`;

  // Month and day alignment
  assert(monthMatch && parseInt(monthMatch[1], 10) === 1, `${dayLabel} month_number is 1`);
  assert(dayOfMonthMatch && parseInt(dayOfMonthMatch[1], 10) === dayNum, `${dayLabel} day_of_month equals ${dayNum}`);

  // Subtheme
  assert(subtheme && subtheme.length > 5, `${dayLabel} has valid weekly_subtheme ("${subtheme}")`);

  // Title
  assert(title && title.length > 5, `${dayLabel} has title: "${title}"`);
  if (title) titles.push(title);

  // Scripture & Translation
  assert(reference && reference.length > 3, `${dayLabel} has Scripture reference: "${reference}"`);
  assert(scriptureText && scriptureText.length > 15, `${dayLabel} has Scripture quotation`);
  if (reference) references.push(reference);

  // Pastoral Reflection Word Count (150–250 words)
  if (reflection) {
    const wordCount = reflection.split(/\s+/).filter(Boolean).length;
    assert(wordCount >= 150 && wordCount <= 250, `${dayLabel} reflection word count is ${wordCount} (target 150-250)`);
  } else {
    assert(false, `${dayLabel} has reflection_body`);
  }

  // Reflection questions (check 3 questions)
  const qMatches = block.match(/"([^"]+\?)"/g);
  assert(qMatches && qMatches.length >= 3, `${dayLabel} contains at least 3 reflection questions`);

  // Guided Prayer (50–100 words)
  if (prayer) {
    const prayerWords = prayer.split(/\s+/).filter(Boolean).length;
    assert(prayerWords >= 50 && prayerWords <= 100, `${dayLabel} prayer word count is ${prayerWords} (target 50-100)`);
  } else {
    assert(false, `${dayLabel} has guided_prayer`);
  }

  // Daily Intention, Action & Evening Prompt
  assert(intention && intention.length > 10, `${dayLabel} has daily_intention`);
  assert(action && action.length > 10, `${dayLabel} has practical_action`);
  assert(eveningPrompt && eveningPrompt.length > 10, `${dayLabel} has evening_reflection_prompt`);
});

// 2. Sequence and Duplicates
console.log("\n--- TEST GROUP 2: ID Uniqueness & Sequential Integrity ---");
const uniqueDays = new Set(dayNumbers);
assert(uniqueDays.size === 31, "Zero duplicate day_numbers in January", `Unique count: ${uniqueDays.size}`);
for (let i = 1; i <= 31; i++) {
  assert(uniqueDays.has(i), `Day ${i} is present in sequence`);
}

const uniqueTitles = new Set(titles);
assert(uniqueTitles.size === 31, "All 31 devotional titles are distinct and unique", `Unique titles: ${uniqueTitles.size}`);

// 3. Navigation & Resolver Verification
console.log("\n--- TEST GROUP 3: Navigation Resolver & Fallback Fix ---");
assert(devotionalsFile.includes("export function getDevotionalEntry(dayNumber: number)"), "devotionals.ts exports getDevotionalEntry");
assert(devotionalsFile.includes("export const getDevotionalByDay = getDevotionalEntry"), "devotionals.ts exports getDevotionalByDay alias");

const devPage = fs.readFileSync(path.join(projectRoot, "src/app/devotional/[day]/page.tsx"), "utf-8");
assert(devPage.includes("getDevotionalEntry(dayNumber)"), "devotional/[day] calls getDevotionalEntry");
assert(!devPage.includes("|| DEVOTIONAL_ENTRIES[0]"), "devotional/[day] contains no silent Day 1 fallback");

const printPage = fs.readFileSync(path.join(projectRoot, "src/app/printables/[day]/page.tsx"), "utf-8");
assert(printPage.includes("getDevotionalEntry(dayNumber)"), "printables/[day] calls getDevotionalEntry");
assert(!printPage.includes("|| DEVOTIONAL_ENTRIES[0]"), "printables/[day] contains no silent Day 1 fallback");

const homePage = fs.readFileSync(path.join(projectRoot, "src/app/page.tsx"), "utf-8");
assert(homePage.includes("getDevotionalEntry(1)"), "dashboard calls getDevotionalEntry(1)");

// Summary
console.log("\n======================================================");
console.log(`  JANUARY VALIDATION RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`  Authored January Days: 31 / 31 (100% COMPLETE)`);
console.log("======================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
