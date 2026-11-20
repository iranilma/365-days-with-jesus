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

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/app", icon: Home },
    { label: "Devotional", href: "/devotional/1", icon: BookOpen },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Prayer Wall", href: "/prayer", icon: Heart },
    { label: "Gratitude", href: "/gratitude", icon: Sparkles },
    { label: "Journal", href: "/journal", icon: PenTool },
    { label: "Printables", href: "/printables/1", icon: Printer },
  ];

  const isActive = (href: string) => {
    if (href === "/app") return pathname === "/app" || pathname === "/";
    return pathname.startsWith(href.split("/")[1] ? `/${href.split("/")[1]}` : href);
  };

  return (
    <>
      {/* Top Banner & Header (Desktop & Tablet) */}
      <header className="w-full bg-sanctuary-ivoryLight border-b border-sanctuary-taupeLight/60 sticky top-0 z-40 print:hidden backdrop-blur-md bg-opacity-95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <BotanicalSprig className="w-7 h-7 text-sanctuary-rose group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-sanctuary-cocoa block leading-tight">
                365 DAYS WITH JESUS
              </span>
              <span className="hidden md:block text-[11px] font-sans tracking-widest uppercase text-sanctuary-taupe">
                Start with faith • Live with gratitude • Walk with purpose
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

          {/* Right Action: Today's Quiet Time Quick Anchor */}
          <div className="flex items-center gap-2">
            <Link
              href="/devotional/1"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sanctuary-rose text-white text-xs font-semibold shadow-sm hover:bg-sanctuary-roseDark transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Today: Day 1</span>
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
        {/* More Options / Print quick icon */}
        <Link
          href="/printables/1"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            isActive("/printables")
              ? "text-sanctuary-rose font-bold"
              : "text-sanctuary-cocoaLight hover:text-sanctuary-cocoa"
          }`}
        >
          <Printer className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] mt-0.5 tracking-tight">Print</span>
        </Link>
      </nav>
    </>
  );
}
