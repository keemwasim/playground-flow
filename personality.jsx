/* The personality surface, three decided readings of the same companion. */

function Personality() {
  const P = window.PG || {};
  const need = ['Sprite', 'Bubble', 'Line', 'Reply', 'ListRow', 'Section'];
  const missing = need.filter((key) => !P[key]);
  const [picked, setPicked] = React.useState(null);

  if (missing.length) {
    return (
      <div style={{
        minHeight: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 28,
        background: 'var(--paper-card)',
        color: 'var(--text-primary)',
        font: 'var(--text-body)',
        borderRadius: 'var(--radius-row-card)',
        boxShadow: 'var(--paper-ring), var(--shadow-contact)',
      }}>
        personality needs: {missing.join(', ')}
      </div>
    );
  }

  const phone = (children) => <div className="personality-phone">{children}</div>;
  const status = <div className="personality-status">9:41</div>;

  const variantA = phone(
    <>
      {status}
      <div className="personality-a-copy">
        <div className="personality-a-creed">“be gentle with strangers, but never gullible”</div>
        <div className="personality-a-sprite">
          <P.Sprite size={88} form="pebble" mood={58} />
        </div>
        <div className="personality-a-bubble-anchor">
          <P.Bubble maxW={252} style={{ color: 'var(--text-primary)' }}>
            <P.Line delay={350}>i still carry it.</P.Line>
            <P.Line delay={700}>i think i lean on the sharp part more than you meant.</P.Line>
          </P.Bubble>
        </div>
      </div>
      <div className="personality-bottom">
        <P.Section style={{ marginTop: 0 }}>
          <P.ListRow
            title="train Sol"
            chevron
            style={{ color: 'var(--ink-2)' }}
            last
          />
        </P.Section>
      </div>
    </>
  );

  const variantB = phone(
    <>
      {status}
      <div className="personality-b-top">
        <P.Sprite size={58} form="pebble" mood={55} />
        <div className="personality-b-title">what it reaches for</div>
      </div>
      <div className="personality-b-sections">
        <P.Section label="what you asked for at the door" style={{ marginTop: 34 }}>
          <P.ListRow
            title="gentle with strangers"
            trailing={<span style={{ flex: 'none', color: 'var(--text-tertiary)', font: '500 11px/1.2 var(--font-data)' }}>steady</span>}
            style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
          />
          <P.ListRow
            title="never gullible"
            trailing={<span style={{ flex: 'none', color: 'var(--text-tertiary)', font: '500 11px/1.2 var(--font-data)' }}>sometimes</span>}
            style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
            last
          />
        </P.Section>
        <P.Section label="what it picked up out there on its own" style={{ marginTop: 24 }}>
          <P.ListRow
            title="goes cold with the kind"
            trailing={<span style={{ flex: 'none', color: 'var(--text-tertiary)', font: '500 11px/1.2 var(--font-data)' }}>cooling</span>}
            style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
          />
          <P.ListRow
            title="follows the rare thing"
            trailing={<span style={{ flex: 'none', color: 'var(--text-tertiary)', font: '500 11px/1.2 var(--font-data)' }}>leans hard</span>}
            style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
            last
          />
        </P.Section>
      </div>
    </>
  );

  const variantC = phone(
    <>
      {status}
      <div className="personality-c-sprite">
        <P.Sprite size={96} form="pebble" mood={64} />
      </div>
      <div className="personality-c-bubble-anchor">
        <P.Bubble maxW={270} bare style={{ color: 'var(--text-primary)' }}>
          <P.Line delay={350}>you gave me gentle.</P.Line>
          <P.Line delay={700}>i became better at finding the strange thing.</P.Line>
          <P.Line delay={1050}>once, i chose the wrong door.</P.Line>
        </P.Bubble>
      </div>
      <div className="personality-c-replies">
        <P.Reply
          delay={350}
          sub="i will follow that pull a little farther"
          style={{ color: 'var(--ink-2)' }}
        >
          keep the drift
        </P.Reply>
        <P.Reply
          delay={700}
          sub="i will look for your words first"
          style={{ color: 'var(--ink-2)' }}
        >
          lean it back
        </P.Reply>
      </div>
    </>
  );

  const dot = (key) => (
    <button
      type="button"
      className="personality-dot"
      aria-label={`pick personality ${key}`}
      onClick={() => setPicked(key)}
      style={{ background: picked === key ? 'var(--ink-2)' : 'transparent' }}
    />
  );

  return (
    <main className="personality-lab">
      <header className="personality-header">
        <h1>personality</h1>
        <p>what you gave it, what it became, and what it can learn.</p>
      </header>
      <div className="personality-contact-sheet">
        <section className="personality-option">
          <div className="personality-tag">
            {dot('A')}
            personality · A · the creed, quoted back
          </div>
          {variantA}
          <p className="personality-note">the creed stays yours, even as its reading drifts.</p>
        </section>
        <section className="personality-option">
          <div className="personality-tag">
            {dot('B')}
            personality · B · what it chases
          </div>
          {variantB}
          <p className="personality-note">a quiet record of what it carries out there.</p>
        </section>
        <section className="personality-option">
          <div className="personality-tag">
            {dot('C')}
            personality · C · it tells you
          </div>
          {variantC}
          <p className="personality-note">the companion names the drift, then offers a way to train.</p>
        </section>
      </div>
    </main>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Personality });
