// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Hero-number tile with a readable normal-case label. */
function StatCard({ value, label, style }) {
  return (
    <div style={{ flex: 1, borderRadius: 'var(--stat-radius)', background: 'var(--stat-bg)', boxShadow: 'var(--stat-ring), var(--stat-shadow)', padding: '12px 14px 10px', ...style }}>
      <div style={{ font: 'var(--stat-number)', letterSpacing: '-.03em', color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ font: 'var(--stat-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)', marginTop: 4, textTransform: 'lowercase' }}>{label}</div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { StatCard });
