/* HOHO Tour motion (2026-11-28 masthead + photo-grid redesign). Vanilla JS.
   1) Scroll reveal fallback. Browsers with CSS scroll-driven animations
      (animation-timeline: view()) animate [data-reveal] purely in CSS, so this
      script does nothing for them. Elsewhere an IntersectionObserver adds
      .is-visible once and html.reveal-io lets CSS play a short rise.
      Content is NEVER hidden: nothing here or in the CSS touches opacity, so
      no-JS, a JS error or an unscrolled screenshot always shows everything.
   2) 3D card tilt + cursor sheen on [data-tilt] cards (feature pair and
      guide cards). Fine pointer only, off under prefers-reduced-motion.
      data-tilt="2" = max 2deg (big feature photos), default 3deg.
      rAF-throttled; will-change only while the pointer is on a card. */
(function () {
  'use strict';
  try {
    var root = document.documentElement;
    root.classList.add('js');
    var mm = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
    var reduceMotion = mm('(prefers-reduced-motion: reduce)');
    var finePointer = mm('(hover: hover) and (pointer: fine)');
    var cssTimeline = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));

    /* ---- 1) Scroll reveal fallback ---- */
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (targets.length && !reduceMotion && !cssTimeline && 'IntersectionObserver' in window) {
      root.classList.add('reveal-io');
      var groups = new Map();
      targets.forEach(function (el) {
        var parent = el.parentElement;
        var n = groups.get(parent) || 0;
        el.style.setProperty('--reveal-delay', Math.min(n * 60, 240) + 'ms');
        groups.set(parent, n + 1);
      });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- 2) Card tilt + cursor sheen ---- */
    if (finePointer && !reduceMotion) {
      var cards = Array.prototype.slice.call(document.querySelectorAll('[data-tilt]'));
      cards.forEach(function (card) {
        var max = parseFloat(card.getAttribute('data-tilt'));
        if (!(max > 0)) max = 3;
        max = Math.min(max, 4);
        var raf = 0, last = null;
        function apply() {
          raf = 0;
          if (!last) return;
          var r = card.getBoundingClientRect();
          if (!r.width || !r.height) return;
          var px = Math.min(Math.max((last.x - r.left) / r.width, 0), 1);
          var py = Math.min(Math.max((last.y - r.top) / r.height, 0), 1);
          var rx = (0.5 - py) * 2 * max;
          var ry = (px - 0.5) * 2 * max;
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');

          card.style.transform =
            'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
        }
        card.addEventListener('pointerenter', function () {
          card.style.willChange = 'transform';
          card.style.transition = 'transform 120ms ease-out';
        });
        card.addEventListener('pointermove', function (e) {
          last = { x: e.clientX, y: e.clientY };
          if (!raf) raf = requestAnimationFrame(apply);
        });
        card.addEventListener('pointerleave', function () {
          if (raf) cancelAnimationFrame(raf);
          raf = 0; last = null;
          card.style.transition = 'transform 240ms cubic-bezier(.22,.61,.36,1)';
          card.style.transform = '';
          card.style.willChange = '';
        });
      });
    }
  } catch (err) {
    /* Motion is decorative: all content is already visible without it. */
  }
})();
