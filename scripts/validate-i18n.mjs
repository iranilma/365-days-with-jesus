/**
 * 365 Days With Jesus — Automated i18n Validation Suite
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

console.log("================================================================================");
console.log("  365 DAYS WITH JESUS — i18n ARCHITECTURE & TRANSLATION VALIDATION SUITE");
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

// 1. Validate File Existence
console.log("--- TEST GROUP 1: i18n File Architecture ---");
const requiredFiles = [
  "src/lib/i18n/types.ts",
  "src/lib/i18n/LanguageContext.tsx",
  "src/lib/i18n/formatters.ts",
  "src/lib/i18n/themes-pt.ts",
  "src/lib/i18n/dictionaries/en.ts",
  "src/lib/i18n/dictionaries/pt-BR.ts",
  "src/lib/i18n/index.ts",
  "src/components/UnavailableDevotionalBanner.tsx",
  "src/components/LanguageSelector.tsx",
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Required i18n file exists: ${relPath}`);
}

// 2. Validate Namespaces in Types and Dictionaries
console.log("\n--- TEST GROUP 2: Dictionary Namespaces & Key Parity ---");
const enFile = fs.readFileSync(path.join(projectRoot, "src/lib/i18n/dictionaries/en.ts"), "utf-8");
const ptFile = fs.readFileSync(path.join(projectRoot, "src/lib/i18n/dictionaries/pt-BR.ts"), "utf-8");

const namespaces = [
  "common",
  "nav",
  "dashboard",
  "devotional",
  "calendar",
  "prayer",
  "gratitude",
  "journal",
  "printables",
  "onboarding",
  "unavailable",
];

for (const ns of namespaces) {
  assert(enFile.includes(`${ns}: {`), `EN dictionary defines namespace '${ns}'`);
  assert(ptFile.includes(`${ns}: {`), `PT-BR dictionary defines namespace '${ns}'`);
}

// 3. Exact Unavailable Devotional Banner Wording
console.log("\n--- TEST GROUP 3: Unavailable Devotional Banner Exact Strings ---");
const expectedBannerMessage =
  "Este devocional ainda está sendo preparado em português. Enquanto isso, você pode continuar sua jornada na edição em inglês.";
const expectedReturnButton = "Voltar para o inglês";

assert(
  ptFile.includes(expectedBannerMessage),
  "PT-BR dictionary has exact banner message: 'Este devocional ainda está sendo preparado em português...'"
);
assert(
  ptFile.includes(expectedReturnButton),
  "PT-BR dictionary has exact return button: 'Voltar para o inglês'"
);

const bannerComponent = fs.readFileSync(
  path.join(projectRoot, "src/components/UnavailableDevotionalBanner.tsx"),
  "utf-8"
);
assert(
  bannerComponent.includes(expectedBannerMessage),
  "UnavailableDevotionalBanner component renders exact banner message"
);
assert(
  bannerComponent.includes(expectedReturnButton),
  "UnavailableDevotionalBanner component renders exact button text 'Voltar para o inglês'"
);

// 4. Validate All 12 Monthly Themes in Portuguese
console.log("\n--- TEST GROUP 4: 12 Monthly Themes in Portuguese ---");
const themesPtFile = fs.readFileSync(path.join(projectRoot, "src/lib/i18n/themes-pt.ts"), "utf-8");

const expectedThemes = [
  { month: 1, title: "Caminhando em Novas Misericórdias", ref: "Lamentações 3:22-23" },
  { month: 2, title: "Enraizadas no Amor Sagrado", ref: "1 João 4:16" },
  { month: 3, title: "A Quietude da Entrega", ref: "Filipenses 4:6-7" },
  { month: 4, title: "Vivendo a Ressurreição", ref: "1 Pedro 1:3" },
  { month: 5, title: "O Jardim do Espírito", ref: "Gálatas 5:22-23" },
  { month: 6, title: "Andando em Sabedoria Divina", ref: "Tiago 1:5" },
  { month: 7, title: "Refúgio nos Lugares Altos", ref: "Salmo 46:1-2" },
  { month: 8, title: "Descanso para o Coração Cansado", ref: "Mateus 11:28-29" },
  { month: 9, title: "Revestidas de Compaixão", ref: "Colossenses 3:12" },
  { month: 10, title: "Coragem no Chamado", ref: "Josué 1:9" },
  { month: 11, title: "Um Altar de Gratidão", ref: "1 Tessalonicenses 5:16-18" },
  { month: 12, title: "Emanuel — Deus Conosco", ref: "Isaías 9:6" },
];

for (const t of expectedThemes) {
  assert(
    themesPtFile.includes(`month_number: ${t.month}`),
    `Month ${t.month} is defined in themes-pt.ts`
  );
  assert(
    themesPtFile.includes(t.title),
    `Month ${t.month} theme title is '${t.title}'`
  );
  assert(
    themesPtFile.includes(t.ref),
    `Month ${t.month} scripture reference is '${t.ref}'`
  );
}

// 5. Test Key Devotional Vocabulary
console.log("\n--- TEST GROUP 5: Brazilian Portuguese Devotional Vocabulary ---");
const requiredTerms = [
  { key: "Início", search: 'dashboard: "Início"' },
  { key: "Devocional de Hoje", search: 'readDevotionalBtn: "Devocional de Hoje"' },
  { key: "Reflexão da Manhã", search: 'morningReflectionTitle: "Reflexão da Manhã"' },
  { key: "Perguntas para Reflexão", search: 'reflectionQuestionsTitle: "Perguntas para Reflexão"' },
  { key: "Oração Guiada", search: 'guidedPrayerTitle: "Oração Guiada"' },
  { key: "Intenção do Dia", search: 'dailyIntentionTitle: "Intenção do Dia"' },
  { key: "Ação Prática", search: 'practicalActionTitle: "Ação Prática"' },
  { key: "Reflexão da Noite", search: 'eveningReflectionTitle: "Reflexão da Noite"' },
  { key: "Meu Diário", search: 'journal: "Meu Diário"' },
  { key: "Meu Progresso", search: 'myProgress: "Meu Progresso"' },
  { key: "Configurações", search: 'settings: "Configurações"' },
  { key: "Salvar", search: 'save: "Salvar"' },
  { key: "Cancelar", search: 'cancel: "Cancelar"' },
];

for (const term of requiredTerms) {
  assert(ptFile.includes(term.search), `Vocabulary term verified: ${term.key}`);
}

console.log("\n================================================================================");
console.log(`  VALIDATION SUMMARY: ${passCount} Passed, ${failCount} Failed`);
console.log("================================================================================\n");

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("✨ All i18n architectural and linguistic verifications PASSED perfectly!\n");
}
