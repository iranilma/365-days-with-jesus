import { use } from "react";
import { DevotionalView } from "@/components/views/DevotionalView";

export default function EnglishDevotionalDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolved = use(params);
  const dayNumber = parseInt(resolved.day, 10) || 1;
  return <DevotionalView edition="en" dayNumber={dayNumber} />;
}
