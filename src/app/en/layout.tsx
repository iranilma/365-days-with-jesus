import React from "react";
import { LanguageProvider } from "@/lib/i18n";

export default function EnglishEditionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider forcedEdition="en">
      {children}
    </LanguageProvider>
  );
}
