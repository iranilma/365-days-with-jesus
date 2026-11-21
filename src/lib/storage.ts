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

// Portuguese default initial states
const defaultUserStatePt: UserDevotionalState = {
  completed_days: [1],
  favorite_verses: [
    {
      day_number: 1,
      reference: "Lamentações 3:22-23",
      text: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se a cada manhã. Grande é a tua fidelidade.",
    },
  ],
  current_day: 1,
};

const defaultPrayersPt: PrayerItem[] = [
  {
    id: "prayer-1-pt",
    title: "Paz e discernimento para a caminhada de nossa família",
    description: "Pedindo ao Espírito Santo que guarde os corações e nos conceda santa sabedoria nas decisões diárias.",
    category: "family",
    is_answered: false,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    last_prayed_at: new Date().toISOString(),
    prayer_count: 4,
  },
  {
    id: "prayer-2-pt",
    title: "Restauração de saúde e renovo para quem amamos",
    description: "Orando por rápida recuperação física e profundo consolo emocional do Senhor durante o tratamento.",
    category: "health",
    is_answered: true,
    answered_at: new Date().toISOString(),
    praise_report: "O Senhor respondeu às nossas orações e concedeu alívio e renovação completa. Glória a Deus!",
    created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    last_prayed_at: new Date().toISOString(),
    prayer_count: 12,
  },
  {
    id: "prayer-3-pt",
    title: "Serenidade de alma e descanso no Senhor",
    description: "Senhor, firma os meus passos na Tua presença mesmo em meio às demandas inesperadas.",
    category: "personal",
    is_answered: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_prayed_at: new Date().toISOString(),
    prayer_count: 2,
  },
];

const defaultGratitudesPt: GratitudeEntry[] = [
  {
    id: "gratitude-1-pt",
    date: new Date().toISOString().split("T")[0],
    item_1: "A dádiva da luz da manhã que renova as misericórdias do Senhor.",
    item_2: "A paz no coração e o abraço carinhoso da família ao começar o dia.",
    item_3: "A promessa em Lamentações de que o amor de Deus nunca tem fim.",
    evening_moment_of_peace: "Sentar-se ao fim da tarde em quietude, agradecendo a Deus por Sua graça sustentadora.",
    created_at: new Date().toISOString(),
  },
];

const defaultJournalsPt: JournalEntry[] = [
  {
    id: "journal-1-pt",
    day_number: 1,
    date: new Date().toISOString().split("T")[0],
    title: "Dia 1: Entrando no Santo Ritmo da Graça",
    content: "Hoje senti um alívio profundo ao lembrar que as misericórdias do Senhor se renovam a cada manhã. Não preciso carregar o cansaço do mês que passou. Obrigado, Pai, por me encontrar neste lugar de paz.",
    is_favorite: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function isPortugueseContext(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const lang = localStorage.getItem("sanctuary_preferred_language");
    if (lang === "pt-BR") return true;
    if (window.location.pathname.startsWith("/pt")) return true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("edition") === "pt" || urlParams.get("lang") === "pt") return true;
    return false;
  } catch {
    return false;
  }
}

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
  const fallback = isPortugueseContext() ? defaultUserStatePt : defaultUserState;
  return getLocalItem<UserDevotionalState>(STORAGE_KEYS.USER_STATE, fallback);
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
  const fallback = isPortugueseContext() ? defaultPrayersPt : defaultPrayers;
  return getLocalItem<PrayerItem[]>(STORAGE_KEYS.PRAYERS, fallback);
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
  const fallback = isPortugueseContext() ? defaultGratitudesPt : defaultGratitudes;
  return getLocalItem<GratitudeEntry[]>(STORAGE_KEYS.GRATITUDES, fallback);
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
  const fallback = isPortugueseContext() ? defaultJournalsPt : defaultJournals;
  return getLocalItem<JournalEntry[]>(STORAGE_KEYS.JOURNALS, fallback);
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
