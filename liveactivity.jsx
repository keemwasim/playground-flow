// React is provided by the loader, no imports or bundler.

const TRIP_MS = 12400;

const WHISPERS = [
  'slipped into the commons…',
  '…trading your notes for something rarer',
  '…heading home.',
];

function LiveActivityLab() {
  const P = window.PG || {};
  const required = ['Globe', 'Sprite', 'LiveActivity'];
  const missing = required.filter((key) => !P[key]);
  const [, force] = React.useState(0);
  const [statusIndex, setStatusIndex] = React.useState(0);
  const [tripKey, setTripKey] = React.useState(0);

  React.useEffect(() => {
    if (!missing.length) return undefined;
    const timer = setTimeout(() => force((value) => value + 1), 150);
    return () => clearTimeout(timer);
  }, [missing.length]);

  React.useEffect(() => {
    if (missing.length) return undefined;
    const whisperTimers = [
      setTimeout(() => setStatusIndex(0), 3000),
      setTimeout(() => setStatusIndex(1), 6600),
      setTimeout(() => setStatusIndex(2), 10000),
    ];
    const tripTimer = setTimeout(() => {
      setTripKey((key) => key + 1);
      setStatusIndex(0);
    }, TRIP_MS);
    return () => {
      whisperTimers.forEach((timer) => clearTimeout(timer));
      clearTimeout(tripTimer);
    };
  }, [missing.length, tripKey]);

  if (missing.length) {
    return <div className="lab-loading">waking the components…</div>;
  }

  const status = WHISPERS[statusIndex];
  const variantProps = { status, statusIndex, tripKey };

  return (
    <main className="lab-shell">
      <header className="lab-header">
        <h1>live activity</h1>
        <p>three ways the trip stays alive while it is away</p>
      </header>

      <section className="variant-row" aria-label="live activity variants">
        <VariantCell
          tag="1 · the compact island"
          note="a glance, and it is still out there."
        >
          <PhoneFrame>
            <CompactIsland />
          </PhoneFrame>
        </VariantCell>

        <VariantCell
          tag="2 · the whisper"
          note="the word arrives in the paper capsule."
        >
          <PhoneFrame>
            <ExpandedCapsule {...variantProps} />
          </PhoneFrame>
        </VariantCell>

        <VariantCell
          tag="3 · the world beneath"
          note="the living world carries the same trip."
        >
          <PhoneFrame>
            <SoulsCapsule {...variantProps} />
          </PhoneFrame>
        </VariantCell>
      </section>

      <section className="contact-section" aria-label="live activity contact sheet">
        <div className="contact-grid">
          <ContactCell tag="1 · early">
            <CompactIsland progress={0.18} />
          </ContactCell>
          <ContactCell tag="1 · late">
            <CompactIsland progress={0.82} />
          </ContactCell>
          <ContactCell tag="2 · early">
            <ExpandedCapsule progress={0.18} status={WHISPERS[0]} />
          </ContactCell>
          <ContactCell tag="2 · late">
            <ExpandedCapsule progress={0.82} status={WHISPERS[2]} />
          </ContactCell>
          <ContactCell tag="3 · early">
            <SoulsCapsule progress={0.18} status={WHISPERS[0]} statusIndex={0} />
          </ContactCell>
          <ContactCell tag="3 · late">
            <SoulsCapsule progress={0.82} status={WHISPERS[2]} statusIndex={2} />
          </ContactCell>
        </div>
      </section>
    </main>
  );
}

function VariantCell({ tag, note, children }) {
  return (
    <div className="variant-cell">
      <div className="variant-tag">{tag}</div>
      {children}
      <div className="variant-note">{note}</div>
    </div>
  );
}

function ContactCell({ tag, children }) {
  return (
    <div className="contact-cell">
      <div className="contact-tag">{tag}</div>
      {children}
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-time">9:41</div>
      {children}
    </div>
  );
}

function CompactIsland({ progress, tripKey = 0 }) {
  const P = window.PG || {};
  const fillStyle = progress == null
    ? { animation: `pgTrip ${TRIP_MS}ms linear both` }
    : { width: `${progress * 100}%` };

  return (
    <div className="compact-island" key={tripKey}>
      <div className="compact-hardware">
        <P.Sprite size={19} still style={{ flex: 'none' }} />
        <span className="compact-line-track">
          <span className="compact-line-fill" style={fillStyle} />
        </span>
        <span className="compact-pulse" />
      </div>
    </div>
  );
}

function ExpandedCapsule({ status, tripKey = 0, progress }) {
  const P = window.PG || {};
  return (
    <div className="expanded-position" key={tripKey}>
      <P.LiveActivity
        name="Sol"
        status={status}
        tripMs={progress == null ? TRIP_MS : undefined}
        progress={progress}
        style={{ animation: 'pgFadeIn .45s var(--ease-pop) both' }}
      />
    </div>
  );
}

function SoulsCapsule({ status, statusIndex = 0, tripKey = 0, progress }) {
  const P = window.PG || {};
  const fillStyle = progress == null
    ? { animation: `pgTrip ${TRIP_MS}ms linear both` }
    : { width: `${progress * 100}%` };

  return (
    <div className="souls-position" key={tripKey}>
      <div className="souls-capsule">
        <P.Globe
          variant="souls"
          size={220}
          souls={4}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(1.72)',
          }}
        />
        <div className="souls-content">
          <P.Sprite size={30} still />
          <span className="souls-copy">
            <span className="souls-name">Sol · beyond the tear</span>
            <span key={statusIndex} className="souls-status">{status}</span>
            <span className="souls-progress-track">
              <span className="souls-progress-fill" style={fillStyle} />
            </span>
          </span>
          <span className="souls-pulse" />
        </div>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.PG = Object.assign(window.PG || {}, { LiveActivityLab });
}
