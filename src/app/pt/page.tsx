"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Heart,
  PenTool,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";
import { useLanguage } from "@/lib/i18n";

export default function PortugueseEditionPortalPage() {
  const { setEdition, language } = useLanguage();

  // Enforce Brazilian Portuguese edition on entry
  useEffect(() => {
    setEdition("pt-BR");
  }, [setEdition]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 animate-fade-in">
      {/* Top Edition Switcher & Breadcrumb */}
      <div className="flex items-center justify-between border-b border-sanctuary-taupeLight/50 pb-4">
        <div className="flex items-center gap-2 text-xs text-sanctuary-taupe">
          <span className="font-semibold text-sanctuary-cocoa">Edição Oficial</span>
          <span>•</span>
          <span className="text-sanctuary-rose font-medium">Português do Brasil (pt-BR)</span>
        </div>
        <Link
          href="/"
          className="text-xs text-sanctuary-taupe hover:text-sanctuary-cocoa underline underline-offset-4"
        >
          Ver Todas as Edições
        </Link>
      </div>

      {/* Hero Welcome Card */}
      <div className="bg-sanctuary-ivoryLight border-2 border-sanctuary-blush rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 pointer-events-none opacity-15">
          <BotanicalSprig className="w-56 h-56 text-sanctuary-rose" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold mb-6">
          <SunMedium className="w-4 h-4 text-sanctuary-rose" />
          <span>Santuário de Oração & Comunhão Diária</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sanctuary-cocoa tracking-tight leading-tight">
          365 DIAS COM JESUS
        </h1>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-sanctuary-rose">
          Uma Jornada de Fé, Graça e Comunhão Diária com Cristo
        </p>
        <p className="mt-4 text-xs sm:text-sm text-sanctuary-cocoaLight max-w-2xl mx-auto leading-relaxed">
          Bem-vindo à edição em língua portuguesa. Criada com reverência bíblica, cuidado teológico
          e exegese fundamentada na Bíblia Livre (ABL em domínio público), para guiar seu momento
          a sós com Deus todos os dias do ano.
        </p>

        {/* Status Callout */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-sanctuary-taupeLight/80 text-xs text-sanctuary-cocoa font-medium shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-sanctuary-sage" />
          <span>Janeiro Disponível (Dias 1 a 31) • 31 Devocionais Vetting Aprovados</span>
        </div>

        {/* Primary CTA Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <Link
            href="/pt-br/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sanctuary-rose text-white text-sm font-semibold shadow-md hover:bg-sanctuary-roseDark transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Entrar no Santuário</span>
          </Link>

          <Link
            href="/pt-br/devotional/1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-sanctuary-taupeLight text-sanctuary-cocoa text-sm font-semibold hover:bg-sanctuary-blushLight transition-colors"
          >
            <Sparkles className="w-4 h-4 text-sanctuary-rose" />
            <span>Devocional de Hoje (Dia 1)</span>
          </Link>
        </div>
      </div>

      <BotanicalDivider />

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/pt-br/calendar"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all group"
        >
          <div className="p-2.5 w-fit rounded-xl bg-sanctuary-blushLight text-sanctuary-rose group-hover:scale-105 transition-transform mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
            Calendário de Fé
          </h3>
          <p className="text-xs text-sanctuary-cocoaLight mt-1">
            Navegue pelos temas e pelos 31 dias de Janeiro.
          </p>
        </Link>

        <Link
          href="/pt-br/prayer"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all group"
        >
          <div className="p-2.5 w-fit rounded-xl bg-sanctuary-blushLight text-sanctuary-rose group-hover:scale-105 transition-transform mb-3">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
            Mural de Oração
          </h3>
          <p className="text-xs text-sanctuary-cocoaLight mt-1">
            Guarde suas petições e testemunhos de oração respondida.
          </p>
        </Link>

        <Link
          href="/pt-br/gratitude"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all group"
        >
          <div className="p-2.5 w-fit rounded-xl bg-sanctuary-sageLight text-sanctuary-sage group-hover:scale-105 transition-transform mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
            Altar de Gratidão
          </h3>
          <p className="text-xs text-sanctuary-cocoaLight mt-1">
            Registre três graças diárias diante do Senhor.
          </p>
        </Link>

        <Link
          href="/pt-br/journal"
          className="p-5 bg-white border border-sanctuary-taupeLight/60 rounded-2xl hover:border-sanctuary-rose transition-all group"
        >
          <div className="p-2.5 w-fit rounded-xl bg-sanctuary-blushLight text-sanctuary-rose group-hover:scale-105 transition-transform mb-3">
            <PenTool className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-sanctuary-cocoa">
            Diário Espiritual
          </h3>
          <p className="text-xs text-sanctuary-cocoaLight mt-1">
            Espaço sagrado para registrar o que Deus falou ao seu coração.
          </p>
        </Link>
      </div>
    </div>
  );
}
