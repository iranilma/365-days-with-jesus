"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from "./config";
import { en, Translations } from "./translations/en";
import { ptBR } from "./translations/pt-BR";
import { getLocalizedTheme } from "./translations/themes";
import { MonthlyTheme } from "@/lib/types";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
  dict: Translations;
  locale: string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  getTheme: (monthNumber: number) => MonthlyTheme;
}

const DICTIONARIES: Record<SupportedLanguage, Translations> = {
  en,
  "pt-BR": ptBR,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
      if (stored && (stored === "en" || stored === "pt-BR")) {
        setLanguageState(stored);
        document.documentElement.lang = stored;
      } else {
        // Optional browser detection suggestion, default to English per directive
        const browserLang = navigator.language;
        if (browserLang.toLowerCase().startsWith("pt")) {
          // Keep as suggestion or let user pick, but store default en unless explicit
          // Directive: "English must remain the default language for new users unless they explicitly select Portuguese during onboarding."
          setLanguageState(DEFAULT_LANGUAGE);
          document.documentElement.lang = DEFAULT_LANGUAGE;
        }
      }
    } catch {}
  }, []);

  const setLanguage = (newLang: SupportedLanguage) => {
    if (newLang !== "en" && newLang !== "pt-BR") return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {}
  };

  const dict = DICTIONARIES[language] || en;
  const locale = SUPPORTED_LANGUAGES[language]?.locale || "en-US";

  // Helper to resolve nested keys like "nav.brandTitle" or "dashboard.badge"
  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const keys = keyPath.split(".");
    let current: any = dict;
    let fallback: any = en;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        current = undefined;
      }

      if (fallback && typeof fallback === "object" && k in fallback) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
      }
    }

    let result = typeof current === "string" ? current : typeof fallback === "string" ? fallback : keyPath;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
      });
    }

    return result;
  };

  const formatDate = (dateInput: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
      if (isNaN(date.getTime())) return String(dateInput);

      const defaultOptions: Intl.DateTimeFormatOptions = options || {
        weekday: "long",
        month: "long",
        day: "numeric",
      };

      return date.toLocaleDateString(locale, defaultOptions);
    } catch {
      return String(dateInput);
    }
  };

  const getTheme = (monthNumber: number): MonthlyTheme => {
    return getLocalizedTheme(monthNumber, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dict,
        locale,
        formatDate,
        getTheme,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
