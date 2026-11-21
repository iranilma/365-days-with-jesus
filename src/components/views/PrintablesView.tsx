"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Printer,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { PortugueseUnavailableDevotionalView } from "@/components/PortugueseUnavailableDevotionalView";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { getPortugueseDevotional } from "@/lib/content/portuguese/resolver";
import { useLanguage } from "@/lib/i18n";
import { getPrintFormat, setPrintFormat } from "@/lib/storage";
import { PrintPageFormat } from "@/lib/types";

interface PrintablesViewProps {
  edition?: "en" | "pt-BR";
  dayNumber: number;
}

export function PrintablesView({ edition, dayNumber }: PrintablesViewProps) {
  const { t, getTheme, language: contextLang } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";
  const basePrefix = isPt ? "/pt-br" : "/en";

  const ptAvailability = isPt ? getPortugueseDevotional(dayNumber) : null;
  const isPtAvailable = Boolean(ptAvailability?.available && ptAvailability?.entry && ptAvailability?.status === "published");
  const englishEntry = !isPt ? getDevotionalEntry(dayNumber) : null;

  const monthNumber = isPt ? (ptAvailability?.month_number || 1) : (englishEntry?.month_number || 1);
  const theme = getTheme(monthNumber);
  const [format, setFormat] = useState<PrintPageFormat>("US_Letter");
  const [includeBlankLines, setIncludeBlankLines] = useState(true);

  useEffect(() => {
    setFormat(getPrintFormat());
  }, []);

  const handleFormatChange = (newFormat: PrintPageFormat) => {
    setFormat(newFormat);
    setPrintFormat(newFormat);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (isPt && (!isPtAvailable || !ptAvailability?.entry)) {
    return (
      <PortugueseUnavailableDevotionalView
        dayNumber={dayNumber}
        monthNumber={theme.month_number}
        monthThemeTitle={theme.theme_title}
        basePrefix={basePrefix}
      />
    );
  }

  const entry = isPt && ptAvailability?.entry ? ptAvailability.entry : englishEntry;
  if (!entry) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Screen Control Bar (Hidden on Print) */}
      <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-5 shadow-sm print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sanctuary-taupe mb-1">
              <Link
                href={`${basePrefix}/devotional/${entry.day_number}`}
                className="hover:text-sanctuary-cocoa flex items-center gap-1 font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{isPt ? "Voltar ao Devocional" : "Back to Devotional"}</span>
              </Link>
            </div>
            <h1 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              {isPt
                ? `Planejador Devocional para Imprimir • Dia ${entry.day_number}`
                : `Printable Devotional Planner • Day ${entry.day_number}`}
            </h1>
            <p className="text-xs text-sanctuary-cocoaLight mt-0.5">
              {isPt
                ? "Layout de alta resolução calibrado para fichários, pranchetas e impressão doméstica."
                : "High-resolution layout calibrated for binders, quiet-time clipboards, and home printing."}
            </p>
          </div>

          {/* Format Selector & Print CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-sanctuary-ivory border border-sanctuary-taupeLight/70 rounded-full p-1 text-xs">
              <button
                onClick={() => handleFormatChange("US_Letter")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  format === "US_Letter"
                    ? "bg-sanctuary-rose text-white shadow-sm"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
              >
                US Letter (8.5 × 11&quot;)
              </button>
              <button
                onClick={() => handleFormatChange("A4")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  format === "A4"
                    ? "bg-sanctuary-rose text-white shadow-sm"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
              >
                A4 (210 × 297 mm)
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isPt ? "Imprimir Agora" : "Print Sheet"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Sheet (Standardized Print Layout) */}
      <div
        className={`bg-white p-8 sm:p-12 border border-sanctuary-taupeLight/80 rounded-3xl print:p-0 print:border-none print:shadow-none space-y-6 ${
          format === "A4" ? "max-w-[210mm] mx-auto" : "max-w-[8.5in] mx-auto"
        }`}
      >
        {/* Printable Header */}
        <div className="border-b-2 border-sanctuary-cocoa/80 pb-4 flex items-center justify-between">
          <div>
            <span className="font-serif text-xs font-bold tracking-widest uppercase text-sanctuary-rose block">
              {isPt ? "365 DIAS COM JESUS • SANTUÁRIO DIÁRIO" : "365 DAYS WITH JESUS • DAILY DEVOTIONAL SANCTUARY"}
            </span>
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa mt-0.5">
              {isPt ? `Dia ${entry.day_number}: ${entry.title}` : `Day ${entry.day_number}: ${entry.title}`}
            </h2>
          </div>
          <div className="text-right text-xs text-sanctuary-taupe">
            <span className="font-bold text-sanctuary-cocoa block">
              {isPt ? `Mês ${entry.month_number}` : `Month ${entry.month_number}`}
            </span>
            <span>{theme.theme_title}</span>
          </div>
        </div>

        {/* Scripture Box */}
        <div className="p-5 bg-sanctuary-ivory/60 border-l-4 border-sanctuary-rose rounded-xl space-y-2">
          <p className="font-serif italic text-base text-sanctuary-cocoa leading-relaxed">
            &ldquo;{entry.scripture_primary_text}&rdquo;
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-sanctuary-taupe pt-1">
            <span className="text-sanctuary-rose">{entry.scripture_primary_reference}</span>
            <span>{entry.scripture_translation}</span>
          </div>
        </div>

        {/* Reflection Excerpt */}
        <div className="space-y-1.5 text-xs sm:text-sm text-sanctuary-cocoa leading-relaxed">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sanctuary-rose block">
            {isPt ? "Meditação Matinal" : "Morning Reflection"}
          </span>
          <p>{entry.reflection_body}</p>
        </div>

        {/* Questions & Notes Lines */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sanctuary-rose block">
            {isPt ? "Perguntas de Reflexão & Anotações Pessoais" : "Reflection Questions & Quiet Time Notes"}
          </span>
          {entry.reflection_questions.map((q, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="text-xs font-medium text-sanctuary-cocoa">
                {idx + 1}. {q}
              </p>
              {includeBlankLines && (
                <div className="space-y-2 pt-1">
                  <div className="border-b border-sanctuary-taupeLight/60 h-4 w-full" />
                  <div className="border-b border-sanctuary-taupeLight/60 h-4 w-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pastoral Prayer */}
        <div className="p-4 bg-sanctuary-blushLight/50 rounded-xl border border-sanctuary-blush space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sanctuary-rose block">
            {isPt ? "Oração Pastoral Guiada" : "Guided Pastoral Prayer"}
          </span>
          <p className="font-serif italic text-xs text-sanctuary-cocoa leading-relaxed">
            &ldquo;{entry.guided_prayer}&rdquo;
          </p>
        </div>

        {/* Intention & Practical Action */}
        <div className="grid grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3 bg-sanctuary-ivory/50 rounded-xl border border-sanctuary-taupeLight/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sanctuary-rose block">
              {isPt ? "Intenção Diária" : "Daily Intention"}
            </span>
            <p className="font-serif font-bold text-sanctuary-cocoa mt-0.5">
              {entry.daily_intention}
            </p>
          </div>
          <div className="p-3 bg-sanctuary-ivory/50 rounded-xl border border-sanctuary-taupeLight/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sanctuary-sage block">
              {isPt ? "Passo Prático" : "Practical Action"}
            </span>
            <p className="text-sanctuary-cocoa mt-0.5">
              {entry.practical_action}
            </p>
          </div>
        </div>

        {/* Printable Footer */}
        <div className="border-t border-sanctuary-taupeLight/50 pt-3 flex items-center justify-between text-[10px] text-sanctuary-taupe">
          <span>{isPt ? "365 Dias com Jesus • Edição para Impressão" : "365 Days With Jesus • Printable Edition"}</span>
          <span>{isPt ? "Almeida Bíblia Livre (Domínio Público)" : "World English Bible (Public Domain)"}</span>
        </div>
      </div>
    </div>
  );
}
