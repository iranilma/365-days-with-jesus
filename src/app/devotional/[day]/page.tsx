import { use } from "react";
import { DevotionalView } from "@/components/views/DevotionalView";

export default function DevotionalDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolvedParams = use(params);
  const dayNumber = Math.max(1, Math.min(365, parseInt(resolvedParams.day, 10) || 1));
  return <DevotionalView dayNumber={dayNumber} edition="en" />;
}
