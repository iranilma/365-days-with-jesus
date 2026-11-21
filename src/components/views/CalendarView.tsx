"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getUserState } from "@/lib/storage";
import { UserDevotionalState } from "@/lib/types";

interface CalendarViewProps {
  edition?: "en" | "pt-BR";
}

export function CalendarView({ edition }: CalendarViewProps) {
  const { t, getTheme, language: contextLang, allThemes } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";
  const basePrefix = isPt ? "/pt-br" : "/en";

  const [userState, setUserState] = useState<UserDevotionalState | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  useEffect(() => {
    setUserState(getUserState());
  }, []);

  const currentTheme = getTheme(selectedMonth);

  // Days in each month (30, 31, 28/29, etc. for 365 total)
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Calculate day offsets for each month
  const getDayOffset = (monthIndex: number) => {
    let offset = 0;
    for (let i = 0; i < monthIndex; i++) {
      offset += daysInMonths[i];
    }
    return offset;
  };

  const monthDayCount = daysInMonths[selectedMonth - 1];
  const startDayNumber = getDayOffset(selectedMonth - 1) + 1;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold">
          <CalendarIcon className="w-3.5 h-3.5 text-sanctuary-rose" />
          <span>{t("calendar.pageTitle")}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
          {isPt ? "Doze Temas Mensais de Fé" : "Twelve Monthly Themes of Faith"}
        </h1>
        <p className="text-sm text-sanctuary-cocoaLight">
          {t("calendar.pageSubtitle")}
        </p>
      </div>

      {/* Month Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {allThemes.map((theme) => {
          const active = selectedMonth === theme.month_number;
          return (
            <button
              key={theme.month_number}
              onClick={() => setSelectedMonth(theme.month_number)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                active
                  ? "bg-sanctuary-rose text-white shadow-sm font-semibold"
                  : "bg-white border border-sanctuary-taupeLight text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
              }`}
            >
              {t("common.monthCount", { month: theme.month_number })}
            </button>
          );
        })}
      </div>

      {/* Selected Month Theme Banner */}
      <div className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-sanctuary-rose">
            {t("common.monthCount", { month: currentTheme.month_number })} {isPt ? "Foco Espiritual" : "Spiritual Focus"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sanctuary-cocoa mt-1">
            {currentTheme.theme_title}
          </h2>
          <p className="font-serif text-sm italic text-sanctuary-taupe mt-0.5">
            {currentTheme.spiritual_focus}
          </p>

          <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed mt-3">
            {currentTheme.overview_description}
          </p>

          <div className="mt-4 p-4 bg-white/80 rounded-2xl border-l-4 border-sanctuary-rose text-xs">
            <span className="font-semibold text-sanctuary-cocoa block mb-1">
              {isPt ? "Texto Bíblico Âncora do Mês" : "Monthly Anchor Scripture"} ({currentTheme.key_scripture_reference}):
            </span>
            <p className="font-serif italic text-sanctuary-cocoaLight text-sm">
              &ldquo;{currentTheme.key_scripture_text}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Days Grid for Selected Month */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-sanctuary-cocoa">
            {isPt ? `Liturgias Diárias (${monthDayCount} Dias)` : `Daily Liturgies (${monthDayCount} Days)`}
          </h3>
          <span className="text-xs text-sanctuary-taupe">
            {isPt
              ? `Dias ${startDayNumber} a ${startDayNumber + monthDayCount - 1}`
              : `Days ${startDayNumber} to ${startDayNumber + monthDayCount - 1}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
          {Array.from({ length: monthDayCount }).map((_, index) => {
            const dayNum = startDayNumber + index;
            const completed = userState?.completed_days.includes(dayNum);
            const isToday = dayNum === 1;

            return (
              <Link
                key={dayNum}
                href={`${basePrefix}/devotional/${dayNum}`}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between h-24 sm:h-28 ${
                  isToday
                    ? "bg-white border-sanctuary-rose ring-2 ring-sanctuary-blush shadow-sm"
                    : completed
                    ? "bg-sanctuary-sageLight/60 border-sanctuary-sage text-sanctuary-cocoa"
                    : "bg-white border-sanctuary-taupeLight/60 hover:border-sanctuary-rose hover:bg-sanctuary-ivory"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-sanctuary-taupe">
                  <span>{t("common.day")} {dayNum}</span>
                  {completed && <CheckCircle2 className="w-3.5 h-3.5 text-sanctuary-sage" />}
                </div>

                <span className="font-serif text-2xl font-bold text-sanctuary-cocoa">
                  {dayNum}
                </span>

                <span className="text-[10px] text-sanctuary-rose font-medium truncate">
                  {completed ? t("common.completed") : t("calendar.startDevotional")}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
