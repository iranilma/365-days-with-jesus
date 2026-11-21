import { use } from "react";
import { PrintablesView } from "@/components/views/PrintablesView";

export default function PortuguesePrintableDevotionalPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolved = use(params);
  const dayNumber = parseInt(resolved.day, 10) || 1;
  return <PrintablesView edition="pt-BR" dayNumber={dayNumber} />;
}
