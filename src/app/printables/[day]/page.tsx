"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { MONTHLY_THEMES } from "@/lib/content/themes";
import { getPrintFormat, setPrintFormat } from "@/lib/storage";
import { PrintPageFormat } from "@/lib/types";

export default function PrintableDevotionalPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolvedParams = use(params);
  const dayNumber = parseInt(resolvedParams.day, 10) || 1;

  // Use authoritative resolver (never silently falls back to Day 1)
  const entry = getDevotionalEntry(dayNumber);

  const theme =
    MONTHLY_THEMES.find((m) => m.month_number === entry.month_number) ||
    MONTHLY_THEMES[0];

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

  return (
    <div className="space-y-6">
      {/* Screen Control Bar (Hidden on Print) */}
      <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-5 shadow-sm print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sanctuary-taupe mb-1">
              <Link
                href={`/devotional/${entry.day_number}`}
                className="hover:text-sanctuary-cocoa flex items-center gap-1 font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back to Interactive Devotional
              </Link>
            </div>
            <h1 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              Printable Devotional Planner • Day {entry.day_number}
            </h1>
            <p className="text-xs text-sanctuary-cocoaLight mt-0.5">
              High-resolution layout calibrated for binders, quiet-time clipboards, and home printing.
            </p>
          </div>

          {/* Format Selector & Print CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-sanctuary-ivory border border-sanctuary-taupeLight/70 rounded-full p-1 text-xs">
              <button
                onClick={() => handleFormatChange("US_Letter")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  format === "US_Letter"
                    ? "bg-sanctuary-rose text-white shadow-sm"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
              >
                US Letter (8.5 × 11&quot;)
              </button>
              <button
                onClick={() => handleFormatChange("A4")}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  format === "A4"
                    ? "bg-sanctuary-rose text-white shadow-sm"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
              >
                ISO A4 (210 × 297 mm)
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sanctuary-cocoa text-white text-xs font-semibold shadow hover:bg-black transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Page / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Sheet Canvas */}
      <div
        className={`mx-auto bg-white p-8 sm:p-12 border border-sanctuary-taupeLight shadow-lg rounded-2xl print:border-none print:shadow-none print:p-0 print:rounded-none ${
          format === "US_Letter" ? "max-w-[816px]" : "max-w-[794px]"
        }`}
      >
        {/* Printable Header */}
        <header className="border-b-2 border-sanctuary-cocoa pb-4 mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BotanicalSprig className="w-6 h-6 text-sanctuary-rose" />
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-sanctuary-cocoa uppercase">
                365 DAYS WITH JESUS
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-sanctuary-taupe mt-1">
              Daily Quiet-Time Planner • Month {entry.month_number}: {theme.theme_title}
            </p>
          </div>

          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-sanctuary-rose block leading-tight">
              DAY {entry.day_number}
            </span>
            <span className="text-[10px] text-sanctuary-taupe uppercase tracking-wider">
              Date: ____________________
            </span>
          </div>
        </header>

        {/* Day Title & Scripture Box */}
        <div className="mb-6">
          <h2 className="font-serif text-xl font-bold text-sanctuary-cocoa">
            {entry.title}
          </h2>
          <div className="mt-2 p-4 bg-sanctuary-ivory border-l-4 border-sanctuary-rose rounded-r-xl">
            <p className="font-serif text-base text-sanctuary-cocoa italic leading-relaxed">
              &ldquo;{entry.scripture_primary_text}&rdquo;
            </p>
            <div className="mt-2 text-right text-xs font-semibold text-sanctuary-rose">
              — {entry.scripture_primary_reference} ({entry.scripture_translation})
            </div>
          </div>
        </div>

        {/* 2-Column Printable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-sanctuary-cocoa">
          {/* Left Column: Pastoral Reflection & Heart Questions */}
          <div className="space-y-4">
            <div className="border border-sanctuary-taupeLight/80 rounded-xl p-4">
              <h3 className="font-serif text-sm font-bold text-sanctuary-cocoa uppercase tracking-wide border-b border-sanctuary-taupeLight/40 pb-1 mb-2">
                Morning Reflection
              </h3>
              <p className="font-serif text-xs leading-relaxed text-sanctuary-cocoaLight">
                {entry.reflection_body}
              </p>
            </div>

            {/* Heart Reflection Prompts & Ruled Writing Lines */}
            <div className="border border-sanctuary-taupeLight/80 rounded-xl p-4 space-y-2">
              <h3 className="font-serif text-sm font-bold text-sanctuary-cocoa uppercase tracking-wide border-b border-sanctuary-taupeLight/40 pb-1 mb-1">
                Heart Reflections
              </h3>
              <ul className="space-y-1.5 text-[11px] text-sanctuary-cocoa font-medium mb-3">
                {entry.reflection_questions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-sanctuary-rose">{idx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>

              {/* Ruled lines for handwritten notes */}
              <div className="space-y-3 pt-2">
                <div className="ruled-line" />
                <div className="ruled-line" />
                <div className="ruled-line" />
                <div className="ruled-line" />
              </div>
            </div>
          </div>

          {/* Right Column: Guided Prayer, Gratitude & Daily Walk */}
          <div className="space-y-4">
            {/* Guided Prayer */}
            <div className="border border-sanctuary-taupeLight/80 rounded-xl p-4 bg-sanctuary-ivory/50">
              <h3 className="font-serif text-sm font-bold text-sanctuary-rose uppercase tracking-wide border-b border-sanctuary-taupeLight/40 pb-1 mb-2">
                Guided Prayer
              </h3>
              <p className="font-serif text-xs italic leading-relaxed text-sanctuary-cocoa">
                &ldquo;{entry.guided_prayer}&rdquo;
              </p>
            </div>

            {/* Today's Gratitude & Blessings (3 Ruled Prompts) */}
            <div className="border border-sanctuary-taupeLight/80 rounded-xl p-4 space-y-2">
              <h3 className="font-serif text-sm font-bold text-sanctuary-sage uppercase tracking-wide border-b border-sanctuary-taupeLight/40 pb-1 mb-2">
                Three Morning Blessings (Gratitude)
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sanctuary-taupe font-bold">1.</span>
                  <div className="ruled-line flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sanctuary-taupe font-bold">2.</span>
                  <div className="ruled-line flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sanctuary-taupe font-bold">3.</span>
                  <div className="ruled-line flex-1" />
                </div>
              </div>
            </div>

            {/* Daily Intention & Practical Step */}
            <div className="border border-sanctuary-taupeLight/80 rounded-xl p-4">
              <h3 className="font-serif text-sm font-bold text-sanctuary-cocoa uppercase tracking-wide border-b border-sanctuary-taupeLight/40 pb-1 mb-2">
                Walking with Purpose
              </h3>
              <div className="text-[11px] space-y-1.5">
                <p>
                  <strong className="text-sanctuary-rose font-semibold">Today&apos;s Intention:</strong>{" "}
                  <span className="italic">&ldquo;{entry.daily_intention}&rdquo;</span>
                </p>
                <p>
                  <strong className="text-sanctuary-sage font-semibold">Practical Action:</strong>{" "}
                  {entry.practical_action}
                </p>
              </div>
            </div>

            {/* Evening Benediction */}
            <div className="border border-dashed border-sanctuary-taupeLight rounded-xl p-3 text-[10px] text-sanctuary-taupe text-center italic">
              Evening Benediction: &ldquo;{entry.evening_reflection_prompt}&rdquo;
            </div>
          </div>
        </div>

        {/* Printable Footer */}
        <footer className="mt-8 pt-4 border-t border-sanctuary-taupeLight/70 flex items-center justify-between text-[10px] text-sanctuary-taupe">
          <span>&copy; 365 Days With Jesus • Format: {format === "US_Letter" ? "US Letter (8.5×11\")" : "A4 (210×297mm)"}</span>
          <span className="font-serif italic">&ldquo;Start your day with faith. Live with gratitude. Walk with purpose.&rdquo;</span>
          <span>Day {entry.day_number} of 365</span>
        </footer>
      </div>
    </div>
  );
}
