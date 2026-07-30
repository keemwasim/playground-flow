// React is provided by the loader (DC x-import), no import, no bundler.

const CROSSING_VARIANTS = [
  { id: 'shrink', label: 'sprite' },
  { id: 'bloom', label: 'tear' },
  { id: 'engulf', label: 'world' },
];

function CrossingScene({ variant, replay }) {
  const P = window.PG || {};
  const isShrink = variant === 'shrink';
  const isBloom = variant === 'bloom';
  const isEngulf = variant === 'engulf';

  return (
    <div className={`crossing-frame crossing-frame-${variant}`} key={`${variant}-${replay}`}>
      <div className="crossing-stage">
        <div className="crossing-world">
          {isShrink && <P.Tear open size={174} world="nightAvenue" assetBase="./design-system/assets/" />}
          {isBloom && <P.Tear open size={190} world="nightAvenue" assetBase="./design-system/assets/" />}
          {isEngulf && <P.Globe variant="world" size={320} souls={5} phase="night" />}
        </div>
        {!isEngulf && (
          <div className="crossing-sprite">
            <P.Sprite size={82} form="pebble" still />
          </div>
        )}
      </div>
    </div>
  );
}

function CrossingLab() {
  const [replays, setReplays] = React.useState({ shrink: 0, bloom: 0, engulf: 0 });

  const replay = (id) => setReplays((current) => ({ ...current, [id]: current[id] + 1 }));

  return (
    <main className="crossing-lab">
      <header className="crossing-header">
        <div className="crossing-kicker">the crossing</div>
        <h1>through the tear</h1>
      </header>
      <section className="crossing-contact-sheet" aria-label="Three crossings">
        {CROSSING_VARIANTS.map((item) => (
          <article className="crossing-card" key={item.id}>
            <CrossingScene variant={item.id} replay={replays[item.id]} />
            <div className="crossing-card-foot">
              <span>{item.label}</span>
              <button type="button" onClick={() => replay(item.id)}>replay</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { CrossingLab });
