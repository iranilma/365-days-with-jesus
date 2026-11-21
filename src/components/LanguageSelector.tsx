"use client";

import React, { useState } from "react";
import { Check, Globe } from "lucide-react";
import { SupportedLanguage, useLanguage } from "@/lib/i18n";
import { EditionSelector } from "./EditionSelector";

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const options: { code: SupportedLanguage; label: string }[] = [
    { code: "en", label: "English" },
    { code: "pt-BR", label: "Português (Brasil)" },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-sanctuary-taupeLight/80 text-sanctuary-cocoa text-xs font-medium hover:bg-sanctuary-blushLight transition-colors shadow-sm cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={language === "pt-BR" ? "Escolher idioma / Edição" : "Choose Language / Edition"}
      >
        <span className="font-semibold uppercase text-[11px] tracking-wider">
          {language === "pt-BR" ? "PT" : "EN"}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white shadow-lg border border-sanctuary-taupeLight/60 p-1.5 z-50 animate-fade-in text-xs">
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-sanctuary-taupe font-semibold border-b border-sanctuary-taupeLight/30 mb-1">
              {language === "pt-BR" ? "Escolher Idioma" : "Choose Language"}
            </div>
            {options.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  setLanguage(opt.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                  language === opt.code
                    ? "bg-sanctuary-blush text-sanctuary-cocoa font-semibold"
                    : "text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
                }`}
              >
                <span>{opt.label}</span>
                {language === opt.code && (
                  <Check className="w-3.5 h-3.5 text-sanctuary-rose" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { EditionSelector };
