"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  PenTool,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { useLanguage } from "@/lib/i18n";
import { deleteJournal, getJournals, saveJournal } from "@/lib/storage";
import { JournalEntry } from "@/lib/types";

interface JournalViewProps {
  edition?: "en" | "pt-BR";
}

export function JournalView({ edition }: JournalViewProps) {
  const { t, language: contextLang } = useLanguage();
  const activeLang = edition || contextLang || "en";
  const isPt = activeLang === "pt-BR";

  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    is_favorite: false,
  });

  useEffect(() => {
    setJournals(getJournals());
  }, []);

  const handleOpenNew = () => {
    setEditingEntry(null);
    setFormData({ title: "", content: "", is_favorite: false });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      is_favorite: entry.is_favorite || false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    saveJournal({
      id: editingEntry?.id,
      day_number: editingEntry?.day_number,
      date: editingEntry?.date || new Date().toISOString().split("T")[0],
      title: formData.title,
      content: formData.content,
      is_favorite: formData.is_favorite,
    });

    setJournals(getJournals());
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(t("journal.deleteConfirm"))) {
      const updated = deleteJournal(id);
      setJournals(updated);
    }
  };

  const filteredJournals = journals.filter((j) => {
    if (filterFavorites && !j.is_favorite) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return j.title.toLowerCase().includes(q) || j.content.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-2">
            <PenTool className="w-3.5 h-3.5 text-sanctuary-rose" />
            <span>{t("journal.pageTitle")}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
            {isPt ? "Diário Espiritual do Santuário" : "Sacred Spiritual Journal"}
          </h1>
          <p className="text-sm text-sanctuary-cocoaLight mt-1">
            {t("journal.pageSubtitle")}
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t("journal.newEntryBtn")}</span>
        </button>
      </div>

      {/* Search & Favorites Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-sanctuary-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("journal.searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-sanctuary-taupeLight/80 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose bg-white shadow-xs"
          />
        </div>

        <button
          onClick={() => setFilterFavorites(!filterFavorites)}
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
            filterFavorites
              ? "bg-sanctuary-blush border-sanctuary-rose text-sanctuary-rose font-semibold"
              : "bg-white border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${filterFavorites ? "fill-current" : ""}`} />
          <span>{t("journal.filterFavorites")}</span>
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredJournals.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-sanctuary-taupeLight/60 p-8 space-y-3">
            <BotanicalSprig className="w-12 h-12 text-sanctuary-taupe mx-auto opacity-40" />
            <h3 className="font-serif text-lg font-bold text-sanctuary-cocoa">
              {t("journal.emptyState")}
            </h3>
            <p className="text-xs text-sanctuary-cocoaLight max-w-sm mx-auto">
              {isPt
                ? "Registre suas reflexões espirituais diárias, orações respondidas e meditações bíblicas."
                : "Record your sacred insights, quiet-time reflections, and biblical prayers."}
            </p>
          </div>
        ) : (
          filteredJournals.map((entry) => (
            <div
              key={entry.id}
              className="p-6 rounded-3xl bg-white border border-sanctuary-taupeLight/70 shadow-xs hover:border-sanctuary-rose transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-sanctuary-taupeLight/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-sanctuary-taupe">
                    <Calendar className="w-3.5 h-3.5 text-sanctuary-rose" />
                    {entry.date}
                  </span>
                  {entry.day_number && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sanctuary-blush text-sanctuary-cocoa">
                      {isPt ? `Dia ${entry.day_number}` : `Day ${entry.day_number}`}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {entry.is_favorite && (
                    <Star className="w-3.5 h-3.5 text-sanctuary-rose fill-current" />
                  )}
                  <button
                    onClick={() => handleOpenEdit(entry)}
                    className="text-xs text-sanctuary-rose font-medium hover:underline"
                  >
                    {t("journal.editEntry")}
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1 text-sanctuary-taupe hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-sanctuary-cocoa">
                {entry.title}
              </h3>

              <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed whitespace-pre-line">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* New / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sanctuary-cocoa/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-sanctuary-taupeLight/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-sanctuary-taupeLight/40">
              <h3 className="font-serif text-xl font-bold text-sanctuary-cocoa">
                {editingEntry ? t("journal.editEntry") : t("journal.newEntryBtn")}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-sanctuary-taupe hover:text-sanctuary-cocoa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                  {isPt ? "Título da Reflexão" : "Reflection Title"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t("journal.entryTitlePlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl border border-sanctuary-taupeLight/80 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                  {isPt ? "Conteúdo da Oração / Reflexão" : "Journal Reflection Content"}
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={t("journal.entryContentPlaceholder")}
                  className="w-full p-4 rounded-xl border border-sanctuary-taupeLight/80 text-xs sm:text-sm text-sanctuary-cocoa focus:outline-none focus:border-sanctuary-rose leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="modal_is_fav"
                  checked={formData.is_favorite}
                  onChange={(e) => setFormData({ ...formData, is_favorite: e.target.checked })}
                  className="rounded text-sanctuary-rose focus:ring-sanctuary-rose"
                />
                <label htmlFor="modal_is_fav" className="text-xs text-sanctuary-cocoa font-medium cursor-pointer">
                  {isPt ? "Marcar como reflexão favorita" : "Mark as sacred favorite"}
                </label>
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
