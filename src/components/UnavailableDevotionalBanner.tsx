"use client";

import React from "react";
import { BookOpen, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface UnavailableDevotionalBannerProps {
  onSwitchToEnglish?: () => void;
  className?: string;
}

export function UnavailableDevotionalBanner({
  onSwitchToEnglish,
  className = "",
}: UnavailableDevotionalBannerProps) {
  const { setLanguage, language } = useLanguage();

  const handleReturnToEnglish = () => {
    setLanguage("en");
    if (onSwitchToEnglish) {
      onSwitchToEnglish();
    }
  };

  if (language !== "pt-BR") {
    return null;
  }

  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-2xl bg-amber-50/90 border border-amber-200/80 p-4 sm:p-5 shadow-sm text-sanctuary-cocoa animate-fade-in ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100/80 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-amber-950">
              Este devocional ainda está sendo preparado em português. Enquanto isso, você pode continuar sua jornada na edição em inglês.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReturnToEnglish}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-900 text-white hover:bg-amber-800 text-xs font-semibold tracking-wide shadow-sm transition-all whitespace-nowrap self-end sm:self-center cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Voltar para o inglês</span>
        </button>
      </div>
    </div>
  );
}
