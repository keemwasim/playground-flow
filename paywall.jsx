/* THE PAYWALL MOMENT, soft-sell. the offer is a place you walked to, never a
   thing that jumped you: no scrim, no centred dialog, nothing that appears
   unbidden. the gate is a lock glyph plus the Playground+ tag, the CTA is
   "Coming soon", and nothing here counts down or costs a number yet.

   what is being sold is room, not vanity: keeping more than one of them,
   choosing its mind, the marketplace. cosmetics and progression stay out of
   the economy, so they stay out of the pitch.

   three directions audition here, and the contact sheet reads them together.
   greyscale chrome, real PG.Button / PG.Chip / PG.Sprite, named tokens only. */

const PAYWALL_W = 320;
const PAYWALL_H = 680;

function PaywallLock() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink-5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
      <rect x="5" y="10" width="14" height="10" rx="2" />
    </svg>
  );
}

function PaywallChevron() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PaywallShell({ children }) {
  return (
    <div className="pg-paywall-screen" style={{ position: 'relative', overflow: 'hidden', width: PAYWALL_W, height: PAYWALL_H, background: 'var(--bg)', borderRadius: 'var(--radius-frame)', boxShadow: 'var(--paper-ring), var(--shadow-panel)' }}>
      {children}
    </div>
  );
}

function PaywallHeader({ compact = false }) {
  const P = window.PG || {};
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', padding: compact ? 'var(--space-2) 0' : '0' }}>
      <P.Chip mono style={{ pointerEvents: 'none' }}>Playground+</P.Chip>
    </div>
  );
}

function PaywallCalm() {
  const P = window.PG || {};
  if (!P.Sprite || !P.Button || !P.Chip) return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 'var(--space-6)' }}>waking the creature…</div>;

  return (
    <PaywallShell>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 'var(--space-6)' }}>
          <P.Sprite size={112} form="pebble" faceIdx={1} mood={58} />
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <PaywallLock />
            <P.Chip mono style={{ pointerEvents: 'none' }}>Playground+</P.Chip>
          </div>
          <div style={{ marginTop: 'var(--space-5)', textAlign: 'center', font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)' }}>keep more than one of them.</div>
        </div>
        <div style={{ flex: 'none' }}>
          <P.Button full size="lg">Coming soon</P.Button>
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: 'var(--hit-min)', paddingTop: 'var(--space-4)', alignItems: 'center', cursor: 'pointer' }}>
            <PaywallChevron />
          </div>
        </div>
      </div>
    </PaywallShell>
  );
}

function PaywallList() {
  const P = window.PG || {};
  if (!P.Sprite || !P.Button || !P.Chip) return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 'var(--space-6)' }}>waking the creature…</div>;

  const rows = ['more than one companion', 'choose its mind', 'the marketplace', 'a wider commons'];
  return (
    <PaywallShell>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        <PaywallHeader compact />
        <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <P.Sprite size={42} form="inkling" faceIdx={2} mood={48} />
          <div style={{ font: 'var(--text-sheet-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)' }}>more room to roam</div>
        </div>
        <div style={{ marginTop: 'var(--section-gap)' }}>
          <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', padding: '0 var(--space-2) var(--space-3)' }}>playground+</div>
          <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
            {rows.map((row, index) => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: 'var(--row-gap)', minHeight: 'var(--section-row-min)', padding: 'var(--section-row-pad)', borderTop: index ? '1px solid var(--row-divider)' : 'none' }}>
                <PaywallLock />
                <div style={{ flex: 1, minWidth: 0, font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{row}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'var(--section-gap)', padding: 'var(--space-2) 0' }}>
          <P.Button full size="lg">Coming soon</P.Button>
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: 'var(--hit-min)', paddingTop: 'var(--space-4)', alignItems: 'center', cursor: 'pointer' }}>
            <PaywallChevron />
          </div>
        </div>
      </div>
    </PaywallShell>
  );
}

function PaywallInline() {
  const P = window.PG || {};
  const [open, setOpen] = React.useState(null);
  if (!P.Sprite || !P.Button || !P.Chip) return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 'var(--space-6)' }}>waking the creature…</div>;

  const rows = [
    { name: 'personality', locked: false },
    { name: 'training', locked: false },
    { name: 'standing', locked: false },
    { name: 'the store', locked: true, line: 'i want to keep more than one of you close.' },
    { name: 'marketplace', locked: true, line: 'there are more minds waiting on the other side.' },
  ];
  return (
    <PaywallShell>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        <PaywallHeader compact />
        <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <P.Sprite size={42} form="pebble" faceIdx={3} mood={52} />
          <div style={{ font: 'var(--text-sheet-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)' }}>my companion</div>
        </div>
        <div style={{ marginTop: 'var(--section-gap)' }}>
          <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', padding: '0 var(--space-2) var(--space-3)' }}>the self</div>
          <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
            {rows.map((row, index) => {
              const isOpen = open === index;
              return (
                <React.Fragment key={row.name}>
                  <div onClick={() => row.locked && setOpen(isOpen ? null : index)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--row-gap)', minHeight: 'var(--section-row-min)', padding: 'var(--section-row-pad)', borderTop: index ? '1px solid var(--row-divider)' : 'none', cursor: row.locked ? 'pointer' : 'default' }}>
                    <div style={{ flex: 1, minWidth: 0, font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{row.name}</div>
                    {row.locked && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <PaywallLock />
                        <P.Chip mono style={{ pointerEvents: 'none' }}>Playground+</P.Chip>
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-2) var(--section-row-pad) var(--space-5)', borderTop: '1px solid var(--row-divider)' }}>
                      <div style={{ font: '500 14px/1.45 var(--font-ui)', color: 'var(--text-secondary)' }}>{row.line}</div>
                      <P.Button size="md">Coming soon</P.Button>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </PaywallShell>
  );
}

function PaywallSheet() {
  const P = window.PG || {};
  if (!P.Sprite || !P.Button || !P.Chip) return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 'var(--space-6)' }}>waking the creature…</div>;

  const columns = [
    ['one', 'calm screen', PaywallCalm],
    ['two', 'feature list', PaywallList],
    ['three', 'inline gate', PaywallInline],
  ];
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', padding: 'var(--space-6)', background: 'var(--porcelain-0)' }}>
      {columns.map(([number, direction, Component]) => (
        <div key={number} style={{ width: 134, flex: 'none' }}>
          <div style={{ width: 134, height: 286, overflow: 'hidden', background: 'var(--porcelain-0)' }}>
            <div style={{ transform: 'scale(.42)', transformOrigin: 'top left' }}><Component /></div>
          </div>
          <div style={{ marginTop: 'var(--space-2)', font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>{number}, {direction}</div>
        </div>
      ))}
    </div>
  );
}

window.PG = Object.assign(window.PG || {}, { PaywallCalm, PaywallList, PaywallInline, PaywallSheet });
