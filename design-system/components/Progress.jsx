// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Trip progress bar. Pass tripMs to let CSS run the whole trip (pgTrip), or value 0–100 for static. */
function ProgressBar({ value, tripMs, shimmer = false, style }) {
  const fill = shimmer
    ? { background: 'linear-gradient(90deg, var(--ink-2) 30%, var(--ink-7) 50%, var(--ink-2) 70%)', backgroundSize: '200px 100%', animation: 'pgShimmer var(--dur-shimmer) linear infinite' }
    : { background: 'var(--progress-fill)' };
  const width = tripMs ? { animation: `pgTrip ${tripMs}ms linear both` + (shimmer ? ', pgShimmer var(--dur-shimmer) linear infinite' : '') } : { width: `${value ?? 0}%` };
  return (
    <div style={{ height: 'var(--progress-h)', borderRadius: 999, background: 'var(--progress-track)', overflow: 'hidden', ...style }}>
      <div style={{ height: '100%', borderRadius: 999, ...fill, ...width }} />
    </div>
  );
}

/** 7px status dot. live pulses (companion out / activity running); idle is steady. */
function StatusLed({ live = true, style }) {
  return <span style={{ display: 'inline-block', width: 'var(--led-size)', height: 'var(--led-size)', borderRadius: '50%', background: 'var(--ink-2)', animation: live ? 'pgPulseDot 1.8s ease-in-out infinite' : 'none', ...style }} />;
}

/** Expanding ring marker: arrivals, globe pins, "it happened here". 22px, spread max 1.55 (owner ruling). */
function PingRing({ size = 22, delay = 0, style }) {
  size = Number(size) || 22;
  const dot = size * 0.27;
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, ...style }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(0,0,0,.35)', animation: `pgPingRing var(--dur-ping) ease-out ${delay}s infinite` }} />
      <span style={{ position: 'absolute', left: '50%', top: '50%', width: dot, height: dot, margin: -dot / 2, borderRadius: '50%', background: 'var(--ink-2)' }} />
    </span>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { ProgressBar, StatusLed, PingRing });
