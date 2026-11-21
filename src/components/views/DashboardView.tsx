"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Globe,
  Heart,
  PenTool,
  Printer,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { getPortugueseDevotional } from "@/lib/content/portuguese/resolver";
import { formatFullDevotionalDate, useLanguage } from "@/lib/i18n";
import {
  getGratitudes,
  getPrayers,
  getUserState,
  incrementPrayerCount,
  saveGratitude,
  toggleDayCompleted,
} from "@/lib/storage";
import { GratitudeEntry, PrayerItem, UserDevotionalState } from "@/lib/types";

interface DashboardViewProps {
  edition?: "en" | "pt-BR";
}

export function DashboardView({ edition }: DashboardViewProps) {
  const { t, getTheme, language: contextLang } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";
  const basePrefix = isPt ? "/pt-br" : "/en";

  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [userState, setUserState] = useState<UserDevotionalState | null>(null);
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [todayGratitude, setTodayGratitude] = useState<Partial<GratitudeEntry>>({
    item_1: "",
    item_2: "",
    item_3: "",
  });
  const [gratitudeSaved, setGratitudeSaved] = useState(false);

  // Authoritative content resolution with strict zero-fallback boundary
  const currentDay = userState?.current_day || 1;
  const currentTheme = getTheme(1); // Month 1

  // If Portuguese, query Portuguese resolver exclusively
  const ptResult = isPt ? getPortugueseDevotional(currentDay) : null;
  const isPtPublished = Boolean(isPt && ptResult?.available && ptResult?.entry && ptResult?.status === "published");

  // Today devotional is strictly typed and never leaks English to Portuguese
  const todayDevotional = isPt
    ? (isPtPublished && ptResult?.entry ? ptResult.entry : null)
    : getDevotionalEntry(currentDay);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("sanctuary_font_size") as "normal" | "large" | "xlarge" | null;
      if (saved && ["normal", "large", "xlarge"].includes(saved)) {
        setFontSize(saved);
      }
    } catch {}

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

  const handleSetFontSize = (size: "normal" | "large" | "xlarge") => {
    setFontSize(size);
    try {
      localStorage.setItem("sanctuary_font_size", size);
    } catch {}
  };

  const getFontSizeClass = () => {
    if (fontSize === "large") return "text-lg leading-relaxed";
    if (fontSize === "xlarge") return "text-xl leading-loose";
    return "text-base leading-relaxed";
  };

  const handleToggleComplete = () => {
    if (!todayDevotional) return;
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
      item_1: todayGratitude.item_1 || (isPt ? "A dádiva deste novo amanhecer" : "The blessing of this new morning"),
      item_2: todayGratitude.item_2,
      item_3: todayGratitude.item_3,
    });
    setGratitudeSaved(true);
    setTimeout(() => setGratitudeSaved(false), 2500);
  };

  const isCompleted = todayDevotional
    ? userState?.completed_days.includes(todayDevotional.day_number)
    : false;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 pointer-events-none opacity-20">
          <BotanicalSprig className="w-48 h-48 text-sanctuary-rose" />
        </div>

        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-3">
            <SunMedium className="w-3.5 h-3.5 text-sanctuary-rose" />
            <span>
              {isPt
                ? `Santuário Matinal de Hoje • Dia ${currentDay} de 365`
                : t("dashboard.morningSanctuaryBadge", { day: currentDay })}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sanctuary-cocoa tracking-tight leading-tight">
            {t("dashboard.welcomeGreeting")}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-sanctuary-cocoaLight leading-relaxed">
            &ldquo;{t("common.tagline")}&rdquo;
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-3 text-xs text-sanctuary-taupe">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sanctuary-rose" />
                {formatFullDevotionalDate(new Date(), activeLang)}
              </span>
              <span>•</span>
              <span className="font-medium text-sanctuary-cocoa">
                {t("common.monthCount", { month: 1 })}: {currentTheme.theme_title}
              </span>
            </div>

            {/* Compact Text Size Selector (A / A+ / A++) */}
            <div
              className="inline-flex items-center bg-white border border-sanctuary-taupeLight/80 rounded-full px-2.5 py-1 shadow-xs"
              role="group"
              aria-label={isPt ? "Tamanho do texto" : "Text size options"}
            >
              <span className="text-[11px] mr-1.5 text-sanctuary-taupe select-none font-medium">
                {isPt ? "Texto:" : "Text:"}
              </span>
              <button
                type="button"
                onClick={() => handleSetFontSize("normal")}
                className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  fontSize === "normal"
                    ? "bg-sanctuary-rose text-white shadow-xs"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
                title={isPt ? "Tamanho normal (A)" : "Normal text size (A)"}
                aria-pressed={fontSize === "normal"}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleSetFontSize("large")}
                className={`px-2 py-0.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  fontSize === "large"
                    ? "bg-sanctuary-rose text-white shadow-xs"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
                title={isPt ? "Tamanho grande (A+)" : "Large text size (A+)"}
                aria-pressed={fontSize === "large"}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => handleSetFontSize("xlarge")}
                className={`px-2 py-0.5 rounded-full text-base font-bold transition-all cursor-pointer ${
                  fontSize === "xlarge"
                    ? "bg-sanctuary-rose text-white shadow-xs"
                    : "text-sanctuary-cocoa hover:text-sanctuary-rose"
                }`}
                title={isPt ? "Tamanho extra grande (A++)" : "Extra large text size (A++)"}
                aria-pressed={fontSize === "xlarge"}
              >
                A++
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero: Today's Devotional Card (Strict Edition Isolation) */}
      {isPt && !isPtPublished ? (
        /* Portuguese Edition - Unavailable State Placeholder Card (Zero English Leakage) */
        <div className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm transition-all text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>Edição em Português em Preparação • Dia {currentDay} de 365</span>
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sanctuary-cocoa leading-snug">
              Seu devocional de hoje está sendo preparado em português.
            </h2>
            <p className="font-serif italic text-sm text-sanctuary-rose">
              Mês 1: {currentTheme.theme_title}
            </p>
            <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed pt-1">
              Todos os 31 devocionais de Janeiro já estão disponíveis na íntegra com fundamentação bíblica
              na Almeida Bíblia Livre (ABL em domínio público).
            </p>
            <p className="text-[11px] text-sanctuary-taupe">
              Navegue pelo calendário de leituras ou retorne aos devocionais aprovados de Janeiro.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`${basePrefix}/calendar`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Ver Calendário de Janeiro</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href={`${basePrefix}/devotional/1`}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-sanctuary-ivory text-sanctuary-cocoa text-xs sm:text-sm font-semibold border border-sanctuary-taupeLight hover:bg-sanctuary-blushLight transition-colors"
            >
              <BookOpen className="w-4 h-4 text-sanctuary-taupe" />
              <span>Ler Devocional do Dia 1</span>
            </Link>
          </div>
        </div>
      ) : todayDevotional ? (
        /* Published Devotional Card (Full Liturgy for English or Published Portuguese) */
        <div className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sanctuary-taupeLight/40">
            <div>
              <span className="text-xs uppercase font-sans tracking-widest text-sanctuary-taupe font-semibold block">
                {isPt ? `Dia ${todayDevotional.day_number} • Âncora Devocional` : `Day ${todayDevotional.day_number} • Devotional Anchor`}
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
                <span>{isCompleted ? t("common.markedCompleted") : t("common.markAsCompleted")}</span>
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
          <p className={`text-sanctuary-cocoaLight line-clamp-3 ${getFontSizeClass()}`}>
            {todayDevotional.reflection_body}
          </p>

          <div className="mt-6 pt-6 border-t border-sanctuary-taupeLight/40 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`${basePrefix}/devotional/${todayDevotional.day_number}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t("dashboard.readDevotionalBtn")}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`${basePrefix}/printables/${todayDevotional.day_number}`}
                className="p-2.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
                title={isPt ? "Imprimir Devocional" : "Print Devotional Sheet"}
              >
                <Printer className="w-4 h-4" />
              </Link>
              <Link
                href={`${basePrefix}/journal`}
                className="p-2.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
                title={isPt ? "Escrever no Diário" : "Open Reflection Journal"}
              >
                <PenTool className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Two Column Section: Quick Gratitude & Active Prayers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Gratitude Form */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-sanctuary-taupeLight/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sanctuary-sageLight text-sanctuary-sage">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-sanctuary-cocoa">
                {t("dashboard.quickGratitudeTitle")}
              </h3>
            </div>
            <Link
              href={`${basePrefix}/gratitude`}
              className="text-xs text-sanctuary-rose font-medium hover:underline"
            >
              {isPt ? "Ver Altar Completo" : "View Altar"}
            </Link>
          </div>

          <form onSubmit={handleSaveGratitude} className="mt-5 space-y-3">
            <input
              type="text"
              value={todayGratitude.item_1 || ""}
              onChange={(e) =>
                setTodayGratitude({ ...todayGratitude, item_1: e.target.value })
              }
              placeholder={isPt ? "1. Uma graça específica desta manhã..." : "1. A morning grace..."}
              className="w-full px-4 py-2.5 rounded-xl border border-sanctuary-taupeLight/70 text-xs text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose"
            />
            <input
              type="text"
              value={todayGratitude.item_2 || ""}
              onChange={(e) =>
                setTodayGratitude({ ...todayGratitude, item_2: e.target.value })
              }
              placeholder={isPt ? "2. Uma dádiva que meu coração agradece..." : "2. A blessing I am grateful for..."}
              className="w-full px-4 py-2.5 rounded-xl border border-sanctuary-taupeLight/70 text-xs text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose"
            />
            <input
              type="text"
              value={todayGratitude.item_3 || ""}
              onChange={(e) =>
                setTodayGratitude({ ...todayGratitude, item_3: e.target.value })
              }
              placeholder={isPt ? "3. A presença do Senhor em..." : "3. The Lord's faithfulness in..."}
              className="w-full px-4 py-2.5 rounded-xl border border-sanctuary-taupeLight/70 text-xs text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose"
            />

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-sanctuary-sage text-white text-xs font-semibold hover:bg-sanctuary-sageDark transition-colors"
              >
                {gratitudeSaved ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t("dashboard.quickGratitudeSaved")}
                  </span>
                ) : (
                  t("dashboard.quickGratitudeSubmit")
                )}
              </button>
              <span className="text-[11px] text-sanctuary-taupe">
                {isPt ? "Salvo localmente" : "Saved locally"}
              </span>
            </div>
          </form>
        </div>

        {/* Active Prayers Summary */}
        <div className="bg-white border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-sanctuary-taupeLight/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sanctuary-blushLight text-sanctuary-rose">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h3 className="font-serif text-lg font-bold text-sanctuary-cocoa">
                {t("dashboard.activePrayersTitle")}
              </h3>
            </div>
            <Link
              href={`${basePrefix}/prayer`}
              className="text-xs text-sanctuary-rose font-medium hover:underline"
            >
              {t("dashboard.viewAllPrayers")}
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {prayers.slice(0, 3).map((prayer) => (
              <div
                key={prayer.id}
                className="p-3.5 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight/40 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-sanctuary-cocoa truncate">
                    {prayer.title}
                  </h4>
                  <p className="text-[11px] text-sanctuary-taupe mt-0.5">
                    {prayer.category} • {isPt ? `Orado ${prayer.prayer_count} vezes` : `Prayed ${prayer.prayer_count} times`}
                  </p>
                </div>
                <button
                  onClick={(e) => handlePray(prayer.id, e)}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-[11px] font-medium text-sanctuary-cocoa hover:border-sanctuary-rose transition-colors"
                >
                  {isPt ? "Orei Hoje" : "I Prayed"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BotanicalDivider />

      {/* Progress & Quick Links Bar */}
      <div className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sanctuary-taupe">
            {t("dashboard.yearlyProgress")}
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa mt-0.5">
            {userState?.completed_days.length || 0} / {isPt ? 31 : 365} {isPt ? "Dias Concluídos" : "Days Completed"}
          </h4>
          <p className="text-xs text-sanctuary-cocoaLight mt-1">
            {isPt
              ? "Edição Janeiro: 31 devocionais aprovados e disponíveis."
              : "Walking with Jesus day by day in faith and fellowship."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`${basePrefix}/calendar`}
            className="px-5 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight text-xs font-medium text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
          >
            {isPt ? "Ver Calendário" : "View Calendar"}
          </Link>
          <Link
            href={`${basePrefix}/journal`}
            className="px-5 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight text-xs font-medium text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
          >
            {isPt ? "Meu Diário" : "Open Journal"}
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-xs font-semibold text-sanctuary-rose hover:bg-sanctuary-blushLight transition-colors"
          >
            {isPt ? "Ver Edições" : "All Editions"}
          </Link>
        </div>
      </div>
    </div>
  );
}
