# 365 Days With Jesus — Master 365-Day Content Plan

> **Goal**: Complete, verified 365-day spiritual devotional content system for Christian women aged 35+.  
> **Source Scripture Standard**: World English Bible (WEB) — Public Domain Verified.  
> **Structure**: 12 Themes • 52 Weekly Subthemes • 365 Distinct Daily Liturgies.

---

## 1. Calendar Distribution & Day Number Matrix

The 365 days are mapped across the 12 calendar months with no gaps, no duplicates, and exact day-of-month alignment:

| Month | Theme Title | Calendar Range | Day Numbers | Total Days |
| :---: | :--- | :---: | :---: | :---: |
| **Month 1** | Walking in New Mercies | Jan 1 – Jan 31 | Days 1 – 31 | 31 days |
| **Month 2** | Rooted in Sacred Love | Feb 1 – Feb 28 | Days 32 – 59 | 28 days |
| **Month 3** | The Quiet of Surrender | Mar 1 – Mar 31 | Days 60 – 90 | 31 days |
| **Month 4** | Living the Resurrection | Apr 1 – Apr 30 | Days 91 – 120 | 30 days |
| **Month 5** | The Garden of the Spirit | May 1 – May 31 | Days 121 – 151 | 31 days |
| **Month 6** | Walking in Divine Wisdom | Jun 1 – Jun 30 | Days 152 – 181 | 30 days |
| **Month 7** | Refuge in the High Places | Jul 1 – Jul 31 | Days 182 – 212 | 31 days |
| **Month 8** | Rest for the Weary Heart | Aug 1 – Aug 31 | Days 213 – 243 | 31 days |
| **Month 9** | Clothed in Compassion | Sep 1 – Sep 30 | Days 244 – 273 | 30 days |
| **Month 10** | Courage in the Calling | Oct 1 – Oct 31 | Days 274 – 304 | 31 days |
| **Month 11** | An Altar of Thanksgiving | Nov 1 – Nov 30 | Days 305 – 334 | 30 days |
| **Month 12** | Emmanuel — God With Us | Dec 1 – Dec 31 | Days 335 – 365 | 31 days |
| **Total** | **12 Spiritual Themes** | **Full Year** | **Days 1 – 365** | **365 Days** |

---

## 2. Standard Daily Entry Specification

Every single entry out of the 365 days must fulfill this 11-point criteria with zero abbreviations:

```typescript
export interface DevotionalEntry {
  day_number: number;                 // Unique 1..365
  month_number: number;               // 1..12
  day_of_month: number;               // 1..31
  weekly_subtheme: string;            // Week title from MONTHLY-THEMES.md
  title: string;                      // Sacred, encouraging, non-generic title
  scripture_primary_reference: string;// Book Chapter:Verse(s)
  scripture_primary_text: string;     // Exact World English Bible (WEB) quote
  scripture_translation: string;      // "World English Bible (WEB)"
  reflection_body: string;            // Original pastoral reflection (150–250 words)
  reflection_questions: string[];     // Exactly 2-3 deep, heart-searching questions
  guided_prayer: string;              // Intimate, unhurried prayer (50–100 words)
  daily_intention: string;            // 1 memorable, grounding sentence
  practical_action: string;           // 1 actionable, tangible faith step
  evening_reflection_prompt: string;  // 1 calming evening question before rest
}
```

---

## 3. Production & Authoring Stages

To guarantee spiritual depth, rigorous Scripture checks, and high literary quality without generic AI cliches, content is authored in controlled monthly batches:

```mermaid
flowchart TD
    Audit[Stage 1: Content Audit & Baseline] --> M1[Stage 2: Month 1 Completion (Days 1–31)]
    M1 --> M2M3[Stage 3: Months 2 & 3 (Days 32–90)]
    M2M3 --> M4M6[Stage 4: Months 4 to 6 (Days 91–181)]
    M4M6 --> M7M9[Stage 5: Months 7 to 9 (Days 182–273)]
    M7M9 --> M10M12[Stage 6: Months 10 to 12 (Days 274–365)]
    M10M12 --> Validation[Stage 7: Automated 365-Day Validation Tests]
```

### Stage Schedule
* **Stage 1 (Current)**: Content Audit & Architecture Fix (Removes Day 1 fallback bug, establishes placeholder system).
* **Stage 2**: Month 1 Completion (Days 1–31, January — 100% complete).
* **Stage 3**: Quarter 1 Close (Months 2 & 3, Days 32–90).
* **Stage 4**: Quarter 2 (Months 4–6, Days 91–181).
* **Stage 5**: Quarter 3 (Months 7–9, Days 182–273).
* **Stage 6**: Quarter 4 (Months 10–12, Days 274–365).
* **Stage 7**: Full automated regression test run and publication sign-off.
