"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  Heart,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";

export default function WelcomeOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [quietTimePreference, setQuietTimePreference] = useState<"morning" | "midday" | "evening">("morning");
  const [translationPreference, setTranslationPreference] = useState("WEB");

  return (
    <div className="max-w-xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <BotanicalSprig className="w-12 h-12 text-sanctuary-rose mx-auto" />
        <span className="text-xs font-semibold uppercase tracking-widest text-sanctuary-taupe">
          Welcome to Your Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
          365 Days With Jesus
        </h1>
        <p className="font-serif italic text-base text-sanctuary-cocoaLight">
          &ldquo;Start your day with faith. Live with gratitude. Walk with purpose.&rdquo;
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all ${
              step === s
                ? "w-8 bg-sanctuary-rose"
                : step > s
                ? "w-2 bg-sanctuary-sage"
                : "w-2 bg-sanctuary-taupeLight"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Sacred Rhythm */}
      {step === 1 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              When does your soul most crave stillness?
            </h2>
            <p className="text-xs text-sanctuary-cocoaLight">
              Select your natural daily window for unhurried quiet time.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "morning",
                title: "Morning Dawn Sanctuary",
                desc: "Before the house wakes, starting your day anchored in God's fresh mercies.",
                icon: Sun,
              },
              {
                id: "midday",
                title: "Midday Sabbath Pause",
                desc: "A calming spiritual breath to recalibrate your mind amidst daily demands.",
                icon: Sparkles,
              },
              {
                id: "evening",
                title: "Evening Lamplight Reflection",
                desc: "Unburdening your thoughts and resting in thanksgiving before sleep.",
                icon: Moon,
              },
            ].map((option) => {
              const active = quietTimePreference === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setQuietTimePreference(option.id as any)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    active
                      ? "border-sanctuary-rose bg-sanctuary-blushLight shadow-sm"
                      : "border-sanctuary-taupeLight/60 bg-white hover:bg-sanctuary-ivory"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      active
                        ? "bg-sanctuary-rose text-white"
                        : "bg-sanctuary-ivory text-sanctuary-taupe"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-serif text-lg font-bold text-sanctuary-cocoa block">
                      {option.title}
                    </span>
                    <p className="text-xs text-sanctuary-cocoaLight leading-relaxed mt-0.5">
                      {option.desc}
                    </p>
                  </div>
                  {active && <Check className="w-5 h-5 text-sanctuary-rose shrink-0" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue to Scripture Settings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Translation & Integrity */}
      {step === 2 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              Foundational Scripture Translation
            </h2>
            <p className="text-xs text-sanctuary-cocoaLight">
              We uphold verified accuracy and full commercial public-domain copyright clarity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sanctuary-ivory border-l-4 border-sanctuary-rose text-xs space-y-2">
            <span className="font-bold text-sanctuary-cocoa block">
              Default: World English Bible (WEB)
            </span>
            <p className="text-sanctuary-cocoaLight leading-relaxed">
              A modern, elegant English translation derived from the American Standard Version and Byzantine majority text, freely dedicated to the public domain. Clear, faithful, and poetic for reading and reflection.
            </p>
          </div>

          <div className="space-y-2 text-xs text-sanctuary-cocoa">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-sanctuary-taupeLight bg-sanctuary-blushLight cursor-pointer">
              <input
                type="radio"
                checked={translationPreference === "WEB"}
                onChange={() => setTranslationPreference("WEB")}
                className="accent-sanctuary-rose"
              />
              <span className="font-medium">World English Bible (WEB) — Public Domain Clear</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 py-3 rounded-full border border-sanctuary-taupeLight text-sanctuary-cocoa text-xs font-semibold"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 py-3 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Commitment to Grace */}
      {step === 3 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-center">
          <div className="space-y-2">
            <Heart className="w-10 h-10 text-sanctuary-rose mx-auto fill-current opacity-80" />
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              Our Covenant of Grace
            </h2>
            <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed max-w-md mx-auto">
              In this space, you will never see broken streak alarms, guilt-inducing notifications, or demands for perfection.
            </p>
          </div>

          <div className="p-4 bg-sanctuary-ivoryLight rounded-2xl border border-sanctuary-taupeLight/60 text-xs text-sanctuary-cocoa space-y-2 text-left">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sanctuary-sage shrink-0 mt-0.5" />
              <span><strong>Start your day with faith:</strong> Let Scripture be your morning anchor.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sanctuary-sage shrink-0 mt-0.5" />
              <span><strong>Live with gratitude:</strong> Discover God&apos;s blessings in the ordinary.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sanctuary-sage shrink-0 mt-0.5" />
              <span><strong>Walk with purpose:</strong> Put quiet faith into loving action.</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full block py-3.5 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-sanctuary-roseDark transition-all"
          >
            Enter Your Sanctuary & Begin Day 1
          </Link>
        </div>
      )}
    </div>
  );
}
