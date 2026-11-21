import { use } from "react";
import { DevotionalView } from "@/components/views/DevotionalView";

export default function EnglishDevotionalDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolved = use(params);
  const dayNumber = Math.max(1, Math.min(365, parseInt(resolved.day, 10) || 1));
  return <DevotionalView edition="en" dayNumber={dayNumber} />;
}
