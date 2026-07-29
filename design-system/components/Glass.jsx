// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Lensing glass surface, WORLD IMAGERY ONLY (over the tear, the globe, world photos).
    App chrome is paper (see Sheet and Menu below). kind: chip | element | panel controls blur/fill/elevation. */
function Glass({ kind = 'element', radius, style, children, ...rest }) {
  const map = {
    chip:    { blur: 'var(--glass-blur-chip)',    fill: 'var(--glass-fill-chip)',    shadow: 'var(--shadow-chip)',    r: 'var(--radius-chip)' },
    element: { blur: 'var(--glass-blur-element)', fill: 'var(--glass-fill-element)', shadow: 'var(--shadow-element)', r: 'var(--radius-row-card)' },
    panel:   { blur: 'var(--glass-blur-panel)',   fill: 'var(--glass-fill-panel)',   shadow: 'var(--shadow-panel)',   r: 'var(--radius-menu)' },
  };
  const k = map[kind] || map.element;
  return (
    <div style={{
      backdropFilter: k.blur, WebkitBackdropFilter: k.blur,
      background: k.fill,
      boxShadow: `var(--glass-ring), var(--glass-edge), ${k.shadow}`,
      borderRadius: radius ?? k.r,
      ...style,
    }} {...rest}>{children}</div>
  );
}

/** Bottom sheet chrome: grabber plus opaque paper panel pinned above the home indicator. */
function Sheet({ open = true, onClose, children, maxHeight = '74%' }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'var(--scrim-modal)', animation: 'pgFadeIn .3s ease both' }} />
      <div style={{
        position: 'absolute', left: 6, right: 6, bottom: 6, zIndex: 11,
        background: 'var(--sheet-bg)', borderRadius: 'var(--radius-sheet)',
        boxShadow: 'var(--sheet-shadow)',
        padding: '14px 20px 22px', maxHeight, overflowY: 'auto', overscrollBehavior: 'contain',
        animation: 'pgSheetIn var(--dur-sheet) var(--ease-pop) both',
      }}>
        <div style={{ width: 36, height: 4.5, borderRadius: 99, background: 'var(--sheet-grabber)', margin: '0 auto 14px' }} />
        {children}
      </div>
    </>
  );
}

/** Anchored dropdown (menubar cockpit / hamburger menu). Opaque paper, scales in from its origin corner. */
function Menu({ open = true, onClose, top = 102, right = 14, width = 284, children }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 12 }} />
      <div style={{
        position: 'absolute', top, right, zIndex: 13, width, padding: 8,
        background: 'var(--menu-bg)', borderRadius: 'var(--radius-menu)',
        boxShadow: 'var(--menu-shadow)',
        transformOrigin: 'top right', animation: 'pgMenuIn .3s var(--ease-pop) both',
      }}>
        {children}
      </div>
    </>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Glass, Sheet, Menu });
