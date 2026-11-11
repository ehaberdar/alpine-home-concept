# Alpine Home Concept · website

Static website for Alpine Home Concept (Belp, Switzerland): sculptural coffee tables,
dining tables and mirrors. English, German, French and Turkish; prices in USD, EUR and CHF. No framework, no build step,
no cookies, no tracking.

## Edit the site

| You want to… | Edit this file |
|---|---|
| change a price | the Google Sheet (see Prices below) |
| add or remove a product, texts, sizes | `data/products.js` |
| change a text (any language) | `assets/js/i18n.js` |
| change e-mail, Instagram, Etsy links, Impressum data, languages, currencies | `data/config.js` |
| change colours, fonts, spacing | top of `assets/css/main.css` (section 2, TOKENS) |
| change the page structure | the `.html` files (each section has a comment) |

**Add a product**
1. Copy one block in `data/products.js`, give it a new `id`.
2. Put its photos in `img/products/<id>/` named `1-800.webp`, `1-1600.webp`, `2-800.webp` …
   (800 px and 1600 px wide).
3. Done: it appears in the collection, its category and the search for "made to measure".

**Prices** are stored in CHF. `price: null` shows "price on request" with a request button
instead of "Buy". Current prices are DRAFTS converted from Etsy (GBP × 1.10).

## Structure

```
index.html          home (hero with contour lines, collection, featured, process, reviews)
collection.html     all products, filter by category (?cat=dining), sort by price
product.html        one product (?id=leman): gallery, finish, size, buy dialog
custom.html     made-to-measure request (opens the visitor's e-mail app)
atelier.html        about: Belp, İnegöl workshop, team
contact.html        contact details
legal.html          Impressum, privacy, terms of sale
404.html            not found
data/               products.js, config.js, rates.js (exchange rates, auto-updated)
scripts/            update_rates.py (ECB rates)
.github/workflows/  update-rates.yml (daily rates job)
assets/css/         main.css
assets/js/          app.js (site logic), i18n.js (texts), topo.js (hero contours),
                    boot.js (tiny, loads first: hides the English fallback texts for the
                    split second before a German / French / Turkish visitor's language is applied)
assets/fonts/       Archivo variable font, self-hosted (OFL licence)
img/                optimised WebP photos
```

## Prices (Google Sheet)

Prices are edited in the Google Sheet **"Alpine Home Concept – Fiyatlar / Preise"**
(Drive folder 20.AlpineHome). One row per variant:

| column | meaning |
|---|---|
| `product_id`, `variant_no` | do not change: they link the row to the product |
| `product`, `category`, `variant`, `dims` | for reading only |
| `price_chf` | the price. Empty = "price on request" |
| `price_usd`, `price_eur` | optional fixed prices; empty = converted from CHF |

Every hour the **Update prices** Action (`.github/workflows/update-prices.yml`,
`scripts/update_prices.py`) downloads the sheet, checks it and writes `data/prices.js`.
To publish at once: GitHub → Actions → Update prices → Run workflow. The site shows the change
about a minute later.

Checks before anything is published: unknown product or variant numbers, text in a price
field, prices outside 1–100000, duplicate rows, or more than half the prices suddenly empty.
Any of these stops the run (red in the Actions tab, with the row number) and the site keeps
the last good prices. Writing `1'250`, `1,250` or `CHF 1250` is fine.

The sheet must be shared as *Anyone with the link: Viewer* so the Action can read it (prices
are public on the site anyway). Give Cihan editor access with his own Google account.
A row missing from the sheet falls back to the price in `products.js`.

## Currencies

Prices are stored once, in CHF. The site shows them in USD (default), EUR or CHF:

- **Conversion:** ECB euro reference rates in `data/rates.js`, rounded to the nearest 5.
- **Daily update:** `.github/workflows/update-rates.yml` runs `scripts/update_rates.py`
  every weekday at 17:07 UTC (after the ECB publishes) and commits the new rates.
  Visitors' browsers never call a rates service, so no visitor data leaves the site.
- **Automatic choice:** Swiss visitors see CHF, euro-area visitors EUR, everyone else USD.
  The visitor can switch; the choice is remembered. Turn off with `autoCurrency: false`.
- **Fixed prices:** to set a price yourself instead of converting, add to a variant
  `prices: { USD: 399, EUR: 379 }`.

## Payment

"Buy" opens a dialog with card, PayPal and TWINT. Online payment is not connected yet:
choosing a method explains that it is coming and offers Etsy or e-mail ordering.
Next step: a Stripe account (cards, TWINT and PayPal in one integration) with
Stripe Payment Links, which needs no server.

## Security and privacy

- Content-Security-Policy on every page: only this site's own scripts, styles, fonts, images.
  It also switches on Trusted Types, so the browser itself refuses any code that tries to
  write HTML from a text string (the usual route for script injection).
- All dynamic text is inserted with `textContent`; URL parameters are checked against known values;
  links from the data files are only rendered when they start with `https://`.
- External links use `rel="noopener noreferrer"`.
- No cookies, no analytics, no third-party requests (fonts are self-hosted, nLPD/GDPR friendly).
- Forms store nothing: they prepare an e-mail in the visitor's mail app.
- The two robots (rates, prices) can only write `data/rates.js` and `data/prices.js`, and both
  refuse values that look wrong (text instead of numbers, a jump of more than 10 % in a rate,
  half the prices suddenly empty).
- Limits of GitHub Pages: it cannot send security headers (no HSTS on a custom domain,
  no `X-Frame-Options`). Fine for a catalogue site. Before real online payment goes live,
  put the site behind Cloudflare (free) or move it to Cloudflare Pages / Netlify to add them.

## Tests

`tests/` holds the automatic checks; the **Check site** Action runs them after every change
(a red cross on a commit = something is broken, GitHub also sends an e-mail).

```
cd tests && npm install && npm test
```

- `audit.js`: every product complete, every photo present in both sizes, every text translated
  in the four languages, every link pointing to an existing page.
- `smoke.js`: opens every page without a browser and checks menus, languages, currencies,
  filters, gallery, the payment dialog, the form and the safety rules.

## Publish (GitHub Pages)

Settings → Pages → Deploy from a branch → `main` / root. The site is then live at
`https://<user>.github.io/<repo>/`.

### When the site moves to its own domain

1. GitHub → Settings → Pages → Custom domain, then the DNS records at the registrar
   (four A records to GitHub for the bare domain, a CNAME for `www`). Tick "Enforce HTTPS".
2. `404.html`: change `<base href="/alpine-home-concept/">` to `<base href="/">`.
3. `index.html`: replace the address in `og:image` with the new domain.
4. Then add for search engines: `robots.txt`, `sitemap.xml`, a canonical link per page and
   `hreflang` links using `?lang=de` / `?lang=fr` / `?lang=tr` (the pages already answer to them).

## Before going live (TODO)

- [ ] **Preview mode off.** Six pages carry `<meta name="robots" content="noindex">` with the
      comment "PREVIEW MODE" so Google does not list the unfinished site. Delete that line (and its
      comment) in `index.html`, `collection.html`, `product.html`, `custom.html`, `atelier.html`
      and `contact.html` on launch day. `npm test` prints a warning while it is still there.
- [ ] **Hosting.** GitHub Pages is fine for the preview, but GitHub does not allow Pages to host
      an online shop. For the live site use a host that allows business sites and lets us send
      security headers (Cloudflare Pages or Netlify, both free for this size, both deploy from
      this repository; or the Infomaniak hosting that comes with the domain). The price and
      exchange-rate jobs keep working unchanged because they only commit to the repository.
- [ ] **A mailbox that exists.** Every order and request on the site ends in an e-mail to the
      address in `data/config.js`. Create it first and send a test message.
- [ ] Final CHF prices (Cihan, in the Google Sheet)
- [ ] Real e-mail address and Instagram link (`data/config.js`). Until a real profile is set,
      the Instagram link is hidden automatically.
- [ ] Impressum: legal name, address, UID (`data/config.js`)
- [ ] Written permission from Bimobilia to use the catalogue photos
- [ ] Confirm materials: Belp C-leg (solid walnut or lacquered MDF), Arosa (solid beech or panel)
- [ ] Mirror sizes and prices
- [ ] Confirm customs/duties policy for Swiss customers
- [ ] Confirm the statements on the site: "delivered from Belp" (or shipped directly from the
      workshop?), "handmade" and "family workshop", reply times, 14-day returns,
      delivery in 3 to 15 working days, number of Etsy reviews. If the business is
      VAT-registered, add "VAT included" back to `price.note` in `assets/js/i18n.js`.
