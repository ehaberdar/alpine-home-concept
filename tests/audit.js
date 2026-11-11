// Checks the data files: every product complete, every photo present, every text
// translated in all four languages, every link pointing to an existing page.
// Run:  cd tests && npm test     (exit code 1 when an error is found)
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = {};
for (const f of ["data/config.js", "data/products.js", "data/prices.js", "data/rates.js", "assets/js/i18n.js"]) require(path.join(ROOT, f));
const { AHC_CONFIG: C, AHC_PRODUCTS: P, AHC_COLORS: COL, AHC_I18N: I, AHC_PRICES: PR, AHC_RATES: R } = window;
const issues = []; const note = (sev, m) => issues.push(sev + " " + m);
const exists = f => fs.existsSync(path.join(ROOT, f));
const langs = C.languages;

// i18n parity
const keys = new Set(Object.keys(I.en));
for (const l of Object.keys(I)) {
  const k = new Set(Object.keys(I[l]));
  for (const x of keys) if (!k.has(x)) note("ERR", `i18n ${l} missing ${x}`);
  for (const x of k) if (!keys.has(x)) note("WARN", `i18n ${l} extra ${x}`);
  for (const x of k) {
    const v = I[l][x];
    if (typeof v !== "string" || !v.trim()) note("ERR", `i18n ${l}.${x} empty`);
    const ph = s => (String(s).match(/\{[a-z]+\}/gi) || []).sort().join();
    if (I.en[x] !== undefined && ph(v) !== ph(I.en[x])) note("ERR", `i18n ${l}.${x} placeholders differ: ${ph(v)} vs ${ph(I.en[x])}`);
    if (/—/.test(v)) note("INFO", `i18n ${l}.${x} has em dash`);
    if (/\s{2,}|^\s|\s$/.test(v.replace(/\n/g, ""))) note("WARN", `i18n ${l}.${x} stray spaces`);
  }
}
// keys used
const app = fs.readFileSync(path.join(ROOT, "assets/js/app.js"), "utf8");
const used = new Set([...app.matchAll(/\bt\("([^"]+)"/g)].map(m => m[1]).filter(k => !k.endsWith(".")));
[...app.matchAll(/key: "([^"]+)"/g)].forEach(m => used.add(m[1]));
[...app.matchAll(/: "(meta\.[^"]+)"/g)].forEach(m => used.add(m[1]));
const htmls = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
for (const f of htmls) {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  [...h.matchAll(/data-i18n="([^"]+)"/g)].forEach(m => used.add(m[1]));
  [...h.matchAll(/data-i18n-attr="([^"]+)"/g)].forEach(m => m[1].split(";").forEach(p => used.add(p.split(":")[1].trim())));
}
["cat.all", ...["sculptural","coffee-nesting","side","dining","mirrors","accessories"].map(c => "cat." + c),
 "checkout.card","checkout.paypal","checkout.twint","lead.stock","lead.onRequest","count.one","count.many"].forEach(k => used.add(k));
P.forEach(p => used.add("material." + p.material));
for (const k of used) if (!keys.has(k)) note("ERR", `key used but missing: ${k}`);
for (const k of keys) if (!used.has(k)) note("INFO", `unused key: ${k}`);

// products
const ids = new Set(); const cats = ["sculptural","coffee-nesting","side","dining","mirrors","accessories"];
let imgCount = 0; const refImgs = new Set();
for (const p of P) {
  if (ids.has(p.id)) note("ERR", `duplicate id ${p.id}`); ids.add(p.id);
  if (!/^[a-z0-9-]+$/.test(p.id)) note("ERR", `bad id ${p.id}`);
  if (!cats.includes(p.category)) note("ERR", `${p.id} bad category`);
  if (!I.en["material." + p.material]) note("ERR", `${p.id} material key missing`);
  for (const l of langs) if (!p.description || !p.description[l] || !p.description[l].trim()) note("ERR", `${p.id} description ${l} missing`);
  if (!p.colors || !p.colors.length) note("ERR", `${p.id} no colors`);
  (p.colors || []).forEach(c => { if (!COL[c]) note("ERR", `${p.id} unknown color ${c}`); else { for (const l of langs) if (!COL[c].label[l]) note("ERR", `color ${c} label ${l} missing`); if (!/^#[0-9a-f]{6}$/i.test(COL[c].swatch)) note("ERR", `color ${c} swatch`); } });
  if (!p.variants || !p.variants.length) note("ERR", `${p.id} no variants`);
  (p.variants || []).forEach((v, i) => {
    for (const l of langs) if (!v.label || !v.label[l]) note("ERR", `${p.id} variant ${i} label ${l} missing`);
    if (v.price !== null && !(typeof v.price === "number" && v.price > 0)) note("ERR", `${p.id} variant ${i} price ${v.price}`);
    if (!v.dims) note("INFO", `${p.id} variant ${i} no dims`);
    else if (!/cm/.test(v.dims)) note("WARN", `${p.id} variant ${i} dims without unit: "${v.dims}"`);
  });
  if (!p.images || !p.images.length) note("ERR", `${p.id} no images`);
  (p.images || []).forEach(b => { for (const s of ["-800.webp", "-1600.webp"]) { imgCount++; refImgs.add(b + s); if (!exists(b + s)) note("ERR", `${p.id} missing image ${b + s}`); } });
  if (p.etsy && !/^https:\/\/www\.etsy\.com\/listing\/\d+/.test(p.etsy)) note("ERR", `${p.id} etsy url ${p.etsy}`);
  if (!p.etsy && p.variants.some(v => v.price)) note("INFO", `${p.id} has price but no etsy link`);
  if (!["stock", "onRequest"].includes(p.leadTime)) note("ERR", `${p.id} leadTime ${p.leadTime}`);
  if (p.leadTime === "stock" && !p.variants.some(v => v.price)) note("WARN", `${p.id} stock but no price`);
}
// sheet prices vs catalogue
for (const [id, list] of Object.entries(PR.items)) { if (!ids.has(id)) note("ERR", `prices.js unknown ${id}`); const p = P.find(x => x.id === id); if (p && list.length !== p.variants.length) note("ERR", `prices.js ${id} length`); }
for (const p of P) if (!PR.items[p.id]) note("WARN", `prices.js lacks ${p.id}`);
// links and images in HTML
for (const f of htmls) {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  [...h.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m => m[1]).forEach(u => { if (/^(https?:|mailto:)/.test(u) || u === "/alpine-home-concept/") return; const file = u.split("?")[0]; if (!exists(file)) note("ERR", `${f} broken ref ${u}`); });
  [...h.matchAll(/srcset="([^"]+)"/g)].forEach(m => m[1].split(",").forEach(s => { const u = s.trim().split(" ")[0]; if (!exists(u)) note("ERR", `${f} broken srcset ${u}`); }));
  const idsIn = [...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]); idsIn.forEach((x, i) => { if (idsIn.indexOf(x) !== i) note("ERR", `${f} duplicate id ${x}`); });
  [...h.matchAll(/<img\b[^>]*>/g)].forEach(m => { if (!/\salt=/.test(m[0])) note("ERR", `${f} img without alt`); if (!/width=/.test(m[0])) note("WARN", `${f} img without width/height`); });
  if ((h.match(/<h1\b/g) || []).length > 1) note("ERR", `${f} more than one h1`);
  if (!/<h1\b/.test(h) && f !== "product.html") note("WARN", `${f} no static h1`);
  [...h.matchAll(/aria-(?:labelledby|describedby|controls)="([^"]+)"/g)].forEach(m => m[1].split(" ").forEach(x => { if (!idsIn.includes(x)) note("ERR", `${f} aria ref to missing id ${x}`); }));
  [...h.matchAll(/<label for="([^"]+)"/g)].forEach(m => { if (!idsIn.includes(m[1])) note("ERR", `${f} label for missing ${m[1]}`); });
  if (!/Content-Security-Policy/.test(h)) note("ERR", `${f} no CSP`);
  if (/\son[a-z]+="|\sstyle="|<script(?![^>]*src)/.test(h)) note("ERR", `${f} inline handler/style/script (CSP would block)`);
}
[...app.matchAll(/href: "([a-z]+\.html)/g)].forEach(m => { if (!exists(m[1])) note("ERR", `app.js link ${m[1]}`); });
// orphan images
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const all = walk(path.join(ROOT, "img")).map(f => path.relative(ROOT, f));
const htmlAll = htmls.map(f => fs.readFileSync(path.join(ROOT, f), "utf8")).join("") + fs.readFileSync(path.join(ROOT, "assets/css/main.css"), "utf8");
const orphans = all.filter(f => !refImgs.has(f) && !htmlAll.includes(f));
if (orphans.length) note("INFO", `orphan images: ${orphans.length} e.g. ${orphans.slice(0, 5).join(", ")}`);
const sizes = all.map(f => [fs.statSync(path.join(ROOT, f)).size, f]).sort((a, b) => b[0] - a[0]);
note("INFO", `images: ${all.length} files, largest ${sizes.slice(0, 3).map(s => Math.round(s[0] / 1024) + "KB " + s[1]).join("; ")}; >400KB: ${sizes.filter(s => s[0] > 400e3).length}`);
// boot.js must know the same languages as config.js, and load first on every page
const bootSrc = fs.readFileSync(path.join(ROOT, "assets/js/boot.js"), "utf8");
const bootLangs = JSON.parse((bootSrc.match(/SUPPORTED = (\[[^\]]+\])/) || [0, "[]"])[1]);
if (bootLangs.join() !== langs.join()) note("ERR", `boot.js languages ${bootLangs} differ from config ${langs}`);
let previewPages = 0;
for (const f of htmls) {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  const head = h.split("</head>")[0];
  if (!/<script src="assets\/js\/boot\.js"><\/script>/.test(head)) note("ERR", `${f} does not load boot.js in <head>`);
  if (/PREVIEW MODE/.test(h)) previewPages++;
  if (!/rel="apple-touch-icon"/.test(head)) note("WARN", `${f} no apple-touch-icon`);
}
if (previewPages) note("WARN", `PREVIEW MODE: ${previewPages} pages are hidden from search engines (noindex). Remove those lines at launch.`);
// rates
if (!(R.rates.USD > 0.5 && R.rates.CHF > 0.5)) note("ERR", "rates");
// config placeholders
if (C.instagram === "https://www.instagram.com/") note("WARN", "config.instagram is a placeholder (links to instagram home)");
for (const k of ["company", "address", "uid"]) if (!C[k]) note("WARN", `config.${k} empty (imprint)`);
const order = { ERR: 0, WARN: 1, INFO: 2 };
issues.sort((a, b) => order[a.split(" ")[0]] - order[b.split(" ")[0]]);
console.log(issues.join("\n"));
if (issues.some(i => i.startsWith("ERR"))) process.exitCode = 1; console.log(`\n${P.length} products, ${imgCount} image refs, ${keys.size} keys x ${Object.keys(I).length} langs`);
