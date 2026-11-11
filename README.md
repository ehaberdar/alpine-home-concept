# Alpine Home Concept · website

Static website for Alpine Home Concept (Belp, Switzerland): sculptural coffee tables,
dining tables and mirrors. French, German and English. No framework, no build step,
no cookies, no tracking.

## Edit the site

| You want to… | Edit this file |
|---|---|
| change a price, add or remove a product | `data/products.js` |
| change a text (any language) | `assets/js/i18n.js` |
| change e-mail, Instagram, Etsy links, Impressum data | `data/config.js` |
| change colours, fonts, spacing | top of `assets/css/main.css` (section 2, TOKENS) |
| change the page structure | the `.html` files (each section has a comment) |

**Add a product**
1. Copy one block in `data/products.js`, give it a new `id`.
2. Put its photos in `img/products/<id>/` named `1-800.webp`, `1-1600.webp`, `2-800.webp` …
   (800 px and 1600 px wide).
3. Done: it appears in the collection, its category and the search for "made to measure".

**Prices** are in CHF. `price: null` shows "price on request" with a request button
instead of "Buy". Current prices are DRAFTS converted from Etsy (GBP × 1.10).

## Structure

```
index.html          home (hero with contour lines, collection, featured, process, reviews)
collection.html     all products, filter by category (?cat=dining), sort by price
product.html        one product (?id=leman): gallery, finish, size, buy dialog
sur-mesure.html     made-to-measure request (opens the visitor's e-mail app)
atelier.html        about: Belp, İnegöl workshop, team
contact.html        contact details
legal.html          Impressum, privacy, terms of sale
404.html            not found
data/               products.js, config.js
assets/css/         main.css
assets/js/          app.js (site logic), i18n.js (texts), topo.js (hero contours)
assets/fonts/       Archivo variable font, self-hosted (OFL licence)
img/                optimised WebP photos
```

## Payment

"Buy" opens a dialog with card, PayPal and TWINT. Online payment is not connected yet:
choosing a method explains that it is coming and offers Etsy or e-mail ordering.
Next step: a Stripe account (cards, TWINT and PayPal in one integration) with
Stripe Payment Links, which needs no server.

## Security and privacy

- Content-Security-Policy on every page: only this site's own scripts, styles, fonts, images.
- All dynamic text is inserted with `textContent`; URL parameters are checked against known values.
- External links use `rel="noopener noreferrer"`.
- No cookies, no analytics, no third-party requests (fonts are self-hosted, nLPD/GDPR friendly).
- Forms store nothing: they prepare an e-mail in the visitor's mail app.

## Publish (GitHub Pages)

Settings → Pages → Deploy from a branch → `main` / root. The site is then live at
`https://<user>.github.io/<repo>/`. A custom domain (e.g. alpinehomeconcept.ch) is added
in the same screen plus a CNAME record at the domain registrar.

## Before going live (TODO)

- [ ] Final CHF prices (Cihan)
- [ ] Real e-mail address and Instagram link (`data/config.js`)
- [ ] Impressum: legal name, address, UID (`data/config.js`)
- [ ] Written permission from Bimobilia to use the catalogue photos
- [ ] Confirm materials: Belp C-leg (solid walnut or lacquered MDF), Arosa (solid beech or panel)
- [ ] Mirror sizes and prices
- [ ] Confirm customs/duties policy for Swiss customers
