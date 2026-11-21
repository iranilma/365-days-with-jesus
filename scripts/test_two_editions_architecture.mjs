/**
 * Test Suite: Two-Edition Architecture Certification
 * Validates:
 * 1. Routing: /, /en, /en/*, /pt-br, /pt-br/* route existence and structure
 * 2. Language: Route-as-source-of-truth, browser language override immunity, no dropdown selector in navigation
 * 3. Content Isolation: Strict library separation, Days 1/14/31 published in PT, Day 32 unavailable, zero English fallback
 * 4. Navigation: Edition-aware link prefixes, Edition Selector portal link at /
 * 5. User Data: Scoped localStorage compatibility
 * 6. Regression: English 365 days & Portuguese 31 days intact
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  TWO-EDITION ARCHITECTURE CERTIFICATION SUITE");
console.log("  One Shared Codebase — Two Separate Edition Experiences");
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

// ============================================================================
// 1. ROUTING & DIRECTORY STRUCTURE
// ============================================================================
console.log("--- 1. ROUTING & EDITION PORTAL STRUCTURE ---");

// Check Edition Selection Portal at src/app/page.tsx
const portalPath = path.join(projectRoot, "src/app/page.tsx");
assert(fs.existsSync(portalPath), "Edition Selection Portal exists at src/app/page.tsx");
const portalContent = fs.readFileSync(portalPath, "utf-8");
assert(
  portalContent.includes("365 Days With Jesus") && portalContent.includes("365 Dias com Jesus"),
  "Portal presents both editions clearly: '365 Days With Jesus' & '365 Dias com Jesus'"
);
assert(
  portalContent.includes('href="/en"') || portalContent.includes('"/en"'),
  "Portal links directly to English Edition entry point (/en)"
);
assert(
  portalContent.includes('href="/pt-br"') || portalContent.includes('"/pt-br"'),
  "Portal links directly to Portuguese Edition entry point (/pt-br)"
);
assert(
  portalContent.includes("English devotional journey"),
  "Portal describes English edition as 'English devotional journey'"
);
assert(
  portalContent.includes("Jornada devocional em português"),
  "Portal describes Portuguese edition as 'Jornada devocional em português'"
);

// Check English routes tree
const enRoutes = [
  "src/app/en/layout.tsx",
  "src/app/en/page.tsx",
  "src/app/en/app/page.tsx",
  "src/app/en/devotional/[day]/page.tsx",
  "src/app/en/calendar/page.tsx",
  "src/app/en/prayer/page.tsx",
  "src/app/en/gratitude/page.tsx",
  "src/app/en/journal/page.tsx",
  "src/app/en/printables/[day]/page.tsx",
  "src/app/en/sales/page.tsx",
];

for (const route of enRoutes) {
  assert(fs.existsSync(path.join(projectRoot, route)), `English route exists: ${route}`);
}

// Check Portuguese routes tree
const ptRoutes = [
  "src/app/pt-br/layout.tsx",
  "src/app/pt-br/page.tsx",
  "src/app/pt-br/app/page.tsx",
  "src/app/pt-br/devotional/[day]/page.tsx",
  "src/app/pt-br/calendar/page.tsx",
  "src/app/pt-br/prayer/page.tsx",
  "src/app/pt-br/gratitude/page.tsx",
  "src/app/pt-br/journal/page.tsx",
  "src/app/pt-br/printables/[day]/page.tsx",
];

for (const route of ptRoutes) {
  assert(fs.existsSync(path.join(projectRoot, route)), `Portuguese route exists: ${route}`);
}

// Check Portuguese alias route /pt/page.tsx
assert(fs.existsSync(path.join(projectRoot, "src/app/pt/page.tsx")), "Portuguese alias route /pt/page.tsx exists");

// Check Shared Views in src/components/views/
const sharedViews = [
  "src/components/views/DashboardView.tsx",
  "src/components/views/DevotionalView.tsx",
  "src/components/views/CalendarView.tsx",
  "src/components/views/PrayerWallView.tsx",
  "src/components/views/GratitudeView.tsx",
  "src/components/views/JournalView.tsx",
  "src/components/views/PrintablesView.tsx",
];

for (const view of sharedViews) {
  assert(fs.existsSync(path.join(projectRoot, view)), `Shared view component exists: ${view}`);
}

// ============================================================================
// 2. LANGUAGE AS ROUTE SOURCE OF TRUTH
// ============================================================================
console.log("\n--- 2. ROUTE AS SOURCE OF TRUTH & IMMUNITY FROM OVERRIDES ---");

// Check en layout forces "en"
const enLayoutContent = fs.readFileSync(path.join(projectRoot, "src/app/en/layout.tsx"), "utf-8");
assert(
  enLayoutContent.includes('forcedEdition="en"'),
  "English layout strictly locks edition to 'en' via forcedEdition='en'"
);

// Check pt-br layout forces "pt-BR"
const ptLayoutContent = fs.readFileSync(path.join(projectRoot, "src/app/pt-br/layout.tsx"), "utf-8");
assert(
  ptLayoutContent.includes('forcedEdition="pt-BR"'),
  "Portuguese layout strictly locks edition to 'pt-BR' via forcedEdition='pt-BR'"
);

// Check LanguageContext handles route prefix authoritatively
const langContextContent = fs.readFileSync(path.join(projectRoot, "src/lib/i18n/LanguageContext.tsx"), "utf-8");
assert(
  langContextContent.includes("forcedEdition") && langContextContent.includes("setLanguageState(forcedEdition)"),
  "LanguageContext prioritizes forcedEdition over any stored or browser preferences"
);
assert(
  langContextContent.includes('path.startsWith("/pt-br")') && langContextContent.includes('setLanguageState("pt-BR")'),
  "LanguageContext inspects window.location.pathname for /pt-br path"
);
assert(
  langContextContent.includes('path.startsWith("/en")') && langContextContent.includes('setLanguageState("en")'),
  "LanguageContext inspects window.location.pathname for /en path"
);

// Verify Navigation.tsx has removed global language toggle dropdown
const navContent = fs.readFileSync(path.join(projectRoot, "src/components/Navigation.tsx"), "utf-8");
assert(
  !navContent.includes("<LanguageSelector") && !navContent.includes("<EditionSelector"),
  "No global language dropdown selector exists inside edition Navigation.tsx"
);
assert(
  !navContent.includes('href="/"') && !navContent.includes("href='/'"),
  "Navigation top menu does not contain an editions button (clean top bar)"
);

// ============================================================================
// 3. CONTENT ISOLATION & ZERO-FALLBACK VERIFICATION
// ============================================================================
console.log("\n--- 3. CONTENT ISOLATION & ZERO-FALLBACK VERIFICATION ---");

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

const vmContext = vm.createContext({});
const januaryPath = path.join(projectRoot, "src/lib/content/portuguese/january.ts");
const registryPath = path.join(projectRoot, "src/lib/content/portuguese/registry.ts");
const ptResolverPath = path.join(projectRoot, "src/lib/content/portuguese/resolver.ts");
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
const centralResolverPath = path.join(projectRoot, "src/lib/content/resolver.ts");

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
  getPortugueseDevotional,
  getEnglishDevotionalEntry,
  resolveDevotionalContent,
} = vmContext;

// Verify English library integrity
const enDay1 = getEnglishDevotionalEntry(1);
assert(enDay1 && enDay1.day_number === 1, "English library resolves Day 1 entry");
assert(enDay1.scripture_translation === "World English Bible (WEB)", "English Day 1 uses WEB");
const enDay32 = getEnglishDevotionalEntry(32);
assert(enDay32 && enDay32.day_number === 32, "English library resolves Day 32 (February) entry");

// Verify Portuguese library integrity
const ptDay1 = getPortugueseDevotional(1);
assert(ptDay1.available === true, "Portuguese Day 1 is available (true)");
assert(ptDay1.status === "published", "Portuguese Day 1 status is 'published'");
assert(ptDay1.entry !== null, "Portuguese Day 1 entry is populated");
assert(ptDay1.entry.scripture_translation.includes("Almeida Bíblia Livre") || ptDay1.entry.scripture_translation.includes("ABL"), "Portuguese Day 1 uses ABL");

const ptDay14 = getPortugueseDevotional(14);
assert(ptDay14.available === true, "Portuguese Day 14 is available (true)");
assert(ptDay14.status === "published", "Portuguese Day 14 status is 'published'");
assert(ptDay14.entry !== null, "Portuguese Day 14 entry is populated");

const ptDay31 = getPortugueseDevotional(31);
assert(ptDay31.available === true, "Portuguese Day 31 is available (true)");
assert(ptDay31.status === "published", "Portuguese Day 31 status is 'published'");
assert(ptDay31.entry !== null, "Portuguese Day 31 entry is populated");

// Verify Portuguese Day 32 boundary protection (ZERO LEAKAGE)
const ptDay32 = getPortugueseDevotional(32);
assert(ptDay32.available === false, "Portuguese Day 32 is strictly unavailable (available: false)");
assert(ptDay32.status === "not_started", "Portuguese Day 32 status is 'not_started'");
assert(ptDay32.entry === null, "Portuguese Day 32 entry is strictly null (zero content leak)");

// Test resolveDevotionalContent isolation
const resolvedEn1 = resolveDevotionalContent(1, "en");
assert(resolvedEn1.language === "en" && resolvedEn1.available === true, "resolveDevotionalContent(1, 'en') returns English entry");

const resolvedPt1 = resolveDevotionalContent(1, "pt-BR");
assert(resolvedPt1.language === "pt-BR" && resolvedPt1.available === true, "resolveDevotionalContent(1, 'pt-BR') returns Portuguese entry");
assert(resolvedPt1.entry.title !== resolvedEn1.entry.title, "Portuguese Day 1 title is translated Portuguese text");

const resolvedPt32 = resolveDevotionalContent(32, "pt-BR");
assert(resolvedPt32.language === "pt-BR" && resolvedPt32.available === false, "resolveDevotionalContent(32, 'pt-BR') returns available: false");
assert(!("entry" in resolvedPt32) || resolvedPt32.entry === undefined || resolvedPt32.entry === null, "resolveDevotionalContent(32, 'pt-BR') has ZERO English devotional entry");

// Inspect DevotionalView.tsx for strict zero-fallback implementation
const devViewContent = fs.readFileSync(path.join(projectRoot, "src/components/views/DevotionalView.tsx"), "utf-8");
assert(
  devViewContent.includes("const englishEntry = !isPt ? getDevotionalEntry(dayNumber) : null;"),
  "DevotionalView strictly skips querying getDevotionalEntry when in Portuguese edition"
);
assert(
  devViewContent.includes("<PortugueseUnavailableDevotionalView"),
  "DevotionalView renders PortugueseUnavailableDevotionalView for unpublished Portuguese days"
);

// Inspect DashboardView.tsx for strict zero-fallback implementation
const dashViewContent = fs.readFileSync(path.join(projectRoot, "src/components/views/DashboardView.tsx"), "utf-8");
assert(
  !dashViewContent.includes(": englishDevotional"),
  "DashboardView does NOT use englishDevotional as fallback for Portuguese"
);
assert(
  dashViewContent.includes("isPt && !isPtPublished ?"),
  "DashboardView displays dedicated Portuguese preparation card when unpublished in Portuguese"
);

// ============================================================================
// 4. PORTUGUESE UNAVAILABLE VIEW REQUIREMENTS
// ============================================================================
console.log("\n--- 4. PORTUGUESE UNAVAILABLE DEVOTIONAL VIEW ---");

const unavailViewPath = path.join(projectRoot, "src/components/PortugueseUnavailableDevotionalView.tsx");
assert(fs.existsSync(unavailViewPath), "PortugueseUnavailableDevotionalView.tsx exists in src/components/");
const unavailContent = fs.readFileSync(unavailViewPath, "utf-8");

assert(
  !unavailContent.includes("Voltar para o inglês"),
  "Unavailable view contains ZERO 'Voltar para o inglês' button"
);
assert(
  !unavailContent.includes('setLanguage("en")'),
  "Unavailable view contains ZERO setLanguage('en') action"
);
assert(
  unavailContent.includes("Seu devocional de hoje está sendo preparado em português"),
  "Unavailable view contains natural Portuguese preparation headline"
);
assert(
  unavailContent.includes(`${"${basePrefix}"}/app`) || unavailContent.includes("basePrefix + '/app'"),
  "Unavailable view provides button to return to Portuguese Sanctuary dashboard"
);
assert(
  unavailContent.includes('href="/"') || unavailContent.includes("href='/'"),
  "Unavailable view provides link to edition selection page (/)"
);
assert(
  unavailContent.includes(`${"${basePrefix}"}/calendar`),
  "Unavailable view provides link to view January Calendar"
);

// ============================================================================
// 5. NAVIGATION CONTINUITY & EDITION RESPECT
// ============================================================================
console.log("\n--- 5. NAVIGATION CONTINUITY & EDITION RESPECT ---");

// Check Navigation.tsx links
assert(
  navContent.includes("const prefix = isPt ? \"/pt-br\" : \"/en\";"),
  "Navigation sets dynamic prefix '/pt-br' or '/en' based on active edition"
);
assert(
  navContent.includes("`${prefix}/app`") && navContent.includes("`${prefix}/devotional/1`"),
  "Navigation links all tabs with ${prefix} to keep user locked inside active edition"
);

// Check SanctuaryFooter.tsx links
const footerContent = fs.readFileSync(path.join(projectRoot, "src/components/SanctuaryFooter.tsx"), "utf-8");
assert(
  footerContent.includes("const prefix = isPt ? \"/pt-br\" : \"/en\";"),
  "SanctuaryFooter sets dynamic prefix based on active edition"
);
assert(
  footerContent.includes("`${prefix}/devotional/1`") && footerContent.includes("`${prefix}/calendar`"),
  "SanctuaryFooter links maintain active edition prefix"
);
assert(
  footerContent.includes('href="/"'),
  "SanctuaryFooter includes link to switch edition at '/'"
);

// ============================================================================
// 6. CONTENT PRESERVATION INTEGRITY (0 Drift)
// ============================================================================
console.log("\n--- 6. CONTENT PRESERVATION INTEGRITY ---");

const devTsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
const devTsContent = fs.readFileSync(devTsPath, "utf-8");
const enEntriesCount = [...devTsContent.matchAll(/day_number:\s*(\d+)/g)].length;
assert(enEntriesCount === 365, `English devotionals.ts has all 365 days intact (found ${enEntriesCount})`);

const janPtPath = path.join(projectRoot, "src/lib/content/portuguese/january.ts");
const janPtContent = fs.readFileSync(janPtPath, "utf-8");
const ptEntriesCount = [...janPtContent.matchAll(/["']?day_number["']?:\s*(\d+)/g)].length;
assert(ptEntriesCount === 31, `Portuguese january.ts has all 31 days intact (found ${ptEntriesCount})`);

console.log(`\nTwo-Edition Architecture Test Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
