"""Pull prices from the shared Google Sheet and write data/prices.js.

Run by .github/workflows/update-prices.yml. Standard library only.

The sheet has one row per variant. Columns the script reads:
  product_id   must match an id in data/products.js (do not edit)
  variant_no   1, 2, 3 ... in the order of the variants (do not edit)
  price_chf    the price in CHF. Leave empty = "price on request"
  price_usd    optional fixed USD price (otherwise converted from CHF)
  price_eur    optional fixed EUR price (otherwise converted from CHF)
Any other column (product, variant, dims ...) is only there to help Cihan read it.

Safety rules: if anything looks wrong the script stops WITHOUT changing the site,
and the error message says which row to fix. The site keeps the last good prices.
"""
import csv
import io
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS = os.path.join(ROOT, "data", "products.js")
OUT = os.path.join(ROOT, "data", "prices.js")
MIN_PRICE, MAX_PRICE = 1, 100000

HEADER = """/* ==========================================================================
   PRICES FROM THE GOOGLE SHEET - written automatically, do not edit by hand.
   Edit the prices in the sheet instead; a GitHub Action copies them here
   (see scripts/update_prices.py). Values override the prices in products.js.
   items[productId][variantIndex] = { chf, usd, eur }  (null = not set)
   ========================================================================== */
"""


def fail(msg):
    print("::error::" + msg)
    sys.exit(1)


def load_catalogue():
    """Return {product_id: number_of_variants} from data/products.js."""
    src = open(PRODUCTS, encoding="utf-8").read()
    m = re.search(r"window\.AHC_PRODUCTS\s*=\s*(\[.*\]);?\s*$", src, re.S)
    if not m:
        fail("Could not read data/products.js")
    return {p["id"]: len(p["variants"]) for p in json.loads(m.group(1))}


def parse_price(raw, where):
    """'1'250', '1,250', '1 250.50', 'CHF 365' -> int. Empty -> None."""
    s = (raw or "").strip()
    if not s:
        return None
    s = re.sub(r"(?i)chf|usd|eur|fr\.?|[$€\s'’]", "", s)
    if re.fullmatch(r"\d{1,3}(,\d{3})+(\.\d+)?", s):
        s = s.replace(",", "")          # 1,250 or 1,250.50
    else:
        s = s.replace(",", ".")         # 365,50
    try:
        value = float(s)
    except ValueError:
        fail(f"{where}: '{raw}' is not a number")
    if not MIN_PRICE <= value <= MAX_PRICE:
        fail(f"{where}: {raw} is outside {MIN_PRICE}-{MAX_PRICE}")
    return int(round(value))


def fetch_csv(sheet_id):
    """Download the first tab of the sheet as CSV. Tries the export link first,
    then the gviz link (both work for 'Anyone with the link: Viewer')."""
    base = f"https://docs.google.com/spreadsheets/d/{sheet_id}"
    errors = []
    for url in (base + "/export?format=csv", base + "/gviz/tq?tqx=out:csv&headers=1"):
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 ahc-prices-bot"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                body = r.read().decode("utf-8-sig")
                ctype = r.headers.get("Content-Type", "")
        except Exception as e:  # noqa: BLE001
            errors.append(f"{url.split(sheet_id)[1]}: {e}")
            continue
        if "csv" in ctype and not body.lstrip().startswith("<"):
            return body, None
        errors.append(f"{url.split(sheet_id)[1]}: not CSV ({ctype})")
    return None, "could not read the sheet (is it shared 'Anyone with the link: Viewer'?) " + "; ".join(errors)


def build(rows, catalogue, previous):
    items, seen = {}, set()
    for n, row in enumerate(rows, start=2):
        pid = (row.get("product_id") or "").strip()
        if not pid and not any((v or "").strip() for v in row.values()):
            continue  # blank line
        where = f"Row {n} ({pid or 'no id'})"
        if pid not in catalogue:
            fail(f"{where}: unknown product_id '{pid}'")
        try:
            vno = int((row.get("variant_no") or "").strip())
        except ValueError:
            fail(f"{where}: variant_no must be 1, 2, 3 ...")
        if not 1 <= vno <= catalogue[pid]:
            fail(f"{where}: variant_no {vno} does not exist (product has {catalogue[pid]})")
        if (pid, vno) in seen:
            fail(f"{where}: variant {vno} appears twice")
        seen.add((pid, vno))
        entry = {
            "chf": parse_price(row.get("price_chf"), where + " price_chf"),
            "usd": parse_price(row.get("price_usd"), where + " price_usd"),
            "eur": parse_price(row.get("price_eur"), where + " price_eur"),
        }
        lst = items.setdefault(pid, [None] * catalogue[pid])
        lst[vno - 1] = entry

    # Guard against an accidentally emptied column: if most prices that existed
    # before are now blank, refuse to publish.
    before = sum(1 for v in previous.values() for e in v if e and e.get("chf"))
    after = sum(1 for v in items.values() for e in v if e and e.get("chf"))
    if before >= 10 and after < before * 0.5:
        fail(f"Only {after} prices left (was {before}). Was a column cleared? Nothing published.")
    if not seen:
        fail("The sheet has no rows")
    return items


def read_previous():
    if not os.path.exists(OUT):
        return {}
    m = re.search(r"window\.AHC_PRICES\s*=\s*(\{.*\});?\s*$", open(OUT, encoding="utf-8").read(), re.S)
    return json.loads(m.group(1)).get("items", {}) if m else {}


def main():
    sheet_id = os.environ.get("PRICE_SHEET_ID", "").strip()
    if not re.fullmatch(r"[A-Za-z0-9_-]{20,}", sheet_id):
        fail("PRICE_SHEET_ID is missing or malformed")
    body, err = fetch_csv(sheet_id)
    if err:
        # Not a data error: warn and keep the current prices (no failing every hour).
        print(f"::warning::Prices not updated: {err}")
        return
    reader = csv.DictReader(io.StringIO(body))
    need = {"product_id", "variant_no", "price_chf", "price_usd", "price_eur"}
    missing = need - set(reader.fieldnames or [])
    if missing:
        fail("Sheet header is missing: " + ", ".join(sorted(missing)))

    previous = read_previous()
    items = build(list(reader), load_catalogue(), previous)
    if items == previous:
        print("No price change")
        return
    data = {"source": "sheet",
            "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            "items": items}
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(HEADER + "window.AHC_PRICES = " + json.dumps(data, ensure_ascii=False) + ";\n")
    print(f"Wrote {sum(len(v) for v in items.values())} variant prices")


if __name__ == "__main__":
    main()
