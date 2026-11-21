"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Heart,
  Moon,
  PenTool,
  Printer,
  Share2,
  Sparkles,
  Sun,
  Volume2,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";
import { PortugueseUnavailableDevotionalView } from "@/components/PortugueseUnavailableDevotionalView";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { getPortugueseDevotional } from "@/lib/content/portuguese/resolver";
import { useLanguage } from "@/lib/i18n";
import {
  getJournals,
  getUserState,
  saveJournal,
  toggleDayCompleted,
  toggleFavoriteVerse,
} from "@/lib/storage";

export default function DevotionalDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const dayNumber = parseInt(resolvedParams.day, 10) || 1;
  const { t, getTheme, language, setLanguage } = useLanguage();

  // Use authoritative resolver (never silently falls back to Day 1)
  const englishEntry = getDevotionalEntry(dayNumber);
  const ptResult = language === "pt-BR" ? getPortugueseDevotional(dayNumber) : null;
  const isPtActive = language === "pt-BR" && ptResult?.available && ptResult?.entry && ptResult?.status === "published";
  const entry = isPtActive && ptResult?.entry ? ptResult.entry : englishEntry;

  const theme = getTheme(entry.month_number);

  const [fontSize, setFontSizeState] = useState<"normal" | "large" | "xlarge">("normal");
  const [completed, setCompleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Restore persistent user font size preference
    try {
      const saved = localStorage.getItem("sanctuary_font_size") as "normal" | "large" | "xlarge" | null;
      if (saved && ["normal", "large", "xlarge"].includes(saved)) {
        setFontSizeState(saved);
      }
    } catch {}

    const userState = getUserState();
    setCompleted(userState.completed_days.includes(entry.day_number));
    setIsFavorite(
      userState.favorite_verses.some((v) => v.day_number === entry.day_number)
    );

    // Load any existing journal answer for this day
    const journals = getJournals();
    const existing = journals.find((j) => j.day_number === entry.day_number);
    if (existing) {
      setReflectionAnswer(existing.content);
    } else {
      setReflectionAnswer("");
    }
  }, [entry.day_number]);

  const handleSetFontSize = (size: "normal" | "large" | "xlarge") => {
    setFontSizeState(size);
    try {
      localStorage.setItem("sanctuary_font_size", size);
    } catch {}
  };

  const handleToggleComplete = () => {
    const updated = toggleDayCompleted(entry.day_number);
    setCompleted(updated.completed_days.includes(entry.day_number));
  };

  const handleToggleFavorite = () => {
    const isFav = toggleFavoriteVerse({
      day_number: entry.day_number,
      reference: entry.scripture_primary_reference,
      text: entry.scripture_primary_text,
    });
    setIsFavorite(isFav);
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return;

    saveJournal({
      day_number: entry.day_number,
      date: new Date().toISOString().split("T")[0],
      title: `Day ${entry.day_number}: Reflection on ${entry.scripture_primary_reference}`,
      content: reflectionAnswer,
      is_favorite: false,
    });

    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `"${entry.scripture_primary_text}" — ${entry.scripture_primary_reference} (${entry.scripture_translation})\n\nRead more on 365 Days With Jesus: https://365dayswithjesus.com/devotional/${entry.day_number}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Check Portuguese content availability
  if (language === "pt-BR") {
    if (!isPtActive || !ptResult?.entry) {
      return (
        <PortugueseUnavailableDevotionalView
          dayNumber={englishEntry.day_number}
          monthNumber={englishEntry.month_number}
          monthThemeTitle={theme.theme_title}
          onSwitchToEnglish={() => setLanguage("en")}
        />
      );
    }
  }

  const prevDay = entry.day_number > 1 ? entry.day_number - 1 : 365;
  const nextDay = entry.day_number < 365 ? entry.day_number + 1 : 1;

  const getFontSizeClass = () => {
    if (fontSize === "large") return "text-lg leading-relaxed";
    if (fontSize === "xlarge") return "text-xl leading-loose";
    return "text-base leading-relaxed";
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Top Breadcrumb & Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sanctuary-taupe border-b border-sanctuary-taupeLight/40 pb-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-sanctuary-cocoa flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> {t("nav.dashboard")}
          </Link>
          <span>/</span>
          <Link href="/calendar" className="hover:text-sanctuary-cocoa">
            {t("common.monthCount", { month: entry.month_number })}: {theme.theme_title}
          </Link>
          <span>/</span>
          <span className="text-sanctuary-cocoa font-semibold">{t("common.dayCount", { day: entry.day_number })}</span>
        </div>

        {/* Reader Customization (Font Size & Print) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-sanctuary-taupeLight/70 rounded-full px-2 py-0.5 shadow-sm" role="group" aria-label="Text size options">
            <span className="text-[11px] mr-1.5 text-sanctuary-taupe select-none">{t("devotional.textSizeLabel")}</span>
            <button
              type="button"
              onClick={() => handleSetFontSize("normal")}
              aria-label="Standard text size"
              aria-pressed={fontSize === "normal"}
              title="Standard text size (A)"
              className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
                fontSize === "normal"
                  ? "bg-sanctuary-rose text-white shadow-sm"
                  : "text-sanctuary-cocoa hover:text-sanctuary-rose"
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => handleSetFontSize("large")}
              aria-label="Large text size"
              aria-pressed={fontSize === "large"}
              title="Large text size (A+)"
              className={`px-2 py-0.5 rounded-full text-sm font-bold transition-all ${
                fontSize === "large"
                  ? "bg-sanctuary-rose text-white shadow-sm"
                  : "text-sanctuary-cocoa hover:text-sanctuary-rose"
              }`}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => handleSetFontSize("xlarge")}
              aria-label="Extra large text size"
              aria-pressed={fontSize === "xlarge"}
              title="Extra large text size (A++)"
              className={`px-2 py-0.5 rounded-full text-base font-bold transition-all ${
                fontSize === "xlarge"
                  ? "bg-sanctuary-rose text-white shadow-sm"
                  : "text-sanctuary-cocoa hover:text-sanctuary-rose"
              }`}
            >
              A++
            </button>
          </div>

          <Link
            href={`/printables/${entry.day_number}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-sanctuary-taupe" />
            <span>{t("devotional.printDevotional")}</span>
          </Link>
        </div>
      </div>

      {/* Devotional Header */}
      <header className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold">
          <Sparkles className="w-3 h-3 text-sanctuary-rose" />
          <span>{t("devotional.dayBadge", { day: entry.day_number })}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sanctuary-cocoa tracking-tight">
          {entry.title}
        </h1>

        <p className="text-sm font-sans tracking-wide text-sanctuary-taupe uppercase">
          {t("devotional.themeOfMonth", { theme: theme.theme_title })}
        </p>

        {entry.is_placeholder && (
          <div className="inline-block p-2.5 px-4 rounded-2xl bg-sanctuary-sageLight/70 border border-sanctuary-sage text-xs text-sanctuary-cocoa">
            <span className="font-bold">Editorial Curation Notice:</span> Day {entry.day_number} is scheduled in the 365-day publication plan under Month {entry.month_number} ({theme.theme_title}). Below is the structured quiet-time liturgy for your reflection.
          </div>
        )}

        {/* Action Controls Pill */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={handleToggleComplete}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              completed
                ? "bg-sanctuary-sageLight text-sanctuary-cocoa border border-sanctuary-sage"
                : "bg-sanctuary-ivoryLight text-sanctuary-cocoaLight border border-sanctuary-taupeLight hover:text-sanctuary-cocoa"
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${completed ? "text-sanctuary-sage" : "text-sanctuary-taupe"}`}
            />
            <span>{completed ? t("common.markedCompleted") : t("common.markAsCompleted")}</span>
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full border transition-all ${
              isFavorite
                ? "bg-sanctuary-rose text-white border-sanctuary-rose shadow-sm"
                : "bg-white text-sanctuary-taupe border-sanctuary-taupeLight hover:text-sanctuary-rose"
            }`}
            title="Save scripture to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white text-sanctuary-taupe border border-sanctuary-taupeLight hover:text-sanctuary-cocoa transition-all"
            title="Copy scripture citation"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {copied && (
            <span className="text-xs text-sanctuary-sage font-medium animate-fade-in">
              {t("common.copied")}
            </span>
          )}
        </div>
      </header>

      {/* 1. Scripture Focus Card */}
      <section className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-sanctuary-taupeLight/30 mb-6">
          <span className="text-xs uppercase font-sans tracking-widest text-sanctuary-taupe font-semibold flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-sanctuary-rose" />
            {t("devotional.todayScriptureTitle")}
          </span>
          <span className="text-xs text-sanctuary-rose font-semibold tracking-wide">
            {entry.scripture_primary_reference}
          </span>
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-sanctuary-cocoa italic leading-relaxed text-center max-w-2xl mx-auto my-4">
          &ldquo;{entry.scripture_primary_text}&rdquo;
        </blockquote>

        <div className="text-center pt-4">
          <span className="text-[11px] font-sans text-sanctuary-taupe">
            {entry.scripture_translation}
          </span>
        </div>
      </section>

      {/* 2. Morning Reflection Essay */}
      <section className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-sanctuary-taupeLight/30">
          <Sun className="w-4 h-4 text-sanctuary-rose" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa">
            {t("devotional.morningReflectionTitle")}
          </h2>
        </div>

        <div className={`font-serif text-sanctuary-cocoa leading-relaxed space-y-4 pt-2 ${getFontSizeClass()}`}>
          <p className="whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-sanctuary-rose first-letter:leading-none">
            {entry.reflection_body}
          </p>
        </div>
      </section>

      {/* 3. Heart Reflection Prompts & Interactive Response Box */}
      <section className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-sanctuary-taupeLight/30">
          <PenTool className="w-4 h-4 text-sanctuary-rose" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa">
            {t("devotional.reflectionQuestionsTitle")}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-sanctuary-cocoaLight">
          {t("devotional.reflectionQuestionsSubtitle")}
        </p>

        <div className="space-y-4">
          {entry.reflection_questions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 bg-sanctuary-ivory rounded-2xl border border-sanctuary-taupeLight/50 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="font-serif text-sm sm:text-base text-sanctuary-cocoa font-medium leading-snug">
                {q}
              </p>
            </div>
          ))}
        </div>

        {/* Private Personal Reflection Journal Box */}
        <form onSubmit={handleSaveReflection} className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-sanctuary-cocoa">
              {t("common.dayCount", { day: entry.day_number })} {t("nav.journal")}
            </label>
            <span className="text-[11px] text-sanctuary-taupe">Saved privately on this device</span>
          </div>

          <textarea
            rows={4}
            value={reflectionAnswer}
            onChange={(e) => setReflectionAnswer(e.target.value)}
            placeholder={t("devotional.journalPromptHelp")}
            className="w-full text-sm p-4 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight focus:outline-none focus:border-sanctuary-rose leading-relaxed font-serif"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-sanctuary-sage font-medium">
              {reflectionSaved && t("devotional.savedToJournal")}
            </span>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-sanctuary-rose text-white text-xs font-semibold hover:bg-sanctuary-roseDark transition-colors shadow-sm"
            >
              {t("devotional.saveToJournal")}
            </button>
          </div>
        </form>
      </section>

      {/* 4. Guided Prayer Card */}
      <section className="bg-sanctuary-blushLight border border-sanctuary-rose/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 pb-2">
          <Heart className="w-4 h-4 text-sanctuary-rose fill-current" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa">
            {t("devotional.guidedPrayerTitle")}
          </h2>
        </div>

        <p className="font-serif text-base sm:text-lg text-sanctuary-cocoa italic leading-relaxed max-w-2xl mx-auto">
          &ldquo;{entry.guided_prayer}&rdquo;
        </p>

        <div className="pt-2 text-xs text-sanctuary-taupe">
          <Link href="/prayer" className="hover:text-sanctuary-rose font-medium">
            {t("devotional.addToPrayerWall")}
          </Link>
        </div>
      </section>

      {/* 5. Walking With Purpose Card */}
      <section className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-sanctuary-cocoa mb-4 pb-2 border-b border-sanctuary-taupeLight/30">
          Walking with Purpose
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-sanctuary-ivory rounded-2xl border border-sanctuary-taupeLight/40">
            <span className="text-xs uppercase font-sans tracking-widest text-sanctuary-rose font-bold block mb-1">
              {t("devotional.dailyIntentionTitle")}
            </span>
            <p className="font-serif text-sm sm:text-base text-sanctuary-cocoa italic leading-relaxed">
              &ldquo;{entry.daily_intention}&rdquo;
            </p>
            <p className="text-[11px] text-sanctuary-taupe mt-2">
              {t("devotional.dailyIntentionHint")}
            </p>
          </div>

          <div className="p-4 bg-sanctuary-sageLight/50 rounded-2xl border border-sanctuary-sage/40">
            <span className="text-xs uppercase font-sans tracking-widest text-sanctuary-sage font-bold block mb-1">
              {t("devotional.practicalActionTitle")}
            </span>
            <p className="text-xs sm:text-sm text-sanctuary-cocoa leading-relaxed">
              {entry.practical_action}
            </p>
            <p className="text-[11px] text-sanctuary-taupe mt-2">
              {t("devotional.practicalActionHint")}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Bedside Evening Examen */}
      <section className="p-6 bg-sanctuary-ivory rounded-3xl border border-dashed border-sanctuary-taupeLight/80 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sanctuary-taupe uppercase tracking-wider">
          <Moon className="w-3.5 h-3.5 text-sanctuary-rose" />
          <span>{t("devotional.eveningReflectionTitle")}</span>
        </div>
        <p className="font-serif text-sm sm:text-base text-sanctuary-cocoa italic max-w-xl mx-auto">
          &ldquo;{entry.evening_reflection_prompt}&rdquo;
        </p>
      </section>

      {/* Day Navigation Controls Footer */}
      <footer className="pt-6 border-t border-sanctuary-taupeLight/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <Link
          href={`/devotional/${prevDay}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous: Day {prevDay}</span>
        </Link>

        <button
          onClick={handleToggleComplete}
          className="px-6 py-2.5 rounded-full bg-sanctuary-rose text-white font-semibold hover:bg-sanctuary-roseDark transition-colors shadow-sm"
        >
          {completed ? "Quiet Time Completed ✓" : "Complete Today's Devotional"}
        </button>

        <Link
          href={`/devotional/${nextDay}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
        >
          <span>Next: Day {nextDay}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </div>
  );
}
