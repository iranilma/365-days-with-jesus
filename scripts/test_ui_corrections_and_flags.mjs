import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import assert from "assert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("================================================================================");
console.log("  UI CORRECTIONS, FLAGS REMOVAL & TEXT-SIZE SUITE");
console.log("================================================================================");

// 1. Check zero flags in src/
const GB_FLAG = "\uD83C\uDDEC\uD83C\uDDF7";
const US_FLAG = "\uD83C\uDDFA\uD83C\uDDF8";
const BR_FLAG = "\uD83C\uDDE7\uD83C\uDDF7";

let flagCount = 0;
function scanForFlags(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanForFlags(fullPath);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes(GB_FLAG) || content.includes(US_FLAG) || content.includes(BR_FLAG)) {
        console.error(`Flag found in: ${fullPath}`);
        flagCount++;
      }
    }
  }
}
scanForFlags(path.join(projectRoot, "src"));
assert.strictEqual(flagCount, 0, "Zero flag emojis must exist anywhere in src/");
console.log("  [PASS] Zero flag emojis in entire src/ directory");

// 2. Specific files explicitly inspected for Task 1
const inspectedFiles = [
  "src/components/LanguageSelector.tsx",
  "src/components/Navigation.tsx",
  "src/app/onboarding/welcome/page.tsx",
  "src/i18n/config.ts",
];
for (const file of inspectedFiles) {
  const fullPath = path.join(projectRoot, file);
  assert(fs.existsSync(fullPath), `File ${file} must exist`);
  const content = fs.readFileSync(fullPath, "utf-8");
  assert(!content.includes(GB_FLAG), `No British flag in ${file}`);
  assert(!content.includes(US_FLAG), `No US flag in ${file}`);
  assert(!content.includes(BR_FLAG), `No Brazilian flag in ${file}`);
}
console.log("  [PASS] Task 1 files verified free of flags (LanguageSelector, Navigation, welcome, config.ts)");

// 3. Navigation top menu
const navContent = fs.readFileSync(path.join(projectRoot, "src/components/Navigation.tsx"), "utf-8");
assert(!navContent.includes(GB_FLAG) && !navContent.includes(BR_FLAG) && !navContent.includes(US_FLAG), "No flags in Navigation");
assert(!navContent.includes('href="/"') && !navContent.includes("href='/'"), "No editions button on top menu in Navigation");
console.log("  [PASS] Navigation has zero flags and no editions button on top menu");

// 4. DevotionalView has NO text-size controls (Task 3)
const devViewContent = fs.readFileSync(path.join(projectRoot, "src/components/views/DevotionalView.tsx"), "utf-8");
assert(!devViewContent.includes("Normal text size"), "No oversized normal text button in DevotionalView");
assert(!devViewContent.includes("Large text size"), "No oversized large text button in DevotionalView");
assert(!devViewContent.includes("Extra large text size"), "No oversized extra large text button in DevotionalView");
assert(!devViewContent.includes("role=\"group\" aria-label"), "No text-size selector group in DevotionalView");
assert(!devViewContent.includes("handleSetFontSize"), "No font size setter in DevotionalView");
assert(devViewContent.includes("data-font-size={fontSize}"), "DevotionalView has data-font-size bound on article");
assert(devViewContent.includes("dev-scripture-text"), "DevotionalView has dev-scripture-text class");
assert(devViewContent.includes("dev-reflection-body"), "DevotionalView has dev-reflection-body class");
console.log("  [PASS] DevotionalView contains zero text-size controls and retains full typography scaling");

// 5. Individual devotional pages inspect
const devotionalPagePaths = [
  "src/app/devotional/[day]/page.tsx",
  "src/app/en/devotional/[day]/page.tsx",
  "src/app/pt-br/devotional/[day]/page.tsx",
];
for (const p of devotionalPagePaths) {
  const fullPath = path.join(projectRoot, p);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(!content.includes("fontSize"), `No fontSize selector in ${p}`);
    assert(!content.includes("setFontSize"), `No setFontSize in ${p}`);
    assert(!content.includes("A+"), `No A+ in ${p}`);
  }
}
console.log("  [PASS] All devotional day pages delegate cleanly without local text size controls");

// 6. DashboardView HAS compact A / A+ / A++ controls without long labels (Task 2)
const dashViewContent = fs.readFileSync(path.join(projectRoot, "src/components/views/DashboardView.tsx"), "utf-8");
assert(/>\s*A\s*<\/button>/.test(dashViewContent), "DashboardView contains A button");
assert(/>\s*A\+\s*<\/button>/.test(dashViewContent), "DashboardView contains A+ button");
assert(/>\s*A\+\+\s*<\/button>/.test(dashViewContent), "DashboardView contains A++ button");
assert(!dashViewContent.includes(">Text:<"), "DashboardView does not have explanatory Text: label");
assert(!dashViewContent.includes(">Texto:<"), "DashboardView does not have explanatory Texto: label");
assert(dashViewContent.includes("sanctuary_font_size"), "DashboardView persists sanctuary_font_size");
console.log("  [PASS] DashboardView contains compact A / A+ / A++ controls with preference persistence (no long labels)");

// 7. Edition Portal (src/app/page.tsx)
const portalContent = fs.readFileSync(path.join(projectRoot, "src/app/page.tsx"), "utf-8");
assert(!portalContent.includes(GB_FLAG) && !portalContent.includes(BR_FLAG) && !portalContent.includes(US_FLAG), "Portal has zero flags");
assert(portalContent.includes('href="/en"'), "Portal links to /en");
assert(portalContent.includes('href="/pt-br"'), "Portal links to /pt-br");
console.log("  [PASS] Edition portal has zero flags and links cleanly to /en and /pt-br");

console.log("\nAll UI & Flag Removal tests passed cleanly!");
