import { use } from "react";
import { PrintablesView } from "@/components/views/PrintablesView";

export default function EnglishPrintableDevotionalPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolved = use(params);
  const dayNumber = parseInt(resolved.day, 10) || 1;
  return <PrintablesView edition="en" dayNumber={dayNumber} />;
}
