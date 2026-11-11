"""Fetch the ECB euro reference rates and write data/rates.js.

Run by .github/workflows/update-rates.yml every weekday. Standard library only.
Keeps the previous file if the download fails or the data looks wrong.
"""
import json, re, sys, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path

URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
WANTED = ("USD", "CHF")
OUT = Path(__file__).resolve().parent.parent / "data" / "rates.js"
HEADER = OUT.read_text(encoding="utf-8").split("window.AHC_RATES")[0]

MAX_JUMP = 0.10

def previous():
    """Rates currently on the site, {} if the file cannot be read."""
    try:
        return json.loads(OUT.read_text(encoding="utf-8").split("window.AHC_RATES =")[1].rstrip().rstrip(";"))["rates"]
    except Exception:  # noqa: BLE001
        return {}

def main():
    with urllib.request.urlopen(URL, timeout=30) as r:
        tree = ET.fromstring(r.read())
    ns = {"e": "http://www.ecb.int/vocabulary/2002-08-01/eurofxref"}
    day = tree.find(".//e:Cube[@time]", ns)
    rates = {c.get("currency"): float(c.get("rate")) for c in day.findall("e:Cube", ns)}
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", day.get("time") or ""):
        sys.exit(f"Unexpected date: {day.get('time')}")
    data = {"source": "ECB", "date": day.get("time"), "rates": {"EUR": 1}}
    for code in WANTED:
        value = rates.get(code)
        if not value or not (0.2 < value < 5):          # sanity check
            sys.exit(f"Unexpected rate for {code}: {value}")
        old = previous().get(code)
        if old and abs(value / old - 1) > MAX_JUMP:      # a real one-day move is far smaller
            sys.exit(f"{code} moved from {old} to {value}: more than {MAX_JUMP:.0%}, not published. "
                     "If this is real, edit data/rates.js by hand once.")
        data["rates"][code] = value
    OUT.write_text(HEADER + "window.AHC_RATES = " + json.dumps(data, indent=2) + ";\n", encoding="utf-8")
    print("Rates", data["date"], data["rates"])

if __name__ == "__main__":
    main()
