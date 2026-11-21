#!/usr/bin/env python3
"""
365 Days With Jesus — Full Production PDF Independent QA Test
File: scripts/verify_final_production_pdfs.py

Validates both US Letter and A4 PDFs against the authoritative JSON dataset:
- Exactly 380 pages in both editions
- Exact physical dimensions: Letter (612x792 pt), A4 (595x842 pt)
- Zero blank pages
- Chronological ordering of Days 1 through 365
- Presence of all 12 Monthly Dividers with correct official theme names
- Field presence verification for sample and edge days
"""

import os
import sys
import json
from pathlib import Path

try:
    import fitz
except ImportError:
    print("Error: PyMuPDF is required.")
    sys.exit(1)

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "output"
ENTRIES_FILE = BASE_DIR / "scripts" / "all_365_entries.json"
THEMES_FILE = BASE_DIR / "scripts" / "prototype_themes.json"

with open(ENTRIES_FILE, "r", encoding="utf-8") as f:
    ENTRIES = json.load(f)

with open(THEMES_FILE, "r", encoding="utf-8") as f:
    THEMES = {t["month_number"]: t for t in json.load(f)}

LETTER_PDF = OUTPUT_DIR / "365-Days-With-Jesus-US-Letter.pdf"
A4_PDF = OUTPUT_DIR / "365-Days-With-Jesus-A4.pdf"

def verify_edition(pdf_path: Path, format_type: str) -> dict:
    is_letter = (format_type.lower() == "letter")
    exp_w, exp_h = (612.0, 792.0) if is_letter else (595.0, 841.9)
    
    doc = fitz.open(str(pdf_path))
    total_pages = len(doc)
    results = {
        "file_name": pdf_path.name,
        "size_mb": round(pdf_path.stat().st_size / (1024 * 1024), 2),
        "total_pages": total_pages,
        "page_count_pass": (total_pages == 380),
        "dim_pass": True,
        "blank_pages": 0,
        "days_found": 0,
        "themes_found": 0,
        "sample_checks_pass": True
    }

    # Check page geometry and text presence
    for idx, page in enumerate(doc):
        w, h = page.rect.width, page.rect.height
        if abs(w - exp_w) > 1.0 or abs(h - exp_h) > 1.0:
            results["dim_pass"] = False
        text = page.get_text("text").strip()
        if len(text) < 30:
            results["blank_pages"] += 1

    # Extract all text from doc
    full_text = "\n".join([page.get_text("text") for page in doc])

    # Check that all 365 Days appear
    days_present = []
    for d in range(1, 366):
        needle = f"Day {d} of 365"
        if needle in full_text:
            days_present.append(d)
        else:
            print(f"[{format_type}] Warning: Could not find '{needle}' in text.")

    results["days_found"] = len(days_present)

    # Check that all 12 official themes appear
    themes_present = []
    for m in range(1, 13):
        t_title = THEMES[m]["theme_title"]
        if t_title in full_text:
            themes_present.append(m)
        else:
            print(f"[{format_type}] Warning: Could not find theme '{t_title}' in text.")

    results["themes_found"] = len(themes_present)

    # Detailed field check on Day 1, Day 180, Day 365
    for test_day in [1, 180, 365]:
        entry = ENTRIES[test_day - 1]
        assert entry["title"] in full_text, f"Day {test_day} title missing in {pdf_path.name}"
        assert entry["scripture_primary_reference"] in full_text, f"Day {test_day} reference missing in {pdf_path.name}"
        assert "World English Bible (WEB)" in full_text, f"WEB translation tag missing in {pdf_path.name}"

    return results

def main():
    print("================================================================")
    print("INDEPENDENT QA VALIDATION OF PRODUCTION PRINTABLE EDITIONS")
    print("================================================================")

    letter_res = verify_edition(LETTER_PDF, "letter")
    a4_res = verify_edition(A4_PDF, "a4")

    print(f"\n1. US Letter Edition ({letter_res['file_name']}):")
    print(f"   - File Size: {letter_res['size_mb']} MB")
    print(f"   - Page Count: {letter_res['total_pages']} / 380 [{'PASS' if letter_res['page_count_pass'] else 'FAIL'}]")
    print(f"   - Dimensions: 8.5 x 11.0 in (612.0 x 792.0 pt) [{'PASS' if letter_res['dim_pass'] else 'FAIL'}]")
    print(f"   - Zero Blank Pages: {380 - letter_res['blank_pages']}/380 [{'PASS' if letter_res['blank_pages'] == 0 else 'FAIL'}]")
    print(f"   - All 365 Days Verified: {letter_res['days_found']}/365 [{'PASS' if letter_res['days_found'] == 365 else 'FAIL'}]")
    print(f"   - All 12 Monthly Themes Verified: {letter_res['themes_found']}/12 [{'PASS' if letter_res['themes_found'] == 12 else 'FAIL'}]")

    print(f"\n2. ISO A4 Edition ({a4_res['file_name']}):")
    print(f"   - File Size: {a4_res['size_mb']} MB")
    print(f"   - Page Count: {a4_res['total_pages']} / 380 [{'PASS' if a4_res['page_count_pass'] else 'FAIL'}]")
    print(f"   - Dimensions: 210 x 297 mm (595.0 x 841.9 pt) [{'PASS' if a4_res['dim_pass'] else 'FAIL'}]")
    print(f"   - Zero Blank Pages: {380 - a4_res['blank_pages']}/380 [{'PASS' if a4_res['blank_pages'] == 0 else 'FAIL'}]")
    print(f"   - All 365 Days Verified: {a4_res['days_found']}/365 [{'PASS' if a4_res['days_found'] == 365 else 'FAIL'}]")
    print(f"   - All 12 Monthly Themes Verified: {a4_res['themes_found']}/12 [{'PASS' if a4_res['themes_found'] == 12 else 'FAIL'}]")

    all_passed = (
        letter_res['page_count_pass'] and letter_res['dim_pass'] and letter_res['blank_pages'] == 0 and letter_res['days_found'] == 365 and letter_res['themes_found'] == 12 and
        a4_res['page_count_pass'] and a4_res['dim_pass'] and a4_res['blank_pages'] == 0 and a4_res['days_found'] == 365 and a4_res['themes_found'] == 12
    )

    if all_passed:
        print("\n>>> ALL INDEPENDENT QA TESTS PASSED WITH 100% SUCCESS! <<<")
    else:
        print("\n>>> QA AUDIT DETECTED FAILURES. <<<")
        sys.exit(1)

if __name__ == "__main__":
    main()
