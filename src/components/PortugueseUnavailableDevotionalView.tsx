"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Globe,
  Heart,
  Sparkles,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "./BotanicalElements";
import { useLanguage } from "@/lib/i18n";

interface PortugueseUnavailableDevotionalViewProps {
  dayNumber: number;
  monthNumber: number;
  monthThemeTitle: string;
  onSwitchToEnglish: () => void;
}

export function PortugueseUnavailableDevotionalView({
  dayNumber,
  monthNumber,
  monthThemeTitle,
  onSwitchToEnglish,
}: PortugueseUnavailableDevotionalViewProps) {
  const { setLanguage } = useLanguage();

  const handleReturnToEnglish = () => {
    setLanguage("en");
    if (onSwitchToEnglish) {
      onSwitchToEnglish();
    }
  };

  const prevDay = dayNumber > 1 ? dayNumber - 1 : 365;
  const nextDay = dayNumber < 365 ? dayNumber + 1 : 1;

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto py-4">
      {/* Top Breadcrumb & Day Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sanctuary-taupe border-b border-sanctuary-taupeLight/40 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/app" className="hover:text-sanctuary-cocoa font-medium">
            Início
          </Link>
          <span>/</span>
          <Link href="/calendar" className="hover:text-sanctuary-cocoa">
            Mês {monthNumber}: {monthThemeTitle}
          </Link>
          <span>/</span>
          <span className="text-sanctuary-cocoa font-semibold">Dia {dayNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/devotional/${prevDay}`}
            className="p-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
            title="Dia Anterior"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <span className="font-semibold text-sanctuary-cocoa text-xs">
            Dia {dayNumber} de 365
          </span>
          <Link
            href={`/devotional/${nextDay}`}
            className="p-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
            title="Próximo Dia"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Preparation Card */}
      <div className="bg-white border-2 border-sanctuary-blush rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 pointer-events-none opacity-10">
          <BotanicalSprig className="w-48 h-48 text-sanctuary-rose" />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold">
          <Globe className="w-4 h-4 text-amber-700" />
          <span>Edição em Português em Preparação • Dia {dayNumber}</span>
        </div>

        {/* Headings */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-sanctuary-cocoa leading-tight">
            Seu devocional de hoje está sendo preparado em português.
          </h1>
          <p className="font-serif italic text-base text-sanctuary-rose">
            Mês {monthNumber}: {monthThemeTitle}
          </p>
          <p className="text-sm sm:text-base text-sanctuary-cocoaLight leading-relaxed pt-2">
            Este devocional ainda está sendo preparado em português. Enquanto isso, você pode continuar sua jornada na edição em inglês.
          </p>
          <p className="text-xs text-sanctuary-taupe leading-relaxed">
            Estamos trabalhando com reverência bíblica e cuidado teológico na tradução completa dos 365 dias para que você viva sua jornada no seu idioma materno.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            type="button"
            onClick={handleReturnToEnglish}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sanctuary-rose text-white text-sm font-semibold shadow-md hover:bg-sanctuary-roseDark transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Voltar para o inglês</span>
          </button>

          <Link
            href="/calendar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-sanctuary-cocoa text-sm font-semibold hover:bg-sanctuary-blushLight transition-colors"
          >
            <Calendar className="w-4 h-4 text-sanctuary-taupe" />
            <span>Ver o Calendário</span>
          </Link>
        </div>
      </div>

      <BotanicalDivider />

      {/* Alternative Quiet-Time Sanctuary Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/prayer"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-sanctuary-blushLight text-sanctuary-rose group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
              Mural de Oração
            </h3>
            <p className="text-xs text-sanctuary-cocoaLight mt-0.5">
              Apresente suas petições e gratidões perante o Senhor.
            </p>
          </div>
        </Link>

        <Link
          href="/gratitude"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-sanctuary-sageLight text-sanctuary-sage group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
              Altar de Gratidão
            </h3>
            <p className="text-xs text-sanctuary-cocoaLight mt-0.5">
              Registre suas três misericórdias matinais de hoje.
            </p>
          </div>
        </Link>

        <Link
          href="/journal"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-sanctuary-ivory text-sanctuary-taupe group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
              Meu Diário
            </h3>
            <p className="text-xs text-sanctuary-cocoaLight mt-0.5">
              Anote o que Deus tem falado ao seu coração.
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-sanctuary-taupeLight/40 flex items-center justify-between text-xs text-sanctuary-cocoa">
        <Link
          href={`/devotional/${prevDay}`}
          className="inline-flex items-center gap-1.5 hover:text-sanctuary-rose font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dia Anterior (Dia {prevDay})</span>
        </Link>

        <Link
          href="/calendar"
          className="hover:text-sanctuary-rose font-medium text-sanctuary-taupe"
        >
          Voltar ao Calendário
        </Link>

        <Link
          href={`/devotional/${nextDay}`}
          className="inline-flex items-center gap-1.5 hover:text-sanctuary-rose font-medium"
        >
          <span>Próximo Dia (Dia {nextDay})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
