// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Checkable source tag on a finding, porcelain well, never a link-blue. */
function SourceChip({ children, onClick }) {
  return <span onClick={onClick} style={{ display: 'inline-block', font: 'var(--source-chip-font)', letterSpacing: '.02em', background: 'var(--source-chip-bg)', color: 'rgba(0,0,0,.6)', padding: '4px 8px', borderRadius: 'var(--radius-micro)', cursor: onClick ? 'pointer' : 'default' }}>{children}</span>;
}

/** One finding: dash-led text plus its sources. Verbs are Keep / Later, never accept/dismiss. */
function Finding({ children, sources = [], last = false }) {
  return (
    <div style={{ display: 'flex', gap: 9, padding: '9px 0', borderBottom: last ? 'none' : '1px solid var(--divider)' }}>
      <span style={{ flex: 'none', color: 'var(--finding-dash)' }}>{'—'}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: 'var(--text-body)', color: 'var(--text-primary)' }}>{children}</span>
        {sources.length > 0 && (
          <span style={{ display: 'flex', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>
            {sources.map((s, i) => <SourceChip key={i} onClick={s.onOpen}>{s.label}</SourceChip>)}
          </span>
        )}
      </span>
    </div>
  );
}

/** What comes home waits politely at the door. Plain paper card (stub and wax-mark removed July 2026). */
function SealedNote({ by, count, onOpen }) {
  const who = by || 'your companion';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 15px', borderRadius: 'var(--radius-row-card)', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)' }}>
      <span style={{ flex: 'none', font: '400 15px var(--font-ui)', color: 'rgba(0,0,0,.6)' }}>✦</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{count} findings wait at the door</span>
        <span style={{ display: 'block', font: 'var(--text-row-sub)', color: 'var(--text-secondary)', marginTop: 2 }}>brought home by {who} · sealed until you look</span>
      </span>
      <button onClick={onOpen} style={{ flex: 'none', background: 'var(--button-primary-bg)', color: 'var(--button-primary-fg)', font: '700 12.5px var(--font-ui)', padding: '10px 16px', borderRadius: 'var(--button-radius)', border: 'none', cursor: 'pointer', boxShadow: 'var(--button-primary-shadow)' }}>Open</button>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { SourceChip, Finding, SealedNote });
