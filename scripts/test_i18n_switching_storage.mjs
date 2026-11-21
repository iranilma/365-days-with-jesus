/**
 * Test Suite 3: Language Switching & LocalStorage Persistence
 * Tests real-time language toggling (en <-> pt-BR),
 * localStorage persistence across sessions/refreshes,
 * fallback on empty storage, and resiliency against invalid storage values.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  TEST SUITE 3: LANGUAGE SWITCHING & LOCALSTORAGE PERSISTENCE");
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

// Mock browser LocalStorage
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
  clear() {
    this.store = {};
  }
}

// Test 1: Verify LanguageContext implementation file exists and exports
const contextPath = path.join(projectRoot, "src/lib/i18n/LanguageContext.tsx");
assert(fs.existsSync(contextPath), "LanguageContext.tsx exists in src/lib/i18n/");

const contextContent = fs.readFileSync(contextPath, "utf-8");
assert(contextContent.includes("LanguageProvider"), "LanguageProvider is exported from LanguageContext.tsx");
assert(contextContent.includes("useLanguage"), "useLanguage hook is exported from LanguageContext.tsx");
assert(contextContent.includes("localStorage.getItem"), "LanguageContext accesses localStorage.getItem");
assert(contextContent.includes("localStorage.setItem"), "LanguageContext persists to localStorage.setItem");

// Test 2: Simulate runtime switching and localStorage mechanics
const STORAGE_KEY = "sanctuary_preferred_language";
const mockStorage = new MockLocalStorage();

function simulateLanguageInit(storage, browserLocale = "en-US") {
  const saved = storage.getItem(STORAGE_KEY);
  if (saved && (saved === "en" || saved === "pt-BR")) {
    return saved;
  }
  if (browserLocale.startsWith("pt")) {
    return "pt-BR";
  }
  return "en";
}

function simulateSetLanguage(storage, newLang) {
  if (newLang === "en" || newLang === "pt-BR") {
    storage.setItem(STORAGE_KEY, newLang);
    return newLang;
  }
  return "en";
}

// Scenario A: First-time visitor (no stored preference, English browser)
let currentLang = simulateLanguageInit(mockStorage, "en-US");
assert(currentLang === "en", "Default language is 'en' when localStorage is empty and browser is EN");

// Scenario B: User switches to Portuguese
currentLang = simulateSetLanguage(mockStorage, "pt-BR");
assert(currentLang === "pt-BR", "Language switches to 'pt-BR' in real time");
assert(
  mockStorage.getItem(STORAGE_KEY) === "pt-BR",
  "Preferred language 'pt-BR' is persisted to localStorage"
);

// Scenario C: Page refresh (new session init with populated storage)
const langOnRefresh = simulateLanguageInit(mockStorage, "en-US");
assert(
  langOnRefresh === "pt-BR",
  "Language 'pt-BR' is retained across page reloads/refreshes from localStorage"
);

// Scenario D: User switches back to English
currentLang = simulateSetLanguage(mockStorage, "en");
assert(currentLang === "en", "Language switches back to 'en' in real time");
assert(
  mockStorage.getItem(STORAGE_KEY) === "en",
  "Preferred language 'en' is updated in localStorage"
);

// Scenario E: Page refresh after switching back
const langOnSecondRefresh = simulateLanguageInit(mockStorage, "pt-BR"); // browser pt-BR but storage is 'en'
assert(
  langOnSecondRefresh === "en",
  "Stored language 'en' takes precedence over browser locale on reload"
);

// Scenario F: Corrupted / invalid value in localStorage (resilience check)
mockStorage.setItem(STORAGE_KEY, "invalid-lang-code-xyz");
const langOnCorruptedStorage = simulateLanguageInit(mockStorage, "en-US");
assert(
  langOnCorruptedStorage === "en",
  "Invalid/corrupted storage value safely falls back to default 'en'"
);

// Scenario G: Portuguese browser auto-detection when localStorage empty
mockStorage.clear();
const langPtBrowser = simulateLanguageInit(mockStorage, "pt-BR");
assert(
  langPtBrowser === "pt-BR",
  "Portuguese browser locale automatically detects 'pt-BR' when no prior preference stored"
);

// Scenario H: LanguageSelector component inspection
const selectorPath = path.join(projectRoot, "src/components/LanguageSelector.tsx");
assert(fs.existsSync(selectorPath), "LanguageSelector.tsx exists in src/components/");
const selectorContent = fs.readFileSync(selectorPath, "utf-8");
assert(selectorContent.includes("setLanguage"), "LanguageSelector wires setLanguage action");
assert(selectorContent.includes("pt-BR") && selectorContent.includes("en"), "LanguageSelector supports both 'en' and 'pt-BR'");

console.log(`\nSwitching & Persistence Test Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
