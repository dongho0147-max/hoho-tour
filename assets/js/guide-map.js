/* guide-map.js (2026-11-28): the /map/ page (layouts/_default/map.html).
   Reads the build-time pin list from #guide-map-data, draws it on a Leaflet
   map with OpenStreetMap tiles, and wires the region filter buttons and the
   "show on map" buttons in the place list.
   - Tile URL and attribution come from data attributes on #guide-map, so they
     can be changed in the template without touching this file.
   - Markers are keyboard-focusable (Leaflet keyboard option): Tab to a pin,
     Enter opens its popup. Scroll-wheel zoom is enabled only after the map is
     clicked or focused, so the page scroll is never hijacked.
   - Any failure (Leaflet missing, bad data) leaves the map hidden and the
     no-JS note + full place list visible. */
(function () {
  'use strict';
  var mapEl = document.getElementById('guide-map');
  var dataEl = document.getElementById('guide-map-data');
  var noteEl = document.querySelector('[data-gm-nojs]');
  var statusEl = document.querySelector('[data-gm-status]');
  if (!mapEl || !dataEl) return;

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fail() {
    mapEl.hidden = true;
    if (noteEl) noteEl.hidden = false;
  }

  try {
    if (typeof L === 'undefined') { fail(); return; }
    var pins = JSON.parse(dataEl.textContent || '[]');

    if (!pins.length) { fail(); return; }

    var TILE_URL = mapEl.getAttribute('data-tile-url') || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    var ATTRIBUTION = mapEl.getAttribute('data-attribution') || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    var READ_LABEL = mapEl.getAttribute('data-read-label') || 'Read the guide';
    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    mapEl.hidden = false;
    if (noteEl) noteEl.hidden = true;

    var map = L.map(mapEl, { scrollWheelZoom: false, keyboard: true, zoomSnap: 0.5 });
    L.tileLayer(TILE_URL, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(map);
    map.on('focus click', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });
    mapEl.addEventListener('mouseleave', function () { map.scrollWheelZoom.disable(); });

    var markers = {};
    var all = [];
    pins.forEach(function (p) {
      var icon = L.divIcon({
        className: 'gm-pin',
        html: '<span style="--pin:' + esc(p.color) + '"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, title: p.name + ' - ' + p.post, keyboard: true, riseOnHover: true });
      var html = '<div class="gm-popup">' +
        (p.thumb ? '<img src="' + esc(p.thumb) + '" alt="" width="72" height="54" loading="lazy">' : '') +
        '<div><span class="gm-popup__label">' + esc(p.regionName) + '</span>' +
        '<span class="gm-popup__name">' + esc(p.name) + '</span>' +
        (p.note ? '<span class="gm-popup__note">' + esc(p.note) + '</span>' : '') +

        '<a href="' + esc(p.url) + '">' + esc(READ_LABEL) + ': ' + esc(p.post) + '</a></div></div>';
      m.bindPopup(html, { maxWidth: 280, autoPanPadding: [16, 16] });
      m.on('add', function () {
        var el = m.getElement();
        if (el) el.setAttribute('aria-label', p.name + ' - ' + p.post);
      });
      m._gmRegion = p.region;
      m._gmUrl = p.url;
      markers[p.id] = m;
      all.push(m);
    });

    /* ---- Region drill-down (2026-11-28) ----
       Overview: one titled badge per region (name + number of places) and a
       faint route line per guide. Click a badge (or a region chip): the map
       zooms to that region, the badges go away, and the real pins and route
       lines of that region appear. The "All regions" control goes back. */
    var current = '', sel = '';
    var BACK = mapEl.getAttribute('data-back-label') || 'All regions';
    var ALLP = mapEl.getAttribute('data-all-posts-label') || 'Whole region';
    var PTITLE = mapEl.getAttribute('data-posts-title') || 'Guides here';
    var SLAB = mapEl.getAttribute('data-stops-label') || 'places';
    var OV = mapEl.getAttribute('data-overview-tpl') || '%d regions';
    var regions = {}, order = [];
    var posts = {};
    pins.forEach(function (p) {
      var r = regions[p.region];
      if (!r) { r = regions[p.region] = { slug: p.region, name: p.regionName, color: p.color, pts: [] }; order.push(r); }
      r.pts.push(p);
      (posts[p.url] = posts[p.url] || { url: p.url, title: p.post, region: p.region, color: p.color, pts: [] }).pts.push(p);
    });
    function median(a) { var b = a.slice().sort(function (x, y) { return x - y; }); return b[Math.floor(b.length / 2)]; }
    /* Real geographic anchors where the median of a region's stops is not where
       people expect the badge (Daejeon city, and the middle of North/South
       Chungcheong, kept clear of Daejeon). */
    var ANCHOR = { daejeon: [36.3504, 127.3845], chungcheong: [36.78, 127.05] };
    order.forEach(function (r) {
      r.center = ANCHOR[r.slug] || [median(r.pts.map(function (p) { return p.lat; })), median(r.pts.map(function (p) { return p.lng; }))];
    });
    var lineLayer = L.layerGroup().addTo(map);
    var badgeLayer = L.layerGroup().addTo(map);
    var badges = [];
    order.forEach(function (r) {
      var icon = L.divIcon({
        className: 'gm-region-icon',
        html: '<span class="gm-region" style="--pin:' + esc(r.color) + '"><b>' + esc(r.name) + '</b><i>' + r.pts.length + '</i></span>',
        iconSize: [0, 0]
      });
      var m = L.marker(r.center, { icon: icon, keyboard: true, title: r.name + ' (' + r.pts.length + ')', riseOnHover: true });
      m.on('click', function () { go(r.slug); });
      m.on('add', function () {
        var el = m.getElement();
        if (el) { el.setAttribute('role', 'button'); el.setAttribute('aria-label', r.name + ' (' + r.pts.length + ')'); }
      });
      m._base = L.latLng(r.center);
      m._len = (r.name.length * 9 + 44);
      m._n = r.pts.length;
      badges.push(m);
    });
    /* Nudge overlapping badges (Seoul / Incheon / Suwon sit close together). */
    function spread() {
      var placed = [];
      badges.slice().sort(function (a, b) { return b._n - a._n; }).forEach(function (m) {
        var base = map.latLngToLayerPoint(m._base), dy = 0, tries = 0;
        function hit(pt) {
          return placed.some(function (q) { return Math.abs(q.x - pt.x) < (q.w + m._len) / 2 && Math.abs(q.y - pt.y) < 32; });
        }
        var pt = L.point(base.x, base.y);
        while (hit(pt) && tries < 12) {
          tries++;
          dy = (tries % 2 ? 1 : -1) * Math.ceil(tries / 2) * 34;
          pt = L.point(base.x, base.y + dy);
        }
        placed.push({ x: pt.x, y: pt.y, w: m._len });
        m.setLatLng(map.layerPointToLatLng(pt));
      });
    }
    map.on('zoomend', function () { if (!current) spread(); });

    var back = L.control({ position: 'topright' });
    back.onAdd = function () {
      var b = L.DomUtil.create('button', 'gm-back');
      b.type = 'button'; b.textContent = '\u2190 ' + BACK; b.hidden = true;
      L.DomEvent.disableClickPropagation(b);
      L.DomEvent.on(b, 'click', function () { go(''); });
      return b;
    };
    back.addTo(map);
    var backEl = back.getContainer();

    function curvePts(a, b, n) {
      var k = Math.cos((a.lat + b.lat) * Math.PI / 360);
      var ax = a.lng * k, ay = a.lat, bx = b.lng * k, by = b.lat;
      var dx = bx - ax, dy = by - ay;
      var cx = (ax + bx) / 2 - dy * 0.16, cy = (ay + by) / 2 + dx * 0.16;
      var out = [];
      for (var i = 0; i <= n; i++) {
        var t = i / n, u = 1 - t;
        out.push(L.latLng(u * u * ay + 2 * u * t * cy + t * t * by, (u * u * ax + 2 * u * t * cx + t * t * bx) / k));
      }
      return out;
    }
    function drawLines() {
      lineLayer.clearLayers();
      if (!current || !sel || !posts[sel]) return;
      var po = posts[sel];
      if (po.pts.length < 2) return;
      var ll = po.pts.map(function (p) { return L.latLng(p.lat, p.lng); });
      for (var i = 0; i + 1 < ll.length; i++) {
        var c = curvePts(ll[i], ll[i + 1], 18), h = c.length >> 1;
        L.polyline(c, { color: po.color, weight: 3, opacity: 0.85, lineCap: 'round', interactive: false }).addTo(lineLayer);
        var p1 = map.latLngToContainerPoint(c[0]), p2 = map.latLngToContainerPoint(c[c.length - 1]);
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        if (Math.sqrt(dx * dx + dy * dy) < 54) continue;
        var q1 = map.latLngToContainerPoint(c[h - 1]), q2 = map.latLngToContainerPoint(c[h + 1]);
        var ang = Math.atan2(q2.y - q1.y, q2.x - q1.x) * 180 / Math.PI;
        L.marker(c[h], {
          interactive: false, keyboard: false, zIndexOffset: -500,
          icon: L.divIcon({ className: 'gm-arrow', iconSize: [18, 18], iconAnchor: [9, 9],
            html: '<svg viewBox="0 0 18 18" width="18" height="18" style="transform:rotate(' + ang.toFixed(1) + 'deg)" aria-hidden="true"><path d="M3 3l13 6-13 6 3-6z" fill="' + esc(po.color) + '" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>' })
        }).addTo(lineLayer);
      }
    }
    function fit() {
      var pts = current ? (sel && posts[sel] ? posts[sel].pts : regions[current].pts) : pins;
      var b = L.latLngBounds(pts.map(function (p) { return [p.lat, p.lng]; }));
      map.fitBounds(b, { padding: [36, 36], maxZoom: current ? (sel ? 15 : 13) : 7, animate: !reduceMotion });
    }
    function setStatus() {
      if (!statusEl) return;
      if (!current) { statusEl.textContent = OV.replace('%d', String(order.length)); return; }
      var tpl = statusEl.getAttribute('data-template') || '%d';
      statusEl.textContent = tpl.replace('%d', String(sel && posts[sel] ? posts[sel].pts.length : regions[current].pts.length));
    }
    var panel = document.createElement('div');
    panel.className = 'gm-panel';
    panel.hidden = true;
    mapEl.parentNode.insertBefore(panel, mapEl.nextSibling);
    function renderPanel() {
      if (!current) { panel.hidden = true; panel.innerHTML = ''; return; }
      var list = Object.keys(posts).map(function (u) { return posts[u]; }).filter(function (po) { return po.region === current; });
      var h = '<p class="gm-panel__title">' + esc(regions[current].name) + ' &middot; ' + esc(PTITLE) + '</p><ul class="gm-panel__list">';
      h += '<li><button type="button" class="gm-card' + (!sel ? ' is-on' : '') + '" data-gm-post="" style="--pin:' + esc(regions[current].color) + '"><b>' + esc(ALLP) + '</b><span>' + regions[current].pts.length + ' ' + esc(SLAB) + '</span></button></li>';
      list.forEach(function (po) {
        h += '<li><button type="button" class="gm-card' + (sel === po.url ? ' is-on' : '') + '" data-gm-post="' + esc(po.url) + '" style="--pin:' + esc(po.color) + '"><b>' + esc(po.title) + '</b><span>' + po.pts.length + ' ' + esc(SLAB) + '</span></button></li>';
      });
      panel.innerHTML = h + '</ul>';
      panel.hidden = false;
    }
    map.on('zoomend', function () { drawLines(); });
    function apply() {
      drawLines();
      renderPanel();
      all.forEach(function (m) {
        var on = !!current && m._gmRegion === current && (!sel || m._gmUrl === sel);
        if (on && !map.hasLayer(m)) m.addTo(map);
        if (!on && map.hasLayer(m)) map.removeLayer(m);
      });
      badgeLayer.clearLayers();
      if (!current) { badges.forEach(function (m) { badgeLayer.addLayer(m); }); }
      backEl.hidden = !current;
      var buttons = document.querySelectorAll('[data-region-filter]');
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-region-filter') === current));
      });
      var groups = document.querySelectorAll('[data-gm-group]');
      Array.prototype.forEach.call(groups, function (g) {
        g.hidden = !!current && g.getAttribute('data-gm-group') !== current;
      });
      setStatus();
      fit();
      if (!current) { spread(); window.setTimeout(spread, 450); }
    }
    function go(slug) { current = slug; sel = ''; map.closePopup(); apply(); }

    document.addEventListener('click', function (e) {
      var c = e.target.closest && e.target.closest('[data-gm-post]');
      if (c) {
        sel = c.getAttribute('data-gm-post') || '';
        map.closePopup();
        apply();
        mapEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
        return;
      }
      var f = e.target.closest && e.target.closest('[data-region-filter]');
      if (f) {
        go(f.getAttribute('data-region-filter') || '');
        return;
      }
      var s = e.target.closest && e.target.closest('[data-pin]');
      if (s) {
        var m = markers[s.getAttribute('data-pin')];
        if (!m) return;
        if (current !== m._gmRegion) { go(m._gmRegion); }
        mapEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        map.setView(m.getLatLng(), Math.max(map.getZoom(), 14), { animate: !reduceMotion });
        m.openPopup();
      }
    });

    apply();
    /* Leaflet measures the container on init; re-measure once layout settles
       (fonts, sticky header) so tiles never stay grey at the edges. */
    window.setTimeout(function () { map.invalidateSize(); fit(); if (!current) spread(); }, 200);
  } catch (err) {

    fail();
  }
})();
