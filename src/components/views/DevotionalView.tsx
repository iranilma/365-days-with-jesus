"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
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

interface DevotionalViewProps {
  edition?: "en" | "pt-BR";
  dayNumber: number;
}

export function DevotionalView({ edition, dayNumber }: DevotionalViewProps) {
  const router = useRouter();
  const { t, getTheme, language: contextLang } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";
  const basePrefix = isPt ? "/pt-br" : "/en";

  // Portuguese resolution with strict zero-fallback boundary
  const ptResult = isPt ? getPortugueseDevotional(dayNumber) : null;
  const isPtPublished = Boolean(isPt && ptResult?.available && ptResult?.entry && ptResult?.status === "published");

  // English resolution - strictly queried ONLY when active edition is English
  const englishEntry = !isPt ? getDevotionalEntry(dayNumber) : null;

  // Active entry - strictly isolated by edition
  const entry = isPt ? (isPtPublished ? ptResult?.entry : null) : englishEntry;
  const monthNumber = isPt ? (ptResult?.month_number || 1) : (englishEntry?.month_number || 1);
  const theme = getTheme(monthNumber);

  const [fontSize, setFontSizeState] = useState<"normal" | "large" | "xlarge">("normal");
  const [completed, setCompleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadFontSize = () => {
      try {
        const saved = localStorage.getItem("sanctuary_font_size") as "normal" | "large" | "xlarge" | null;
        if (saved && ["normal", "large", "xlarge"].includes(saved)) {
          setFontSizeState(saved);
        }
      } catch {}
    };

    loadFontSize();
    window.addEventListener("sanctuary_font_size_changed", loadFontSize);
    window.addEventListener("storage", loadFontSize);

    const userState = getUserState();
    setCompleted(userState.completed_days.includes(dayNumber));
    setIsFavorite(
      userState.favorite_verses.some((v) => v.day_number === dayNumber)
    );

    const journals = getJournals();
    const existing = journals.find((j) => j.day_number === dayNumber);
    if (existing) {
      setReflectionAnswer(existing.content);
    } else {
      setReflectionAnswer("");
    }

    return () => {
      window.removeEventListener("sanctuary_font_size_changed", loadFontSize);
      window.removeEventListener("storage", loadFontSize);
    };
  }, [dayNumber]);

  // If in Portuguese edition and day is not published, render complete Portuguese unavailable screen
  if (isPt && (!isPtPublished || !entry)) {
    return (
      <PortugueseUnavailableDevotionalView
        dayNumber={dayNumber}
        monthNumber={monthNumber}
        monthThemeTitle={theme.theme_title}
        basePrefix={basePrefix}
      />
    );
  }

  // Safety check (for English, entry is always defined)
  if (!entry) return null;

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
      title:
        isPt
          ? `Dia ${entry.day_number}: Reflexão sobre ${entry.scripture_primary_reference}`
          : `Day ${entry.day_number}: Reflection on ${entry.scripture_primary_reference}`,
      content: reflectionAnswer,
      is_favorite: false,
    });

    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      const shareUrl = typeof window !== "undefined" ? window.location.href : `https://365dayswithjesus.com${basePrefix}/devotional/${entry.day_number}`;
      const citation =
        isPt
          ? `"${entry.scripture_primary_text}" — ${entry.scripture_primary_reference} (${entry.scripture_translation})\n\nLeia mais em 365 Dias com Jesus: ${shareUrl}`
          : `"${entry.scripture_primary_text}" — ${entry.scripture_primary_reference} (${entry.scripture_translation})\n\nRead more on 365 Days With Jesus: ${shareUrl}`;
      navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const prevDay = entry.day_number > 1 ? entry.day_number - 1 : 365;
  const nextDay = entry.day_number < 365 ? entry.day_number + 1 : 1;

  const getFontSizeClass = () => {
    if (fontSize === "large") return "text-lg leading-relaxed";
    if (fontSize === "xlarge") return "text-xl leading-loose";
    return "text-base leading-relaxed";
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-2">
      {/* Top Header / Breadcrumbs & Day Pager */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-sanctuary-taupe border-b border-sanctuary-taupeLight/40 pb-4">
        <div className="flex items-center gap-2">
          <Link href={`${basePrefix}/app`} className="hover:text-sanctuary-cocoa font-medium flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{isPt ? "Início" : "Sanctuary"}</span>
          </Link>
          <span>/</span>
          <Link href={`${basePrefix}/calendar`} className="hover:text-sanctuary-cocoa">
            {t("common.monthCount", { month: entry.month_number })}: {theme.theme_title}
          </Link>
          <span>/</span>
          <span className="text-sanctuary-cocoa font-semibold">
            {t("common.day")} {entry.day_number}
          </span>
        </div>

        {/* Previous / Next Day Navigation */}
        <div className="flex items-center gap-1.5">
          <Link
            href={`${basePrefix}/devotional/${prevDay}`}
            className="p-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
            title={isPt ? "Dia Anterior" : "Previous Day"}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <span className="font-semibold text-sanctuary-cocoa text-xs">
            {t("common.dayCount", { day: entry.day_number })}
          </span>
          <Link
            href={`${basePrefix}/devotional/${nextDay}`}
            className="p-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
            title={isPt ? "Próximo Dia" : "Next Day"}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Devotional Container */}
      <article data-font-size={fontSize} className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
        {/* Title, Badge & Theme */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sanctuary-rose" />
            <span>
              {isPt
                ? `Dia ${entry.day_number} de 365 • Santuário de Oração`
                : t("devotional.dayBadge", { day: entry.day_number })}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sanctuary-cocoa tracking-tight leading-tight">
            {entry.title}
          </h1>

          <p className="font-serif italic text-sm sm:text-base text-sanctuary-rose">
            {t("common.monthCount", { month: entry.month_number })}: {theme.theme_title} • {theme.spiritual_focus}
          </p>
        </div>

        {/* Action Toolbar: Favorite, Complete Toggle, Share & Print */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 bg-sanctuary-ivoryLight rounded-2xl border border-sanctuary-taupeLight/50 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                isFavorite
                  ? "bg-sanctuary-blush text-sanctuary-rose border-sanctuary-rose font-semibold"
                  : "bg-white text-sanctuary-cocoa border-sanctuary-taupeLight hover:bg-sanctuary-blushLight"
              }`}
              title={isFavorite ? t("devotional.savedToFavorites") : t("devotional.saveToFavorites")}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
              <span>{isFavorite ? t("devotional.savedToFavorites") : t("devotional.saveToFavorites")}</span>
            </button>

            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                completed
                  ? "bg-sanctuary-sageLight text-sanctuary-cocoa border-sanctuary-sage font-semibold"
                  : "bg-white text-sanctuary-cocoa border-sanctuary-taupeLight hover:bg-sanctuary-blushLight"
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${completed ? "text-sanctuary-sage" : "text-sanctuary-taupe"}`}
              />
              <span>{completed ? t("common.markedCompleted") : t("common.markAsCompleted")}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
              title={t("devotional.shareCitation")}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <Link
              href={`${basePrefix}/printables/${entry.day_number}`}
              className="p-2 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
              title={t("devotional.printDevotional")}
            >
              <Printer className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {copied && (
          <div className="p-2.5 rounded-xl bg-sanctuary-blush text-sanctuary-cocoa text-xs text-center font-medium animate-fade-in border border-sanctuary-rose/30">
            {t("devotional.copiedToClipboard")}
          </div>
        )}

        {/* SECTION 1: TODAY'S SCRIPTURE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sanctuary-rose">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t("devotional.todayScriptureTitle")}</span>
          </div>

          <div className="p-6 sm:p-8 bg-sanctuary-ivory rounded-2xl border-l-4 border-sanctuary-rose shadow-xs">
            <p className="font-serif dev-scripture-text text-xl sm:text-2xl text-sanctuary-cocoa italic leading-relaxed">
              &ldquo;{entry.scripture_primary_text}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-sanctuary-taupe border-t border-sanctuary-taupeLight/40 pt-3">
              <span className="font-bold text-sanctuary-rose tracking-wide text-sm">
                {entry.scripture_primary_reference}
              </span>
              <span>{entry.scripture_translation}</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: MORNING REFLECTION */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sanctuary-rose">
            <Sun className="w-3.5 h-3.5" />
            <span>{t("devotional.morningReflectionTitle")}</span>
          </div>

          <div className={`text-sanctuary-cocoa font-sans space-y-4 ${getFontSizeClass()}`}>
            <p className="dev-reflection-body whitespace-pre-line leading-relaxed">
              {entry.reflection_body}
            </p>
          </div>
        </section>

        <BotanicalDivider />

        {/* SECTION 3: THREE HEART REFLECTION QUESTIONS & INTEGRATED JOURNAL */}
        <section className="space-y-5 bg-sanctuary-ivoryLight rounded-3xl p-6 sm:p-8 border border-sanctuary-taupeLight/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sanctuary-rose">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("devotional.reflectionQuestionsTitle")}</span>
            </div>
            <p className="text-xs text-sanctuary-cocoaLight mt-1">
              {t("devotional.reflectionQuestionsSubtitle")}
            </p>
          </div>

          <div className="space-y-3">
            {entry.reflection_questions.map((question, qIdx) => (
              <div
                key={qIdx}
                className="p-4 rounded-2xl bg-white border border-sanctuary-taupeLight/60 text-xs sm:text-sm text-sanctuary-cocoa font-medium flex items-start gap-3 shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-sanctuary-blush text-sanctuary-rose flex items-center justify-center text-xs font-bold shrink-0">
                  {qIdx + 1}
                </span>
                <span className="dev-question-item leading-relaxed">{question}</span>
              </div>
            ))}
          </div>

          {/* Interactive Journal Reflection Box */}
          <form onSubmit={handleSaveReflection} className="mt-4 pt-4 border-t border-sanctuary-taupeLight/40 space-y-3">
            <label className="block text-xs font-semibold text-sanctuary-cocoa">
              {t("devotional.journalBoxLabel")}
            </label>
            <textarea
              rows={4}
              value={reflectionAnswer}
              onChange={(e) => setReflectionAnswer(e.target.value)}
              placeholder={t("devotional.journalBoxPlaceholder")}
              className="w-full p-4 rounded-2xl border border-sanctuary-taupeLight/70 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose leading-relaxed bg-white"
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow-xs hover:bg-sanctuary-roseDark transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>{reflectionSaved ? t("devotional.journalSavedNotice") : t("devotional.saveJournalEntry")}</span>
              </button>
              <Link
                href={`${basePrefix}/journal`}
                className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa underline underline-offset-4"
              >
                {isPt ? "Abrir Diário Completo" : "Open Full Journal"}
              </Link>
            </div>
          </form>
        </section>

        {/* SECTION 4: GUIDED PASTORAL PRAYER */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sanctuary-rose">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t("devotional.guidedPrayerTitle")}</span>
          </div>

          <div className="p-6 sm:p-8 bg-sanctuary-blushLight rounded-2xl border-l-4 border-sanctuary-rose space-y-3">
            <p className="font-serif italic dev-prayer-body text-base sm:text-lg text-sanctuary-cocoa leading-relaxed">
              &ldquo;{entry.guided_prayer}&rdquo;
            </p>
            <div className="pt-2 flex items-center justify-between text-xs text-sanctuary-taupe">
              <span className="font-serif font-bold text-sanctuary-cocoa">{t("common.amen")}</span>
              <Link
                href={`${basePrefix}/prayer`}
                className="text-xs text-sanctuary-rose font-medium hover:underline flex items-center gap-1"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>{t("devotional.addToPrayerWall")}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5: DAILY INTENTION & PRACTICAL ACTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sanctuary-rose">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("devotional.dailyIntentionTitle")}</span>
            </div>
            <p className="font-serif dev-intention-text text-sm font-bold text-sanctuary-cocoa leading-snug">
              {entry.daily_intention}
            </p>
            <p className="text-[11px] text-sanctuary-taupe">
              {t("devotional.dailyIntentionHint")}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sanctuary-sage">
              <CheckCircle2 className="w-3.5 h-3.5 text-sanctuary-sage" />
              <span>{t("devotional.practicalActionTitle")}</span>
            </div>
            <p className="dev-action-text text-xs sm:text-sm text-sanctuary-cocoa leading-relaxed font-medium">
              {entry.practical_action}
            </p>
            <p className="text-[11px] text-sanctuary-taupe">
              {t("devotional.practicalActionHint")}
            </p>
          </div>
        </section>

        {/* SECTION 6: EVENING PEACE PROMPT */}
        <section className="p-6 rounded-2xl bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/50 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-sanctuary-blush text-sanctuary-rose shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-bold text-sanctuary-cocoa">
              {t("devotional.eveningReflectionTitle")}
            </h3>
            <p className="font-serif italic dev-evening-text text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed">
              &ldquo;{entry.evening_reflection_prompt}&rdquo;
            </p>
            <p className="text-[11px] text-sanctuary-taupe pt-1">
              {t("devotional.eveningReflectionHint")}
            </p>
          </div>
        </section>
      </article>

      {/* Bottom Pager Bar */}
      <div className="flex items-center justify-between text-xs py-4 border-t border-sanctuary-taupeLight/50">
        <Link
          href={`${basePrefix}/devotional/${prevDay}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isPt ? `Dia ${prevDay}` : `Day ${prevDay}`}</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`${basePrefix}/calendar`}
            className="text-sanctuary-taupe hover:text-sanctuary-cocoa underline underline-offset-4"
          >
            {isPt ? "Ver Calendário" : "View Calendar"}
          </Link>
          <span>•</span>
          <Link
            href="/"
            className="text-sanctuary-rose font-medium hover:underline underline-offset-4"
          >
            {isPt ? "Todas as Edições" : "All Editions"}
          </Link>
        </div>

        <Link
          href={`${basePrefix}/devotional/${nextDay}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
        >
          <span>{isPt ? `Dia ${nextDay}` : `Day ${nextDay}`}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
