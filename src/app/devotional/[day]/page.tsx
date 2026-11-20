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
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { MONTHLY_THEMES } from "@/lib/content/themes";
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

  // Use authoritative resolver (never silently falls back to Day 1)
  const entry = getDevotionalEntry(dayNumber);

  const theme =
    MONTHLY_THEMES.find((m) => m.month_number === entry.month_number) ||
    MONTHLY_THEMES[0];

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
        `"${entry.scripture_primary_text}" — ${entry.scripture_primary_reference} (365 Days With Jesus, Day ${entry.day_number})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Reader typography scaling across all devotional sections
  const typography = {
    normal: {
      scripture: "text-xl sm:text-2xl leading-relaxed",
      body: "text-base sm:text-lg leading-relaxed",
      prayer: "text-base sm:text-lg leading-relaxed",
      question: "text-xs sm:text-sm leading-relaxed",
      intention: "text-lg",
      action: "text-sm leading-relaxed",
      evening: "text-xs sm:text-sm leading-relaxed",
    },
    large: {
      scripture: "text-2xl sm:text-3xl leading-relaxed",
      body: "text-lg sm:text-xl leading-relaxed",
      prayer: "text-lg sm:text-xl leading-relaxed",
      question: "text-sm sm:text-base leading-relaxed",
      intention: "text-xl",
      action: "text-base leading-relaxed",
      evening: "text-sm sm:text-base leading-relaxed",
    },
    xlarge: {
      scripture: "text-3xl sm:text-4xl leading-relaxed",
      body: "text-xl sm:text-2xl leading-loose",
      prayer: "text-xl sm:text-2xl leading-loose",
      question: "text-base sm:text-lg leading-relaxed",
      intention: "text-2xl",
      action: "text-lg leading-relaxed",
      evening: "text-base sm:text-lg leading-relaxed",
    },
  }[fontSize];

  return (
    <article data-font-size={fontSize} className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Breadcrumb & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sanctuary-taupe border-b border-sanctuary-taupeLight/50 pb-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-sanctuary-cocoa flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <span>/</span>
          <Link href="/calendar" className="hover:text-sanctuary-cocoa">
            Month {entry.month_number}: {theme.theme_title}
          </Link>
          <span>/</span>
          <span className="text-sanctuary-cocoa font-semibold">Day {entry.day_number}</span>
        </div>

        {/* Reader Customization (Font Size & Print) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-sanctuary-taupeLight/70 rounded-full px-2 py-0.5 shadow-sm" role="group" aria-label="Text size options">
            <span className="text-[11px] mr-1.5 text-sanctuary-taupe select-none">Text:</span>
            <button
              type="button"
              onClick={() => handleSetFontSize("normal")}
              aria-label="Normal text size"
              aria-pressed={fontSize === "normal"}
              title="Normal text size (A)"
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${
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
            <span>Print Planner</span>
          </Link>
        </div>
      </div>

      {/* Devotional Header */}
      <header className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold">
          <Sparkles className="w-3 h-3 text-sanctuary-rose" />
          <span>Day {entry.day_number} of 365 • Quiet Time Sanctuary</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sanctuary-cocoa tracking-tight">
          {entry.title}
        </h1>

        <p className="text-sm font-sans tracking-wide text-sanctuary-taupe uppercase">
          Theme of the Month: {theme.theme_title}
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
            <span>{completed ? "Quiet Time Completed" : "Mark as Completed"}</span>
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full border transition-all ${
              isFavorite
                ? "bg-sanctuary-blush border-sanctuary-rose text-sanctuary-rose"
                : "bg-white border-sanctuary-taupeLight text-sanctuary-taupe hover:text-sanctuary-rose"
            }`}
            title="Save scripture to favorites"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-taupe hover:text-sanctuary-cocoa transition-all"
            title="Copy scripture citation"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copied && (
            <span className="text-xs text-sanctuary-rose font-medium animate-pulse">
              Copied to clipboard!
            </span>
          )}
        </div>
      </header>

      {/* 1. Scripture Spotlight Box */}
      <section className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-sanctuary-taupeLight/40 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sanctuary-rose">
            <Bookmark className="w-4 h-4" />
            <span>Today&apos;s Holy Scripture</span>
          </div>
          <span className="text-[11px] text-sanctuary-taupe font-medium">
            {entry.scripture_translation}
          </span>
        </div>

        <blockquote className={`dev-scripture-text font-serif text-sanctuary-cocoa italic text-center sm:text-left px-2 sm:px-4 transition-all ${typography.scripture}`}>
          &ldquo;{entry.scripture_primary_text}&rdquo;
        </blockquote>

        <div className="mt-4 text-right pr-4">
          <span className="font-serif text-base sm:text-lg font-bold text-sanctuary-rose">
            — {entry.scripture_primary_reference}
          </span>
        </div>
      </section>

      {/* 2. Pastoral Reflection Body */}
      <section className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sanctuary-taupe mb-2">
          <Sun className="w-4 h-4 text-sanctuary-rose" />
          <span>Morning Reflection</span>
        </div>

        <div className={`dev-reflection-body font-serif text-sanctuary-cocoa transition-all ${typography.body}`}>
          <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-sanctuary-rose first-letter:mr-1 first-letter:float-left">
            {entry.reflection_body}
          </p>
        </div>
      </section>

      {/* 3. Reflection Questions & Inline Journaling */}
      <section className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-sanctuary-taupeLight/40 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sanctuary-rose">
            <PenTool className="w-4 h-4" />
            <span>Heart Reflection & Personal Journal</span>
          </div>
          <span className="text-xs text-sanctuary-taupe">Day {entry.day_number} Journal</span>
        </div>

        <p className="text-xs sm:text-sm text-sanctuary-cocoaLight">
          Take a quiet moment with the Holy Spirit to ponder these questions:
        </p>

        <ul className="space-y-3">
          {entry.reflection_questions.map((q, idx) => (
            <li
              key={idx}
              className={`dev-question-item flex items-start gap-3 p-3.5 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight/40 text-sanctuary-cocoa transition-all ${typography.question}`}
            >
              <span className="w-5 h-5 rounded-full bg-sanctuary-blush text-sanctuary-cocoa font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="font-medium leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>

        {/* Private In-Page Journal Entry */}
        <form onSubmit={handleSaveReflection} className="mt-4 pt-2 space-y-3">
          <label className="block text-xs font-semibold text-sanctuary-cocoa">
            Your Personal Reflections & Thoughts for Today:
          </label>
          <textarea
            rows={4}
            value={reflectionAnswer}
            onChange={(e) => setReflectionAnswer(e.target.value)}
            placeholder="Write your prayers, thoughts, or what God is whispering to your heart this morning..."
            className="w-full text-sm p-4 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-sanctuary-taupe">
              Entries are saved locally and securely.
            </span>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold hover:bg-sanctuary-rose hover:text-white transition-colors"
            >
              {reflectionSaved ? "✓ Reflection Saved" : "Save Journal Entry"}
            </button>
          </div>
        </form>
      </section>

      {/* 4. Guided Prayer Card */}
      <section className="bg-sanctuary-ivory border-2 border-sanctuary-rose/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sanctuary-rose">
          <Heart className="w-4 h-4 fill-current" />
          <span>Guided Quiet-Time Prayer</span>
        </div>

        <p className={`dev-prayer-body font-serif text-sanctuary-cocoa italic transition-all ${typography.prayer}`}>
          &ldquo;{entry.guided_prayer}&rdquo;
        </p>

        <div className="pt-2 flex items-center justify-between">
          <Link
            href="/prayer"
            className="text-xs font-medium text-sanctuary-rose hover:underline inline-flex items-center gap-1"
          >
            + Add personal petition to Prayer Wall
          </Link>
          <span className="text-xs font-serif italic text-sanctuary-taupe">Amen.</span>
        </div>
      </section>

      {/* 5. Daily Intention & Practical Faith Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intention */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-sanctuary-rose flex items-center gap-1.5 mb-2">
              <Sun className="w-4 h-4" />
              Daily Walk Intention
            </span>
            <p className={`dev-intention-text font-serif text-sanctuary-cocoa font-medium italic transition-all ${typography.intention}`}>
              &ldquo;{entry.daily_intention}&rdquo;
            </p>
          </div>
          <p className="text-[11px] text-sanctuary-taupe mt-4">
            Repeat this gently throughout your day whenever worry surfaces.
          </p>
        </div>

        {/* Practical Action */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-sanctuary-sage flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4" />
              Practical Faith Step
            </span>
            <p className={`dev-action-text text-sanctuary-cocoa font-medium transition-all ${typography.action}`}>
              {entry.practical_action}
            </p>
          </div>
          <p className="text-[11px] text-sanctuary-taupe mt-4">
            Living faith is woven into ordinary, loving actions.
          </p>
        </div>
      </div>

      {/* 6. Evening Reflection Prompt */}
      <section className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 shadow-sm flex items-start gap-4">
        <Moon className="w-5 h-5 text-sanctuary-taupe shrink-0 mt-1" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sanctuary-taupe block mb-1">
            Evening Benediction & Pondering
          </span>
          <p className={`dev-evening-text text-sanctuary-cocoa italic transition-all ${typography.evening}`}>
            &ldquo;{entry.evening_reflection_prompt}&rdquo;
          </p>
        </div>
      </section>

      <BotanicalDivider />

      {/* Bottom Navigation: Previous Day & Next Day */}
      <nav className="flex items-center justify-between pt-4">
        {entry.day_number > 1 ? (
          <Link
            href={`/devotional/${entry.day_number - 1}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight text-xs font-semibold text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Day {entry.day_number - 1}</span>
          </Link>
        ) : (
          <div />
        )}

        <button
          onClick={handleToggleComplete}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold shadow-sm transition-all ${
            completed
              ? "bg-sanctuary-sage text-white"
              : "bg-sanctuary-rose text-white hover:bg-sanctuary-roseDark"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{completed ? "Quiet Time Completed ✓" : "Complete Today's Devotional"}</span>
        </button>

        {entry.day_number < 365 ? (
          <Link
            href={`/devotional/${entry.day_number + 1}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight text-xs font-semibold text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
          >
            <span>Next: Day {entry.day_number + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
