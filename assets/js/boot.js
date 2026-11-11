/* =========================================================================
   Alpine Home Concept · BOOT (tiny, loads first, before the page is drawn)
   -------------------------------------------------------------------------
   The HTML files contain the English texts. For a visitor who will get
   German, French or Turkish, this hides those English texts for the split
   second until app.js has filled in the right language, so nobody sees the
   page "jump" from English to their language.

   Safety: English visitors and visitors without JavaScript are not affected,
   and after 1.5 seconds the texts are shown in any case.
   The language rule here must stay the same as detectLang() in app.js
   (tests/audit.js checks the language list).
   ========================================================================= */
(function () {
  "use strict";
  var SUPPORTED = ["en", "de", "fr", "tr"];
  var root = document.documentElement;
  var candidates = [];
  try {
    var m = /[?&]lang=([a-z]{2})(?:&|$)/.exec(window.location.search);
    if (m) candidates.push(m[1]);
  } catch (e) { /* ignore */ }
  try { candidates.push(window.localStorage.getItem("ahc-lang")); } catch (e) { /* storage blocked */ }
  var browser = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  for (var i = 0; i < browser.length; i++) candidates.push(String(browser[i]).slice(0, 2).toLowerCase());

  var pick = "en";
  for (var j = 0; j < candidates.length; j++) {
    if (SUPPORTED.indexOf(candidates[j]) > -1) { pick = candidates[j]; break; }
  }
  if (pick === "en") return;
  root.lang = pick;
  root.classList.add("i18n-pending");
  window.setTimeout(function () { root.classList.remove("i18n-pending"); }, 1500);
})();
