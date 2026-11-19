#!/usr/bin/env python3
"""
Syncs 365_Days_With_Jesus.html with all 31 authored days from build_january_entries.py
"""
import sys
import json
import re
from pathlib import Path

scripts_dir = Path(__file__).resolve().parent
sys.path.append(str(scripts_dir))
from build_january_entries import DAYS_DATA

html_path = Path("/Users/ACER/Downloads/Antigravity/365_Days_With_Jesus.html")
html_text = html_path.read_text(encoding="utf-8")

# 1. Build the JS DEVOTIONALS object string
dev_entries = []
for d in DAYS_DATA:
    entry = f"""      {d["day_number"]}: {{
        title: {json.dumps(d["title"])},
        ref: {json.dumps(d["scripture_primary_reference"])},
        text: {json.dumps(d["scripture_primary_text"])},
        body: {json.dumps(d["reflection_body"])},
        questions: {json.dumps(d["reflection_questions"], indent=10).strip()},
        prayer: {json.dumps(d["guided_prayer"])},
        intention: {json.dumps(d["daily_intention"])},
        action: {json.dumps(d["practical_action"])},
        evening: {json.dumps(d["evening_reflection_prompt"])},
        subtheme: {json.dumps(d["weekly_subtheme"])}
      }}"""
    dev_entries.append(entry)

new_devotionals_js = "    const DEVOTIONALS = {\n" + ",\n".join(dev_entries) + "\n    };"

# Replace const DEVOTIONALS = { ... };
pattern = r"    const DEVOTIONALS = \{[\s\S]*?\n    \};"
assert re.search(pattern, html_text), "Could not find DEVOTIONALS in HTML"
html_text = re.sub(pattern, lambda m: new_devotionals_js, html_text, count=1)

# 2. Update the select options for devDaySelect
options = []
for d in DAYS_DATA:
    options.append(f'            <option value="{d["day_number"]}">Day {d["day_number"]}: {d["title"]}</option>')
new_options_html = "\n".join(options)

opt_pattern = r'<select id="devDaySelect"[\s\S]*?</select>'
new_select_html = f"""<select id="devDaySelect" onchange="switchDay(this.value)" class="px-2 py-1 bg-white border border-sanctuary-taupeLight rounded-full text-xs font-semibold text-sanctuary-cocoa">
{new_options_html}
          </select>"""
html_text = re.sub(opt_pattern, lambda m: new_select_html, html_text, count=1)

# 3. Update the Dashboard 7-day strip to a full 31-day January grid
days_strip_boxes = []
for d in range(1, 32):
    days_strip_boxes.append(f"""          <div class="p-2 sm:p-2.5 rounded-2xl border text-center bg-white border-sanctuary-taupeLight/60 cursor-pointer hover:bg-sanctuary-ivory" onclick="switchDay({d})">
            <span class="text-[9px] uppercase tracking-wider text-sanctuary-taupe block">Day {d}</span>
            <span class="font-serif text-sm sm:text-base font-bold text-sanctuary-cocoa">{d}</span>
          </div>""")

new_grid_content = "\n".join(days_strip_boxes)
strip_pattern = r'<div class="grid grid-cols-7 gap-2">[\s\S]*?</div>\s*</div>\s*</div>\s*<!-- 2. DEVOTIONAL READER VIEW -->'
replacement_strip = f"""<div class="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-2">
{new_grid_content}
        </div>
      </div>
    </div>

    <!-- 2. DEVOTIONAL READER VIEW -->"""

html_text = re.sub(strip_pattern, lambda m: replacement_strip, html_text, count=1)

html_path.write_text(html_text, encoding="utf-8")
print(f"Successfully updated {html_path} with all 31 days!")
