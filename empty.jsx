// React is provided by the loader (DC x-import), no import, no bundler.

const EMPTY_VARIANTS = {
  friends: {
    title: 'Friends',
    copy: 'everyone it meets will gather here',
    object: 'sprite',
  },
  library: {
    title: 'Library',
    copy: 'nothing brought home yet',
    object: null,
  },
  places: {
    title: 'Places',
    copy: 'the map fills in as it travels',
    object: 'globe',
  },
};

// Presentation-only phone frame shadow; app surfaces do not use this.
const FRAME_SHADOW = '0 0 0 1.5px rgba(0,0,0,.22),0 30px 70px -36px rgba(0,0,0,.45)';

const screenStyle = {
  '--empty-screen-width': '320px',
  '--empty-screen-height': '680px',
  '--empty-copy-anchor': '120px',
  '--empty-object-gap': 'var(--space-3)',
  '--empty-world-opacity': '.72',
  position: 'relative',
  width: 'var(--empty-screen-width)',
  height: 'var(--empty-screen-height)',
  borderRadius: 'var(--radius-frame)',
  overflow: 'hidden',
  background: 'var(--bg)',
  boxShadow: FRAME_SHADOW,
};

function Empty({ surface = 'friends' }) {
  const { EmptyState, ScreenHeader, Sprite, Globe } = window.PG || {};
  const variant = EMPTY_VARIANTS[surface] || EMPTY_VARIANTS.friends;
  const object = variant.object === 'sprite' && Sprite
    ? <Sprite size={76} />
    : variant.object === 'globe' && Globe
      ? <Globe variant="eclipse" size={132} souls={0} />
      : null;
  const objectStyle = {
    position: 'absolute',
    left: '50%',
    bottom: 'calc(100% + var(--empty-object-gap))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(-50%)',
    ...(variant.object === 'globe' ? { opacity: 'var(--empty-world-opacity)' } : {}),
  };
  return (
    <div style={screenStyle}>
      {ScreenHeader ? (
        <div style={{ position: 'absolute', top: 'var(--safe-top)', left: 'var(--screen-gutter)', right: 'var(--screen-gutter)', zIndex: 'var(--z-header)' }}>
          <ScreenHeader title={variant.title} />
        </div>
      ) : null}
      <div style={{ position: 'absolute', inset: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        {EmptyState ? (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'var(--empty-copy-anchor)' }}>
            <EmptyState style={{ fontWeight: 500 }}>{variant.copy}</EmptyState>
            {variant.object ? <div style={objectStyle}>{object}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EmptySheet() {
  return (
    <div style={{ '--empty-screen-width': '320px', display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
      {Object.keys(EMPTY_VARIANTS).map((surface) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: 'var(--empty-screen-width)' }} key={surface}>
          <Empty surface={surface} />
          <div style={{ font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>{surface}</div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Empty, EmptySheet });
