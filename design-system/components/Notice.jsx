// React is provided by the loader (DC x-import), no import, no bundler. See README.
// Sibling components come off window.PG (the loader mounts every file onto it).

/** iOS notification banner (paper, logo-led). Tap = jump to the moment. */
function Banner({ title, body, meta = 'now', onClick, style }) {
  const { Logo } = window.PG;
  return (
    <div onClick={onClick} style={{
      width: 'var(--notice-w)', display: 'flex', alignItems: 'center', gap: 11, padding: '11px 14px',
      borderRadius: 'var(--notice-radius-banner)', cursor: 'pointer',
      background: 'var(--notice-bg)', boxShadow: 'var(--notice-shadow)',
      animation: 'pgBannerIn .5s var(--ease-pop) both', ...style,
    }}>
      <Logo size={18} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: '600 12.5px/1.3 var(--font-ui)', color: 'var(--ink-2)' }}>{title}</span>
        <span style={{ display: 'block', font: 'var(--text-row-sub)', color: 'var(--text-secondary)' }}>{body}</span>
      </span>
      <span style={{ font: '500 10px/1 var(--font-ui)', color: 'var(--text-tertiary)', flex: 'none' }}>{meta}</span>
    </div>
  );
}

/** Live Activity: paper capsule expanding down from the Dynamic Island during a trip.
    Same family as Banner. Ink is reserved for the progress fill and the pulse bar. */
function LiveActivity({ name, status, tripMs, progress, style }) {
  const { Sprite } = window.PG;
  return (
    <div style={{
      width: 'var(--notice-w)', borderRadius: 'var(--notice-radius-activity)',
      background: 'var(--notice-bg)', boxShadow: 'var(--notice-shadow)',
      padding: '13px 17px 12px', display: 'flex', alignItems: 'center', gap: 13, ...style,
    }}>
      <Sprite size={30} still />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: '600 12.5px/1.3 var(--font-ui)', color: 'var(--ink-2)' }}>{name} · beyond the tear</span>
        <span style={{ display: 'block', font: '400 11px/1.4 var(--font-ui)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{status}</span>
        <span style={{ display: 'block', marginTop: 6, height: 2.5, borderRadius: 99, background: 'var(--notice-progress-track)', overflow: 'hidden' }}>
          <span style={{ display: 'block', height: '100%', borderRadius: 99, background: 'var(--notice-progress-fill)', width: progress != null ? `${progress * 100}%` : undefined, animation: tripMs ? `pgTrip ${tripMs}ms linear both` : undefined }} />
        </span>
      </span>
      <span style={{ width: 7, height: 26, flex: 'none', borderRadius: 99, background: 'var(--ink-2)', animation: 'pgGlowPulse var(--dur-glowpulse) ease-in-out infinite' }} />
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Banner, LiveActivity });
