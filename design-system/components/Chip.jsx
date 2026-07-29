// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Selectable chip, ink returns v4: flat gray well, chosen = solid ink. No glass, no border. */
function Chip({ selected = false, mono = false, children, style, ...rest }) {
  return (
    <button
      style={{
        font: mono ? 'var(--text-mono-id)' : 'var(--text-chip)',
        fontWeight: selected ? 600 : 500,
        padding: '7px 13px',
        borderRadius: 'var(--radius-chip)',
        cursor: 'pointer',
        background: selected ? 'var(--chip-selected-bg)' : 'var(--chip-bg)',
        border: 'none',
        color: selected ? 'var(--chip-selected-fg)' : 'var(--chip-fg)',
        transition: 'background var(--dur-tap) ease, color var(--dur-tap) ease',
        ...style,
      }}
      {...rest}
    >{children}</button>
  );
}

/** Segmented control: options in a recessed track, selected floats white (the thumb survives ink returns). */
function Segmented({ options, value, onChange, style }) {
  return (
    <div style={{ display: 'flex', gap: 5, background: 'var(--seg-track-bg)', borderRadius: 'var(--radius-control)', padding: 4, ...style }}>
      {options.map((o) => {
        const on = o === value;
        return (
          <button key={o} onClick={() => onChange && onChange(o)}
            style={{
              flex: 1, font: `${on ? 600 : 500} 12px/1 var(--font-ui)`, padding: '9px 4px',
              borderRadius: 11, cursor: 'pointer', border: 'none',
              background: on ? 'var(--seg-thumb-bg)' : 'transparent',
              color: on ? 'var(--ink-2)' : 'var(--text-secondary)',
              boxShadow: on ? 'var(--seg-thumb-shadow)' : 'none',
              transition: 'background var(--dur-tap) ease',
            }}>{o}</button>
        );
      })}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Chip, Segmented });
