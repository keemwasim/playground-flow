/* MINDS AND RUNTIMES, the standalone lab (PG-126).

   The business rule this screen has to carry: Playground Core is built in and
   free, bringing your own runtime is optional, and nothing about hatching is
   ever gated on it. So the screen is not a store and not a picker of features,
   it is a list of minds where exactly ONE is thinking for the companion right
   now and the rest are simply available.

   Two marks this file exists to settle:

   IN USE IS A RADIO, NEVER A CHECKMARK. A check says "done, handled, put away",
   which is wrong twice: connecting is not an achievement, and a check next to
   three rows reads as three minds running at once. The ink radio says the one
   thing that is true, that one of them is in play and the others are waiting
   their turn. Connected but idle is the bare ink ring, in use fills the ring.

   CONNECTING IS A SHIMMER WHISPER, NEVER A SPINNER. The world runs on its own
   time (no clock, no countdown, no percentage), so the wait is a quiet line in
   the companion's voice with the light moving across it. The row's radio sits
   at half ink while the mark has not landed.

   It composes the REAL window.PG parts, it draws no new chrome: PG.Section is
   the grouped list, PG.ListRow is every row, PG.Toggle is the switch, PG.Chip
   is the chip in direction 3, PG.Whisper is the waiting line. Every value binds
   to a named token. flow.jsx is untouched, this is a lab. */

const MINDS = [
  { id: 'core', name: 'Playground Core', built: true },
  { id: 'claude', name: 'Claude Code' },
  { id: 'codex', name: 'Codex' },
  { id: 'ollama', name: 'Ollama', where: 'on this machine' },
];

/* the reaching lines, in its voice, from the waiting language in the design
   system README. one per attempt, so a second try does not repeat itself. */
const REACHING = ['listening for it', 'reaching for it', 'almost'];

/* the seeds. one screen, three directions, each opening on a different moment
   of the same truth rather than a different design. */
const SEEDS = {
  1: { conn: { core: 'here' }, inUse: 'core' },
  2: { conn: { core: 'here', ollama: 'here', claude: 'reaching' }, inUse: 'core' },
  3: { conn: { core: 'here', claude: 'here', ollama: 'here' }, inUse: 'claude' },
};

function Minds({ dir = 1 }) {
  const P = window.PG || {};
  const d = Number(dir);
  const seed = SEEDS[d] || SEEDS[1];

  const [conn, setConn] = React.useState(seed.conn);
  const [inUse, setInUse] = React.useState(seed.inUse);
  const [choose, setChoose] = React.useState(false);
  const [tries, setTries] = React.useState(0);
  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const state = (id) => conn[id] || 'away';

  /* reaching for a runtime: it whispers, then it is here, and being here means
     it takes over, because a mind you just went and got is the one you wanted. */
  const reach = (id) => {
    if (state(id) !== 'away') return;
    setTries((n) => n + 1);
    setConn((c) => ({ ...c, [id]: 'reaching' }));
    timers.current.push(setTimeout(() => {
      setConn((c) => ({ ...c, [id]: 'here' }));
      setInUse(id);
    }, 2600));
  };

  const use = (id) => { if (state(id) === 'here') setInUse(id); };

  /* THE INK RADIO. away = nothing (the row offers to connect instead),
     reaching = the ring at half ink, here = the bare ink ring, in use = the
     ring filled. greyscale, hairline, no glyph inside it, ever. */
  const Radio = ({ st, on }) => {
    if (st === 'away') return null;
    const ring = st === 'reaching' ? 'var(--radio-ring-reaching)' : (on ? 'var(--radio-ring)' : 'var(--radio-ring-idle)');
    return (
      <span style={{
        flex: 'none', width: 'var(--radio-size)', height: 'var(--radio-size)', borderRadius: '50%',
        boxShadow: `inset 0 0 0 1.5px ${ring}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'box-shadow var(--dur-tap) ease',
      }}>
        <span style={{
          width: 'var(--radio-dot-size)', height: 'var(--radio-dot-size)', borderRadius: '50%',
          background: 'var(--radio-dot)', transform: on ? 'scale(1)' : 'scale(0)', opacity: on ? 1 : 0,
          transition: 'transform var(--dur-tap) var(--ease-pop), opacity var(--dur-tap) ease',
        }} />
      </span>
    );
  };

  /* the waiting line: PG.Whisper with the light sweeping through the letters.
     no spinner, no bar, no percentage. */
  const shimmer = {
    backgroundImage: 'var(--whisper-shimmer)',
    backgroundSize: 'var(--whisper-shimmer-span) 100%',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
    animation: 'pgShimmer var(--dur-shimmer) linear infinite',
  };
  const Reaching = () => (
    <P.Whisper style={{ ...shimmer, font: 'var(--text-row-sub)' }}>
      {REACHING[Math.min(tries, REACHING.length - 1)]}
    </P.Whisper>
  );

  const rowStyle = { padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' };

  /* one row per mind. connected rows carry the radio and switch on tap,
     an unconnected row carries the one quiet word that gets it. */
  const mindRow = (m, last) => {
    const st = state(m.id);
    const on = inUse === m.id;
    return (
      <P.ListRow key={m.id} last={last} style={rowStyle}
        onClick={() => (st === 'away' ? reach(m.id) : use(m.id))}
        title={m.name}
        sub={st === 'reaching' ? <Reaching /> : (m.built ? 'built in' : m.where)}
        trailing={st === 'away'
          ? <span style={{ font: 'var(--text-row-title)', color: 'var(--text-secondary)', flex: 'none' }}>connect</span>
          : <Radio st={st} on={on} />} />
    );
  };

  const byo = MINDS.filter((m) => !m.built);
  const here = MINDS.filter((m) => state(m.id) === 'here');
  const away = byo.filter((m) => state(m.id) !== 'here');

  /* 1 · THE GROUPED LIST. every mind in one card, the settings recipe exactly:
     readable label over an inset white card of rows. the radio is the only
     mark, so the eye finds the mind in play without reading a word. */
  const one = (
    <React.Fragment>
      <P.Section label="minds">
        {MINDS.map((m, i) => mindRow(m, i === MINDS.length - 1))}
      </P.Section>
      <P.Section label="when there are several">
        <P.ListRow last style={rowStyle} title="let it choose"
          trailing={<P.Toggle on={choose} onChange={setChoose} />} />
      </P.Section>
    </React.Fragment>
  );

  /* 2 · THE CONNECT FLOW. the same screen split so the states stand apart:
     what is in play, and what you can go and get. the reaching row whispers
     under its own name while its radio holds at half ink. */
  const two = (
    <React.Fragment>
      <P.Section label="in play">
        {MINDS.filter((m) => state(m.id) === 'here').map((m, i, a) => mindRow(m, i === a.length - 1))}
      </P.Section>
      <P.Section label="bring your own">
        {byo.filter((m) => state(m.id) !== 'here').map((m, i, a) => mindRow(m, i === a.length - 1))}
      </P.Section>
    </React.Fragment>
  );

  /* 3 · CONNECTED MINDS AS CHIPS. once a runtime is here it stops being a
     settings row and becomes a thing you can hand the companion, so the
     connected ones sit as chips and the chosen chip is solid ink (ink returns).
     the card underneath is only what is left to go and get. */
  const three = (
    <React.Fragment>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, padding: '4px 2px 2px' }}>
        {here.map((m) => (
          <P.Chip key={m.id} selected={inUse === m.id} onClick={() => use(m.id)}>{m.name}</P.Chip>
        ))}
      </div>
      {away.length > 0 && (
        <P.Section label="bring your own">
          {away.map((m, i) => mindRow(m, i === away.length - 1))}
        </P.Section>
      )}
      {byo.some((m) => state(m.id) === 'reaching') && (
        <div style={{ padding: '14px 6px 0' }}><Reaching /></div>
      )}
    </React.Fragment>
  );

  return (
    <div style={{
      position: 'relative', width: 320, height: 680, borderRadius: 'var(--radius-frame)', overflow: 'hidden',
      background: 'var(--bg)', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)',
      boxShadow: '0 0 0 1.5px rgba(0,0,0,.22), 0 30px 70px -36px rgba(0,0,0,.45)',
    }}>
      <div style={{ position: 'absolute', top: 20, left: 26, font: '600 12px var(--font-ui)', zIndex: 'var(--z-header)' }}>9:41</div>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)' }}>
        <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', padding: '2px 4px 4px' }}>Minds</div>
        {d === 2 ? two : d === 3 ? three : one}
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Minds });
