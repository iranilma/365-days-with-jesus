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
  Home,
  Sparkles,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "./BotanicalElements";

interface PortugueseUnavailableDevotionalViewProps {
  dayNumber: number;
  monthNumber: number;
  monthThemeTitle: string;
  onSwitchToEnglish?: () => void;
  basePrefix?: string;
}

export function PortugueseUnavailableDevotionalView({
  dayNumber,
  monthNumber,
  monthThemeTitle,
  basePrefix = "/pt-br",
}: PortugueseUnavailableDevotionalViewProps) {
  const prevDay = dayNumber > 1 ? dayNumber - 1 : 365;
  const nextDay = dayNumber < 365 ? dayNumber + 1 : 1;

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto py-4">
      {/* Top Breadcrumb & Day Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sanctuary-taupe border-b border-sanctuary-taupeLight/40 pb-4">
        <div className="flex items-center gap-2">
          <Link href={`${basePrefix}/app`} className="hover:text-sanctuary-cocoa font-medium">
            Início
          </Link>
          <span>/</span>
          <Link href={`${basePrefix}/calendar`} className="hover:text-sanctuary-cocoa">
            Mês {monthNumber}: {monthThemeTitle}
          </Link>
          <span>/</span>
          <span className="text-sanctuary-cocoa font-semibold">Dia {dayNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`${basePrefix}/devotional/${prevDay}`}
            className="p-1.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa hover:bg-sanctuary-blushLight transition-colors"
            title="Dia Anterior"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <span className="font-semibold text-sanctuary-cocoa text-xs">
            Dia {dayNumber} de 365
          </span>
          <Link
            href={`${basePrefix}/devotional/${nextDay}`}
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
          <span>Edição em Português em Preparação • Dia {dayNumber} de 365</span>
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
            Este devocional da edição <strong>365 Dias com Jesus</strong> está atualmente sendo preparado
            por nossa equipe com reverência bíblica e exegese cuidadosa na Almeida Bíblia Livre (ABL).
          </p>
          <p className="text-xs text-sanctuary-taupe leading-relaxed">
            Todos os 31 devocionais de Janeiro já estão aprovados e publicados. Você pode retornar ao
            calendário de leituras ou desfrutar dos outros espaços do santuário.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <Link
            href={`${basePrefix}/app`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sanctuary-rose text-white text-sm font-semibold shadow-md hover:bg-sanctuary-roseDark transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Santuário</span>
          </Link>

          <Link
            href={`${basePrefix}/calendar`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-sanctuary-cocoa text-sm font-semibold hover:bg-sanctuary-blushLight transition-colors"
          >
            <Calendar className="w-4 h-4 text-sanctuary-taupe" />
            <span>Ver Calendário de Janeiro</span>
          </Link>

          <Link
            href={`${basePrefix}/devotional/1`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sanctuary-ivory border border-sanctuary-taupeLight text-sanctuary-cocoa text-sm font-semibold hover:bg-sanctuary-blushLight transition-colors"
          >
            <BookOpen className="w-4 h-4 text-sanctuary-taupe" />
            <span>Ler Devocional do Dia 1</span>
          </Link>
        </div>

        {/* Link to Editions Portal */}
        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa underline underline-offset-4"
          >
            Escolher ou alternar edição do produto
          </Link>
        </div>
      </div>

      <BotanicalDivider />

      {/* Alternative Quiet-Time Sanctuary Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href={`${basePrefix}/prayer`}
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
          href={`${basePrefix}/gratitude`}
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
              Registre três bênçãos diárias diante de Deus.
            </p>
          </div>
        </Link>

        <Link
          href={`${basePrefix}/app`}
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-sanctuary-blushLight text-sanctuary-rose group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
              Início do Santuário
            </h3>
            <p className="text-xs text-sanctuary-cocoaLight mt-0.5">
              Retorne ao painel diário de comunhão.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
