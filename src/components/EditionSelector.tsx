"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { EDITIONS, ProductEdition, useLanguage } from "@/lib/i18n";

interface EditionSelectorProps {
  className?: string;
  variant?: "header" | "pill" | "footer";
}

export function EditionSelector({
  className = "",
  variant = "header",
}: EditionSelectorProps) {
  const { edition, activeEdition, setEdition } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const options: { id: ProductEdition; name: string; subtitle: string; badge: string }[] = [
    {
      id: "en",
      name: EDITIONS.en.name,
      subtitle: "English Edition • Complete 365 Days",
      badge: "Full Year",
    },
    {
      id: "pt-BR",
      name: EDITIONS["pt-BR"].name,
      subtitle: "Edição Brasileira • Janeiro Completo (Dias 1–31)",
      badge: "Janeiro Ativo",
    },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-sanctuary-taupeLight/80 text-sanctuary-cocoa text-xs font-medium hover:bg-sanctuary-blushLight transition-colors shadow-sm cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={activeEdition === "pt-BR" ? "Mudar Edição do Produto" : "Change Product Edition"}
      >
        <span className="font-serif font-bold text-xs tracking-wide hidden sm:inline text-sanctuary-cocoa">
          {edition.name}
        </span>
        <span className="font-semibold uppercase text-[11px] tracking-wider sm:hidden">
          {activeEdition === "pt-BR" ? "PT" : "EN"}
        </span>
        <ChevronDown className="w-3 h-3 text-sanctuary-taupe ml-0.5 opacity-70" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white shadow-xl border border-sanctuary-taupeLight/70 p-2 z-50 animate-fade-in text-xs">
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-sanctuary-taupe font-semibold border-b border-sanctuary-taupeLight/30 mb-1 flex items-center justify-between">
              <span>{activeEdition === "pt-BR" ? "Edições Disponíveis" : "Product Editions"}</span>
              <span className="text-sanctuary-rose font-medium normal-case flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {activeEdition === "pt-BR" ? "2 Edições" : "2 Editions"}
              </span>
            </div>

            <div className="space-y-1">
              {options.map((opt) => {
                const isSelected = activeEdition === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setEdition(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-sanctuary-blush/70 border border-sanctuary-rose/30 text-sanctuary-cocoa shadow-xs"
                        : "text-sanctuary-cocoa hover:bg-sanctuary-blushLight"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div>
                        <div className="font-serif font-bold text-sm text-sanctuary-cocoa flex items-center gap-1.5">
                          <span>{opt.name}</span>
                          {isSelected && (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-sans font-bold bg-sanctuary-rose text-white">
                              {activeEdition === "pt-BR" ? "Ativa" : "Active"}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-sanctuary-cocoaLight mt-0.5 leading-tight">
                          {opt.subtitle}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-sanctuary-rose mt-1 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-sanctuary-taupeLight/30 px-3 py-1 text-[10px] text-sanctuary-taupe text-center">
              {activeEdition === "pt-BR"
                ? "Cada edição mantém sua própria liturgia e idioma com fidelidade bíblica."
                : "Each edition maintains its own independent liturgy and devotional registry."}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
