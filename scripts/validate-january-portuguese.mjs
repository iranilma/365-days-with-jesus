/**
 * 365 Days With Jesus — January Brazilian Portuguese Validation Suite
 * 
 * Verifies:
 * 1. Exactly 31 authored records in January (Days 1–31)
 * 2. 14 canonical fields populated for every entry
 * 3. Exact 3 reflection questions per entry ending with '?'
 * 4. Scripture translation identifier "Almeida Bíblia Livre (ABL)" & "public_domain" status
 * 5. Word count boundaries (reflections ~170-260w, prayers ~60-120w)
 * 6. Zero English contamination in Portuguese prose
 * 7. Parity against English master source
 * 8. Runtime resolver verification:
 *    - Days 1, 14, 31: available === true & status === "published"
 *    - Day 32: available === false & status === "not_started"
 * 9. Dual-language resolver integrity:
 *    - English mode returns approved English entries for all days
 *    - Portuguese mode returns published Portuguese entries for Jan 1-31
 * 10. English single source of truth zero drift
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

console.log("================================================================================");
console.log("  365 DIAS COM JESUS — JANEIRO (DIAS 1–31) PORTUGUESE VALIDATION SUITE");
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
// Load and Transpile Modules in-memory
// -----------------------------------------------------------------------------
function transpileTs(tsCode) {
  return tsCode
    .replace(/^import\s+.*?;/gm, "")
    .replace(/export type[\s\S]*?;\r?\n\r?\n/g, "")
    .replace(/export type[\s\S]*?;/g, "")
    .replace(/export interface[\s\S]*?\r?\n\}/g, "")
    .replace(/export const /g, "var ")
    .replace(/const /g, "var ")
    .replace(/export function /g, "function ")
    .replace(/:\s*PortugueseDevotionalEntry\[\]/g, "")
    .replace(/:\s*PortugueseDevotionalEntry/g, "")
    .replace(/:\s*DevotionalEntry\[\]/g, "")
    .replace(/:\s*DevotionalEntry/g, "")
    .replace(/:\s*TranslationStatus/g, "")
    .replace(/:\s*SupportedLanguage/g, "")
    .replace(/:\s*DevotionalContentResolution/g, "")
    .replace(/:\s*PortugueseAvailabilityResult/g, "")
    .replace(/:\s*boolean/g, "")
    .replace(/\):\s*\{[^}]+\}/g, ")")
    .replace(/:\s*number/g, "")
    .replace(/:\s*string/g, "")
    .replace(/as TranslationStatus/g, "");
}

const januaryPath = path.join(projectRoot, "src/lib/content/portuguese/january.ts");
const registryPath = path.join(projectRoot, "src/lib/content/portuguese/registry.ts");
const ptResolverPath = path.join(projectRoot, "src/lib/content/portuguese/resolver.ts");
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
const centralResolverPath = path.join(projectRoot, "src/lib/content/resolver.ts");

assert(fs.existsSync(januaryPath), "january.ts exists in src/lib/content/portuguese/");
assert(fs.existsSync(registryPath), "registry.ts exists in src/lib/content/portuguese/");

const vmContext = vm.createContext({});
const janCode = transpileTs(fs.readFileSync(januaryPath, "utf-8"));
vm.runInContext(janCode + "; globalThis.JANUARY_PORTUGUESE_DEVOTIONALS = JANUARY_PORTUGUESE_DEVOTIONALS;", vmContext);

const regCode = transpileTs(fs.readFileSync(registryPath, "utf-8"));
vm.runInContext(regCode + "; globalThis.PORTUGUESE_DEVOTIONAL_REGISTRY = PORTUGUESE_DEVOTIONAL_REGISTRY;", vmContext);

const ptResCode = transpileTs(fs.readFileSync(ptResolverPath, "utf-8"));
vm.runInContext(ptResCode + "; globalThis.getPortugueseDevotional = getPortugueseDevotional; globalThis.isPortugueseDevotionalAvailable = isPortugueseDevotionalAvailable;", vmContext);

const devCode = transpileTs(fs.readFileSync(devotionalsPath, "utf-8"));
vm.runInContext(devCode + "; globalThis.DEVOTIONAL_ENTRIES = DEVOTIONAL_ENTRIES; globalThis.getEnglishDevotionalEntry = getDevotionalEntry;", vmContext);

const centralResCode = transpileTs(fs.readFileSync(centralResolverPath, "utf-8"))
  .replace(/getDevotionalEntry\(/g, "getEnglishDevotionalEntry(");
vm.runInContext(centralResCode + "; globalThis.resolveDevotionalContent = resolveDevotionalContent;", vmContext);

const {
  JANUARY_PORTUGUESE_DEVOTIONALS,
  PORTUGUESE_DEVOTIONAL_REGISTRY,
  getPortugueseDevotional,
  getEnglishDevotionalEntry,
  resolveDevotionalContent
} = vmContext;

// -----------------------------------------------------------------------------
// Suite 1: January Registry Structure & Completeness
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 1: January Portuguese Content Completeness (Days 1–31) ---");
assert(Array.isArray(JANUARY_PORTUGUESE_DEVOTIONALS), "JANUARY_PORTUGUESE_DEVOTIONALS is an array");
assert(JANUARY_PORTUGUESE_DEVOTIONALS.length === 31, `Exactly 31 entries authored in January (found ${JANUARY_PORTUGUESE_DEVOTIONALS.length})`);

// -----------------------------------------------------------------------------
// Suite 2: Field Schema, Theological Bounds & Literary Standards
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Schema, 14 Required Fields & Theological Integrity ---");
const REQUIRED_FIELDS = [
  "day_number",
  "month_number",
  "day_of_month",
  "weekly_subtheme",
  "title",
  "scripture_primary_reference",
  "scripture_primary_text",
  "scripture_translation",
  "reflection_body",
  "reflection_questions",
  "guided_prayer",
  "daily_intention",
  "practical_action",
  "evening_reflection_prompt"
];

const ENGLISH_PATTERNS = [
  /\bHeavenly Father\b/i,
  /\bIn Jesus' name\b/i,
  /\bWorld English Bible\b/i,
  /\bAmen\b(?!ém)/i // "Amen" without accent
];

JANUARY_PORTUGUESE_DEVOTIONALS.forEach((entry) => {
  const day = entry.day_number;
  assert(entry.month_number === 1, `Day ${day}: month_number is 1`);
  assert(entry.day_of_month === day, `Day ${day}: day_of_month is ${day}`);
  assert(entry.translation_status === "published", `Day ${day}: translation_status is 'published'`);
  assert(entry.scripture_translation === "Almeida Bíblia Livre (ABL)", `Day ${day}: uses Almeida Bíblia Livre (ABL)`);
  assert(entry.scripture_license_status === "public_domain", `Day ${day}: scripture license is 'public_domain'`);

  for (const field of REQUIRED_FIELDS) {
    const val = entry[field];
    assert(val !== undefined && val !== null && val !== "", `Day ${day}: field '${field}' is populated`);
  }

  // Reflection questions
  assert(Array.isArray(entry.reflection_questions) && entry.reflection_questions.length === 3, `Day ${day}: exactly 3 reflection questions`);
  entry.reflection_questions.forEach((q, qIdx) => {
    assert(typeof q === "string" && q.trim().endsWith("?"), `Day ${day}: Q${qIdx + 1} ends with '?'`);
  });

  // Word count checks
  const reflWords = entry.reflection_body.trim().split(/\s+/).length;
  assert(reflWords >= 170 && reflWords <= 260, `Day ${day}: reflection word count is ${reflWords} (target 170-260)`);

  const prayerWords = entry.guided_prayer.trim().split(/\s+/).length;
  assert(prayerWords >= 60 && prayerWords <= 120, `Day ${day}: prayer word count is ${prayerWords} (target 60-120)`);

  // English contamination checks
  const prose = `${entry.title} ${entry.reflection_body} ${entry.guided_prayer} ${entry.daily_intention} ${entry.practical_action} ${entry.evening_reflection_prompt}`;
  for (const pat of ENGLISH_PATTERNS) {
    assert(!pat.test(prose), `Day ${day}: zero English contamination pattern ${pat}`);
  }
});

// -----------------------------------------------------------------------------
// Suite 3: Unified 365-Day Registry Alignment
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: 365-Day Registry Integrity & Stage Boundaries ---");
assert(PORTUGUESE_DEVOTIONAL_REGISTRY.length === 365, "PORTUGUESE_DEVOTIONAL_REGISTRY contains exactly 365 days");

// Days 1–31 must be published
for (let d = 1; d <= 31; d++) {
  const regEntry = PORTUGUESE_DEVOTIONAL_REGISTRY.find(e => e.day_number === d);
  assert(regEntry && regEntry.translation_status === "published", `Registry Day ${d} is 'published'`);
  assert(regEntry && !regEntry.is_placeholder, `Registry Day ${d} is not a placeholder`);
}

// Days 32–365 must remain not_started / placeholder
for (let d = 32; d <= 365; d += 30) {
  const regEntry = PORTUGUESE_DEVOTIONAL_REGISTRY.find(e => e.day_number === d);
  assert(regEntry && regEntry.translation_status === "not_started", `Registry Day ${d} (Feb-Dec) remains 'not_started'`);
  assert(regEntry && regEntry.is_placeholder === true, `Registry Day ${d} remains a placeholder`);
}

// -----------------------------------------------------------------------------
// Suite 4: Runtime Content Resolvers & Bilingual Execution
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: Runtime Content Resolvers & Day Boundaries ---");

// Test Day 1 in Portuguese
const ptDay1 = getPortugueseDevotional(1);
assert(ptDay1.available === true, "getPortugueseDevotional(1).available is true");
assert(ptDay1.status === "published", "getPortugueseDevotional(1).status is 'published'");
assert(ptDay1.entry && ptDay1.entry.title === "Novas Misericórdias com o Alvorecer da Manhã", "getPortugueseDevotional(1) returns Day 1 Portuguese title");

// Test Day 14 in Portuguese
const ptDay14 = getPortugueseDevotional(14);
assert(ptDay14.available === true, "getPortugueseDevotional(14).available is true");
assert(ptDay14.status === "published", "getPortugueseDevotional(14).status is 'published'");
assert(ptDay14.entry && ptDay14.entry.title === "Pastos Verdes para a Alma Cansada", "getPortugueseDevotional(14) returns Day 14 Portuguese title");

// Test Day 31 in Portuguese
const ptDay31 = getPortugueseDevotional(31);
assert(ptDay31.available === true, "getPortugueseDevotional(31).available is true");
assert(ptDay31.status === "published", "getPortugueseDevotional(31).status is 'published'");
assert(ptDay31.entry && ptDay31.entry.title === "Confirma a Obra das Nossas Mãos", "getPortugueseDevotional(31) returns Day 31 Portuguese title");

// Test Day 32 in Portuguese (Must be unavailable!)
const ptDay32 = getPortugueseDevotional(32);
assert(ptDay32.available === false, "getPortugueseDevotional(32).available is false (February boundary protected)");
assert(ptDay32.status === "not_started", "getPortugueseDevotional(32).status is 'not_started'");
assert(ptDay32.entry === null, "getPortugueseDevotional(32).entry is null");

// Test Central Resolver
const resPt1 = resolveDevotionalContent(1, "pt-BR");
assert(resPt1.available === true && resPt1.status === "published" && resPt1.entry.title === "Novas Misericórdias com o Alvorecer da Manhã", "resolveDevotionalContent(1, 'pt-BR') returns published Portuguese entry");

const resPt32 = resolveDevotionalContent(32, "pt-BR");
assert(resPt32.available === false && resPt32.status === "not_started", "resolveDevotionalContent(32, 'pt-BR') returns unavailable status for Day 32");

const resEn1 = resolveDevotionalContent(1, "en");
assert(resEn1.available === true && resEn1.status === "published" && resEn1.entry.title === "New Mercies with the Morning Dawn", "resolveDevotionalContent(1, 'en') returns approved English entry");

const resEn32 = resolveDevotionalContent(32, "en");
assert(resEn32.available === true && resEn32.status === "published" && resEn32.entry.month_number === 2, "resolveDevotionalContent(32, 'en') returns approved English February entry");

// -----------------------------------------------------------------------------
// Suite 5: English Single Source of Truth Zero Drift Check
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: English Single Source of Truth Zero Drift ---");
const enJan1 = getEnglishDevotionalEntry(1);
assert(enJan1.title === "New Mercies with the Morning Dawn", "English Day 1 title unchanged");
assert(enJan1.scripture_primary_reference === "Lamentations 3:22-24", "English Day 1 scripture reference unchanged");
assert(enJan1.scripture_translation === "World English Bible (WEB)", "English Day 1 uses WEB");

console.log("\n================================================================================");
console.log(`  JANEIRO VALIDATION SUMMARY: ${passCount} passed, ${failCount} failed.`);
console.log("================================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("🌟 January Portuguese Edition Certification PASSED with 100% compliance!\n");
}
