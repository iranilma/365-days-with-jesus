"use client";

import React from "react";
import Link from "next/link";
import { BotanicalSprig } from "./BotanicalElements";
import { useLanguage } from "@/lib/i18n";

export function SanctuaryFooter() {
  const { language, t } = useLanguage();
  const isPt = language === "pt-BR";

  return (
    <footer className="w-full bg-sanctuary-ivoryLight border-t border-sanctuary-taupeLight/50 py-8 px-4 text-center print:hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        <BotanicalSprig className="w-6 h-6 text-sanctuary-rose opacity-80" />
        <p className="font-serif text-lg text-sanctuary-cocoa italic max-w-md">
          {isPt
            ? "“As suas misericórdias não têm fim. Renovam-se a cada manhã. Grande é a Tua fidelidade.” (Lamentações 3:22-23)"
            : "“His compassions don't fail. They are new every morning. Great is Your faithfulness.”"}
        </p>
        <p className="text-xs text-sanctuary-taupe">
          {isPt
            ? "Citações bíblicas na edição original em inglês extraídas da World English Bible (WEB), dedicada ao domínio público."
            : "Scripture quotations are taken from the World English Bible (WEB), dedicated to the public domain."}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-sanctuary-cocoaLight mt-2">
          <Link href="/devotional/1" className="hover:text-sanctuary-rose">
            {isPt ? "Devocional de Hoje" : "Today's Devotional"}
          </Link>
          <span>•</span>
          <Link href="/calendar" className="hover:text-sanctuary-rose">
            {isPt ? "Plano de 365 Dias" : "365-Day Plan"}
          </Link>
          <span>•</span>
          <Link href="/prayer" className="hover:text-sanctuary-rose">
            {isPt ? "Mural de Oração" : "Prayer Wall"}
          </Link>
          <span>•</span>
          <Link href="/gratitude" className="hover:text-sanctuary-rose">
            {isPt ? "Altar de Gratidão" : "Gratitude"}
          </Link>
          <span>•</span>
          <Link href="/journal" className="hover:text-sanctuary-rose">
            {isPt ? "Meu Diário" : "Journal"}
          </Link>
          <span>•</span>
          <Link href="/printables/1" className="hover:text-sanctuary-rose">
            {isPt ? "Planejador para Imprimir" : "Printable Planner"}
          </Link>
        </div>
        <p className="text-[11px] text-sanctuary-taupe mt-1">
          &copy; {new Date().getFullYear()} {isPt ? "365 Dias Com Jesus" : "365 Days With Jesus"}.{" "}
          {t("common.tagline")}
        </p>
      </div>
    </footer>
  );
}
