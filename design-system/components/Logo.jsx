// React is provided by the loader (DC x-import) — no import, no bundler. See README.

/** Playground backwards-P mark + optional wordmark. Inherits color via currentColor. */
function Logo({ size = 14, wordmark = false, color = 'var(--ink-2)', hole = '#FFFFFF', gap = 7 }) {
  const mark = (
    <svg width={size} viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color, display: 'block' }}>
      <rect x="26" y="16" width="30" height="104" rx="15" fill="currentColor" />
      <circle cx="66" cy="52" r="40" fill="currentColor" />
      <circle cx="72" cy="52" r="17" fill={hole} />
    </svg>
  );
  if (!wordmark) return mark;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      {mark}
      <span style={{ font: 'var(--text-wordmark)', color }}>playground</span>
    </span>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Logo });
