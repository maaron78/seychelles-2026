/* Minimal progressive enhancement: rate note, tickable lists, countdown. Forint prices are static HTML (build output). */
(function () {
  "use strict";
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // 2. Tickable lists, saved per browser
  var store = (function () { try { localStorage.setItem("_t", "1"); localStorage.removeItem("_t"); return localStorage; } catch (e) { return null; } })();
  var KEY = "seychelle-2026:";
  $("input[type=checkbox][data-k]").forEach(function (cb) {
    if (store && store.getItem(KEY + cb.dataset.k) === "1") cb.checked = true;
    cb.addEventListener("change", function () {
      if (store) store.setItem(KEY + cb.dataset.k, cb.checked ? "1" : "0");
      progress();
    });
  });
  function progress() {
    $("[data-progress]").forEach(function (bar) {
      var boxes = $("input[data-k]", document.querySelector(bar.dataset.progress));
      var done = boxes.filter(function (b) { return b.checked; }).length;
      bar.firstElementChild.style.width = (boxes.length ? 100 * done / boxes.length : 0) + "%";
      var label = bar.parentNode.querySelector("[data-progress-label]");
      if (label) label.textContent = done + " / " + boxes.length + " kész";
    });
  }
  progress();

  // 3. Countdown and "today" marker (Budapest date, trip 2026-11-16..25)
  var today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Budapest" });
  var DAY = 864e5, start = Date.parse("2026-11-16"), end = Date.parse("2026-11-25"), now = Date.parse(today);
  var c = document.querySelector("[data-countdown]");
  if (c) {
    if (now < start) { var n = Math.round((start - now) / DAY); c.textContent = n + " nap az indulásig"; }
    else if (now <= end) { c.textContent = (Math.round((now - start) / DAY) + 1) + ". nap az útból"; }
  }
  $("[data-date]").forEach(function (d) { if (d.dataset.date === today) d.classList.add("today"); });
})();
