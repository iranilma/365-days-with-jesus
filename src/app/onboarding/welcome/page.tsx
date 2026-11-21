"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Globe,
  Heart,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { BotanicalSprig } from "@/components/BotanicalElements";
import { SupportedLanguage, useLanguage } from "@/lib/i18n";

export default function WelcomeOnboardingPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [quietTimePreference, setQuietTimePreference] = useState<"morning" | "midday" | "evening">("morning");
  const [translationPreference, setTranslationPreference] = useState("WEB");

  const isPt = language === "pt-BR";

  return (
    <div className="max-w-xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <BotanicalSprig className="w-12 h-12 text-sanctuary-rose mx-auto" />
        <span className="text-xs font-semibold uppercase tracking-widest text-sanctuary-taupe">
          {isPt ? "Bem-vinda ao seu Santuário" : "Welcome to Your Sanctuary"}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sanctuary-cocoa">
          {isPt ? "365 Dias Com Jesus" : "365 Days With Jesus"}
        </h1>
        <p className="font-serif italic text-base text-sanctuary-cocoaLight">
          &ldquo;{t("common.tagline")}&rdquo;
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
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

      {/* Step 1: Language Selection */}
      {step === 1 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-1">
              <Globe className="w-3.5 h-3.5 text-sanctuary-rose" />
              <span>{isPt ? "Escolha seu Idioma" : "Choose Your Language"}</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              {isPt ? "Selecione o Idioma da sua Edição" : "Select Your Edition Language"}
            </h2>
            <p className="text-xs text-sanctuary-cocoaLight">
              {isPt
                ? "Você pode alterar seu idioma a qualquer momento nas configurações ou no cabeçalho."
                : "You can change your language anytime from the header or settings."}
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                code: "en" as SupportedLanguage,
                nativeName: "English",
                subtitle: "Original Approved Edition (World English Bible)",
                sample: "“Come to me, all you who labor and are heavily burdened, and I will give you rest.” (Matthew 11:28)",
                flag: "🇬🇧",
              },
              {
                code: "pt-BR" as SupportedLanguage,
                nativeName: "Português (Brasil)",
                subtitle: "Edição em Português Brasileiro",
                sample: "“Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso.” (Mateus 11:28)",
                flag: "🇧🇷",
              },
            ].map((langOpt) => {
              const active = language === langOpt.code;
              return (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => setLanguage(langOpt.code)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                    active
                      ? "border-sanctuary-rose bg-sanctuary-blushLight shadow-sm ring-1 ring-sanctuary-rose"
                      : "border-sanctuary-taupeLight/60 bg-white hover:bg-sanctuary-ivory"
                  }`}
                >
                  <span className="text-2xl mt-0.5" role="img" aria-hidden="true">
                    {langOpt.flag}
                  </span>
                  <div className="flex-1">
                    <span className="font-serif text-lg font-bold text-sanctuary-cocoa block">
                      {langOpt.nativeName}
                    </span>
                    <span className="text-xs text-sanctuary-taupe block mb-1">
                      {langOpt.subtitle}
                    </span>
                    <p className="font-serif italic text-xs text-sanctuary-cocoaLight">
                      {langOpt.sample}
                    </p>
                  </div>
                  {active && <Check className="w-5 h-5 text-sanctuary-rose shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-colors flex items-center justify-center gap-2"
          >
            <span>{isPt ? "Continuar para o Ritmo de Devoção" : "Continue to Sacred Rhythm"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Sacred Rhythm */}
      {step === 2 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              {isPt ? "Qual o momento em que sua alma mais anseia por quietude?" : "When does your soul most crave stillness?"}
            </h2>
            <p className="text-xs text-sanctuary-cocoaLight">
              {isPt ? "Selecione o seu momento ideal para um devocional sereno." : "Select your natural daily window for unhurried quiet time."}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "morning",
                title: isPt ? "Alvorecer da Manhã (Primícias)" : "Morning Dawn Sanctuary",
                desc: isPt
                  ? "Antes da casa acordar, iniciando o dia ancorada nas misericórdias renovadas de Deus."
                  : "Before the house wakes, starting your day anchored in God's fresh mercies.",
                icon: Sun,
              },
              {
                id: "midday",
                title: isPt ? "Pausa do Meio-Dia (Descanso na Rotina)" : "Midday Sabbath Pause",
                desc: isPt
                  ? "Um respiro espiritual para recalibrar a mente em meio às tarefas cotidianas."
                  : "A calming spiritual breath to recalibrate your mind amidst daily demands.",
                icon: Sparkles,
              },
              {
                id: "evening",
                title: isPt ? "Serenidade da Noite (Ao Pôr do Sol)" : "Evening Lamplight Reflection",
                desc: isPt
                  ? "Entregando as preocupações e repousando em gratidão antes do descanso."
                  : "Unburdening your thoughts and resting in thanksgiving before sleep.",
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

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 py-3 rounded-full border border-sanctuary-taupeLight text-sanctuary-cocoa text-xs font-semibold"
            >
              {t("common.back")}
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 py-3 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-colors flex items-center justify-center gap-2"
            >
              <span>{t("common.continue")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Translation & Integrity */}
      {step === 3 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              {isPt ? "Tradução Bíblica & Integridade" : "Foundational Scripture Translation"}
            </h2>
            <p className="text-xs text-sanctuary-cocoaLight">
              {isPt
                ? "Preservamos a fidelidade bíblica e a clareza textual das Sagradas Escrituras."
                : "We uphold verified accuracy and full commercial public-domain copyright clarity."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sanctuary-ivory border-l-4 border-sanctuary-rose text-xs space-y-2">
            <span className="font-bold text-sanctuary-cocoa block">
              {isPt ? "Edição Original: World English Bible (WEB)" : "Default: World English Bible (WEB)"}
            </span>
            <p className="text-sanctuary-cocoaLight leading-relaxed">
              {isPt
                ? "A edição original utiliza a World English Bible (WEB), fiel aos manuscritos originais e dedicada ao domínio público. A edição em português está sendo preparada com o mesmo rigor e reverência teológica."
                : "A modern, elegant English translation derived from the American Standard Version and Byzantine majority text, freely dedicated to the public domain. Clear, faithful, and poetic for reading and reflection."}
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
              <span className="font-medium">
                {isPt
                  ? "World English Bible (WEB) / Edição em Português Fiel"
                  : "World English Bible (WEB) — Public Domain Clear"}
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 py-3 rounded-full border border-sanctuary-taupeLight text-sanctuary-cocoa text-xs font-semibold"
            >
              {t("common.back")}
            </button>
            <button
              onClick={() => setStep(4)}
              className="w-2/3 py-3 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow hover:bg-sanctuary-roseDark transition-colors flex items-center justify-center gap-2"
            >
              <span>{t("common.continue")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Commitment to Grace */}
      {step === 4 && (
        <div className="bg-white border border-sanctuary-taupeLight/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-center">
          <div className="space-y-2">
            <Heart className="w-10 h-10 text-sanctuary-rose mx-auto fill-current opacity-80" />
            <h2 className="font-serif text-2xl font-bold text-sanctuary-cocoa">
              {isPt ? "Nosso Pacto de Graça" : "Our Covenant of Grace"}
            </h2>
            <p className="text-xs sm:text-sm text-sanctuary-cocoaLight leading-relaxed max-w-md mx-auto">
              {isPt
                ? "Neste espaço, você jamais verá alarmes de metas perdidas, cobranças ou exigência de perfeição."
                : "In this space, you will never see broken streak alarms, guilt-inducing notifications, or demands for perfection."}
            </p>
          </div>

          <div className="p-4 bg-sanctuary-ivoryLight rounded-2xl border border-sanctuary-taupeLight/60 text-xs text-sanctuary-cocoa space-y-2 text-left">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sanctuary-sage shrink-0 mt-0.5" />
              <span>
                <strong>{isPt ? "Comece com fé:" : "Start your day with faith:"}</strong>{" "}
                {isPt ? "Faça das Escrituras a sua âncora matinal." : "Let Scripture be your morning anchor."}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sanctuary-sage shrink-0 mt-0.5" />
              <span>
                <strong>{isPt ? "Viva com gratidão:" : "Live with gratitude:"}</strong>{" "}
                {isPt ? "Descubra as bênçãos de Deus nos detalhes do dia." : "Discover God's blessings in the ordinary."}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sanctuary-sage shrink-0 mt-0.5" />
              <span>
                <strong>{isPt ? "Caminhe com propósito:" : "Walk with purpose:"}</strong>{" "}
                {isPt ? "Transforme a fé serena em gestos de amor." : "Put quiet faith into loving action."}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(3)}
              className="w-1/3 py-3.5 rounded-full border border-sanctuary-taupeLight text-sanctuary-cocoa text-xs font-semibold"
            >
              {t("common.back")}
            </button>
            <Link
              href="/app"
              className="w-2/3 block py-3.5 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-sanctuary-roseDark transition-all text-center"
            >
              {isPt ? "Entrar no Santuário & Começar o Dia 1" : "Enter Your Sanctuary & Begin Day 1"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
