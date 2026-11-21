import { use } from "react";
import { PrintablesView } from "@/components/views/PrintablesView";

export default function PrintableDevotionalPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolvedParams = use(params);
  const dayNumber = parseInt(resolvedParams.day, 10) || 1;
  return <PrintablesView dayNumber={dayNumber} />;
}
