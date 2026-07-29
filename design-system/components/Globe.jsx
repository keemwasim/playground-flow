// React is provided by the loader (DC x-import), no import, no bundler. See README.

const LANDS = [
  { l: '8%', t: '14%', w: '17%', h: '15%', r: '52% 48% 45% 55% / 48% 54% 46% 52%' },
  { l: '34%', t: '26%', w: '26%', h: '23%', r: '48% 52% 55% 45% / 52% 46% 54% 48%' },
  { l: '14%', t: '52%', w: '22%', h: '27%', r: '50% 50% 46% 54% / 55% 45% 52% 48%' },
  { l: '58%', t: '58%', w: '18%', h: '17%', r: '46% 54% 52% 48% / 50% 50% 48% 52%' },
  { l: '74%', t: '20%', w: '14%', h: '16%', r: '52% 48% 50% 50% / 48% 52% 50% 50%' },
];
const RELIEF_SHADOW = 'inset 1px 2px 3px rgba(255,255,255,.9), inset -2px -3px 5px rgba(0,0,0,.1), 1px 2px 4px rgba(0,0,0,.1)';

function ReliefHalf({ left }) {
  return (
    <div style={{ position: 'absolute', left, top: 0, width: '50%', height: '100%' }}>
      {LANDS.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: d.l, top: d.t, width: d.w, height: d.h, borderRadius: d.r, background: 'var(--globe-relief-land)', boxShadow: RELIEF_SHADOW }} />
      ))}
    </div>
  );
}

/** The world. Ruled roles (keem July 2026, amended late July): WORLD, the blue
    living planet (sea, drifting land, lives rising with a soft glow) owns the
    entry hero, keem re-ruled it back in ("the blue world globe is better"), it is
    world imagery, the one sanctioned color source. souls stays the monochrome
    live-activity treatment. eclipse owns the app icon and chips (MiniGlobe).
    relief is a spec-only alternate.
    Children (pins, arcs) overlay the sphere. Entrance animation belongs to the page. */
const WORLD_LANDS = [
  { l: '4%', t: '14%', w: '8.5%', h: '15%', r: '52% 48% 45% 55% / 48% 54% 46% 52%', warm: false },
  { l: '17%', t: '26%', w: '13%', h: '23%', r: '48% 52% 55% 45% / 52% 46% 54% 48%', warm: false },
  { l: '7%', t: '52%', w: '11%', h: '27%', r: '50% 50% 46% 54% / 55% 45% 52% 48%', warm: true },
  { l: '29%', t: '58%', w: '9%', h: '17%', r: '46% 54% 52% 48% / 50% 50% 48% 52%', warm: false },
  { l: '37%', t: '20%', w: '7%', h: '16%', r: '52% 48% 50% 50% / 48% 52% 50% 50%', warm: true },
];
/* white cloud streaks riding their own deck above the land, lifted from keem's Globe Concept */
const WORLD_STREAKS = [
  { l: '13%', t: '20%', w: '4.5%', h: '4.5%', o: .92 },
  { l: '32%', t: '42%', w: '5.5%', h: '5%', o: .85 },
  { l: '20%', t: '72%', w: '4.5%', h: '4.5%', o: .88 },
  { l: '42%', t: '32%', w: '3.5%', h: '3.5%', o: .8 },
  { l: '6%', t: '56%', w: '4%', h: '3.8%', o: .82 },
];
/* small islets between the continents */
const WORLD_ISLETS = [
  { l: '25%', t: '46%', w: '2.6%', h: '5%', warm: false },
  { l: '44%', t: '62%', w: '2.2%', h: '4.2%', warm: true },
  { l: '12%', t: '36%', w: '2%', h: '3.8%', warm: false },
];
/* drifting clouds around the sphere, positions as fractions of size */
const WORLD_CLOUDS = [
  { x: -.11, y: .15, w: .18, h: .072, anim: 'pgCloudDrift 9s ease-in-out infinite' },
  { x: .92, y: .38, w: .21, h: .08, anim: 'pgCloudDrift 11s ease-in-out -4s infinite reverse' },
  { x: .07, y: .95, w: .15, h: .064, anim: 'pgCloudDrift 10s ease-in-out -7s infinite' },
];

/* PHASES: playground runs on its own clock. the world is not lit the way the
   owner's day is lit, and it moves whether or not anyone is watching. a phase
   is passed in, never derived from the device clock. */
/* glow is stored as FACTORS OF THE GLOBE, not pixels. it used to be a fixed
   box-shadow (46px and 120px), which is 20 and 52 percent of a 230px entry
   globe and 7 and 19 percent of a 640px one, so the world's own light shrank
   as the world grew and a large globe read tighter and colder than the entry
   screen (QA 2026-07-24, found by rendering the intro film off this component).
   the reference is the entry globe at 230, so every existing surface renders
   byte for byte what it did before. */
const GLOW_REF = 230;
const PHASES = {
  day:   { sea: 'radial-gradient(circle at 36% 30%, #7CC8FF 0%, #3E97EC 42%, #1B6BD0 72%, #0E4BA6 100%)', glow: [[46, 'rgba(90,160,255,.55)'], [120, 'rgba(80,140,255,.28)']], dim: 1, lights: 0 },
  dusk:  { sea: 'radial-gradient(circle at 30% 26%, #8FB6E8 0%, #4A73C4 44%, #2B4C9B 74%, #16306E 100%)', glow: [[46, 'rgba(120,140,235,.45)'], [120, 'rgba(90,110,220,.22)']], dim: .92, lights: 3 },
  night: { sea: 'radial-gradient(circle at 32% 24%, #2E4C86 0%, #1B3A6E 22%, #16306E 46%, #0B1C44 76%, #060F2A 100%)', glow: [[40, 'rgba(70,100,200,.35)'], [110, 'rgba(50,80,180,.18)']], dim: .78, lights: 6 },
  dawn:  { sea: 'radial-gradient(circle at 40% 34%, #A9D2F5 0%, #5E9BDD 44%, #2F6BB8 74%, #17457F 100%)', glow: [[46, 'rgba(150,190,255,.5)'], [120, 'rgba(110,150,235,.24)']], dim: .96, lights: 1 },
};
const glowFor = (PH, size) => PH.glow.map(([px, c]) => `0 0 ${(px * size / GLOW_REF).toFixed(1)}px ${c}`).join(', ');

function Globe({ variant = 'souls', size = 250, spinSeconds = 20, souls = 3, phase = 'day', pins = [], arc = null, beings = [], here = null, children, style }) {
  size = Number(size) || 250; spinSeconds = Number(spinSeconds) || 20; souls = Number(souls) || 0;
  const PH = PHASES[phase] || PHASES.day;
  /* the lit windows of the world, proportional so they read at every size */
  const lightPx = Math.max(2, size * 0.0109);
  const sphere = { position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', boxShadow: 'var(--globe-ring), var(--globe-shadow)' };
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      {variant === 'relief' && (
        <div style={{ ...sphere, background: 'var(--globe-porcelain-sphere)' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '200%', animation: `pgGlobeSpin ${spinSeconds}s linear infinite` }}>
            <ReliefHalf left="0" />
            <ReliefHalf left="50%" />
          </div>
        </div>
      )}
      {variant === 'eclipse' && (
        <div style={{ ...sphere, background: 'var(--globe-porcelain-sphere)' }}>
          <div style={{ position: 'absolute', left: '18%', top: '-6%', width: '112%', height: '112%', borderRadius: '50%', background: 'var(--globe-eclipse-moon)' }} />
        </div>
      )}
      {variant === 'world' && (
        <div style={{ ...sphere, background: PH.sea, boxShadow: 'var(--globe-ring), ' + glowFor(PH, size), filter: 'saturate(' + PH.dim + ')' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '200%', animation: `pgGlobeSpin ${spinSeconds}s linear infinite` }}>
            {[0, 50].map((off) => WORLD_LANDS.map((d, i) => (
              <div key={off + '-' + i} style={{ position: 'absolute', left: `calc(${d.l} + ${off}%)`, top: d.t, width: d.w, height: d.h, borderRadius: d.r, background: d.warm ? 'var(--globe-land-warm)' : 'var(--globe-land)', boxShadow: d.warm ? 'inset -3px -5px 9px rgba(150,70,10,.3)' : 'inset -3px -5px 9px rgba(10,80,40,.35)' }} />
            )))}
            {[0, 50].map((off) => WORLD_ISLETS.map((d, i) => (
              <div key={'i' + off + '-' + i} style={{ position: 'absolute', left: `calc(${d.l} + ${off}%)`, top: d.t, width: d.w, height: d.h, borderRadius: '50%', background: d.warm ? 'var(--globe-land-warm)' : 'var(--globe-land)', boxShadow: 'inset -1px -2px 4px rgba(10,60,30,.3)' }} />
            )))}
          </div>
          {/* cloud deck rides above the land on its own, slightly faster, for depth */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '200%', animation: `pgGlobeSpin ${spinSeconds * 0.72}s linear infinite` }}>
            {[0, 50].map((off) => WORLD_STREAKS.map((c, i) => (
              <div key={'c' + off + '-' + i} style={{ position: 'absolute', left: `calc(${c.l} + ${off}%)`, top: c.t, width: c.w, height: c.h, borderRadius: '50%', background: '#FFFFFF', opacity: c.o, filter: 'blur(.5px)', boxShadow: '2px 3px 5px rgba(10,40,110,.18)' }} />
            )))}
          </div>
          {/* the world's own lights, they come on as its day ends */}
          {PH.lights > 0 && (
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '200%', animation: `pgGlobeSpin ${spinSeconds}s linear infinite`, zIndex: 2 }}>
              {[0, 50].map((off) => Array.from({ length: PH.lights }).map((_, i) => (
                /* sized off the world, not fixed at 2.5px. a fixed dot is 1% of
                   a 230px globe and 0.4% of a 640px one, so the lights coming
                   on were invisible at every size the app actually draws
                   (QA 2026-07-24). 230px still resolves to 2.5px, so nothing
                   in the running app changes. */
                <div key={'lt' + off + '-' + i} style={{ position: 'absolute', left: `calc(${9 + i * 6}% + ${off}%)`, top: `${28 + (i % 3) * 17}%`, width: lightPx, height: lightPx, borderRadius: '50%', background: '#FFE9B8', boxShadow: `0 0 ${lightPx * 2}px rgba(255,220,150,.9)`, animation: `pgPulseDot ${3 + i * .7}s ease-in-out ${i * .5}s infinite` }} />
              )))}
            </div>
          )}
          {/* polar caps */}
          <div style={{ position: 'absolute', left: '32%', top: '-4%', width: '36%', height: '11%', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 80%, #FFFFFF 30%, rgba(255,255,255,.75) 70%, transparent 100%)', filter: 'blur(1px)' }} />
          <div style={{ position: 'absolute', left: '36%', bottom: '-5%', width: '28%', height: '10%', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,.9) 30%, rgba(255,255,255,.6) 70%, transparent 100%)', filter: 'blur(1.5px)' }} />
          {/* sun glints on the sea */}
          {[{ l: '30%', t: '30%', s: 3, d: 0 }, { l: '58%', t: '48%', s: 2.5, d: 1.3 }, { l: '42%', t: '64%', s: 2, d: 2.6 }, { l: '68%', t: '26%', s: 2, d: 3.4 }].map((g, i) => (
            <div key={'g' + i} style={{ position: 'absolute', left: g.l, top: g.t, width: g.s, height: g.s, borderRadius: '50%', background: '#FFFFFF', filter: 'blur(.5px)', animation: `pgPulseDot ${3.5 + i * 0.9}s ease-in-out ${g.d}s infinite` }} />
          ))}
          {/* lives down there, pinging */}
          {[{ l: '26%', t: '44%', d: 0 }, { l: '62%', t: '58%', d: 1.6 }].map((p, i) => (
            <span key={'p' + i} style={{ position: 'absolute', left: p.l, top: p.t, width: 10, height: 10 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,.75)', animation: `pgPingRing 3.2s ease-out ${p.d}s infinite` }} />
            </span>
          ))}
          {Array.from({ length: souls }).map((_, i) => (
            <div key={'ws' + i} style={{ position: 'absolute', left: `${24 + i * 18}%`, top: `${36 + (i % 2) * 16}%`, width: 6 - (i % 2), height: 11 - (i % 2) * 2, borderRadius: '50%', background: 'var(--globe-soul)', boxShadow: '0 0 10px rgba(120,170,255,.9)', filter: 'blur(1.5px)', animation: `pgGlobeRise ${6 + i * 1.7}s ease-in-out ${i * 2.1}s infinite`, zIndex: 2 }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--globe-vignette)', pointerEvents: 'none' }} />
        </div>
      )}
      {variant === 'world' && (
        <div style={{ position: 'absolute', inset: '-3.5%', borderRadius: '50%', border: '1px solid rgba(140,190,255,.35)', boxShadow: `0 0 ${(size*0.0522).toFixed(1)}px rgba(120,175,255,.35), inset 0 0 ${(size*0.0522).toFixed(1)}px rgba(120,175,255,.3)`, pointerEvents: 'none', animation: 'pgGlowPulse 5.5s ease-in-out infinite' }} />
      )}
      {/* v3, the world is somewhere. pins are places it knows, beings are the
          others out there (ink weight is familiarity), the arc is the journey
          it is on right now, and `here` is where it stands. */}
      {variant === 'world' && beings.map((b, i) => (
        <div key={'bg' + i} style={{ position: 'absolute', left: b.x + '%', top: b.y + '%', width: 4, height: 5, borderRadius: '50% 50% 46% 54%', background: 'rgba(255,255,255,' + (0.25 + (b.known || 0) * 0.6) + ')', zIndex: 4, pointerEvents: 'none' }} />
      ))}
      {variant === 'world' && pins.map((pin, i) => (
        <div key={'pin' + i} style={{ position: 'absolute', left: pin.x + '%', top: pin.y + '%', width: 0, height: 0, zIndex: 5, pointerEvents: 'none' }}>
          {pin.live && <div style={{ position: 'absolute', left: -11, top: -11, width: 22, height: 22, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.55)', animation: 'pgPingRing 2.8s ease-out infinite' }} />}
          <div style={{ position: 'absolute', left: -4, top: -4, width: 8, height: 8, borderRadius: pin.live ? '50%' : 3, transform: pin.live ? 'none' : 'rotate(45deg)', background: pin.live ? '#FFFFFF' : 'rgba(255,255,255,.62)', boxShadow: pin.live ? '0 0 10px rgba(235,240,255,.95)' : '0 1px 3px rgba(8,10,26,.4)' }} />
          {pin.label && (
            <div style={{ position: 'absolute', left: '50%', top: 11, transform: 'translateX(-50%)', whiteSpace: 'nowrap', font: '600 13px ui-monospace, Menlo, monospace', letterSpacing: '0', color: '#0F1B3A', background: 'rgba(255,255,255,.82)', padding: '2px 6px', borderRadius: 999, textTransform: 'lowercase' }}>{pin.label}</div>
          )}
        </div>
      ))}
      {variant === 'world' && arc && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, zIndex: 5, overflow: 'visible', pointerEvents: 'none' }}>
          <path d={arc} fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="0.7" strokeDasharray="2 3" strokeLinecap="round" style={{ animation: 'pgArcDraw 4.5s ease-in-out infinite' }} />
        </svg>
      )}
      {variant === 'world' && WORLD_CLOUDS.map((c, i) => (
        <div key={'wc' + i} style={{ position: 'absolute', left: c.x * size, top: c.y * size, width: c.w * size, height: c.h * size, borderRadius: c.h * size / 2, background: 'var(--globe-cloud)', boxShadow: '0 4px 10px rgba(20,26,60,.18)', animation: c.anim, zIndex: 3, pointerEvents: 'none' }} />
      ))}
      {variant === 'souls' && (
        <div style={{ ...sphere, background: 'var(--globe-ink-sphere)' }}>
          {Array.from({ length: souls }).map((_, i) => (
            <div key={'s' + i} style={{ position: 'absolute', left: `${24 + i * 18}%`, top: `${38 + (i % 2) * 16}%`, width: 5 - (i % 2), height: 10 - (i % 2) * 2, borderRadius: '50%', background: 'var(--globe-soul)', filter: 'blur(1.5px)', animation: `pgGlobeRise ${6 + i * 1.7}s ease-in-out ${i * 2.1}s infinite` }} />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Globe });
