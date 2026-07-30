// React is provided by the loader (DC x-import), no import, no bundler. See design-system/README.
// Sibling components come off window.PG (the loader mounts every file onto it).

// home together, the resting state you come back to. three directions, one beat.
const HOME_KEYS = ['A', 'B', 'C'];

/* the idle blink. the sprite's eyes are the only svg inside its body and they
   already read --gaze-dx/--gaze-dy, so the lid rides on the same transform and
   the gaze survives the blink. the sprite itself is untouched. */
const BLINK_CSS = `
@keyframes pgIdleBlink {
  0%, 92%, 100% { transform: translateX(-50%) translate(var(--gaze-dx, 0px), var(--gaze-dy, 0px)) scaleY(1); }
  95.5% { transform: translateX(-50%) translate(var(--gaze-dx, 0px), var(--gaze-dy, 0px)) scaleY(.06); }
}
.pg-home-idle svg { animation: pgIdleBlink 7.4s ease-in-out infinite; transform-origin: 50% 50%; }
.pg-home-idle-slow svg { animation-duration: 9.2s; }
`;
if (typeof document !== 'undefined' && !document.getElementById('pg-home-blink')) {
  const el = document.createElement('style');
  el.id = 'pg-home-blink';
  el.textContent = BLINK_CSS;
  document.head.appendChild(el);
}

const RESTING = 34; // moodOf: resting, the slow breath and the low lids

/* the companion breathing and blinking, and looking wherever you are. the gaze
   vars belong to the host surface (Sprite.jsx), so home sets them here. */
function Idle({ size = 128, faceIdx = 0, slow = false, style }) {
  const P = window.PG || {};
  if (!P.Sprite) return null;
  return (
    <div className={'pg-home-idle' + (slow ? ' pg-home-idle-slow' : '')} style={style}>
      <P.Sprite size={size} form="pebble" faceIdx={faceIdx} mood={RESTING} />
    </div>
  );
}

function gazeOn(e, host, reach) {
  const r = host.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
  const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
  const c = (n) => Math.max(-1, Math.min(1, n)) * reach;
  host.style.setProperty('--gaze-dx', c(dx).toFixed(2) + 'px');
  host.style.setProperty('--gaze-dy', c(dy * 0.6).toFixed(2) + 'px');
}

function HomeScreen({ variant = 'A' }) {
  const key = String(variant).toUpperCase();
  const P = window.PG || {};
  const frame = React.useRef(null);
  const follow = (e) => { if (frame.current) gazeOn(e, frame.current, 3.2); };
  const rest = () => {
    if (!frame.current) return;
    frame.current.style.setProperty('--gaze-dx', '0px');
    frame.current.style.setProperty('--gaze-dy', '0px');
  };
  const shell = {
    position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)',
  };

  if (!P.Sprite) return <div style={shell} />;

  // B, the companion low, the dock present. the one whisper of the day sits up top.
  if (key === 'B') {
    return (
      <div ref={frame} onPointerMove={follow} onPointerLeave={rest} style={shell}>
        <div style={{ position: 'absolute', top: 'var(--safe-top)', left: 'var(--screen-margin)', right: 'var(--screen-margin)', zIndex: 'var(--z-header)', animation: 'pgLineIn .55s ease both' }}>
          {P.ScreenHeader && <P.ScreenHeader label="home" title="Sol" status="resting" />}
        </div>
        {P.Banner && P.Logo && (
          <div style={{ position: 'absolute', top: 202, left: 'var(--screen-margin)', right: 'var(--screen-margin)', zIndex: 'var(--z-notice)' }}>
            <P.Banner
              title="Sol brought something back"
              body="it is waiting in your inventory"
              style={{ width: '100%', animation: 'pgLineIn .5s var(--ease-pop) .5s both' }} />
          </div>
        )}
        <div style={{ position: 'absolute', left: '50%', bottom: 168, transform: 'translateX(-50%)', zIndex: 'var(--z-creature)', animation: 'pgFadeIn .8s ease .25s both' }}>
          <Idle size={124} faceIdx={0} />
        </div>
        {P.Dock && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'var(--dock-offset-bottom)', display: 'flex', justifyContent: 'center', zIndex: 'var(--z-dock)', animation: 'pgLineIn .55s ease .4s both' }}>
            <P.Dock tabs={['home', 'friends', 'library', 'settings']} active="home" soon={['friends', 'library', 'settings']} />
          </div>
        )}
      </div>
    );
  }

  // C, the companion plus one glimpse of the world. the veil is the only colour.
  if (key === 'C') {
    return (
      <div ref={frame} onPointerMove={follow} onPointerLeave={rest} style={shell}>
        <div style={{ position: 'absolute', left: '50%', top: 150, transform: 'translate(-50%,-50%)', zIndex: 'var(--z-desk)', animation: 'pgFadeIn 1.4s ease .3s both' }}>
          {P.Tear && <P.Tear open size={132} world="day" assetBase="./design-system/assets/" style={{ opacity: .78 }} />}
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 404, transform: 'translate(-50%,-50%)', zIndex: 'var(--z-creature)', animation: 'pgFadeIn .8s ease .25s both' }}>
          <Idle size={132} faceIdx={1} slow />
        </div>
      </div>
    );
  }

  // A, the companion on porcelain and nothing else.
  return (
    <div ref={frame} onPointerMove={follow} onPointerLeave={rest} style={shell}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 'var(--z-creature)', animation: 'pgFadeIn .9s ease .2s both' }}>
        <Idle size={148} faceIdx={2} />
      </div>
    </div>
  );
}

function HomeSheet() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flexWrap: 'nowrap', overflow: 'auto' }}>
      {HOME_KEYS.map((key) => (
        <div key={key} style={{ width: 134, flex: '0 0 134px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)' }}>{key}</div>
          <div style={{ position: 'relative', width: 134, height: 286, overflow: 'hidden' }}>
            <div style={{ width: 320, height: 680, transform: 'scale(.42)', transformOrigin: 'top left' }}>
              <HomeScreen variant={key} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { HomeScreen, HomeSheet, HOME_KEYS });
