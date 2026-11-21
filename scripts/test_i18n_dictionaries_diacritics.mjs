/**
 * Test Suite 2: Dictionaries, Key Parity & Diacritic Verification
 * Verifies parity between English & Portuguese dictionaries, no missing keys,
 * proper Portuguese diacritics (ã, õ, ç, á, é, í, ó, ú, ê, ô, à),
 * and zero mojibake / double-encoding artifacts.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  TEST SUITE 2: DICTIONARIES, KEY PARITY & DIACRITIC VERIFICATION");
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

// Helper to flatten nested object keys
function flattenKeys(obj, prefix = "") {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const keyPath = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys = keys.concat(flattenKeys(v, keyPath));
    } else {
      keys.push(keyPath);
    }
  }
  return keys;
}

// Helper to extract values
function flattenValues(obj) {
  let values = [];
  for (const v of Object.values(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      values = values.concat(flattenValues(v));
    } else if (typeof v === "string") {
      values.push(v);
    }
  }
  return values;
}

// Read dictionaries
const enPath = path.join(projectRoot, "src/lib/i18n/dictionaries/en.ts");
const ptPath = path.join(projectRoot, "src/lib/i18n/dictionaries/pt-BR.ts");

assert(fs.existsSync(enPath), "English dictionary exists (src/lib/i18n/dictionaries/en.ts)");
assert(fs.existsSync(ptPath), "Portuguese dictionary exists (src/lib/i18n/dictionaries/pt-BR.ts)");

const enFileContent = fs.readFileSync(enPath, "utf-8");
const ptFileContent = fs.readFileSync(ptPath, "utf-8");

// Parse by evaluating or cleaning TS export
function parseTsDict(content) {
  const jsonStr = content
    .replace(/import\s+[\s\S]*?;/, "")
    .replace(/export\s+const\s+\w+:\s*TranslationDictionary\s*=\s*/, "")
    .replace(/export\s+const\s+\w+\s*=\s*/, "")
    .trim()
    .replace(/;$/, "");
  // Use Function to safely evaluate object literal in sandbox
  return new Function(`return (${jsonStr});`)();
}

let enDict, ptDict;
try {
  enDict = parseTsDict(enFileContent);
  assert(Boolean(enDict && typeof enDict === "object"), "English dictionary parsed successfully");
} catch (e) {
  assert(false, "Failed to parse English dictionary", e.message);
}

try {
  ptDict = parseTsDict(ptFileContent);
  assert(Boolean(ptDict && typeof ptDict === "object"), "Portuguese dictionary parsed successfully");
} catch (e) {
  assert(false, "Failed to parse Portuguese dictionary", e.message);
}

if (enDict && ptDict) {
  const enKeys = flattenKeys(enDict);
  const ptKeys = flattenKeys(ptDict);

  assert(enKeys.length > 50, `English dictionary has substantial keys count (${enKeys.length})`);
  assert(ptKeys.length > 50, `Portuguese dictionary has substantial keys count (${ptKeys.length})`);

  // Key Parity check: every English key must exist in Portuguese
  const ptKeySet = new Set(ptKeys);
  const missingInPt = enKeys.filter((k) => !ptKeySet.has(k));
  assert(
    missingInPt.length === 0,
    "100% Key Parity: Every key in English dictionary exists in Portuguese dictionary",
    `Missing in PT: ${missingInPt.join(", ")}`
  );

  // Check no empty strings in Portuguese translations
  const ptValues = flattenValues(ptDict);
  const emptyValues = ptValues.filter((v) => v.trim() === "");
  assert(emptyValues.length === 0, "Zero empty string values in Portuguese dictionary");

  // Diacritic Verification:
  // Check for presence of distinct Portuguese characters
  const allPtText = ptValues.join(" ");

  const requiredDiacritics = [
    { char: "ã", name: "a with tilde (ã)", example: "oração / gratidão" },
    { char: "õ", name: "o with tilde (õ)", example: "orações / corações" },
    { char: "ç", name: "c with cedilla (ç)", example: "graça / esperança" },
    { char: "á", name: "a with acute (á)", example: "diário / santuário" },
    { char: "é", name: "e with acute (é)", example: "fé / mês" },
    { char: "í", name: "i with acute (í)", example: "início / íntimo" },
    { char: "ó", name: "o with acute (ó)", example: "próximo" },
    { char: "ú", name: "u with acute (ú)", example: "único" },
    { char: "ê", name: "e with circumflex (ê)", example: "três / você" },
    { char: "ô", name: "o with circumflex (ô)", example: "propósito" },
    { char: "à", name: "a with grave (à)", example: "à noite / às" },
  ];

  for (const item of requiredDiacritics) {
    const hasChar = allPtText.toLowerCase().includes(item.char);
    assert(
      hasChar,
      `Portuguese diacritic present: '${item.char}' (${item.name}) as in ${item.example}`
    );
  }

  // Mojibake / Double-Encoding Check
  // Check for corrupted UTF-8 byte sequences like Ã£, Ã§, Ã©, Ã¡, etc., or HTML entities
  const mojibakePatterns = [
    /Ã£/g,
    /Ã§/g,
    /Ã©/g,
    /Ã¡/g,
    /Ã³/g,
    /Ãº/g,
    /Ãª/g,
    /Ã´/g,
    /Ã /g,
    /Ãµ/g,
    /Ã­/g,
    /&atilde;/gi,
    /&ccedil;/gi,
    /&eacute;/gi,
    /&aacute;/gi,
    /\uFFFD/g, // Unicode Replacement Character
  ];

  let foundMojibake = false;
  let mojibakeDetails = [];

  for (const pat of mojibakePatterns) {
    if (pat.test(ptFileContent)) {
      foundMojibake = true;
      mojibakeDetails.push(String(pat));
    }
  }

  assert(
    !foundMojibake,
    "Zero mojibake or double-encoding corruption in Portuguese dictionary",
    `Detected patterns: ${mojibakeDetails.join(", ")}`
  );
}

// 7. Check Portuguese Monthly Themes
const ptThemesPath = path.join(projectRoot, "src/lib/i18n/themes-pt.ts");
assert(fs.existsSync(ptThemesPath), "themes-pt.ts exists in src/lib/i18n/");

if (fs.existsSync(ptThemesPath)) {
  const ptThemesContent = fs.readFileSync(ptThemesPath, "utf-8");
  const monthMatches = [...ptThemesContent.matchAll(/month_number:\s*(\d+)/g)];
  assert(monthMatches.length === 12, `Exactly 12 Portuguese monthly themes present (found ${monthMatches.length})`);

  // Verify diacritics in themes
  assert(ptThemesContent.includes("Fé"), "Theme contains 'Fé'");
  assert(ptThemesContent.includes("Graça") || ptThemesContent.includes("graça"), "Theme contains 'Graça'");
  assert(ptThemesContent.includes("Esperança") || ptThemesContent.includes("esperança"), "Theme contains 'Esperança'");
  assert(ptThemesContent.includes("Propósito") || ptThemesContent.includes("propósito"), "Theme contains 'Propósito'");
}

console.log(`\nDictionary & Diacritic Test Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
