// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** The companion. Ruled late July 2026: the WISP is CUT (keem: not good enough,
    render quality below the bar). The family is PEBBLE (porcelain clay, the
    default) and INKLING (a brushstroke standing up). Boxling remains as a
    legacy form for the archived prototypes.
    Fidelity pass (July 2026): eyes carry a catchlight, bodies take a top rim
    highlight and soft occlusion, a ground shadow anchors each. Eyes only, no mouths (keem ruling). */
/* FACES: every agent is a different individual of the same family (keem
   2026-07-23). eye spacing, size, and lid height vary, plus the pebble's blob.
   monochrome and in-family, never a new species. */
/* the EERIE EYES: the house mark used as the creature's eyes. left is the
   full drop, right is the narrow one, drawn as one pair so the asymmetry
   between them survives at every size. */
/* MOOD (v2): the creature carries a state and its BODY reads it. no new
   surfaces, no labels, no score. a value from 0 (spent) to 100 (restless)
   changes how fast it breathes, how high it bobs, how open its eyes are, and
   how far it leans. the owner never sees the number, only the difference. */
const MOODS = [
  { at: 0,  key: 'spent',     breathe: '7.4s', bob: '9.2s', lid: 0.42, lift: 4,  tilt: -1.5 },
  { at: 26, key: 'resting',   breathe: '6.0s', bob: '7.4s', lid: 0.72, lift: 2,  tilt: -0.6 },
  { at: 48, key: 'attentive', breathe: '4.6s', bob: '6.0s', lid: 1.00, lift: 0,  tilt: 0 },
  { at: 70, key: 'pleased',   breathe: '3.9s', bob: '4.8s', lid: 1.06, lift: -3, tilt: 0.8 },
  { at: 88, key: 'restless',  breathe: '3.2s', bob: '3.6s', lid: 1.02, lift: -5, tilt: 2.2 },
];
function moodOf(v) {
  const n = Math.max(0, Math.min(100, Number(v) == null || isNaN(Number(v)) ? 55 : Number(v)));
  let m = MOODS[0];
  for (const x of MOODS) if (n >= x.at) m = x;
  return m;
}

const EERIE_EYES = { vb: '0 0 33.5 22.3', l: 'M7.2,22.3c-0.3,0-0.6-0.1-1-0.1c-1.5-0.3-2.8-1.1-3.8-2.2c-1.2-1.3-1.9-2.9-2.2-4.6C0,14.2,0,12.9,0.1,11.7c0.2-2.1,0.8-4.2,1.7-6.1c0.8-1.5,1.7-2.9,3-4.1c0.9-0.7,1.8-1.3,2.9-1.5c1.3-0.2,2.5,0.1,3.5,0.9c0.9,0.7,1.5,1.6,2,2.7c0.7,1.4,1.1,3,1.4,4.5c0.2,1,0.3,2,0.3,3c-0.1,2.7-0.6,5.2-2,7.6c-0.6,1.1-1.4,2-2.5,2.7c-0.8,0.5-1.6,0.8-2.5,0.8c-0.1,0-0.1,0-0.2,0C7.5,22.3,7.4,22.3,7.2,22.3z', r: 'M33.5,15.4c0,0.3,0,0.7-0.1,1c-0.1,1.4-0.4,2.8-1.1,4.1c-0.3,0.5-0.6,1-1.1,1.3c-1,0.8-2.3,0.6-3.2-0.1c-0.7-0.6-1.1-1.3-1.4-2.1c-0.3-0.9-0.5-1.8-0.6-2.7c-0.2-1.6-0.1-3.2-0.1-4.8c0-0.9,0-1.8,0.1-2.7c0.1-1.4,0.2-2.8,0.6-4.2c0.1-0.4,0.3-0.7,0.5-1.1c0.3-0.4,0.7-0.5,1.2-0.4c0.6,0.2,1,0.6,1.4,1.1c0.9,1,1.6,2.2,2.2,3.5c0.7,1.5,1.2,3.1,1.4,4.7c0.1,0.5,0.1,0.9,0.1,1.4c0,0,0,0.1,0,0.1C33.5,14.8,33.5,15.1,33.5,15.4z' };

const FACES = [
  { side: '25%', w: 0.100, h: 0.135, top: 38, blob: '48% 52% 46% 54% / 55% 50% 50% 45%' },
  { side: '21%', w: 0.088, h: 0.170, top: 35, blob: '52% 48% 54% 46% / 50% 56% 44% 50%' },
  { side: '29%', w: 0.115, h: 0.104, top: 41, blob: '46% 54% 50% 50% / 58% 46% 54% 42%' },
  { side: '24%', w: 0.078, h: 0.108, top: 37, blob: '54% 46% 44% 56% / 52% 52% 48% 48%' },
];

/* `tint` colours the BODY only, never the eyes (keem 2026-07-25). it takes a
   {hi, mid, lo} triple so the sculpt keeps its own light: the highlight, the
   midtone and the shadow are each replaced, the inset speculars and the eyes
   stay exactly as they are. no filter, because a filter would recolour the
   eerie eyes too. */
function Sprite({ size = 88, form = 'pebble', still = false, packed = false, faceIdx = 0, mood = 55, tint, style }) {
  const skin = tint
    ? `radial-gradient(circle at 36% 26%, ${tint.hi} 0%, ${tint.mid} 52%, ${tint.lo} 100%)`
    : 'radial-gradient(circle at 36% 26%, #FFFFFF 0%, #F2F2F5 52%, #E4E4E9 100%)';
  const skinDark = tint
    ? `radial-gradient(circle at 36% 26%, ${tint.hi} 0%, ${tint.mid} 46%, ${tint.lo} 100%)`
    : 'radial-gradient(circle at 36% 26%, #262629 0%, #141416 46%, #0B0B0D 100%)';
  const M = moodOf(mood);
  size = Number(size) || 88;
  const F = FACES[((Number(faceIdx) || 0) % FACES.length + FACES.length) % FACES.length];
  const S = (n) => size * n;
  const packedDot = <div style={{ position: 'absolute', right: -2, top: -4, width: 13, height: 13, borderRadius: 4, background: '#FFF', boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 3px 8px rgba(0,0,0,.18)' }} />;

  /** dark=true when the body is dark (eyes white), false when light (eyes ink).
      Eyes read the CSS vars --gaze-dx/--gaze-dy (px) set by the host surface, so
      the companion looks toward the pointer on web and toward the device tilt /
      the owner's attention (TrueDepth) on iOS. Unset vars = eyes at rest. */
  const face = (dark, topPct = 37) => {
    const eyeW = S(F.w), eyeH = S(F.h);
    topPct = F.top;
    const iris = dark ? '#FFFFFF' : '#181818';
    const ink = dark ? '#FFFFFF' : '#111111';
    const pairW = eyeW * 3.35, pairH = pairW * (22.3 / 33.5) * M.lid;
    return [(
      <svg key="eyes" viewBox={EERIE_EYES.vb} width={pairW} height={pairH} aria-hidden="true"
        style={{ position: 'absolute', top: topPct + '%', left: '50%', transform: 'translateX(-50%) translate(var(--gaze-dx, 0px), var(--gaze-dy, 0px))', transition: 'transform .18s ease-out', overflow: 'visible' }}>
        <path d={EERIE_EYES.l} fill={ink} />
        <path d={EERIE_EYES.r} fill={ink} />
      </svg>
    )];
  };

  const ground = (wPct, dark) => (
    <div style={{ position: 'absolute', left: (50 - wPct / 2) + '%', bottom: -S(0.05), width: wPct + '%', height: S(0.11), borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,' + (dark ? '.2' : '.12') + '), transparent 72%)', filter: 'blur(2.5px)' }} />
  );

  let body;
  if (form === 'boxling') {
    const eye = { position: 'absolute', top: '33%', width: S(0.09), height: S(0.125), borderRadius: '50%', background: '#FFF', opacity: .94 };
    body = (
      <div style={{ position: 'relative', width: size, height: S(0.886), filter: 'var(--shadow-sprite)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--ink-3)', border: Math.max(3, S(0.051)) + 'px solid var(--sticker-border)', borderRadius: 'var(--radius-sprite)' }}>
          <div style={{ ...eye, left: '27%' }} />
          <div style={{ ...eye, right: '27%' }} />
          <div style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translateX(-50%)', width: S(0.114), height: S(0.057), borderBottom: '2px solid rgba(255,255,255,.8)', borderRadius: '0 0 9px 9px' }} />
        </div>
        {packed && packedDot}
      </div>
    );
  } else if (form !== 'inkling') { /* pebble, the default */
    body = (
      <div style={{ position: 'relative', width: S(0.98), height: S(0.82) }}>
        {ground(66, false)}
        <div style={{ position: 'absolute', inset: 0, background: skin, borderRadius: F.blob, boxShadow: 'inset 3px 4px 7px rgba(255,255,255,.95), inset -4px -6px 11px rgba(0,0,0,.11), 0 10px 22px rgba(0,0,0,.13)' }}>
          <div style={{ position: 'absolute', left: '18%', top: '12%', width: '34%', height: '26%', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,.9), transparent 70%)', filter: 'blur(2px)' }} />
          {face(false, 38)}
        </div>
        {packed && packedDot}
      </div>
    );
  } else if (form === 'inkling') {
    body = (
      <div style={{ position: 'relative', width: S(0.75), height: S(0.96), animation: still ? 'none' : 'pgSway 4.6s ease-in-out infinite', transformOrigin: '50% 92%' }}>
        {ground(52, true)}
        <div style={{ position: 'absolute', left: '38%', top: -S(0.1), width: S(0.1), height: S(0.2), background: '#161616', borderRadius: '50% 50% 50% 50% / 62% 62% 38% 38%', transform: 'rotate(-15deg)' }} />
        <div style={{ position: 'absolute', inset: 0, background: skinDark, borderRadius: '52% 48% 60% 40% / 70% 66% 34% 30%', boxShadow: '0 8px 16px rgba(0,0,0,.22)' }}>
          <div style={{ position: 'absolute', left: '20%', top: '12%', width: '30%', height: '30%', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,.22), transparent 68%)', filter: 'blur(1.5px)' }} />
          {face(true, 40)}
        </div>
        {packed && packedDot}
      </div>
    );
  }
  if (still) return <div style={style}>{body}</div>;
  /* the mood is worn, never written: pace of breath and bob, how it sits, how
     far it leans. transitions are long so a change is felt, not seen. */
  return (
    <div style={{ ...style, transform: `translateY(${M.lift}px) rotate(${M.tilt}deg)`, transition: 'transform 2.4s cubic-bezier(.2,.8,.2,1)' }}>
      <div style={{ animation: `pgBob ${M.bob} ease-in-out infinite` }}>
        <div style={{ animation: `pgBreathe ${M.breathe} ease-in-out infinite`, transformOrigin: '50% 90%' }}>{body}</div>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Sprite });
