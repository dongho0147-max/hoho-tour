/* HOHO Tour UI sounds. Two tiny sounds (page-flip swish for card slide, popup open), synthesized
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
    var KEY = 'hh-sfx', VOL = 0.35, ctx = null, master = null, noise = null;
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

    // One voice at a time. A new sound fades the previous one out (20ms) and replaces it;
    // anything arriving within GAP ms of the last sound is dropped, so rapid taps, drags
    // and carousel changes never stack or buzz.
    var GAP = 160, lastAny = 0, cur = null;
    function ok() {
      if (api.muted || !ctx || ctx.state !== 'running') return false;
      if (Date.now() - lastGesture > 2500) return false; // only as a result of a recent user action
      var t = Date.now(); if (t - lastAny < GAP) return false;
      lastAny = t; api.plays++; return true;
    }
    function stopCur() {
      if (!cur) return;
      try { var t = ctx.currentTime; cur.g.gain.cancelScheduledValues(t); cur.g.gain.setTargetAtTime(0.0001, t, 0.008); cur.nodes.forEach(function (n) { try { n.stop(t + 0.04); } catch (e) {} }); } catch (e) {}
      cur = null;
    }
    // slide: soft airy whoosh. Low-passed noise, 300-900Hz band, slow attack, ~200ms. Nothing above ~1.2kHz.
    function slide() {
      if (!ok()) return;
      stopCur();
      var t0 = ctx.currentTime, src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = noise; src.playbackRate.value = 0.9 + Math.random() * 0.2;
      bp.type = 'bandpass'; bp.Q.value = 0.8; bp.frequency.setValueAtTime(380, t0); bp.frequency.exponentialRampToValueAtTime(820, t0 + 0.2);
      lp.type = 'lowpass'; lp.frequency.value = 1200;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
      src.connect(bp); bp.connect(lp); lp.connect(g); g.connect(master); src.start(t0, Math.random() * 0.05); src.stop(t0 + 0.24);
      cur = { g: g, nodes: [src] };
    }
    // popup: soft sine blip, gentle attack, low-passed.
    function pop() {
      if (!ok()) return;
      stopCur();
      var t0 = ctx.currentTime, o = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(520, t0); o.frequency.exponentialRampToValueAtTime(400, t0 + 0.1);
      lp.type = 'lowpass'; lp.frequency.value = 1500;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.1, t0 + 0.014); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
      o.connect(lp); lp.connect(g); g.connect(master); o.start(t0); o.stop(t0 + 0.18);
      cur = { g: g, nodes: [o] };
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
