/* the failure voice stays inside the world: three worn returns, each with
   its next door visible, and no software state talking over the companion. */

function Failure() {
  const P = window.PG || {};

  if (!P.Sprite) {
    return <div style={{ minHeight: 160, display: 'grid', placeItems: 'center', font: 'var(--text-body)', color: 'var(--text-secondary)' }}>waking the creature…</div>;
  }

  const frame = {
    position: 'relative',
    width: 320,
    height: 680,
    overflow: 'hidden',
    borderRadius: 'var(--radius-frame)',
    background: 'var(--bg)',
    boxShadow: 'var(--paper-ring), var(--shadow-panel)',
  };
  const speech = {
    position: 'absolute',
    top: 72,
    left: '50%',
    zIndex: 2,
  };
  const sprite = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  };
  const line = (children, delay) => <P.Line delay={delay}>{children}</P.Line>;

  function TripReturnsLight() {
    return (
      <div style={frame}>
        <div style={speech}>
          <P.Bubble maxW={266}>
            {line('I came home lighter than I hoped.', 0)}
            {line('The question needs another door.', 450)}
          </P.Bubble>
        </div>
        <div style={{ ...sprite, top: 284 }}>
          <P.Sprite size={112} mood={28} />
        </div>
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 34, display: 'flex', justifyContent: 'flex-end' }}>
          <P.Reply delay={850}>send me back out</P.Reply>
        </div>
      </div>
    );
  }

  function SourceBreaks() {
    return (
      <div style={frame}>
        <div style={{ ...speech, top: 48 }}>
          <P.Bubble maxW={266}>
            {line("This one's thread went cold,", 0)}
            {line('I kept the claim, flagged the doubt.', 450)}
          </P.Bubble>
        </div>
        <div style={{
          position: 'absolute',
          left: 26,
          right: 26,
          top: 238,
          padding: 18,
          borderRadius: 'var(--radius-row-card)',
          background: 'var(--paper-card)',
          boxShadow: 'var(--paper-ring), var(--shadow-element)',
        }}>
          <div style={{ font: 'var(--text-body)', color: 'var(--text-primary)' }}>The harbour gate opens at six.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            <P.SourceChip>harbour notice</P.SourceChip>
            <P.SourceChip><span style={{ textDecoration: 'line-through' }}>ferryman's note</span></P.SourceChip>
          </div>
        </div>
        <div style={{ ...sprite, top: 438 }}>
          <P.Sprite size={92} mood={28} />
        </div>
      </div>
    );
  }

  function WorldUnreachable() {
    return (
      <div style={frame}>
        <div style={{ ...speech, top: 48 }}>
          <P.Bubble maxW={266}>
            {line("The tear won't hold tonight.", 0)}
            {line("I'll wait by it.", 450)}
          </P.Bubble>
        </div>
        <div style={{
          position: 'absolute',
          left: 58,
          top: 286,
          width: 166,
          height: 174,
          display: 'grid',
          placeItems: 'center',
        }}>
          <div style={{
            width: 158,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, var(--porcelain-4) 0%, var(--porcelain-3) 25%, var(--porcelain-2) 52%, transparent 82%)',
          }} />
          <div style={{
            position: 'absolute',
            width: 120,
            height: 122,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, var(--porcelain-1) 0%, var(--porcelain-0) 34%, var(--porcelain-2) 66%, transparent 84%)',
            opacity: 0.72,
          }} />
        </div>
        <div style={{ ...sprite, left: 224, top: 392 }}>
          <P.Sprite size={88} mood={28} />
        </div>
      </div>
    );
  }

  const states = [
    { key: 'trip returns light', note: 'the next door stays open', view: <TripReturnsLight /> },
    { key: 'source breaks', note: 'the claim comes home intact', view: <SourceBreaks /> },
    { key: 'world unreachable', note: 'I will wait at the tear', view: <WorldUnreachable /> },
  ];

  return (
    <main style={{
      minHeight: '100vh',
      padding: 'var(--screen-margin)',
      background: 'var(--surface-desktop)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-ui)',
    }}>
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: 34, justifyContent: 'center', alignItems: 'flex-start' }}>
        {states.map((state) => (
          <div key={state.key} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {state.view}
            <div style={{ font: 'var(--text-mono-tag)', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>{state.key}</div>
            <div style={{ maxWidth: 320, font: 'var(--text-hint)', color: 'var(--text-tertiary)' }}>{state.note}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 56 }}>
        <div style={{ marginBottom: 14, font: 'var(--text-mono-tag)', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>contact sheet</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'flex-start' }}>
          {states.map((state) => (
            <div key={state.key} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ width: 160, height: 340, overflow: 'hidden', borderRadius: 'var(--radius-frame)', boxShadow: 'var(--paper-ring), var(--shadow-element)' }}>
                <div style={{ transform: 'scale(.5)', transformOrigin: 'top left', width: 320, height: 680 }}>
                  {state.view}
                </div>
              </div>
              <div style={{ font: 'var(--text-mono-tag)', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>{state.key}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Failure });
