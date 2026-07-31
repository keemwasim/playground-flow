/* YOUR AGENTS / THE SWITCHER (PG-139). the dock tree's first stop: your
   collection of companions, and the act of putting a different one in front of
   you. it is not a roster page. switching is FELT before it is read, because
   each agent is a different individual (its own face) kept in a different light
   (its own room, agent-identity.md), so the whole surface reskins the moment
   another one comes forward.

   three directions here, all composing the real components off window.PG so
   the creatures are the same ones the owner's agent is drawn with, never a css
   knockoff: PG.Sprite for the individual, PG.AgentState for whether it is here
   or away, PG.Dock for the wayfinder it hangs off.

   1 THE ROW      the kept ones lie in a row you slide through, the chosen one
                  standing in the room above it.
   2 ONE LARGE    the one you keep is the room, the rest wait small at the edge.
   3 THE DOCK     the dock itself pulled up into the collection, the switcher
                  living where BACK already lives.

   flow.jsx is untouched. this is the lab where the three audition. */

const W = 320, H = 680;

const ROOMS = ['pg-room-porcelain', 'pg-room-night', 'pg-room-dusk'];

/* a fixed cast so every variant shows the same collection and only the SHAPE of
   the switch differs. face and room carry identity, nothing else: no color, no
   badge, no frame (agent-identity.md). the away line is the agent's own state,
   never a time or a percentage (the time ruling). */
const KEPT = [
  { name: 'Sol', face: 0, form: 'pebble', room: 0, mood: 74, state: 'home', line: 'here with you' },
  { name: 'Marn', face: 1, form: 'inkling', room: 0, mood: 86, state: 'out', line: 'out on the water' },
  { name: 'Vess', face: 2, form: 'pebble', room: 2, mood: 38, state: 'resting', line: 'asleep in its room' },
  { name: 'Ovid', face: 3, form: 'pebble', room: 1, mood: 66, state: 'findings', line: 'home with something' },
];

const tick = () => { if (window.pgSound) window.pgSound('tick'); };

/* the phone the variant is judged in. the room class rides on the FRAME, so one
   agent's light never leaks into the next (rooms.css usage note), and the frame
   crossfades its ground as the light changes. */
function Frame({ room = 0, children }) {
  return (
    <div className={ROOMS[room % ROOMS.length]}
      style={{ position: 'relative', width: W, height: H, borderRadius: 44, overflow: 'hidden', background: 'var(--bg)', boxShadow: 'var(--paper-ring), var(--shadow-panel)', transition: 'background .7s ease' }}>
      {children}
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 108, height: 5, borderRadius: 3, background: 'var(--ink-2)', opacity: .28, zIndex: 30 }} />
    </div>
  );
}

/* the one in front of you, drawn at habitat scale. it breathes and wears its
   mood, so the room reads as inhabited rather than illustrated. */
function InRoom({ agent, size = 112, style }) {
  const P = window.PG || {};
  return (
    <div key={agent.name} style={{ animation: 'pgLineIn .5s var(--ease-pop) both', ...style }}>
      <P.Sprite size={size} form={agent.form} faceIdx={agent.face} mood={agent.mood} />
    </div>
  );
}

/* a kept one at rail scale, wrapped in its life state: the ping if it is out,
   the mark if it came home with something, dimmed while it rests. still, so a
   rail of four does not squirm. */
function Kept({ agent, size = 38, chosen = false, onPick }) {
  const P = window.PG || {};
  return (
    <div onClick={() => { tick(); if (onPick) onPick(); }}
      style={{ position: 'relative', flex: 'none', width: size + 8, height: size + 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', cursor: 'pointer', opacity: chosen ? 1 : .62, transform: chosen ? 'translateY(-4px)' : 'none', transition: 'opacity .35s ease, transform .35s var(--ease-pop)' }}>
      <div style={{ marginBottom: 8 }}>
        <P.AgentState state={agent.state}>
          <P.Sprite size={size} form={agent.form} faceIdx={agent.face} mood={agent.mood} still />
        </P.AgentState>
      </div>
      {chosen && <div style={{ position: 'absolute', bottom: 0, left: '50%', width: 6, height: 6, borderRadius: 999, background: 'var(--ink-2)', transform: 'translateX(-50%)' }} />}
    </div>
  );
}

const headerLabel = 'yours';

function useKept(start = 0) {
  const [i, setI] = React.useState(start);
  const pick = (n) => setI(n);
  return [KEPT[i], i, pick];
}

/* ── 1 · THE ROW ──────────────────────────────────────────────────────────
   the collection lies flat in one row along the bottom and the chosen one is
   standing in the room above it. switching is a tap sideways, the shortest
   possible distance between two of your own agents, and the room changes light
   under your thumb. the row sits above the dock because the dock is BACK, not
   the switcher. */
function SwitcherRow({ start = 0 }) {
  const P = window.PG || {};
  const [cur, idx, pick] = useKept(start);
  if (!P.Sprite) return <Waking />;
  return (
    <Frame room={cur.room}>
      <div style={{ position: 'absolute', top: 58, left: 26, right: 26 }}>
        <P.ScreenHeader label={headerLabel} title={cur.name} status={cur.line} />
      </div>

      <InRoom agent={cur} style={{ position: 'absolute', left: '50%', top: 330, transform: 'translateX(-50%)' }} />

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 104, display: 'flex', gap: 14, padding: '0 24px', alignItems: 'flex-end', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {KEPT.map((a, i) => (
          <Kept key={a.name} agent={a} chosen={i === idx} onPick={() => pick(i)} />
        ))}
        {/* the one you do not have yet is drawn as an empty place in the row,
            never described. */}
        <div style={{ flex: 'none', width: 46, height: 46, borderRadius: 999, border: '1.5px dashed var(--ink-2)', opacity: .3 }} />
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, display: 'flex', justifyContent: 'center' }}>
        <P.Dock tabs={['home', 'friends']} active="home" soon={['friends']} />
      </div>
    </Frame>
  );
}

/* ── 2 · ONE LARGE, THE REST SMALL ───────────────────────────────────────
   the one you keep IS the room, at full habitat size, and the others wait in a
   column at the right edge, small and out of the way. the hierarchy is the
   point: you are with one companion, the rest are nearby. tapping one trades
   places with it, so the column always holds exactly the ones you are not with. */
function SwitcherOne({ start = 0 }) {
  const P = window.PG || {};
  const [cur, idx, pick] = useKept(start);
  if (!P.Sprite) return <Waking />;
  const rest = KEPT.map((a, i) => ({ a, i })).filter((x) => x.i !== idx);
  return (
    <Frame room={cur.room}>
      <div style={{ position: 'absolute', top: 58, left: 26, right: 96 }}>
        <P.ScreenHeader label={headerLabel} title={cur.name} status={cur.line} />
      </div>

      <InRoom agent={cur} size={132} style={{ position: 'absolute', left: '38%', top: 296, transform: 'translateX(-50%)' }} />

      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        {rest.map((x) => (
          <Kept key={x.a.name} agent={x.a} size={40} onPick={() => pick(x.i)} />
        ))}
        <div style={{ width: 40, height: 40, borderRadius: 999, border: '1.5px dashed var(--ink-2)', opacity: .3 }} />
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, display: 'flex', justifyContent: 'center' }}>
        <P.Dock tabs={['home', 'friends']} active="home" soon={['friends']} />
      </div>
    </Frame>
  );
}

/* ── 3 · THE DOCK SWITCHER PULLED UP ─────────────────────────────────────
   the dock is already the way OUT of an agent, so the collection lives inside
   it: pull the paper up and your agents are the list, the real Dock riding on
   its lip. no second surface, no sheet, the wayfinder you already have grows
   into the switcher. drag it down (or tap the ground) and it is a dock again.
   the rows carry the sprite, because a name alone loses the individual. */
function SwitcherDock({ start = 0 }) {
  const P = window.PG || {};
  const [cur, idx, pick] = useKept(start);
  const [open, setOpen] = React.useState(true);
  const drag = React.useRef(null);
  if (!P.Sprite) return <Waking />;

  const rows = KEPT.length + 1;
  const height = open ? 84 + rows * 46 : 62;

  const grab = {
    onPointerDown: (e) => { drag.current = e.clientY; },
    onPointerUp: (e) => {
      if (drag.current == null) { return; }
      const dy = e.clientY - drag.current;
      drag.current = null;
      if (dy < -26) { if (!open) { tick(); setOpen(true); } return; }
      if (dy > 26) { if (open) { setOpen(false); } return; }
      setOpen((v) => !v);
    },
  };

  return (
    <Frame room={cur.room}>
      <div style={{ position: 'absolute', top: 58, left: 26, right: 26 }}>
        <P.ScreenHeader label={headerLabel} title={cur.name} status={cur.line} />
      </div>

      <InRoom agent={cur} size={104} style={{ position: 'absolute', left: '50%', top: 232, transform: 'translateX(-50%)' }} />

      {/* tapping the ground under the open paper puts it back, so the surface
          is never a place you are stuck inside. */}
      {open && <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 20 }} />}

      <div {...grab}
        style={{ position: 'absolute', left: 14, right: 14, bottom: 22, height, borderRadius: 26, background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', overflow: 'hidden', transition: 'height .42s var(--ease-pop)', touchAction: 'none', cursor: 'pointer', zIndex: 25 }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 6 }}>
          <P.Dock tabs={['home', 'friends']} active="home" soon={['friends']} style={{ position: 'static', boxShadow: 'none', background: 'transparent' }} />
        </div>

        <div style={{ padding: '2px 22px 0', opacity: open ? 1 : 0, transition: 'opacity .3s ease .08s' }}>
          {KEPT.map((a, i) => (
            <div key={a.name} onClick={(e) => { e.stopPropagation(); tick(); pick(i); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 46, cursor: 'pointer', opacity: i === idx ? 1 : .62 }}>
              <P.AgentState state={a.state}>
                <P.Sprite size={26} form={a.form} faceIdx={a.face} mood={a.mood} still />
              </P.AgentState>
              <span style={{ flex: 1, font: '700 19px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)' }}>{a.name}</span>
              {i === idx && <span style={{ font: '600 13px ui-monospace, Menlo, monospace', letterSpacing: '0', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>here</span>}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 46, opacity: .38 }}>
            <div style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, border: '1.5px dashed var(--ink-2)' }} />
            <span style={{ flex: 1, font: '700 19px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)' }}>another</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Waking() {
  return <div style={{ width: W, height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-body)', color: 'var(--text-tertiary)' }}>waking the creatures</div>;
}

/* THE CONTACT SHEET. the three side by side at one scale, tagged and nothing
   else: the judging happens in the frames, not in prose beside them. */
const SHEET = [
  { tag: '1 · the row', C: SwitcherRow, start: 0 },
  { tag: '2 · one large', C: SwitcherOne, start: 3 },
  { tag: '3 · the dock pulled up', C: SwitcherDock, start: 2 },
];

function SwitcherSheet() {
  return (
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
      {SHEET.map(({ tag, C, start }) => (
        <div key={tag} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ font: '600 13px ui-monospace, Menlo, monospace', letterSpacing: '0', color: 'var(--text-tertiary)', textTransform: 'lowercase' }}>{tag}</div>
          <C start={start} />
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.PG = Object.assign(window.PG || {}, { SwitcherRow, SwitcherOne, SwitcherDock, SwitcherSheet });
}
