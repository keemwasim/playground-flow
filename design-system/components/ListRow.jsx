// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Roster/settings/library row: leading slot, title + sub, trailing slot, hairline divider. */
function ListRow({ leading, title, sub, trailing, chevron = false, last = false, onClick, style }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 'var(--row-gap)', padding: 'var(--row-pad)', borderRadius: 'var(--row-radius)', borderBottom: last ? 'none' : '1px solid var(--row-divider)', cursor: onClick ? 'pointer' : 'default', ...style }}>
      {leading && <span style={{ flex: 'none', display: 'flex', alignItems: 'center' }}>{leading}</span>}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: 'var(--text-row-title)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        {sub && <span style={{ display: 'block', font: 'var(--text-row-sub)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</span>}
      </span>
      {trailing}
      {chevron && <span style={{ font: '400 15px var(--font-ui)', color: 'var(--row-chevron)', flex: 'none' }}>›</span>}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { ListRow });
