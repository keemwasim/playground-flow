/* playground sound, prototype synth. placeholder voices for the eight ruled
   sounds in sound.md, synthesized so the flow can speak before the
   commissioned pack lands. same ids forever: real files swap in behind
   pgSound(id) with zero call-site changes. keem toggled sound ON 2026-07-23. */
(function () {
  let ctx = null;
  window.pgSoundOn = true;
  const ac = () => (ctx = ctx || new (window.AudioContext || window.webkitAudioContext)());

  const master = (c) => { const g = c.createGain(); g.gain.value = 0.22; g.connect(c.destination); return g; };

  function tone(c, out, { f = 440, type = 'sine', t0 = 0, a = 0.01, d = 0.3, g = 0.5, glide = null }) {
    const o = c.createOscillator(); const gn = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, c.currentTime + t0);
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, c.currentTime + t0 + d);
    gn.gain.setValueAtTime(0, c.currentTime + t0);
    gn.gain.linearRampToValueAtTime(g, c.currentTime + t0 + a);
    gn.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + d);
    o.connect(gn); gn.connect(out);
    o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + d + 0.05);
  }

  function noise(c, out, { t0 = 0, d = 0.4, g = 0.4, lpFrom = 2000, lpTo = null, hp = null }) {
    const len = Math.ceil(c.sampleRate * d);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(); src.buffer = buf;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(lpFrom, c.currentTime + t0);
    if (lpTo) lp.frequency.exponentialRampToValueAtTime(lpTo, c.currentTime + t0 + d);
    const gn = c.createGain();
    gn.gain.setValueAtTime(0, c.currentTime + t0);
    gn.gain.linearRampToValueAtTime(g, c.currentTime + t0 + d * 0.3);
    gn.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + d);
    let head = src;
    if (hp) { const h = c.createBiquadFilter(); h.type = 'highpass'; h.frequency.value = hp; src.connect(h); head = h; }
    head.connect(lp); lp.connect(gn); gn.connect(out);
    src.start(c.currentTime + t0);
  }

  const VOICES = {
    /* a wave closing overhead */
    engulf: (c, o) => { noise(c, o, { d: 0.9, g: 0.5, lpFrom: 300, lpTo: 2200 }); tone(c, o, { f: 70, d: 0.9, a: 0.25, g: 0.35, glide: 45 }); },
    /* ascending sparkle into the hush */
    dive: (c, o) => { tone(c, o, { f: 500, glide: 1800, d: 0.5, a: 0.02, g: 0.2 }); tone(c, o, { f: 2400, t0: 0.32, d: 0.18, g: 0.12, type: 'triangle' }); },
    /* a bubble surfacing */
    adopt: (c, o) => { tone(c, o, { f: 130, glide: 190, d: 0.45, a: 0.09, g: 0.4, type: 'sine' }); },
    /* porcelain struck once, damped */
    name: (c, o) => { tone(c, o, { f: 880, d: 0.28, a: 0.004, g: 0.25, type: 'triangle' }); tone(c, o, { f: 1760, d: 0.12, a: 0.004, g: 0.08, type: 'sine' }); },
    /* two low notes, wood and felt */
    home: (c, o) => { tone(c, o, { f: 196, d: 0.22, a: 0.01, g: 0.32 }); tone(c, o, { f: 147, t0: 0.18, d: 0.3, a: 0.01, g: 0.32 }); },
    /* knuckle on wood, twice */
    knock: (c, o) => { noise(c, o, { d: 0.07, g: 0.5, lpFrom: 400 }); noise(c, o, { t0: 0.16, d: 0.07, g: 0.42, lpFrom: 350 }); },
    /* a breath of paper */
    send: (c, o) => { noise(c, o, { d: 0.13, g: 0.12, lpFrom: 6000, hp: 1200 }); },
    /* warm presence swell */
    speech: (c, o) => { tone(c, o, { f: 220, d: 0.25, a: 0.12, g: 0.1 }); },
    /* interaction layer (keem 2026-07-23: every interaction sounds), near-silent by design */
    /* the smallest touch, a felt dot */
    tick: (c, o) => { tone(c, o, { f: 620, d: 0.06, a: 0.003, g: 0.08, type: 'triangle' }); },
    /* a surface arriving, soft air upward */
    slide: (c, o) => { noise(c, o, { d: 0.22, g: 0.09, lpFrom: 900, lpTo: 2600, hp: 300 }); },
    /* a surface leaving, softer air downward */
    settle: (c, o) => { noise(c, o, { d: 0.18, g: 0.06, lpFrom: 2200, lpTo: 600, hp: 250 }); },
    /* the room mists over */
    mist: (c, o) => { noise(c, o, { d: 0.4, g: 0.07, lpFrom: 500, lpTo: 1400 }); tone(c, o, { f: 165, d: 0.4, a: 0.18, g: 0.06 }); },
  };

  window.pgSound = function (id) {
    if (!window.pgSoundOn || !VOICES[id]) return;
    try { const c = ac(); if (c.state === 'suspended') c.resume(); VOICES[id](c, master(c)); } catch (e) { /* sound is never load-bearing */ }
  };
})();
