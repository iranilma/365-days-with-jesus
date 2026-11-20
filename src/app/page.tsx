import React from "react";
import { getDevotionalEntry } from "@/lib/content/devotionals";
import { SalesPageContent } from "@/components/sales/SalesPageContent";

export default function SalesPage() {
  // Authoritative Day 1 Devotional Liturgy Entry for live product showcase
  const sampleEntry = getDevotionalEntry(1);

  return <SalesPageContent sampleEntry={sampleEntry} />;
}
