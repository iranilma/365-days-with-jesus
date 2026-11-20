# 365 Days With Jesus — Digital Sanctuary & Daily Planner

> **Tagline**: *"Start your day with faith. Live with gratitude. Walk with purpose."*  
> **Audience**: Christian women aged 35+ seeking a peaceful, unhurried, and consistent relationship with God.

---

## 🌸 Overview & Vision

**365 Days With Jesus** is a premium digital devotional and quiet-time planner engineered as a tranquil online sanctuary. It eliminates aggressive gamification, loud streak breaks, and digital clutter in favor of serene typography, calming botanical motifs, and a structured daily spiritual liturgy.

Both the **interactive responsive web application** and the **high-fidelity printable planner (US Letter & A4)** share the exact same structured devotional content engine.

---

## 🎨 Visual Identity ("Grace & Peace")

- **Warm Ivory (`#FAF6F0`)**: Canvas background, soft paper texture, card surfaces.
- **Soft Blush (`#F0D9D5`)**: Delicate highlight pills, active tab badges.
- **Dusty Rose (`#C98F8A`)**: Primary accent and quiet-time call-to-actions.
- **Warm Taupe (`#A89587`)**: Subtle borders, dividers, and secondary text.
- **Soft Sage (`#A8B09B`)**: Spiritual growth accents and answered prayer badges.
- **Deep Cocoa (`#55443F`)**: High-contrast, optical-grade readable text (WCAG AAA compliant at 7.8:1 contrast).

---

## 📱 Implemented Core Modules

1. **Home Sanctuary Dashboard (`/`)**:
   - Today's date, Day X of 365, Monthly Theme banner.
   - Hero Devotional Anchor card with primary Scripture quote and reflection excerpt.
   - Quick Gratitude form (3 morning blessings).
   - Prayer Wall snapshot with 1-click "Prayed Today" counter.
   - 7-Day gentle spiritual consistency tracker (grace-based, no guilt).

2. **Daily Devotional Engine (`/devotional/[day]`)**:
   - Primary Scripture spotlight using verified public-domain **World English Bible (WEB)** text.
   - Pastoral reflection body with scalable reading typography (`A`, `A+`, `A++`).
   - Heart reflection questions with an in-page auto-saving private journal.
   - Guided quiet-time prayer.
   - Daily walk intention banner and practical faith action.
   - Evening benediction & reflection prompt.
   - Verse bookmarking, copying, and one-click quiet-time completion.

3. **Dual-Format Printable Planner (`/printables/[day]`)**:
   - 1-click toggle between **US Letter (8.5" × 11")** and **ISO A4 (210 × 297 mm)**.
   - Ruled lines for handwritten notes in binders or quiet-time clipboards.
   - Direct `@media print` styling for crisp, margin-calibrated home printing.

4. **365-Day Calendar (`/calendar`)**:
   - Structured around the **12 Monthly Spiritual Themes**:
     - *Month 1: Walking in New Mercies*
     - *Month 2: Rooted in Sacred Love*
     - *Month 3: The Quiet of Surrender*
     - *Month 4: Living the Resurrection*
     - *Month 5: The Garden of the Spirit*
     - *Month 6: Walking in Divine Wisdom*
     - *Month 7: Refuge in the High Places*
     - *Month 8: Rest for the Weary Heart*
     - *Month 9: Clothed in Compassion*
     - *Month 10: Courage in the Calling*
     - *Month 11: An Altar of Thanksgiving*
     - *Month 12: Emmanuel — God With Us*
   - Interactive day grid jumping directly into each day's entry.

5. **Prayer Wall & Journal (`/prayer`)**:
   - Categorized requests (Personal, Family, Health, Church, Friends, Work, World).
   - "Prayed Today" tap increment counter.
   - "God answered this prayer!" celebration workflow that captures Praise Reports into an answered prayer archive.

6. **Gratitude Journal & Timeline (`/gratitude`)**:
   - Daily 3 morning blessings prompt.
   - Evening moment of peace recording.
   - Chronological timeline of holy remembrance.

7. **Personal Spiritual Journal (`/journal`)**:
   - Freeform spiritual journaling with search by keyword or date.
   - Star / favorite entries.
   - Local device storage with Supabase-ready schema.

8. **Onboarding & Covenant of Grace (`/onboarding/welcome`)**:
   - 3-step gentle setup selecting spiritual quiet-time rhythm (Morning Dawn, Midday Sabbath Pause, Evening Lamplight).
   - Scripture translation verification.
   - Covenant of grace declaration.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router, Server Components & Dynamic Routes)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage & Backend**: Supabase (PostgreSQL 16 with Row-Level Security) + Client-Side Resilient Local Sync
- **Print Engine**: High-fidelity CSS Paged Media `@media print` for US Letter & A4

---

## 🚀 Running Locally

```bash
cd 365-days-with-jesus
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Standalone Single-File Distribution

For offline use, personal quiet time on a laptop without Node.js installed, or archiving:
- Open `365_Days_With_Jesus.html` directly in any web browser (Chrome, Safari, Edge, Firefox).
- Contains all 31 complete January entries, full 12-month calendar and themes, daily liturgical questions, prayers, intentions, and printable planner sheets.

---

## 🧪 Testing & Synchronisation

```bash
# Run comprehensive January validation (authoritative content, schema, HTML parity)
npm run test:january

# Run content & monthly themes suite
npm run test:content

# Synchronise standalone HTML from authoritative TypeScript registry (devotionals.ts)
npm run sync:html
```
