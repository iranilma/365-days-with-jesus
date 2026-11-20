#!/usr/bin/env python3
"""
Exports DAYS_DATA from build_january_entries.py to src/lib/content/devotionals.ts
"""
import sys
import json
from pathlib import Path

# Add scripts directory to path
scripts_dir = Path(__file__).resolve().parent
sys.path.append(str(scripts_dir))

from build_january_entries import DAYS_DATA

code = '''import { DevotionalEntry } from "../types";

/**
 * 365 Days With Jesus — Authoritative Devotional Content Registry
 * Primary Standard: World English Bible (WEB) — Public Domain
 * Target Audience: Christian women aged 35+
 * Month 1 (January): Walking in New Mercies (Days 1–31 Complete)
 */
export const DEVOTIONAL_ENTRIES: DevotionalEntry[] = [
'''

for d in DAYS_DATA:
    code += '  {\n'
    code += f'    day_number: {d["day_number"]},\n'
    code += f'    month_number: {d["month_number"]},\n'
    code += f'    day_of_month: {d["day_of_month"]},\n'
    code += f'    weekly_subtheme: {json.dumps(d["weekly_subtheme"])},\n'
    code += f'    title: {json.dumps(d["title"])},\n'
    code += f'    scripture_primary_reference: {json.dumps(d["scripture_primary_reference"])},\n'
    code += f'    scripture_primary_text: {json.dumps(d["scripture_primary_text"])},\n'
    code += f'    scripture_translation: {json.dumps(d["scripture_translation"])},\n'
    code += f'    reflection_body: {json.dumps(d["reflection_body"])},\n'
    code += '    reflection_questions: [\n'
    for q in d['reflection_questions']:
        code += f'      {json.dumps(q)},\n'
    code += '    ],\n'
    code += f'    guided_prayer: {json.dumps(d["guided_prayer"])},\n'
    code += f'    daily_intention: {json.dumps(d["daily_intention"])},\n'
    code += f'    practical_action: {json.dumps(d["practical_action"])},\n'
    code += f'    evening_reflection_prompt: {json.dumps(d["evening_reflection_prompt"])},\n'
    code += '  },\n'

code += '''];

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Calculates month number (1..12) and day of month (1..31) from day number (1..365)
 */
export function getDayMonthMapping(dayNumber: number): { monthNumber: number; dayOfMonth: number } {
  let day = Math.max(1, Math.min(365, dayNumber));
  for (let m = 0; m < DAYS_PER_MONTH.length; m++) {
    if (day <= DAYS_PER_MONTH[m]) {
      return { monthNumber: m + 1, dayOfMonth: day };
    }
    day -= DAYS_PER_MONTH[m];
  }
  return { monthNumber: 12, dayOfMonth: 31 };
}

/**
 * Single Authoritative Resolver for Devotional Entries.
 * Guaranteed to return an entry for any day (1..365).
 * Never silently falls back to Day 1 when content is missing.
 * If the day has not yet been authored, returns a structured development placeholder.
 */
export function getDevotionalEntry(dayNumber: number): DevotionalEntry {
  const parsed = typeof dayNumber === "number" && !isNaN(dayNumber) ? Math.floor(dayNumber) : parseInt(String(dayNumber), 10);
  const safeDay = Math.max(1, Math.min(365, isNaN(parsed) ? 1 : parsed));
  const existing = DEVOTIONAL_ENTRIES.find((d) => d.day_number === safeDay);
  if (existing) {
    return existing;
  }

  const { monthNumber, dayOfMonth } = getDayMonthMapping(safeDay);

  return {
    day_number: safeDay,
    month_number: monthNumber,
    day_of_month: dayOfMonth,
    weekly_subtheme: `Month ${monthNumber} Spiritual Curation`,
    title: `Day ${safeDay}: Seeking the Lord's Presence`,
    scripture_primary_reference: "Lamentations 3:22-23",
    scripture_primary_text: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: `This devotional entry for Day ${safeDay} (Month ${monthNumber}, Day ${dayOfMonth}) is currently undergoing spiritual curation in our editorial library. Every day in 365 Days With Jesus is crafted with original, Scripture-centered reflections tailored for your daily quiet-time walk. In the meantime, dwell on God's fresh morning mercies today.`,
    reflection_questions: [
      `What is one grace or quiet mercy God has brought into your life today?`,
      `How can you abide closely in Christ's presence throughout the next few hours?`,
      `What practical step of faith can you take today in your home or community?`
    ],
    guided_prayer: "Lord Jesus, I bring You my heart today. Even in moments of waiting, teach me to abide in Your peace and trust Your perfect timing. Anchor my thoughts in Your unfailing love. Amen.",
    daily_intention: "I will walk today in quiet faith, trusting God with each small step.",
    practical_action: "Pause right now for one quiet minute, breathe deeply, and thank God for His faithful companionship.",
    evening_reflection_prompt: "Reflect on one moment today where God whispered peace to your heart.",
    is_placeholder: true,
  };
}

/**
 * Backwards-compatible alias for getDevotionalEntry
 */
export const getDevotionalByDay = getDevotionalEntry;
'''

output_path = scripts_dir.parent / "src" / "lib" / "content" / "devotionals.ts"
output_path.write_text(code, encoding="utf-8")
print(f"Successfully wrote {output_path} with all {len(DAYS_DATA)} days!")
