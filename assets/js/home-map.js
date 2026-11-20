/* home-map.js - client-side card filter for the home map and region hubs.
   Markup contract (see layouts/partials/home-map.html and region-hub.html):
   [data-filter-root]
     data-filter-attr     card attribute to match: "region" -> data-region, "themes" -> data-themes (space list)
     data-filter-items    selector of the card container (default: inside root)
     data-filter-heading  selector of the heading to rewrite (optional)
     data-heading-all / data-heading-one ("{name}" is replaced)
   controls: any [data-filter-value] inside root (buttons, svg paths, map pins); "" = show all
   cards:    [data-filter-item] inside the container
   No dependencies, no network. */
(function () {
  "use strict";
  function qs(sel, ctx) { return sel ? (ctx || document).querySelector(sel) : null; }

  function setup(root) {
    var attr = root.getAttribute("data-filter-attr") || "region";
    var container = qs(root.getAttribute("data-filter-items")) || root;
    var heading = qs(root.getAttribute("data-filter-heading"));
    var status = qs("[data-filter-status]", root);
    var empty = qs("[data-filter-empty]", container.parentNode || root);
    var highlight = qs(".prov-highlight", root);
    var headAll = root.getAttribute("data-heading-all") || (heading ? heading.textContent : "");
    var headOne = root.getAttribute("data-heading-one") || "{name}";
    /* KR status templates (data-status-all / data-status-one, rendered only
       on KR pages): "{n}" is the count, "{name}" the region label. EN pages
       have no such attributes and keep the English strings below. */
    var statusAll = root.getAttribute("data-status-all");
    var statusOne = root.getAttribute("data-status-one");
    var items = Array.prototype.slice.call(container.querySelectorAll("[data-filter-item]"));
    var controls = Array.prototype.slice.call(root.querySelectorAll("[data-filter-value]"));
    var current = "";

    var bar = qs("[data-filter-controls]", root);
    if (bar) bar.hidden = false;
    root.classList.add("is-interactive");

    function labelFor(value) {
      for (var i = 0; i < controls.length; i++) {
        if (controls[i].getAttribute("data-filter-value") === value && controls[i].getAttribute("data-filter-label")) {
          return controls[i].getAttribute("data-filter-label");
        }
      }
      return value;
    }

    function apply(value) {
      // Clicking the selected region again resets to all.
      if (value === current && value !== "") value = "";
      current = value;
      var shown = 0;
      items.forEach(function (el) {
        var tokens = (el.getAttribute("data-" + attr) || "").split(/\s+/);
        var match = value === "" || tokens.indexOf(value) !== -1;
        el.hidden = !match;
        if (match) shown++;
      });
      controls.forEach(function (c) {
        var on = c.getAttribute("data-filter-value") === value;
        c.classList.toggle("is-selected", on);
        if (c.hasAttribute("aria-pressed")) c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (highlight) {
        var path = value ? qs('path.prov[data-filter-value="' + value + '"]', root) : null;
        if (path) { highlight.setAttribute("href", "#" + path.id); highlight.removeAttribute("display"); }
        else { highlight.setAttribute("display", "none"); }
      }
      var name = value ? labelFor(value) : "";
      if (heading) heading.textContent = value ? headOne.replace("{name}", name) : headAll;
      if (status) {
        if (statusAll && statusOne) {
          status.textContent = value
            ? statusOne.replace("{name}", name).replace("{n}", String(shown))
            : statusAll.replace("{n}", String(items.length));
        } else {
          status.textContent = value
            ? shown + " guide" + (shown === 1 ? "" : "s") + " in " + name + "."
            : "Showing all " + items.length + " guides.";
        }
      }
      if (empty) empty.hidden = shown !== 0;
      root.setAttribute("data-filter-current", value);
    }

    root.addEventListener("click", function (e) {
      var c = e.target.closest ? e.target.closest("[data-filter-value]") : null;
      if (!c || !root.contains(c)) return;
      e.preventDefault();
      apply(c.getAttribute("data-filter-value"));
    });
    root.addEventListener("keydown", function (e) {
      var c = e.target;
      if (!c || !c.hasAttribute || !c.hasAttribute("data-filter-value")) return;
      if (c.tagName === "BUTTON") return; // native buttons already fire click on Enter/Space
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        apply(c.getAttribute("data-filter-value"));
      }
    });

    apply("");
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-filter-root]"), setup);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
