"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Heart,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";
import {
  deletePrayer,
  getPrayers,
  incrementPrayerCount,
  markPrayerAnswered,
  savePrayer,
} from "@/lib/storage";
import { PrayerCategory, PrayerItem } from "@/lib/types";

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "answered">("active");
  const [showAddForm, setShowAddForm] = useState(false);
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [praiseReportText, setPraiseReportText] = useState("");

  // New prayer form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<PrayerCategory>("personal");

  useEffect(() => {
    setPrayers(getPrayers());
  }, []);

  const handleCreatePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    savePrayer({
      title,
      description,
      category,
      is_answered: false,
    });

    setPrayers(getPrayers());
    setTitle("");
    setDescription("");
    setShowAddForm(false);
  };

  const handleIncrement = (id: string) => {
    const updated = incrementPrayerCount(id);
    setPrayers(updated);
  };

  const handleAnswerSubmit = (id: string) => {
    if (!praiseReportText.trim()) return;
    const updated = markPrayerAnswered(id, praiseReportText);
    setPrayers(updated);
    setAnsweringId(null);
    setPraiseReportText("");
  };

  const handleDelete = (id: string) => {
    const updated = deletePrayer(id);
    setPrayers(updated);
  };

  const filteredPrayers = prayers.filter((p) =>
    activeTab === "active" ? !p.is_answered : p.is_answered
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sanctuary-taupeLight/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 text-sanctuary-rose fill-current" />
            <span>Sacred Petitions & Praises</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
            Prayer Wall & Journal
          </h1>
          <p className="text-xs sm:text-sm text-sanctuary-cocoaLight mt-1">
            Cast your cares upon Him, for He cares deeply for you. (1 Peter 5:7)
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Prayer Request</span>
        </button>
      </div>

      {/* New Prayer Form Modal / Card */}
      {showAddForm && (
        <form
          onSubmit={handleCreatePrayer}
          className="bg-white border-2 border-sanctuary-blush rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-sanctuary-taupeLight/40 pb-3">
            <h2 className="font-serif text-xl font-bold text-sanctuary-cocoa">
              Bring a Petition Before the Lord
            </h2>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
              Prayer Title / Intention *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Guidance for my son, peace in my home, physical recovery..."
              className="w-full text-sm px-4 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PrayerCategory)}
                className="w-full text-xs px-3 py-2.5 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose"
              >
                <option value="personal">Personal Spiritual Walk</option>
                <option value="family">Family & Children</option>
                <option value="health">Health & Healing</option>
                <option value="friends">Friends & Loved Ones</option>
                <option value="church">Church & Community</option>
                <option value="work">Work & Finances</option>
                <option value="world">Nation & World</option>
                <option value="other">Other Request</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-sanctuary-cocoa mb-1">
              Details & Scripture Promises
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What specifically are you laying at the altar? Add any verses you are standing upon..."
              className="w-full text-sm p-3 rounded-xl bg-sanctuary-ivory border border-sanctuary-taupeLight/70 focus:outline-none focus:border-sanctuary-rose leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-full border border-sanctuary-taupeLight text-xs text-sanctuary-cocoa"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-sanctuary-rose text-white text-xs font-semibold hover:bg-sanctuary-roseDark transition-colors"
            >
              Save to Prayer Wall
            </button>
          </div>
        </form>
      )}

      {/* Tabs: Active vs Answered */}
      <div className="flex items-center gap-2 border-b border-sanctuary-taupeLight/40 pb-2">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === "active"
              ? "bg-sanctuary-rose text-white shadow-sm"
              : "text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
          }`}
        >
          Active Prayers ({prayers.filter((p) => !p.is_answered).length})
        </button>

        <button
          onClick={() => setActiveTab("answered")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === "answered"
              ? "bg-sanctuary-sage text-white shadow-sm"
              : "text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-sageLight"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Answered Prayers & Praise Reports ({prayers.filter((p) => p.is_answered).length})</span>
        </button>
      </div>

      {/* Prayer List */}
      <div className="space-y-4">
        {filteredPrayers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-sanctuary-taupeLight/60 p-8">
            <BotanicalSprig className="w-12 h-12 text-sanctuary-taupe opacity-40 mx-auto mb-3" />
            <p className="font-serif text-lg text-sanctuary-cocoa">
              {activeTab === "active"
                ? "No active prayer requests."
                : "No answered prayers recorded yet."}
            </p>
            <p className="text-xs text-sanctuary-taupe mt-1">
              {activeTab === "active"
                ? "Click 'New Prayer Request' above to bring your heart before God."
                : "When God answers your prayers, mark them as answered to build an altar of remembrance."}
            </p>
          </div>
        ) : (
          filteredPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className={`p-6 rounded-3xl border transition-all ${
                prayer.is_answered
                  ? "bg-sanctuary-sageLight/30 border-sanctuary-sage/60"
                  : "bg-white border-sanctuary-taupeLight/70 shadow-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sanctuary-blush text-sanctuary-cocoa">
                      {prayer.category}
                    </span>
                    <span className="text-[11px] text-sanctuary-taupe">
                      Added {new Date(prayer.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-sanctuary-cocoa">
                    {prayer.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {!prayer.is_answered && (
                    <button
                      onClick={() => handleIncrement(prayer.id)}
                      className="px-3.5 py-1.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-xs font-semibold text-sanctuary-rose hover:bg-sanctuary-blush transition-colors flex items-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Prayed Today ({prayer.prayer_count})</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(prayer.id)}
                    className="p-1.5 text-sanctuary-taupe hover:text-red-500 rounded-full transition-colors"
                    title="Remove prayer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {prayer.description && (
                <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed mt-2">
                  {prayer.description}
                </p>
              )}

              {/* Answered Praise Report Box */}
              {prayer.is_answered && prayer.praise_report && (
                <div className="mt-4 p-4 rounded-2xl bg-white border border-sanctuary-sage text-xs">
                  <div className="flex items-center gap-1.5 text-sanctuary-sage font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Praise Report (Answered {prayer.answered_at ? new Date(prayer.answered_at).toLocaleDateString() : "Recently"})</span>
                  </div>
                  <p className="font-serif text-sm text-sanctuary-cocoa italic leading-relaxed">
                    &ldquo;{prayer.praise_report}&rdquo;
                  </p>
                </div>
              )}

              {/* Answering Dialog Trigger */}
              {!prayer.is_answered && answeringId !== prayer.id && (
                <div className="mt-4 pt-3 border-t border-sanctuary-taupeLight/30 flex items-center justify-between text-xs">
                  <span className="text-sanctuary-taupe">
                    Persistently prayed {prayer.prayer_count} {prayer.prayer_count === 1 ? "time" : "times"}
                  </span>
                  <button
                    onClick={() => setAnsweringId(prayer.id)}
                    className="text-sanctuary-sage hover:underline font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>God answered this prayer!</span>
                  </button>
                </div>
              )}

              {/* Answering Form Inline */}
              {answeringId === prayer.id && (
                <div className="mt-4 p-4 bg-sanctuary-ivory rounded-2xl border border-sanctuary-sage space-y-2 animate-fade-in">
                  <span className="text-xs font-bold text-sanctuary-cocoa block">
                    Share your Praise Report: How did God answer this prayer?
                  </span>
                  <textarea
                    rows={2}
                    value={praiseReportText}
                    onChange={(e) => setPraiseReportText(e.target.value)}
                    placeholder="Write a brief praise report celebrating God's faithfulness..."
                    className="w-full text-xs p-3 rounded-xl bg-white border border-sanctuary-taupeLight focus:outline-none focus:border-sanctuary-sage"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setAnsweringId(null)}
                      className="px-3 py-1 rounded-full text-xs border border-sanctuary-taupeLight text-sanctuary-taupe"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAnswerSubmit(prayer.id)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-sanctuary-sage text-white"
                    >
                      Save Praise Report ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
