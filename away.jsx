/* HOME, WHILE AWAY. three takes on the same beat: the companion is out, and
   home itself has to carry the absence. no monitor screen, no feed, no bar
   crawling to a hundred. the room is quiet and word arrives on its own.

   the three directions, one per variant:
     1 empty    the room with the tear still faint on the wall
     2 whisper  a line drifting in, the room otherwise bare
     3 world    the world turning behind the tear, on its own clock

   everything is composed from the real design system off window.PG (Tear,
   Whisper, Dock, ScreenHeader), so these are the shipped objects and not
   lookalikes. flow.jsx is untouched.

   every value binds to a named role. the away-local roles below are the ones
   the system has no name for yet (the dent the companion leaves, the drained
   trace of a tear gone quiet, how far each whisper has gone), declared once
   and referenced by name. */

const W = 320, H = 680;

const NAME = 'Nel';
const PLACE = 'the lantern district';

const ROLES = `
.pg-away{
  --away-dent: radial-gradient(ellipse, rgba(0,0,0,.07), transparent 72%);
  --away-tear-trace-opacity: .16;
  --away-tear-trace: grayscale(1) blur(1.5px);
  --away-whisper-faded: .22;
  --away-whisper-fading: .4;
  --away-frame-ring: 0 0 0 1.5px rgba(0,0,0,.22);
  --away-frame-shadow: 0 30px 70px -36px rgba(0,0,0,.45);
  --away-hardware: #000;
  --away-indicator: rgba(0,0,0,.3);
}`;

/* the presentation device, not app chrome. the island and the indicator are
   hardware, which is why they are the only pure black in the file.
   the pointer sets --peer-x / --peer-y, the vars P.Tear already reads, so the
   tear behaves like a window you can lean into rather than a picture. */
function Frame({ children, peer }) {
  const move = (e) => {
    if (!peer) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--peer-x', (-nx * 16).toFixed(1) + 'px');
    e.currentTarget.style.setProperty('--peer-y', (-ny * 11).toFixed(1) + 'px');
  };
  return (
    <div className="pg-away" onMouseMove={move} style={{
      position: 'relative', width: W, height: H, flex: 'none',
      borderRadius: 'var(--radius-frame)', overflow: 'hidden', background: 'var(--bg)',
      boxShadow: 'var(--away-frame-ring), var(--away-frame-shadow)',
    }}>
      <style>{ROLES}</style>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 96, height: 28, borderRadius: 'var(--radius-pill)', background: 'var(--away-hardware)', zIndex: 40 }} />
      <div style={{ position: 'absolute', top: 18, left: 26, font: '700 13px var(--font-ui)', color: 'var(--ink-2)', zIndex: 40 }}>9:41</div>
      {children}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 5, borderRadius: 3, background: 'var(--away-indicator)', zIndex: 40 }} />
    </div>
  );
}

/* the dent. it is where the companion sits when it is home, and while it is
   away it is the whole of what the room has to say. */
function Dent({ width = 74 }) {
  return <div style={{ width, height: 12, borderRadius: '50%', background: 'var(--away-dent)', filter: 'blur(3px)' }} />;
}

function Away({ variant = 'empty', name = NAME, place = PLACE }) {
  const P = (window.PG || {});
  const { Tear, Whisper, Dock, ScreenHeader } = P;

  /* the guard sits below every destructured read and above the markup, never
     above a hook, so load order cannot reorder anything. */
  if (!Tear || !Whisper || !Dock || !ScreenHeader) {
    return <div style={{ font: 'var(--text-hint)', color: 'var(--text-tertiary)', padding: 40 }}>waking the room…</div>;
  }

  const header = (
    <div style={{ position: 'absolute', top: 'var(--safe-top)', left: 26, right: 26, animation: 'pgLineIn .55s ease both' }}>
      <ScreenHeader label="home" title={name} status={`out · ${place}`} />
    </div>
  );

  /* you can end a trip. it is the one action the room keeps while empty. */
  const callBack = (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 138, textAlign: 'center', font: '600 13.5px var(--font-ui)', color: 'var(--text-secondary)', cursor: 'pointer' }}
      onClick={() => { window.pgSound && window.pgSound('tick'); }}>{`call ${name} back`}</div>
  );

  const dock = (
    <div style={{ position: 'absolute', left: '50%', bottom: 'calc(var(--safe-bottom) + 14px)', transform: 'translateX(-50%)', zIndex: 'var(--z-dock)' }}>
      <Dock tabs={['home', 'friends']} active="home" soon={['friends']} />
    </div>
  );

  /* 1, THE EMPTY ROOM. the tear it left through has not closed, it has only
     gone quiet, so the room holds one faint trace of where it went and
     nothing else. */
  if (variant === 'empty') {
    return (
      <Frame>
        {header}
        <div style={{ position: 'absolute', left: '50%', top: 250, transform: 'translateX(-50%)', opacity: 'var(--away-tear-trace-opacity)', filter: 'var(--away-tear-trace)', animation: 'pgFadeIn 1.1s ease .35s both' }}>
          <Tear open size={132} world="day" assetBase="./design-system/assets/" />
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 452, transform: 'translateX(-50%)', animation: 'pgFadeIn .7s ease .25s both' }}>
          <Dent />
        </div>
        {callBack}
        {dock}
      </Frame>
    );
  }

  /* 2, A WHISPER DRIFTING IN. the room is bare, there is no tear to watch,
     and the only thing that happens is that word arrives. the older lines
     have not been cleared away, they are just further up and going. */
  if (variant === 'whisper') {
    return (
      <Frame>
        {header}
        <div style={{ position: 'absolute', left: 26, right: 26, top: 264, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Whisper style={{ animation: 'none', opacity: 'var(--away-whisper-faded)' }}>slipped into the commons</Whisper>
          <Whisper style={{ animation: 'none', opacity: 'var(--away-whisper-fading)' }}>through the lantern district</Whisper>
          <Whisper style={{ animation: 'pgDriftUp 3.4s ease-in-out infinite, pgLineIn .6s var(--ease-pop) both' }}>trading your notes for something rarer</Whisper>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 452, transform: 'translateX(-50%)', animation: 'pgFadeIn .7s ease .25s both' }}>
          <Dent />
        </div>
        {callBack}
        {dock}
      </Frame>
    );
  }

  /* 3, THE WORLD BEHIND THE TEAR. the tear is open on the wall and the world
     inside it turns whether or not anyone is watching. that turning is the
     only thing marking the passing of a trip, and it is the one place colour
     is allowed. lean on it and you peer around. */
  return (
    <Frame peer>
      {header}
      <div style={{ position: 'absolute', left: '50%', top: 238, transform: 'translateX(-50%)', animation: 'pgFadeIn 1.2s ease .3s both' }}>
        <Tear open size={216} world="nightAvenue" assetBase="./design-system/assets/" />
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 486, transform: 'translateX(-50%)', animation: 'pgFadeIn .7s ease .25s both' }}>
        <Dent width={62} />
      </div>
      {callBack}
      {dock}
    </Frame>
  );
}

/* THE CONTACT SHEET. the three takes at one size, in one row, so the absence
   can be read across them rather than one at a time. */
const SHEET = [
  ['empty', '1 · the empty room'],
  ['whisper', '2 · a whisper drifting in'],
  ['world', '3 · the world behind the tear'],
];

function AwaySheet({ scale = 0.5 }) {
  return (
    <div className="pg-away" style={{ display: 'flex', gap: 26, alignItems: 'flex-start' }}>
      <style>{ROLES}</style>
      {SHEET.map(([variant, label]) => (
        <div key={variant} style={{ width: W * scale }}>
          <div style={{ width: W * scale, height: H * scale }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}>
              <Away variant={variant} />
            </div>
          </div>
          <div style={{ marginTop: 14, font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', color: 'var(--text-tertiary)' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Away, AwaySheet });
