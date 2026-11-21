import { DevotionalEntry, MonthlyTheme } from "@/lib/types";

export type TranslationStatus =
  | "not_started" // Content planned but text not yet translated
  | "in_progress" // Currently being translated by editorial team
  | "review"      // Translated; undergoing theological/editorial review
  | "approved"    // Fully reviewed and approved for staging/preview
  | "published";  // Live in production for end users

export type ScriptureLicenseStatus =
  | "public_domain"   // e.g., Almeida Bíblia Livre (ABL), historic ARC
  | "pending_license" // e.g., NVI, ARA awaiting licensing agreement
  | "licensed"        // Commercial license secured
  | "fair_use_quote"; // Short devotional quotation under fair practice

export interface PortugueseDevotionalEntry extends Omit<DevotionalEntry, "scripture_translation"> {
  translation_status: TranslationStatus;
  scripture_translation: string;
  scripture_license_status?: ScriptureLicenseStatus;
  translator_notes?: string;
  reviewed_by?: string;
  approved_at?: string;
}

export interface PortugueseMonthlyTheme extends MonthlyTheme {
  translation_status: TranslationStatus;
}

export interface PortugueseAvailabilityResult {
  available: boolean;
  day_number: number;
  month_number: number;
  status: TranslationStatus;
  entry: PortugueseDevotionalEntry | null;
  notice: {
    badge: string;
    headline: string;
    message: string;
    action_return_english: string;
  };
}
