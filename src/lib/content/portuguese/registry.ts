import { PortugueseDevotionalEntry, TranslationStatus } from "./types";
import { JANUARY_PORTUGUESE_DEVOTIONALS } from "./january";

/**
 * Portuguese Devotional Registry
 *
 * January (Days 1–31): Approved & Published (Conselho Editorial & Teológico Antigravity)
 * February–December (Days 32–365): Initialized as "not_started" awaiting future editorial phases.
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

// Generate remaining entries (Days 32–365) initialized as "not_started"
const REMAINING_PORTUGUESE_DEVOTIONALS: PortugueseDevotionalEntry[] = Array.from(
  { length: 365 - 31 },
  (_, i) => {
    const dayNumber = i + 32;
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

// Unified 365-day Portuguese Devotional Registry
export const PORTUGUESE_DEVOTIONAL_REGISTRY: PortugueseDevotionalEntry[] = [
  ...JANUARY_PORTUGUESE_DEVOTIONALS,
  ...REMAINING_PORTUGUESE_DEVOTIONALS,
];
