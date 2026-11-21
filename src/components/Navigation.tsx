"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Heart,
  Home,
  PenTool,
  Printer,
  Sparkles,
} from "lucide-react";
import { BotanicalSprig } from "./BotanicalElements";
import { useLanguage } from "@/lib/i18n";

export function Navigation() {
  const pathname = usePathname() || "";
  const { t, language } = useLanguage();

  const isPtRoute = pathname.startsWith("/pt-br") || pathname.startsWith("/pt");
  const isEnRoute = pathname.startsWith("/en");
  const isPt = isPtRoute ? true : isEnRoute ? false : language === "pt-BR";
  const prefix = isPt ? "/pt-br" : "/en";

  const navItems = [
    { label: t("nav.dashboard"), href: `${prefix}`, icon: Home },
    { label: t("nav.devotional"), href: `${prefix}/devotional/1`, icon: BookOpen },
    { label: t("nav.calendar"), href: `${prefix}/calendar`, icon: Calendar },
    { label: t("nav.prayerWall"), href: `${prefix}/prayer`, icon: Heart },
    { label: t("nav.gratitude"), href: `${prefix}/gratitude`, icon: Sparkles },
    { label: t("nav.journal"), href: `${prefix}/journal`, icon: PenTool },
    { label: t("nav.printables"), href: `${prefix}/printables/1`, icon: Printer },
  ];

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (href === prefix && (pathname === prefix || pathname === `${prefix}/app` || pathname === `${prefix}/`)) return true;
    const baseTarget = href.replace(/^\/(en|pt-br|pt)/, "");
    const currentBase = pathname.replace(/^\/(en|pt-br|pt)/, "");
    if ((baseTarget === "" || baseTarget === "/app") && (currentBase === "" || currentBase === "/app")) return true;
    if (baseTarget && baseTarget !== "/" && currentBase.startsWith(baseTarget)) return true;
    return false;
  };

  return (
    <>
      {/* Top Banner & Header (Desktop & Tablet) */}
      <header className="w-full bg-sanctuary-ivoryLight border-b border-sanctuary-taupeLight/60 sticky top-0 z-40 print:hidden backdrop-blur-md bg-opacity-95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href={prefix === "/pt-br" ? "/pt-br" : "/en"} className="flex items-center gap-3 group">
            <BotanicalSprig className="w-7 h-7 text-sanctuary-rose group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-sanctuary-cocoa block leading-tight">
                {isPt ? "365 DIAS COM JESUS" : "365 DAYS WITH JESUS"}
              </span>
              <span className="hidden md:block text-[11px] font-sans tracking-widest uppercase text-sanctuary-taupe">
                {t("common.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    active
                      ? "bg-sanctuary-blush text-sanctuary-cocoa font-semibold shadow-sm"
                      : "text-sanctuary-cocoaLight hover:text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Edition Badge & Today's Quiet Time Quick Anchor */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-sanctuary-taupeLight/80 text-sanctuary-cocoa text-xs font-medium hover:bg-sanctuary-blushLight transition-colors shadow-xs"
              title={isPt ? "Ver todas as edições do produto" : "View all product editions"}
            >
              <span className="text-xs" role="img" aria-hidden="true">
                {isPt ? "🇧🇷" : "🇬🇧"}
              </span>
              <span className="font-serif font-bold text-xs hidden sm:inline text-sanctuary-cocoa">
                {isPt ? "365 Dias com Jesus" : "365 Days With Jesus"}
              </span>
              <span className="text-[10px] text-sanctuary-taupe hidden md:inline">
                {isPt ? "• Edições" : "• Editions"}
              </span>
            </Link>

            <Link
              href={`${prefix}/devotional/1`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isPt ? "Hoje: Dia 1" : t("nav.todayAnchor", { day: 1 })}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Sanctuary Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-sanctuary-ivoryLight border-t border-sanctuary-taupeLight/70 py-1.5 px-2 flex justify-around items-center print:hidden shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                active
                  ? "text-sanctuary-rose font-bold"
                  : "text-sanctuary-cocoaLight hover:text-sanctuary-cocoa"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "stroke-[2.25]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
        {/* Print quick icon */}
        <Link
          href={`${prefix}/printables/1`}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isActive(`${prefix}/printables/1`)
              ? "text-sanctuary-rose font-bold"
              : "text-sanctuary-cocoaLight hover:text-sanctuary-cocoa"
          }`}
        >
          <Printer className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] mt-0.5 tracking-tight">{isPt ? "Imprimir" : t("nav.print")}</span>
        </Link>
      </nav>
    </>
  );
}
