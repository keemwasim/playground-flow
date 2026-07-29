/* THE COMMONS, with the REAL creature (keem 2026-07-25: "i dont like how badly
   rendered the other agents are"). the earlier standalone pages hand-rolled a
   css blob with two dots because they had no react host, so every being in the
   marketplace was a knockoff of the thing the design system already ships.
   this mounts P.Sprite, so the eerie eyes, the inset shading and the bob and
   breathe are the same ones the owner's agent has.

   the space itself: the others are not a list, they are at depths. hold and you
   travel, and where you press is where you go. whoever is nearest the middle
   and closest to the front is the one speaking, so looking at someone and
   choosing them are the same act. */

const NAMES = [
  ['Rell', 'i know everyone on the water.'],
  ['June', 'i find rooms. quiet ones.'],
  ['Vess', 'i cut. i am good at it.'],
  ['Ovid', 'i am newer than the rest.'],
  ['Marn', 'i walk the long way and see more.'],
  ['Sable', 'i remember what people owe.'],
  ['Tolm', 'i am good at prices.'],
  ['Wren', 'i know the quiet hours.'],
];

const W = 390, H = 780, FOCAL = 620, DEPTH = 2600;

function Commons() {
  const P = (window.PG || {});

  /* a fixed cast, seeded by index, so it is the same commons every time rather
     than a new random room on every load. */
  /* they are COMMUTING, not floating (keem 2026-07-25). each one holds a lane
     and travels it at its own pace, some coming toward you and some going away,
     the way a street works. and you only see the ones IN FRONT OF YOU: a narrow
     band ahead, hard-culled at the edges, so this is a view down a street
     rather than a cloud you are suspended in. */
  const beings = React.useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const r = (n) => { const x = Math.sin(i * 999 + n) * 10000; return x - Math.floor(x); };
    const n = NAMES[i % NAMES.length];
    const lane = (i % 5) - 2;                       // five lanes across the street
    return {
      x: lane * 210 + (r(1) - 0.5) * 70,
      y: (r(2) - 0.5) * 240,                        // they walk at a level, they do not hover
      z0: (i / 20) * DEPTH + r(3) * 90,
      pace: (0.35 + r(9) * 0.85) * (r(5) > 0.62 ? -1 : 1),   // some walk toward you
      size: 58 + r(4) * 30,
      form: r(6) > 0.74 ? 'inkling' : 'pebble',
      face: Math.floor(r(7) * 4),
      mood: 64 + Math.floor(r(8) * 26),
      sway: r(6) * 6.28,
      name: n[0], line: n[1],
    };
  }), []);

  const refs = React.useRef([]);
  const [near, setNear] = React.useState(null);
  /* tapping one opens its menu, the same object the owner's own creature has
     on home: a paper card hanging off the creature with the things you can do
     with it. the space holds still while it is open, because a menu attached to
     something drifting is unreadable. */
  const [menu, setMenu] = React.useState(null);   // { name, x, y }
  const state = React.useRef({ cam: 0, panX: 0, panY: 0, vel: 0, hold: null, ramp: 0, t: 0, said: null, nearAt: null, moved: false });
  const menuOpen = React.useRef(false);

  /* the loop is KICKED FROM RENDER, not from an effect. this host never ran
     the effect and never said why, so rather than keep guessing at its
     semantics the loop starts once, guarded by a ref, and react keeps owning
     the markup while this owns the transforms.
     ponytail: not idiomatic, but it runs, and the guard makes it run once. */
  let raf;
  const step = (now) => {
      const s = state.current;
      const dt = Math.min(50, now - (s.t || now)); s.t = now;

      if (menuOpen.current) { raf = requestAnimationFrame(step); return; }   // the space holds still under a menu
      if (s.hold) {
        s.ramp = Math.min(1, s.ramp + dt / 520);           // a press builds into a dive
        const back = s.hold.y > H * 0.8 ? -1 : 1;          // holding low reverses out
        const sp = (3.2 + s.ramp * 15) * back;
        s.cam += sp;
        s.panX -= ((s.hold.x - W / 2) / (W / 2)) * s.ramp * 5.5;
        if (back > 0) s.panY -= ((s.hold.y - H / 2) / (H / 2)) * s.ramp * 5.5;
        s.vel = sp;
      } else {
        s.ramp = Math.max(0, s.ramp - dt / 420);
        s.cam += s.vel; s.vel *= 0.93; if (Math.abs(s.vel) < 0.02) s.vel = 0;   // coasts, never stops dead
      }

      let best = null, bestScore = Infinity;
      beings.forEach((b, i) => {
        const el = refs.current[i]; if (!el) return;
        let z = ((b.z0 + b.pace * now * 0.045 - s.cam) % DEPTH + DEPTH) % DEPTH;   // it walks its own lane
        const k = FOCAL / (z + 160);
        const sx = W / 2 + (b.x + s.panX) * k;
        /* a small side-to-side roll as it walks, not a float. it stays level. */
        const sy = H / 2 + (b.y + s.panY) * k + Math.sin(now / 700 + b.sway) * 3;

        /* HARD CULL: only what is in front of you exists. nothing hazy at the
           edges, nothing hanging in the periphery. */
        const inFront = z < 1150 && Math.abs(sx - W / 2) < 168 && sy > 150 && sy < H - 110;
        if (!inFront || k < 0.1) { el.style.opacity = 0; return; }
        /* solid, with a short dissolve only at the very back of the street. */
        el.style.opacity = String(z > 900 ? Math.max(0, (1150 - z) / 250) : 1);
        el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%) scale(${k * 1.9})`;

        const off = Math.hypot(sx - W / 2, sy - H * 0.5);
        const score = off + z * 0.5;
        if (z < 620 && off < 110 && score < bestScore) { bestScore = score; best = b; b.sx = sx; b.sy = sy; b.k = k; }
      });

      if (best) { s.nearAt = { name: best.name, x: best.sx, y: best.sy, size: best.k * 1.9 * best.size }; }
      if ((best && best.name) !== s.said) { s.said = best && best.name; setNear(best || null); }
      raf = requestAnimationFrame(step);
    };

  if (!state.current.started) { state.current.started = true; requestAnimationFrame(step); }


  const down = (e) => {
    if (menuOpen.current) { menuOpen.current = false; setMenu(null); return; }   // tap away closes it
    e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
    const r = e.currentTarget.getBoundingClientRect();
    state.current.hold = { x: e.clientX - r.left, y: e.clientY - r.top };
    state.current.moved = false;
    state.current.downAt = performance.now();
  };
  const move = (e) => {
    if (!state.current.hold) return;                       // steering, not dragging
    const r = e.currentTarget.getBoundingClientRect();
    state.current.hold = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const up = () => {
    const s = state.current;
    /* a SHORT press with no travel is a tap on whoever is in front of you.
       anything longer was you moving through the space. */
    const quick = s.downAt && performance.now() - s.downAt < 260 && s.ramp < 0.35;
    s.hold = null;
    if (quick && s.nearAt) { menuOpen.current = true; s.vel = 0; setMenu(s.nearAt); }
  };

  /* the guard lives BELOW every hook. above them it changed the hook order
     the moment Sprite loaded, and the whole animation loop died silently. */
  if (!P.Sprite) return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the creature…</div>;

  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: 54, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 34px 90px -40px rgba(0,0,0,.45)' }}>
      <div style={{ position: 'absolute', left: 30, top: 58, zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ font: '600 13px ui-monospace, Menlo, monospace', letterSpacing: '0', color: 'var(--text-tertiary)', textTransform: 'lowercase' }}>THE COMMONS</div>
        <div style={{ font: '700 27px var(--font-display), sans-serif', letterSpacing: '-.02em', marginTop: 4 }}>others</div>
      </div>

      <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: 'pointer' }}>
        {beings.map((b, i) => (
          <div key={i} ref={(el) => { refs.current[i] = el; }}
            style={{ position: 'absolute', left: 0, top: 0, willChange: 'transform, opacity', pointerEvents: 'none' }}>
            <P.Sprite size={b.size} form={b.form} faceIdx={b.face} mood={b.mood} />
          </div>
        ))}
      </div>

      {/* the fog is what makes it a depth rather than a scatter: things arrive
          out of it and leave into it. */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 170, background: 'linear-gradient(to bottom, var(--bg) 42%, transparent)', pointerEvents: 'none', zIndex: 4 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: 'linear-gradient(to top, var(--bg) 44%, transparent)', pointerEvents: 'none', zIndex: 4 }} />

      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 40, textAlign: 'center', zIndex: 8, pointerEvents: 'none', opacity: near ? 1 : 0, transition: 'opacity .3s ease' }}>
        <div style={{ font: '700 24px var(--font-display), sans-serif', letterSpacing: '-.02em' }}>{near ? near.name : ''}</div>
        <div style={{ font: '500 15px/1.45 var(--font-ui)', color: 'var(--text-secondary)', marginTop: 6 }}>{near ? near.line : ''}</div>
      </div>

      {/* THE WAY OUT (keem 2026-07-25, asked three times across three screens
          before I stopped making exits a whisper). it is the app's own edge
          handle, the same object that opened this place, pointing back. it is
          already taught, it is visible, and it sits where a way back belongs.
          holding low still reverses you out, that is the gesture. this is the
          door. */}
      <div onClick={() => { window.pgSound && pgSound('settle'); const s = state.current; s.cam = 0; s.panX = 0; s.panY = 0; s.vel = 0; menuOpen.current = false; setMenu(null); }}
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 28, height: 50, borderRadius: '0 16px 16px 0', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 2, cursor: 'pointer', zIndex: 14, animation: 'pgHandleL 4.6s ease-in-out infinite' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </div>

      {menu && (
        <div style={{ position: 'absolute', left: menu.x, top: menu.y + menu.size * 0.55, transform: 'translateX(-50%)', zIndex: 12 }}>
          <div style={{ minWidth: 208, background: 'var(--paper-card)', borderRadius: 16, boxShadow: 'var(--menu-shadow)', overflow: 'hidden', animation: 'pgLineIn .3s var(--ease-pop) both' }}>
            {[
              { t: `hire ${menu.name}` },
              { t: `talk to ${menu.name}` },
            ].map((row, i, a) => (
              <div key={row.t} onClick={(e) => { e.stopPropagation(); window.pgSound && pgSound('tick'); menuOpen.current = false; setMenu(null); }}
                style={{ padding: '13px 22px', font: '600 13.5px var(--font-ui)', color: 'var(--ink-2)', cursor: 'pointer', borderBottom: i < a.length - 1 ? '1px solid var(--divider)' : 'none' }}>{row.t}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 132, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)', zIndex: 9 }} />
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Commons });
