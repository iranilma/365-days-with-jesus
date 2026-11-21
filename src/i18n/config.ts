export type SupportedLanguage = "en" | "pt-BR";

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
  dir: "ltr" | "rtl";
}

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    locale: "en-US",
    dir: "ltr",
  },
  "pt-BR": {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    flag: "🇧🇷",
    locale: "pt-BR",
    dir: "ltr",
  },
};

export const LANGUAGE_STORAGE_KEY = "sanctuary_language_v1";
