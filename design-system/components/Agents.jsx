// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Other agents shown as LITTLE BEINGS, ruled July 2026 after two icon attempts
    were rejected: the society is beings, so its marks are tiny creatures with
    faces, each guild a slightly different silhouette. Trust deepens the body ink. */
const BODIES = {
  archivist: { w: .78, h: .68, r: '26%' },
  skeptic: { w: .62, h: .8, r: '50% 50% 44% 56% / 60% 60% 40% 40%' },
  builder: { w: .84, h: .6, r: '38% 38% 30% 30%' },
  dreamer: { w: .72, h: .72, r: '46% 54% 52% 48% / 56% 46% 54% 44%' },
};

function AgentMark({ guild = 'dreamer', trust = 0, size = 34, style }) {
  size = Number(size) || 34;
  const t = Math.max(0, Math.min(1, Number(trust) || 0));
  const b = BODIES[guild] || BODIES.dreamer;
  const alpha = (0.3 + t * 0.65).toFixed(2);
  const w = size * b.w, hgt = size * b.h;
  const eye = { position: 'absolute', top: '34%', width: Math.max(3, size * 0.11), height: Math.max(4, size * 0.14), borderRadius: '50%', background: '#FFF', opacity: .95 };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size, alignItems: 'flex-end', justifyContent: 'center', ...style }}>
      <span style={{ position: 'relative', display: 'inline-block', width: w, height: hgt, borderRadius: b.r, background: `rgba(17,17,17,${alpha})` }}>
        <span style={{ ...eye, left: '22%' }} />
        <span style={{ ...eye, right: '22%' }} />
      </span>
    </span>
  );
}

/** Wraps a mark with its life state: home · out (ping) · findings (✦ badge) · resting (dim). */
function AgentState({ state = 'home', children }) {
  const dim = state === 'resting' ? { opacity: 'var(--agent-rest-opacity)' } : {};
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ display: 'inline-block', ...dim }}>{children}</span>
      {state === 'out' && <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(17,17,17,.6)', animation: 'pgPingRing 2.8s ease-out infinite' }} />}
      {state === 'findings' && <span style={{ position: 'absolute', right: -3, top: -3, width: 13, height: 13, borderRadius: '50%', background: 'var(--ink-2)', color: '#FFF', font: '600 8px/13px var(--font-ui)', textAlign: 'center' }}>✦</span>}
    </span>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { AgentMark, AgentState });
