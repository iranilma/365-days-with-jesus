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
let flagCount = 0;
function scanForFlags(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanForFlags(fullPath);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("🇬🇧") || content.includes("🇧🇷")) {
        console.error(`Flag found in: ${fullPath}`);
        flagCount++;
      }
    }
  }
}
scanForFlags(path.join(projectRoot, "src"));
assert.strictEqual(flagCount, 0, "Zero flag emojis must exist anywhere in src/");
console.log("  [PASS] Zero flag emojis in src/ directory");

// 2. Navigation top menu
const navContent = fs.readFileSync(path.join(projectRoot, "src/components/Navigation.tsx"), "utf-8");
assert(!navContent.includes("🇬🇧") && !navContent.includes("🇧🇷"), "No flags in Navigation");
assert(!navContent.includes('href="/"') && !navContent.includes("href='/'"), "No editions button on top menu in Navigation");
console.log("  [PASS] Navigation has zero flags and no editions button on top menu");

// 3. DevotionalView has NO text-size controls
const devViewContent = fs.readFileSync(path.join(projectRoot, "src/components/views/DevotionalView.tsx"), "utf-8");
assert(!devViewContent.includes("Normal text size"), "No oversized normal text button in DevotionalView");
assert(!devViewContent.includes("Large text size"), "No oversized large text button in DevotionalView");
assert(!devViewContent.includes("Extra large text size"), "No oversized extra large text button in DevotionalView");
assert(!devViewContent.includes("role=\"group\" aria-label"), "No text-size selector group in DevotionalView");
assert(devViewContent.includes("data-font-size={fontSize}"), "DevotionalView has data-font-size bound on article");
assert(devViewContent.includes("dev-scripture-text"), "DevotionalView has dev-scripture-text class");
assert(devViewContent.includes("dev-reflection-body"), "DevotionalView has dev-reflection-body class");
console.log("  [PASS] DevotionalView contains zero text-size controls and retains full typography scaling");

// 4. DashboardView HAS compact A / A+ / A++ controls
const dashViewContent = fs.readFileSync(path.join(projectRoot, "src/components/views/DashboardView.tsx"), "utf-8");
assert(/>\s*A\s*<\/button>/.test(dashViewContent), "DashboardView contains A button");
assert(/>\s*A\+\s*<\/button>/.test(dashViewContent), "DashboardView contains A+ button");
assert(/>\s*A\+\+\s*<\/button>/.test(dashViewContent), "DashboardView contains A++ button");
assert(dashViewContent.includes("sanctuary_font_size"), "DashboardView persists sanctuary_font_size");
console.log("  [PASS] DashboardView contains compact A / A+ / A++ controls with preference persistence");

// 5. Edition Portal (src/app/page.tsx)
const portalContent = fs.readFileSync(path.join(projectRoot, "src/app/page.tsx"), "utf-8");
assert(!portalContent.includes("🇬🇧") && !portalContent.includes("🇧🇷"), "Portal has zero flags");
assert(portalContent.includes('href="/en"'), "Portal links to /en");
assert(portalContent.includes('href="/pt-br"'), "Portal links to /pt-br");
console.log("  [PASS] Edition portal has zero flags and links cleanly to /en and /pt-br");

console.log("\nAll UI & Flag Removal tests passed cleanly!");
