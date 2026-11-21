import React from "react";
import { LanguageProvider } from "@/lib/i18n";

export default function PortugueseEditionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider forcedEdition="pt-BR">
      {children}
    </LanguageProvider>
  );
}
