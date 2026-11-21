import { SupportedLanguage } from "./types";

export const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: "en-US",
  "pt-BR": "pt-BR",
};

/**
 * Format a Date object or ISO date string according to locale.
 */
export function formatDate(
  date: Date | string,
  language: SupportedLanguage = "en",
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = options || {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat(LOCALE_MAP[language], defaultOptions).format(d);
}

/**
 * Format date for daily devotional headers (e.g., "Saturday, January 1, 2026" or "Sábado, 1 de janeiro de 2026")
 */
export function formatFullDevotionalDate(
  date: Date | string,
  language: SupportedLanguage = "en"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const formatted = new Intl.DateTimeFormat(LOCALE_MAP[language], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  // Capitalize first letter in Portuguese (e.g. "sábado" -> "Sábado")
  if (language === "pt-BR" && formatted.length > 0) {
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  return formatted;
}

/**
 * Converts a day number (1 to 365) to an estimated calendar date in a non-leap year (e.g. 2026).
 */
export function getDateFromDayNumber(dayNumber: number, year: number = 2026): Date {
  const date = new Date(year, 0, 1);
  date.setDate(dayNumber);
  return date;
}

/**
 * Format a day number (1-365) to localized month and day (e.g. "January 1" or "1 de janeiro")
 */
export function formatDayOfMonth(
  dayNumber: number,
  language: SupportedLanguage = "en",
  year: number = 2026
): string {
  const date = getDateFromDayNumber(dayNumber, year);
  if (language === "pt-BR") {
    const day = date.getDate();
    const month = date.toLocaleDateString("pt-BR", { month: "long" });
    return `${day} de ${month}`;
  }
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

/**
 * Localized standalone month names (Title Case for cards, selectors, navigation).
 */
export const STANDALONE_MONTHS: Record<SupportedLanguage, string[]> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  "pt-BR": [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],
};

/**
 * Localized short month abbreviations.
 */
export const SHORT_MONTHS: Record<SupportedLanguage, string[]> = {
  en: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  "pt-BR": [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ],
};

/**
 * Localized weekday headers for calendar matrices.
 */
export const WEEKDAYS_SHORT: Record<SupportedLanguage, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "pt-BR": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
};

/**
 * Get standalone month name by month number (1-12).
 */
export function getMonthName(monthNumber: number, language: SupportedLanguage = "en"): string {
  const idx = Math.max(1, Math.min(12, monthNumber)) - 1;
  return STANDALONE_MONTHS[language][idx];
}

/**
 * Format relative dates (e.g., "Hoje", "Ontem", "2 dias atrás")
 */
export function formatRelativeDate(
  dateStr: string,
  language: SupportedLanguage = "en"
): string {
  const target = new Date(dateStr);
  const now = new Date();
  
  // Set both to midnight UTC for day difference
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const diffDays = Math.round((today - targetDay) / (1000 * 60 * 60 * 24));

  if (language === "pt-BR") {
    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays === -1) return "Amanhã";
    if (diffDays > 1 && diffDays < 7) return `${diffDays} dias atrás`;
    return formatDate(target, "pt-BR", { day: "numeric", month: "short" });
  }

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays === -1) return "Tomorrow";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  return formatDate(target, "en", { day: "numeric", month: "short" });
}

/**
 * Format localized numbers (thousands separator, decimals).
 */
export function formatNumber(
  num: number,
  language: SupportedLanguage = "en"
): string {
  return new Intl.NumberFormat(LOCALE_MAP[language]).format(num);
}
