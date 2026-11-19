"use client";

import {
  DevotionalEntry,
  GratitudeEntry,
  JournalEntry,
  PrayerItem,
  PrintPageFormat,
  UserDevotionalState,
} from "./types";

const STORAGE_KEYS = {
  USER_STATE: "sanctuary_user_state_v1",
  PRAYERS: "sanctuary_prayers_v1",
  JOURNALS: "sanctuary_journals_v1",
  GRATITUDES: "sanctuary_gratitudes_v1",
  PRINT_FORMAT: "sanctuary_print_format_v1",
};

// Default initial state
const defaultUserState: UserDevotionalState = {
  completed_days: [1], // Day 1 completed for preview
  favorite_verses: [
    {
      day_number: 1,
      reference: "Lamentations 3:22-23",
      text: "His compassions don't fail. They are new every morning. Great is your faithfulness.",
    },
  ],
  current_day: 1,
};

const defaultPrayers: PrayerItem[] = [
  {
    id: "prayer-1",
    title: "Peace and guidance for our family's upcoming transition",
    description: "Asking the Holy Spirit to guard our children's hearts and give us holy wisdom in our schedule and decisions.",
    category: "family",
    is_answered: false,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    last_prayed_at: new Date().toISOString(),
    prayer_count: 4,
  },
  {
    id: "prayer-2",
    title: "Complete healing and strength for Sarah's recovery",
    description: "Praying for quick physical recuperation and deep emotional comfort during her treatment.",
    category: "health",
    is_answered: true,
    answered_at: new Date().toISOString(),
    praise_report: "Doctor confirmed the scan was clear! God was so faithful through every test.",
    created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    last_prayed_at: new Date().toISOString(),
    prayer_count: 12,
  },
  {
    id: "prayer-3",
    title: "Quietness of soul and freedom from mid-week anxiety",
    description: "Lord, keep my mind steady when unexpected demands press in.",
    category: "personal",
    is_answered: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_prayed_at: new Date().toISOString(),
    prayer_count: 2,
  },
];

const defaultGratitudes: GratitudeEntry[] = [
  {
    id: "gratitude-1",
    date: new Date().toISOString().split("T")[0],
    item_1: "The warm sunlight streaming through the kitchen window during quiet time.",
    item_2: "My daughter's sweet, unprompted hug before school.",
    item_3: "God's promise in Lamentations that his mercies never run out.",
    evening_moment_of_peace: "Sitting by the lamplight with a warm cup of chamomile tea, whispering thanks for God's sustaining grace.",
    created_at: new Date().toISOString(),
  },
];

const defaultJournals: JournalEntry[] = [
  {
    id: "journal-1",
    day_number: 1,
    date: new Date().toISOString().split("T")[0],
    title: "Day 1: Stepping into the Sacred Rhythm",
    content: "Today I felt a profound sense of relief reading that God's compassions are new every single morning. I don't have to carry the fatigue or mistakes of last month into this new season. Lord, thank You for meeting me in the quiet.",
    is_favorite: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper to safely access localStorage
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// User state operations
export function getUserState(): UserDevotionalState {
  return getLocalItem<UserDevotionalState>(STORAGE_KEYS.USER_STATE, defaultUserState);
}

export function saveUserState(state: UserDevotionalState): void {
  setLocalItem(STORAGE_KEYS.USER_STATE, state);
}

export function toggleDayCompleted(day: number): UserDevotionalState {
  const current = getUserState();
  const exists = current.completed_days.includes(day);
  const updatedCompleted = exists
    ? current.completed_days.filter((d) => d !== day)
    : [...current.completed_days, day];

  const updated: UserDevotionalState = {
    ...current,
    completed_days: updatedCompleted,
  };
  saveUserState(updated);
  return updated;
}

export function toggleFavoriteVerse(verse: { day_number: number; reference: string; text: string }): boolean {
  const current = getUserState();
  const index = current.favorite_verses.findIndex((v) => v.day_number === verse.day_number);
  let updatedFavorites = [...current.favorite_verses];
  let isNowFav = false;

  if (index >= 0) {
    updatedFavorites.splice(index, 1);
    isNowFav = false;
  } else {
    updatedFavorites.push(verse);
    isNowFav = true;
  }

  saveUserState({
    ...current,
    favorite_verses: updatedFavorites,
  });
  return isNowFav;
}

// Prayer operations
export function getPrayers(): PrayerItem[] {
  return getLocalItem<PrayerItem[]>(STORAGE_KEYS.PRAYERS, defaultPrayers);
}

export function savePrayer(prayer: Omit<PrayerItem, "id" | "created_at" | "prayer_count">): PrayerItem {
  const prayers = getPrayers();
  const newPrayer: PrayerItem = {
    ...prayer,
    id: `prayer-${Date.now()}`,
    created_at: new Date().toISOString(),
    prayer_count: 1,
    last_prayed_at: new Date().toISOString(),
  };
  const updated = [newPrayer, ...prayers];
  setLocalItem(STORAGE_KEYS.PRAYERS, updated);
  return newPrayer;
}

export function incrementPrayerCount(id: string): PrayerItem[] {
  const prayers = getPrayers();
  const updated = prayers.map((p) =>
    p.id === id
      ? {
          ...p,
          prayer_count: p.prayer_count + 1,
          last_prayed_at: new Date().toISOString(),
        }
      : p
  );
  setLocalItem(STORAGE_KEYS.PRAYERS, updated);
  return updated;
}

export function markPrayerAnswered(id: string, praise_report: string): PrayerItem[] {
  const prayers = getPrayers();
  const updated = prayers.map((p) =>
    p.id === id
      ? {
          ...p,
          is_answered: true,
          answered_at: new Date().toISOString(),
          praise_report,
        }
      : p
  );
  setLocalItem(STORAGE_KEYS.PRAYERS, updated);
  return updated;
}

export function deletePrayer(id: string): PrayerItem[] {
  const prayers = getPrayers();
  const updated = prayers.filter((p) => p.id !== id);
  setLocalItem(STORAGE_KEYS.PRAYERS, updated);
  return updated;
}

// Gratitude operations
export function getGratitudes(): GratitudeEntry[] {
  return getLocalItem<GratitudeEntry[]>(STORAGE_KEYS.GRATITUDES, defaultGratitudes);
}

export function saveGratitude(entry: Omit<GratitudeEntry, "id" | "created_at">): GratitudeEntry {
  const gratitudes = getGratitudes();
  const existingIndex = gratitudes.findIndex((g) => g.date === entry.date);
  
  if (existingIndex >= 0) {
    const updated = [...gratitudes];
    updated[existingIndex] = {
      ...updated[existingIndex],
      ...entry,
    };
    setLocalItem(STORAGE_KEYS.GRATITUDES, updated);
    return updated[existingIndex];
  } else {
    const newEntry: GratitudeEntry = {
      ...entry,
      id: `gratitude-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...gratitudes];
    setLocalItem(STORAGE_KEYS.GRATITUDES, updated);
    return newEntry;
  }
}

// Journal operations
export function getJournals(): JournalEntry[] {
  return getLocalItem<JournalEntry[]>(STORAGE_KEYS.JOURNALS, defaultJournals);
}

export function saveJournal(entry: Omit<JournalEntry, "id" | "created_at" | "updated_at"> & { id?: string }): JournalEntry {
  const journals = getJournals();
  if (entry.id) {
    const updated = journals.map((j) =>
      j.id === entry.id
        ? {
            ...j,
            ...entry,
            updated_at: new Date().toISOString(),
          }
        : j
    );
    setLocalItem(STORAGE_KEYS.JOURNALS, updated);
    return updated.find((j) => j.id === entry.id)!;
  } else {
    const newEntry: JournalEntry = {
      ...entry,
      id: `journal-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...journals];
    setLocalItem(STORAGE_KEYS.JOURNALS, updated);
    return newEntry;
  }
}

export function deleteJournal(id: string): JournalEntry[] {
  const journals = getJournals();
  const updated = journals.filter((j) => j.id !== id);
  setLocalItem(STORAGE_KEYS.JOURNALS, updated);
  return updated;
}

// Print settings
export function getPrintFormat(): PrintPageFormat {
  return getLocalItem<PrintPageFormat>(STORAGE_KEYS.PRINT_FORMAT, "US_Letter");
}

export function setPrintFormat(format: PrintPageFormat): void {
  setLocalItem(STORAGE_KEYS.PRINT_FORMAT, format);
}
