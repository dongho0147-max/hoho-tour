/* HOHO Tour motion (2026-11-19, BUILD_LOG 20절). Vanilla JS, no library.
   Two jobs, both cheap by design:
   1) Scroll reveal: IntersectionObserver adds .is-visible once. The CSS
      hides .reveal only under html.js (added below), so a JS failure or
      no-JS never leaves content invisible. transform/opacity only.
   2) Card tilt + cursor highlight: fine-pointer devices only. rAF-throttled
      pointermove writes rotateX/rotateY (max 3deg) + translateY(-4px) and
      --mx/--my for the radial glow in style.css. will-change is set only
      while the pointer is over a card, never on the whole list.
   Reduced motion: matchMedia gate - no observer classes are needed because
   the CSS forces .reveal visible under prefers-reduced-motion, and the tilt
   never starts (pointer check + reduced-motion check). */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- 1) Scroll reveal ---- */
  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (targets.length && 'IntersectionObserver' in window && !reduceMotion) {
    // Stagger inside each parent group: index x 60ms, capped at 300ms.
    // (Map keyed by the parent element itself - a plain object would
    // collapse every parent to "[object HTMLDivElement]".)
    var groups = new Map();
    targets.forEach(function (el) {
      var parent = el.parentElement;
      var n = groups.get(parent) || 0;
      el.style.setProperty('--reveal-delay', Math.min(n * 60, 300) + 'ms');
      groups.set(parent, n + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    // Reduced motion or no IO support: show everything immediately.
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- 2) Card tilt + cursor highlight ---- */
  if (finePointer && !reduceMotion) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
    cards.forEach(function (card) {
      var raf = 0, last = null;
      function apply() {
        raf = 0;
        if (!last) return;
        var r = card.getBoundingClientRect();
        var px = (last.x - r.left) / r.width;
        var py = (last.y - r.top) / r.height;
        var rx = (0.5 - py) * 6; // max +/-3deg
        var ry = (px - 0.5) * 6;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.transform =
          'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
      }
      card.addEventListener('pointerenter', function () {
        card.style.willChange = 'transform';
        card.style.transition = 'box-shadow 240ms cubic-bezier(.22,.61,.36,1), border-color 240ms cubic-bezier(.22,.61,.36,1), transform 120ms ease-out';
      });
      card.addEventListener('pointermove', function (e) {
        last = { x: e.clientX, y: e.clientY };
        if (!raf) raf = requestAnimationFrame(apply);
      });
      card.addEventListener('pointerleave', function () {
        if (raf) cancelAnimationFrame(raf);
        raf = 0; last = null;
        card.style.transform = '';
        card.style.transition = '';
        card.style.willChange = '';
      });
    });
  }
})();
