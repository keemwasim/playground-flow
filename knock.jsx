// React is provided by the loader (DC x-import), no import, no bundler. See design-system/README.
// Sibling components come off window.PG (the loader mounts every file onto it).

/* THE KNOCK, five ways the arrival can reach you.
   One moment: it came home, and the room has to say so without becoming a
   feed. Every variant is PAPER (arrival tokens), never glass, because these
   float over the room and the room is porcelain. Nothing here is redrawn:
   A is the real Banner, B and E seat the real Sprite and Logo, D is the real
   SealedNote. The five differ only in WHO speaks first, the mark, the face,
   the plain line, the note itself, or the house.

   Every value binds to a named design-system token. No ad-hoc grey, no
   ad-hoc type, no invented radius. That is the tell this file is watched for.

   `drop` picks the entrance, and with it the layout contract:
     drop (default) = the arrival falls in from above, pgBannerIn, which ENDS
       at translate(-50%,0). The root must sit in a slot at left 50 percent
       (that is how the app hangs an arrival). KnockScreen does exactly that.
     no drop = the arrival is laid out in flow (the contact sheet), pgLineIn,
       so nothing pulls it sideways. */

const KNOCK_KEYS = ['A', 'B', 'C', 'D', 'E'];

const KNOCK_NOTES = {
  A: 'the house speaks first. the mark leads, the line follows, the arrival the design system already ships.',
  B: 'it leans in over the lip of the paper. the face arrives before the words do.',
  C: 'no card at all. one line on the room, the least a homecoming can be.',
  D: 'the note itself comes to the top of the room, sealed, with the way in on it.',
  E: 'the sparkle and the wordmark, the house as the lead-in, the name underneath.',
};

/* the shared entrance, see the `drop` contract above */
const knockAnim = (drop) => (drop
  ? 'pgBannerIn var(--dur-enter) var(--ease-pop) both'
  : 'pgLineIn var(--dur-enter) var(--ease-pop) both');

/* A · the logo led paper banner: the real Notice.Banner, nothing added. */
function KnockLogoBanner({ name, count, drop, onOpen, style }) {
  const { Banner } = window.PG;
  if (!Banner) return null;
  return (
    <Banner
      title={`${name} is home ✦`}
      body={`${count} findings from the other side`}
      meta="now"
      onClick={onOpen}
      style={{ width: '100%', animation: knockAnim(drop), ...style }}
    />
  );
}

/* B · the companion peeking in: the real Sprite behind the paper, clipped by
   the card's own lip, so only the top of it (the eyes) clears the edge. */
function KnockFace({ name, count, drop, onOpen, style }) {
  const { Sprite } = window.PG;
  return (
    <div onClick={onOpen} style={{ position: 'relative', paddingTop: 'calc(var(--space-6) + var(--space-2))', cursor: 'pointer', animation: knockAnim(drop), ...style }}>
      {Sprite && (
        /* the card's own lip is the crop: the eyes clear it, the body stays behind */
        <div style={{ position: 'absolute', left: 'var(--space-5)', top: 0, zIndex: 0 }}>
          <Sprite size={62} mood={70} />
        </div>
      )}
      <div style={{
        position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 'var(--row-gap)',
        padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)',
        borderRadius: 'var(--arrival-radius-banner)', background: 'var(--arrival-bg)', boxShadow: 'var(--arrival-shadow)',
      }}>
        <span style={{ flex: 1, minWidth: 0, paddingLeft: 'var(--space-7)' }}>
          <span style={{ display: 'block', font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{name} is home</span>
          <span style={{ display: 'block', font: 'var(--text-row-sub)', color: 'var(--text-secondary)' }}>{count} findings</span>
        </span>
      </div>
    </div>
  );
}

/* C · one line. the room carries it, there is no object. */
function KnockLine({ name, drop, onOpen, style }) {
  return (
    <div onClick={onOpen} style={{
      textAlign: 'center', cursor: 'pointer',
      font: 'var(--text-speech)', color: 'var(--text-primary)',
      animation: knockAnim(drop), ...style,
    }}>{name} came home</div>
  );
}

/* D · the sealed note, brought to the top of the room. The real Homecoming.SealedNote. */
function KnockSealed({ name, count, drop, onOpen, style }) {
  const { SealedNote } = window.PG;
  if (!SealedNote) return null;
  return (
    <div style={{ animation: knockAnim(drop), ...style }}>
      <SealedNote by={name} count={count} onOpen={onOpen} />
    </div>
  );
}

/* E · the sparkle and the wordmark: the house announces, the name follows.
   The wordmark is the one place Unbounded is allowed. */
function KnockWordmark({ name, count, drop, onOpen, style }) {
  const { Logo } = window.PG;
  return (
    <div onClick={onOpen} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)',
      padding: 'var(--bubble-pad)', cursor: 'pointer',
      borderRadius: 'var(--arrival-radius-banner)', background: 'var(--arrival-bg)', boxShadow: 'var(--arrival-shadow)',
      animation: knockAnim(drop), ...style,
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span style={{ font: 'var(--text-row-sub)', color: 'var(--text-secondary)' }}>✦</span>
        {Logo && <Logo size={13} wordmark />}
      </span>
      <span style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{name} is home, {count} findings</span>
    </div>
  );
}

const KNOCKS = {
  A: KnockLogoBanner,
  B: KnockFace,
  C: KnockLine,
  D: KnockSealed,
  E: KnockWordmark,
};

/** One arrival. `variant` picks which of the five, everything else is the moment. */
function Knock({ variant = 'A', name = 'Sol', count = 3, drop = true, onOpen, style }) {
  const V = KNOCKS[String(variant).toUpperCase()] || KNOCKS.A;
  return <V name={name} count={count} drop={drop} onOpen={onOpen} style={style} />;
}

/** The room the knock lands on: home, the companion back, the arrival hanging
    at the top of the screen. Tap anywhere to let it arrive again. */
function KnockScreen({ variant = 'A', name = 'Sol', count = 3 }) {
  const { Sprite } = window.PG;
  const [take, setTake] = React.useState(0);
  return (
    <div onClick={() => setTake((n) => n + 1)} style={{ position: 'absolute', inset: 0, background: 'var(--bg)', cursor: 'pointer', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 'var(--space-5)', left: 'var(--screen-margin)', font: 'var(--text-row-sub)', color: 'var(--text-primary)', zIndex: 'var(--z-header)' }}>9:41</div>

      {/* the room: the name, the state tag, the companion itself */}
      <div style={{ position: 'absolute', top: 'calc(var(--safe-top) + var(--space-7) + var(--space-6))', left: 'var(--screen-margin)' }}>
        <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)' }}>{name}</div>
        <div style={{ font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', color: 'var(--text-secondary)', marginTop: 'var(--space-0)' }}>home</div>
      </div>

      {Sprite && (
        <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', zIndex: 'var(--z-creature)' }}>
          <Sprite size={96} mood={70} />
        </div>
      )}

      {/* the arrival slot: left 50 percent, the entrance does the centring */}
      <div key={take} style={{
        position: 'absolute', top: 'calc(var(--space-5) + var(--space-6))', left: '50%',
        width: 'calc(100% - var(--screen-margin) * 2)', zIndex: 'var(--z-notice)',
      }}>
        <Knock variant={variant} name={name} count={count} />
      </div>
    </div>
  );
}

/** The contact sheet: the five side by side at arrival size, laid out in flow,
    so the choice is made on the objects themselves and not on five rooms. */
function KnockSheet({ name = 'Sol', count = 3 }) {
  const [take, setTake] = React.useState(0);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {KNOCK_KEYS.map((k) => (
        <div key={k} onClick={() => setTake((n) => n + 1)} style={{ width: 'var(--notice-w)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', cursor: 'pointer' }}>
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)' }}>{k}</div>
          {/* one common baseline, so the five are judged on the objects and not on where they land */}
          <div key={k + take} style={{ minHeight: 'calc(var(--space-7) + var(--space-6) * 2)', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ width: '100%' }}><Knock variant={k} name={name} count={count} drop={false} /></div>
          </div>
          <div style={{ font: 'var(--text-body)', color: 'var(--text-secondary)' }}>{KNOCK_NOTES[k]}</div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Knock, KnockScreen, KnockSheet, KNOCK_KEYS, KNOCK_NOTES });
