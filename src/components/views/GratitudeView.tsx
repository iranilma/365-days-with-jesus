"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Moon,
  Sparkles,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { useLanguage } from "@/lib/i18n";
import { getGratitudes, saveGratitude } from "@/lib/storage";
import { GratitudeEntry } from "@/lib/types";

interface GratitudeViewProps {
  edition?: "en" | "pt-BR";
}

export function GratitudeView({ edition }: GratitudeViewProps) {
  const { t, language: contextLang } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";

  const [gratitudes, setGratitudes] = useState<GratitudeEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<Partial<GratitudeEntry>>({
    item_1: "",
    item_2: "",
    item_3: "",
    evening_moment_of_peace: "",
  });
  const [saved, setSaved] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loaded = getGratitudes();
    setGratitudes(loaded);

    const existing = loaded.find((g) => g.date === todayStr);
    if (existing) {
      setTodayEntry(existing);
    }
  }, [todayStr]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todayEntry.item_1 && !todayEntry.item_2 && !todayEntry.item_3) return;

    saveGratitude({
      date: todayStr,
      item_1: todayEntry.item_1 || "",
      item_2: todayEntry.item_2 || "",
      item_3: todayEntry.item_3 || "",
      evening_moment_of_peace: todayEntry.evening_moment_of_peace || "",
    });

    setGratitudes(getGratitudes());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-sageLight text-sanctuary-sage text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("gratitude.pageTitle")}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
          {isPt ? "Altar de Gratidão Diária" : "Daily Altar of Gratitude"}
        </h1>
        <p className="text-sm text-sanctuary-cocoaLight mt-1">
          {t("gratitude.pageSubtitle")}
        </p>
      </div>

      {/* Main Today Form Card */}
      <div className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-sanctuary-taupeLight/40">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sanctuary-rose">
              {isPt ? "Registro de Hoje" : "Today's Sacred Offering"}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa mt-0.5">
              {t("gratitude.dailyAltarTitle")}
            </h2>
          </div>
          <span className="text-xs text-sanctuary-taupe font-medium">
            {todayStr}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed">
          {t("gratitude.promptText")}
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-sanctuary-ivoryLight rounded-2xl border border-sanctuary-taupeLight/50">
              <span className="w-7 h-7 rounded-full bg-sanctuary-rose text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <input
                type="text"
                value={todayEntry.item_1 || ""}
                onChange={(e) => setTodayEntry({ ...todayEntry, item_1: e.target.value })}
                placeholder={t("gratitude.item1Placeholder")}
                className="w-full bg-transparent text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 p-2 bg-sanctuary-ivoryLight rounded-2xl border border-sanctuary-taupeLight/50">
              <span className="w-7 h-7 rounded-full bg-sanctuary-rose text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <input
                type="text"
                value={todayEntry.item_2 || ""}
                onChange={(e) => setTodayEntry({ ...todayEntry, item_2: e.target.value })}
                placeholder={t("gratitude.item2Placeholder")}
                className="w-full bg-transparent text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 p-2 bg-sanctuary-ivoryLight rounded-2xl border border-sanctuary-taupeLight/50">
              <span className="w-7 h-7 rounded-full bg-sanctuary-rose text-white flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <input
                type="text"
                value={todayEntry.item_3 || ""}
                onChange={(e) => setTodayEntry({ ...todayEntry, item_3: e.target.value })}
                placeholder={t("gratitude.item3Placeholder")}
                className="w-full bg-transparent text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none"
              />
            </div>
          </div>

          {/* Evening peace prompt */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-sanctuary-cocoa mb-1.5">
              <Moon className="w-4 h-4 text-sanctuary-rose" />
              <span>{t("gratitude.eveningPeaceLabel")}</span>
            </label>
            <textarea
              rows={3}
              value={todayEntry.evening_moment_of_peace || ""}
              onChange={(e) =>
                setTodayEntry({ ...todayEntry, evening_moment_of_peace: e.target.value })
              }
              placeholder={t("gratitude.eveningPeacePlaceholder")}
              className="w-full p-4 rounded-2xl border border-sanctuary-taupeLight/70 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose bg-white leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sanctuary-sage text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-sanctuary-sageDark transition-all cursor-pointer"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t("gratitude.savedNotice")}</span>
                </>
              ) : (
                <span>{t("gratitude.saveGratitudeBtn")}</span>
              )}
            </button>
            <span className="text-xs text-sanctuary-taupe">
              {isPt ? "Registrado no seu santuário" : "Saved in your private browser sanctuary"}
            </span>
          </div>
        </form>
      </div>

      {/* History of Past Gratitudes */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-sanctuary-cocoa">
          {t("gratitude.pastEntriesTitle")}
        </h3>

        {gratitudes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-sanctuary-taupeLight/60 p-6 space-y-2">
            <BotanicalSprig className="w-10 h-10 text-sanctuary-taupe mx-auto opacity-40" />
            <p className="text-xs text-sanctuary-cocoaLight">
              {t("gratitude.noEntriesYet")}
            </p>
          </div>
        ) : (
          gratitudes.map((entry) => (
            <div
              key={entry.id}
              className="p-5 sm:p-6 bg-white rounded-3xl border border-sanctuary-taupeLight/60 space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-sanctuary-taupe border-b border-sanctuary-taupeLight/30 pb-2">
                <span className="flex items-center gap-1.5 font-medium text-sanctuary-cocoa">
                  <Calendar className="w-3.5 h-3.5 text-sanctuary-rose" />
                  {entry.date}
                </span>
                <span className="text-[11px] font-semibold text-sanctuary-sage">
                  {isPt ? "3 Graças Registradas" : "3 Mercies Counted"}
                </span>
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm text-sanctuary-cocoa">
                {entry.item_1 && <p>• {entry.item_1}</p>}
                {entry.item_2 && <p>• {entry.item_2}</p>}
                {entry.item_3 && <p>• {entry.item_3}</p>}
              </div>

              {entry.evening_moment_of_peace && (
                <div className="mt-2 p-3 bg-sanctuary-ivoryLight rounded-xl border-l-2 border-sanctuary-rose text-xs text-sanctuary-cocoa italic">
                  <p>&ldquo;{entry.evening_moment_of_peace}&rdquo;</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
