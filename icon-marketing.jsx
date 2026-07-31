// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Three quiet ways to meet the mark, then the one sheet that carries them. */

const ICON_SIZES = [1024, 180, 120, 60, 40];

function IconTile({ direction = 'flat', size = 220, markSize = 132, className = '' }) {
  const P = window.PG || {};
  return (
    <div className={`icon-tile icon-tile-${direction} ${className}`} style={{ '--icon-size': `${size}px` }}>
      {direction === 'flat' && <P.Logo size={markSize} color="var(--ink-2)" hole="var(--porcelain-0)" />}
      {direction === 'inverse' && <P.Logo size={markSize} color="var(--porcelain-0)" hole="var(--ink-2)" />}
      {direction === 'world' && (
        <>
          <div className="icon-world-globe">
            <P.Globe variant="eclipse" size={Math.round(size * 0.72)} />
          </div>
          <div className="icon-world-mark">
            <P.Logo size={markSize} color="var(--porcelain-0)" hole="var(--ink-2)" />
          </div>
        </>
      )}
    </div>
  );
}

function ListingFrame({ title, note, screenLabel, screenLine, iconDirection = 'flat', reverse = false }) {
  const P = window.PG || {};
  return (
    <article className={`listing-frame ${reverse ? 'listing-frame-reverse' : ''}`}>
      <div className="listing-copy">
        <IconTile direction={iconDirection} size={72} markSize={42} />
        <div className="listing-title">{title}</div>
        <div className="listing-note">{note}</div>
      </div>
      <div className="listing-phone">
        <div className="listing-phone-top">
          <span className="listing-phone-label">{screenLabel}</span>
          <span className="listing-phone-dot" />
        </div>
        <div className="listing-world">
          <P.Globe variant="eclipse" size={126} />
        </div>
        <div className="listing-creature">
          <P.Sprite size={92} form="pebble" mood={55} />
        </div>
        <div className="listing-speech">{screenLine}</div>
        <div className="listing-handle" />
      </div>
    </article>
  );
}

function ContactTile({ direction, size }) {
  const previewSize = Math.min(size, 180);
  const isWorld = direction === 'world';
  const markSize = Math.max(12, Math.round(previewSize * (isWorld ? 0.34 : 0.43)));
  return (
    <div className="contact-cell">
      <IconTile direction={direction} size={previewSize} markSize={markSize} />
      <div className="contact-size">{size === 1024 ? '1024px, scaled' : `${size}px`}</div>
    </div>
  );
}

function IconMarketing() {
  const P = window.PG || {};
  const need = ['Logo', 'Sprite', 'Globe'];
  const missing = need.filter((key) => !P[key]);
  const [, force] = React.useState(0);

  React.useEffect(() => {
    if (missing.length) {
      const timer = setTimeout(() => force((value) => value + 1), 150);
      return () => clearTimeout(timer);
    }
  });

  if (missing.length) {
    return <div className="icon-marketing-wait">waking the mark</div>;
  }

  return (
    <main className="icon-marketing">
      <header className="marketing-header">
        <P.Logo size={20} wordmark />
        <div className="marketing-kicker">playground · icon and store</div>
        <h1>three ways in</h1>
      </header>

      <section className="direction-block">
        <div className="direction-label">01 · the flat ink mark on porcelain</div>
        <div className="direction-shot direction-shot-flat">
          <IconTile direction="flat" size={270} markSize={156} />
          <div className="direction-side">
            <P.Logo size={20} />
            <div className="direction-note">the backwards mark, held still.</div>
          </div>
        </div>
      </section>

      <section className="direction-block">
        <div className="direction-label">02 · the mark with a hint of the world</div>
        <div className="direction-shot direction-shot-world">
          <IconTile direction="world" size={300} markSize={126} />
          <div className="direction-side">
            <P.Logo size={20} />
            <div className="direction-note">the world is close, never loud.</div>
          </div>
        </div>
      </section>

      <section className="direction-block">
        <div className="direction-label">03 · the listing frame</div>
        <div className="listing-grid">
          <ListingFrame
            title="the world is awake"
            note="a small door into somewhere else."
            screenLabel="the crossing"
            screenLine="follow the light home"
          />
          <ListingFrame
            title="home, together"
            note="a companion, looking out."
            screenLabel="the commons"
            screenLine="a place to meet again"
            iconDirection="inverse"
            reverse
          />
        </div>
      </section>

      <section className="direction-block contact-sheet-block">
        <div className="direction-label">contact sheet · the mark at a glance</div>
        <div className="contact-sheet">
          {['flat', 'world', 'inverse'].map((direction, index) => (
            <div className="contact-direction" key={`${direction}-${index}`}>
              <div className="contact-tag">{['flat ink', 'hint of world', 'inverse ink'][index]}</div>
              <div className="contact-row">
                {ICON_SIZES.map((size) => (
                  <ContactTile key={size} direction={direction} size={size} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { IconMarketing });
