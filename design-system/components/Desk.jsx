// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Desk objects: FolderChip (consent-packing folder row), NoteDoc (field-note icon), FriendDiamond (other-side avatar). */
function FolderChip({ name, held = false, onTap, style }) {
  return (
    <div onClick={onTap} style={{
      display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px 8px 9px', maxWidth: 190,
      borderRadius: 12, cursor: 'pointer',
      background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-chip)',
      opacity: held ? 1 : 0.4, transition: 'opacity .4s ease', ...style,
    }}>
      <span style={{ position: 'relative', width: 26, height: 20, flex: 'none' }}>
        <span style={{ position: 'absolute', top: -3, left: 2, width: 12, height: 6, borderRadius: '2.5px 4px 0 0', background: 'var(--ink-6)' }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: 5, background: 'var(--ink-5)' }} />
        {!held && <span style={{ position: 'absolute', right: -3, bottom: -3, width: 9, height: 9, borderRadius: 3, background: '#FFF', boxShadow: '0 0 0 1px rgba(0,0,0,.2)' }} />}
      </span>
      <span style={{ font: '500 11.5px/1.3 var(--font-ui)', color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
    </div>
  );
}

/** Field-note document icon. size = width. Height auto (1.27:1). */
function NoteDoc({ size = 30, style }) {
  const h = size * 1.27;
  return (
    <span style={{ position: 'relative', width: size, height: h, borderRadius: size * 0.2,
      background: '#FDFDFD',
      boxShadow: 'var(--paper-ring), 0 5px 12px -4px rgba(0,0,0,.14)',
      display: 'flex', flexDirection: 'column', gap: h * 0.09, padding: `${h * 0.21}px ${size * 0.2}px 0`, ...style }}>
      <span style={{ height: 1.5, borderRadius: 2, background: 'rgba(40,40,44,.45)' }} />
      <span style={{ height: 1.5, borderRadius: 2, background: 'rgba(40,40,44,.3)', width: '78%' }} />
      <span style={{ height: 1.5, borderRadius: 2, background: 'rgba(40,40,44,.3)', width: '56%' }} />
    </span>
  );
}

/** A friend from the other side: 45-degree rotated rounded square, lightness = identity. */
function FriendDiamond({ size = 22, tone = 'var(--ink-5)', style }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size + 8, height: size + 8, ...style }}>
      <span style={{ width: size, height: size, borderRadius: size * 0.32, transform: 'rotate(45deg)', background: tone, border: '2.5px solid var(--sticker-border)', boxShadow: '0 3px 8px rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ transform: 'rotate(-45deg)', display: 'flex', gap: size * 0.18 }}>
          <span style={{ width: size * 0.14, height: size * 0.14, borderRadius: 1, background: 'var(--ink-3)' }} />
          <span style={{ width: size * 0.14, height: size * 0.14, borderRadius: 1, background: 'var(--ink-3)' }} />
        </span>
      </span>
    </span>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { FolderChip, NoteDoc, FriendDiamond });
