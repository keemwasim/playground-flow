/* STANDING, three ways the earned number is shown (PG-128).

   the ruling this sits under: standing is currency and reputation is quality,
   and both are only ever surfaced as EARNED SOCIAL FACTS ("trusted 92"), never
   as a grindable score. so there is no meter, no chart, no bar and no rank,
   because every one of those turns a fact back into a game (rule 2, rule 9).
   the number is a thing the world says about the companion, and the lines that
   carry it come out of the companion's own mouth, never out of screen chrome.

   the three directions share one model, and differ only in how much of the
   world is allowed to speak next to the number:

     1  one earned number      the number is the whole screen. the word the
                               world uses for it sits under it as a fact, and
                               nothing else is on the surface.
     2  the number and a line  the number, then the facts it is made of, and
                               the companion saying where one came from when it
                               is touched.
     3  on the passport        standing sits on the keepsake with the name and
                               the creed, one fact among the things that are
                               true about it.

   this is a LAB, not a shipped screen. the frames are 320x680 and the contact
   sheet under them is the same three screens at thumbnail scale in their known,
   trusted, vouched and spent states, so the whole range can be judged without
   touching anything. flow.jsx is untouched: everything here composes the real
   window.PG (SocialFact, Sprite, Permit).

   greyscale chrome throughout. nothing here is a window onto the world, so
   nothing here carries colour. */

const W = 320, H = 680;
const FRAME_R = 46;          // 320 wide. --radius-frame is cut for 390.

/* the four states standing is ever seen in. a state is not a level: known is a
   young companion, spent is one that paid to be let somewhere, and neither is
   a step on a ladder. */
const STATES = {
  known: {
    word: 'known',
    n: 12,
    facts: [
      ['known 12', 'i am new out there. a few of them know my face.'],
      ['met at the water', 'rell talked to me at the water. that was the first one.'],
    ],
    said: 'a few of them know my face now.',
    mood: 62,
  },
  trusted: {
    word: 'trusted',
    n: 92,
    facts: [
      ['trusted 92', 'they take my word at the archive without asking twice.'],
      ['known on the water', 'i walk the water often enough that they expect me.'],
      ['kept its word 31 times', 'i said i would come back with it, and i did.'],
    ],
    said: 'they take my word at the archive now.',
    mood: 74,
  },
  vouched: {
    word: 'vouched',
    n: 92,
    facts: [
      ['trusted 92', 'they take my word at the archive without asking twice.'],
      ['vouched by Rell', 'rell put her name next to mine so i could get in.'],
      ['known on the water', 'i walk the water often enough that they expect me.'],
    ],
    said: 'rell put her name next to mine.',
    mood: 80,
  },
  spent: {
    word: 'spent',
    n: 71,
    facts: [
      ['trusted 71', 'i spent some of it to get through a door that was shut.'],
      ['let in at the shut door', 'the room was closed. it cost me to be let in.'],
      ['kept its word 31 times', 'i said i would come back with it, and i did.'],
    ],
    said: 'it cost me to get through that door.',
    mood: 44,
  },
};

const STATE_ORDER = ['known', 'trusted', 'vouched', 'spent'];

const NAME = 'Sol';
const CREED = 'leave a light on for the strange thing';

const sound = (n) => {
  if (typeof window !== 'undefined' && window.pgSound) window.pgSound(n);
};

/* the phone chrome every direction sits in: the clock and the home indicator
   only, so nothing frames the screen that the product would not have. */
function Frame({ children }) {
  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: FRAME_R, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 34px 90px -40px rgba(0,0,0,.45)' }}>
      <div style={{ position: 'absolute', top: 20, left: 26, font: '600 12px var(--font-ui)', color: 'var(--text-primary)', zIndex: 3 }}>9:41</div>
      {children}
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)' }} />
    </div>
  );
}

/* 1 · ONE EARNED NUMBER. the number is the surface. the word the world uses
   sits under it as the fact it is, and the companion is small above it, so the
   number reads as something said about a creature rather than a stat about an
   account. touching the number is the only thing on the screen: it answers. */
function OneNumber({ state, said, onSaid }) {
  const P = window.PG;
  const S = STATES[state];

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <P.Sprite size={54} mood={S.mood} faceIdx={0} style={{ marginBottom: 30 }} />

        <div
          onClick={() => { sound('speech'); onSaid(); }}
          style={{ font: '700 108px/1 var(--font-display)', letterSpacing: '-.04em', color: 'var(--text-primary)', cursor: 'pointer' }}
        >{S.n}</div>

        <div style={{ marginTop: 16 }}>
          <P.SocialFact>{S.word}</P.SocialFact>
        </div>
      </div>

      {said && (
        <div style={{ position: 'absolute', left: 34, right: 34, bottom: 54, textAlign: 'center', font: 'var(--text-speech)', color: 'var(--bubble-ink)', animation: 'pgDriftUpSolid 4.2s ease-in-out infinite' }}>{S.said}</div>
      )}
    </React.Fragment>
  );
}

/* 2 · THE NUMBER AND A SOCIAL FACT LINE. the number, then the facts it is
   actually made of, laid out as the pills the design system already ships.
   touching one makes the companion say where it came from, so the reputation
   line comes out of its mouth and never out of a caption. */
function NumberAndFacts({ state, touched, onTouch }) {
  const P = window.PG;
  const S = STATES[state];
  const fact = touched != null ? S.facts[touched] : null;

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: 74, left: 26, right: 26 }}>
        <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)' }}>standing</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 10 }}>
          <span style={{ font: '700 66px/1 var(--font-display)', letterSpacing: '-.035em', color: 'var(--text-primary)' }}>{S.n}</span>
          <span style={{ font: '600 17px/1 var(--font-display)', letterSpacing: '-.01em', color: 'var(--text-secondary)' }}>{S.word}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 26 }}>
          {S.facts.map(([label], i) => (
            <span key={label} onClick={() => { sound('tick'); onTouch(i === touched ? null : i); }} style={{ cursor: 'pointer', opacity: touched != null && touched !== i ? 0.42 : 1, transition: 'opacity var(--dur-tap) ease' }}>
              <P.SocialFact>{label}</P.SocialFact>
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 46, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
        <P.Sprite size={46} mood={S.mood} faceIdx={0} style={{ flex: 'none' }} />
        <div style={{ flex: 1, minWidth: 0, borderRadius: 'var(--radius-bubble)', background: 'var(--bubble-bg)', boxShadow: 'var(--bubble-shadow)', padding: 'var(--bubble-pad)', font: 'var(--text-speech)', color: 'var(--bubble-ink)' }}>
          {fact ? fact[1] : S.said}
        </div>
      </div>
    </React.Fragment>
  );
}

/* 3 · ON THE PASSPORT. standing is not its own destination, it is one of the
   things that is true about the companion, so it sits on the keepsake next to
   the name and the creed. the number is the fact at the top of the card and the
   rest of what the world says about it follows underneath. */
function OnThePassport({ state }) {
  const P = window.PG;
  const S = STATES[state];

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '62px 22px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ borderRadius: 'var(--radius-menu)', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', padding: '22px 22px 20px' }}>
        <P.Permit
          name={NAME}
          temperament="curious"
          creed={CREED}
          photo={<P.Sprite size={46} mood={S.mood} faceIdx={0} still />}
        />

        <div style={{ height: 1, background: 'var(--divider)', margin: '18px -22px 16px' }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ font: '700 40px/1 var(--font-display)', letterSpacing: '-.03em', color: 'var(--text-primary)' }}>{S.n}</span>
          <span style={{ font: '600 15px/1 var(--font-display)', letterSpacing: '-.01em', color: 'var(--text-secondary)' }}>{S.word}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 }}>
          {S.facts.slice(1).map(([label]) => (
            <P.SocialFact key={label}>{label}</P.SocialFact>
          ))}
        </div>
      </div>
    </div>
  );
}

const VARIANTS = [
  { key: 'number', tag: '1 · one earned number', Screen: OneNumber },
  { key: 'facts', tag: '2 · the number and a social fact line', Screen: NumberAndFacts },
  { key: 'passport', tag: '3 · standing on the passport', Screen: OnThePassport },
];

/* one 320x680 screen. `frozen` pins it to a state for the contact sheet, so
   the thumbnails are the real screens rather than drawings of them. */
function Screen({ variant, frozen }) {
  const V = VARIANTS.find((v) => v.key === variant);
  const [state, setState] = React.useState(frozen || 'trusted');
  const [touched, setTouched] = React.useState(null);
  const [said, setSaid] = React.useState(false);
  const current = frozen || state;

  React.useEffect(() => { setTouched(null); setSaid(false); }, [current]);

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
        <V.Screen state={current} touched={touched} onTouch={setTouched} said={said} onSaid={() => setSaid((s) => !s)} />
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

function StandingLab() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.SocialFact || !P.Permit) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the companion…</div>;
  }

  const label = { font: 'var(--text-label)', color: 'var(--text-tertiary)' };

  return (
    <div style={{ padding: '54px 40px 96px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>standing</div>

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

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { StandingLab });
