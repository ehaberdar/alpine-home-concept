/* =========================================================================
   Alpine Home Concept · SITE SCRIPT
   -------------------------------------------------------------------------
   One script for every page. Each HTML page sets <body data-page="...">
   and this file renders the matching parts from data/products.js.

   Sections
   1. Helpers            (safe DOM building, translation, prices, images)
   2. Language           (detect, switch, apply translations)
   3. Header & footer    (shared on every page)
   4. Pages              (home, collection, product, custom, contact, legal)
   5. Checkout dialog    (payment buttons -> "coming soon" step)
   6. Start

   Security notes
   - Text from data or the URL is only ever inserted with textContent,
     never innerHTML, so nothing can inject markup or scripts.
   - URL parameters (?id=, ?cat=, ?product=) are checked against known values.
   - No cookies, no tracking, no third-party requests.
   ========================================================================= */
(function () {
  "use strict";

  var CONFIG = window.AHC_CONFIG;
  var I18N = window.AHC_I18N;
  var PRODUCTS = window.AHC_PRODUCTS || [];
  var COLORS = window.AHC_COLORS || {};
  var RATES = window.AHC_RATES || {};
  // Conversion is only offered when the rates file is complete and sane
  var RATES_OK = !!(RATES.rates && RATES.rates.CHF > 0.2 && RATES.rates.USD > 0.2 && RATES.rates.CHF < 5 && RATES.rates.USD < 5 &&
    /^\d{4}-\d{2}-\d{2}$/.test(RATES.date || ""));
  var CATEGORIES = ["sculptural", "coffee-nesting", "side", "dining", "mirrors", "accessories"];
  // Prices from the Google Sheet (data/prices.js) override products.js.
  // Only plain positive whole numbers are accepted; anything else is ignored.
  (function applySheetPrices() {
    var items = (window.AHC_PRICES && window.AHC_PRICES.items) || {};
    function num(v) { return typeof v === "number" && isFinite(v) && v > 0 ? Math.round(v) : null; }
    PRODUCTS.forEach(function (p) {
      var list = Object.prototype.hasOwnProperty.call(items, p.id) ? items[p.id] : null;
      if (!Array.isArray(list)) return;
      p.variants.forEach(function (v, i) {
        var e = list[i];
        if (!e || typeof e !== "object") return;   // row missing in sheet: keep products.js
        v.price = num(e.chf);                        // empty = price on request
        var fixed = {};
        if (num(e.usd)) fixed.USD = num(e.usd);
        if (num(e.eur)) fixed.EUR = num(e.eur);
        if (fixed.USD || fixed.EUR) v.prices = fixed; else delete v.prices;
      });
    });
  })();
  var page = document.body.getAttribute("data-page");
  var lang = CONFIG.defaultLang;
  var currency = CONFIG.defaultCurrency;

  /* 1. HELPERS ------------------------------------------------------------ */

  // Build an element: el("a", {href: "#", class: "x"}, ["text", childNode])
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "text") node.textContent = v;
        else if (k === "class") node.className = v;
        else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  // Inline SVG icons from fixed path data (no user input involved)
  var ICONS = {
    prev: "M15 5 8 12l7 7",
    next: "m9 5 7 7-7 7",
    close: "M6 6l12 12M18 6 6 18"
  };
  function icon(name) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", ICONS[name]);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "currentColor");
    p.setAttribute("stroke-width", "1.8");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-linejoin", "round");
    svg.appendChild(p);
    return svg;
  }

  // Brand mark: three contour rings, echoing the products' layers
  function brandMark() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("aria-hidden", "true");
    ["M16 3.5c7.6 0 13 4.9 13 11.6 0 7.2-6 13.4-13.4 13.4C8.2 28.5 3 22.6 3 15.6 3 8.6 8.8 3.5 16 3.5Z",
     "M16.2 8.6c4.6 0 8 2.9 8 7 0 4.4-3.7 8-8.3 8-4.4 0-7.6-3.4-7.6-7.6 0-4.3 3.4-7.4 7.9-7.4Z",
     "M16.3 13.2c1.8 0 3.1 1.1 3.1 2.6 0 1.7-1.4 3-3.2 3-1.7 0-2.9-1.2-2.9-2.8 0-1.6 1.3-2.8 3-2.8Z"]
      .forEach(function (d) {
        var p = document.createElementNS(ns, "path");
        p.setAttribute("d", d);
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", "currentColor");
        p.setAttribute("stroke-width", "1.6");
        svg.appendChild(p);
      });
    return svg;
  }

  // Translate a key, filling {placeholders}
  function t(key, vars) {
    var s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function L(obj) { return obj ? (obj[lang] || obj.en || obj.fr) : ""; }

  // PRICES -----------------------------------------------------------------
  // Prices are stored in CHF (data/products.js). Other currencies are converted
  // with the ECB rates in data/rates.js and rounded to the nearest 5.
  // A variant can also carry fixed prices: prices: { USD: 399, EUR: 379 }.
  var LOCALES = { en: "en-US", de: "de-CH", fr: "fr-CH", tr: "tr-TR" };
  function convert(chf, variant) {
    if (typeof chf !== "number") return null;
    if (variant && variant.prices && typeof variant.prices[currency] === "number") return variant.prices[currency];
    if (currency === "CHF" || !RATES_OK) return chf;
    var r = RATES.rates;
    var rate = currency === "EUR" ? 1 : r[currency];
    return Math.round((chf / r.CHF) * rate / 5) * 5;
  }
  function format(amount) {
    return new Intl.NumberFormat(LOCALES[lang] || "en-US", { style: "currency", currency: currency, maximumFractionDigits: 0 }).format(amount);
  }
  // Display price of a variant in the current currency
  function money(variant) {
    var v = convert(variant.price, variant);
    return v === null ? t("price.onRequest") : format(v);
  }
  function minPrice(p) {   // in CHF, used for sorting
    var prices = p.variants.map(function (v) { return v.price; }).filter(function (x) { return typeof x === "number"; });
    return prices.length ? Math.min.apply(null, prices) : null;
  }
  function cheapest(p) {
    var m = minPrice(p);
    return p.variants.filter(function (v) { return v.price === m; })[0];
  }
  function priceLabel(p) {
    if (minPrice(p) === null) return t("price.onRequest");
    var label = money(cheapest(p));
    return p.variants.length > 1 ? t("price.from", { price: label }) : label;
  }
  function priceNote() {
    if (currency === "CHF" || !RATES_OK) return t("price.note");
    var date = new Intl.DateTimeFormat(LOCALES[lang] || "en-US", { dateStyle: "long" }).format(new Date(RATES.date + "T12:00:00"));
    return t("price.noteConverted", { date: date });
  }

  // Responsive product image: base "img/products/x/1" -> 800 / 1600 px WebP
  function picture(base, alt, sizes, eager) {
    return el("img", {
      src: base + "-800.webp",
      srcset: base + "-800.webp 800w, " + base + "-1600.webp 1600w",
      sizes: sizes || "(max-width: 52rem) 100vw, 33vw",
      alt: alt || "",
      loading: eager ? "eager" : "lazy",
      decoding: "async"
    });
  }

  // <meta name="robots" content="noindex"> on pages that should not be indexed
  function setRobots(noindex) {
    var m = document.querySelector('meta[name="robots"][data-dynamic]');
    if (noindex && !m) {
      m = el("meta", { name: "robots", content: "noindex", "data-dynamic": true });
      document.head.appendChild(m);
    } else if (!noindex && m) { m.parentNode.removeChild(m); }
  }

  function param(name) { return new URLSearchParams(window.location.search).get(name); }
  function byId(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0] || null; }
  function countLabel(n) { return t(n === 1 ? "count.one" : "count.many", { n: n }); }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

  /* 2. LANGUAGE ----------------------------------------------------------- */

  function detectLang() {
    var fromUrl = param("lang");
    var saved = null;
    try { saved = window.localStorage.getItem("ahc-lang"); } catch (e) { /* storage blocked: ignore */ }
    // Browser languages in the visitor's order of preference: "fr-CH" -> "fr"
    var browser = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""])
      .map(function (tag) { return String(tag).slice(0, 2).toLowerCase(); });
    var pick = [fromUrl, saved].concat(browser).filter(function (x) { return CONFIG.languages.indexOf(x) > -1; })[0];
    return pick || CONFIG.defaultLang;
  }

  // Currency: saved choice, else the visitor's region (CH -> CHF, euro area -> EUR), else the default
  var EURO = ["AT","BE","CY","DE","EE","ES","FI","FR","GR","HR","IE","IT","LT","LU","LV","MT","NL","PT","SI","SK"];
  function detectCurrency() {
    var saved = null;
    try { saved = window.localStorage.getItem("ahc-cur"); } catch (e) { /* ignore */ }
    if (!RATES_OK) return "CHF";                      // no rates: show the real CHF prices
    if (CONFIG.currencies.indexOf(saved) > -1) return saved;
    if (CONFIG.autoCurrency) {
      var tags = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]);
      for (var i = 0; i < tags.length; i++) {
        var region = (tags[i].split("-")[1] || "").toUpperCase();
        if (region === "CH" || region === "LI") return "CHF";
        if (EURO.indexOf(region) > -1) return "EUR";
        if (region) break;
      }
    }
    return CONFIG.defaultCurrency;
  }
  function setCurrency(next) {
    if (CONFIG.currencies.indexOf(next) < 0 || next === currency) return;
    var back = rememberFocus();
    currency = next;
    try { window.localStorage.setItem("ahc-cur", next); } catch (e) { /* ignore */ }
    renderAll();
    back();
  }

  // Switching language or currency rebuilds header and footer. Remember which
  // switch had the keyboard focus and give it back afterwards.
  function rememberFocus() {
    var a = document.activeElement;
    var zone = a && a.closest ? a.closest(".nav-lang, .footer-switches, .header-inner") : null;
    if (!zone) return function () {};
    var zoneSel = zone.classList.contains("nav-lang") ? ".nav-lang" : zone.classList.contains("footer-switches") ? ".footer-switches" : ".header-inner > ";
    var isSelect = a.tagName === "SELECT";
    var code = a.getAttribute("lang");
    return function () {
      var target = document.querySelector(isSelect
        ? (zoneSel === ".header-inner > " ? ".header-inner > .currency select" : zoneSel + " select")
        : (zoneSel === ".header-inner > " ? '.header-inner > .lang button[lang="' + code + '"]' : zoneSel + ' .lang button[lang="' + code + '"]'));
      if (target) target.focus({ preventScroll: true });
    };
  }
  function currencySwitch() {
    var id = "cur-" + Math.random().toString(36).slice(2, 7);
    var select = el("select", { id: id, class: "currency-select", onchange: function () { setCurrency(select.value); } },
      (RATES_OK ? CONFIG.currencies : ["CHF"]).map(function (c) { return el("option", { value: c, text: c, selected: c === currency }); }));
    return el("div", { class: "currency" }, [el("label", { for: id, class: "visually-hidden", text: t("currency.label") }), select]);
  }

  function setLang(next) {
    if (CONFIG.languages.indexOf(next) < 0 || next === lang) return;
    var back = rememberFocus();
    lang = next;
    try { window.localStorage.setItem("ahc-lang", next); } catch (e) { /* ignore */ }
    renderAll();
    back();
  }

  // Fill every [data-i18n] / [data-i18n-attr] element on the page
  function applyI18n(root) {
    document.documentElement.lang = lang;
    (root || document).querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
    (root || document).querySelectorAll("[data-i18n-attr]").forEach(function (n) {
      n.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length === 2) n.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
  }

  function langSwitch() {
    return el("div", { class: "lang", role: "group", "aria-label": t("lang.label") },
      CONFIG.languages.map(function (code) {
        return el("button", {
          type: "button", lang: code, "aria-pressed": String(code === lang),
          text: code.toUpperCase(), onclick: function () { setLang(code); }
        });
      }));
  }

  /* 3. HEADER & FOOTER ---------------------------------------------------- */

  var NAV = [
    { href: "collection.html", key: "nav.collection", page: "collection" },
    { href: "custom.html", key: "nav.custom", page: "custom" },
    { href: "atelier.html", key: "nav.atelier", page: "atelier" },
    { href: "contact.html", key: "nav.contact", page: "contact" }
  ];

  var menuOpen = false;   // mobile menu state, kept when the header is rebuilt

  // Only https links from the data files become external links
  function safeUrl(u) { return typeof u === "string" && /^https:\/\/[^\s"'<>]+$/.test(u) ? u : null; }
  // A real profile URL, not just the bare site (placeholder in config.js)
  function profileUrl(u) { return safeUrl(u) && !/^https:\/\/(www\.)?[a-z]+\.com\/?$/.test(u) ? u : null; }

  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var current = page === "product" ? "collection" : page;
    var nav = el("nav", { class: "site-nav" + (menuOpen ? " is-open" : ""), id: "site-nav", "aria-label": t("nav.menu") }, [
      el("ul", { class: "nav-list", role: "list" }, NAV.map(function (item) {
        return el("li", null, [el("a", {
          href: item.href, text: t(item.key),
          "aria-current": item.page === current ? "page" : null
        })]);
      })),
      el("div", { class: "nav-lang" }, [langSwitch(), currencySwitch()])   // switches inside the mobile menu
    ]);
    var toggle = el("button", {
      class: "menu-toggle", type: "button", "aria-expanded": String(menuOpen), "aria-controls": "site-nav",
      text: menuOpen ? t("nav.close") : t("nav.menu"),
      onclick: function () { setMenu(!menuOpen); }
    });
    function setMenu(open) {
      menuOpen = open;
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? t("nav.close") : t("nav.menu");
    }
    host.onkeydown = function (e) {          // Escape closes the mobile menu
      if (e.key === "Escape" && menuOpen) { setMenu(false); toggle.focus(); }
    };
    clear(host).appendChild(el("div", { class: "wrap header-inner" }, [
      el("a", { class: "brand", href: "index.html", "aria-label": "Alpine Home Concept, " + t("nav.home") }, [
        brandMark(), el("span", { class: "brand-name", text: "Alpine Home Concept" })
      ]),
      nav, langSwitch(), currencySwitch(), toggle
    ]));
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var year = new Date().getFullYear();
    clear(host).appendChild(el("div", { class: "wrap" }, [
      el("div", { class: "grid footer-grid" }, [
        el("div", { class: "footer-brand" }, [
          el("span", { class: "brand-name", text: "Alpine Home Concept" }),
          el("p", { text: t("footer.tagline") })
        ]),
        el("div", { class: "footer-col" }, [
          el("h2", { text: t("footer.shop") }),
          el("ul", { role: "list" }, CATEGORIES.map(function (c) {
            return el("li", null, [el("a", { href: "collection.html?cat=" + c, text: t("cat." + c) })]);
          }))
        ]),
        el("div", { class: "footer-col" }, [
          el("h2", { text: t("footer.company") }),
          el("ul", { role: "list" }, [
            el("li", null, [el("a", { href: "atelier.html", text: t("nav.atelier") })]),
            el("li", null, [el("a", { href: "custom.html", text: t("nav.custom") })]),
            el("li", null, [el("a", { href: "contact.html", text: t("nav.contact") })]),
            el("li", null, [el("a", { href: "legal.html", text: t("footer.legal") })])
          ])
        ]),
        el("div", { class: "footer-col" }, [
          el("h2", { text: t("nav.contact") }),
          el("ul", { role: "list" }, [
            el("li", null, [el("a", { href: "mailto:" + CONFIG.email, text: CONFIG.email })]),
            safeUrl(CONFIG.etsyShop) ? el("li", null, [el("a", { href: CONFIG.etsyShop, rel: "noopener noreferrer", target: "_blank", text: "Etsy" })]) : null,
            profileUrl(CONFIG.instagram) ? el("li", null, [el("a", { href: CONFIG.instagram, rel: "noopener noreferrer", target: "_blank", text: "Instagram" })]) : null
          ])
        ])
      ]),
      el("div", { class: "footer-bottom" }, [
        el("span", { text: t("footer.payments") }),
        el("span", { text: "© " + year + " Alpine Home Concept, Belp" }),
        el("div", { class: "footer-switches" }, [langSwitch(), currencySwitch()])
      ])
    ]));
  }

  // Thin line under the header once the page scrolls
  function watchScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 4. PAGES -------------------------------------------------------------- */

  // Product tile used on home and collection
  function tile(p, sizes, imgIndex) {
    var dims = p.variants[0] && p.variants[0].dims;
    var meta = [t("cat." + p.category)];
    if (p.variants.length > 1) meta.push(t("count.options", { n: p.variants.length }));
    else if (dims) meta.push(dims);
    return el("a", { class: "tile", href: "product.html?id=" + encodeURIComponent(p.id) }, [
      el("div", { class: "tile-media" }, [picture(p.images[imgIndex || 0] || p.images[0], p.name, sizes)]),
      el("div", { class: "tile-body" }, [
        el("span", { class: "tile-name", text: p.name }),
        el("span", { class: "tile-price", text: priceLabel(p) }),
        el("span", { class: "tile-meta", text: meta.join(", ") })
      ])
    ]);
  }

  // HOME ------------------------------------------------------------------
  var CAT_COVER = { "sculptural": "leman", "coffee-nesting": "arosa", "side": "belp", "dining": "lugano", "mirrors": "seealp", "accessories": "arve" };

  function renderHome() {
    var list = document.getElementById("cat-list");
    if (list) {
      clear(list);
      CATEGORIES.forEach(function (c) {
        var n = PRODUCTS.filter(function (p) { return p.category === c; }).length;
        if (!n) return;
        var cover = byId(CAT_COVER[c]);
        list.appendChild(el("li", null, [
          el("a", { class: "cat-row", href: "collection.html?cat=" + c }, [
            cover ? picture(cover.images[0], "", "88px") : el("span"),
            el("span", { class: "cat-name", text: t("cat." + c) }),
            el("span", { class: "cat-count", text: countLabel(n) })
          ])
        ]));
      });
    }
    var featured = document.getElementById("featured");
    if (featured) {
      clear(featured);
      ["leman", "aletsch", "cervin"].map(byId).filter(Boolean).forEach(function (p, i) {
        featured.appendChild(i === 0
          ? tile(p, "(max-width: 52rem) 100vw, 58vw", 1)   // portrait detail: the hero already shows photo 1
          : tile(p, "(max-width: 52rem) 100vw, 40vw"));
      });
    }
  }

  // COLLECTION ------------------------------------------------------------
  var collectionState = { cat: "all", sort: "default" };

  function renderCollection() {
    var catParam = param("cat");
    if (CATEGORIES.indexOf(catParam) > -1 && collectionState.cat === "all" && !collectionState.touched) collectionState.cat = catParam;

    var chips = document.getElementById("chips");
    clear(chips);
    ["all"].concat(CATEGORIES).forEach(function (c) {
      chips.appendChild(el("button", {
        class: "chip", type: "button", "aria-pressed": String(collectionState.cat === c),
        text: t("cat." + c),
        onclick: function () {
          collectionState.cat = c; collectionState.touched = true;
          var url = new URL(window.location.href);
          if (c === "all") url.searchParams.delete("cat"); else url.searchParams.set("cat", c);
          window.history.replaceState(null, "", url);
          renderCollection();
        }
      }));
    });

    var sort = document.getElementById("sort");
    if (!sort.dataset.bound) {
      sort.addEventListener("change", function () { collectionState.sort = sort.value; renderCollection(); });
      sort.dataset.bound = "1";
    }
    sort.value = collectionState.sort;

    var items = PRODUCTS.filter(function (p) { return collectionState.cat === "all" || p.category === collectionState.cat; });
    if (collectionState.sort !== "default") {
      var dir = collectionState.sort === "priceAsc" ? 1 : -1;
      items = items.slice().sort(function (a, b) {
        var pa = minPrice(a), pb = minPrice(b);
        if (pa === null) return 1;            // "on request" always last
        if (pb === null) return -1;
        return (pa - pb) * dir;
      });
    }
    var grid = clear(document.getElementById("tiles"));
    items.forEach(function (p) { grid.appendChild(tile(p)); });
    document.getElementById("empty").hidden = items.length > 0;
    document.getElementById("result-count").textContent = countLabel(items.length);
  }

  // PRODUCT ---------------------------------------------------------------
  var productState = { color: 0, variant: 0, image: 0 };

  function renderProduct() {
    var host = document.getElementById("product");
    var p = byId(param("id"));
    clear(host);
    setRobots(!p);                                   // unknown product: keep it out of search results
    if (!p) {
      document.title = t("meta.404");
      host.appendChild(el("div", { class: "wrap" }, [
        el("h1", { class: "h2", text: t("product.notFound") }),
        el("p", { class: "small" }, [el("a", { class: "text-link", href: "collection.html", text: t("product.back") })])
      ]));
      return;
    }
    document.title = t("meta.product", { name: p.name });
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", p.name + ". " + L(p.description));
    var etsyUrl = safeUrl(p.etsy);
    var variant = p.variants[productState.variant] || p.variants[0];
    var colorKey = p.colors[productState.color] || p.colors[0];

    // Gallery
    var mainImg = picture(p.images[productState.image], p.name + ", " + t("product.photo", { n: productState.image + 1, total: p.images.length }), "(max-width: 64rem) 100vw, 58vw", true);
    var count = el("span", { class: "gallery-count", "aria-live": "polite", text: (productState.image + 1) + " / " + p.images.length });
    // from = "prev" / "next" when an arrow was used: the same arrow keeps the focus
    function show(i, from) {
      productState.image = (i + p.images.length) % p.images.length;
      renderProduct();
      var b = document.querySelector(from ? '.gallery-nav button[data-dir="' + from + '"]' : '.thumbs button[aria-current="true"]');
      if (b) b.focus({ preventScroll: true });
    }
    var gallery = el("div", { class: "gallery" }, [
      el("div", { class: "gallery-main" }, [
        mainImg, count,
        p.images.length > 1 ? el("div", { class: "gallery-nav" }, [
          el("button", { type: "button", "data-dir": "prev", "aria-label": t("product.prev"), onclick: function () { show(productState.image - 1, "prev"); } }, [icon("prev")]),
          el("button", { type: "button", "data-dir": "next", "aria-label": t("product.next"), onclick: function () { show(productState.image + 1, "next"); } }, [icon("next")])
        ]) : null
      ]),
      p.images.length > 1 ? el("div", { class: "thumbs" }, p.images.map(function (src, i) {
        return el("button", {
          type: "button", "aria-label": t("product.photo", { n: i + 1, total: p.images.length }),
          "aria-current": String(i === productState.image), onclick: function () { show(i); }
        }, [picture(src, "", "80px")]);
      })) : null
    ]);

    // Options
    var colorSet = el("fieldset", null, [
      el("legend", null, [t("product.colour") + " ", el("span", { class: "chosen", text: L(COLORS[colorKey] && COLORS[colorKey].label) })]),
      el("div", { class: "swatches" }, p.colors.map(function (c, i) {
        var id = "c-" + c;
        var sw = el("span", { class: "swatch" }, [
          el("input", { type: "radio", name: "colour", id: id, value: c, checked: i === productState.color,
            onchange: function () { productState.color = i; renderProduct(); document.getElementById(id).focus(); } }),
          el("label", { for: id, title: L(COLORS[c] && COLORS[c].label) }, [el("span", { class: "visually-hidden", text: L(COLORS[c] && COLORS[c].label) })])
        ]);
        sw.querySelector("label").style.backgroundColor = (COLORS[c] && COLORS[c].swatch) || "#ccc";
        return sw;
      }))
    ]);

    var variantSet = p.variants.length > 1 ? el("fieldset", null, [
      el("legend", { text: t("product.size") }),
      el("div", { class: "variants" }, p.variants.map(function (v, i) {
        var id = "v-" + i;
        return el("div", { class: "variant" }, [
          el("input", { type: "radio", name: "variant", id: id, checked: i === productState.variant,
            onchange: function () { productState.variant = i; renderProduct(); document.getElementById(id).focus(); } }),
          el("label", { for: id }, [
            el("span", { class: "v-name", text: L(v.label) }),
            el("span", { class: "v-price", text: money(v) }),
            v.dims ? el("span", { class: "v-dims", text: v.dims }) : null
          ])
        ]);
      }))
    ]) : null;

    var hasPrice = typeof variant.price === "number";
    var selectionText = [p.name, L(COLORS[colorKey] && COLORS[colorKey].label), p.variants.length > 1 ? L(variant.label) : null, variant.dims, hasPrice ? money(variant) : null]
      .filter(Boolean).join("\n");

    var buy = el("div", { class: "buy" }, [
      hasPrice
        ? el("button", { class: "btn btn-primary btn-block", type: "button", text: t("product.buy"), onclick: function () { openCheckout(p, selectionText); } })
        : el("a", { class: "btn btn-primary btn-block", href: "custom.html?product=" + encodeURIComponent(p.id), text: t("product.request") }),
      etsyUrl ? el("a", { class: "btn btn-ghost btn-block", href: etsyUrl, target: "_blank", rel: "noopener noreferrer", text: t("product.etsy") }) : null
    ]);

    var specs = el("section", { class: "specs", "aria-labelledby": "specs-h" }, [
      el("h2", { id: "specs-h", text: t("product.details") }),
      el("dl", null, [
        el("dt", { text: t("spec.dims") }), el("dd", { text: p.variants.map(function (v) { return v.dims; }).filter(Boolean).join(" · ") || "—" }),
        el("dt", { text: t("spec.material") }), el("dd", { text: t("material." + p.material) }),
        el("dt", { text: t("spec.finishes") }), el("dd", { text: p.colors.map(function (c) { return L(COLORS[c] && COLORS[c].label); }).join(", ") }),
        el("dt", { text: t("spec.delivery") }), el("dd", { text: t(p.leadTime === "stock" ? "lead.stock" : "lead.onRequest") }),
        el("dt", { text: t("spec.returns") }), el("dd", { text: t("returns.text") })
      ])
    ]);

    var info = el("div", { class: "product-info" }, [
      el("h1", { text: p.name }),
      el("p", { class: "product-cat" }, [el("a", { href: "collection.html?cat=" + p.category, text: t("cat." + p.category) })]),
      el("p", { class: "product-desc", text: L(p.description) }),
      el("p", { class: "product-price", text: money(variant) }),
      hasPrice ? el("p", { class: "small muted price-note", text: priceNote() }) : el("div", { class: "price-note" }),
      colorSet, variantSet, buy,
      el("p", { class: "small" }, [el("a", { class: "text-link", href: "custom.html?product=" + encodeURIComponent(p.id), text: t("product.custom") })]),
      specs
    ]);

    host.appendChild(el("div", { class: "wrap" }, [
      el("nav", { class: "crumbs", "aria-label": t("nav.breadcrumb") }, [
        el("a", { href: "collection.html", text: t("nav.collection") }), " / ",
        el("a", { href: "collection.html?cat=" + p.category, text: t("cat." + p.category) })
      ]),
      el("div", { class: "grid product-grid" }, [gallery, info])
    ]));

    // Related products
    var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 3);
    var rel = document.getElementById("related");
    if (rel) {
      clear(rel);
      rel.setAttribute("aria-label", t("product.related"));
      if (related.length) {
        rel.appendChild(el("div", { class: "wrap" }, [
          el("h2", { class: "h2", text: t("product.related") }),
          el("div", { class: "tiles", style: null }, related.map(function (x) { return tile(x); }))
        ]));
        rel.querySelector(".tiles").classList.add("related-tiles");
      }
    }
  }

  // CUSTOM (made to measure) form -----------------------------------------
  function renderCustom() {
    var select = document.getElementById("f-product");
    var keep = select.value || param("product") || "";
    clear(select);
    select.appendChild(el("option", { value: "", text: t("form.productNone") }));
    CATEGORIES.forEach(function (c) {
      var group = el("optgroup", { label: t("cat." + c) });
      PRODUCTS.filter(function (p) { return p.category === c; }).forEach(function (p) {
        group.appendChild(el("option", { value: p.id, text: p.name }));
      });
      if (group.children.length) select.appendChild(group);
    });
    if (byId(keep)) select.value = keep;

    var form = document.getElementById("custom-form");
    if (form.dataset.bound) return;
    form.dataset.bound = "1";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[data-required]").forEach(function (input) {
        var err = document.getElementById(input.id + "-error");
        var v = input.value.trim();
        var msg = "";
        if (!v) msg = t("form.error.required");
        else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = t("form.error.email");
        input.setAttribute("aria-invalid", msg ? "true" : "false");
        err.textContent = msg;
        err.hidden = !msg;
        if (msg && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;
      var prod = byId(select.value);
      var body = [
        t("form.name") + ": " + form.elements.name.value.trim(),
        t("form.email") + ": " + form.elements.email.value.trim(),
        t("form.product") + ": " + (prod ? prod.name : t("form.productNone")),
        t("form.dims") + ": " + form.elements.dims.value.trim(),
        t("form.finish") + ": " + form.elements.finish.value.trim(),
        "", form.elements.message.value.trim()
      ].join("\n");
      var subject = t("form.mailSubject", { product: prod ? prod.name : "—" });
      window.location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var notice = document.getElementById("form-sent");
      notice.textContent = t("form.sent", { email: CONFIG.email });
      notice.hidden = false;
    });
  }

  // CONTACT ---------------------------------------------------------------
  function renderContact() {
    var dl = clear(document.getElementById("contact-list"));
    [["contact.email", el("a", { href: "mailto:" + CONFIG.email, text: CONFIG.email })],
     profileUrl(CONFIG.instagram) ? ["contact.instagram", el("a", { href: CONFIG.instagram, target: "_blank", rel: "noopener noreferrer", text: "Instagram" })] : null,
     safeUrl(CONFIG.etsyShop) ? ["contact.etsy", el("a", { href: CONFIG.etsyShop, target: "_blank", rel: "noopener noreferrer", text: "AlpineHomeConcept" })] : null]
      .filter(Boolean).forEach(function (row) { dl.appendChild(el("dt", { text: t(row[0]) })); dl.appendChild(el("dd", null, [row[1]])); });
  }

  // LEGAL -----------------------------------------------------------------
  function renderLegal() {
    var host = document.getElementById("imprint");
    var todo = function (v) { return v || "[" + t("legal.todo") + "]"; };
    clear(host).textContent = t("legal.imprint.text", {
      company: todo(CONFIG.company), address: todo(CONFIG.address), email: CONFIG.email, uid: todo(CONFIG.uid)
    });
  }

  // ATELIER: mirror shop link
  function renderAtelier() {
    var a = document.getElementById("mirror-link");
    if (!a) return;
    if (safeUrl(CONFIG.mirrorShop)) a.setAttribute("href", CONFIG.mirrorShop);
    else a.parentNode.hidden = true;
  }

  /* 5. CHECKOUT DIALOG ---------------------------------------------------- */
  // Payment is not live yet: choosing a method shows the "coming soon" step
  // with Etsy and e-mail as working ways to order.
  function openCheckout(p, selectionText) {
    var dialog = document.getElementById("checkout");
    var body = clear(dialog.querySelector(".dialog-body"));
    var close = function () { dialog.close(); };

    function stepChoose() {
      clear(body);
      body.appendChild(el("h2", { id: "checkout-title", text: t("checkout.title") }));
      body.appendChild(el("p", { class: "muted", text: t("checkout.text") }));
      body.appendChild(el("div", { class: "pay-options" }, ["card", "paypal", "twint"].map(function (m) {
        return el("button", { class: "pay-option", type: "button", onclick: function () { stepPending(t("checkout." + m)); } }, [
          el("span", { text: t("checkout." + m) })
        ]);
      })));
      body.appendChild(closeBtn());
    }

    function stepPending(method) {
      clear(body);
      body.appendChild(el("h2", { id: "checkout-title", tabindex: "-1", text: t("checkout.pendingTitle") }));
      body.appendChild(el("p", { text: t("checkout.pendingText", { method: method }) }));
      body.appendChild(el("div", { class: "selection", "aria-label": t("checkout.selection"), text: selectionText }));
      var mail = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(t("checkout.mailSubject", { name: p.name })) +
        "&body=" + encodeURIComponent(t("checkout.mailBody", { selection: selectionText }));
      body.appendChild(el("div", { class: "dialog-actions" }, [
        safeUrl(p.etsy) ? el("a", { class: "btn btn-primary", href: p.etsy, target: "_blank", rel: "noopener noreferrer", text: t("checkout.etsy") }) : null,
        el("a", { class: safeUrl(p.etsy) ? "btn btn-ghost" : "btn btn-primary", href: mail, text: t("checkout.email") })
      ]));
      // Address also as plain text: mailto links do not open in every browser
      body.appendChild(el("p", { class: "small muted dialog-mail", text: CONFIG.email }));
      body.appendChild(closeBtn());
      body.querySelector("h2").focus();
    }

    function closeBtn() {
      return el("button", { class: "dialog-close", type: "button", "aria-label": t("checkout.close"), onclick: close }, [icon("close")]);
    }

    stepChoose();
    dialog.setAttribute("aria-labelledby", "checkout-title");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    if (!dialog.dataset.bound) {
      dialog.addEventListener("click", function (e) { if (e.target === dialog) close(); }); // click on backdrop
      dialog.dataset.bound = "1";
    }
  }

  /* 6. START -------------------------------------------------------------- */
  var PAGES = {
    home: renderHome, collection: renderCollection, product: renderProduct,
    custom: renderCustom, contact: renderContact, legal: renderLegal, atelier: renderAtelier
  };
  var TITLES = { home: "meta.home", collection: "meta.collection", custom: "meta.custom", atelier: "meta.atelier", contact: "meta.contact", legal: "meta.legal", notfound: "meta.404" };

  function renderAll() {
    applyI18n();
    if (TITLES[page]) document.title = t(TITLES[page]);
    renderHeader();
    renderFooter();
    if (PAGES[page]) PAGES[page]();
    document.dispatchEvent(new CustomEvent("ahc:rendered", { detail: { lang: lang } }));
  }

  // "Skip to content": move the keyboard focus to <main> (also correct on the
  // 404 page, where a <base> tag would otherwise send "#main" to the home page)
  function bindSkipLink() {
    var link = document.querySelector(".skip-link");
    var main = document.getElementById("main");
    if (!link || !main) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      main.setAttribute("tabindex", "-1");
      main.focus();
    });
  }

  lang = detectLang();
  currency = detectCurrency();
  renderAll();
  watchScroll();
  bindSkipLink();
})();
