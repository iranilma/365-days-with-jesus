export interface MonthlyTheme {
  month_number: number;
  theme_title: string;
  spiritual_focus: string;
  key_scripture_reference: string;
  key_scripture_text: string;
  overview_description: string;
}

export interface DevotionalEntry {
  day_number: number;
  month_number: number;
  day_of_month: number;
  title: string;
  scripture_primary_reference: string;
  scripture_primary_text: string;
  scripture_translation: string;
  reflection_body: string;
  reflection_questions: string[];
  guided_prayer: string;
  daily_intention: string;
  practical_action: string;
  evening_reflection_prompt: string;
}

export type PrayerCategory =
  | "personal"
  | "family"
  | "friends"
  | "church"
  | "health"
  | "work"
  | "world"
  | "other";

export interface PrayerItem {
  id: string;
  title: string;
  description?: string;
  category: PrayerCategory;
  is_answered: boolean;
  answered_at?: string;
  praise_report?: string;
  created_at: string;
  last_prayed_at?: string;
  prayer_count: number;
}

export interface JournalEntry {
  id: string;
  day_number?: number;
  date: string;
  title: string;
  content: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  item_1: string;
  item_2?: string;
  item_3?: string;
  evening_moment_of_peace?: string;
  created_at: string;
}

export interface UserDevotionalState {
  completed_days: number[]; // e.g. [1, 2, 3]
  favorite_verses: { day_number: number; reference: string; text: string }[];
  current_day: number;
}

export type PrintPageFormat = "US_Letter" | "A4";
