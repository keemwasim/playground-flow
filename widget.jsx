// React is provided by the loader (DC x-import), no import, no bundler. See design-system/README.

/* THE HOME SCREEN WIDGET. the companion at a glance, on the phone's own screen,
   before the app is opened. three variants, drawn at the real iOS widget sizes
   (small 170, medium 364 by 170), never inside a phone frame.

   the grammar is the same in all three, taken from the flow: THE MARK when it
   is home, A WHISPER when it is out. the widget never says how long anything
   has taken and never counts anything down (rule 9, the world runs on its own
   time), so the state is carried by what is on the tile, not by a string.

   everything here composes the real design system off window.PG (Sprite, Logo,
   Globe), so the creature on the home screen is the same creature that lives in
   the app. flow.jsx is untouched. */

const PG_WIDGET_SIZES = {
  small: { w: 170, h: 170 },
  medium: { w: 364, h: 170 },
};

/* named tokens for the widget frame. bound on the tile, never ad-hoc grey
   (rule 12). the paper roles come straight from the system, only the widget's
   own frame values are new. */
const PG_WIDGET_TOKENS = {
  '--widget-radius': '22px',
  '--widget-pad': '15px',
  '--widget-paper': 'var(--paper-card)',
  '--widget-ring': 'var(--paper-ring)',
  '--widget-shadow': 'var(--shadow-element)',
  '--widget-name': 'var(--text-primary)',
  '--widget-whisper': 'var(--whisper-fg)',
  '--widget-mark': 'var(--ink-9)',
  '--widget-mark-hole': 'var(--porcelain-0)',
  /* the misted veil at widget scale: where it stood, thinning into fog, no edge */
  '--widget-veil': 'radial-gradient(circle at 50% 50%, rgba(0,0,0,.13) 0%, rgba(0,0,0,.06) 46%, rgba(0,0,0,0) 74%)',
  /* the world tile is night because the world is, the app around it stays porcelain.
     it sits a step under the ink sphere so the sphere still has an edge on it. */
  '--widget-world-paper': 'linear-gradient(180deg, #0E0E11 0%, #050506 100%)',
  '--widget-world-ring': '0 0 0 1px rgba(0,0,0,.16)',
  '--widget-world-name': 'var(--on-ink-1)',
  '--widget-world-whisper': 'var(--on-night-2)',
  '--widget-world-mark': 'var(--on-ink-1)',
  '--widget-world-mark-hole': '#131316',
};

/** The tile itself: an iOS widget at true size, with the platform's corner. */
function WidgetTile({ size = 'small', world = false, children, style }) {
  const S = PG_WIDGET_SIZES[size] || PG_WIDGET_SIZES.small;
  return (
    <div style={{
      ...PG_WIDGET_TOKENS,
      position: 'relative', width: S.w, height: S.h, flex: 'none',
      borderRadius: 'var(--widget-radius)', overflow: 'hidden',
      background: world ? 'var(--widget-world-paper)' : 'var(--widget-paper)',
      boxShadow: (world ? 'var(--widget-world-ring)' : 'var(--widget-ring)') + ', var(--widget-shadow)',
      ...style,
    }}>{children}</div>
  );
}

/** The mark, the tell that it is home. Corner of the tile, quiet. */
function WidgetMark({ world = false }) {
  const { Logo } = window.PG;
  if (!Logo) return null;
  return (
    <span style={{ position: 'absolute', top: 'var(--widget-pad)', left: 'var(--widget-pad)', opacity: world ? .7 : 1, animation: 'pgGlowPulse 6.4s ease-in-out infinite' }}>
      <Logo size={13} color={world ? 'var(--widget-world-mark)' : 'var(--widget-mark)'} hole={world ? 'var(--widget-world-mark-hole)' : 'var(--widget-mark-hole)'} />
    </span>
  );
}

/** Its own line, the tell that it is out. One line, its speech, never chrome. */
function WidgetWhisper({ children, world = false, style }) {
  return (
    <div style={{
      font: '500 12.5px/1.45 var(--font-ui)',
      color: world ? 'var(--widget-world-whisper)' : 'var(--widget-whisper)',
      animation: 'pgDriftUpSolid 4.6s ease-in-out infinite',
      ...style,
    }}>{children}</div>
  );
}

/** Where it stood while it is out: the wall thinned into fog, no hard edge. */
function WidgetVeil({ d = 96, style }) {
  return (
    <span style={{ position: 'relative', display: 'block', width: d, height: d, flex: 'none', ...style }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--widget-veil)', filter: 'blur(6px)', animation: 'pgGlowPulse 7.2s ease-in-out infinite' }} />
    </span>
  );
}

/* ONE. the small square. the companion breathing and nothing else, the mark in
   the corner while it is home. when it is out the square keeps its place: the
   veil where it stood, and its line under it. */
function WidgetCompanion({ size = 'small', state = 'home', name = 'Sol', whisper, mood = 62, faceIdx = 0 }) {
  const { Sprite } = window.PG;
  const home = state === 'home';
  const medium = size === 'medium';
  const body = home
    ? (Sprite ? <Sprite size={medium ? 96 : 84} mood={mood} faceIdx={faceIdx} /> : null)
    : <WidgetVeil d={medium ? 104 : 92} />;

  if (medium) {
    return (
      <WidgetTile size="medium">
        {home && <WidgetMark />}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px 0 46px' }}>
          <div style={{ flex: 'none', display: 'flex', justifyContent: 'center', width: 104 }}>{body}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--widget-name)' }}>{name}</div>
            {!home && <WidgetWhisper style={{ marginTop: 7 }}>{whisper}</WidgetWhisper>}
          </div>
        </div>
      </WidgetTile>
    );
  }

  return (
    <WidgetTile size="small">
      {home && <WidgetMark />}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--widget-pad)', gap: home ? 0 : 10 }}>
        <div style={{ marginTop: home ? 10 : 0 }}>{body}</div>
        {!home && <WidgetWhisper style={{ textAlign: 'center' }}>{whisper}</WidgetWhisper>}
      </div>
    </WidgetTile>
  );
}

/* TWO. the medium, led by the line. the companion sits at the left the way it
   sits in the room, and the rest of the tile is what it is saying. home is the
   mark and its resting line is cut, out is the whisper. */
function WidgetWhisperTile({ size = 'medium', state = 'out', name = 'Sol', whisper, mood = 58, faceIdx = 1 }) {
  const { Sprite } = window.PG;
  const home = state === 'home';
  const small = size === 'small';

  if (small) {
    return (
      <WidgetTile size="small">
        {home && <WidgetMark />}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'var(--widget-pad)' }}>
          <div style={{ position: 'absolute', right: 14, top: 16 }}>
            {home ? (Sprite ? <Sprite size={62} mood={mood} faceIdx={faceIdx} /> : null) : <WidgetVeil d={70} />}
          </div>
          {home
            ? <div style={{ font: 'var(--text-row-title)', color: 'var(--widget-name)' }}>{name}</div>
            : <WidgetWhisper>{whisper}</WidgetWhisper>}
        </div>
      </WidgetTile>
    );
  }

  return (
    <WidgetTile size="medium">
      {home && <WidgetMark />}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: 24, padding: '0 26px 24px 26px' }}>
        <div style={{ flex: 'none', width: 96, display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
          {home ? (Sprite ? <Sprite size={86} mood={mood} faceIdx={faceIdx} /> : null) : <WidgetVeil d={92} />}
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 2 }}>
          <div style={{ font: 'var(--text-row-title)', color: 'var(--widget-name)' }}>{name}</div>
          {home
            ? null
            : <WidgetWhisper style={{ marginTop: 8, font: '500 15px/1.5 var(--font-ui)' }}>{whisper}</WidgetWhisper>}
        </div>
      </div>
    </WidgetTile>
  );
}

/* THREE. while it is away the tile stops being about the room and becomes the
   world it is in: the souls treatment, lives rising off the sphere. the world
   is the only thing on the tile that is not chrome, and it is monochrome, so
   the home screen stays grey. */
function WidgetWorld({ size = 'small', name = 'Sol', whisper, souls = 3 }) {
  const { Globe } = window.PG;
  const medium = size === 'medium';

  if (medium) {
    return (
      <WidgetTile size="medium" world>
        <div style={{ position: 'absolute', left: -44, top: -22 }}>
          {Globe ? <Globe variant="souls" size={214} souls={souls + 1} /> : null}
        </div>
        <div style={{ position: 'absolute', right: 26, top: 0, bottom: 0, width: 176, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ font: 'var(--text-row-title)', color: 'var(--widget-world-name)' }}>{name}</div>
          <WidgetWhisper world style={{ marginTop: 8 }}>{whisper}</WidgetWhisper>
        </div>
      </WidgetTile>
    );
  }

  return (
    <WidgetTile size="small" world>
      <div style={{ position: 'absolute', left: '50%', top: 12, transform: 'translateX(-50%)' }}>
        {Globe ? <Globe variant="souls" size={112} souls={souls} /> : null}
      </div>
      <div style={{ position: 'absolute', left: 'var(--widget-pad)', right: 'var(--widget-pad)', bottom: 'var(--widget-pad)' }}>
        <WidgetWhisper world>{whisper}</WidgetWhisper>
      </div>
    </WidgetTile>
  );
}

/** The family, one entry point. variant: companion | whisper | world. */
function Widget({ variant = 'companion', ...props }) {
  if (variant === 'world') return <WidgetWorld {...props} />;
  if (variant === 'whisper') return <WidgetWhisperTile {...props} />;
  return <WidgetCompanion {...props} />;
}

/* THE CONTACT SHEET. every tile at true widget size on the porcelain, so the
   three can be judged against each other before one is picked. this is the lab,
   not a surface that ships: the product never shows an option board (rule 11). */
const PG_WIDGET_SHEET = [
  {
    tag: 'one · the companion',
    note: 'the small square. it breathes, the mark says it is home. out, the veil holds its place and it speaks one line.',
    tiles: [
      { variant: 'companion', size: 'small', state: 'home', label: 'small · home' },
      { variant: 'companion', size: 'small', state: 'out', label: 'small · out', whisper: 'i am on the harbour road.' },
      { variant: 'companion', size: 'medium', state: 'home', label: 'medium · home' },
    ],
  },
  {
    tag: 'two · the whisper',
    note: 'the medium, led by what it is saying. home is the mark and the name, out is its own line at reading size.',
    tiles: [
      { variant: 'whisper', size: 'medium', state: 'out', label: 'medium · out', whisper: 'two out here have traded on this before.' },
      { variant: 'whisper', size: 'medium', state: 'home', label: 'medium · home' },
      { variant: 'whisper', size: 'small', state: 'out', label: 'small · out', whisper: 'asking after the price.' },
    ],
  },
  {
    tag: 'three · the world',
    note: 'while it is away the tile becomes the world it is in, souls rising off the sphere. the one glimpse, monochrome.',
    tiles: [
      { variant: 'world', size: 'small', label: 'small · away', whisper: 'it is out there.' },
      { variant: 'world', size: 'medium', label: 'medium · away', whisper: 'the square is loud tonight.' },
    ],
  },
];

function WidgetLab() {
  const P = window.PG || {};
  return (
    <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', padding: '54px 26px 80px', display: 'flex', flexDirection: 'column', gap: 54 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {P.Logo ? <P.Logo size={16} color="var(--ink-2)" /> : null}
        <span style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>home screen widget</span>
      </div>

      {PG_WIDGET_SHEET.map((band) => (
        <div key={band.tag} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div style={{ font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', color: 'var(--text-tertiary)' }}>{band.tag}</div>
            <div style={{ font: 'var(--text-row-sub)', color: 'var(--text-secondary)', marginTop: 6, maxWidth: 620 }}>{band.note}</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 30 }}>
            {band.tiles.map((t) => (
              <div key={band.tag + t.label} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <Widget variant={t.variant} size={t.size} state={t.state} whisper={t.whisper} />
                <div style={{ font: 'var(--text-hint)', color: 'var(--text-tertiary)' }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Widget, WidgetLab });
