/* HOHO Tour UI sounds. Two tiny sounds (card slide, popup open), synthesized
   with the Web Audio API: no audio files, no third-party samples, nothing to
   license. Quiet by design. Starts only after a user gesture (autoplay and iOS
   rules), stays off under prefers-reduced-motion, and has a mute toggle kept in
   localStorage ("hh-sfx" = "off"). */
(function () {
  'use strict';
  try {
    var mq = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) { window.HHSfx = { off: true, plays: 0 }; return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    var KEY = 'hh-sfx', VOL = 0.5, ctx = null, master = null, noise = null;
    var lastGesture = 0, lastPlay = {}, api = { plays: 0, muted: false };
    function stored() { try { return localStorage.getItem(KEY) === 'off'; } catch (e) { return false; } }
    api.muted = stored();

    function unlock() {
      lastGesture = Date.now();
      if (!ctx) {
        try { ctx = new AC(); } catch (e) { return; }
        master = ctx.createGain(); master.gain.value = VOL; master.connect(ctx.destination);
        var len = ctx.sampleRate * 0.3, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        noise = buf;
        var s = ctx.createBufferSource(); s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate); s.connect(ctx.destination); s.start(0); // iOS unlock
      }
      if (ctx.state === 'suspended') ctx.resume();
    }
    ['pointerdown', 'touchend', 'keydown', 'click'].forEach(function (ev) {
      window.addEventListener(ev, unlock, { passive: true, capture: true });
    });

    function ok(name, gap) {
      if (api.muted || !ctx || ctx.state !== 'running') return false;
      if (Date.now() - lastGesture > 4000) return false; // only as a result of a recent user action
      var t = Date.now(); if (lastPlay[name] && t - lastPlay[name] < gap) return false;
      lastPlay[name] = t; api.plays++; return true;
    }
    // soft paper/wood slide: short band-passed noise sweep
    function slide() {
      if (!ok('slide', 110)) return;
      var t0 = ctx.currentTime, src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = noise; f.type = 'bandpass'; f.Q.value = 0.9;
      var base = 700 + Math.random() * 200;
      f.frequency.setValueAtTime(base, t0); f.frequency.exponentialRampToValueAtTime(base * 2.1, t0 + 0.16);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
      src.connect(f); f.connect(g); g.connect(master); src.start(t0); src.stop(t0 + 0.22);
    }
    // gentle pop: short sine drop
    function pop() {
      if (!ok('pop', 160)) return;
      var t0 = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(640, t0); o.frequency.exponentialRampToValueAtTime(360, t0 + 0.09);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.2, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
      o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + 0.16);
    }
    api.play = function (n) { if (n === 'slide') slide(); else if (n === 'pop') pop(); };

    // popups: menus (aria-expanded -> true) and map popups (.leaflet-popup added)
    if (window.MutationObserver) {
      new MutationObserver(function (list) {
        for (var i = 0; i < list.length; i++) {
          var m = list[i];
          if (m.type === 'attributes' && m.attributeName === 'aria-expanded' && m.target.getAttribute('aria-expanded') === 'true' &&
              m.target.matches && m.target.matches('[aria-haspopup],.nav-toggle,#quick-reg-btn')) { pop(); return; }
          if (m.type === 'childList') for (var j = 0; j < m.addedNodes.length; j++) {
            var n = m.addedNodes[j];
            if (n.nodeType === 1 && n.classList && n.classList.contains('leaflet-popup')) { pop(); return; }
          }
        }
      }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-expanded'] });
    }

    // mute toggle
    function mk() {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'sfx-toggle';
      function paint() {
        b.setAttribute('aria-pressed', String(!api.muted));
        b.setAttribute('aria-label', api.muted ? 'Sound effects off. Turn on' : 'Sound effects on. Turn off');
        b.title = api.muted ? 'Sound off' : 'Sound on';
        b.innerHTML = api.muted
          ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>'
          : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
      }
      b.addEventListener('click', function () {
        api.muted = !api.muted;
        try { localStorage.setItem(KEY, api.muted ? 'off' : 'on'); } catch (e) {}
        paint(); if (!api.muted) { unlock(); setTimeout(pop, 30); }
      });
      paint(); document.body.appendChild(b);
    }
    if (document.body) mk(); else document.addEventListener('DOMContentLoaded', mk);
    window.HHSfx = api;
  } catch (e) { /* sound is optional; page unaffected */ }
})();
