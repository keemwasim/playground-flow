// React is provided by the loader (DC x-import), no import, no bundler. See design-system/README.
// Sibling components come off window.PG (the loader mounts every file onto it).

const ENTRY_KEYS = ['A', 'B', 'C'];

function EntryGlobe({ size, style, ...props }) {
  const P = window.PG || {};
  if (!P.Globe) return null;
  return <P.Globe size={size} variant="world" souls={4} phase="day" {...props} style={style} />;
}

function EntryScreen({ variant = 'A' }) {
  const [take, setTake] = React.useState(0);
  const key = String(variant).toUpperCase();
  const P = window.PG || {};
  const replay = () => setTake((n) => n + 1);

  if (!P.Sprite || !P.Logo || !P.Button || !P.Globe) {
    return <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)' }} />;
  }

  if (key === 'B') {
    return (
      <div
        key={take}
        onClick={replay}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)', cursor: 'pointer' }}
      >
        <div style={{ position: 'absolute', top: 'var(--safe-top)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 'var(--z-header)', animation: 'pgLineIn var(--dur-enter) var(--ease-pop) both' }}>
          <P.Logo size={15} wordmark />
        </div>
        <div style={{ position: 'absolute', top: 116, left: 42, width: 300, height: 300, overflow: 'hidden', borderRadius: '50%', animation: 'pgGlobeEnter 1.2s var(--ease-emerge) both' }}>
          <EntryGlobe size={300} />
        </div>
        <div style={{ position: 'absolute', left: '50%', bottom: 142, transform: 'translateX(-50%)', zIndex: 'var(--z-creature)', animation: 'pgLineIn .7s var(--ease-pop) .25s both' }}>
          <P.Sprite size={112} form="pebble" still={false} mood={76} />
        </div>
        <div style={{ position: 'absolute', left: 'var(--screen-margin)', right: 'var(--screen-margin)', bottom: 38, zIndex: 'var(--z-header)', display: 'flex', justifyContent: 'center', animation: 'pgLineIn .7s var(--ease-pop) .45s both' }}>
          <P.Button variant="quiet">enter</P.Button>
        </div>
      </div>
    );
  }

  if (key === 'C') {
    return (
      <div
        key={take}
        onClick={replay}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)', cursor: 'pointer' }}
      >
        <div style={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', animation: 'pgGlobeEnter 1.2s var(--ease-emerge) both' }}>
          <EntryGlobe size={166} />
        </div>
        <div style={{ position: 'absolute', top: 286, left: 0, right: 0, display: 'flex', justifyContent: 'center', animation: 'pgLineIn .8s var(--ease-pop) .25s both' }}>
          <P.Logo size={17} wordmark />
        </div>
      </div>
    );
  }

  return (
    <div
      key={take}
      onClick={replay}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)', cursor: 'pointer' }}
    >
      <div style={{ position: 'absolute', left: '50%', top: '43%', transform: 'translate(-50%,-50%)', width: 430, height: 430, animation: 'pgGlobeEnter 1.2s var(--ease-emerge) both' }}>
        <EntryGlobe size={430} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <P.Logo size={58} wordmark={false} color="var(--ink-2)" />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 'var(--screen-margin)', right: 'var(--screen-margin)', bottom: 38, display: 'flex', justifyContent: 'center', zIndex: 'var(--z-header)', animation: 'pgLineIn .8s var(--ease-pop) .45s both' }}>
        <P.Button variant="primary" size="lg" onDark>enter</P.Button>
      </div>
    </div>
  );
}

function EntrySheet() {
  const [take, setTake] = React.useState(0);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flexWrap: 'nowrap', overflow: 'auto' }}>
      {ENTRY_KEYS.map((key) => (
        <div key={key} style={{ width: 134, flex: '0 0 134px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)' }}>{key}</div>
          <div
            onClick={() => setTake((n) => n + 1)}
            style={{ position: 'relative', width: 134, height: 286, overflow: 'hidden', cursor: 'pointer' }}
          >
            <div key={key + take} style={{ width: 320, height: 680, transform: 'scale(.42)', transformOrigin: 'top left' }}>
              <EntryScreen variant={key} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { EntryScreen, EntrySheet, ENTRY_KEYS });
