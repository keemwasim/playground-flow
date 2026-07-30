/* THE HOMECOMING, three ways the findings arrive (PG-123).

   the ruling this sits under: what comes home WAITS SEALED at the door until
   the owner opens it, the verbs are Keep and Later, and every claim carries a
   checkable source. the three directions differ only in the OBJECT that waits
   and in what opening it does:

     1  a sealed note at the door   the note lies on the threshold, opening
                                    unfolds it upward into one paper sheet.
     2  the companion hands it      it holds the seal out to you, then hands
                                    the findings over one at a time.
     3  a small stack               what came home is a short pile, sealed at
                                    the top, and you go through it card by card.

   this is a LAB, not a shipped screen. the frames are 320x680 and the contact
   sheet under them is the same three components at thumbnail scale in their
   three states, so the sealed beat can be judged against the open one without
   clicking through. flow.jsx is untouched: everything here composes the real
   window.PG (SealedNote, Finding, SourceChip, Sprite), so what reads well in
   the lab is already the product's own parts.

   greyscale chrome throughout, no world imagery: nothing here is a window onto
   the world, so nothing here carries color. */

const W = 320, H = 680;
const FRAME_R = 46;          // 320 wide phone. --radius-frame is cut for 390.

/* one errand, one haul. a place, a price, a person (the errand ruling), and the
   third thing is the one nobody asked for. */
const HAUL = [
  {
    text: 'the reading room on Alder keeps its back tables open till nine.',
    sources: [{ label: 'Wren · walked it' }, { label: 'Alder St' }],
  },
  {
    text: 'the day rate is 40, not 60. Tolm paid it last week.',
    sources: [{ label: 'Tolm' }, { label: 'the desk' }],
  },
  {
    text: 'the harbormaster\'s daughter keeps a smaller room upstairs.',
    sources: [{ label: 'Rell' }, { label: 'you did not ask' }],
  },
];

const SAID = 'i found you a room. two, if you want the quiet one.';

const sound = (n) => { if (typeof window !== 'undefined' && window.pgSound) window.pgSound(n); };

/* Keep is the one ink action, Later is bare text beside it (ink returns v4:
   one primary per moment, quiet is text). kept reads back as an ink mark, not
   as a green tick, because chrome never colors. */
function Verbs({ onKeep, onLater, verdict }) {
  if (verdict === 'kept') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: 'var(--text-hint)', color: 'var(--text-secondary)' }}>
        <span style={{ font: '400 12px var(--font-ui)', color: 'var(--ink-2)' }}>✦</span>
        <span>kept</span>
      </div>
    );
  }
  if (verdict === 'later') return <div style={{ font: 'var(--text-hint)', color: 'var(--text-tertiary)' }}>later</div>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <button onClick={() => { sound('settle'); onKeep(); }}
        style={{ border: 'none', cursor: 'pointer', background: 'var(--button-primary-bg)', color: 'var(--button-primary-fg)', font: '700 12.5px var(--font-ui)', padding: '9px 18px', borderRadius: 'var(--button-radius)' }}>Keep</button>
      <button onClick={() => { sound('tick'); onLater(); }}
        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', font: '700 12.5px var(--font-ui)', padding: '9px 2px' }}>Later</button>
    </div>
  );
}

/* the room the findings come home to: the companion, and a threshold at the
   foot of the screen that the sealed thing rests on. no header, no caption,
   the screen does not narrate itself. */
function Room({ children, mood = 'home', still }) {
  const P = window.PG;
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 96, display: 'flex', justifyContent: 'center' }}>
        <P.Sprite size={74} form="pebble" still={still} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 214, textAlign: 'center', padding: '0 34px', font: 'var(--text-speech)', color: 'var(--bubble-ink)' }}>
        {mood === 'home' ? SAID : ''}
      </div>
      {children}
    </React.Fragment>
  );
}

/* ── 1 · a sealed note at the door ─────────────────────────────────────────
   the note lies where it was left, on the threshold. opening unfolds it up
   into a single sheet of paper: the whole haul in one telling, each claim on
   its own line with its sources under it. */
function AtTheDoor({ open, setOpen, verdicts, judge }) {
  const P = window.PG;
  return (
    <React.Fragment>
      <Room mood={open ? 'quiet' : 'home'} still={open} />

      {/* the threshold: one hairline and the porcelain beyond it. this is the
          door, drawn as quietly as it can be drawn. */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: open ? 0 : 152, borderTop: '1px solid var(--divider)', background: 'var(--porcelain-2)', transition: 'height .34s var(--ease-pop)' }} />

      {!open && (
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 56, animation: 'pgLineIn .4s var(--ease-pop) both' }}>
          <P.SealedNote by="Sol" count={HAUL.length} onOpen={() => { sound('slide'); setOpen(true); }} />
        </div>
      )}

      {open && (
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 24, top: 236, background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', padding: '10px 18px 14px', overflow: 'hidden', transformOrigin: 'bottom center', animation: 'pgLineIn .42s var(--ease-emerge) both' }}>
          {HAUL.map((f, i) => (
            <div key={i} style={{ opacity: verdicts[i] === 'later' ? 0.45 : 1, transition: 'opacity .3s ease', borderBottom: i < HAUL.length - 1 ? '1px solid var(--divider)' : 'none', paddingBottom: i < HAUL.length - 1 ? 10 : 0, marginBottom: i < HAUL.length - 1 ? 10 : 0 }}>
              <P.Finding sources={f.sources} last>{f.text}</P.Finding>
              <Verbs verdict={verdicts[i]} onKeep={() => judge(i, 'kept')} onLater={() => judge(i, 'later')} />
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

/* ── 2 · the companion hands you the finding ───────────────────────────────
   it holds the seal out first. then one finding at a time, in its hands, and
   it does not reach for the next until this one is kept or left. swipe up
   keeps, swipe down leaves it (swipe first, buttons last), the verbs stay on
   screen because they are the naming of the gesture. */
function HandedOver({ open, setOpen, verdicts, judge }) {
  const P = window.PG;
  const at = verdicts.findIndex((v) => !v);
  const done = at === -1;
  const drag = React.useRef(null);
  const [dy, setDy] = React.useState(0);

  /* no pointer capture: it would swallow the taps on Keep and Later, and the
     verbs have to keep working for anyone who does not know the gesture yet. */
  const down = (e) => { if (e.target.closest('button')) return; drag.current = e.clientY; };
  const move = (e) => { if (drag.current !== null) setDy(e.clientY - drag.current); };
  const up = () => {
    const d = dy; drag.current = null; setDy(0);
    if (d < -46) judge(at, 'kept');
    else if (d > 46) judge(at, 'later');
  };

  return (
    <React.Fragment>
      <Room mood={open ? 'quiet' : 'home'} />

      {!open && (
        <div style={{ position: 'absolute', left: 22, right: 22, top: 262, animation: 'pgLineIn .4s var(--ease-pop) both' }}>
          <P.SealedNote by="Sol" count={HAUL.length} onOpen={() => { sound('slide'); setOpen(true); }} />
        </div>
      )}

      {open && !done && (
        <div key={at} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
          style={{ position: 'absolute', left: 26, right: 26, top: 216, background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', padding: '18px 20px 16px', touchAction: 'none', cursor: 'grab', transform: `translateY(${dy * 0.5}px)`, opacity: 1 - Math.min(0.5, Math.abs(dy) / 220), animation: 'pgLineIn .38s var(--ease-emerge) both' }}>
          <P.Finding sources={HAUL[at].sources} last>{HAUL[at].text}</P.Finding>
          <div style={{ marginTop: 14 }}>
            <Verbs onKeep={() => judge(at, 'kept')} onLater={() => judge(at, 'later')} />
          </div>
        </div>
      )}

      {/* what it has already handed over settles at your end of the room. no
          tally, the pile is the tally. */}
      {open && (
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 34, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HAUL.map((f, i) => (verdicts[i] === 'kept' ? (
            <div key={i} style={{ background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, animation: 'pgLineIn .34s var(--ease-pop) both' }}>
              <span style={{ flex: 1, minWidth: 0, font: 'var(--text-row-title)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.text}</span>
              <Verbs verdict="kept" onKeep={() => {}} onLater={() => {}} />
            </div>
          ) : null))}
        </div>
      )}
    </React.Fragment>
  );
}

/* ── 3 · a small stack of what came home ───────────────────────────────────
   what came home is a pile with the seal on top of it, so its weight is
   visible before it is opened. opening fans the pile: the live card sits
   proud, the rest wait under it, and each verdict drops one and lifts the
   next. */
function TheStack({ open, setOpen, verdicts, judge }) {
  const P = window.PG;
  const at = verdicts.findIndex((v) => !v);
  const done = at === -1;

  return (
    <React.Fragment>
      <Room mood={open ? 'quiet' : 'home'} still={open} />

      {!open && (
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 62 }}>
          {/* the pile under the seal, one card per thing that came home */}
          {HAUL.slice(1).map((f, i) => (
            <div key={i} style={{ position: 'absolute', left: 6 + i * 5, right: 6 + i * 5, bottom: -8 - i * 9, height: 70, background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)' }} />
          ))}
          <div style={{ position: 'relative', animation: 'pgLineIn .4s var(--ease-pop) both' }}>
            <P.SealedNote by="Sol" count={HAUL.length} onOpen={() => { sound('slide'); setOpen(true); }} />
          </div>
        </div>
      )}

      {open && (
        <div style={{ position: 'absolute', left: 22, right: 22, top: 250, bottom: 26, display: 'flex', flexDirection: 'column' }}>
          {/* the card you are on, and the weight still under it. the ones
              waiting are edges of paper, they say nothing until they are up. */}
          {!done && (
            <React.Fragment>
              <div key={at} style={{ position: 'relative', zIndex: 3, background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', padding: '18px 20px 16px', animation: 'pgLineIn .38s var(--ease-emerge) both' }}>
                <P.Finding sources={HAUL[at].sources} last>{HAUL[at].text}</P.Finding>
                <div style={{ marginTop: 14 }}>
                  <Verbs onKeep={() => judge(at, 'kept')} onLater={() => judge(at, 'later')} />
                </div>
              </div>
              {verdicts.slice(at + 1).map((v, i) => (
                <div key={i} style={{ position: 'relative', zIndex: 2 - i, marginLeft: 7 + i * 7, marginRight: 7 + i * 7, marginTop: -12, height: 22, background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)' }} />
              ))}
            </React.Fragment>
          )}

          <div style={{ flex: 1 }} />

          {/* what has been through your hands settles at the foot of the pile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {HAUL.map((f, i) => (verdicts[i] ? (
              <div key={i} style={{ background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, opacity: verdicts[i] === 'later' ? 0.45 : 1, animation: 'pgLineIn .34s var(--ease-pop) both' }}>
                <span style={{ flex: 1, minWidth: 0, font: 'var(--text-row-title)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.text}</span>
                <Verbs verdict={verdicts[i]} onKeep={() => {}} onLater={() => {}} />
              </div>
            ) : null))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

const VARIANTS = [
  { key: 'door', tag: '1 · a sealed note at the door', Screen: AtTheDoor },
  { key: 'hands', tag: '2 · it hands you the finding', Screen: HandedOver },
  { key: 'stack', tag: '3 · a small stack of what came home', Screen: TheStack },
];

/* one 320x680 screen. `frozen` pins it to a beat (sealed / open / after) for
   the contact sheet, so the thumbnails are the real screens rather than
   drawings of them. */
function Screen({ variant, frozen }) {
  const V = VARIANTS.find((v) => v.key === variant);
  const [open, setOpen] = React.useState(frozen ? frozen !== 'sealed' : false);
  const [verdicts, setVerdicts] = React.useState(
    frozen === 'after' ? ['kept', 'later', 'kept'] : [null, null, null],
  );
  const judge = (i, v) => setVerdicts((prev) => prev.map((p, j) => (j === i ? v : p)));

  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: FRAME_R, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 34px 90px -40px rgba(0,0,0,.45)' }}>
      <V.Screen open={open} setOpen={setOpen} verdicts={verdicts} judge={judge} />
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)' }} />
    </div>
  );
}

function Thumb({ variant, frozen, scale }) {
  return (
    <div style={{ width: W * scale, height: H * scale, position: 'relative', overflow: 'hidden', flex: 'none', borderRadius: FRAME_R * scale, boxShadow: 'var(--paper-ring)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
        <Screen variant={variant} frozen={frozen} />
      </div>
    </div>
  );
}

function HomecomingLab() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.SealedNote || !P.Finding) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the companion…</div>;
  }

  const label = { font: 'var(--text-label)', color: 'var(--text-tertiary)' };

  return (
    <div style={{ padding: '54px 40px 96px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>the homecoming</div>

      <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap', marginTop: 34 }}>
        {VARIANTS.map((v) => (
          <div key={v.key}>
            <div style={{ ...label, marginBottom: 12 }}>{v.tag}</div>
            <Screen variant={v.key} />
          </div>
        ))}
      </div>

      {/* the contact sheet: every variant against every beat, the sealed one
          beside what opening it gives you. */}
      <div style={{ marginTop: 74, paddingTop: 34, borderTop: '1px solid var(--divider)' }}>
        <div style={label}>contact sheet</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 22 }}>
          {VARIANTS.map((v) => (
            <div key={v.key}>
              <div style={{ ...label, marginBottom: 10 }}>{v.tag}</div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                {['sealed', 'open', 'after'].map((f) => (
                  <div key={f}>
                    <Thumb variant={v.key} frozen={f} scale={0.34} />
                    <div style={{ font: 'var(--text-hint)', color: 'var(--text-tertiary)', marginTop: 7 }}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { HomecomingLab });
