// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Speech: paper thought-bubble anchored above the creature. bare=chromeless (hatch conversation). */
function Bubble({ bare = false, maxW = 300, children, style }) {
  const chrome = bare ? {
    background: 'transparent', padding: '0 4px',
  } : {
    background: 'var(--bubble-bg)', borderRadius: 'var(--radius-bubble)',
    padding: '13px 15px 12px', boxShadow: 'var(--bubble-shadow)',
  };
  return (
    <div style={{ width: 'max-content', maxWidth: maxW, animation: 'pgBubbleIn var(--dur-enter) var(--ease-pop) both', transform: 'translateX(-50%)', ...chrome, ...style }}>
      {children}
    </div>
  );
}

/** One speech line. Stagger `delay` per line (350 to 800ms apart). */
function Line({ delay = 0, children }) {
  return (
    <div style={{ font: 'var(--text-speech)', color: 'var(--bubble-ink)', animation: 'pgLineIn .5s ease both', animationDelay: `${delay}ms`, margin: '0 0 4px' }}>
      {children}
    </div>
  );
}

/** Your reply to the creature: right-aligned flat card with an asymmetric corner. */
function Reply({ delay = 0, sub, children, ...rest }) {
  return (
    <button {...rest} style={{
      textAlign: 'right', maxWidth: 250, cursor: 'pointer',
      background: 'var(--reply-bg)', border: 'none',
      padding: 'var(--reply-pad)', borderRadius: 'var(--reply-radius)',
      animation: 'pgLineIn .5s ease both', animationDelay: `${delay}ms`,
    }}>
      <span style={{ display: 'block', font: '600 13px/1.3 var(--font-ui)', color: 'var(--ink-2)' }}>{children}</span>
      {sub && <span style={{ display: 'block', font: '400 10.5px/1.45 var(--font-ui)', color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</span>}
    </button>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Bubble, Line, Reply });
