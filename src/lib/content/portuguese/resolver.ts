import { PORTUGUESE_DEVOTIONAL_REGISTRY } from "./registry";
import { PortugueseAvailabilityResult, PortugueseDevotionalEntry } from "./types";

export function getPortugueseDevotional(dayNumber: number): PortugueseAvailabilityResult {
  const safeDay = Math.max(1, Math.min(365, isNaN(dayNumber) ? 1 : Math.floor(dayNumber)));
  const found = PORTUGUESE_DEVOTIONAL_REGISTRY.find((d) => d.day_number === safeDay);

  const status = found?.translation_status || "not_started";
  const isAvailable = status === "approved" || status === "published";

  return {
    available: isAvailable,
    day_number: safeDay,
    month_number: found?.month_number || 1,
    status,
    entry: isAvailable && found ? found : null,
    notice: {
      badge: "Edição em Preparação",
      headline: "Edição em Português em Preparação",
      message:
        "Este devocional ainda está sendo preparado em português com reverência e fidelidade bíblica.",
      action_return_dashboard: "Voltar ao Início",
      action_choose_edition: "Escolher Edição",
      action_return_english: "Voltar para o inglês",
    },
  };
}

export function isPortugueseDevotionalAvailable(dayNumber: number): boolean {
  const res = getPortugueseDevotional(dayNumber);
  return res.available;
}
