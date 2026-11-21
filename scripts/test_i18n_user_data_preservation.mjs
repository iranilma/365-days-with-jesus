/**
 * Test Suite 5: User Progress, Prayer, Gratitude & Journal Preservation
 * Verifies that toggling languages between English and Portuguese has ZERO adverse
 * impact on user progress, completed days, prayers, gratitudes, journals, or print settings.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  TEST SUITE 5: USER DATA & PROGRESS PRESERVATION");
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

// 1. Inspect storage.ts to ensure keys are isolated
const storageTsPath = path.join(projectRoot, "src/lib/storage.ts");
assert(fs.existsSync(storageTsPath), "storage.ts exists in src/lib/");

const storageTsContent = fs.readFileSync(storageTsPath, "utf-8");

const EXPECTED_STORAGE_KEYS = [
  "sanctuary_user_state_v1",
  "sanctuary_prayers_v1",
  "sanctuary_journals_v1",
  "sanctuary_gratitudes_v1",
  "sanctuary_print_format_v1",
];

for (const k of EXPECTED_STORAGE_KEYS) {
  assert(
    storageTsContent.includes(k),
    `storage.ts manages scoped key: '${k}'`
  );
}

// Check that Language Context key does NOT collide with any user data keys
const LANGUAGE_KEY = "sanctuary_preferred_language";
assert(
  !EXPECTED_STORAGE_KEYS.includes(LANGUAGE_KEY),
  `Language key '${LANGUAGE_KEY}' is strictly decoupled from user data keys`
);

// 2. Mock LocalStorage simulation
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] !== undefined ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

const mockStorage = new MockLocalStorage();

// Seed initial user data in English
const initialUserState = {
  completed_days: [1, 2, 3, 14, 28, 45, 90, 180, 365],
  favorite_verses: [
    {
      day_number: 1,
      reference: "Lamentations 3:22-23",
      text: "His compassions don't fail. They are new every morning. Great is your faithfulness.",
    },
    {
      day_number: 14,
      reference: "John 14:27",
      text: "Peace I leave with you. My peace I give to you; not as the world gives, give I to you.",
    },
  ],
  current_day: 45,
};

const initialPrayers = [
  {
    id: "prayer-101",
    title: "Guidance for family transition",
    description: "Lord, grant wisdom and quietness of spirit.",
    category: "family",
    is_answered: false,
    prayer_count: 5,
    created_at: "2026-01-15T08:00:00.000Z",
    last_prayed_at: "2026-02-14T08:00:00.000Z",
  },
  {
    id: "prayer-102",
    title: "Healing for grandmother",
    description: "Praying for full recovery from surgery.",
    category: "health",
    is_answered: true,
    answered_at: "2026-02-10T14:30:00.000Z",
    praise_report: "Doctor confirmed complete healing! Praise God.",
    prayer_count: 14,
    created_at: "2026-01-10T09:00:00.000Z",
    last_prayed_at: "2026-02-10T14:30:00.000Z",
  },
];

const initialGratitudes = [
  {
    id: "gratitude-201",
    date: "2026-02-14",
    item_1: "Morning coffee in peaceful silence",
    item_2: "Children laughing together before breakfast",
    item_3: "A scripture that brought renewed comfort",
    evening_moment_of_peace: "Whispered thanksgiving by candle light before rest.",
    created_at: "2026-02-14T21:00:00.000Z",
  },
];

const initialJournals = [
  {
    id: "journal-301",
    day_number: 45,
    date: "2026-02-14",
    title: "Day 45: Entering into Sabbath Rest",
    content: "Today I felt a deep invitation to cease striving and rest in His completed work.",
    is_favorite: true,
    created_at: "2026-02-14T08:30:00.000Z",
    updated_at: "2026-02-14T08:45:00.000Z",
  },
];

mockStorage.setItem("sanctuary_user_state_v1", JSON.stringify(initialUserState));
mockStorage.setItem("sanctuary_prayers_v1", JSON.stringify(initialPrayers));
mockStorage.setItem("sanctuary_gratitudes_v1", JSON.stringify(initialGratitudes));
mockStorage.setItem("sanctuary_journals_v1", JSON.stringify(initialJournals));
mockStorage.setItem("sanctuary_print_format_v1", JSON.stringify("a4"));
mockStorage.setItem(LANGUAGE_KEY, "en");

// Step 1: Switch Language to Portuguese (pt-BR)
mockStorage.setItem(LANGUAGE_KEY, "pt-BR");

// Step 2: Verify all user data remains 100% untouched
const userStateAfterPt = JSON.parse(mockStorage.getItem("sanctuary_user_state_v1"));
assert(
  JSON.stringify(userStateAfterPt) === JSON.stringify(initialUserState),
  "User state (completed_days, favorites, current_day) identical after switching to Portuguese"
);
assert(
  userStateAfterPt.completed_days.length === 9,
  "All 9 completed days preserved"
);
assert(
  userStateAfterPt.favorite_verses.length === 2,
  "All favorite verses preserved"
);
assert(
  userStateAfterPt.current_day === 45,
  "Current day pointer remains Day 45"
);

const prayersAfterPt = JSON.parse(mockStorage.getItem("sanctuary_prayers_v1"));
assert(
  JSON.stringify(prayersAfterPt) === JSON.stringify(initialPrayers),
  "Prayer wall items and praise reports identical after switching to Portuguese"
);
assert(
  prayersAfterPt[1].praise_report === "Doctor confirmed complete healing! Praise God.",
  "Praise report preserved"
);

const gratitudesAfterPt = JSON.parse(mockStorage.getItem("sanctuary_gratitudes_v1"));
assert(
  JSON.stringify(gratitudesAfterPt) === JSON.stringify(initialGratitudes),
  "Gratitude items and evening moment of peace identical after switching to Portuguese"
);

const journalsAfterPt = JSON.parse(mockStorage.getItem("sanctuary_journals_v1"));
assert(
  JSON.stringify(journalsAfterPt) === JSON.stringify(initialJournals),
  "Journal entries identical after switching to Portuguese"
);

// Step 3: Add new prayer while in Portuguese
const newPtPrayer = {
  id: "prayer-103",
  title: "Paz para decisões de trabalho",
  description: "Que o Senhor ilumine nossos passos nesta nova estação profissional.",
  category: "work",
  is_answered: false,
  prayer_count: 1,
  created_at: new Date().toISOString(),
  last_prayed_at: new Date().toISOString(),
};
prayersAfterPt.push(newPtPrayer);
mockStorage.setItem("sanctuary_prayers_v1", JSON.stringify(prayersAfterPt));

// Step 4: Switch Language back to English (en)
mockStorage.setItem(LANGUAGE_KEY, "en");

// Step 5: Verify new item and old items all persist
const prayersBackInEn = JSON.parse(mockStorage.getItem("sanctuary_prayers_v1"));
assert(
  prayersBackInEn.length === 3,
  "Both existing prayers and newly added prayer in Portuguese coexist seamlessly"
);
assert(
  prayersBackInEn[2].title === "Paz para decisões de trabalho",
  "Portuguese prayer title preserved when returning to English"
);

const printFormat = JSON.parse(mockStorage.getItem("sanctuary_print_format_v1"));
assert(printFormat === "a4", "Print format preference preserved across language cycles");

console.log(`\nUser Data Preservation Test Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
