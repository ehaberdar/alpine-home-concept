/* =========================================================================
   Alpine Home Concept · HERO CONTOURS
   -------------------------------------------------------------------------
   Draws topographic contour lines (like a swisstopo map) that radiate from
   the table in the hero photo. Every 5th line is an "index contour", drawn
   heavier, as on Swiss maps; one of them carries 372, the altitude of
   Lac Léman, after which the pictured table is named.

   The centre follows the photo: set data-focus-x / data-focus-y (0..1) on
   the <figure class="hero-figure"> to the table's position in the image.
   Lines draw in once on load; skipped when the visitor prefers reduced motion.
   ========================================================================= */
(function () {
  "use strict";
  var svg = document.querySelector(".hero-contours");
  var hero = document.querySelector(".hero");
  var figure = document.querySelector(".hero-figure");
  if (!svg || !hero || !figure) return;

  var NS = "http://www.w3.org/2000/svg";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var drawn = false;

  // Smooth closed path through points (Catmull-Rom -> cubic Bézier)
  function closedPath(pts) {
    var n = pts.length, d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += "C" + c1x.toFixed(1) + " " + c1y.toFixed(1) + " " + c2x.toFixed(1) + " " + c2y.toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    return d + "Z";
  }

  function draw() {
    var hb = hero.getBoundingClientRect();
    var img = figure.querySelector("img");
    var fb = (img || figure).getBoundingClientRect();
    var w = hb.width, h = hb.height;
    var fx = parseFloat(figure.getAttribute("data-focus-x") || "0.5");
    var fy = parseFloat(figure.getAttribute("data-focus-y") || "0.6");
    var cx = fb.left - hb.left + fb.width * fx;
    var cy = fb.top - hb.top + fb.height * fy;

    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) * 1.05;
    var step = Math.max(18, Math.min(30, w / 52));
    var rings = Math.ceil(maxR / step);
    var points = 90;
    var labelRing = 15;

    for (var k = 3; k < rings; k++) {
      var r = k * step;
      var pts = [];
      for (var i = 0; i < points; i++) {
        var a = (i / points) * Math.PI * 2;
        // terrain-like wobble that grows with distance from the summit
        var wob = 1
          + 0.06 * Math.sin(2 * a + 0.9 + k * 0.11)
          + 0.035 * Math.sin(3 * a + 2.1 - k * 0.07)
          + 0.02 * Math.sin(5 * a + k * 0.23)
          + 0.012 * Math.sin(9 * a + 1.3 + k * 0.4);
        pts.push([cx + Math.cos(a) * r * 1.42 * wob, cy + Math.sin(a) * r * 0.86 * wob]);
      }
      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", closedPath(pts));
      if (k % 5 === 0) path.setAttribute("class", "index");
      if (k === labelRing) path.setAttribute("id", "contour-label");
      svg.appendChild(path);

      if (!reduce && !drawn) {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        path.getBoundingClientRect(); // commit start state
        path.style.transition = "stroke-dashoffset " + (1.6 + k * 0.035) + "s cubic-bezier(.3,.6,.2,1) " + (k * 0.045) + "s";
        path.style.strokeDashoffset = "0";
      }
    }

    // Altitude label on one index contour
    if (rings > labelRing) {
      var text = document.createElementNS(NS, "text");
      var tp = document.createElementNS(NS, "textPath");
      tp.setAttribute("href", "#contour-label");
      tp.setAttribute("startOffset", "8%");
      tp.textContent = "372";
      text.appendChild(tp);
      svg.appendChild(text);
    }
    drawn = true;
  }

  // Draw once the photo has its size, redraw on resize (without animation)
  function ready() {
    var img = figure.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", draw, { once: true });
    else draw();
  }
  var timer;
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(draw, 150); });
  document.addEventListener("ahc:rendered", function () { if (drawn) draw(); });
  // The web font changes the headline's size a moment after load: realign the lines
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (drawn) draw(); });
  ready();
})();
