// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** iOS-style switch. Ink when on. 44×26 = minimum hit height. */
function Toggle({ on = false, onChange, style }) {
  return (
    <span onClick={() => onChange && onChange(!on)} style={{
      position: 'relative', display: 'inline-block', width: 44, height: 26, borderRadius: 999, cursor: 'pointer',
      background: on ? 'var(--ink-2)' : 'rgba(0,0,0,.14)', transition: 'background var(--dur-tap) ease', ...style,
    }}>
      <span style={{ position: 'absolute', top: 2.5, left: on ? 20.5 : 2.5, width: 21, height: 21, borderRadius: '50%', background: '#FFF', boxShadow: '0 2px 6px rgba(0,0,0,.25)', transition: 'left var(--dur-tap) var(--ease-pop)' }} />
    </span>
  );
}

/** Readable normal-case section label. */
function Label({ children, style }) {
  return <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', marginBottom: 7, ...style }}>{children}</div>;
}

/** The hatch-style big input: bare, centered, fading rule underneath. */
function HatchInput({ placeholder, inputRef, onEnter, style, ...rest }) {
  return (
    <div style={{ width: 190, ...style }}>
      <input ref={inputRef} placeholder={placeholder}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter(e); }}
        style={{ width: '100%', background: 'transparent', border: 'none', padding: '0 1px 6px', font: '600 25px var(--font-display)', letterSpacing: '-.01em', color: 'var(--ink-2)', caretColor: 'var(--ink-3)', textAlign: 'center', outline: 'none' }} {...rest} />
      <div style={{ height: 1.5, background: 'linear-gradient(90deg, transparent, rgba(17,17,17,.85) 32%, rgba(17,17,17,.85) 68%, transparent)' }} />
    </div>
  );
}

/** Flat-well textarea for briefs/creeds. No border, no inset ring (ink returns). */
function GoalArea({ rows = 3, style, ...rest }) {
  return <textarea rows={rows} style={{ width: '100%', resize: 'none', background: 'var(--input-bg)', border: 'none', borderRadius: 'var(--input-radius)', padding: 'var(--input-pad)', font: '400 15px/1.5 var(--font-ui)', color: 'var(--input-fg)', caretColor: 'var(--ink-2)', outline: 'none', ...style }} {...rest} />;
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Toggle, Label, HatchInput, GoalArea });
