// React is provided by the loader (DC x-import), no import, no bundler. See README.

/* Real Lucide path data (ISC), inlined, same convention as Icons.jsx.
   Span-built glyphs were retired on the owner's word (July 2026).
   The Home glyph stays the logo (README: the logo doubles as the Home glyph). */
const TabSvg = ({ color, children }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block' }}>{children}</svg>
);
const ICONS = {
  home: (color, holeMatch) => (
    <svg width="15" viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="26" y="16" width="30" height="104" rx="15" fill={color} />
      <circle cx="66" cy="52" r="40" fill={color} />
      <circle cx="72" cy="52" r="17" fill={holeMatch} />
    </svg>
  ),
  friends: (color) => (
    <TabSvg color={color}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </TabSvg>
  ),
  library: (color) => (
    <TabSvg color={color}>
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </TabSvg>
  ),
  settings: (color) => (
    <TabSvg color={color}>
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </TabSvg>
  ),
};

/** Floating paper tab dock. tabs: subset of home|friends|library|settings.
    soon: tab keys not in this version, rendered ghosted and inert. */
function Dock({ tabs = ['home', 'friends', 'library', 'settings'], active = 'home', soon = [], onChange, style }) {
  return (
    <div style={{
      display: 'flex', gap: 3, padding: 5, borderRadius: 999,
      background: 'var(--dock-bg)', boxShadow: 'var(--paper-ring), 0 12px 30px -12px rgba(0,0,0,.2)', ...style,
    }}>
      {tabs.map((t) => {
        const on = t === active;
        const off = soon.includes(t);
        const color = on ? 'var(--dock-active-fg)' : 'var(--ink-2)';
        return (
          <div key={t} onClick={() => !off && onChange && onChange(t)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 40,
            borderRadius: 999, cursor: off ? 'default' : 'pointer', opacity: off ? .3 : 1,
            background: on ? 'var(--dock-active-bg)' : 'transparent', color,
            transition: 'background var(--dur-tap) ease, color var(--dur-tap) ease',
          }}>
            {ICONS[t](color, on ? 'var(--dock-active-bg)' : '#FFFFFF')}
          </div>
        );
      })}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Dock });
