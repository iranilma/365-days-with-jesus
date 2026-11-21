"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Heart,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { useLanguage } from "@/lib/i18n";
import {
  deletePrayer,
  getPrayers,
  incrementPrayerCount,
  markPrayerAnswered,
  savePrayer,
} from "@/lib/storage";
import { PrayerCategory, PrayerItem } from "@/lib/types";

interface PrayerWallViewProps {
  edition?: "en" | "pt-BR";
}

export function PrayerWallView({ edition }: PrayerWallViewProps) {
  const { t, language: contextLang } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";

  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answeringPrayerId, setAnsweringPrayerId] = useState<string | null>(null);
  const [praiseReport, setPraiseReport] = useState("");

  const [newPrayer, setNewPrayer] = useState<{
    title: string;
    description: string;
    category: PrayerCategory;
  }>({
    title: "",
    description: "",
    category: "personal",
  });

  useEffect(() => {
    setPrayers(getPrayers());
  }, []);

  const handleSavePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.title.trim()) return;

    savePrayer({
      title: newPrayer.title,
      description: newPrayer.description,
      category: newPrayer.category,
      is_answered: false,
      last_prayed_at: new Date().toISOString(),
    });

    setPrayers(getPrayers());
    setNewPrayer({ title: "", description: "", category: "personal" });
    setIsModalOpen(false);
  };

  const handlePray = (id: string) => {
    const updated = incrementPrayerCount(id);
    setPrayers(updated);
  };

  const handleMarkAnswered = (id: string) => {
    const updated = markPrayerAnswered(id, praiseReport || (isPt ? "Oração respondida pelo Senhor!" : "Prayer answered by the Lord!"));
    setPrayers(updated);
    setAnsweringPrayerId(null);
    setPraiseReport("");
  };

  const handleDelete = (id: string) => {
    const updated = deletePrayer(id);
    setPrayers(updated);
  };

  const filteredPrayers = prayers.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "answered") return p.is_answered;
    return p.category === selectedCategory;
  });

  const categories = [
    { id: "all", label: t("prayer.categoryAll") },
    { id: "personal", label: t("prayer.categoryPersonal") },
    { id: "family", label: t("prayer.categoryFamily") },
    { id: "friends", label: t("prayer.categoryFriends") },
    { id: "church", label: t("prayer.categoryChurch") },
    { id: "health", label: t("prayer.categoryHealth") },
    { id: "work", label: t("prayer.categoryWork") },
    { id: "world", label: t("prayer.categoryWorld") },
    { id: "answered", label: isPt ? "Orações Respondidas" : "Answered Prayers" },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-rose text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t("prayer.pageTitle")}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
            {isPt ? "Mural de Oração & Intercessão" : "Sacred Prayer Wall"}
          </h1>
          <p className="text-sm text-sanctuary-cocoaLight mt-1">
            {t("prayer.pageSubtitle")}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t("prayer.newPrayerBtn")}</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-sanctuary-cocoa text-white shadow-xs font-semibold"
                : "bg-white border border-sanctuary-taupeLight text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Prayers List */}
      <div className="space-y-4">
        {filteredPrayers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-sanctuary-taupeLight/60 p-8 space-y-3">
            <BotanicalSprig className="w-12 h-12 text-sanctuary-taupe mx-auto opacity-40" />
            <h3 className="font-serif text-lg font-bold text-sanctuary-cocoa">
              {t("prayer.emptyState")}
            </h3>
            <p className="text-xs text-sanctuary-cocoaLight max-w-sm mx-auto">
              {isPt
                ? "Apresente suas petições, anseios e motivos de louvor perante o Pai Celestial."
                : "Bring your petitions, burdens, and praises into the sacred sanctuary."}
            </p>
          </div>
        ) : (
          filteredPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className={`p-6 rounded-3xl border transition-all ${
                prayer.is_answered
                  ? "bg-sanctuary-sageLight/40 border-sanctuary-sage/80 shadow-xs"
                  : "bg-white border-sanctuary-taupeLight/70 shadow-xs hover:border-sanctuary-rose"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sanctuary-blush text-sanctuary-rose">
                      {prayer.category}
                    </span>
                    {prayer.is_answered && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sanctuary-sage text-white">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{t("prayer.answeredBadge")}</span>
                      </span>
                    )}
                    <span className="text-[11px] text-sanctuary-taupe">
                      {t("prayer.prayedTimes", { count: prayer.prayer_count })}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-sanctuary-cocoa">
                    {prayer.title}
                  </h3>

                  {prayer.description && (
                    <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed">
                      {prayer.description}
                    </p>
                  )}

                  {prayer.praise_report && (
                    <div className="mt-3 p-4 bg-white rounded-2xl border-l-4 border-sanctuary-sage text-xs text-sanctuary-cocoa space-y-1">
                      <span className="font-bold text-sanctuary-sage uppercase tracking-wider text-[10px] block">
                        {isPt ? "Testemunho / Relatório de Louvor" : "Praise Report"}
                      </span>
                      <p className="italic font-serif leading-relaxed">
                        &ldquo;{prayer.praise_report}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap sm:flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => handlePray(prayer.id)}
                    className="px-4 py-2 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow-xs hover:bg-sanctuary-roseDark transition-all cursor-pointer"
                  >
                    {t("prayer.iPrayedBtn")}
                  </button>

                  {!prayer.is_answered && (
                    <button
                      onClick={() => setAnsweringPrayerId(prayer.id)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-xs text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors cursor-pointer"
                    >
                      {t("prayer.markAnsweredBtn")}
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(prayer.id)}
                    className="p-1.5 text-sanctuary-taupe hover:text-red-500 transition-colors"
                    title={isPt ? "Excluir oração" : "Delete prayer"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {answeringPrayerId === prayer.id && (
                <div className="mt-4 pt-4 border-t border-sanctuary-taupeLight/40 space-y-3 animate-fade-in">
                  <label className="block text-xs font-semibold text-sanctuary-cocoa">
                    {t("prayer.praiseReportLabel")}
                  </label>
                  <textarea
                    rows={3}
                    value={praiseReport}
                    onChange={(e) => setPraiseReport(e.target.value)}
                    placeholder={t("prayer.praiseReportPlaceholder")}
                    className="w-full p-3 rounded-2xl border border-sanctuary-taupeLight/80 text-xs text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-sage bg-white"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkAnswered(prayer.id)}
                      className="px-4 py-2 rounded-full bg-sanctuary-sage text-white text-xs font-semibold hover:bg-sanctuary-sageDark transition-colors"
                    >
                      {isPt ? "Salvar Testemunho" : "Save Praise Report"}
                    </button>
                    <button
                      onClick={() => setAnsweringPrayerId(null)}
                      className="px-4 py-2 rounded-full text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa"
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Prayer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sanctuary-cocoa/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-sanctuary-taupeLight/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-sanctuary-taupeLight/40">
              <h3 className="font-serif text-xl font-bold text-sanctuary-cocoa">
                {t("prayer.modalTitle")}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-sanctuary-taupe hover:text-sanctuary-cocoa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrayer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                  {t("prayer.inputTitleLabel")}
                </label>
                <input
                  type="text"
                  required
                  value={newPrayer.title}
                  onChange={(e) => setNewPrayer({ ...newPrayer, title: e.target.value })}
                  placeholder={t("prayer.inputTitlePlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl border border-sanctuary-taupeLight/80 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                  {t("prayer.categoryLabel")}
                </label>
                <select
                  value={newPrayer.category}
                  onChange={(e) =>
                    setNewPrayer({ ...newPrayer, category: e.target.value as PrayerCategory })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-sanctuary-taupeLight/80 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose bg-white"
                >
                  <option value="personal">{t("prayer.categoryPersonal")}</option>
                  <option value="family">{t("prayer.categoryFamily")}</option>
                  <option value="friends">{t("prayer.categoryFriends")}</option>
                  <option value="church">{t("prayer.categoryChurch")}</option>
                  <option value="health">{t("prayer.categoryHealth")}</option>
                  <option value="work">{t("prayer.categoryWork")}</option>
                  <option value="world">{t("prayer.categoryWorld")}</option>
                  <option value="other">{t("prayer.categoryOther")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                  {t("prayer.inputDescLabel")}
                </label>
                <textarea
                  rows={4}
                  value={newPrayer.description}
                  onChange={(e) => setNewPrayer({ ...newPrayer, description: e.target.value })}
                  placeholder={t("prayer.inputDescPlaceholder")}
                  className="w-full p-4 rounded-xl border border-sanctuary-taupeLight/80 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow-xs hover:bg-sanctuary-roseDark transition-colors"
                >
                  {t("common.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
