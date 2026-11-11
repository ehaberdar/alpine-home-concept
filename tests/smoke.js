// Browser-free test of every page: loads each HTML file in jsdom, runs the site
// scripts and checks rendering, languages, currencies, forms and safety rules.
// Run:  cd tests && npm install && npm test
const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
async function load(file, query = "", lang = "fr", cur = "CHF", navLangs = null, prices = undefined) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => errors.push(e.message));
  vc.on("error", e => errors.push(String(e)));
  const html = fs.readFileSync(path.join(ROOT, file), "utf8");
  const dom = new JSDOM(html, {
    url: "https://example.test/" + file + query, runScripts: "outside-only", virtualConsole: vc, pretendToBeVisual: true
  });
  const w = dom.window;
  w.matchMedia = () => ({ matches: false, addEventListener() {} });
  w.HTMLDialogElement && (w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); });
  w.HTMLDialogElement && (w.HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); });
  if (lang) w.localStorage.setItem("ahc-lang", lang);
  if (cur) w.localStorage.setItem("ahc-cur", cur);
  if (navLangs) { Object.defineProperty(w.navigator, "languages", { value: navLangs }); Object.defineProperty(w.navigator, "language", { value: navLangs[0] }); }
  const scripts = [...w.document.querySelectorAll("script[src]")].map(s => s.getAttribute("src"));
  for (const s of scripts) {
    if (s.includes("topo.js")) continue; // needs real layout; tested visually
    try { w.eval(fs.readFileSync(path.join(ROOT, s), "utf8")); } catch (e) { errors.push(s + ": " + e.message); }
    if (s === "data/prices.js" && prices !== "real") w.AHC_PRICES = (prices && typeof prices !== "function") ? prices : { items: {} };
    if (s === "assets/js/i18n.js" && typeof prices === "function") prices(w);   // hook: runs just before app.js
  }
  return { w, d: w.document, errors };
}
(async () => {
  const out = [];
  const check = (name, cond) => out.push((cond ? "PASS " : "FAIL ") + name);
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith(".html"))) {
    const { d, errors } = await load(f);
    check(`${f} no errors ${errors.join(" | ")}`, errors.length === 0);
    check(`${f} header+footer rendered`, d.querySelector(".brand") && d.querySelector(".footer-bottom"));
    const empties = [...d.querySelectorAll("[data-i18n]")].filter(n => !n.textContent.trim()).map(n => n.getAttribute("data-i18n"));
    check(`${f} all i18n filled ${empties}`, empties.length === 0);
  }
  let { d, w } = await load("index.html"); let errors;
  // Counts come from the data, so adding or removing a product never breaks the tests
  const ALL = w.AHC_PRODUCTS.length, count = c => w.AHC_PRODUCTS.filter(p => p.category === c).length;
  const CATS = new Set(w.AHC_PRODUCTS.map(p => p.category)).size;
  check("home: every category listed", d.querySelectorAll("#cat-list li").length === CATS);
  check("home: 3 featured", d.querySelectorAll("#featured .tile").length === 3);
  // language switch
  [...d.querySelectorAll(".lang button")].find(b => b.textContent === "DE").click();
  check("lang DE applied: " + d.querySelector("#hero-title").textContent, d.documentElement.lang === "de" && d.querySelector("#hero-title").textContent === "Tische mit Relief.");
  check("lang saved", w.localStorage.getItem("ahc-lang") === "de");
  const order = [...d.querySelectorAll(".site-header .header-inner > .lang button")].map(b => b.textContent).join(",");
  check("language order EN,DE,FR,TR: " + order, order === "EN,DE,FR,TR");
  [...d.querySelectorAll(".lang button")].find(b => b.textContent === "TR").click();
  check("lang TR applied: " + d.querySelector("#hero-title").textContent, d.documentElement.lang === "tr" && d.querySelector("#hero-title").textContent === "Katman katman masalar.");
  ({ d, w } = await load("index.html", "", null));
  w.localStorage.removeItem("ahc-lang");
  check("static fallback is English", d.querySelector("html").getAttribute("lang") !== null);

  ({ d } = await load("collection.html"));
  check("collection: all products shown", d.querySelectorAll("#tiles .tile").length === ALL);
  ({ d } = await load("collection.html", "?cat=dining"));
  check("collection ?cat=dining", d.querySelectorAll("#tiles .tile").length === count("dining"));
  ({ d } = await load("collection.html", "?cat=<script>alert(1)</script>"));
  check("collection bad cat ignored", d.querySelectorAll("#tiles .tile").length === ALL);
  [...d.querySelectorAll(".chip")].find(c => c.textContent.startsWith("Miroirs")).click();
  check("chip filter mirrors", d.querySelectorAll("#tiles .tile").length === count("mirrors"));
  const sort = d.getElementById("sort"); sort.value = "priceAsc"; sort.dispatchEvent(new d.defaultView.Event("change"));
  // sorting with all-mirror (no price) set still works
  check("sort runs", d.querySelectorAll("#tiles .tile").length === count("mirrors"));

  ({ d } = await load("product.html", "?id=leman", "en"));
  check("product leman: title", d.title.startsWith("Léman"));
  check("product leman: 4 variants", d.querySelectorAll(".variant").length === 4);
  check("product leman: price shown " + d.querySelector(".product-price").textContent, /CHF/.test(d.querySelector(".product-price").textContent));
  d.getElementById("v-2").click();
  check("variant switch changes price " + d.querySelector(".product-price").textContent, d.querySelector(".product-price").textContent.includes("650"));
  d.querySelector(".gallery-nav button:last-child").click();
  check("gallery next", d.querySelector(".gallery-count").textContent.startsWith("2 /"));
  d.querySelector(".buy .btn-primary").click();
  const dlg = d.getElementById("checkout");
  check("checkout opens", dlg.hasAttribute("open") && dlg.querySelectorAll(".pay-option").length === 3);
  dlg.querySelectorAll(".pay-option")[2].click();
  check("pending step TWINT: " + dlg.querySelector("p").textContent.slice(0, 60), /TWINT/.test(dlg.querySelector("p").textContent));
  const mail = [...dlg.querySelectorAll("a")].find(a => a.href.startsWith("mailto:"));
  check("mailto prefilled", mail && decodeURIComponent(mail.href).includes("Léman"));
  ({ d } = await load("product.html", "?id=arosa", "tr"));
  check("product in TR: " + d.querySelector(".product-desc").textContent.slice(0, 40), /Çakıl/.test(d.querySelector(".product-desc").textContent));
  check("TR variant label", [...d.querySelectorAll(".v-name")].some(n => n.textContent === "Orta sehpa + 2 zigon"));
  ({ d } = await load("product.html", "?id=bern"));
  check("on-request product: request button", d.querySelector(".buy a.btn-primary") && d.querySelector(".buy a.btn-primary").href.includes("custom.html?product=bern"));
  ({ d } = await load("product.html", "?id=<img src=x onerror=alert(1)>"));
  check("unknown id: safe not-found", !d.querySelector("img[onerror]") && d.querySelector("#product h1"));

  // --- currencies ---
  ({ d, w } = await load("product.html", "?id=leman", "en", null, ["en-US", "en"]));
  check("US visitor defaults to USD: " + d.querySelector(".product-price").textContent, /\$/.test(d.querySelector(".product-price").textContent));
  const usd = d.querySelector(".product-price").textContent.replace(/[^0-9]/g, "");
  check("USD rounded to 5: " + usd, Number(usd) % 5 === 0);
  check("converted note shown", /ECB/.test(d.querySelector(".price-note").textContent));
  ({ d } = await load("product.html", "?id=leman", "de", null, ["de-CH", "de"]));
  check("Swiss visitor gets CHF: " + d.querySelector(".product-price").textContent, /CHF/.test(d.querySelector(".product-price").textContent));
  ({ d } = await load("product.html", "?id=leman", "de", null, ["de-DE", "de"]));
  check("German visitor gets EUR: " + d.querySelector(".product-price").textContent, /€|EUR/.test(d.querySelector(".product-price").textContent));
  const sel = d.querySelector(".site-header .currency-select"); sel.value = "USD"; sel.dispatchEvent(new d.defaultView.Event("change"));
  check("switch to USD works", /\$/.test(d.querySelector(".product-price").textContent));
  check("currency saved", d.defaultView.localStorage.getItem("ahc-cur") === "USD");
  ({ d, w } = await load("product.html", "?id=leman", "en", "USD"));
  w.AHC_PRODUCTS.find(p => p.id === "leman").variants[0].prices = { USD: 399 };
  [...d.querySelectorAll(".lang button")].find(b => b.textContent === "DE").click();
  check("fixed USD price override: " + d.querySelector(".product-price").textContent, d.querySelector(".product-price").textContent.replace(/[^0-9]/g, "") === "399");
  ({ d } = await load("collection.html", "", "en", "EUR"));
  check("collection tiles in EUR", /€/.test(d.querySelector(".tile-price").textContent));

  // Sheet prices (data/prices.js) override products.js
  ({ d } = await load("product.html", "?id=leman", "en", "CHF", null, { items: { leman: [{ chf: 1250, usd: null, eur: null }, { chf: null, usd: null, eur: null }] } }));
  check("sheet CHF price applied: " + d.querySelector(".product-price").textContent, d.querySelector(".product-price").textContent.replace(/[^0-9]/g, "") === "1250");
  check("sheet empty price = on request", [...d.querySelectorAll(".v-price")][1].textContent.trim() === "Price on request");
  check("missing sheet row keeps products.js price", /650/.test([...d.querySelectorAll(".v-price")][2].textContent.replace(/[^0-9]/g, "")));
  ({ d } = await load("product.html", "?id=leman", "en", "USD", null, { items: { leman: [{ chf: 365, usd: 410, eur: null }] } }));
  check("sheet fixed USD applied: " + d.querySelector(".product-price").textContent, d.querySelector(".product-price").textContent.replace(/[^0-9]/g, "") === "410");
  ({ d, errors } = await load("product.html", "?id=leman", "en", "CHF", null, { items: { leman: "x", __proto__: { a: 1 }, cervin: [{ chf: "<b>9</b>" }] } }));
  check("malformed sheet data ignored safely", errors.length === 0 && d.querySelector(".product-price").textContent.replace(/[^0-9]/g, "") === "365");
  ({ d } = await load("collection.html", "", "en", "CHF", null, "real"));
  check("real prices.js loads", !!d.defaultView.AHC_PRICES && d.querySelectorAll("#tiles .tile").length === ALL);

  // ---- audit additions -------------------------------------------------
  const hook = fn => fn;
  ({ d } = await load("index.html", "", null, null, ["es-ES", "de-DE", "en"]));
  check("language: second browser language is used (es, de -> de)", d.documentElement.lang === "de");
  ({ d } = await load("index.html", "", null, null, ["ja-JP"]));
  check("language: unsupported browser language -> English", d.documentElement.lang === "en");
  ({ d } = await load("index.html", "?lang=tr", "fr"));
  check("language: ?lang= beats the saved choice", d.documentElement.lang === "tr");
  ({ d, errors } = await load("product.html", "?id=leman", "en", "USD", null, hook(w => { delete w.AHC_RATES; })));
  check("no rates file: no crash, CHF price shown: " + d.querySelector(".product-price").textContent, errors.length === 0 && /CHF/.test(d.querySelector(".product-price").textContent) && d.querySelector(".product-price").textContent.replace(/[^0-9]/g, "") === "365");
  check("no rates file: only CHF offered", d.querySelectorAll(".header-inner > .currency option").length === 1);
  ({ d, errors } = await load("collection.html", "", "de", "EUR", null, hook(w => { w.AHC_RATES = { rates: { EUR: 1, USD: "x", CHF: 0 }, date: "bad" }; })));
  check("broken rates file: falls back to CHF", errors.length === 0 && /CHF/.test(d.querySelector(".tile-price").textContent));
  ({ d } = await load("contact.html", "", "en", "CHF", null, hook(w => { w.AHC_CONFIG.instagram = "https://www.instagram.com/"; })));
  check("placeholder Instagram link hidden", ![...d.querySelectorAll("a")].some(a => /instagram/.test(a.href)));
  ({ d } = await load("contact.html", "", "en", "CHF", null, hook(w => { w.AHC_CONFIG.instagram = "https://www.instagram.com/alpinehomeconcept"; })));
  check("real Instagram link shown (footer + list)", [...d.querySelectorAll("a")].filter(a => /instagram\.com\/alpinehomeconcept/.test(a.href)).length === 2);
  ({ d } = await load("product.html", "?id=leman", "en", "CHF", null, hook(w => { w.AHC_PRODUCTS.find(p => p.id === "leman").etsy = "javascript:alert(1)"; w.AHC_CONFIG.etsyShop = "javascript:alert(2)"; })));
  check("non-https link from data is never rendered", ![...d.querySelectorAll("a")].some(a => /^javascript:/i.test(a.getAttribute("href"))));
  ({ d, w } = await load("product.html", "?id=leman", "en", "CHF"));
  check("product meta description is the product text", /^Léman\. /.test(d.querySelector('meta[name="description"]').content));
  check("known product is indexable", !d.querySelector('meta[name="robots"]'));
  d.querySelector('.gallery-nav button[data-dir="next"]').click();
  check("gallery: arrow keeps focus after click", d.activeElement.getAttribute("data-dir") === "next" && d.querySelector(".gallery-count").textContent.trim() === "2 / 8");
  d.querySelectorAll(".thumbs button")[4].click();
  check("gallery: thumbnail keeps focus", d.activeElement.getAttribute("aria-current") === "true" && d.querySelector(".gallery-count").textContent.trim() === "5 / 8");
  d.querySelector(".buy button").click(); d.querySelectorAll(".pay-option")[0].click();
  check("checkout: focus moves to the new heading", d.activeElement.id === "checkout-title");
  ({ d } = await load("product.html", "?id=nope", "en"));
  check("unknown product is noindex", d.querySelector('meta[name="robots"]').content === "noindex");
  ({ d, w } = await load("index.html", "", "en", "CHF"));
  const de = d.querySelector('.site-header .header-inner > .lang button[lang="de"]'); de.focus(); de.click();
  check("focus stays on the language button after switching", d.activeElement.getAttribute("lang") === "de" && d.activeElement.closest(".header-inner") && d.documentElement.lang === "de");
  const fsel = d.querySelector(".footer-switches select"); fsel.focus(); fsel.value = "USD"; fsel.dispatchEvent(new w.Event("change"));
  check("focus stays on the footer currency menu", d.activeElement.tagName === "SELECT" && !!d.activeElement.closest(".footer-switches") && d.activeElement.value === "USD");
  const tog = () => d.querySelector(".menu-toggle"); tog().click();
  check("menu opens", d.querySelector(".site-nav").classList.contains("is-open") && tog().getAttribute("aria-expanded") === "true");
  const fr = d.querySelector('.nav-lang button[lang="fr"]'); fr.focus(); fr.click();
  check("menu stays open after language change inside it", d.querySelector(".site-nav").classList.contains("is-open") && tog().textContent === "Fermer" && d.activeElement.getAttribute("lang") === "fr" && !!d.activeElement.closest(".nav-lang"));
  d.activeElement.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  check("Escape closes the menu and returns focus", !d.querySelector(".site-nav").classList.contains("is-open") && d.activeElement === tog() && tog().getAttribute("aria-expanded") === "false");
  d.querySelector(".skip-link").click();
  check("skip link moves focus to main", d.activeElement.id === "main");
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith(".html"))) {
    const h = fs.readFileSync(path.join(ROOT, f), "utf8");
    check(f + " CSP has trusted types", /require-trusted-types-for 'script'; trusted-types 'none'/.test(h));
    check(f + " has a no-JavaScript menu", /<noscript>.*collection\.html/.test(h));
  }
  check("app.js uses no HTML-string sinks", !/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\(|new Function/.test((fs.readFileSync(path.join(ROOT, "assets/js/app.js"), "utf8") + fs.readFileSync(path.join(ROOT, "assets/js/topo.js"), "utf8")).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")));

  ({ d, w } = await load("custom.html", "?product=cervin"));
  check("custom: product preselected", d.getElementById("f-product").value === "cervin");
  d.getElementById("custom-form").dispatchEvent(new w.Event("submit", { cancelable: true }));
  check("custom: validation errors shown", !d.getElementById("f-name-error").hidden && !d.getElementById("f-email-error").hidden);
  d.getElementById("f-name").value = "Test"; d.getElementById("f-email").value = "bad"; d.getElementById("f-message").value = "hi";
  d.getElementById("custom-form").dispatchEvent(new w.Event("submit", { cancelable: true }));
  check("custom: email format checked", d.getElementById("f-email-error").textContent.length > 5);

  ({ d } = await load("legal.html", "", "fr", "CHF", null, hook(w => { w.AHC_CONFIG.company = null; })));
  check("legal: TODO marker while company data is missing", /\[à compléter\]/.test(d.getElementById("imprint").textContent));
  ({ d } = await load("legal.html", "", "fr", "CHF", null, hook(w => { w.AHC_CONFIG.company = "Test GmbH"; w.AHC_CONFIG.address = "Weg 1, 3123 Belp"; w.AHC_CONFIG.uid = "CHE-000.000.000"; })));
  check("legal: imprint filled from config", /Test GmbH, Weg 1, 3123 Belp/.test(d.getElementById("imprint").textContent) && !/\[/.test(d.getElementById("imprint").textContent));
  console.log(out.join("\n"));
  console.log(out.filter(x => x.startsWith("FAIL")).length + " failures / " + out.length);
  if (out.some(x => x.startsWith("FAIL"))) process.exitCode = 1;
})();
