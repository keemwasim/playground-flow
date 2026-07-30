/*
 * The brief and send-off, in three ruled beats.
 * The lab keeps the real controls visible while the desk packs itself.
 */
function BriefDesk({ packed = false, dim = false }) {
  const card = {
    position: 'absolute',
    width: 56,
    height: 42,
    borderRadius: 'var(--radius-micro)',
    background: 'var(--paper-card)',
    boxShadow: 'var(--paper-ring), var(--shadow-contact)',
    transition: 'transform var(--dur-travel) var(--ease-travel), opacity var(--dur-tap) ease',
  };
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: 22, right: 22, bottom: 116, height: 118, background: 'var(--bg-desk)', borderRadius: 'var(--radius-row-card)' }}>
      <div style={{ position: 'absolute', left: 16, top: 18, font: 'var(--text-mono-tag)', color: 'var(--text-tertiary)' }}>desk</div>
      <div style={{ ...card, left: 22, bottom: 20, opacity: dim ? .4 : 1, transform: packed ? 'translate(36px, 18px) rotate(-7deg)' : 'rotate(-7deg)' }} />
      <div style={{ ...card, left: 76, bottom: 28, opacity: dim ? .4 : 1, transform: packed ? 'translate(24px, 6px) rotate(6deg)' : 'rotate(6deg)' }} />
      <div style={{ ...card, left: 130, bottom: 20, opacity: dim ? .4 : 1, transform: packed ? 'translate(10px, 20px) rotate(-3deg)' : 'rotate(-3deg)' }} />
      <div style={{ position: 'absolute', right: 18, top: 16, width: 30, height: 30, borderRadius: '50%', background: 'var(--well)' }} />
    </div>
  );
}

function BriefHeader({ number, title }) {
  return (
    <div style={{ position: 'absolute', top: 34, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', zIndex: 3 }}>
      <div>
        <div style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>brief</div>
        <div style={{ marginTop: 5, font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>{title}</div>
      </div>
      <div style={{ font: 'var(--text-mono-id)', color: 'var(--text-tertiary)' }}>{number}</div>
    </div>
  );
}

function GoalVariant() {
  const P = window.PG || {};
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <BriefHeader number="01" title="the ask" />
      <div style={{ position: 'absolute', top: 126, left: 24, right: 24, zIndex: 2 }}>
        <div style={{ font: 'var(--text-label)', color: 'var(--text-secondary)', marginBottom: 8 }}>goal</div>
        <P.GoalArea rows={4} defaultValue="Find the quietest coast for a week of making" aria-label="Goal" />
      </div>
      <BriefDesk />
      <div style={{ position: 'absolute', left: '50%', bottom: 42, transform: 'translateX(-50%)', zIndex: 2 }}>
        <P.Sprite size={88} packed={false} />
      </div>
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24, height: 1, background: 'var(--divider)' }} />
    </div>
  );
}

function PackVariant() {
  const P = window.PG || {};
  const [things, setThings] = React.useState(['places', 'notes']);
  const [depth, setDepth] = React.useState('Overnight');
  const [when, setWhen] = React.useState('Tonight');
  const toggle = (thing) => setThings((current) => current.includes(thing) ? current.filter((x) => x !== thing) : [...current, thing]);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <BriefHeader number="02" title="pack" />
      <div style={{ position: 'absolute', top: 124, left: 24, right: 24 }}>
        <div style={{ font: 'var(--text-label)', color: 'var(--text-secondary)', marginBottom: 9 }}>bring back</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {['places', 'notes', 'surprises'].map((thing) => <P.Chip key={thing} selected={things.includes(thing)} onClick={() => toggle(thing)}>{thing}</P.Chip>)}
        </div>
        <div style={{ marginTop: 28, font: 'var(--text-label)', color: 'var(--text-secondary)', marginBottom: 9 }}>trip depth</div>
        <P.Segmented options={['Quick look', 'Overnight', 'Deep']} value={depth} onChange={setDepth} />
        <div style={{ marginTop: 22, font: 'var(--text-label)', color: 'var(--text-secondary)', marginBottom: 9 }}>when</div>
        <P.Segmented options={['Tonight', 'Each dawn']} value={when} onChange={setWhen} />
      </div>
      <BriefDesk packed dim={things.length > 0} />
      <div style={{ position: 'absolute', left: '50%', bottom: 42, transform: 'translateX(-50%)', zIndex: 2 }}>
        <P.Sprite size={88} packed={things.length > 0} mood={72} />
      </div>
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24, height: 1, background: 'var(--divider)' }} />
    </div>
  );
}

function SendoffVariant() {
  const P = window.PG || {};
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <BriefHeader number="03" title="send-off" />
      <div style={{ position: 'absolute', top: 126, left: 24, right: 24, zIndex: 2 }}>
        <div style={{ font: 'var(--text-label)', color: 'var(--text-secondary)', marginBottom: 8 }}>goal</div>
        <div style={{ font: 'var(--text-speech)', color: 'var(--text-primary)' }}>Find the quietest coast for a week of making</div>
      </div>
      <div style={{ position: 'absolute', left: 24, right: 24, top: 194, height: 1, background: 'var(--divider)' }} />
      <BriefDesk packed dim />
      <div style={{ position: 'absolute', left: '50%', top: 302, transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <P.Tear open size={154} world="nightAvenue" assetBase="./design-system/assets/" />
      </div>
      <div className="brief-travelling-sprite" style={{ position: 'absolute', left: '50%', top: 552, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <P.Sprite size={78} packed still />
      </div>
    </div>
  );
}

function Brief({ variant = 'all' }) {
  const views = { goal: <GoalVariant />, pack: <PackVariant />, sendoff: <SendoffVariant /> };
  if (variant !== 'all' && views[variant]) return views[variant];
  return (
    <div className="brief-phone">
      <GoalVariant />
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, {
  Brief,
  BriefGoal: GoalVariant,
  BriefPack: PackVariant,
  BriefSendoff: SendoffVariant,
});
