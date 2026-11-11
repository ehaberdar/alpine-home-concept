"""Fetch the ECB euro reference rates and write data/rates.js.

Run by .github/workflows/update-rates.yml every weekday. Standard library only.
Keeps the previous file if the download fails or the data looks wrong.
"""
import json, sys, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path

URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
WANTED = ("USD", "CHF")
OUT = Path(__file__).resolve().parent.parent / "data" / "rates.js"
HEADER = OUT.read_text(encoding="utf-8").split("window.AHC_RATES")[0]

def main():
    with urllib.request.urlopen(URL, timeout=30) as r:
        tree = ET.fromstring(r.read())
    ns = {"e": "http://www.ecb.int/vocabulary/2002-08-01/eurofxref"}
    day = tree.find(".//e:Cube[@time]", ns)
    rates = {c.get("currency"): float(c.get("rate")) for c in day.findall("e:Cube", ns)}
    data = {"source": "ECB", "date": day.get("time"), "rates": {"EUR": 1}}
    for code in WANTED:
        value = rates.get(code)
        if not value or not (0.2 < value < 5):          # sanity check
            sys.exit(f"Unexpected rate for {code}: {value}")
        data["rates"][code] = value
    OUT.write_text(HEADER + "window.AHC_RATES = " + json.dumps(data, indent=2) + ";\n", encoding="utf-8")
    print("Rates", data["date"], data["rates"])

if __name__ == "__main__":
    main()
