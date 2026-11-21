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
import {
  EDITIONS,
  EditionInfo,
  MonthlyThemeI18n,
  ProductEdition,
  SupportedLanguage,
  TranslationDictionary,
} from "./types";
import { MONTHLY_THEMES } from "@/lib/content/themes";

const STORAGE_KEY = "sanctuary_preferred_language";

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  edition: EditionInfo;
  activeEdition: ProductEdition;
  setEdition: (edition: ProductEdition) => void;
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

export function LanguageProvider({
  children,
  forcedEdition,
}: {
  children: React.ReactNode;
  forcedEdition?: SupportedLanguage;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    forcedEdition || "en"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (forcedEdition) {
      setLanguageState(forcedEdition);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        // 1. Path prefix check (Authoritative over stored preferences)
        const path = window.location.pathname;
        if (path.startsWith("/pt-br") || path.startsWith("/pt")) {
          setLanguageState("pt-BR");
          return;
        }
        if (path.startsWith("/en")) {
          setLanguageState("en");
          return;
        }

        // 2. URL search param check (e.g. ?edition=pt or ?edition=en)
        const urlParams = new URLSearchParams(window.location.search);
        const editionParam = urlParams.get("edition") || urlParams.get("lang");
        if (editionParam === "pt" || editionParam === "pt-BR" || editionParam === "pt_BR") {
          setLanguageState("pt-BR");
          localStorage.setItem(STORAGE_KEY, "pt-BR");
          return;
        } else if (editionParam === "en") {
          setLanguageState("en");
          localStorage.setItem(STORAGE_KEY, "en");
          return;
        }
      }

      // 3. Stored preference (Only for ambiguous routes)
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved && (saved === "en" || saved === "pt-BR")) {
        setLanguageState(saved);
        return;
      }

      // 4. Browser language detection
      if (typeof navigator !== "undefined" && navigator.language?.startsWith("pt")) {
        setLanguageState("pt-BR");
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
  }, [forcedEdition]);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  const setEdition = useCallback((edition: ProductEdition) => {
    setLanguage(edition);
  }, [setLanguage]);

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

  const edition = useMemo(() => EDITIONS[language], [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      edition,
      activeEdition: language,
      setEdition,
      t,
      getTheme,
      allThemes,
      isPortuguese: language === "pt-BR",
    }),
    [language, setLanguage, edition, setEdition, t, getTheme, allThemes]
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
      edition: EDITIONS.en,
      activeEdition: "en",
      setEdition: () => {},
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
