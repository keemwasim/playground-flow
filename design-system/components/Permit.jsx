// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** YOUR COMPANION keepsake, name, disposition, creed. A warm record of who it is,
    never a form. No label grid, no photo frame, no document rules. The creed is
    the emotional center and prints verbatim, always. The mind shows as a consumer
    word (Playground Core), a raw model id never appears on this surface. */
function Permit({ name, temperament, mind = 'Playground Core', creed, photo }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {photo && <div style={{ flex: 'none', display: 'flex', alignItems: 'center' }}>{photo}</div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--permit-name)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>{name}</div>
          {temperament && <div style={{ font: '400 12.5px var(--font-ui)', color: 'var(--text-secondary)', marginTop: 2, textTransform: 'lowercase' }}>{temperament} · yours</div>}
        </div>
      </div>
      {creed && <div style={{ font: '500 14px/1.6 var(--font-ui)', color: 'rgba(17,17,17,.85)', marginTop: 12 }}>“{creed}”</div>}
      {creed && <div style={{ font: '400 11.5px var(--font-ui)', color: 'var(--text-tertiary)', marginTop: 3 }}>in your words — it remembers</div>}
      <div style={{ font: '400 11.5px var(--font-ui)', color: 'var(--text-tertiary)', marginTop: 14 }}>{mind}</div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Permit });
