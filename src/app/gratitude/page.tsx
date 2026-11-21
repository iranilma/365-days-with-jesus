"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Check, Heart, Sparkles } from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";
import { useLanguage } from "@/lib/i18n";
import { getGratitudes, saveGratitude } from "@/lib/storage";
import { GratitudeEntry } from "@/lib/types";

export default function GratitudePage() {
  const { t, language } = useLanguage();
  const [gratitudes, setGratitudes] = useState<GratitudeEntry[]>([]);
  const [todayDate, setTodayDate] = useState("");
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [eveningPeace, setEveningPeace] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);

    const list = getGratitudes();
    setGratitudes(list);

    const existingToday = list.find((g) => g.date === today);
    if (existingToday) {
      setItem1(existingToday.item_1 || "");
      setItem2(existingToday.item_2 || "");
      setItem3(existingToday.item_3 || "");
      setEveningPeace(existingToday.evening_moment_of_peace || "");
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item1.trim() && !item2.trim() && !item3.trim()) return;

    saveGratitude({
      date: todayDate,
      item_1: item1.trim() || (language === "pt-BR" ? "A dádiva da vida e do fôlego nesta manhã" : "The gift of life and breath today"),
      item_2: item2.trim(),
      item_3: item3.trim(),
      evening_moment_of_peace: eveningPeace.trim(),
    });

    setGratitudes(getGratitudes());
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-sageLight text-sanctuary-cocoa text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sanctuary-sage" />
          <span>{language === "pt-BR" ? "Altar de Ação de Graças" : "The Altar of Thanksgiving"}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
          {t("gratitude.pageTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed">
          {t("gratitude.pageSubtitle")}
        </p>
      </div>

      {/* Today's Gratitude Card */}
      <div className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-sanctuary-taupeLight/40 mb-4">
          <span className="font-serif text-xl font-bold text-sanctuary-cocoa">
            {t("gratitude.dailyAltarTitle")}
          </span>
          <span className="text-xs text-sanctuary-taupe flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString(language === "pt-BR" ? "pt-BR" : "en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-xs text-sanctuary-cocoaLight">
            {t("gratitude.promptText")}
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                {language === "pt-BR" ? "1. Uma Graça ou Misericórdia pela qual sou grata:" : "1. A Grace or Mercy I am grateful for:"}
              </label>
              <input
                type="text"
                value={item1}
                onChange={(e) => setItem1(e.target.value)}
                placeholder={t("gratitude.item1Placeholder")}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                {language === "pt-BR" ? "2. Uma Provisão ou Conforto do Cotidiano:" : "2. An Everyday Provision or Comfort:"}
              </label>
              <input
                type="text"
                value={item2}
                onChange={(e) => setItem2(e.target.value)}
                placeholder={t("gratitude.item2Placeholder")}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                {language === "pt-BR" ? "3. Uma Pessoa ou Relacionamento que Valorizo:" : "3. A Person or Relationship I Cherish:"}
              </label>
              <input
                type="text"
                value={item3}
                onChange={(e) => setItem3(e.target.value)}
                placeholder={t("gratitude.item3Placeholder")}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
              />
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                {t("gratitude.eveningPeaceLabel")}
              </label>
              <textarea
                rows={2}
                value={eveningPeace}
                onChange={(e) => setEveningPeace(e.target.value)}
                placeholder={t("gratitude.eveningPeacePlaceholder")}
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-sanctuary-taupe">
              {savedMessage ? t("gratitude.savedNotice") : (language === "pt-BR" ? "Registrado com privacidade em seu dispositivo." : "Recorded privately on your device.")}
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold hover:bg-sanctuary-roseDark transition-colors shadow-sm"
            >
              {savedMessage ? `${t("common.saved")} ✓` : t("gratitude.saveGratitudeBtn")}
            </button>
          </div>
        </form>
      </div>

      <BotanicalDivider />

      {/* Gratitude Timeline History */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
          {t("gratitude.pastEntriesTitle")}
        </h2>

        {gratitudes.length === 0 ? (
          <p className="text-xs text-sanctuary-taupe">{t("gratitude.noEntriesYet")}</p>
        ) : (
          <div className="space-y-4">
            {gratitudes.map((entry) => (
              <div
                key={entry.id}
                className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/60 rounded-3xl p-5 sm:p-6 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-sanctuary-taupeLight/30 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sanctuary-rose">
                    {new Date(entry.date).toLocaleDateString(language === "pt-BR" ? "pt-BR" : "en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-[11px] text-sanctuary-taupe">
                    {language === "pt-BR" ? "3 Bênçãos" : "3 Blessings"}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-sanctuary-cocoa">
                  <li className="flex items-start gap-2">
                    <span className="text-sanctuary-rose font-bold">•</span>
                    <span>{entry.item_1}</span>
                  </li>
                  {entry.item_2 && (
                    <li className="flex items-start gap-2">
                      <span className="text-sanctuary-rose font-bold">•</span>
                      <span>{entry.item_2}</span>
                    </li>
                  )}
                  {entry.item_3 && (
                    <li className="flex items-start gap-2">
                      <span className="text-sanctuary-rose font-bold">•</span>
                      <span>{entry.item_3}</span>
                    </li>
                  )}
                </ul>

                {entry.evening_moment_of_peace && (
                  <div className="mt-2 p-3 bg-white/70 rounded-xl text-xs text-sanctuary-cocoaLight italic border-l-2 border-sanctuary-sage">
                    &ldquo;{entry.evening_moment_of_peace}&rdquo;
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
