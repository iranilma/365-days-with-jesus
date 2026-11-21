import React from "react";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { SalesPageContent } from "@/components/sales/SalesPageContent";

export default function EnglishSalesPage() {
  const sampleEntry = getDevotionalEntry(1);
  return <SalesPageContent sampleEntry={sampleEntry} />;
}
