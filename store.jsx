/* THE STORE, three ways it is shopped (PG-129).

   the ruling this sits under: the store sells COSMETICS ONLY and stays out of
   the economy. money buys how the companion looks and how its room is lit, and
   it never buys standing, trust or anything the world says about it. so nothing
   here carries a price next to a social fact, there is no tier, no rarity ladder
   and no bundle, because each of those pulls appearance back into the game.
   the boundary is held by what the screen is ABLE to show, not by a line of copy
   explaining it (rule 4, the hard reject: no "worn, never spent on standing").

   the three directions share one catalog, and differ in how much of the
   companion is in the room while you shop:

     1  the wardrobe grid    every look at once, laid out flat. the one it wears
                             is marked, touching another puts it on, and the
                             companion watches from the top of the screen.
     2  dress it live        the companion is the screen. the swatch row under
                             it re-skins the real sprite and relights the room
                             on touch, so the purchase is the preview.
     3  one look featured    a single look fills the surface, worn, with the
                             rest of the catalog reduced to a row of marks you
                             move through.

   this is a LAB, not a shipped screen. the frames are 320x680 and the contact
   sheet under them is the same three screens at thumbnail scale in their worn,
   trying, new and dark states, so the whole range can be judged at once.
   flow.jsx is untouched: everything here composes the real window.PG (Sprite,
   Chip, Button).

   greyscale throughout. the looks and the lights are the CONTENT of this
   surface, so they are the only values in the file that are not chrome tokens,
   and they are named entries in the catalog below rather than ad-hoc greys
   sprinkled through the markup (rule 12). no window onto the world opens here,
   so no colour enters. */

const W = 320, H = 680;
const FRAME_R = 46;          // 320 wide. --radius-frame is cut for 390.

const NAME = 'Sol';

/* THE CATALOG. a look is a body skin, a light is what the room is lit by, and
   a form is which creature it is. all three are appearance and nothing else,
   which is the whole reason they are allowed to be bought. */
const LOOKS = {
  porcelain: { tint: { hi: '#FFFFFF', mid: '#F2F2F5', lo: '#E4E4E9' } },
  fog:       { tint: { hi: '#F6F7F8', mid: '#DEE0E3', lo: '#C6C9CE' } },
  clay:      { tint: { hi: '#F4F2EF', mid: '#D9D5CF', lo: '#BEB8B0' } },
  dusk:      { tint: { hi: '#DDDDE2', mid: '#AEB0B8', lo: '#85868F' } },
  ember:     { tint: { hi: '#EFECE9', mid: '#CBC5BF', lo: '#A29A93' } },
  night:     { tint: { hi: '#B7B8BE', mid: '#85868F', lo: '#5C5D65' } },
};

const LIGHTS = {
  dawn:      { wash: 'linear-gradient(180deg, #FFFFFF 0%, #F4F4F6 100%)', plate: 'linear-gradient(180deg, #D7D8DD 0%, #BFC1C8 100%)' },
  overcast:  { wash: 'linear-gradient(180deg, #F1F1F4 0%, #E4E4E8 100%)', plate: 'linear-gradient(180deg, #CBCDD3 0%, #B2B4BC 100%)' },
  lamplight: { wash: 'radial-gradient(120% 70% at 50% 26%, #FCFCFD 0%, #E2E2E7 58%, #D2D2D8 100%)', plate: 'radial-gradient(120% 70% at 50% 26%, #D2D4D9 0%, #C0C2C9 58%, #B7BAC2 100%)' },
};

const LOOK_ORDER = Object.keys(LOOKS);
const LIGHT_ORDER = Object.keys(LIGHTS);
const FORM_ORDER = ['pebble', 'inkling'];

const SHELVES = ['looks', 'lights', 'forms'];

/* the four states the store is ever seen in. a state is not a level: `new` is a
   look that has just landed on the shelf, `dark` is the far end of the catalog
   with the room lit low, and neither is progress through anything. */
const STATES = {
  worn:   { look: 'fog',       light: 'dawn',      form: 'pebble',  trying: null,       fresh: [], mood: 66 },
  trying: { look: 'fog',       light: 'dawn',      form: 'pebble',  trying: 'clay',     fresh: [], mood: 78 },
  new:    { look: 'porcelain', light: 'dawn',      form: 'pebble',  trying: null,       fresh: ['ember', 'night'], mood: 72 },
  dark:   { look: 'night',     light: 'lamplight', form: 'inkling', trying: null,       fresh: [], mood: 58 },
};

const STATE_ORDER = ['worn', 'trying', 'new', 'dark'];

const sound = (n) => {
  if (typeof window !== 'undefined' && window.pgSound) window.pgSound(n);
};

/* the phone chrome every direction sits in: the clock and the home indicator
   only, so nothing frames the screen that the product would not have. */
function Frame({ wash, children }) {
  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: FRAME_R, overflow: 'hidden', background: wash || 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 34px 90px -40px rgba(0,0,0,.45)', transition: 'background var(--dur-enter) ease' }}>
      <div style={{ position: 'absolute', top: 20, left: 26, font: '600 12px var(--font-ui)', color: 'var(--text-primary)', zIndex: 3 }}>9:41</div>
      {children}
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)' }} />
    </div>
  );
}

/* the title block. the store is reached from the companion's own side nav, so
   the surface says whose things these are and then gets out of the way. */
function Title({ children }) {
  return (
    <div style={{ position: 'absolute', top: 62, left: 26, right: 26 }}>
      <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-tertiary)' }}>{NAME.toLowerCase()}</div>
      <div style={{ font: 'var(--text-screen-title)', letterSpacing: '-.02em', color: 'var(--text-primary)', marginTop: 4 }}>{children}</div>
    </div>
  );
}

/* a swatch is the good itself. the worn one is ringed in ink, a look that has
   just landed carries a single ink dot, and that dot is the entire notion of
   news on this surface. */
function Swatch({ kind, name, size, worn, fresh, dim, onClick }) {
  const fill = kind === 'lights' ? LIGHTS[name].wash : `radial-gradient(circle at 36% 26%, ${LOOKS[name].tint.hi} 0%, ${LOOKS[name].tint.mid} 52%, ${LOOKS[name].tint.lo} 100%)`;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative', width: size, height: size, borderRadius: size * 0.3,
        background: fill,
        boxShadow: worn ? '0 0 0 2px var(--text-primary), var(--shadow-contact)' : 'var(--paper-ring), var(--shadow-contact)',
        opacity: dim ? 0.5 : 1, cursor: onClick ? 'pointer' : 'default',
        transition: 'opacity var(--dur-tap) ease, box-shadow var(--dur-tap) ease',
      }}
    >
      {fresh && <div style={{ position: 'absolute', top: 7, right: 7, width: 5, height: 5, borderRadius: '50%', background: 'var(--text-primary)' }} />}
    </div>
  );
}

/* 1 · THE WARDROBE GRID. the whole catalog laid flat, the way a wardrobe is
   read: you see everything it owns at once. the companion sits above the grid
   wearing whatever is currently picked, so trying a look on never leaves the
   list. the shelf chips are the only navigation, and the keep button appears
   only while something unworn is on. */
function WardrobeGrid({ worn, trying, fresh, shelf, onShelf, onPick, onKeep }) {
  const P = window.PG;
  const showing = trying || worn;
  const order = shelf === 'looks' ? LOOK_ORDER : shelf === 'lights' ? LIGHT_ORDER : FORM_ORDER;

  return (
    <React.Fragment>
      <Title>the store</Title>

      <div style={{ position: 'absolute', top: 132, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <P.Sprite size={106} mood={showing.mood} faceIdx={0} tint={LOOKS[showing.look].tint} form={showing.form} />
      </div>

      <div style={{ position: 'absolute', top: 246, left: 26, right: 26, display: 'flex', gap: 7 }}>
        {SHELVES.map((s) => (
          <P.Chip key={s} selected={s === shelf} onClick={() => { sound('tick'); onShelf(s); }}>{s}</P.Chip>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 350, left: 26, right: 26, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px 14px' }}>
        {order.map((name) => {
          const isWorn = shelf === 'looks' ? showing.look === name : shelf === 'lights' ? showing.light === name : showing.form === name;
          return (
            <div key={name} style={{ textAlign: 'center' }}>
              {shelf === 'forms' ? (
                <div
                  onClick={() => { sound('slide'); onPick(shelf, name); }}
                  style={{ height: 78, borderRadius: 22, background: 'var(--paper-well)', boxShadow: isWorn ? '0 0 0 2px var(--text-primary), var(--shadow-contact)' : 'var(--paper-ring), var(--shadow-contact)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'box-shadow var(--dur-tap) ease' }}
                >
                  <P.Sprite size={44} mood={showing.mood} faceIdx={0} tint={LOOKS[showing.look].tint} form={name} still />
                </div>
              ) : (
                <Swatch
                  kind={shelf}
                  name={name}
                  size={84}
                  worn={isWorn}
                  fresh={fresh.indexOf(name) >= 0}
                  onClick={() => { sound('slide'); onPick(shelf, name); }}
                />
              )}
              <div style={{ font: 'var(--text-hint)', color: isWorn ? 'var(--text-primary)' : 'var(--text-tertiary)', marginTop: 6 }}>{name}</div>
            </div>
          );
        })}
      </div>

      {trying && (
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 46 }}>
          <P.Button full onClick={() => { sound('settle'); onKeep(); }}>keep it on</P.Button>
        </div>
      )}
    </React.Fragment>
  );
}

/* 2 · DRESS IT LIVE. the companion IS the screen and the room is already lit by
   what is picked, so there is no preview pane and no before and after: the
   purchase is the thing standing in front of you. the row under it is the
   catalog reduced to swatches, and the shelf it belongs to is one swipe of the
   chips away. */
function DressItLive({ worn, trying, fresh, shelf, onShelf, onPick, onKeep }) {
  const P = window.PG;
  const showing = trying || worn;
  const order = shelf === 'looks' ? LOOK_ORDER : shelf === 'lights' ? LIGHT_ORDER : FORM_ORDER;

  return (
    <React.Fragment>
      <Title>{NAME}</Title>

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <P.Sprite size={188} mood={showing.mood} faceIdx={0} tint={LOOKS[showing.look].tint} form={showing.form} />
      </div>

      <div style={{ position: 'absolute', left: 26, right: 26, bottom: trying ? 142 : 84, transition: 'bottom var(--dur-enter) ease' }}>
        <div style={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
          {SHELVES.map((s) => (
            <P.Chip key={s} selected={s === shelf} onClick={() => { sound('tick'); onShelf(s); }}>{s}</P.Chip>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          {order.map((name) => {
            const isWorn = shelf === 'looks' ? showing.look === name : shelf === 'lights' ? showing.light === name : showing.form === name;
            return shelf === 'forms' ? (
              <div
                key={name}
                onClick={() => { sound('slide'); onPick(shelf, name); }}
                style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--paper-well)', boxShadow: isWorn ? '0 0 0 2px var(--text-primary)' : 'var(--paper-ring)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <P.Sprite size={26} mood={showing.mood} faceIdx={0} tint={LOOKS[showing.look].tint} form={name} still />
              </div>
            ) : (
              <Swatch
                key={name}
                kind={shelf}
                name={name}
                size={42}
                worn={isWorn}
                fresh={fresh.indexOf(name) >= 0}
                onClick={() => { sound('slide'); onPick(shelf, name); }}
              />
            );
          })}
        </div>
      </div>

      {trying && (
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 46 }}>
          <P.Button full onClick={() => { sound('settle'); onKeep(); }}>keep it on</P.Button>
        </div>
      )}
    </React.Fragment>
  );
}

/* 3 · ONE LOOK FEATURED. the store shows one thing at a time, at the size the
   thing deserves, worn. the rest of the catalog is a row of marks under it, so
   moving through the shelf is a step rather than a page of goods. the name of
   the look is the only word on the surface besides the one control. */
function OneFeatured({ worn, trying, fresh, cursor, onCursor, onKeep }) {
  const P = window.PG;
  const showing = trying || worn;
  const featured = LOOK_ORDER[((cursor % LOOK_ORDER.length) + LOOK_ORDER.length) % LOOK_ORDER.length];
  const on = showing.look === featured;
  const L = LOOKS[featured];

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: 118, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 242, height: 242, borderRadius: 66, background: LIGHTS[showing.light].plate, boxShadow: 'var(--paper-ring), var(--shadow-element)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background var(--dur-enter) ease' }}>
          <P.Sprite size={156} mood={showing.mood} faceIdx={0} tint={L.tint} form={showing.form} />
        </div>

        <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.02em', color: 'var(--text-primary)', marginTop: 24 }}>{featured}</div>
      </div>

      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 166, display: 'flex', gap: 9, justifyContent: 'center', alignItems: 'center' }}>
        {LOOK_ORDER.map((name, i) => {
          const here = name === featured;
          return (
            <div
              key={name}
              onClick={() => { sound('tick'); onCursor(i); }}
              style={{ position: 'relative', width: here ? 22 : 7, height: 7, borderRadius: 4, background: here ? 'var(--text-primary)' : 'var(--divider)', cursor: 'pointer', transition: 'width var(--dur-tap) ease, background var(--dur-tap) ease' }}
            >
              {fresh.indexOf(name) >= 0 && !here && <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--text-primary)' }} />}
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 46 }}>
        <P.Button full variant={on ? 'ghost' : 'primary'} style={on ? { background: 'var(--well)', boxShadow: 'var(--paper-ring)' } : undefined} onClick={() => { sound(on ? 'tick' : 'settle'); if (!on) onKeep(featured); }}>
          {on ? 'worn' : 'put it on'}
        </P.Button>
      </div>
    </React.Fragment>
  );
}

const VARIANTS = [
  { key: 'grid', tag: '1 · the wardrobe grid', Screen: WardrobeGrid },
  { key: 'live', tag: '2 · dress it live', Screen: DressItLive },
  { key: 'featured', tag: '3 · one look featured', Screen: OneFeatured },
];

/* one 320x680 screen. `frozen` pins it to a state for the contact sheet, so the
   thumbnails are the real screens rather than drawings of them. */
function Screen({ variant, frozen }) {
  const V = VARIANTS.find((v) => v.key === variant);
  const base = STATES[frozen || 'worn'];

  const [worn, setWorn] = React.useState({ look: base.look, light: base.light, form: base.form, mood: base.mood });
  const [trying, setTrying] = React.useState(base.trying ? { look: base.trying, light: base.light, form: base.form, mood: base.mood } : null);
  const [shelf, setShelf] = React.useState('looks');
  const [cursor, setCursor] = React.useState(Math.max(0, LOOK_ORDER.indexOf(base.trying || base.look)));
  const [state, setState] = React.useState(frozen || 'worn');

  React.useEffect(() => {
    setState(frozen || 'worn');
    setWorn({ look: base.look, light: base.light, form: base.form, mood: base.mood });
    setTrying(base.trying ? { look: base.trying, light: base.light, form: base.form, mood: base.mood } : null);
    setShelf('looks');
    setCursor(Math.max(0, LOOK_ORDER.indexOf(base.trying || base.look)));
  }, [frozen]);

  const pick = (kind, name) => {
    const from = trying || worn;
    const key = kind === 'looks' ? 'look' : kind === 'lights' ? 'light' : 'form';
    const next = Object.assign({}, from, { [key]: name });
    const same = next.look === worn.look && next.light === worn.light && next.form === worn.form;
    setTrying(same ? null : next);
  };

  const keep = (look) => {
    const next = look ? Object.assign({}, trying || worn, { look }) : trying;
    if (next) setWorn(next);
    setTrying(null);
    if (look) setCursor(Math.max(0, LOOK_ORDER.indexOf(look)));
  };

  const showing = trying || worn;

  /* the state picker is LAB FURNITURE and sits outside the frame, never on the
     screen: the product ships one decided surface, the lab is what gets to
     switch between the states it has to hold. */
  const current = frozen || state;
  return (
    <div>
      {!frozen && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {STATE_ORDER.map((s) => (
            <span key={s} onClick={() => { const b = STATES[s]; setState(s); setWorn({ look: b.look, light: b.light, form: b.form, mood: b.mood }); setTrying(b.trying ? { look: b.trying, light: b.light, form: b.form, mood: b.mood } : null); setCursor(Math.max(0, LOOK_ORDER.indexOf(b.trying || b.look))); }} style={{ cursor: 'pointer', font: `${s === current ? 700 : 500} 11px var(--font-ui)`, color: s === current ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s}</span>
          ))}
        </div>
      )}
      <Frame wash={LIGHTS[showing.light].wash}>
        <V.Screen
          worn={worn}
          trying={trying}
          fresh={STATES[current].fresh}
          shelf={shelf}
          onShelf={setShelf}
          onPick={pick}
          onKeep={keep}
          cursor={cursor}
          onCursor={setCursor}
        />
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

function StoreLab() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.Chip || !P.Button) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the companion…</div>;
  }

  const label = { font: 'var(--text-label)', color: 'var(--text-tertiary)' };

  return (
    <div style={{ padding: '54px 40px 96px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>the store</div>

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

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { StoreLab });
