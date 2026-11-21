export type SupportedLanguage = "en" | "pt-BR";
export type ProductEdition = "en" | "pt-BR";

export interface EditionInfo {
  id: ProductEdition;
  name: string;
  shortName: string;
  locale: "en" | "pt-BR";
  tagline: string;
  editionBadge: string;
  totalDays: number;
  availableDays: number;
  statusDescription: string;
}

export const EDITIONS: Record<ProductEdition, EditionInfo> = {
  en: {
    id: "en",
    name: "365 Days With Jesus",
    shortName: "English Edition",
    locale: "en",
    tagline: "A Year-Long Journey of Grace, Reflection & Divine Fellowship",
    editionBadge: "Complete 365 Days",
    totalDays: 365,
    availableDays: 365,
    statusDescription: "Complete 365-Day Devotional Sanctuary (Jan–Dec)",
  },
  "pt-BR": {
    id: "pt-BR",
    name: "365 Dias com Jesus",
    shortName: "Edição em Português",
    locale: "pt-BR",
    tagline: "Uma Jornada de Fé, Graça e Comunhão Diária com Cristo",
    editionBadge: "Janeiro (Dias 1–31)",
    totalDays: 365,
    availableDays: 31,
    statusDescription: "Edição Brasileira • Janeiro Completo (Dias 1–31)",
  },
};

export interface MonthlyThemeI18n {
  month_number: number;
  theme_title: string;
  spiritual_focus: string;
  key_scripture_reference: string;
  key_scripture_text: string;
  overview_description: string;
}

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    loading: string;
    back: string;
    next: string;
    previous: string;
    continue: string;
    completed: string;
    markAsCompleted: string;
    markCompleted: string;
    markedCompleted: string;
    share: string;
    copied: string;
    search: string;
    filter: string;
    all: string;
    settings: string;
    myProgress: string;
    today: string;
    day: string;
    dayCount: string; // "Day {day} of 365"
    month: string;
    monthCount: string; // "Month {month}"
    amen: string;
    actions: string;
    language: string;
    selectLanguage: string;
    english: string;
    portuguese: string;
  };
  nav: {
    dashboard: string;
    devotional: string;
    calendar: string;
    prayerWall: string;
    gratitude: string;
    journal: string;
    printables: string;
    sanctuary: string;
    todayAnchor: string; // "Today: Day {day}"
    print: string;
  };
  dashboard: {
    welcomeGreeting: string; // "Start your day with faith, beloved."
    welcomeSubtitle: string;
    morningSanctuaryBadge: string;
    spiritualStreak: string;
    streakDaysCompleted: string;
    todayCardTitle: string;
    readDevotionalBtn: string;
    quickGratitudeTitle: string;
    quickGratitudePlaceholder: string;
    quickGratitudeSaved: string;
    quickGratitudeSubmit: string;
    activePrayersTitle: string;
    viewAllPrayers: string;
    monthlyThemeTitle: string;
    currentMonthFocus: string;
    yearlyProgress: string;
    favoriteScriptures: string;
    noFavoritesYet: string;
    sacredQuietTime: string;
  };
  devotional: {
    dayBadge: string; // "Day {day} of 365 • Quiet Time Sanctuary"
    themeOfMonth: string; // "Theme of the Month: {theme}"
    editorialNotice: string;
    todayScriptureTitle: string;
    morningReflectionTitle: string;
    reflectionQuestionsTitle: string;
    reflectionQuestionsSubtitle: string;
    journalBoxLabel: string;
    journalBoxPlaceholder: string;
    saveJournalEntry: string;
    journalSavedNotice: string;
    guidedPrayerTitle: string;
    addToPrayerWall: string;
    dailyIntentionTitle: string;
    dailyIntentionHint: string;
    practicalActionTitle: string;
    practicalActionHint: string;
    eveningReflectionTitle: string;
    textSizeLabel: string;
    textSizeNormal: string;
    textSizeLarge: string;
    textSizeExtraLarge: string;
    printDevotional: string;
    saveToFavorites: string;
    savedToFavorites: string;
    shareCitation: string;
    copiedToClipboard: string;
  };
  calendar: {
    pageTitle: string;
    pageSubtitle: string;
    viewYear: string;
    viewMonth: string;
    legendCompleted: string;
    legendToday: string;
    legendUpcoming: string;
    jumpToToday: string;
    selectMonth: string;
    monthlyOverview: string;
    daysCompletedCount: string; // "{completed} of {total} days completed"
    startDevotional: string;
  };
  prayer: {
    pageTitle: string;
    pageSubtitle: string;
    newPrayerBtn: string;
    modalTitle: string;
    inputTitleLabel: string;
    inputTitlePlaceholder: string;
    inputDescLabel: string;
    inputDescPlaceholder: string;
    categoryLabel: string;
    categoryAll: string;
    categoryPersonal: string;
    categoryFamily: string;
    categoryFriends: string;
    categoryChurch: string;
    categoryHealth: string;
    categoryWork: string;
    categoryWorld: string;
    categoryOther: string;
    iPrayedBtn: string;
    prayedTimes: string; // "Prayed {count} times"
    markAnsweredBtn: string;
    answeredBadge: string;
    praiseReportLabel: string;
    praiseReportPlaceholder: string;
    emptyState: string;
  };
  gratitude: {
    pageTitle: string;
    pageSubtitle: string;
    dailyAltarTitle: string;
    promptText: string;
    item1Placeholder: string;
    item2Placeholder: string;
    item3Placeholder: string;
    eveningPeaceLabel: string;
    eveningPeacePlaceholder: string;
    saveGratitudeBtn: string;
    savedNotice: string;
    pastEntriesTitle: string;
    noEntriesYet: string;
    gratitudeStreakCount: string;
  };
  journal: {
    pageTitle: string;
    pageSubtitle: string;
    newEntryBtn: string;
    entryTitlePlaceholder: string;
    entryContentPlaceholder: string;
    searchPlaceholder: string;
    filterFavorites: string;
    savedLocallyNotice: string;
    emptyState: string;
    editEntry: string;
    deleteConfirm: string;
  };
  printables: {
    pageTitle: string;
    pageSubtitle: string;
    formatLetter: string;
    formatA4: string;
    printCurrentDay: string;
    downloadPdf: string;
    layoutNotice: string;
    paperFormatLabel: string;
    dailyQuietTimeSheet: string;
    weeklyOverviewSheet: string;
  };
  onboarding: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
    getStartedBtn: string;
    commitmentPrompt: string;
  };
  unavailable: {
    bannerMessage: string;
    returnToEnglishBtn: string;
    dismissNotice: string;
  };
}
