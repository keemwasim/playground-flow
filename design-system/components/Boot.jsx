// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Animated logo: the mark blinks its counter-hole like an eye. Brand = creature.
    Geometry matches assets/logo.svg exactly (viewBox 120×132). size = width in px. */
function AnimatedLogo({ size = 26, color = 'var(--ink-2)', hole = '#FFFFFF', breathe = true, style }) {
  const u = size / 120;
  return (
    <div style={{ position: 'relative', width: 120 * u, height: 132 * u, animation: breathe ? 'pgBreathe var(--dur-breathe) ease-in-out infinite' : undefined, ...style }}>
      <div style={{ position: 'absolute', left: 26 * u, top: 16 * u, width: 30 * u, height: 104 * u, borderRadius: 15 * u, background: color }} />
      <div style={{ position: 'absolute', left: 26 * u, top: 12 * u, width: 80 * u, height: 80 * u, borderRadius: '50%', background: color }} />
      <div style={{ position: 'absolute', left: 55 * u, top: 35 * u, width: 34 * u, height: 34 * u, borderRadius: '50%', background: hole, animation: 'pgLogoBlink 4.6s ease-in-out infinite' }} />
    </div>
  );
}

/** Boot / launch screen: porcelain, blinking mark, wordmark, stepped progress line. */
function BootScreen({ caption = 'waking the house…', style }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 'var(--z-boot)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-desktop)', ...style }}>
      <AnimatedLogo size={52} hole="#F7F7F9" />
      <div style={{ font: '700 15px var(--font-brand)', color: 'var(--ink-2)', marginTop: 18, animation: 'pgFadeIn .8s ease .4s both' }}>playground</div>
      <div style={{ font: '400 11.5px/1 var(--font-ui)', color: 'var(--text-tertiary)', marginTop: 8, animation: 'pgFadeIn .8s ease 1.1s both' }}>{caption}</div>
      <div style={{ position: 'absolute', bottom: 96, width: 116, height: 3, borderRadius: 99, background: 'rgba(0,0,0,.08)', overflow: 'hidden', animation: 'pgFadeIn .6s ease .5s both' }}>
        <div style={{ height: '100%', borderRadius: 99, background: 'var(--ink-2)', animation: 'pgBootBar 2.2s cubic-bezier(.3,.1,.3,1) .5s both' }} />
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { AnimatedLogo, BootScreen });
