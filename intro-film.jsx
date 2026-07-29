// React is provided by the loader (DC x-import), no import, no bundler.

/** The first-launch film, rendered FROM the product.
    The world in this film is the same P.Globe the entry screen draws, on the
    same white, so the last frame of the film and the first frame of the app
    are the same picture. Nothing here is generated or drawn twice.

    Deterministic by design: the page never animates on its own clock. A
    capture script calls window.__seek(t) for each frame and window.__freeze(t)
    pins every css animation to that instant, so the same t always renders the
    same pixels and the film can be re-cut without re-shooting. */

const FILM = {
  w: 1080, h: 1920, fps: 24, dur: 21.5,
  /* the frame the film has to land on. measured off the running entry screen
     by reading the live dom, not by eye: the globe is 230 of 390 wide (0.590)
     with its centre 0.436 down. these two numbers are the whole handoff. */
  endD: 0.590, endCY: 0.436,
};

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
/* a ramp that is 0 before a, 1 after b, eased between */
const ramp = (t, a, b) => ease(clamp01((t - a) / (b - a)));

/* THE CUTS. one continuous shot each, no edits inside any of them. they differ
   in how far out the world starts, how the camera moves, and whether the world
   goes through its evening while you watch. every one of them lands on the same
   final frame, because that frame is the entry screen. */
const CUTS = {
  /* the read: the film the script describes, plainly. */
  drift: { startD: 0.24, rise: 0.055, dusk: [7.0, 11.5, 15.0, 19.0], spin: 132, hold: 1.0 },
  /* the long way out: the world genuinely small enough to hold, and the push
     is longer and later, so the last third does most of the arriving. */
  far:   { startD: 0.155, rise: 0.075, dusk: [6.0, 11.0, 16.0, 19.6], spin: 150, hold: 1.0, lateBias: true },
  /* the calm one: it barely moves, the world never leaves daylight. for the
     reading that says the world is quiet, not that the world is eventful. */
  calm:  { startD: 0.36, rise: 0.03, dusk: null, spin: 190, hold: 1.0 },
  /* the breath: it drifts in, settles, and takes one last step toward you on
     the closing line. the only cut with a beat in the camera. */
  breath:{ startD: 0.21, rise: 0.06, dusk: [6.5, 11.0, 14.5, 18.0], spin: 140, hold: 1.0, breath: true },
};

function Film() {
  const P = window.PG || {};
  const [t, setT] = React.useState(0);
  const [variant, setVariant] = React.useState('drift');
  /* the picture is cut TO the read. the narration's own pauses set the length
     and the moment the world turns, so the day passing lands on the line that
     says it. measured off the wav, never guessed. */
  const [timing, setTiming] = React.useState(null);
  const [, force] = React.useState(0);
  React.useEffect(() => {
    window.__seek = (x) => setT(x);
    window.__setVariant = (v) => setVariant(v);
    window.__setTiming = (o) => setTiming(o);
    window.__filmMeta = () => ({ ...FILM, dur: (timing && timing.dur) || FILM.dur });
    window.__cuts = Object.keys(CUTS);
    if (!P.Globe) { const id = setTimeout(() => force((n) => n + 1), 120); return () => clearTimeout(id); }
  });
  if (!P.Globe) return <div style={{ color: '#111', font: '14px system-ui' }}>waking the world…</div>;

  const base = CUTS[variant] || CUTS.drift;
  const C = timing
    ? { ...base, dusk: base.dusk && timing.dusk ? timing.dusk : base.dusk }
    : base;
  FILM.dur = (timing && timing.dur) || 21.5;

  /* THE CAMERA. one continuous move, no cuts, per the script. it starts far
     enough out that the world is small enough to hold and ends exactly on the
     entry composition. eased so it never reads as a zoom. */
  let push = C.lateBias ? Math.pow(ramp(t, 0, FILM.dur), 1.45) : ramp(t, 0, FILM.dur);
  if (C.breath) {
    /* settles at three quarters, then takes one more step in on the last line */
    push = 0.78 * ramp(t, 0, FILM.dur * 0.62) + 0.22 * ramp(t, FILM.dur * 0.74, FILM.dur);
  }
  const d = (C.startD + (FILM.endD - C.startD) * push) * FILM.w;
  /* it sits a touch low and a touch off centre at the start and RESOLVES into
     its final place, so the move has a direction and not just a size. a
     straight zoom on a centred ball is the same picture for twenty seconds
     (QA 2026-07-24). the resolve is exact: at push 1 it is dead centre, which
     is the entry screen. */
  const cy = (FILM.endCY + C.rise * (1 - push)) * FILM.h;
  const cx = (0.5 + (C.drift || 0.028) * (1 - push)) * FILM.w;

  /* THE WORLD'S OWN CLOCK. a day passes while you watch it, which is the line
     the film says out loud. three globes stacked and cross faded, never a cut.
     it goes all the way to NIGHT, because night is the only phase where the
     lights come on over the land, and lights coming on is the picture of
     "things happen there whether or not you are watching". dusk alone read as
     a slightly greyer blue and said nothing (QA 2026-07-24). */
  const away = C.dusk ? ramp(t, C.dusk[0], C.dusk[1]) * (1 - ramp(t, C.dusk[2], C.dusk[3])) : 0;
  /* dusk is the crossing on the way there and back, night is the middle */
  const nightOpacity = Math.max(0, (away - 0.45) / 0.55);
  const duskOpacity = Math.min(1, away / 0.45);

  /* the credit: the one place a company mark belongs, last two seconds. */
  const markOn = ramp(t, FILM.dur - 2.6, FILM.dur - 1.4) * (1 - ramp(t, FILM.dur - 0.35, FILM.dur));

  /* NOT clipped. the clouds ride off the limb because that is how the app
     draws this world, and the whole point of rendering the film from the
     product is that the last frame IS the entry screen. tried clipping them
     to the atmosphere and it made a hard rim like a petri dish AND broke the
     match, which is worse than the thing it fixed (QA 2026-07-24). */
  const globeBox = {
    position: 'absolute', left: cx, top: cy, transform: 'translate(-50%,-50%)',
    width: d, height: d,
  };
  /* grain. a 21 second hold on flat white bands on any real display, and a
     film with no grain reads as a render. seeded once, moved by t, so a frame
     is still the same pixels every time. */
  const gx = (t * 53) % 180, gy = (t * 31) % 180;

  return (
    <div id="film-stage" style={{
      position: 'relative', width: FILM.w, height: FILM.h, background: '#FFFFFF',
      overflow: 'hidden', isolation: 'isolate',
    }}>
      {/* the halo, matched EXACTLY to the entry screen: the app draws a 300px
          halo with a 14px blur behind a 230px globe, so the ratios are 1.304
          and 0.0609 of the globe. i had it at 1.42 and 0.055, which measured
          as a visibly wider softer glow at the cut, and the halo is the last
          thing on screen before the app takes over (QA 2026-07-24). */}
      {/* and it BREATHES like the app's, on the same pgHaloPulse the entry
          screen runs. a static halo can never land where a breathing one is,
          so the two lights were always going to differ at the cut whatever
          the size (QA 2026-07-24). the ramp lives on the outer element so the
          keyframes keep the opacity and the scale to themselves. */}
      <div style={{ position: 'absolute', left: cx, top: cy, width: 0, height: 0, opacity: 0.6 + 0.4 * push }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, width: d * 1.304, height: d * 1.304,
          transform: 'translate(-50%,-50%)', borderRadius: '50%',
          background: 'var(--globe-halo)', filter: 'blur(' + (d * 0.0609).toFixed(1) + 'px)',
          animation: 'pgHaloPulse 6s ease-in-out infinite',
        }} />
      </div>

      <div style={globeBox}>
        <P.Globe variant="world" size={d} souls={4} phase="day" spinSeconds={C.spin} />
      </div>
      <div style={{ ...globeBox, opacity: duskOpacity }}>
        <P.Globe variant="world" size={d} souls={4} phase="dusk" spinSeconds={C.spin} />
      </div>
      <div style={{ ...globeBox, opacity: nightOpacity }}>
        <P.Globe variant="world" size={d} souls={5} phase="night" spinSeconds={C.spin} />
      </div>

      {/* THE KEY LIGHT IS CUT. i added a white screen-blended bloom to stop the
          void reading as a blank page, and measuring the last frame showed it
          was bleaching the app's own halo out of the picture: the film read a
          0.596 wide light where the entry screen reads 0.679. the halo IS the
          light, and it belongs to the product (QA 2026-07-24). */}

      {/* the eerie mark, small, under the world, only at the very end */}
      <div style={{
        position: 'absolute', left: cx, top: cy + d * 0.5 + FILM.h * 0.062,
        transform: 'translateX(-50%)', opacity: markOn, display: 'flex',
        alignItems: 'center', gap: FILM.w * 0.014,
      }}>
        <svg width={FILM.w * 0.058} viewBox="0 0 33.5 22.3" aria-hidden="true" style={{ display: 'block' }}>
          <path d="M7.2,22.3c-0.3,0-0.6-0.1-1-0.1c-1.5-0.3-2.8-1.1-3.8-2.2c-1.2-1.3-1.9-2.9-2.2-4.6C0,14.2,0,12.9,0.1,11.7c0.2-2.1,0.8-4.2,1.7-6.1c0.8-1.5,1.7-2.9,3-4.1c0.9-0.7,1.8-1.3,2.9-1.5c1.3-0.2,2.5,0.1,3.5,0.9c0.9,0.7,1.5,1.6,2,2.7c0.7,1.4,1.1,3,1.4,4.5c0.2,1,0.3,2,0.3,3c-0.1,2.7-0.6,5.2-2,7.6c-0.6,1.1-1.4,2-2.5,2.7c-0.8,0.5-1.6,0.8-2.5,0.8c-0.1,0-0.1,0-0.2,0C7.5,22.3,7.4,22.3,7.2,22.3z" fill="#111111" />
          <path d="M33.5,15.4c0,0.3,0,0.7-0.1,1c-0.1,1.4-0.4,2.8-1.1,4.1c-0.3,0.5-0.6,1-1.1,1.3c-1,0.8-2.3,0.6-3.2-0.1c-0.7-0.6-1.1-1.3-1.4-2.1c-0.3-0.9-0.5-1.8-0.6-2.7c-0.2-1.6-0.1-3.2-0.1-4.8c0-0.9,0-1.8,0.1-2.7c0.1-1.4,0.2-2.8,0.6-4.2c0.1-0.4,0.3-0.7,0.5-1.1c0.3-0.4,0.7-0.5,1.2-0.4c0.6,0.2,1,0.6,1.4,1.1c0.9,1,1.6,2.2,2.2,3.5c0.7,1.5,1.2,3.1,1.4,4.7c0.1,0.5,0.1,0.9,0.1,1.4c0,0,0,0.1,0,0.1C33.5,14.8,33.5,15.1,33.5,15.4z" fill="#111111" />
        </svg>
      </div>

      {/* grain, last layer, over everything */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="filmgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div style={{
        position: 'absolute', left: -180, top: -180, width: FILM.w + 360, height: FILM.h + 360,
        transform: 'translate(' + gx + 'px,' + gy + 'px)',
        /* 0.02, not 0.055: multiply grain over a full white frame turns the
           ground grey, and the app's entry is pure #FFFFFF. at this weight it
           only breaks up the gradient in the halo (QA 2026-07-24). */
        filter: 'url(#filmgrain)', opacity: 0.02, mixBlendMode: 'multiply', pointerEvents: 'none',
      }} />

      {/* the film opens out of black and closes back toward the app, never a
          cut to white: the last frame is the entry screen, held. */}
      <div style={{
        position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none',
        opacity: 1 - ramp(t, 0, 1.6),
      }} />
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Film });
