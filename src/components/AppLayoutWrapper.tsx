"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { SanctuaryFooter } from "@/components/SanctuaryFooter";
import { LanguageProvider } from "@/lib/i18n";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSalesPage = pathname === "/" || pathname === "/sales";

  if (!mounted) {
    // Return children wrapped with provider during server render to prevent layout flash
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  if (isSalesPage) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  return (
    <LanguageProvider>
      <Navigation />

      {/* Main Content Area for Devotional Sanctuary App */}
      <main className="flex-1 pb-20 lg:pb-12 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* App Sanctuary Footer */}
      <SanctuaryFooter />
    </LanguageProvider>
  );
}
