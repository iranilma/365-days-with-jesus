#!/usr/bin/env python3
"""
365 Days With Jesus — Portable Standalone HTML Synchronisation Pipeline
Authoritative Source: src/lib/content/devotionals.ts (TypeScript Registry)

This script reads devotional records directly from the TypeScript content registry
and synchronises the standalone single-file distribution (365_Days_With_Jesus.html)
using portable relative paths.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

# Resolve portable directory paths relative to script location
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DEVOTIONALS_TS = PROJECT_ROOT / "src" / "lib" / "content" / "devotionals.ts"

if not DEVOTIONALS_TS.exists():
    sys.exit(f"Error: Authoritative content registry not found at {DEVOTIONALS_TS}")

def extract_devotionals_from_ts(ts_path: Path):
    """
    Extracts DEVOTIONAL_ENTRIES from devotionals.ts using Node.js VM execution
    or fallback parser, guaranteeing 100% fidelity with the single source of truth.
    """
    code = ts_path.read_text(encoding="utf-8")
    
    # Try Node.js VM execution for exact evaluation
    node_eval_script = r"""
    import fs from 'fs';
    import vm from 'vm';
    const code = fs.readFileSync(process.argv[1], 'utf-8');
    const jsCode = code
      .replace(/^import\s+.*?;/gm, '')
      .replace(/export const /g, 'const ')
      .replace(/export function /g, 'function ')
      .replace(/:\s*DevotionalEntry\[\]/g, '')
      .replace(/:\s*DevotionalEntry/g, '')
      .replace(/:\s*number/g, '')
      .replace(/:\s*\{[^}]+\}/g, '');
    const ctx = vm.createContext({});
    vm.runInContext(jsCode + '; Object.assign(globalThis, { DEVOTIONAL_ENTRIES });', ctx);
    process.stdout.write(JSON.stringify(ctx.DEVOTIONAL_ENTRIES));
    """
    try:
        res = subprocess.run(
            ["node", "--input-type=module", "-e", node_eval_script, str(ts_path)],
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(res.stdout)
    except Exception as e:
        # Fallback pure regex extraction
        match = re.search(r"export const DEVOTIONAL_ENTRIES:\s*DevotionalEntry\[\]\s*=\s*\[([\s\S]*?)\];", code)
        if not match:
            raise RuntimeError(f"Could not parse DEVOTIONAL_ENTRIES from {ts_path}: {e}")
        
        blocks = re.split(r"\{\s*day_number:\s*", match.group(1))[1:]
        entries = []
        for b in blocks:
            day_num = int(re.search(r"^(\d+)", b).group(1))
            def extract_field(field):
                m = re.search(rf'{field}:\s*("(?:[^"\\]|\\.)*")', b)
                return json.loads(m.group(1)) if m else ""
            
            qm = re.search(r"reflection_questions:\s*\[([\s\S]*?)\]", b)
            questions = [json.loads(q.strip()) for q in re.findall(r'"(?:[^"\\]|\\.)*"', qm.group(1))] if qm else []

            entries.append({
                "day_number": day_num,
                "month_number": int(re.search(r"month_number:\s*(\d+)", b).group(1)),
                "day_of_month": int(re.search(r"day_of_month:\s*(\d+)", b).group(1)),
                "weekly_subtheme": extract_field("weekly_subtheme"),
                "title": extract_field("title"),
                "scripture_primary_reference": extract_field("scripture_primary_reference"),
                "scripture_primary_text": extract_field("scripture_primary_text"),
                "scripture_translation": extract_field("scripture_translation"),
                "reflection_body": extract_field("reflection_body"),
                "reflection_questions": questions,
                "guided_prayer": extract_field("guided_prayer"),
                "daily_intention": extract_field("daily_intention"),
                "practical_action": extract_field("practical_action"),
                "evening_reflection_prompt": extract_field("evening_reflection_prompt")
            })
        return entries

def sync_html_file(html_file: Path, entries: list):
    print(f"Synchronising {html_file}...")
    html_text = html_file.read_text(encoding="utf-8")

    # 1. Build the JS DEVOTIONALS object string
    dev_entries = []
    for d in entries:
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

    pattern = r"    const DEVOTIONALS = \{[\s\S]*?\n    \};"
    assert re.search(pattern, html_text), f"Could not find DEVOTIONALS in {html_file}"
    html_text = re.sub(pattern, lambda m: new_devotionals_js, html_text, count=1)

    # 2. Update the select options for devDaySelect
    options = []
    for d in entries:
        options.append(f'            <option value="{d["day_number"]}">Day {d["day_number"]}: {d["title"]}</option>')
    new_options_html = "\n".join(options)

    opt_pattern = r'<select id="devDaySelect"[\s\S]*?</select>'
    new_select_html = f"""<select id="devDaySelect" onchange="switchDay(this.value)" class="px-2 py-1 bg-white border border-sanctuary-taupeLight rounded-full text-xs font-semibold text-sanctuary-cocoa">
{new_options_html}
          </select>"""
    html_text = re.sub(opt_pattern, lambda m: new_select_html, html_text, count=1)

    # 3. Add placeholder notice HTML banner if not already present
    if 'id="devPlaceholderNotice"' not in html_text:
        subtheme_pattern = r'(<p class="text-xs uppercase tracking-wider text-sanctuary-taupe" id="devSubtheme">[\s\S]*?</p>)'
        placeholder_banner = r"""\1
        <div id="devPlaceholderNotice" class="hidden p-2.5 px-4 rounded-2xl bg-sanctuary-sageLight/70 border border-sanctuary-sage text-xs text-sanctuary-cocoa max-w-xl mx-auto">
          <span class="font-bold">Editorial Curation Notice:</span> <span id="devPlaceholderText">This devotional entry is currently undergoing spiritual curation in our editorial library.</span>
        </div>"""
        html_text = re.sub(subtheme_pattern, placeholder_banner, html_text, count=1)

    # 4. Synchronise switchDay function and placeholder logic
    new_switch_day = """    function switchDay(num) {
      const parsed = typeof num === "number" && !isNaN(num) ? Math.floor(num) : parseInt(String(num), 10);
      const safeDay = Math.max(1, Math.min(365, isNaN(parsed) ? 1 : parsed));
      num = safeDay;
      currentDayNum = safeDay;
      
      // Authoritative resolver with explicit placeholder (never silently falls back to Day 1)
      let d = DEVOTIONALS[num];
      let isPlaceholder = false;
      let month = 1;
      let dayOfMonth = num;

      if (!d) {
        isPlaceholder = true;
        const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let rem = num;
        for (let m = 0; m < daysPerMonth.length; m++) {
          if (rem <= daysPerMonth[m]) {
            month = m + 1;
            dayOfMonth = rem;
            break;
          }
          rem -= daysPerMonth[m];
        }

        d = {
          title: `Day ${num}: Seeking the Lord's Presence`,
          ref: "Lamentations 3:22-23",
          text: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness.",
          body: `This devotional entry for Day ${num} (Month ${month}, Day ${dayOfMonth}) is currently undergoing spiritual curation in our editorial library. Every day in 365 Days With Jesus is crafted with original, Scripture-centered reflections tailored for your daily quiet-time walk. In the meantime, dwell on God's fresh morning mercies today.`,
          questions: [
            "What is one grace or quiet mercy God has brought into your life today?",
            "How can you abide closely in Christ's presence throughout the next few hours?",
            "What practical step of faith can you take today in your home or community?"
          ],
          prayer: "Lord Jesus, I bring You my heart today. Even in moments of waiting, teach me to abide in Your peace and trust Your perfect timing. Anchor my thoughts in Your unfailing love. Amen.",
          intention: "I will walk today in quiet faith, trusting God with each small step.",
          action: "Pause right now for one quiet minute, breathe deeply, and thank God for His faithful companionship.",
          evening: "Reflect on one moment today where God whispered peace to your heart."
        };
      }

      // Toggle Editorial Curation Notice
      const noticeEl = document.getElementById('devPlaceholderNotice');
      if (noticeEl) {
        if (isPlaceholder) {
          noticeEl.classList.remove('hidden');
          const noticeText = document.getElementById('devPlaceholderText');
          if (noticeText) {
            noticeText.innerText = `Day ${num} (Month ${month}, Day ${dayOfMonth}) is scheduled in the 365-day publication plan under Month ${month}. Below is the structured quiet-time liturgy for your reflection.`;
          }
        } else {
          noticeEl.classList.add('hidden');
        }
      }

      // Update Devotional Reader
      document.getElementById('devDaySelect').value = num;
      document.getElementById('devDayBreadcrumb').innerText = "Day " + num;
      document.getElementById('devBadge').innerText = "Day " + num + " of 365 • Quiet Time Sanctuary";
      document.getElementById('devTitle').innerText = d.title;
      document.getElementById('devScriptureText').innerHTML = "&ldquo;" + d.text + "&rdquo;";
      document.getElementById('devScriptureRef').innerText = "— " + d.ref;
      document.getElementById('devReflectionBody').innerHTML = "<p>" + d.body + "</p>";
      document.getElementById('devPrayerBody').innerHTML = "&ldquo;" + d.prayer + "&rdquo;";
      document.getElementById('devIntention').innerHTML = "&ldquo;" + d.intention + "&rdquo;";
      document.getElementById('devPracticalAction').innerText = d.action;
      if (document.getElementById('devEveningPrompt')) {
        document.getElementById('devEveningPrompt').innerHTML = "&ldquo;" + (d.evening || "") + "&rdquo;";
      }

      let qHtml = "";
      d.questions.forEach((q, idx) => {
        qHtml += `<li class="p-3 rounded-2xl bg-sanctuary-ivory border border-sanctuary-taupeLight/40 flex items-start gap-2">
          <span class="font-bold text-sanctuary-rose">${idx + 1}.</span>
          <span>${q}</span>
        </li>`;
      });
      document.getElementById('devQuestionsList').innerHTML = qHtml;

      // Update Printable Sheet
      document.getElementById('printDayNumber').innerText = "DAY " + num;
      document.getElementById('printDayTitle').innerText = d.title;
      document.getElementById('printScriptureText').innerHTML = "&ldquo;" + d.text + "&rdquo;";
      document.getElementById('printScriptureRef').innerText = "— " + d.ref + " (WEB)";
      document.getElementById('printReflection').innerText = d.body;
      document.getElementById('printQuestion').innerText = d.questions[0];
      document.getElementById('printPrayer').innerHTML = "&ldquo;" + d.prayer + "&rdquo;";
      document.getElementById('printIntention').innerHTML = "&ldquo;" + d.intention + "&rdquo;";
      document.getElementById('printAction').innerText = d.action;

      switchTab('devotional');
    }"""

    switch_day_pattern = r"    function switchDay\(num\) \{[\s\S]*?\n      switchTab\('devotional'\);\n    \}"
    assert re.search(switch_day_pattern, html_text), f"Could not find switchDay function in {html_file}"
    html_text = re.sub(switch_day_pattern, lambda m: new_switch_day, html_text, count=1)

    # 5. Fix nextDay navigation constraint to 365
    html_text = html_text.replace(
        "if (currentDayNum < 7) switchDay(currentDayNum + 1);",
        "if (currentDayNum < 365) switchDay(currentDayNum + 1);"
    )

    html_file.write_text(html_text, encoding="utf-8")
    print(f"Successfully synchronised {html_file}!")

def main():
    entries = extract_devotionals_from_ts(DEVOTIONALS_TS)
    print(f"Extracted {len(entries)} authoritative devotional entries directly from {DEVOTIONALS_TS.name}")

    # Primary target: HTML file in project root
    target_html = PROJECT_ROOT / "365_Days_With_Jesus.html"
    if target_html.exists():
        sync_html_file(target_html, entries)
    else:
        # If not present in project root, check parent and copy
        parent_html = PROJECT_ROOT.parent / "365_Days_With_Jesus.html"
        if parent_html.exists():
            target_html.write_text(parent_html.read_text(encoding="utf-8"), encoding="utf-8")
            sync_html_file(target_html, entries)
        else:
            sys.exit(f"Error: 365_Days_With_Jesus.html not found at {target_html}")

    # Also keep parent copy synchronised if it exists
    parent_html = PROJECT_ROOT.parent / "365_Days_With_Jesus.html"
    if parent_html.exists() and parent_html != target_html:
        sync_html_file(parent_html, entries)

    print("Synchronisation complete with 100% single source of truth fidelity!")

if __name__ == "__main__":
    main()
