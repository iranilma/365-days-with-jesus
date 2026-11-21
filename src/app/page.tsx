"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Globe,
  Heart,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { BotanicalDivider, BotanicalSprig } from "@/components/BotanicalElements";

export default function EditionSelectionPage() {
  return (
    <div className="min-h-screen bg-sanctuary-ivory flex flex-col justify-between selection:bg-sanctuary-blush selection:text-sanctuary-cocoa">
      {/* Header */}
      <header className="w-full bg-sanctuary-ivoryLight/90 backdrop-blur-md border-b border-sanctuary-taupeLight/60 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BotanicalSprig className="w-7 h-7 text-sanctuary-rose" />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-sanctuary-cocoa block leading-tight">
                365 DAYS WITH JESUS
              </span>
              <span className="text-[10px] font-sans tracking-widest uppercase text-sanctuary-taupe">
                Sacred Daily Devotional Sanctuary
              </span>
            </div>
          </div>

          <Link
            href="/sales"
            className="text-xs font-semibold text-sanctuary-cocoa hover:text-sanctuary-rose transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sanctuary-taupeLight bg-white shadow-xs"
          >
            <span>Product Overview ($17)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Selection Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 flex-1 w-full">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sanctuary-blush text-sanctuary-cocoa text-xs font-semibold">
            <SunMedium className="w-4 h-4 text-sanctuary-rose" />
            <span>Select Your Devotional Edition • Escolha sua Edição</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sanctuary-cocoa tracking-tight leading-tight">
            One Sacred Sanctuary.<br />Two Dedicated Editions.
          </h1>

          <p className="text-sm sm:text-base text-sanctuary-cocoaLight leading-relaxed pt-2">
            Enter your preferred edition below. Each edition operates with its own independent interface,
            theological review, and devotional content library.
          </p>
        </div>

        {/* Edition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* EDITION A — ENGLISH */}
          <div className="bg-white border-2 border-sanctuary-taupeLight/80 rounded-3xl p-7 sm:p-9 shadow-sm hover:border-sanctuary-rose hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
              <BotanicalSprig className="w-44 h-44 text-sanctuary-rose" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-sanctuary-taupe">
                  English Edition
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Complete 365 Days</span>
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sanctuary-cocoa">
                  365 Days With Jesus
                </h2>
                <p className="font-serif italic text-sm text-sanctuary-rose mt-1">
                  English devotional journey.
                </p>
                <p className="text-xs sm:text-sm text-sanctuary-cocoaLight mt-3 leading-relaxed">
                  A full-year sacred pilgrimage through the World English Bible (WEB), spanning all 12
                  biblical monthly themes from morning mercies in January to Christ&apos;s eternal reign in December.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-sanctuary-taupeLight/40 text-xs text-sanctuary-cocoa">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>365 daily devotionals &amp; guided prayers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>Full year interactive calendar &amp; progress tracker</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>Daily prayer wall, gratitude altar, and spiritual journal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>Printable US Letter and A4 daily quiet-time sheets</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3 relative z-10">
              <Link
                href="/en"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Enter English Sanctuary</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs text-sanctuary-taupe">
                <Link href="/en/devotional/1" className="hover:text-sanctuary-cocoa underline underline-offset-4">
                  Today: Day 1
                </Link>
                <span>•</span>
                <Link href="/en/calendar" className="hover:text-sanctuary-cocoa">
                  Calendar
                </Link>
                <span>•</span>
                <Link href="/sales" className="hover:text-sanctuary-cocoa">
                  Printables Offer
                </Link>
              </div>
            </div>
          </div>

          {/* EDITION B — PORTUGUESE */}
          <div className="bg-white border-2 border-sanctuary-taupeLight/80 rounded-3xl p-7 sm:p-9 shadow-sm hover:border-sanctuary-rose hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
              <BotanicalSprig className="w-44 h-44 text-sanctuary-rose" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-sanctuary-taupe">
                  Edição em Português
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Janeiro Disponível (Dias 1–31)</span>
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sanctuary-cocoa">
                  365 Dias com Jesus
                </h2>
                <p className="font-serif italic text-sm text-sanctuary-rose mt-1">
                  Jornada devocional em português.
                </p>
                <p className="text-xs sm:text-sm text-sanctuary-cocoaLight mt-3 leading-relaxed">
                  Edição dedicada integralmente ao público de língua portuguesa, traduzida com reverência
                  e rigor teológico a partir da Almeida Bíblia Livre (ABL em domínio público).
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-sanctuary-taupeLight/40 text-xs text-sanctuary-cocoa">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>31 liturgias completas em Janeiro (Dias 1 a 31 aprovados)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>Exegese e citações da Almeida Bíblia Livre (ABL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>Mural de oração, altar de gratidão e diário em português</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sanctuary-sage shrink-0" />
                  <span>Zero conteúdo em inglês como fallback</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3 relative z-10">
              <Link
                href="/pt-br"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-sanctuary-rose text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Entrar no Santuário em Português</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs text-sanctuary-taupe">
                <Link href="/pt-br/devotional/1" className="hover:text-sanctuary-cocoa underline underline-offset-4">
                  Hoje: Dia 1
                </Link>
                <span>•</span>
                <Link href="/pt-br/calendar" className="hover:text-sanctuary-cocoa">
                  Calendário
                </Link>
                <span>•</span>
                <Link href="/pt-br/prayer" className="hover:text-sanctuary-cocoa">
                  Mural de Oração
                </Link>
              </div>
            </div>
          </div>
        </div>

        <BotanicalDivider />

        {/* Commercial Banner */}
        <div className="bg-sanctuary-ivoryLight border border-sanctuary-taupeLight/80 rounded-2xl p-6 text-center space-y-2">
          <h3 className="font-serif text-lg font-bold text-sanctuary-cocoa">
            Looking for the Premium Printable Edition?
          </h3>
          <p className="text-xs text-sanctuary-cocoaLight max-w-xl mx-auto">
            Get lifetime access to the complete 365-day devotional workbook in US Letter and A4 PDF formats,
            including all 12 monthly sections and liturgical layouts for just $17.
          </p>
          <div className="pt-2">
            <Link
              href="/sales"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sanctuary-rose hover:text-sanctuary-roseDark underline underline-offset-4"
            >
              <span>View Product Details &amp; Printable Offer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-sanctuary-taupeLight/60 bg-white/60 py-6 text-center text-xs text-sanctuary-taupe">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()} 365 Days With Jesus / 365 Dias com Jesus. All rights reserved.
          </p>
          <p className="text-[11px] text-sanctuary-taupe/80">
            Scripture quotations: English Edition taken from World English Bible (WEB, Public Domain).
            Edição em Português: Almeida Bíblia Livre (ABL, Domínio Público).
          </p>
        </div>
      </footer>
    </div>
  );
}
