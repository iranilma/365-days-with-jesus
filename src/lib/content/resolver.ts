import { DevotionalEntry } from "../types";
import { getDevotionalEntry as getEnglishDevotionalEntry } from "./devotionals";
import { getPortugueseDevotional } from "./portuguese/resolver";
import { PortugueseDevotionalEntry, TranslationStatus } from "./portuguese/types";
import { SupportedLanguage } from "@/lib/i18n";

export type DevotionalContentResolution =
  | {
      language: "en";
      available: true;
      status: "published";
      entry: DevotionalEntry;
    }
  | {
      language: "pt-BR";
      available: true;
      status: "published";
      entry: PortugueseDevotionalEntry;
    }
  | {
      language: "pt-BR";
      available: false;
      status: TranslationStatus;
      dayNumber: number;
      monthNumber: number;
      notice: {
        headline: string;
        message: string;
        cta: string;
      };
    };

export function resolveDevotionalContent(
  dayNumber: number,
  language: SupportedLanguage
): DevotionalContentResolution {
  if (language === "en") {
    const entry = getEnglishDevotionalEntry(dayNumber);
    return {
      language: "en",
      available: true,
      status: "published",
      entry,
    };
  }

  // Portuguese mode
  const ptResult = getPortugueseDevotional(dayNumber);
  if (ptResult.available && ptResult.entry && ptResult.status === "published") {
    return {
      language: "pt-BR",
      available: true,
      status: "published",
      entry: ptResult.entry,
    };
  }

  return {
    language: "pt-BR",
    available: false,
    status: ptResult.status,
    dayNumber: ptResult.day_number,
    monthNumber: ptResult.month_number,
    notice: {
      headline: "Seu devocional de hoje está sendo preparado em português.",
      message:
        "Este devocional ainda está sendo preparado em português. Enquanto isso, você pode continuar sua jornada na edição em inglês.",
      cta: "Voltar para o inglês",
    },
  };
}
