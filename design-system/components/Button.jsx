// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Ink returns v4 (user-picked 1b, July 2026). Primary is solid ink, radius 12, zero shadow.
    Controls are flat. Ghost rests in the gray well. On world imagery the primary is the luminous white pill. */
function Button({ variant = 'primary', size = 'md', full = false, onDark = false, children, style, ...rest }) {
  const base = {
    font: variant === 'quiet' ? '600 14px/1 var(--font-ui)' : 'var(--button-font)',
    border: 'none', cursor: 'pointer',
    borderRadius: onDark ? 'var(--radius-pill)' : 'var(--button-radius)',
    padding: size === 'lg' ? 'var(--button-pad-lg)' : 'var(--button-pad-md)',
    width: full ? '100%' : undefined,
    transition: 'transform var(--dur-tap) ease, box-shadow var(--dur-tap) ease',
  };
  const variants = {
    primary: onDark
      ? { background: 'var(--button-primary-dark-bg)', color: 'var(--ink-2)', boxShadow: 'var(--button-primary-dark-shadow)' }
      : { background: 'var(--button-primary-bg)', color: 'var(--button-primary-fg)', boxShadow: 'var(--button-primary-shadow)' },
    ghost: { background: 'var(--button-ghost-bg)', color: 'var(--button-ghost-fg)', fontWeight: 600 },
    quiet: { background: 'transparent', color: 'var(--button-quiet-fg)', padding: '14px 4px' },
  };
  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(.97)'; }}
      onPointerUp={(e) => { e.currentTarget.style.transform = ''; }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = ''; }}
      {...rest}
    >
      {children}
    </button>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Button });
