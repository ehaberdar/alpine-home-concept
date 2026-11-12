/* =========================================================================
   Alpine Home Concept · EXCHANGE RATES
   -------------------------------------------------------------------------
   Euro reference rates of the European Central Bank (1 EUR = x).
   Updated automatically every weekday by .github/workflows/update-rates.yml
   (scripts/update_rates.py). No visitor data leaves the site: the browser
   reads this file, it never calls a rates API itself.
   ========================================================================= */
window.AHC_RATES = {
  "source": "ECB",
  "date": "2026-11-12",
  "rates": {
    "EUR": 1,
    "USD": 1.1081,
    "CHF": 0.9232
  }
};
