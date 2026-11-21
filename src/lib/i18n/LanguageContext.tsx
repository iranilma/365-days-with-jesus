"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { enDictionary } from "./dictionaries/en";
import { ptBRDictionary } from "./dictionaries/pt-BR";
import { MONTHLY_THEMES_PT } from "./themes-pt";
import { MonthlyThemeI18n, SupportedLanguage, TranslationDictionary } from "./types";
import { MONTHLY_THEMES } from "@/lib/content/themes";

const STORAGE_KEY = "sanctuary_preferred_language";

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  getTheme: (monthNumber: number) => MonthlyThemeI18n;
  allThemes: MonthlyThemeI18n[];
  isPortuguese: boolean;
}

const dictionaries: Record<SupportedLanguage, TranslationDictionary> = {
  en: enDictionary,
  "pt-BR": ptBRDictionary,
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: unknown, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return Object.entries(params).reduce((str, [k, v]) => {
    return str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  }, template);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved && (saved === "en" || saved === "pt-BR")) {
        setLanguageState(saved);
      } else {
        // Detect browser language if no explicit preference is stored
        const browserLang = navigator.language;
        if (browserLang.startsWith("pt")) {
          setLanguageState("pt-BR");
        }
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = dictionaries[language];
      let value = getNestedValue(activeDict, key);

      // Fallback to English dictionary if key is not found
      if (value === undefined && language !== "en") {
        value = getNestedValue(dictionaries.en, key);
      }

      if (value === undefined) {
        return key; // return key as safe fallback
      }

      return interpolate(value, params);
    },
    [language]
  );

  const getTheme = useCallback(
    (monthNumber: number): MonthlyThemeI18n => {
      const targetMonth = Math.max(1, Math.min(12, monthNumber));
      if (language === "pt-BR") {
        return (
          MONTHLY_THEMES_PT.find((m) => m.month_number === targetMonth) ||
          MONTHLY_THEMES_PT[0]
        );
      }
      return (
        MONTHLY_THEMES.find((m) => m.month_number === targetMonth) ||
        MONTHLY_THEMES[0]
      );
    },
    [language]
  );

  const allThemes = useMemo(() => {
    return language === "pt-BR" ? MONTHLY_THEMES_PT : MONTHLY_THEMES;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      getTheme,
      allThemes,
      isPortuguese: language === "pt-BR",
    }),
    [language, setLanguage, t, getTheme, allThemes]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe fallback for components used outside the provider (e.g. testing)
    return {
      language: "en",
      setLanguage: () => {},
      t: (key: string, params?: Record<string, string | number>) => {
        const val = getNestedValue(enDictionary, key) || key;
        return interpolate(val, params);
      },
      getTheme: (monthNumber: number) => {
        const targetMonth = Math.max(1, Math.min(12, monthNumber));
        return (
          MONTHLY_THEMES.find((m) => m.month_number === targetMonth) ||
          MONTHLY_THEMES[0]
        );
      },
      allThemes: MONTHLY_THEMES,
      isPortuguese: false,
    };
  }
  return context;
}

export const useTranslation = useLanguage;
