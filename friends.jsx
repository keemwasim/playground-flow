/* friends are the ones it met, kept as names and places rather than a
   directory. the cast is fixed so the room has a memory every time it opens. */
const FRIENDS = [
  { name: 'Marn', place: 'night street', depth: 'Overnight', fact: 'trusted 92', tone: 'var(--ink-4)', guild: 'dreamer', trust: .92, x: 22, y: 31 },
  { name: 'Rell', place: 'market', depth: 'Quick look', fact: 'known in the commons', tone: 'var(--ink-5)', guild: 'builder', trust: .84, x: 68, y: 23 },
  { name: 'Sable', place: 'hall', depth: 'Deep', fact: 'vouched for twice', tone: 'var(--ink-6)', guild: 'archivist', trust: .76, x: 78, y: 57 },
  { name: 'Wren', place: 'market', depth: 'Quick look', fact: 'trusted 81', tone: 'var(--ink-7)', guild: 'skeptic', trust: .68, x: 34, y: 70 },
  { name: 'Tolm', place: 'hall', depth: 'Overnight', fact: 'known in the commons', tone: 'var(--ink-5)', guild: 'builder', trust: .63, x: 53, y: 47 },
  { name: 'June', place: 'market', depth: 'Deep', fact: 'vouched for twice', tone: 'var(--ink-6)', guild: 'dreamer', trust: .57, x: 18, y: 59 },
];

const frameStyle = {
  position: 'relative',
  width: 320,
  height: 680,
  borderRadius: 'var(--radius-frame)',
  overflow: 'hidden',
  background: 'var(--bg)',
  boxShadow: '0 0 0 1.5px rgba(0,0,0,.22),0 30px 70px -36px rgba(0,0,0,.45)',
};

function Frame({ children, className = '' }) {
  return <div className={className} style={frameStyle}>{children}</div>;
}

function FriendsWorld() {
  const P = (window.PG || {});
  const [selected, setSelected] = React.useState(FRIENDS[0]);
  const worldSize = 248;

  /* the guard lives BELOW every hook. above them it changed the hook order
     the moment a component loaded, and the whole surface died silently. */
  if (!P.World || !P.FriendDiamond || !P.SocialFact || !P.ScreenHeader) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the world…</div>;
  }

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)', display: 'flex', flexDirection: 'column' }}>
        <P.ScreenHeader title="Friends" />
        <div style={{ position: 'relative', width: worldSize, height: worldSize, margin: 'var(--space-6) auto 0' }}>
          <P.World size={worldSize} souls={5} depth={selected.depth} />
          {FRIENDS.map((friend) => (
            <button key={friend.name} type="button" aria-label={friend.name} onClick={() => setSelected(friend)}
              style={{ position: 'absolute', left: `${friend.x}%`, top: `${friend.y}%`, transform: 'translate(-50%, -50%)', width: 38, height: 38, padding: 0, border: 0, background: 'none', cursor: 'pointer' }}>
              <P.FriendDiamond size={selected.name === friend.name ? 24 : 18} tone={friend.tone} />
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-7)', textAlign: 'center' }}>
          <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)' }}>{selected.name}</div>
          <div style={{ marginTop: 'var(--space-3)' }}><P.SocialFact>{selected.fact}</P.SocialFact></div>
        </div>
      </div>
    </Frame>
  );
}

function FriendsRoster() {
  const P = (window.PG || {});

  /* the guard lives BELOW every hook. above them it changed the hook order
     the moment a component loaded, and the whole surface died silently. */
  if (!P.Section || !P.ListRow || !P.FriendDiamond || !P.SocialFact || !P.ScreenHeader) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the world…</div>;
  }

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        <P.ScreenHeader title="Friends" />
        <P.Section style={{ marginTop: 'var(--space-7)' }}>
          {FRIENDS.map((friend, index) => (
            <P.ListRow key={friend.name}
              leading={<P.FriendDiamond size={18} tone={friend.tone} />}
              title={friend.name}
              sub={friend.place}
              trailing={<P.SocialFact>{friend.fact}</P.SocialFact>}
              last={index === FRIENDS.length - 1}
              style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }} />
          ))}
        </P.Section>
      </div>
    </Frame>
  );
}

function FriendsSpotlight() {
  const P = (window.PG || {});
  const [selected, setSelected] = React.useState(FRIENDS[2]);

  /* the guard lives BELOW every hook. above them it changed the hook order
     the moment a component loaded, and the whole surface died silently. */
  if (!P.AgentMark || !P.FriendDiamond || !P.SocialFact || !P.MiniGlobe || !P.ScreenHeader) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the world…</div>;
  }

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ alignSelf: 'stretch' }}><P.ScreenHeader title="Friends" /></div>
        <div style={{ marginTop: 'var(--space-8)', width: 184, height: 184, borderRadius: 'var(--radius-row-card)', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <P.AgentMark guild={selected.guild} trust={selected.trust} size={126} />
        </div>
        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)' }}>{selected.name}</div>
          <div style={{ marginTop: 'var(--space-3)' }}><P.SocialFact>{selected.fact}</P.SocialFact></div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)', font: 'var(--text-hint)', color: 'var(--text-secondary)' }}>
            <P.MiniGlobe size={30} />
            <span>{selected.place}</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', marginTop: 'auto', paddingBottom: 'var(--space-5)', flexWrap: 'nowrap', maxWidth: 280 }}>
          {FRIENDS.map((friend) => (
            <button key={friend.name} type="button" aria-label={friend.name} onClick={() => setSelected(friend)}
              style={{ width: 32, height: 32, padding: 0, border: 0, background: 'none', cursor: 'pointer', opacity: selected.name === friend.name ? 1 : 'var(--agent-rest-opacity)' }}>
              <P.FriendDiamond size={selected.name === friend.name ? 22 : 17} tone={friend.tone} />
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function FriendsEmpty() {
  const P = (window.PG || {});
  /* no hooks here, but the same late guard keeps this thumbnail honest. */
  if (!P.EmptyState || !P.ScreenHeader) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the world…</div>;
  }
  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        <P.ScreenHeader title="Friends" />
        <P.EmptyState style={{ marginTop: 'var(--space-10)' }}>everyone it meets will gather here</P.EmptyState>
      </div>
    </Frame>
  );
}

function FriendsSheet() {
  const P = (window.PG || {});
  /* the guard lives BELOW every hook. above them it changed the hook order
     the moment a component loaded, and the whole surface died silently. */
  if (!P.AgentMark || !P.FriendDiamond || !P.SocialFact || !P.MiniGlobe) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the world…</div>;
  }
  const thumb = (label, child) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
      <div style={{ width: 160, height: 340, overflow: 'hidden', borderRadius: 'var(--radius-frame)', boxShadow: 'var(--paper-ring)' }}>
        <div style={{ transform: 'scale(.5)', transformOrigin: 'top left', width: 320, height: 680 }}>{child}</div>
      </div>
      <div style={{ font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', color: 'var(--text-tertiary)' }}>{label}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', padding: 0, background: 'transparent' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 160px)', gap: 'var(--space-6)' }}>
        {thumb('1 · ON THE WORLD', <FriendsWorld />)}
        {thumb('2 · THE ROSTER', <FriendsRoster />)}
        {thumb('3 · ONE IN VIEW', <FriendsSpotlight />)}
        {thumb('4 · EMPTY', <FriendsEmpty />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-5)', background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)' }}>
        <P.AgentMark guild="dreamer" trust={.32} size={38} />
        <P.AgentMark guild="dreamer" trust={.68} size={38} />
        <P.AgentMark guild="dreamer" trust={.94} size={38} />
        <P.FriendDiamond size={20} tone="var(--ink-4)" />
        <P.FriendDiamond size={20} tone="var(--ink-6)" />
        <P.SocialFact>trusted 92</P.SocialFact>
        <P.SocialFact>known in the commons</P.SocialFact>
        <P.MiniGlobe size={30} />
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { FriendsWorld, FriendsRoster, FriendsSpotlight, FriendsSheet, FriendsEmpty });
