import { PortugueseDevotionalEntry, TranslationStatus } from "./types";

/**
 * Portuguese Devotional Registry
 *
 * NOTE: As mandated by editorial guidelines, devotional translations and theological review
 * are handled in a dedicated project phase.
 * All 365 days are registered here with strict workflow tracking.
 * Unapproved or unpublished entries are NEVER exposed as live devotional text to end users.
 */

// Calendar bounds mapping
const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getMonthAndDay(dayNumber: number): { month: number; dayOfMonth: number } {
  let remaining = dayNumber;
  for (let m = 0; m < 12; m++) {
    if (remaining <= DAYS_PER_MONTH[m]) {
      return { month: m + 1, dayOfMonth: remaining };
    }
    remaining -= DAYS_PER_MONTH[m];
  }
  return { month: 12, dayOfMonth: 31 };
}

// Generate the 365 entries initialized as "not_started"
export const PORTUGUESE_DEVOTIONAL_REGISTRY: PortugueseDevotionalEntry[] = Array.from(
  { length: 365 },
  (_, i) => {
    const dayNumber = i + 1;
    const { month, dayOfMonth } = getMonthAndDay(dayNumber);
    return {
      day_number: dayNumber,
      month_number: month,
      day_of_month: dayOfMonth,
      weekly_subtheme: undefined,
      title: "",
      scripture_primary_reference: "",
      scripture_primary_text: "",
      scripture_translation: "Tradução sob verificação de licenciamento",
      scripture_license_status: "pending_license",
      reflection_body: "",
      reflection_questions: [],
      guided_prayer: "",
      daily_intention: "",
      practical_action: "",
      evening_reflection_prompt: "",
      translation_status: "not_started" as TranslationStatus,
      is_placeholder: true,
    };
  }
);
