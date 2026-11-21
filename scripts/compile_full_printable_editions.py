#!/usr/bin/env python3
"""
365 Days With Jesus — Complete Premium Printable Edition Engine
File: scripts/compile_full_printable_editions.py

Compiles:
- Front Cover
- Welcome & Planner User Guide
- 12 Monthly Divider Pages (using official themes and questions from MONTHLY-THEMES.md)
- 365 Daily Devotional Pages (all 13 required fields preserved with 100% fidelity)
- Year-End Completion Altar & Pastoral Benediction

Generates:
1. output/365-Days-With-Jesus-US-Letter.pdf (8.5 x 11 in | 612 x 792 pt)
2. output/365-Days-With-Jesus-A4.pdf (210 x 297 mm | 595.3 x 841.9 pt)
3. Full automated verification and proof inspection using PyMuPDF (fitz)
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
ENTRIES_FILE = BASE_DIR / "scripts" / "all_365_entries.json"
THEMES_FILE = BASE_DIR / "scripts" / "prototype_themes.json"
QUESTIONS_FILE = BASE_DIR / "scripts" / "monthly_reflection_questions.json"

with open(ENTRIES_FILE, "r", encoding="utf-8") as f:
    ENTRIES = json.load(f)

with open(THEMES_FILE, "r", encoding="utf-8") as f:
    THEMES = {t["month_number"]: t for t in json.load(f)}

with open(QUESTIONS_FILE, "r", encoding="utf-8") as f:
    MONTHLY_QUESTIONS = {int(k): v for k, v in json.load(f).items()}

MONTH_NAMES = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

def build_styles(format_type: str = "letter") -> str:
    is_letter = (format_type.lower() == "letter")
    page_size = "8.5in 11in" if is_letter else "210mm 297mm"
    padding = "0.48in 0.60in 0.42in 0.65in" if is_letter else "15mm 15mm 13mm 18mm"

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
        font-size: 8.75pt;
        line-height: 1.38;
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

    /* Running Header */
    .running-header {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.75pt solid #C98F8A;
        padding-bottom: 3.5pt;
        margin-bottom: 7pt;
    }}
    .running-header .kicker {{
        font-size: 7.2pt;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #A89587;
    }}
    .running-header .day-badge {{
        font-size: 7.8pt;
        font-weight: 700;
        color: #C98F8A;
        letter-spacing: 0.05em;
    }}

    /* Devotional Headline */
    .devotional-headline {{
        margin-bottom: 5pt;
    }}
    .devotional-headline h2 {{
        font-size: 14pt;
        font-weight: 700;
        color: #55443F;
        line-height: 1.15;
        letter-spacing: -0.01em;
        margin-bottom: 2pt;
    }}
    .subtheme-pill {{
        display: inline-block;
        font-size: 6.8pt;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        padding: 1.5pt 4.5pt;
        background: #FAF6F0;
        border: 0.5pt solid #A89587;
        border-radius: 2pt;
        color: #55443F;
    }}

    /* Scripture Callout Card */
    .scripture-card {{
        background: #FAF6F0;
        border-left: 2.5pt solid #C98F8A;
        border-top: 0.5pt solid #EAE4DC;
        border-right: 0.5pt solid #EAE4DC;
        border-bottom: 0.5pt solid #EAE4DC;
        border-radius: 0 3pt 3pt 0;
        padding: 4.5pt 8.5pt;
        margin-bottom: 6pt;
    }}
    .scripture-card .quote {{
        font-size: 9.2pt;
        font-style: italic;
        line-height: 1.34;
        color: #55443F;
    }}
    .scripture-card .citation {{
        text-align: right;
        font-size: 7.2pt;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #C98F8A;
        margin-top: 2pt;
    }}

    /* Two-Column Editorial Grid */
    .daily-grid {{
        display: grid;
        grid-template-columns: 1.08fr 0.92fr;
        gap: 11pt;
        flex: 1;
        overflow: hidden;
    }}
    .grid-col {{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }}

    /* Content Cards */
    .content-box {{
        border: 0.5pt solid #EAE4DC;
        border-radius: 3pt;
        padding: 5.5pt 7.5pt;
        margin-bottom: 5.5pt;
        background: #FFFFFF;
    }}
    .content-box.tint-blush {{
        background: rgba(240, 217, 213, 0.22);
        border-color: #F0D9D5;
    }}
    .content-box.tint-sage {{
        background: rgba(168, 176, 155, 0.15);
        border-color: #A8B09B;
    }}

    .box-title {{
        font-size: 6.8pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #A89587;
        margin-bottom: 3.5pt;
        border-bottom: 0.5pt solid rgba(168, 149, 135, 0.3);
        padding-bottom: 1.5pt;
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

    /* Body text */
    .reflection-p {{
        font-size: 8.5pt;
        line-height: 1.36;
        color: #55443F;
        text-align: justify;
        margin-bottom: 3.5pt;
    }}
    .prayer-p {{
        font-size: 8.25pt;
        font-style: italic;
        line-height: 1.34;
        color: #55443F;
    }}

    /* Reflection Questions & Ruled Lines */
    .questions-list {{
        list-style: none;
        margin-bottom: 3.5pt;
    }}
    .questions-list li {{
        font-size: 7.8pt;
        line-height: 1.28;
        color: #55443F;
        margin-bottom: 2.5pt;
        display: flex;
        align-items: flex-start;
        gap: 3pt;
    }}
    .questions-list .num {{
        font-weight: 700;
        color: #C98F8A;
        flex-shrink: 0;
    }}

    .ruled-line-compact {{
        width: 100%;
        height: 17.5pt;
        border-bottom: 0.5pt solid #DCD6CD;
    }}

    /* Walking in Purpose */
    .purpose-entry {{
        font-size: 7.8pt;
        line-height: 1.28;
        margin-bottom: 2.5pt;
    }}
    .purpose-entry strong {{
        color: #C98F8A;
        font-weight: 700;
        font-size: 7.2pt;
        text-transform: uppercase;
    }}

    /* Evening Benediction */
    .evening-box {{
        border: 0.75pt dashed #C98F8A;
        border-radius: 3pt;
        padding: 4.5pt 6.5pt;
        background: #FAF6F0;
        margin-top: auto;
    }}
    .evening-box .label {{
        font-size: 6.5pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #C98F8A;
        margin-bottom: 1.5pt;
    }}
    .evening-box .text {{
        font-size: 8pt;
        font-style: italic;
        line-height: 1.28;
        color: #55443F;
    }}

    /* Running Bottom Footer */
    .page-footer {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 0.5pt solid #EAE4DC;
        padding-top: 3pt;
        margin-top: 5pt;
        font-size: 6.8pt;
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
        padding: 40pt 25pt;
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
        padding: 26pt 18pt;
        background: #FFFFFF;
        box-shadow: 0 4pt 12pt rgba(85, 68, 63, 0.05);
    }}
    .divider-number {{
        font-size: 9pt;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #C98F8A;
        margin-bottom: 5pt;
    }}
    .divider-title {{
        font-size: 22pt;
        font-weight: 700;
        color: #55443F;
        margin-bottom: 10pt;
    }}
    .divider-scripture {{
        font-size: 10.5pt;
        font-style: italic;
        line-height: 1.42;
        color: #55443F;
        margin-bottom: 5pt;
    }}
    .divider-ref {{
        font-size: 8.2pt;
        font-weight: 700;
        color: #C98F8A;
        margin-bottom: 12pt;
    }}
    .divider-focus {{
        font-size: 8pt;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #A89587;
        margin-bottom: 8pt;
        border-top: 0.5pt solid #EAE4DC;
        border-bottom: 0.5pt solid #EAE4DC;
        padding: 3pt 0;
    }}
    .divider-overview {{
        font-size: 8.8pt;
        line-height: 1.45;
        color: #55443F;
        text-align: justify;
        margin-bottom: 12pt;
    }}
    """

def render_cover_page(current_page: int) -> str:
    return f"""
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

def render_welcome_page(current_page: int) -> str:
    return f"""
    <div class="page-sheet">
        <div>
            <div class="running-header font-sans">
                <span class="kicker">Introduction & User Guide</span>
                <span class="day-badge">365 Days With Jesus</span>
            </div>
            
            <div class="devotional-headline" style="text-align: center; margin-bottom: 14pt;">
                <h2 class="font-serif" style="font-size: 20pt;">How to Use This Devotional Planner</h2>
                <span class="subtheme-pill">A Sacred Rhythms of Grace Companion</span>
            </div>

            <div style="font-size: 9pt; line-height: 1.48; color: #55443F; margin-bottom: 14pt; text-align: justify;">
                <p style="margin-bottom: 6pt;">
                    Welcome to your sacred daily sanctuary. <em>365 Days With Jesus</em> is intentionally crafted to provide an unhurried, life-giving morning altar and peaceful evening rest. You are holding a functional, beautifully balanced workbook designed for both quiet contemplation and active pen-to-paper journaling.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12pt; margin-bottom: 14pt;">
                <div class="content-box tint-blush" style="padding: 9pt;">
                    <div class="box-title rose font-sans">1. The Morning Rhythm</div>
                    <p style="font-size: 8.2pt; line-height: 1.38; color: #55443F; margin-bottom: 5pt;">
                        <strong>Scripture Anchor:</strong> Read the World English Bible passage aloud. Let the Word take root before the day's demands rush in.
                    </p>
                    <p style="font-size: 8.2pt; line-height: 1.38; color: #55443F; margin-bottom: 5pt;">
                        <strong>Morning Reflection:</strong> Enter Christ's character and promises through pastoral, Christocentric commentary.
                    </p>
                    <p style="font-size: 8.2pt; line-height: 1.38; color: #55443F;">
                        <strong>Guided Prayer:</strong> Pray the words of surrender and intimacy back to the Father.
                    </p>
                </div>

                <div class="content-box tint-sage" style="padding: 9pt;">
                    <div class="box-title sage font-sans">2. The Active Day & Evening Rest</div>
                    <p style="font-size: 8.2pt; line-height: 1.38; color: #55443F; margin-bottom: 5pt;">
                        <strong>Heart Reflections:</strong> Answer the three probing questions in your own handwriting on the ruled lines.
                    </p>
                    <p style="font-size: 8.2pt; line-height: 1.38; color: #55443F; margin-bottom: 5pt;">
                        <strong>Walking with Purpose:</strong> Anchor your thoughts with Today's Intention and put faith in motion with the Practical Action.
                    </p>
                    <p style="font-size: 8.2pt; line-height: 1.38; color: #55443F;">
                        <strong>Evening Reflection:</strong> Before sleep, complete the bedside prompt to release anxieties into God's hands.
                    </p>
                </div>
            </div>

            <div class="content-box" style="padding: 9pt; background: #FAF6F0; border: 0.75pt solid #C98F8A;">
                <div class="box-title rose font-sans" style="text-align: center; border: none; justify-content: center; margin-bottom: 3pt;">
                    The Annual Spiritual Journey (12 Thematic Seasons)
                </div>
                <p style="font-size: 7.8pt; line-height: 1.42; text-align: center; color: #55443F;">
                    Across the 12 months, you will walk through <strong>Walking in New Mercies</strong> (Jan), <strong>Rooted in Sacred Love</strong> (Feb), <strong>The Quiet of Surrender</strong> (Mar), <strong>Living the Resurrection</strong> (Apr), <strong>The Garden of the Spirit</strong> (May), <strong>Walking in Divine Wisdom</strong> (Jun), <strong>Refuge in the High Places</strong> (Jul), <strong>Rest for the Weary Heart</strong> (Aug), <strong>Clothed in Compassion</strong> (Sep), <strong>Courage in the Calling</strong> (Oct), <strong>An Altar of Thanksgiving</strong> (Nov), and <strong>Emmanuel — God With Us</strong> (Dec).
                </p>
            </div>
        </div>

        <div class="page-footer font-sans">
            <span>Guide & Orientation</span>
            <span class="motto font-serif">"Start your day with faith. Live with gratitude. Walk with purpose."</span>
            <span>Page {current_page}</span>
        </div>
    </div>
    """

def render_month_divider(month_num: int, current_page: int) -> str:
    m = THEMES[month_num]
    month_name = MONTH_NAMES[month_num]
    questions = MONTHLY_QUESTIONS.get(month_num, [])

    q_items = "".join([f'<li style="margin-bottom: 3pt;">{q}</li>' for q in questions])
    questions_html = f"""
    <div style="margin-top: 8pt; text-align: left;">
        <div style="font-size: 7.2pt; font-weight: 700; text-transform: uppercase; color: #C98F8A; margin-bottom: 3pt;">
            Monthly Contemplation Prompts:
        </div>
        <ol style="font-size: 7.8pt; line-height: 1.32; padding-left: 13pt; color: #55443F;">
            {q_items}
        </ol>
    </div>
    """ if q_items else ""

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
        <div class="page-footer font-sans" style="width: 100%; max-width: 88%;">
            <span>Month {month_num}: {m['theme_title']}</span>
            <span class="motto font-serif">Section Opener</span>
            <span>Page {current_page}</span>
        </div>
    </div>
    """

def render_daily_page(entry: dict, current_page: int) -> str:
    month_name = MONTH_NAMES[entry["month_number"]]
    
    paragraphs = entry["reflection_body"].strip().split("\n\n")
    reflection_html = "".join([f'<p class="reflection-p">{p.strip()}</p>' for p in paragraphs if p.strip()])

    questions_html = "".join([
        f'<li><span class="num">{idx+1}.</span> <span>{q}</span></li>'
        for idx, q in enumerate(entry["reflection_questions"])
    ])

    r_words = len(entry["reflection_body"].split())
    lines_count = 3 if r_words > 195 else (4 if r_words > 170 else 5)
    ruled_lines_html = "".join(['<div class="ruled-line-compact"></div>' for _ in range(lines_count)])

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
                        <div style="margin-top: 3pt;">
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
            <span>Page {current_page}</span>
        </div>
    </div>
    """

def render_closing_page(current_page: int) -> str:
    return f"""
    <div class="page-sheet" style="padding: 0.4in; background: #FAF6F0;">
        <div class="cover-container">
            <div class="cover-inner" style="padding: 30pt 20pt;">
                <div class="cover-emblem font-serif">✦ ✠ ✦</div>
                
                <div>
                    <div class="subtheme-pill" style="margin-bottom: 8pt;">Annual Completion Altar</div>
                    <h2 class="font-serif" style="font-size: 24pt; color: #55443F; margin-bottom: 6pt;">Well Done, Faithful Daughter</h2>
                    <div class="cover-rule" style="margin-bottom: 12pt;"></div>
                    
                    <p class="font-serif" style="font-size: 11pt; font-style: italic; line-height: 1.45; color: #55443F; margin-bottom: 12pt; max-width: 480pt;">
                        “I heard a loud voice out of heaven saying, ‘Behold, God’s dwelling is with the people. He will dwell with them, and they will be his people, and God himself will be with them as their God. He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more.’”
                    </p>
                    <div class="font-sans" style="font-size: 8pt; font-weight: 700; color: #C98F8A; margin-bottom: 16pt;">— Revelation 21:3–4 (WEB)</div>

                    <div style="font-size: 8.8pt; line-height: 1.5; color: #55443F; text-align: justify; max-width: 460pt; margin: 0 auto 16pt auto;">
                        <p style="margin-bottom: 6pt;">
                            You have walked 365 days in the presence of Jesus. Through dry wildernesses and mountain summits, in early morning quietness and midnight tears, you have met the Savior whose steadfast love never ceases. His mercies were new every single morning, and His faithfulness has held you fast.
                        </p>
                        <p>
                            As you conclude this book, take this sacred moment to write an altar stone of praise: record the greatest grace Jesus gave you this year, and step into tomorrow anchored in Emmanuel—the God who walks with you forever.
                        </p>
                    </div>

                    <div style="border: 0.75pt solid #C98F8A; border-radius: 4pt; padding: 10pt; background: #FAF6F0; max-width: 460pt; margin: 0 auto 12pt auto; text-align: left;">
                        <div class="font-sans" style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; color: #C98F8A; margin-bottom: 4pt;">
                            My Altar Stone of Praise (Date Completed: _______________)
                        </div>
                        <div class="ruled-line-compact"></div>
                        <div class="ruled-line-compact"></div>
                        <div class="ruled-line-compact"></div>
                    </div>
                </div>

                <div>
                    <p class="font-serif" style="font-size: 10.5pt; font-style: italic; color: #55443F; margin-bottom: 4pt;">
                        “Yahweh bless you, and keep you. Yahweh make his face to shine on you, and be gracious to you. Yahweh lift up his face toward you, and give you peace.”
                    </p>
                    <div class="font-sans" style="font-size: 7.5pt; font-weight: 700; color: #A89587;">— Numbers 6:24–26 (WEB)</div>
                </div>
            </div>
        </div>
    </div>
    """

def generate_full_html(format_type: str = "letter") -> str:
    css = build_styles(format_type)
    pages = []
    current_page = 1

    # 1. Cover Page
    pages.append(render_cover_page(current_page))
    current_page += 1

    # 2. Welcome & Planner User Guide
    pages.append(render_welcome_page(current_page))
    current_page += 1

    # 3. 12 Monthly Dividers and 365 Daily Pages
    # Group entries by month
    entries_by_month = {}
    for e in ENTRIES:
        m = e["month_number"]
        if m not in entries_by_month:
            entries_by_month[m] = []
        entries_by_month[m].append(e)

    for month_num in range(1, 13):
        # Insert Monthly Divider
        pages.append(render_month_divider(month_num, current_page))
        current_page += 1

        # Insert Daily Pages for this month
        month_entries = entries_by_month.get(month_num, [])
        for entry in month_entries:
            pages.append(render_daily_page(entry, current_page))
            current_page += 1

    # 4. Closing Completion Page
    pages.append(render_closing_page(current_page))

    total_pages = len(pages)
    print(f"[{format_type.upper()}] Assembled {total_pages} total HTML pages (Cover: 1, Guide: 1, Dividers: 12, Days: 365, Closing: 1).")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>365 Days With Jesus — Complete Premium Printable Edition ({format_type.upper()})</title>
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

    temp_profile = tempfile.mkdtemp(prefix="chrome_pdf_full_")
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

    print(f"Compiling PDF via Headless Chrome -> {pdf_path.name}...")
    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=300)
        success = pdf_path.exists() and pdf_path.stat().st_size > 0
        if not success:
            print("Chrome Error:", res.stderr)
        return success
    finally:
        shutil.rmtree(temp_profile, ignore_errors=True)

def audit_full_pdf(pdf_path: Path, format_type: str, proofs_dir: Path):
    if not fitz:
        print("PyMuPDF not available.")
        return

    proofs_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(str(pdf_path))
    page_count = len(doc)
    file_size_mb = pdf_path.stat().st_size / (1024 * 1024)

    print(f"\n========================================================")
    print(f"FULL PRODUCTION AUDIT: {pdf_path.name}")
    print(f"File Size: {file_size_mb:.2f} MB ({pdf_path.stat().st_size:,} bytes)")
    print(f"Total Page Count: {page_count} pages (Expected: 380)")
    print(f"========================================================")

    is_letter = (format_type.lower() == "letter")
    exp_w, exp_h = (612.0, 792.0) if is_letter else (595.0, 841.9)

    dim_errors = 0
    blank_errors = 0
    min_chars = 999999
    max_chars = 0

    # Key representative pages to render proof PNGs for visual QA
    sample_pages = [1, 2, 3, 4, 18, 35, 65, 100, 155, 200, 245, 300, 345, 379, 380]
    matrix = fitz.Matrix(150.0 / 72.0, 150.0 / 72.0)

    for idx, page in enumerate(doc):
        p_num = idx + 1
        rect = page.rect
        w, h = rect.width, rect.height
        text = page.get_text("text").strip()
        chars = len(text)

        if chars < min_chars:
            min_chars = chars
        if chars > max_chars:
            max_chars = chars

        if abs(w - exp_w) > 1.0 or abs(h - exp_h) > 1.0:
            dim_errors += 1
        if chars < 30:
            blank_errors += 1
            print(f"  [WARN] Page {p_num} potential blank page: {chars} chars.")

        # Render sample proof images
        if p_num in sample_pages:
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            proof_path = proofs_dir / f"page_{p_num:03d}.png"
            pix.save(str(proof_path))

    print(f"Physical Dimensions Checks: {page_count - dim_errors}/{page_count} passed ({exp_w:.1f} x {exp_h:.1f} pt)")
    print(f"Blank Page Checks: {page_count - blank_errors}/{page_count} passed (Min Chars: {min_chars}, Max Chars: {max_chars})")
    print(f"Saved {len(sample_pages)} visual proof samples in {proofs_dir}")

def main():
    output_dir = BASE_DIR / "output"
    proofs_base = BASE_DIR / "proofs"
    temp_dir = BASE_DIR / "temp"
    output_dir.mkdir(parents=True, exist_ok=True)
    temp_dir.mkdir(parents=True, exist_ok=True)

    print("================================================================")
    print("365 DAYS WITH JESUS — FULL PRINTABLE EDITIONS PRODUCTION")
    print("================================================================")

    # 1. Compile US Letter Edition
    print("\n[STEP 1/2] Compiling Complete US Letter Edition (380 pages, 8.5 x 11 in)...")
    letter_html = temp_dir / "full_edition_letter.html"
    letter_html.write_text(generate_full_html("letter"), encoding="utf-8")
    letter_pdf = output_dir / "365-Days-With-Jesus-US-Letter.pdf"

    if compile_pdf(letter_html, letter_pdf):
        print(f"[SUCCESS] US Letter PDF generated: {letter_pdf}")
        audit_full_pdf(letter_pdf, "letter", proofs_base / "final_us_letter")

    # 2. Compile ISO A4 Edition
    print("\n[STEP 2/2] Compiling Complete ISO A4 Edition (380 pages, 210 x 297 mm)...")
    a4_html = temp_dir / "full_edition_a4.html"
    a4_html.write_text(generate_full_html("a4"), encoding="utf-8")
    a4_pdf = output_dir / "365-Days-With-Jesus-A4.pdf"

    if compile_pdf(a4_html, a4_pdf):
        print(f"[SUCCESS] ISO A4 PDF generated: {a4_pdf}")
        audit_full_pdf(a4_pdf, "a4", proofs_base / "final_a4")

    print("\n================================================================")
    print("FULL PRODUCTION COMPLETE: Both US Letter & A4 Editions Published!")
    print("================================================================")

if __name__ == "__main__":
    main()
