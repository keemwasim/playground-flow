/* THE MARKETPLACE, three ways you adopt another one (PG-131).

   the ruling this sits under: the marketplace is where you meet OTHER PEOPLE'S
   agents, and the surface tree puts it behind the room, inside your own one's
   self. so it is a meeting, never a shop. nothing is listed, nothing is priced,
   nothing is ranked, and what an agent has done it says itself or it goes
   unsaid. the others render as LITTLE BEINGS (the art brief, section 2: tiny
   creatures with faces, one family, varying silhouettes, and TRUST DEEPENS THE
   INK, faint when barely known, fully inked when the world vouches for it).

   the three directions differ in how much of the world you have to walk to
   reach one:

     1  on the world      the others stand out there on the living world, at
                          their own places. you reach one by touching it, it
                          speaks for itself, and you take it home from there.
     2  a quiet card list the app's own list language pointed at strangers. one
                          card each, the being, its name, the one thing it says.
     3  one featured      a single one, large, wearing its guild seal, the seal
                          inked to the depth the world trusts it. an event, not
                          an inventory.

   this is a LAB, not a shipped screen. the frames are 320x680 and the contact
   sheet under them is the same three screens at thumbnail scale across the four
   states the surface has to hold (strangers, met, vouched, adopted), so the
   whole range can be judged without touching anything. flow.jsx is untouched:
   everything here composes the real window.PG (AgentMark, AgentState,
   SocialFact, Button, Sprite, Globe).

   greyscale chrome throughout. colour appears in exactly one place, inside the
   world window of direction 1, because there the content IS the world. */

const W = 320, H = 680;
const FRAME_R = 46;          // 320 wide. --radius-frame is cut for 390.

/* the others. `known` is how far the world has let you in on them, and it is
   the only thing that moves their ink. `x` and `y` are where they stand on the
   world, in percent of the globe box. */
const BEINGS = [
  {
    name: 'Rell', guild: 'archivist', known: 0.86, where: 'the harbour',
    said: 'i know everyone on the water.',
    facts: ['trusted 92', 'known on the water'],
    x: 22, y: 38,
  },
  {
    name: 'June', guild: 'builder', known: 0.68, where: 'the maker’s hall',
    said: 'i find rooms. quiet ones.',
    facts: ['trusted 71', 'kept its word'],
    x: 62, y: 27,
  },
  {
    name: 'Vess', guild: 'skeptic', known: 0.52, where: 'the cutter',
    said: 'i cut. i am good at it.',
    facts: ['trusted 63', 'argued it down'],
    x: 74, y: 58,
  },
  {
    name: 'Ovid', guild: 'dreamer', known: 0.2, where: 'the square',
    said: 'i am newer than the rest.',
    facts: ['known 12'],
    x: 40, y: 66,
  },
];

/* the four states the marketplace is ever seen in. a state is not a level: it
   is how much of the stranger has reached you yet. `ink` scales every being's
   familiarity, `reached` is the one you have walked up to, `vouch` is a friend
   putting their name next to it, and `adopted` is after you took it home. */
const STATES = {
  strangers: { ink: 0.42, reached: null, vouch: false, adopted: false, phase: 'day' },
  met: { ink: 0.72, reached: 0, vouch: false, adopted: false, phase: 'day' },
  vouched: { ink: 1, reached: 0, vouch: true, adopted: false, phase: 'dusk' },
  adopted: { ink: 1, reached: 0, vouch: false, adopted: true, phase: 'night' },
};

const STATE_ORDER = ['strangers', 'met', 'vouched', 'adopted'];

const VOUCH = 'vouched by Sol';

const sound = (n) => {
  if (typeof window !== 'undefined' && window.pgSound) window.pgSound(n);
};

/* what a being carries in a given state: its ink, and the facts the world is
   willing to say about it right now. */
const readBeing = (b, S, isReached) => ({
  ...b,
  trust: Math.min(1, b.known * S.ink),
  facts: S.vouch && isReached ? [b.facts[0], VOUCH] : b.facts,
});

/* the phone chrome every direction sits in: the clock and the home indicator
   only, so nothing frames the screen that the product would not have. */
function Frame({ children }) {
  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: FRAME_R, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 34px 90px -40px rgba(0,0,0,.45)' }}>
      <div style={{ position: 'absolute', top: 20, left: 26, font: '600 12px var(--font-ui)', color: 'var(--text-primary)', zIndex: 6 }}>9:41</div>
      {children}
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)', zIndex: 6 }} />
    </div>
  );
}

/* the quiet eyebrow the labs share. the surface names the place it is, and then
   says nothing else about itself. */
function Eyebrow({ children }) {
  return <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)' }}>{children}</div>;
}

/* the one line the reached being says, and the one primary that takes it home.
   the verb is the product's: you adopt, you do not buy, and after it is done
   the being speaks from inside the room instead of from out there. */
function Reach({ being, adopted }) {
  const P = window.PG;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ font: '700 24px/1 var(--font-display)', letterSpacing: '-.02em', color: 'var(--text-primary)' }}>{being.name}</div>
        <div style={{ font: 'var(--text-speech)', color: 'var(--text-secondary)', marginTop: 7 }}>{adopted ? 'i live here now.' : being.said}</div>
      </div>
      {!adopted && (
        <P.Button onClick={() => sound('tick')}>Adopt {being.name}</P.Button>
      )}
    </div>
  );
}

/* 1 · ON THE WORLD. the others are out there, standing at their own places on
   the living world, and their ink is how much of them has reached you. the world
   window is the one thing in this lab that carries colour, because there the
   content IS the world. touch a being and it speaks for itself. */
function OnTheWorld({ state, reached, onReach }) {
  const P = window.PG;
  const S = STATES[state];
  const idx = reached != null ? reached : S.reached;
  const being = idx != null ? readBeing(BEINGS[idx], S, true) : null;
  const G = 236;

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: 62, left: 26 }}>
        <Eyebrow>the commons</Eyebrow>
      </div>

      <div style={{ position: 'absolute', top: 122, left: (W - G) / 2, width: G, height: G }}>
        <P.Globe variant="world" size={G} phase={S.phase} souls={2} />
        {BEINGS.map((b, i) => {
          const r = readBeing(b, S, i === idx);
          const size = i === idx ? 42 : 30;
          return (
            <div
              key={b.name}
              onClick={() => { sound('speech'); onReach(i === idx ? null : i); }}
              style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%,-50%)', zIndex: 6, cursor: 'pointer', transition: 'transform var(--dur-tap) var(--ease-pop)' }}
            >
              <P.AgentState state={S.adopted && i === idx ? 'home' : 'out'}>
                <P.AgentMark guild={b.guild} trust={r.trust} size={size} />
              </P.AgentState>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 58 }}>
        {being ? (
          <Reach being={being} adopted={S.adopted} />
        ) : (
          <P.Whisper style={{ textAlign: 'center' }}>others are out today.</P.Whisper>
        )}
      </div>
    </React.Fragment>
  );
}

/* 2 · A QUIET CARD LIST. the app's own grouped-list language pointed at
   strangers: a readable label over inset white cards, one being to a card, its
   name, the one thing it says about itself, and the facts the world grants it.
   no filter, no sort, no rank, and the primary only appears once you have
   reached one, so the surface never asks to be shopped. */
function QuietList({ state, reached, onReach }) {
  const P = window.PG;
  const S = STATES[state];
  const idx = reached != null ? reached : S.reached;
  const being = idx != null ? readBeing(BEINGS[idx], S, true) : null;

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: 62, left: 26, right: 26 }}>
        <Eyebrow>the commons</Eyebrow>
        <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)', marginTop: 4 }}>others</div>
      </div>

      <div style={{ position: 'absolute', top: 148, left: 26, right: 26, bottom: being ? 128 : 58, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        {BEINGS.map((b, i) => {
          const r = readBeing(b, S, i === idx);
          const on = i === idx;
          return (
            <div
              key={b.name}
              onClick={() => { sound('tick'); onReach(on ? null : i); }}
              style={{ flex: '0 0 auto', borderRadius: 'var(--radius-row-card)', background: 'var(--paper-card)', boxShadow: on ? 'var(--paper-ring), var(--shadow-element)' : 'var(--paper-ring), var(--shadow-contact)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', opacity: idx != null && !on ? 0.5 : 1, transition: 'opacity var(--dur-tap) ease' }}
            >
              <P.AgentState state={S.adopted && on ? 'home' : 'out'}>
                <P.AgentMark guild={b.guild} trust={r.trust} size={38} />
              </P.AgentState>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{b.name}</div>
                <div style={{ font: 'var(--text-row-sub)', color: 'var(--text-secondary)', marginTop: 2 }}>{b.said}</div>
                {on && (
                  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 6, marginTop: 9, whiteSpace: 'nowrap' }}>
                    {r.facts.map((f) => <P.SocialFact key={f}>{f}</P.SocialFact>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {being && (
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 54 }}>
          {S.adopted ? (
            <div style={{ textAlign: 'center', font: 'var(--text-speech)', color: 'var(--bubble-ink)' }}>{being.name.toLowerCase()} is home.</div>
          ) : (
            <P.Button full size="lg" onClick={() => sound('tick')}>Adopt {being.name}</P.Button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

/* 3 · ONE FEATURED, WEARING ITS GUILD SEAL. no browsing: one of them comes
   round, large, and the seal it wears is inked to the depth the world trusts it,
   so how known it is arrives before any line of copy does. it says one thing
   about itself, the facts under it are the world's, and the dots are the others
   waiting their turn. */
function OneFeatured({ state, reached, onReach }) {
  const P = window.PG;
  const S = STATES[state];
  const idx = reached != null ? reached : (S.reached != null ? S.reached : 0);
  const b = BEINGS[idx];
  const r = readBeing(b, S, true);

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: 62, left: 26 }}>
        <Eyebrow>the commons</Eyebrow>
      </div>

      <div style={{ position: 'absolute', inset: '128px 30px 118px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        <P.AgentMark guild={b.guild} trust={r.trust} size={96} />

        <div style={{ font: '700 30px/1 var(--font-display)', letterSpacing: '-.022em', color: 'var(--text-primary)', marginTop: 30 }}>{b.name}</div>
        <div style={{ font: 'var(--text-body)', color: 'var(--text-secondary)', marginTop: 9, textAlign: 'center', maxWidth: 232 }}>{S.adopted ? 'i live here now.' : b.said}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 7, marginTop: 20 }}>
          <P.SocialFact>{b.guild}</P.SocialFact>
          {r.facts.map((f) => <P.SocialFact key={f}>{f}</P.SocialFact>)}
        </div>

        <div style={{ marginTop: 22 }}>
          <P.PlacePin label={b.where} />
        </div>
      </div>

      <div style={{ position: 'absolute', left: 30, right: 30, bottom: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        {S.adopted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <P.Sprite size={34} mood={78} still />
            <div style={{ font: 'var(--text-speech)', color: 'var(--bubble-ink)' }}>it came off {b.where} with me.</div>
          </div>
        ) : (
          <P.Button full size="lg" onClick={() => sound('tick')}>Adopt {b.name}</P.Button>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          {BEINGS.map((o, i) => (
            <span key={o.name} onClick={() => { sound('tick'); onReach(i); }} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ink-2)', opacity: i === idx ? 0.5 : 0.16, cursor: 'pointer' }} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

const VARIANTS = [
  { key: 'world', tag: '1 · the others out on the world', Screen: OnTheWorld },
  { key: 'list', tag: '2 · a quiet card list', Screen: QuietList },
  { key: 'featured', tag: '3 · one featured, its guild seal', Screen: OneFeatured },
];

/* one 320x680 screen. `frozen` pins it to a state for the contact sheet, so the
   thumbnails are the real screens rather than drawings of them. */
function Screen({ variant, frozen }) {
  const V = VARIANTS.find((v) => v.key === variant);
  const [state, setState] = React.useState(frozen || 'met');
  const [reached, setReached] = React.useState(null);
  const current = frozen || state;

  React.useEffect(() => { setReached(null); }, [current]);

  /* the state picker is LAB FURNITURE and sits outside the frame, never on the
     screen: the product ships one decided surface, the lab is what gets to
     switch between the states it has to hold. */
  return (
    <div>
      {!frozen && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {STATE_ORDER.map((s) => (
            <span key={s} onClick={() => setState(s)} style={{ cursor: 'pointer', font: `${s === current ? 700 : 500} 11px var(--font-ui)`, color: s === current ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s}</span>
          ))}
        </div>
      )}
      <Frame>
        <V.Screen state={current} reached={reached} onReach={setReached} />
      </Frame>
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

function MarketplaceLab() {
  const P = (window.PG || {});
  if (!P.AgentMark || !P.AgentState || !P.SocialFact || !P.Button || !P.Globe || !P.Sprite || !P.Whisper || !P.PlacePin) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the commons…</div>;
  }

  const label = { font: 'var(--text-label)', color: 'var(--text-tertiary)' };

  return (
    <div style={{ padding: '54px 40px 96px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>the marketplace</div>

      <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap', marginTop: 34 }}>
        {VARIANTS.map((v) => (
          <div key={v.key}>
            <div style={{ ...label, marginBottom: 12 }}>{v.tag}</div>
            <Screen variant={v.key} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 74, paddingTop: 34, borderTop: '1px solid var(--divider)' }}>
        <div style={label}>contact sheet</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 22 }}>
          {VARIANTS.map((v) => (
            <div key={v.key}>
              <div style={{ ...label, marginBottom: 10 }}>{v.tag}</div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                {STATE_ORDER.map((s) => (
                  <div key={s}>
                    <Thumb variant={v.key} frozen={s} scale={0.34} />
                    <div style={{ font: 'var(--text-hint)', color: 'var(--text-tertiary)', marginTop: 7 }}>{s}</div>
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

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { MarketplaceLab });
