"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Heart,
  PenTool,
  Printer,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { MONTHLY_THEMES } from "@/lib/content/themes";
import {
  getGratitudes,
  getPrayers,
  getUserState,
  incrementPrayerCount,
  saveGratitude,
  toggleDayCompleted,
} from "@/lib/storage";
import { GratitudeEntry, PrayerItem, UserDevotionalState } from "@/lib/types";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [userState, setUserState] = useState<UserDevotionalState | null>(null);
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [todayGratitude, setTodayGratitude] = useState<Partial<GratitudeEntry>>({
    item_1: "",
    item_2: "",
    item_3: "",
  });
  const [gratitudeSaved, setGratitudeSaved] = useState(false);

  const todayDevotional = getDevotionalEntry(1); // Authoritative Day 1
  const currentTheme = MONTHLY_THEMES[0]; // Month 1

  useEffect(() => {
    setMounted(true);
    const state = getUserState();
    setUserState(state);

    const loadedPrayers = getPrayers();
    setPrayers(loadedPrayers);

    const gratitudes = getGratitudes();
    const todayStr = new Date().toISOString().split("T")[0];
    const found = gratitudes.find((g) => g.date === todayStr);
    if (found) {
      setTodayGratitude(found);
    }
  }, []);

  const handleToggleComplete = () => {
    const updated = toggleDayCompleted(todayDevotional.day_number);
    setUserState(updated);
  };

  const handlePray = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const updated = incrementPrayerCount(id);
    setPrayers(updated);
  };

  const handleSaveGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split("T")[0];
    saveGratitude({
      date: todayStr,
      item_1: todayGratitude.item_1 || "The blessing of this new morning",
      item_2: todayGratitude.item_2,
      item_3: todayGratitude.item_3,
    });
    setGratitudeSaved(true);
    setTimeout(() => setGratitudeSaved(false), 2500);
  };

  const isCompleted = userState?.completed_days.includes(todayDevotional.day_number);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 pointer-events-none opacity-20">
          <BotanicalSprig className="w-48 h-48 text-sanctuary-rose" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-3">
            <SunMedium className="w-3.5 h-3.5 text-sanctuary-rose" />
            <span>Today&apos;s Morning Sanctuary • Day {todayDevotional.day_number} of 365</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sanctuary-cocoa tracking-tight leading-tight">
            Start your day with faith, beloved.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-sanctuary-cocoaLight leading-relaxed">
            &ldquo;Start your day with faith. Live with gratitude. Walk with purpose.&rdquo;
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-sanctuary-taupe">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sanctuary-rose" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="font-medium text-sanctuary-cocoa">
              Month 1: {currentTheme.theme_title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero: Today's Devotional Anchor Card */}
      <div className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sanctuary-taupeLight/40">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-sanctuary-taupe font-semibold block">
              Day {todayDevotional.day_number} • Devotional Anchor
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sanctuary-cocoa mt-1">
              {todayDevotional.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                isCompleted
                  ? "bg-sanctuary-sageLight text-sanctuary-cocoa border border-sanctuary-sage font-semibold"
                  : "bg-sanctuary-ivory text-sanctuary-cocoaLight hover:text-sanctuary-cocoa border border-sanctuary-taupeLight"
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isCompleted ? "text-sanctuary-sage" : "text-sanctuary-taupe"}`}
              />
              <span>{isCompleted ? "Completed Today" : "Mark as Completed"}</span>
            </button>
          </div>
        </div>

        {/* Scripture Spotlight */}
        <div className="my-6 p-5 sm:p-6 bg-sanctuary-ivory rounded-2xl border-l-4 border-sanctuary-rose">
          <p className="font-serif text-lg sm:text-xl text-sanctuary-cocoa italic leading-relaxed">
            &ldquo;{todayDevotional.scripture_primary_text}&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-sanctuary-taupe">
            <span className="font-semibold text-sanctuary-rose tracking-wide">
              {todayDevotional.scripture_primary_reference}
            </span>
            <span>{todayDevotional.scripture_translation}</span>
          </div>
        </div>

        {/* Reflection Snippet & Actions */}
        <p className="text-sm sm:text-base text-sanctuary-cocoaLight leading-relaxed line-clamp-3">
          {todayDevotional.reflection_body}
        </p>

        <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/devotional/${todayDevotional.day_number}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sanctuary-rose text-white text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all hover:gap-3"
            >
              <BookOpen className="w-4 h-4" />
              <span>Begin Quiet Time</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/printables/${todayDevotional.day_number}`}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-sanctuary-ivory text-sanctuary-cocoa text-sm font-medium border border-sanctuary-taupeLight hover:bg-sanctuary-blushLight transition-colors"
            >
              <Printer className="w-4 h-4 text-sanctuary-taupe" />
              <span>Printable Planner</span>
            </Link>
          </div>

          <span className="text-xs text-sanctuary-taupe">Estimated quiet time: 10–15 mins</span>
        </div>
      </div>

      <BotanicalDivider />

      {/* Grid: Prayer, Gratitude & Daily Intention */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Today's Intention & Walk */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-sanctuary-rose flex items-center gap-1.5">
                <SunMedium className="w-4 h-4" />
                Daily Walk Intention
              </span>
            </div>
            <p className="font-serif text-lg font-medium text-sanctuary-cocoa italic leading-snug">
              &ldquo;{todayDevotional.daily_intention}&rdquo;
            </p>
            <div className="mt-4 p-3 bg-sanctuary-blushLight rounded-xl text-xs text-sanctuary-cocoaLight leading-relaxed">
              <strong className="text-sanctuary-cocoa block mb-1">Practical Faith Step:</strong>
              {todayDevotional.practical_action}
            </div>
          </div>
          <div className="mt-6 pt-3 border-t border-sanctuary-taupeLight/40 text-right">
            <Link
              href={`/devotional/${todayDevotional.day_number}`}
              className="text-xs font-semibold text-sanctuary-rose hover:underline inline-flex items-center gap-1"
            >
              Read full devotional <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Quick Gratitude Journal */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-sanctuary-sage flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Morning Gratitude
              </span>
              <Link href="/gratitude" className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa">
                View all
              </Link>
            </div>
            <p className="text-xs text-sanctuary-cocoaLight mb-3">
              Three blessings you thank God for this morning:
            </p>

            <form onSubmit={handleSaveGratitude} className="space-y-2">
              <input
                type="text"
                placeholder="1. A gift of grace..."
                value={todayGratitude.item_1 || ""}
                onChange={(e) => setTodayGratitude({ ...todayGratitude, item_1: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/60 focus:outline-none focus:border-sanctuary-rose"
              />
              <input
                type="text"
                placeholder="2. An everyday provision..."
                value={todayGratitude.item_2 || ""}
                onChange={(e) => setTodayGratitude({ ...todayGratitude, item_2: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/60 focus:outline-none focus:border-sanctuary-rose"
              />
              <input
                type="text"
                placeholder="3. A person you cherish..."
                value={todayGratitude.item_3 || ""}
                onChange={(e) => setTodayGratitude({ ...todayGratitude, item_3: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/60 focus:outline-none focus:border-sanctuary-rose"
              />

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-xl bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold hover:bg-sanctuary-rose hover:text-white transition-colors"
              >
                {gratitudeSaved ? "✓ Gratitude Saved" : "Save Today's Gratitudes"}
              </button>
            </form>
          </div>
        </div>

        {/* Card 3: Prayer Wall Snapshot */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-sanctuary-rose flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                Prayer Wall
              </span>
              <Link href="/prayer" className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa">
                Open Wall
              </Link>
            </div>

            <div className="space-y-3">
              {prayers.slice(0, 2).map((prayer) => (
                <div
                  key={prayer.id}
                  className="p-3 bg-sanctuary-ivory rounded-xl border border-sanctuary-taupeLight/40 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sanctuary-cocoa truncate pr-2">
                      {prayer.title}
                    </span>
                    {prayer.is_answered && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sanctuary-sageLight text-sanctuary-sage font-bold">
                        Answered
                      </span>
                    )}
                  </div>
                  <p className="text-sanctuary-cocoaLight line-clamp-2">{prayer.description}</p>
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-sanctuary-taupeLight/30 text-[11px] text-sanctuary-taupe">
                    <span>Prayed {prayer.prayer_count}x</span>
                    <button
                      onClick={(e) => handlePray(prayer.id, e)}
                      className="text-sanctuary-rose hover:underline font-semibold"
                    >
                      Pray Now +1
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sanctuary-taupeLight/40">
            <Link
              href="/prayer"
              className="w-full block text-center py-2 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight text-xs font-semibold text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
            >
              + Add Prayer Request
            </Link>
          </div>
        </div>
      </div>

      {/* Gentle Spiritual Consistency Section */}
      <div className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa">
              Your Walk with Jesus
            </h3>
            <p className="text-xs sm:text-sm text-sanctuary-cocoaLight mt-1">
              Grace over perfection. Every unhurried moment you spend in Scripture and prayer is an altar built to God.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-serif font-bold text-sanctuary-cocoa">
                {userState?.completed_days.length || 1}
              </span>
              <span className="text-xs text-sanctuary-taupe block">Days Walked</span>
            </div>
            <Link
              href="/calendar"
              className="px-4 py-2 rounded-full bg-white border border-sanctuary-taupeLight text-xs font-semibold text-sanctuary-cocoa hover:bg-sanctuary-blush transition-colors"
            >
              View 365 Days
            </Link>
          </div>
        </div>

        {/* 7-Day Visual Rhythm */}
        <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
            const done = userState?.completed_days.includes(dayNum);
            const isToday = dayNum === todayDevotional.day_number;
            return (
              <Link
                key={dayNum}
                href={`/devotional/${dayNum}`}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                  isToday
                    ? "border-sanctuary-rose bg-white shadow-sm ring-2 ring-sanctuary-blush"
                    : done
                    ? "border-sanctuary-sage bg-sanctuary-sageLight/50"
                    : "border-sanctuary-taupeLight/60 bg-sanctuary-ivory hover:bg-white"
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider text-sanctuary-taupe">
                  Day {dayNum}
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-sanctuary-cocoa mt-0.5">
                  {done ? "✓" : dayNum}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
