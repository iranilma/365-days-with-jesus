/**
 * 365 Days With Jesus — Portuguese Content Integrity & Editorial Audit Engine
 *
 * Enforces:
 * 1. 14 Canonical Fields completeness
 * 2. Exact 3 reflection questions ending with '?'
 * 3. Zero-loss parity with English canonical source (src/lib/content/devotionals.ts)
 * 4. Zero English text contamination in Portuguese fields
 * 5. Batch-level audit tracking (Lote 1: 1-7, Lote 2: 8-14, Lote 3: 15-21, Lote 4: 22-28, Lote 5: 29-31)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

export const REQUIRED_FIELDS = [
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

// Common English markers that should NOT appear in Portuguese devotional prose
export const ENGLISH_CONTAMINATION_PATTERNS = [
  /\b(the|and|in|of|to|is|that|it|was|for|on|are|as|with|his|they|at|be|this|from|I|have|or|by|one|had|not|but|what|all|were|we|when|your|can|said|there|use|an|each|which|she|do|how|their|if|will|up|other|about|out|many|then|them|these|so|some|her|would|make|like|him|into|time|has|look|two|more|write|go|see|number|no|way|could|people|my|than|first|water|been|call|who|oil|its|now|find|long|down|day|did|get|come|made|may|part)\b/gi,
  /\bHeavenly Father\b/i,
  /\bIn Jesus' name\b/i,
  /\bWorld English Bible\b/i,
  /\bAmen\b(?!ém)/i // "Amen" instead of "Amém"
];

export const BATCHES = {
  1: { name: "Lote 1 (Dias 1–7)", start: 1, end: 7 },
  2: { name: "Lote 2 (Dias 8–14)", start: 8, end: 14 },
  3: { name: "Lote 3 (Dias 15–21)", start: 15, end: 21 },
  4: { name: "Lote 4 (Dias 22–28)", start: 22, end: 28 },
  5: { name: "Lote 5 (Dias 29–31)", start: 29, end: 31 }
};

export function auditDevotionalPair(ptEntry, enEntry) {
  const issues = [];
  const day = ptEntry.day_number || enEntry.day_number;

  // 1. Validate all 14 fields present and non-empty
  for (const field of REQUIRED_FIELDS) {
    const val = ptEntry[field];
    if (val === undefined || val === null || val === "") {
      issues.push(`[CAMPO FALTANDO] Campo '${field}' está indefinido ou vazio no Dia ${day}.`);
    }
  }

  // 2. Reflection questions integrity
  if (!Array.isArray(ptEntry.reflection_questions)) {
    issues.push(`[PERGUNTAS INVÁLIDAS] reflection_questions deve ser array no Dia ${day}.`);
  } else {
    if (ptEntry.reflection_questions.length !== 3) {
      issues.push(`[CONTAGEM DE PERGUNTAS] Dia ${day} possui ${ptEntry.reflection_questions.length} perguntas (exige exatamente 3).`);
    }
    ptEntry.reflection_questions.forEach((q, idx) => {
      if (typeof q !== "string" || !q.trim().endsWith("?")) {
        issues.push(`[PONTUAÇÃO] Pergunta ${idx + 1} do Dia ${day} não termina com '?': "${q}"`);
      }
    });
  }

  // 3. Zero-loss parity check against English canonical text
  if (enEntry) {
    const enReflWords = enEntry.reflection_body.trim().split(/\s+/).length;
    const ptReflWords = (ptEntry.reflection_body || "").trim().split(/\s+/).length;
    
    // Portuguese translations of English theological prose are typically 90% - 130% of English word count
    const wordRatio = ptReflWords / (enReflWords || 1);
    if (ptReflWords > 0 && wordRatio < 0.70) {
      issues.push(`[POSSÍVEL RESUMO/PERDA] Reflexão em PT tem apenas ${ptReflWords} palavras vs ${enReflWords} em EN (ratio ${(wordRatio*100).toFixed(1)}%). Verifique se houve omissão.`);
    }

    const enPrayerWords = enEntry.guided_prayer.trim().split(/\s+/).length;
    const ptPrayerWords = (ptEntry.guided_prayer || "").trim().split(/\s+/).length;
    const prayerRatio = ptPrayerWords / (enPrayerWords || 1);
    if (ptPrayerWords > 0 && prayerRatio < 0.65) {
      issues.push(`[POSSÍVEL OMISSÃO DE ORAÇÃO] Oração em PT tem ${ptPrayerWords} palavras vs ${enPrayerWords} em EN (ratio ${(prayerRatio*100).toFixed(1)}%).`);
    }
  }

  // 4. English contamination check
  const checkFields = [
    { name: "title", text: ptEntry.title },
    { name: "weekly_subtheme", text: ptEntry.weekly_subtheme },
    { name: "reflection_body", text: ptEntry.reflection_body },
    { name: "guided_prayer", text: ptEntry.guided_prayer },
    { name: "daily_intention", text: ptEntry.daily_intention },
    { name: "practical_action", text: ptEntry.practical_action },
    { name: "evening_reflection_prompt", text: ptEntry.evening_reflection_prompt }
  ];

  for (const { name, text } of checkFields) {
    if (!text || typeof text !== "string") continue;
    // Check for exact English phrases
    if (/Heavenly Father/i.test(text)) {
      issues.push(`[CONTAMINAÇÃO EN] 'Heavenly Father' encontrado em '${name}' no Dia ${day}. Use 'Pai Celestial'.`);
    }
    if (/In Jesus' name/i.test(text)) {
      issues.push(`[CONTAMINAÇÃO EN] 'In Jesus\' name' encontrado em '${name}' no Dia ${day}. Use 'Em nome de Jesus'.`);
    }
    if (/\bAmen\b(?!ém)/i.test(text) && !/Amém/i.test(text)) {
      issues.push(`[CONTAMINAÇÃO EN] 'Amen' encontrado em '${name}' no Dia ${day}. Use 'Amém'.`);
    }
    if (/World English Bible/i.test(text)) {
      issues.push(`[CONTAMINAÇÃO EN] 'World English Bible' encontrado em '${name}' no Dia ${day}.`);
    }
  }

  return {
    day,
    valid: issues.length === 0,
    issues,
    ptReflWords: (ptEntry.reflection_body || "").trim().split(/\s+/).length,
    ptPrayerWords: (ptEntry.guided_prayer || "").trim().split(/\s+/).length
  };
}
