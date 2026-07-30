/* playground+, held at the edge of the world.
   three quiet directions, one offer, no interruption. */

const lockPath = 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z';

function LockGlyph({ size = 19, tone = 'var(--ink-2)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={tone} strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d={lockPath} />
    </svg>
  );
}

function Phone({ caption, children, contact = false }) {
  return (
    <div className={contact ? 'plus-contact-phone' : 'plus-phone-wrap'}>
      {!contact && <div className="plus-direction">{caption}</div>}
      <div className="plus-phone">{children}</div>
    </div>
  );
}

function Shell({ children, className = '' }) {
  return <div className={`plus-screen ${className}`}>{children}</div>;
}

function QuietExit() {
  const P = (window.PG || {});
  if (!P.Button) return <div className="plus-placeholder">waking the world…</div>;

  return (
    <P.Button variant="quiet" aria-label="leave playground+" style={{ alignSelf: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="var(--text-tertiary)" strokeWidth="2.2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </P.Button>
  );
}

function SoftSell() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.Button || !P.Chip) return <div className="plus-placeholder">waking the world…</div>;

  return (
    <Shell className="plus-soft">
      <div className="plus-soft-main">
        <div className="plus-crowd" aria-hidden="true">
          <div className="plus-creature plus-creature-small">
            <P.Sprite size={48} form="pebble" faceIdx={2} mood={66} />
          </div>
          <div className="plus-creature plus-creature-tall">
            <P.Sprite size={58} form="inkling" faceIdx={1} mood={72} />
          </div>
          <div className="plus-creature plus-creature-center">
            <P.Sprite size={70} form="pebble" faceIdx={0} mood={64} />
          </div>
          <div className="plus-creature plus-creature-mid">
            <P.Sprite size={54} form="pebble" faceIdx={3} mood={70} />
          </div>
        </div>
        <h1 className="plus-display">playground+</h1>
        <p className="plus-line">keep more than one of them.</p>
      </div>
      <div className="plus-soft-actions">
        <P.Button variant="primary" size="lg" full>coming soon</P.Button>
        <QuietExit />
      </div>
    </Shell>
  );
}

const ROWS = [
  'keep more than one of them',
  'more room in the world',
  'its own wardrobe',
  'the other side',
];

function QuietFeatureList() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.Button || !P.Chip) return <div className="plus-placeholder">waking the world…</div>;

  return (
    <Shell className="plus-list">
      <div className="plus-list-head">
        <h1 className="plus-display">playground+</h1>
        <P.Chip mono style={{ background: 'var(--section-tag-bg)', font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)' }}>Playground+</P.Chip>
      </div>
      <div className="plus-section">
        <div className="plus-section-label">what it opens</div>
        <div className="plus-section-card">
          {ROWS.map((row) => (
            <div className="plus-row" key={row}>
              <div className="plus-row-title">{row}</div>
              <div className="plus-row-lock"><LockGlyph tone="var(--row-chevron)" /></div>
            </div>
          ))}
        </div>
      </div>
      <P.Button variant="primary" size="lg" full>coming soon</P.Button>
    </Shell>
  );
}

function LockedThing() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.Button || !P.Chip) return <div className="plus-placeholder">waking the world…</div>;

  return (
    <Shell className="plus-locked">
      <div className="plus-locked-head">
        <P.Chip mono style={{ background: 'var(--section-tag-bg)', font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)' }}>Playground+</P.Chip>
      </div>
      <div className="plus-veil-stage">
        <div className="plus-held-companion" aria-hidden="true">
          <P.Sprite size={128} form="inkling" faceIdx={2} mood={52} />
        </div>
        <div className="plus-misted-veil" aria-hidden="true" />
        <div className="plus-lock-subject"><LockGlyph size={34} /></div>
      </div>
      <div className="plus-locked-copy">
        <h1 className="plus-display">playground+</h1>
        <p className="plus-line">another one waits for you.</p>
      </div>
      <P.Button variant="ghost" size="lg" full>coming soon</P.Button>
    </Shell>
  );
}

function PlusLab() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.Button || !P.Chip) return <div className="plus-placeholder">waking the world…</div>;

  const screens = [
    { caption: 'the soft sell', render: <SoftSell /> },
    { caption: 'the quiet list', render: <QuietFeatureList /> },
    { caption: 'the held thing', render: <LockedThing /> },
  ];

  return (
    <main className="plus-lab">
      <header className="plus-lab-header">
        <div className="plus-lab-kicker">playground+</div>
        <h1>three quiet ways to hold the door</h1>
      </header>
      <section className="plus-phones" aria-label="playground+ directions">
        {screens.map((screen) => (
          <Phone key={screen.caption} caption={screen.caption}>{screen.render}</Phone>
        ))}
      </section>
      <section className="plus-contact">
        <div className="plus-contact-label">contact sheet</div>
        <div className="plus-contact-row">
          {screens.map((screen) => <Phone key={screen.caption} contact>{screen.render}</Phone>)}
        </div>
      </section>
    </main>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { PlusLab });
