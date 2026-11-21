#!/usr/bin/env python3
"""
365 Days With Jesus — Premium Printable Edition Prototype Engine
File: scripts/compile_printable_prototype.py

Compiles:
1. Cover
2. Welcome & Planner Guide
3. Month 1 Divider: Walking in New Mercies
4. Day 16 (Average length: 252 combined words, 1-page layout)
5. Day 300 (Short entry: 221 combined words, 1-page layout)
6. Day 1 (Longest entry: 296 combined words, 1-page layout)
7. Day 1 (Two-page heirloom spread layout: Reading on Left, Heart Journal on Right)

Generates:
- output/365_days_prototype_letter.pdf (US Letter: 8.5 x 11 in)
- output/365_days_prototype_a4.pdf (ISO A4: 210 x 297 mm)
- 150 DPI proof PNGs in proofs/prototype_us_letter/ and proofs/prototype_a4/
"""

import os
import sys
import json
import shutil
import tempfile
import subprocess
from pathlib import Path

try:
    import fitz # PyMuPDF
except ImportError:
    fitz = None

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

BASE_DIR = Path(__file__).resolve().parent.parent
ENTRIES_FILE = BASE_DIR / "scripts" / "prototype_entries.json"
THEMES_FILE = BASE_DIR / "scripts" / "prototype_themes.json"

with open(ENTRIES_FILE, "r", encoding="utf-8") as f:
    ENTRIES = {e["day_number"]: e for e in json.load(f)}

with open(THEMES_FILE, "r", encoding="utf-8") as f:
    THEMES = {t["month_number"]: t for t in json.load(f)}

MONTH_NAMES = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

def build_styles(format_type: str = "letter") -> str:
    is_letter = (format_type.lower() == "letter")
    page_size = "8.5in 11in" if is_letter else "210mm 297mm"
    padding = "0.5in 0.65in 0.45in 0.65in" if is_letter else "16mm 16mm 14mm 18mm"

    return f"""
    @charset "UTF-8";
    @page {{
        size: {page_size};
        margin: 0;
    }}
    *, *::before, *::after {{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }}
    html, body {{
        background: #FFFFFF;
        color: #55443F;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 9pt;
        line-height: 1.4;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }}
    
    .font-serif {{
        font-family: "Cormorant Garamond", "Playfair Display", "Georgia", "Times New Roman", serif;
    }}
    .font-sans {{
        font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }}

    .page-sheet {{
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        overflow: hidden;
        page-break-after: always;
        break-after: page;
        padding: {padding};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #FFFFFF;
        position: relative;
    }}

    /* Top Running Folio */
    .running-header {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.75pt solid #C98F8A;
        padding-bottom: 4pt;
        margin-bottom: 8pt;
    }}
    .running-header .kicker {{
        font-size: 7.5pt;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #A89587;
    }}
    .running-header .day-badge {{
        font-size: 8pt;
        font-weight: 700;
        color: #C98F8A;
        letter-spacing: 0.05em;
    }}

    /* Devotional Header Area */
    .devotional-headline {{
        margin-bottom: 6pt;
    }}
    .devotional-headline h2 {{
        font-size: 15pt;
        font-weight: 700;
        color: #55443F;
        line-height: 1.15;
        letter-spacing: -0.01em;
        margin-bottom: 2pt;
    }}
    .subtheme-pill {{
        display: inline-block;
        font-size: 7pt;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        padding: 1.5pt 5pt;
        background: #FAF6F0;
        border: 0.5pt solid #A89587;
        border-radius: 2pt;
        color: #55443F;
    }}

    /* Scripture Callout Block */
    .scripture-card {{
        background: #FAF6F0;
        border-left: 2.5pt solid #C98F8A;
        border-top: 0.5pt solid #EAE4DC;
        border-right: 0.5pt solid #EAE4DC;
        border-bottom: 0.5pt solid #EAE4DC;
        border-radius: 0 3pt 3pt 0;
        padding: 5pt 9pt;
        margin-bottom: 7pt;
    }}
    .scripture-card .quote {{
        font-size: 9.5pt;
        font-style: italic;
        line-height: 1.35;
        color: #55443F;
    }}
    .scripture-card .citation {{
        text-align: right;
        font-size: 7.5pt;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #C98F8A;
        margin-top: 2pt;
    }}

    /* Two-Column Grid for 1-Page Layout */
    .daily-grid {{
        display: grid;
        grid-template-columns: 1.08fr 0.92fr;
        gap: 12pt;
        flex: 1;
        overflow: hidden;
    }}
    .grid-col {{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }}

    /* Card Box Styles */
    .content-box {{
        border: 0.5pt solid #EAE4DC;
        border-radius: 3pt;
        padding: 6pt 8pt;
        margin-bottom: 6pt;
        background: #FFFFFF;
    }}
    .content-box.tint-blush {{
        background: rgba(240, 217, 213, 0.25);
        border-color: #F0D9D5;
    }}
    .content-box.tint-sage {{
        background: rgba(168, 176, 155, 0.15);
        border-color: #A8B09B;
    }}

    .box-title {{
        font-size: 7pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #A89587;
        margin-bottom: 4pt;
        border-bottom: 0.5pt solid rgba(168, 149, 135, 0.3);
        padding-bottom: 2pt;
        display: flex;
        align-items: center;
        gap: 4pt;
    }}
    .box-title.rose {{
        color: #C98F8A;
        border-color: rgba(201, 143, 138, 0.4);
    }}
    .box-title.sage {{
        color: #55443F;
        border-color: rgba(168, 176, 155, 0.4);
    }}

    /* Paragraphs and Text */
    .reflection-p {{
        font-size: 8.75pt;
        line-height: 1.38;
        color: #55443F;
        text-align: justify;
        margin-bottom: 4pt;
    }}
    .prayer-p {{
        font-size: 8.5pt;
        font-style: italic;
        line-height: 1.35;
        color: #55443F;
    }}

    /* Questions and Lists */
    .questions-list {{
        list-style: none;
        margin-bottom: 4pt;
    }}
    .questions-list li {{
        font-size: 8pt;
        line-height: 1.3;
        color: #55443F;
        margin-bottom: 3pt;
        display: flex;
        align-items: flex-start;
        gap: 3pt;
    }}
    .questions-list .num {{
        font-weight: 700;
        color: #C98F8A;
        flex-shrink: 0;
    }}

    /* Ruled Writing Lines (Calibrated for handwriting: ~7mm = ~19.8pt) */
    .ruled-line {{
        width: 100%;
        height: 19.8pt;
        border-bottom: 0.5pt solid #DCD6CD;
    }}
    .ruled-line-compact {{
        width: 100%;
        height: 17pt;
        border-bottom: 0.5pt solid #DCD6CD;
    }}

    /* Walking in Purpose */
    .purpose-entry {{
        font-size: 8pt;
        line-height: 1.3;
        margin-bottom: 3pt;
    }}
    .purpose-entry strong {{
        color: #C98F8A;
        font-weight: 700;
        font-size: 7.5pt;
        text-transform: uppercase;
    }}

    /* Evening Benediction */
    .evening-box {{
        border: 0.75pt dashed #C98F8A;
        border-radius: 3pt;
        padding: 5pt 7pt;
        background: #FAF6F0;
        margin-top: auto;
    }}
    .evening-box .label {{
        font-size: 6.8pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #C98F8A;
        margin-bottom: 2pt;
    }}
    .evening-box .text {{
        font-size: 8.2pt;
        font-style: italic;
        line-height: 1.3;
        color: #55443F;
    }}

    /* Running Bottom Footer */
    .page-footer {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 0.5pt solid #EAE4DC;
        padding-top: 3pt;
        margin-top: 6pt;
        font-size: 7pt;
        color: #A89587;
    }}
    .page-footer .motto {{
        font-style: italic;
        color: #A89587;
    }}

    /* COVER PAGE STYLES */
    .cover-container {{
        width: 100%;
        height: 100%;
        border: 1.5pt solid #C98F8A;
        padding: 6pt;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #FAF6F0;
    }}
    .cover-inner {{
        width: 100%;
        height: 100%;
        border: 0.75pt solid #A89587;
        padding: 35pt 25pt;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        background: #FFFFFF;
    }}
    .cover-emblem {{
        font-size: 26pt;
        color: #C98F8A;
        letter-spacing: 0.15em;
    }}
    .cover-title {{
        font-size: 32pt;
        font-weight: 700;
        color: #55443F;
        letter-spacing: 0.03em;
        line-height: 1.1;
        margin-bottom: 8pt;
    }}
    .cover-subtitle {{
        font-size: 11pt;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #A89587;
        margin-bottom: 15pt;
    }}
    .cover-rule {{
        width: 60pt;
        height: 1.5pt;
        background: #C98F8A;
        margin: 0 auto;
    }}

    /* MONTHLY DIVIDER STYLES */
    .divider-sheet {{
        background: #FAF6F0;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 35pt 25pt;
    }}
    .divider-inner {{
        width: 100%;
        max-width: 88%;
        border: 1pt solid #C98F8A;
        padding: 30pt 20pt;
        background: #FFFFFF;
        box-shadow: 0 4pt 12pt rgba(85, 68, 63, 0.05);
    }}
    .divider-number {{
        font-size: 9pt;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #C98F8A;
        margin-bottom: 6pt;
    }}
    .divider-title {{
        font-size: 24pt;
        font-weight: 700;
        color: #55443F;
        margin-bottom: 12pt;
    }}
    .divider-scripture {{
        font-size: 11pt;
        font-style: italic;
        line-height: 1.45;
        color: #55443F;
        margin-bottom: 6pt;
    }}
    .divider-ref {{
        font-size: 8.5pt;
        font-weight: 700;
        color: #C98F8A;
        margin-bottom: 16pt;
    }}
    .divider-focus {{
        font-size: 8.5pt;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #A89587;
        margin-bottom: 10pt;
        border-top: 0.5pt solid #EAE4DC;
        border-bottom: 0.5pt solid #EAE4DC;
        padding: 4pt 0;
    }}
    .divider-overview {{
        font-size: 9pt;
        line-height: 1.5;
        color: #55443F;
        text-align: justify;
        margin-bottom: 16pt;
    }}

    /* 2-PAGE SPREAD STYLES */
    .spread-left, .spread-right {{
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        overflow: hidden;
        page-break-after: always;
        break-after: page;
        padding: {padding};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #FFFFFF;
    }}
    .spread-left .reflection-large {{
        font-size: 10pt;
        line-height: 1.48;
        color: #55443F;
        text-align: justify;
        margin-bottom: 10pt;
    }}
    .spread-left .prayer-large {{
        font-size: 9.5pt;
        font-style: italic;
        line-height: 1.42;
        color: #55443F;
    }}
    """

def render_cover_page() -> str:
    return """
    <div class="page-sheet" style="padding: 0.4in; background: #FAF6F0;">
        <div class="cover-container">
            <div class="cover-inner">
                <div class="cover-emblem font-serif">✦ ✠ ✦</div>
                <div>
                    <h1 class="cover-title font-serif">365 DAYS WITH JESUS</h1>
                    <div class="cover-subtitle font-sans">A Daily Devotional & Guided Prayer Journey</div>
                    <div class="cover-rule"></div>
                </div>
                <div>
                    <p class="font-serif" style="font-size: 11pt; font-style: italic; color: #55443F; margin-bottom: 8pt;">
                        "Start your day with faith. Live with gratitude. Walk with purpose."
                    </p>
                    <p class="font-sans" style="font-size: 7.5pt; letter-spacing: 0.15em; text-transform: uppercase; color: #A89587;">
                        World English Bible (WEB) Translation • Premium Printable Edition
                    </p>
                </div>
            </div>
        </div>
    </div>
    """

def render_welcome_page() -> str:
    return """
    <div class="page-sheet">
        <div>
            <div class="running-header">
                <span class="kicker">Introduction & User Guide</span>
                <span class="day-badge">365 Days With Jesus</span>
            </div>
            
            <div class="devotional-headline" style="text-align: center; margin-bottom: 16pt;">
                <h2 class="font-serif" style="font-size: 20pt;">How to Use This Devotional Planner</h2>
                <span class="subtheme-pill">A Sacred Rhythms of Grace Companion</span>
            </div>

            <div style="font-size: 9.5pt; line-height: 1.5; color: #55443F; margin-bottom: 16pt; text-align: justify;">
                <p style="margin-bottom: 8pt;">
                    Welcome to your sacred daily sanctuary. <em>365 Days With Jesus</em> is intentionally crafted to provide an unhurried, life-giving morning altar and peaceful evening rest. You are holding a functional, beautifully balanced workbook designed for both quiet reflection and active pen-to-paper journaling.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14pt; margin-bottom: 16pt;">
                <div class="content-box tint-blush" style="padding: 10pt;">
                    <div class="box-title rose font-sans">1. The Morning Rhythm</div>
                    <p style="font-size: 8.5pt; line-height: 1.4; color: #55443F; margin-bottom: 6pt;">
                        <strong>Scripture Anchor:</strong> Read the World English Bible passage aloud. Let the Word take root before the day's demands rush in.
                    </p>
                    <p style="font-size: 8.5pt; line-height: 1.4; color: #55443F; margin-bottom: 6pt;">
                        <strong>Morning Reflection:</strong> Enter Christ's character and promises through pastoral, Christocentric commentary.
                    </p>
                    <p style="font-size: 8.5pt; line-height: 1.4; color: #55443F;">
                        <strong>Guided Prayer:</strong> Pray the words of surrender and intimacy back to the Father.
                    </p>
                </div>

                <div class="content-box tint-sage" style="padding: 10pt;">
                    <div class="box-title sage font-sans">2. The Active Day & Evening Rest</div>
                    <p style="font-size: 8.5pt; line-height: 1.4; color: #55443F; margin-bottom: 6pt;">
                        <strong>Heart Reflections:</strong> Answer the three probing questions in your own handwriting on the ruled lines.
                    </p>
                    <p style="font-size: 8.5pt; line-height: 1.4; color: #55443F; margin-bottom: 6pt;">
                        <strong>Walking with Purpose:</strong> Anchor your thoughts with Today's Intention and put faith in motion with the Practical Action.
                    </p>
                    <p style="font-size: 8.5pt; line-height: 1.4; color: #55443F;">
                        <strong>Evening Reflection:</strong> Before sleep, complete the bedside prompt to release anxieties into God's hands.
                    </p>
                </div>
            </div>

            <div class="content-box" style="padding: 10pt; background: #FAF6F0; border: 0.75pt solid #C98F8A;">
                <div class="box-title rose font-sans" style="text-align: center; border: none; justify-content: center;">
                    The Annual Spiritual Journey
                </div>
                <p style="font-size: 8pt; line-height: 1.45; text-align: center; color: #55443F;">
                    Across the 12 months, you will walk through <strong>Walking in New Mercies</strong> (Jan), <strong>Rooted in Sacred Love</strong> (Feb), <strong>The Quiet of Surrender</strong> (Mar), <strong>Living the Resurrection</strong> (Apr), <strong>The Garden of the Spirit</strong> (May), <strong>Walking in Divine Wisdom</strong> (Jun), <strong>Refuge in the High Places</strong> (Jul), <strong>Rest for the Weary Heart</strong> (Aug), <strong>Clothed in Compassion</strong> (Sep), <strong>Courage in the Calling</strong> (Oct), <strong>An Altar of Thanksgiving</strong> (Nov), and <strong>Emmanuel — God With Us</strong> (Dec).
                </p>
            </div>
        </div>

        <div class="page-footer">
            <span>Guide & Orientation</span>
            <span class="motto font-serif">"Start your day with faith. Live with gratitude. Walk with purpose."</span>
            <span>Prelude</span>
        </div>
    </div>
    """

def render_month_divider(month_num: int = 1) -> str:
    m = THEMES[month_num]
    month_name = MONTH_NAMES[month_num]
    
    questions_html = """
    <div style="margin-top: 10pt; text-align: left;">
        <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; color: #C98F8A; margin-bottom: 4pt;">
            Monthly Contemplation Prompts:
        </div>
        <ol style="font-size: 8pt; line-height: 1.35; padding-left: 14pt; color: #55443F;">
            <li style="margin-bottom: 3pt;">What past regret or heavy memory is God asking you to surrender at the start of this year?</li>
            <li style="margin-bottom: 3pt;">How does the truth that God's mercies are "new every morning" free you from perfectionism?</li>
            <li>Where in your daily home or work life do you most need to experience Jesus as your steady portion?</li>
        </ol>
    </div>
    """

    return f"""
    <div class="page-sheet divider-sheet">
        <div class="divider-inner">
            <div class="divider-number font-sans">Month {month_num:02d} • {month_name}</div>
            <h2 class="divider-title font-serif">{m['theme_title']}</h2>
            
            <div class="divider-scripture font-serif">“{m['key_scripture_text']}”</div>
            <div class="divider-ref font-sans">— {m['key_scripture_reference']} (WEB)</div>

            <div class="divider-focus font-sans">Spiritual Focus: {m['spiritual_focus']}</div>

            <div class="divider-overview">
                {m['overview_description']}
            </div>

            {questions_html}
        </div>
        <div class="page-footer" style="width: 100%; max-width: 88%;">
            <span>Month {month_num}: {m['theme_title']}</span>
            <span class="motto font-serif">Section Opener</span>
            <span>Days 1–31</span>
        </div>
    </div>
    """

def render_daily_page_single(day_num: int, layout_badge: str = "") -> str:
    entry = ENTRIES[day_num]
    month_name = MONTH_NAMES[entry["month_number"]]
    
    # Format reflection paragraphs
    paragraphs = entry["reflection_body"].strip().split("\n\n")
    reflection_html = "".join([f'<p class="reflection-p">{p.strip()}</p>' for p in paragraphs if p.strip()])

    # Format 3 reflection questions
    questions_html = "".join([
        f'<li><span class="num">{idx+1}.</span> <span>{q}</span></li>'
        for idx, q in enumerate(entry["reflection_questions"])
    ])

    # Dynamic ruled lines count based on reflection length
    r_words = len(entry["reflection_body"].split())
    lines_count = 3 if r_words > 190 else (4 if r_words > 165 else 5)
    ruled_lines_html = "".join(['<div class="ruled-line-compact"></div>' for _ in range(lines_count)])

    badge_html = f'<span class="subtheme-pill" style="margin-left: 6pt; background: #C98F8A; color: white; border: none;">{layout_badge}</span>' if layout_badge else ""

    return f"""
    <div class="page-sheet">
        <div>
            <!-- Running Header -->
            <div class="running-header font-sans">
                <span class="kicker">Month {entry['month_number']}: {month_name} • {entry['weekly_subtheme']}</span>
                <span class="day-badge">Day {entry['day_number']} of 365</span>
            </div>

            <!-- Title & Weekly Subtheme -->
            <div class="devotional-headline">
                <h2 class="font-serif">{entry['title']}</h2>
                <span class="subtheme-pill">{entry['weekly_subtheme']}</span>
                {badge_html}
            </div>

            <!-- Scripture Callout Card -->
            <div class="scripture-card">
                <div class="quote font-serif">“{entry['scripture_primary_text']}”</div>
                <div class="citation font-sans">— {entry['scripture_primary_reference']} ({entry['scripture_translation']})</div>
            </div>

            <!-- Two-Column Editorial Grid -->
            <div class="daily-grid">
                <!-- Left Column: Morning Reflection & Guided Prayer -->
                <div class="grid-col">
                    <div class="content-box">
                        <div class="box-title font-sans">Morning Reflection</div>
                        <div class="font-serif">
                            {reflection_html}
                        </div>
                    </div>

                    <div class="content-box tint-blush">
                        <div class="box-title rose font-sans">Guided Prayer</div>
                        <p class="prayer-p font-serif">“{entry['guided_prayer']}”</p>
                    </div>
                </div>

                <!-- Right Column: Heart Reflections, Gratitude, Action, Evening -->
                <div class="grid-col">
                    <div class="content-box">
                        <div class="box-title font-sans">Heart Reflections & Notes</div>
                        <ul class="questions-list font-sans">
                            {questions_html}
                        </ul>
                        <div style="margin-top: 4pt;">
                            {ruled_lines_html}
                        </div>
                    </div>

                    <div class="content-box tint-sage">
                        <div class="box-title sage font-sans">Walking with Purpose</div>
                        <div class="purpose-entry font-sans">
                            <strong>Today's Intention:</strong> <em>“{entry['daily_intention']}”</em>
                        </div>
                        <div class="purpose-entry font-sans">
                            <strong>Practical Action:</strong> {entry['practical_action']}
                        </div>
                    </div>

                    <div class="evening-box">
                        <div class="label font-sans">Bedside Evening Examen</div>
                        <div class="text font-serif">“{entry['evening_reflection_prompt']}”</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Running Bottom Footer -->
        <div class="page-footer font-sans">
            <span>&copy; 365 Days With Jesus</span>
            <span class="motto font-serif">"Start your day with faith. Live with gratitude. Walk with purpose."</span>
            <span>Day {entry['day_number']}</span>
        </div>
    </div>
    """

def render_daily_page_spread(day_num: int) -> str:
    entry = ENTRIES[day_num]
    month_name = MONTH_NAMES[entry["month_number"]]

    paragraphs = entry["reflection_body"].strip().split("\n\n")
    reflection_html = "".join([f'<p class="reflection-large">{p.strip()}</p>' for p in paragraphs if p.strip()])

    # Left Page: The Word & Morning Devotional Reading
    left_page = f"""
    <div class="spread-left">
        <div>
            <div class="running-header font-sans">
                <span class="kicker">Month {entry['month_number']}: {month_name} • Reading</span>
                <span class="day-badge">Day {entry['day_number']} • Two-Page Spread (Page 1)</span>
            </div>

            <div class="devotional-headline" style="margin-bottom: 10pt;">
                <h2 class="font-serif" style="font-size: 18pt;">{entry['title']}</h2>
                <span class="subtheme-pill">{entry['weekly_subtheme']}</span>
                <span class="subtheme-pill" style="margin-left: 6pt; background: #55443F; color: white; border: none;">Heirloom Spread</span>
            </div>

            <div class="scripture-card" style="padding: 8pt 12pt; margin-bottom: 12pt;">
                <div class="quote font-serif" style="font-size: 11pt; line-height: 1.45;">“{entry['scripture_primary_text']}”</div>
                <div class="citation font-sans" style="font-size: 8.5pt;">— {entry['scripture_primary_reference']} ({entry['scripture_translation']})</div>
            </div>

            <div class="content-box" style="padding: 10pt; margin-bottom: 10pt;">
                <div class="box-title font-sans" style="font-size: 8pt; margin-bottom: 6pt;">Morning Devotional Contemplation</div>
                <div class="font-serif">
                    {reflection_html}
                </div>
            </div>

            <div class="content-box tint-blush" style="padding: 10pt; margin-bottom: 10pt;">
                <div class="box-title rose font-sans" style="font-size: 8pt; margin-bottom: 4pt;">Guided Altar Prayer</div>
                <p class="prayer-large font-serif">“{entry['guided_prayer']}”</p>
            </div>

            <div class="content-box tint-sage" style="padding: 8pt 10pt;">
                <div class="box-title sage font-sans" style="font-size: 7.5pt; margin-bottom: 4pt;">Walking with Purpose</div>
                <div class="purpose-entry font-sans" style="font-size: 8.5pt; margin-bottom: 4pt;">
                    <strong>Today's Intention:</strong> <em>“{entry['daily_intention']}”</em>
                </div>
                <div class="purpose-entry font-sans" style="font-size: 8.5pt;">
                    <strong>Practical Action:</strong> {entry['practical_action']}
                </div>
            </div>
        </div>

        <div class="page-footer font-sans">
            <span>Day {entry['day_number']} • The Word</span>
            <span class="motto font-serif">"Start your day with faith. Live with gratitude. Walk with purpose."</span>
            <span>Spread A</span>
        </div>
    </div>
    """

    # Right Page: The Heart's Response & Writing Sanctuary
    q1, q2, q3 = entry["reflection_questions"]
    right_page = f"""
    <div class="spread-right">
        <div>
            <div class="running-header font-sans">
                <span class="kicker">Day {entry['day_number']} • Personal Journal & Response</span>
                <span class="day-badge">The Heart's Sanctuary (Page 2)</span>
            </div>

            <div class="content-box" style="padding: 8pt 10pt; margin-bottom: 10pt;">
                <div class="box-title rose font-sans" style="font-size: 8pt; margin-bottom: 6pt;">Heart Examination Questions</div>
                
                <div style="margin-bottom: 8pt;">
                    <div style="font-size: 8.5pt; font-weight: 600; color: #55443F; margin-bottom: 2pt;">1. {q1}</div>
                    <div class="ruled-line"></div>
                    <div class="ruled-line"></div>
                </div>

                <div style="margin-bottom: 8pt;">
                    <div style="font-size: 8.5pt; font-weight: 600; color: #55443F; margin-bottom: 2pt;">2. {q2}</div>
                    <div class="ruled-line"></div>
                    <div class="ruled-line"></div>
                </div>

                <div style="margin-bottom: 4pt;">
                    <div style="font-size: 8.5pt; font-weight: 600; color: #55443F; margin-bottom: 2pt;">3. {q3}</div>
                    <div class="ruled-line"></div>
                    <div class="ruled-line"></div>
                </div>
            </div>

            <div class="content-box tint-sage" style="padding: 8pt 10pt; margin-bottom: 10pt;">
                <div class="box-title sage font-sans" style="font-size: 8pt; margin-bottom: 6pt;">Three Morning Graces (Gratitude Altar)</div>
                <div style="display: flex; align-items: center; gap: 6pt; margin-bottom: 4pt;">
                    <span style="font-weight: 700; color: #C98F8A; font-size: 9pt;">1.</span>
                    <div class="ruled-line" style="flex: 1;"></div>
                </div>
                <div style="display: flex; align-items: center; gap: 6pt; margin-bottom: 4pt;">
                    <span style="font-weight: 700; color: #C98F8A; font-size: 9pt;">2.</span>
                    <div class="ruled-line" style="flex: 1;"></div>
                </div>
                <div style="display: flex; align-items: center; gap: 6pt;">
                    <span style="font-weight: 700; color: #C98F8A; font-size: 9pt;">3.</span>
                    <div class="ruled-line" style="flex: 1;"></div>
                </div>
            </div>

            <div class="content-box" style="padding: 8pt 10pt; margin-bottom: 10pt;">
                <div class="box-title font-sans" style="font-size: 8pt; margin-bottom: 6pt;">My Prayer & Conversation with Jesus Today</div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
            </div>

            <div class="evening-box" style="padding: 8pt 10pt;">
                <div class="label font-sans" style="font-size: 7.5pt; margin-bottom: 3pt;">Bedside Evening Examen & Peace</div>
                <div class="text font-serif" style="font-size: 9pt; margin-bottom: 4pt;">“{entry['evening_reflection_prompt']}”</div>
                <div class="ruled-line" style="height: 18pt;"></div>
                <div class="ruled-line" style="height: 18pt;"></div>
            </div>
        </div>

        <div class="page-footer font-sans">
            <span>Day {entry['day_number']} • Journal Sanctuary</span>
            <span class="motto font-serif">"Start your day with faith. Live with gratitude. Walk with purpose."</span>
            <span>Spread B</span>
        </div>
    </div>
    """

    return left_page + right_page

def build_prototype_html(format_type: str = "letter") -> str:
    css = build_styles(format_type)
    pages = [
        render_cover_page(),
        render_welcome_page(),
        render_month_divider(1),
        render_daily_page_single(16, layout_badge="Average (1-Page)"),
        render_daily_page_single(300, layout_badge="Shortest (1-Page)"),
        render_daily_page_single(1, layout_badge="Longest (1-Page)"),
        render_daily_page_spread(1) # 2-page spread test of Day 1
    ]

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>365 Days With Jesus — Printable Prototype ({format_type.upper()})</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
{css}
    </style>
</head>
<body>
{"".join(pages)}
</body>
</html>
"""

def compile_pdf(html_path: Path, pdf_path: Path) -> bool:
    if not os.path.exists(CHROME_BIN):
        print(f"Error: Chrome binary not found at {CHROME_BIN}")
        return False

    temp_profile = tempfile.mkdtemp(prefix="chrome_pdf_proto_")
    pdf_path.parent.mkdir(parents=True, exist_ok=True)

    cmd = [
        CHROME_BIN,
        "--headless=new",
        f"--user-data-dir={temp_profile}",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--disable-extensions",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path.resolve()}",
        f"file://{html_path.resolve()}"
    ]

    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=60)
        success = pdf_path.exists() and pdf_path.stat().st_size > 0
        if not success:
            print("Chrome Error:", res.stderr)
        return success
    finally:
        shutil.rmtree(temp_profile, ignore_errors=True)

def inspect_and_render_proofs(pdf_path: Path, proofs_dir: Path, format_type: str):
    if not fitz:
        print("PyMuPDF not available.")
        return

    proofs_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(str(pdf_path))
    page_count = len(doc)
    print(f"\n========================================================")
    print(f"PyMuPDF QA Audit: {pdf_path.name}")
    print(f"Total Pages Generated: {page_count} (Expected: 8)")
    print(f"========================================================")

    is_letter = (format_type.lower() == "letter")
    exp_w, exp_h = (612.0, 792.0) if is_letter else (595.28, 841.89)

    matrix = fitz.Matrix(150.0 / 72.0, 150.0 / 72.0) # 150 DPI

    for idx, page in enumerate(doc):
        p_num = idx + 1
        rect = page.rect
        w, h = rect.width, rect.height
        text = page.get_text("text").strip()
        chars = len(text)

        dim_pass = (abs(w - exp_w) <= 1.0 and abs(h - exp_h) <= 1.0)
        status = "PASS" if dim_pass and chars > 30 else "WARN"

        print(f"  Page {p_num:02d}: {w:.1f}x{h:.1f} pt | Chars: {chars:4d} | Status: [{status}]")

        # Save proof image
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        proof_path = proofs_dir / f"page_{p_num:02d}.png"
        pix.save(str(proof_path))

    print(f"Successfully generated {page_count} proof images in {proofs_dir}")

def main():
    output_dir = BASE_DIR / "output"
    proofs_base = BASE_DIR / "proofs"
    temp_dir = BASE_DIR / "temp"
    output_dir.mkdir(parents=True, exist_ok=True)
    temp_dir.mkdir(parents=True, exist_ok=True)

    print(">>> 365 DAYS WITH JESUS: PROTOTYPE PDF GENERATION <<<")

    # 1. US Letter Edition
    print("\n[1/2] Generating US Letter Prototype (8.5 x 11 in)...")
    letter_html = temp_dir / "prototype_letter.html"
    letter_html.write_text(build_prototype_html("letter"), encoding="utf-8")
    letter_pdf = output_dir / "365_days_prototype_letter.pdf"

    if compile_pdf(letter_html, letter_pdf):
        print(f"Generated US Letter PDF: {letter_pdf} ({letter_pdf.stat().st_size:,} bytes)")
        inspect_and_render_proofs(letter_pdf, proofs_base / "prototype_us_letter", "letter")

    # 2. ISO A4 Edition
    print("\n[2/2] Generating ISO A4 Prototype (210 x 297 mm)...")
    a4_html = temp_dir / "prototype_a4.html"
    a4_html.write_text(build_prototype_html("a4"), encoding="utf-8")
    a4_pdf = output_dir / "365_days_prototype_a4.pdf"

    if compile_pdf(a4_html, a4_pdf):
        print(f"Generated ISO A4 PDF: {a4_pdf} ({a4_pdf.stat().st_size:,} bytes)")
        inspect_and_render_proofs(a4_pdf, proofs_base / "prototype_a4", "a4")

    print("\n>>> Prototype generation and visual proof rendering complete! <<<")

if __name__ == "__main__":
    main()
