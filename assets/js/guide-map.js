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
      markers[p.id] = m;
      all.push(m);
    });

    var current = '';
    function visible() {
      return all.filter(function (m) { return !current || m._gmRegion === current; });
    }
    function fit() {
      var v = visible();
      if (!v.length) return;
      var b = L.latLngBounds(v.map(function (m) { return m.getLatLng(); }));
      map.fitBounds(b, { padding: [28, 28], maxZoom: 13, animate: !reduceMotion });
    }
    function setStatus() {
      if (!statusEl) return;
      var tpl = statusEl.getAttribute('data-template') || '%d';
      statusEl.textContent = tpl.replace('%d', String(visible().length));
    }
    function apply() {
      all.forEach(function (m) {
        var on = !current || m._gmRegion === current;
        if (on && !map.hasLayer(m)) m.addTo(map);
        if (!on && map.hasLayer(m)) map.removeLayer(m);
      });

      var buttons = document.querySelectorAll('[data-region-filter]');
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-region-filter') === current));
      });
      setStatus();
      fit();
    }

    document.addEventListener('click', function (e) {
      var f = e.target.closest && e.target.closest('[data-region-filter]');
      if (f) {
        current = f.getAttribute('data-region-filter') || '';
        map.closePopup();
        apply();
        return;
      }
      var s = e.target.closest && e.target.closest('[data-pin]');
      if (s) {
        var m = markers[s.getAttribute('data-pin')];
        if (!m) return;
        if (current && m._gmRegion !== current) { current = ''; apply(); }
        mapEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        map.setView(m.getLatLng(), Math.max(map.getZoom(), 14), { animate: !reduceMotion });
        m.openPopup();
      }
    });

    apply();
    /* Leaflet measures the container on init; re-measure once layout settles
       (fonts, sticky header) so tiles never stay grey at the edges. */
    window.setTimeout(function () { map.invalidateSize(); fit(); }, 200);
  } catch (err) {

    fail();
  }
})();
