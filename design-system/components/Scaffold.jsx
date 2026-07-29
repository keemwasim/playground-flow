// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Centered quiet prose for empty sections. Lowercase, hopeful, never an illustration. */
function EmptyState({ children, style }) {
  return <div style={{ padding: 'var(--empty-pad)', textAlign: 'center', font: '400 13px/1.6 var(--font-ui)', color: 'var(--empty-fg)', ...style }}>{children}</div>;
}

/** Screen header: readable normal-case label over display title, optional live status line.
    titleMuted dims the title, for a placeholder like "the unnamed one" that is
    standing in for a name the owner has not given yet (keem 2026-07-24). */
function ScreenHeader({ label, title, status, titleMuted, style }) {
  return (
    <div style={style}>
      {label && <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>{label}</div>}
      {title ? <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: titleMuted ? 'var(--text-tertiary)' : 'var(--text-primary)', marginTop: label ? 5 : 0 }}>{title}</div> : null}
      {status && <div style={{ font: 'var(--text-hint)', color: 'var(--text-secondary)', marginTop: title ? 3 : (label ? 5 : 0) }}>{status}</div>}
    </div>
  );
}

/** Grouped list section: a readable Label over an inset white card of ListRows.
    THE settings / grouped-list pattern (ref: ../settings-lab.html). Greyscale,
    ink switches, no colored icon tiles, world words, minimal text. Children are
    ListRows, pass `last` on the final row to drop its divider. A destructive
    action gets its own single-row Section, set apart, and stays ink (never red).
    Settings rows use the roomier section padding:
    <ListRow style={{ padding:'var(--section-row-pad)', minHeight:'var(--section-row-min)' }} ... /> */
function Section({ label, children, style }) {
  return (
    <div style={{ marginTop: 'var(--section-gap)', ...style }}>
      {label && <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', padding: '0 6px 8px' }}>{label}</div>}
      <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>{children}</div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { EmptyState, ScreenHeader, Section });
