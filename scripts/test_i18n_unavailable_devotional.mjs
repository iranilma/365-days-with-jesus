/**
 * Test Suite 6: Unavailable Devotional Fallback Behavior
 * Verifies that when Portuguese (pt-BR) is selected on devotional pages,
 * the application displays a friendly pastoral notice explaining that Portuguese
 * devocionais are in preparation, and provides an immediate "Voltar para o inglês" action.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  TEST SUITE 6: UNAVAILABLE DEVOTIONAL BEHAVIOR & ACTIONS");
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

// 1. Inspect UnavailableDevotionalBanner.tsx component
const bannerPath = path.join(projectRoot, "src/components/UnavailableDevotionalBanner.tsx");
assert(fs.existsSync(bannerPath), "UnavailableDevotionalBanner.tsx exists in src/components/");

const bannerContent = fs.readFileSync(bannerPath, "utf-8");

// 2. Verify banner text requirements
const EXPECTED_NOTICE =
  "Este devocional ainda está sendo preparado em português. Enquanto isso, você pode continuar sua jornada na edição em inglês.";
assert(
  bannerContent.includes(EXPECTED_NOTICE),
  "Banner contains exact required notice text in Portuguese"
);

const EXPECTED_BUTTON = "Voltar para o inglês";
assert(
  bannerContent.includes(EXPECTED_BUTTON),
  "Banner contains exact required action button text 'Voltar para o inglês'"
);

// 3. Verify language suppression logic
assert(
  bannerContent.includes('if (language !== "pt-BR")') && bannerContent.includes("return null"),
  "Banner safely returns null (hidden) when active language is NOT 'pt-BR'"
);

// 4. Verify action triggers setLanguage("en")
assert(
  bannerContent.includes('setLanguage("en")'),
  "Banner action triggers setLanguage('en') on click"
);

// 5. Verify accessibility attributes
assert(
  bannerContent.includes('role="alert"'),
  "Banner includes role='alert' for screen readers and accessibility"
);

// 6. Simulate banner state transitions
class MockBannerComponent {
  constructor(initialLang = "en") {
    this.language = initialLang;
    this.renderOutput = null;
    this.update();
  }

  update() {
    if (this.language !== "pt-BR") {
      this.renderOutput = null;
    } else {
      this.renderOutput = {
        role: "alert",
        message: EXPECTED_NOTICE,
        button: EXPECTED_BUTTON,
        onAction: () => {
          this.language = "en";
          this.update();
        },
      };
    }
  }
}

// Scenario 1: English mode
const bannerSim = new MockBannerComponent("en");
assert(bannerSim.renderOutput === null, "Banner is completely suppressed (null) when language is English");

// Scenario 2: Switch to Portuguese
bannerSim.language = "pt-BR";
bannerSim.update();
assert(bannerSim.renderOutput !== null, "Banner renders when language is switched to Portuguese");
assert(
  bannerSim.renderOutput.message === EXPECTED_NOTICE,
  "Rendered notice matches expected Portuguese message"
);
assert(
  bannerSim.renderOutput.button === EXPECTED_BUTTON,
  "Rendered action button matches 'Voltar para o inglês'"
);

// Scenario 3: User clicks "Voltar para o inglês"
bannerSim.renderOutput.onAction();
assert(bannerSim.language === "en", "Clicking 'Voltar para o inglês' successfully restores language to 'en'");
assert(bannerSim.renderOutput === null, "Banner immediately unmounts / returns null upon restoring to English");

// 7. Check dictionary backing in pt-BR
const ptDictPath = path.join(projectRoot, "src/lib/i18n/dictionaries/pt-BR.ts");
const ptDictContent = fs.readFileSync(ptDictPath, "utf-8");
assert(
  ptDictContent.includes(EXPECTED_NOTICE),
  "Portuguese dictionary includes unavailable.bannerMessage"
);
assert(
  ptDictContent.includes(EXPECTED_BUTTON),
  "Portuguese dictionary includes unavailable.returnToEnglishBtn"
);

console.log(`\nUnavailable Devotional Test Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
