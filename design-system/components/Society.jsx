// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** An earned social fact, "trusted 92", "known in the commons". Never a score to grind. */
function SocialFact({ children }) {
  return <span style={{ display: 'inline-block', font: 'var(--fact-font)', background: 'var(--fact-bg)', color: 'var(--fact-fg)', padding: '7px 12px', borderRadius: 999 }}>{children}</span>;
}

/** Ambient one-line narration from the world. night only when floating over world imagery. */
function Whisper({ children, night = false, style }) {
  return <div style={{ font: '500 13px/1.5 var(--font-ui)', color: night ? 'var(--whisper-fg-night)' : 'var(--whisper-fg)', animation: 'pgDriftUp 3.4s ease-in-out infinite', ...style }}>{children}</div>;
}

/** A place marker, regions are a lens, never a fence. */
function PlacePin({ label, night = false, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <span style={{ width: 'var(--pin-size)', height: 'var(--pin-size)', borderRadius: 3, transform: 'rotate(45deg)', background: night ? 'linear-gradient(135deg,#E8E9F1,#9FA4B8)' : 'var(--ink-3)', flex: 'none' }} />
      <span style={{ font: '600 12.5px var(--font-ui)', color: night ? 'var(--on-night-1)' : 'var(--text-primary)' }}>{label}</span>
    </span>
  );
}

/** Tiny globe glyph, the eclipse treatment at chip scale. */
function MiniGlobe({ size = 30 }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: 'var(--globe-porcelain-sphere)', boxShadow: 'var(--globe-ring)' }}>
      <span style={{ position: 'absolute', left: '18%', top: '-6%', width: '112%', height: '112%', borderRadius: '50%', background: 'var(--globe-eclipse-moon)' }} />
    </span>
  );
}

/** A destination the companion can be sent to. Places lead with imagery,
    metadata sits in a quiet mono microlabel, never inline in the title. */
function PlaceCard({ name, region, blurb, onSend }) {
  const { World } = window.PG;
  return (
    <div style={{ borderRadius: 'var(--radius-row-card)', overflow: 'hidden', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 4px' }}>
        {World ? <World size={84} souls={1} /> : <MiniGlobe size={84} />}
      </div>
      <div style={{ padding: '8px 16px 14px' }}>
        <div style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{name}</div>
        <div style={{ font: 'var(--place-microlabel)', letterSpacing: '.04em', color: 'var(--text-tertiary)', marginTop: 3, textTransform: 'lowercase' }}>{region}</div>
        {blurb && <div style={{ font: 'var(--text-row-sub)', color: 'var(--text-secondary)', marginTop: 6 }}>{blurb}</div>}
        {onSend && <button onClick={onSend} style={{ marginTop: 10, background: 'var(--button-ghost-bg)', color: 'var(--button-ghost-fg)', font: '600 12px var(--font-ui)', padding: '8px 14px', borderRadius: 'var(--radius-chip)', border: 'none', cursor: 'pointer' }}>Send it here</button>}
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { SocialFact, Whisper, PlacePin, PlaceCard, MiniGlobe });
