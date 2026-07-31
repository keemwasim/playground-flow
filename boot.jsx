// React is provided by the loader (DC x-import), no import, no bundler.

const bootStyles = {
  screen: {
    position: 'absolute',
    inset: 0,
    zIndex: 'var(--z-boot)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'var(--surface-desktop)',
    color: 'var(--ink-2)',
  },
  mark: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wordmark: {
    marginTop: 'var(--space-4)',
    font: 'var(--text-wordmark)',
    color: 'var(--ink-2)',
    animation: 'pgFadeIn var(--dur-enter) var(--ease-pop) .4s both',
  },
};

function BootMark({ size = 52, wordmark = true, hole = 'var(--porcelain-2)' }) {
  const P = window.PG || {};
  if (!P.AnimatedLogo) return null;
  return (
    <div style={bootStyles.mark}>
      <P.AnimatedLogo size={size} color="var(--ink-2)" hole={hole} />
      {wordmark && <div style={bootStyles.wordmark}>playground</div>}
    </div>
  );
}

function BootCentered() {
  return (
    <div style={bootStyles.screen} data-boot-variant="centered">
      <BootMark />
    </div>
  );
}

function BootBar() {
  return (
    <div style={bootStyles.screen} data-boot-variant="bar">
      <BootMark />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 96,
          width: 116,
          height: 3,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--divider)',
          overflow: 'hidden',
          animation: 'pgFadeIn var(--dur-enter) var(--ease-pop) .3s both',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--ink-2)',
            animation: 'pgBootBar 2.2s cubic-bezier(.3,.1,.3,1) .5s both',
          }}
        />
      </div>
    </div>
  );
}

function BootWorld() {
  const P = window.PG || {};
  return (
    <div style={{ ...bootStyles.screen, background: 'var(--porcelain-2)' }} data-boot-variant="world">
      {P.Globe && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '64%',
            zIndex: 0,
            transform: 'translate(-50%, -50%)',
            opacity: 0.24,
            maskImage: 'radial-gradient(circle, var(--ink-2) 0%, var(--ink-2) 48%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(circle, var(--ink-2) 0%, var(--ink-2) 48%, transparent 76%)',
          }}
        >
          <P.Globe variant="souls" size={300} souls={3} spinSeconds={32} />
        </div>
      )}
      <BootMark hole="var(--porcelain-2)" />
    </div>
  );
}

function BootCell({ tag, note, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minWidth: 320 }}>
      <div style={{ font: 'var(--text-mono-tag)', color: 'var(--text-tertiary)' }}>{tag}</div>
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 680,
          flex: '0 0 auto',
          borderRadius: 'var(--radius-frame)',
          overflow: 'hidden',
          background: 'var(--surface-desktop)',
          boxShadow: 'var(--paper-ring), var(--shadow-element)',
        }}
      >
        {children}
      </div>
      <div style={{ maxWidth: 320, font: 'var(--text-hint)', color: 'var(--text-secondary)' }}>{note}</div>
    </div>
  );
}

function BootLab() {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const P = window.PG || {};
    if (!P.AnimatedLogo || !P.Globe) {
      const id = setTimeout(() => force((value) => value + 1), 120);
      return () => clearTimeout(id);
    }
    return undefined;
  });
  const P = window.PG || {};
  if (!P.AnimatedLogo) return <div style={{ color: 'var(--ink-2)', font: 'var(--text-body)' }}>the mark is waking</div>;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-7)',
        alignItems: 'flex-start',
      }}
    >
      <BootCell tag="1 the mark centered" note="the mark, then its name, nothing else.">
        <BootCentered />
      </BootCell>
      <BootCell tag="2 the mark and a quiet boot bar" note="a hairline low in the frame, filling once.">
        <BootBar />
      </BootCell>
      <BootCell tag="3 the world behind the mark" note="a monochrome world, held low behind the mark.">
        <BootWorld />
      </BootCell>
    </div>
  );
}

window.PG = Object.assign(window.PG || {}, {
  BootLab,
  BootCentered,
  BootBar,
  BootWorld,
});
