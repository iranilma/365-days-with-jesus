"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  PenTool,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { useLanguage } from "@/lib/i18n";
import { deleteJournal, getJournals, saveJournal } from "@/lib/storage";
import { JournalEntry } from "@/lib/types";

export default function JournalPage() {
  const { t, language } = useLanguage();
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newDayNum, setNewDayNum] = useState<string>("");

  useEffect(() => {
    setJournals(getJournals());
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    saveJournal({
      title: newTitle.trim() || `${language === "pt-BR" ? "Registro no Diário" : "Journal Entry"} - ${new Date().toLocaleDateString(language === "pt-BR" ? "pt-BR" : "en-US")}`,
      content: newContent.trim(),
      date: new Date().toISOString().split("T")[0],
      day_number: newDayNum ? parseInt(newDayNum, 10) : undefined,
      is_favorite: false,
    });

    setJournals(getJournals());
    setNewTitle("");
    setNewContent("");
    setNewDayNum("");
    setShowNewForm(false);
  };

  const handleDelete = (id: string) => {
    const updated = deleteJournal(id);
    setJournals(updated);
  };

  const handleToggleFavorite = (entry: JournalEntry) => {
    saveJournal({
      ...entry,
      is_favorite: !entry.is_favorite,
    });
    setJournals(getJournals());
  };

  const filtered = journals.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sanctuary-taupeLight/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-2">
            <PenTool className="w-3.5 h-3.5 text-sanctuary-rose" />
            <span>{language === "pt-BR" ? "Reflexões Sagradas & Marcos Espirituais" : "Sacred Thoughts & Spiritual Milestones"}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
            {t("journal.pageTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-sanctuary-cocoaLight mt-1">
            {t("journal.pageSubtitle")}
          </p>
        </div>

        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>{t("journal.newEntryBtn")}</span>
        </button>
      </div>

      {/* New Journal Form */}
      {showNewForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-sanctuary-taupeLight/40 pb-3">
            <h2 className="font-serif text-xl font-bold text-sanctuary-cocoa">
              {t("journal.modalTitle")}
            </h2>
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa"
            >
              {t("common.cancel")}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                {t("journal.inputTitleLabel")}
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t("journal.inputTitlePlaceholder")}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                {language === "pt-BR" ? "Dia do Devocional (Opcional)" : "Day Number (Optional)"}
              </label>
              <input
                type="number"
                min={1}
                max={365}
                value={newDayNum}
                onChange={(e) => setNewDayNum(e.target.value)}
                placeholder="1–365"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
              {t("journal.contentLabel")}
            </label>
            <textarea
              rows={6}
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={t("journal.contentPlaceholder")}
              className="w-full text-xs sm:text-sm p-4 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="px-4 py-2 rounded-full border border-sanctuary-taupeLight text-xs text-sanctuary-cocoa"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-sanctuary-rose text-white text-xs font-semibold hover:bg-sanctuary-roseDark transition-colors"
            >
              {t("journal.saveEntryBtn")}
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-sanctuary-taupe absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("journal.searchPlaceholder")}
          className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-sanctuary-taupeLight/70 text-xs sm:text-sm focus:outline-none focus:border-sanctuary-rose shadow-sm"
        />
      </div>

      {/* Journal Entries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-sanctuary-taupeLight/60 p-8">
            <BotanicalSprig className="w-12 h-12 text-sanctuary-taupe opacity-40 mx-auto mb-3" />
            <p className="font-serif text-lg text-sanctuary-cocoa">{t("journal.emptyState")}</p>
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-sanctuary-taupeLight/30 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {entry.day_number && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sanctuary-blush text-sanctuary-cocoa">
                        {t("common.day")} {entry.day_number}
                      </span>
                    )}
                    <span className="text-[11px] text-sanctuary-taupe flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.date).toLocaleDateString(language === "pt-BR" ? "pt-BR" : "en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-sanctuary-cocoa">
                    {entry.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFavorite(entry)}
                    className={`p-1.5 rounded-full transition-colors ${
                      entry.is_favorite
                        ? "text-sanctuary-rose fill-current"
                        : "text-sanctuary-taupe hover:text-sanctuary-rose"
                    }`}
                    title={t("journal.favoriteStar")}
                  >
                    <Star
                      className={`w-4 h-4 ${entry.is_favorite ? "fill-sanctuary-rose text-sanctuary-rose" : ""}`}
                    />
                  </button>

                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 text-sanctuary-taupe hover:text-red-500 rounded-full transition-colors"
                    title={t("common.delete")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-sm sm:text-base text-sanctuary-cocoa leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
