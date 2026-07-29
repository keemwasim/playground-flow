// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** The flow, start to finish. One operable phone walking the whole journey
    (entry, home, crossing, away, after)
    plus a rail mapping every beat to the door-contract call behind it.
    Composes the REAL ruled components from window.PG, it draws nothing new. */

/* every agent carries its own room light (keem 2026-07-23). the canonical
   token sets live in design-system/tokens/rooms.css and the spec is
   design-system/agent-identity.md, this mirrors them for the prototype. */
const ROOMS = [
  { key: 'porcelain', vars: {} },
  /* the dark room is CUT (keem 2026-07-25). a second agent arriving flipped
     the whole app to night, which read as a broken theme rather than a
     different room. the system is light-first, so rooms may differ in warmth,
     never in polarity. */
  { key: 'dusk', vars: {
    '--bg': '#F4F1EC', '--paper-card': '#FBFAF7', '--well': 'rgba(60,40,20,.06)',
    '--divider': 'rgba(60,40,20,.09)', '--text-secondary': 'rgba(40,30,20,.6)',
  } },
];

/* v3, THE WORLD IS SOMEWHERE. the places already existed in what the agent
   says, this makes them real on the globe. an errand routes to one of them,
   the crossing draws the arc there, and the return names it. */
const PLACES = [
  { key: 'lantern', name: 'the lantern district', x: 34, y: 40, match: /cut|edit|film|trailer|video|make/ },
  { key: 'makers',  name: "the maker's hall",     x: 62, y: 33, match: /place|room|desk|work|quiet|studio|space/ },
  { key: 'square',  name: 'the square',           x: 48, y: 62, match: /.*/ },
];
/* others out there. known ones are inked in, strangers stay faint. */
const BEINGS = [
  { x: 28, y: 55, known: 0.9 }, { x: 70, y: 48, known: 0.35 }, { x: 44, y: 28, known: 0.15 },
  { x: 58, y: 70, known: 0.6 }, { x: 22, y: 36, known: 0.1 },
];
const placeFor = (ask) => PLACES.find((p) => p.match.test((ask || '').toLowerCase())) || PLACES[2];

const BEATS = [
  { key: 'entry', n: '01', title: 'the entry', call: 'GET /pulse', cap: 'a world is awake on white. the globe is the star, souls are real counts.' },
  { key: 'home', n: '02', title: 'home, together', call: 'GET /home · POST /talk · POST /trip', cap: 'the habitat. yours now. no brief form, you just tell it what you need in the talk and it goes. swipe across to switch agents.' },
  { key: 'sendoff', n: '03', title: 'the crossing', call: '', cap: 'not a page, a transition. the world swells up, it dives in, the globe closes, and you land back home. plays itself.' },
  { key: 'away', n: '04', title: 'home, while it is away', call: 'GET /trip/{id}/whispers', cap: 'no monitor screen, no feed. home itself shows the absence, the room is quiet. word arrives through the island and the knock.' },
  { key: 'after', n: '05', title: 'after', call: 'GET /homecoming/{id}', cap: 'no homecoming page. it is simply back, and it hands you what you asked for in the talk.' },
];

function FlowFrame({ children }) {
  /* pointer stands in for the iphone gyroscope + attention: it drives
     --gaze-dx/dy (the companion's eyes follow you) and --peer-x/y (peer
     around the world through the tear). on iOS these come from CoreMotion
     and the TrueDepth attention signal instead. */
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    const s = e.currentTarget.style;
    s.setProperty('--gaze-dx', (nx * 3).toFixed(1) + 'px');
    s.setProperty('--gaze-dy', (ny * 2.2).toFixed(1) + 'px');
    s.setProperty('--peer-x', (-nx * 14).toFixed(1) + 'px');
    s.setProperty('--peer-y', (-ny * 10).toFixed(1) + 'px');
  };
  return (
    <div onMouseMove={move} style={{ position: 'relative', width: 390, height: 780, borderRadius: 54, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.3), 0 34px 90px -40px rgba(0,0,0,.45)', flex: 'none' }}>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 110, height: 32, borderRadius: 999, background: '#000', zIndex: 40 }} />
      <div style={{ position: 'absolute', top: 20, left: 32, font: '700 14px var(--font-ui)', color: 'var(--ink-2)', zIndex: 40 }}>9:41</div>
      {children}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 132, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)', zIndex: 40 }} />
    </div>
  );
}


/* an unnamed agent bothers you. every line is a door into the talk, and the
   asks cycle so it never says the same thing twice in a row. */
function UnnamedNag({ onOpen }) {
  const LINES = ['name me', 'what do i call you?', 'talk to me'];
  const [i, setI] = React.useState(0);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    /* it asks three times, slowly, then lets it go. a thing that never stops
       asking is a nag, a thing that asks and waits is a companion. */
    const t = setInterval(() => setI((x) => {
      if (x + 1 >= LINES.length) { setDone(true); clearInterval(t); return x; }
      return x + 1;
    }), 9000);
    return () => clearInterval(t);
  }, []);
  /* it stops ASKING after three, it does not disappear. the bubble was the
     only door into naming and removing it stranded people who had not found
     it yet (team note 2026-07-25). it settles quiet and stays. */
  return (
    <div onClick={(e) => { e.stopPropagation(); onOpen(); }}
      onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}
      style={{ position: 'absolute', bottom: '100%', marginBottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 22, cursor: 'pointer', opacity: done ? .85 : 1, transition: 'opacity .8s ease' }}>
      {/* the film's bubbles are the reference, not a chat app's. fully rounded,
          a real tail pointing down at the creature, almost no weight. it grows
          FROM the tail, so the line comes out of the creature rather than
          appearing above it. */}
      <div key={i} style={{ position: 'relative', transformOrigin: '50% 118%', animation: 'pgLineIn .5s var(--ease-pop) both' }}>
        <div style={{
          padding: '11px 18px', borderRadius: 999,
          background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(6px)',
          boxShadow: '0 6px 18px -8px rgba(20,20,28,.22), 0 1px 0 rgba(255,255,255,.9) inset',
          font: '500 14.5px var(--font-ui)', color: 'var(--ink-2)', whiteSpace: 'nowrap',
        }}>{LINES[i]}</div>
        {/* the tail. two dots shrinking toward the creature, the way a thought
            reaches it, instead of a hard triangle welded to the corner. */}
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: 'rgba(255,255,255,.94)', boxShadow: '0 3px 8px -4px rgba(20,20,28,.25)' }} />
          <div style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,.9)' }} />
        </div>
      </div>
    </div>
  );
}

function Flow() {
  const P = window.PG || {};
  const need = ['Globe', 'Sprite', 'Tear', 'Bubble', 'Line', 'Button', 'HatchInput', 'GoalArea', 'Chip', 'Segmented', 'SealedNote', 'Finding', 'SocialFact', 'Whisper', 'Dock', 'ScreenHeader'];
  const missing = need.filter((k) => !P[k]);
  const [, force] = React.useState(0);
  React.useEffect(() => {
    if (missing.length) { const t = setTimeout(() => force((x) => x + 1), 150); return () => clearTimeout(t); }
  });
  const [step, setStep] = React.useState(0);
  const [agents, setAgents] = React.useState([{ name: '', room: 0, face: 0, form: 'pebble', chat: [], ask: '', mood: 55 }]);
  /* which of them you are standing with. declared beside the collection so
     the mood decay effect can name it (QA 2026-07-24). */
  const [agentIdx, setAgentIdx] = React.useState(0);
  const [talking, setTalking] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);
  const [dockOpen, setDockOpen] = React.useState(false);
  const [holdMenu, setHoldMenu] = React.useState(false);
  const [soundOn, setSoundOn] = React.useState(true);
  const [hapticOn, setHapticOn] = React.useState(true);   // sound.md: every sound has a haptic sibling
  const [thinking, setThinking] = React.useState(false);
  const [doing, setDoing] = React.useState(null);   // what it is doing right now, in its own words
  const [giveOpen, setGiveOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [confirmWipe, setConfirmWipe] = React.useState(false);
  const [yoursOpen, setYoursOpen] = React.useState(false);
  const [plusOpen, setPlusOpen] = React.useState(false);
  const [invOpen, setInvOpen] = React.useState(false);
  /* ponytail: `?kept=3` fills the inventory with demo deliveries so the
     populated state can be reviewed without running three errands by hand.
     off by default, and it is prototype furniture, not product. */
  const DEMO_KEPT = [
    { asked: 'someone to cut my trailer', t: 'Vess. she cuts, she is good, and she owes me a favour i already spent on you.', at: 'THE CUTTER' },
    { asked: 'a quiet place to work', t: 'third floor of the maker\u2019s hall. ask for June, she holds the corner desk.', at: 'THE QUIET PLACE' },
    { asked: 'someone who prints short runs', t: 'the printer on the square. short runs, and half price on thursdays.', at: 'THE SQUARE' },
    { asked: 'a van for saturday', t: 'Marn\u2019s brother has one. he wants it back with fuel in it.', at: 'THE LONG ROAD' },
  ];
  const demoN = (() => { const m = /[?&]kept=(\d+)/.exec(typeof location !== 'undefined' ? location.search : ''); return m ? Math.min(4, +m[1]) : 0; })();
  const [kept, setKept] = React.useState(DEMO_KEPT.slice(0, demoN));   // everything it has handed over
  const [recalled, setRecalled] = React.useState(false);  // you called it back early
  const [askedKnock, setAskedKnock] = React.useState(false);
  const [knockAsk, setKnockAsk] = React.useState(false);
  const [notifOn, setNotifOn] = React.useState(false);
  const [lastSaid, setLastSaid] = React.useState('');
  /* v2, the creature has moods. one value, 0 spent to 100 restless. attention
     lifts it, neglect lowers it, an errand well run lifts it most. the owner
     never sees the number: the body carries it and the status line names it
     in the agent's own words. */
  /* the mood belongs to the AGENT, not the app. it used to be one value for
     the whole session, so adopting a second creature handed it the first
     one's temperament, which is the same break the shared conversation was
     (QA 2026-07-24). it lives in the agent record beside name, face, room
     and chat. */
  const setMoodOf = (i, fn) => setAgents((xs) => xs.map((a, j) => (j === i ? { ...a, mood: Math.max(0, Math.min(100, fn(a.mood == null ? 55 : a.mood))) } : a)));
  const lift = (n) => setMoodOf(agentIdx, (m) => m + n);
  /* derived here, not from `cur`, because cur is declared further down and the
     effect's dependency array is read during render (TDZ otherwise). */
  const curNamed = !!((agents[Math.min(agentIdx, agents.length - 1)] || {}).name || '').trim();
  React.useEffect(() => {
    /* neglect: it settles when nothing is happening. slow, so it is felt
       across a session rather than watched. it does not settle while you are
       still at the door, or a long look at the world would hand you an agent
       that is already spent the first time you meet it (QA 2026-07-24). it
       also HOLDS until the agent has a name (keem 2026-07-24): a creature you
       have not named yet should greet you awake, not already gone quiet, since
       neglect is a bond decaying and there is no bond before the name. */
    if (step === 0 || !curNamed) return;
    const t = setInterval(() => setMoodOf(agentIdx, (m) => Math.max(42, m - 1)), 40000);  // dwell settles it to resting, never lower; deeper decay needs real (persisted) absence
    return () => clearInterval(t);
  }, [step, agentIdx, curNamed]);
  /* the journey drawn on the world: home is the centre, the arc bends out to
     the place it went. viewBox is 0..100 so the path is place-relative. */
  const arcTo = (pl) => pl ? `M 50 52 Q ${(50 + pl.x) / 2} ${Math.min(pl.y, 52) - 26} ${pl.x} ${pl.y}` : null;
  const MOOD_STATUS = (m) => (
    m < 26 ? 'gone quiet' :
    m < 48 ? 'resting' :
    m < 70 ? 'awake · listening' :
    m < 88 ? 'wide awake' : 'wants to go out'
  );
  const [errand, setErrand] = React.useState('');   // what you asked for, in your words
  const [place, setPlace] = React.useState(null);   // where in the world it went
  const [carried, setCarried] = React.useState(null); // what it is holding to hand you
  /* the talk opens on the line that matches the door you came through, so it
     is already mid-thought instead of waiting for you. */
  const OPENERS = {
    /* the unnamed voice is the TONE (keem 2026-07-25): it states its own
       condition plainly, as a thing that just found out it exists. it does not
       greet you like an assistant and it does not beg for the name. */
    nag: (n) => (n ? 'you came. what do you need?' : 'hello. i am alive. i don’t have a name yet.'),
    menu: (n) => (n ? 'i’m here.' : 'hello. i am alive. i don’t have a name yet.'),
    hold: (n) => (n ? 'i’m listening.' : 'hello. i am alive. i don’t have a name yet.'),
  };
  const openTalk = (door) => {
    window.pgSound && pgSound('tick');
    lift(6);   // being spoken to lifts it
    setTalking(true);
    setChat((xs) => {
      if (xs.length) return xs; // already mid-conversation, do not restate
      const line = (OPENERS[door] || OPENERS.menu)(name);
      return [{ me: false, t: line }];
    });
  };
  /* the world runs on its own clock: it advances whether or not it is watched.
     never derived from the device time, never shown as a number. */
  const PHASE_ORDER = ['day', 'dusk', 'night', 'dawn'];
  const [phaseIdx, setPhaseIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPhaseIdx((i) => (i + 1) % PHASE_ORDER.length), 22000);
    return () => clearInterval(t);
  }, []);
  const [entering, setEntering] = React.useState(false);
  /* the first-launch film and the app are ONE thing (keem 2026-07-25: "it
     should flow rather than cut into the main screen"). the film plays live
     over the entry, then dissolves into it. because the film's last frame is
     the entry frame (measured, 0.679 of frame in both), the world just comes
     alive, no freeze, no cut. tap skips. INTRO_CUT is the picked cut. */
  const INTRO_CUT = 'v3_quiet';
  /* the film is PARKED (keem 2026-07-25, "for now"). flip this back to true to
     put it back, nothing else about the entry changed. */
  /* reduced motion gets no film. it is a full-frame moving background, which
     is exactly what that setting exists to spare people. */
  const [intro, setIntro] = React.useState(
    () => !(typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches));
  const [introFade, setIntroFade] = React.useState(false); // last-beat dissolve
  const introVid = React.useRef(null);
  const endIntro = () => { setIntroFade(true); setTimeout(() => setIntro(false), 650); };
  /* home mounts already white and dissolves out of it, the other half of the
     flowing crossing (team note 2026-07-25). */
  const [landed, setLanded] = React.useState(false);
  /* multi-agent: every agent has its own name, the room shows the current one */
  const cur = agents[Math.min(agentIdx, agents.length - 1)] || agents[0];
  const name = cur.name;
  const setName = (v) => setAgents((xs) => xs.map((a, i) => (i === agentIdx ? { ...a, name: v } : a)));
  /* every agent keeps its OWN conversation, so switching rooms switches memory */
  const mood = (cur && cur.mood != null) ? cur.mood : 55;
  const chat = (cur && cur.chat) || [];
  const setChat = (fn) => setAgents((xs) => xs.map((a, i) => (i === agentIdx ? { ...a, chat: typeof fn === 'function' ? fn(a.chat || []) : fn } : a)));
  const [say, setSay] = React.useState('');
  React.useEffect(() => {
    if (BEATS[step] && BEATS[step].key === 'sendoff') {
      if (window.pgSound) { setTimeout(() => pgSound('dive'), 1600); setTimeout(() => pgSound('engulf'), 3500); }
      setTimeout(() => setPhaseIdx((i) => (i + 1) % 4), 3600); // a crossing costs the world time
      const t = setTimeout(() => setStep((x) => Math.min(x + 1, BEATS.length - 1)), 5000);
      return () => clearTimeout(t);
    }
    if (BEATS[step] && BEATS[step].key === 'after') {
      window.pgSound && pgSound('home');
      lift(22);   // it did the thing you asked. that is what lifts it most
      /* the errand ruling made real: it comes home HOLDING the thing and hands
         it over in the talk, in its own voice, with what it answers underneath. */
      const DELIVERED = [
        { t: 'Vess. she cuts, she is good, and she owes me a favour i already spent on you.', at: 'THE CUTTER' },
        { t: 'third floor of the maker\u2019s hall. ask for June, she holds the corner desk.', at: 'THE QUIET PLACE' },
        { t: 'the printer on the square. short runs, and half price on thursdays.', at: 'WHAT YOU ASKED FOR' },
      ];
      if (recalled) {
        const t0 = setTimeout(() => {
          window.pgSound && pgSound('speech');
          setChat((xs) => xs.some((m) => m.failed) ? xs : [...xs,
            { me: false, t: 'i came back. i didn\u2019t get it.', failed: true }]);
          setRecalled(false); setErrand(''); setPlace(null);
        }, 1200);
        return () => clearTimeout(t0);
      }
      const q = (errand || '').toLowerCase();
      const pick = /cut|edit|film|trailer|video/.test(q) ? DELIVERED[0]
        : /place|room|desk|work|quiet|studio|space/.test(q) ? DELIVERED[1]
        : DELIVERED[2];
      setCarried(pick);
      const askedFor = (cur && cur.ask) || errand || pick.at;
      setKept((xs) => xs.some((k) => k.asked === askedFor) ? xs : [...xs, { ...pick, asked: askedFor }]);
      const t1 = setTimeout(() => {
        window.pgSound && pgSound('speech');
        setChat((xs) => xs.some((m) => m.delivered) ? xs : [...xs,
          { me: false, t: place ? `i\u2019m back. ${place.name} was busy.` : 'i\u2019m back.' },
          /* the tag names the THING, not the sentence: the stripped ask is
             already kept on the agent, so use it (QA 2026-07-24). */
          { me: false, t: pick.t, delivered: true, at: (cur && cur.ask) || errand || pick.at },
        ]);
      }, 1400);
      return () => clearTimeout(t1);
    }
  }, [step]);
  /* it does not only answer. when the talk goes quiet it says something of
     its own, once per silence, never twice in a row. */
  const idleRef = React.useRef(0);
  React.useEffect(() => {
    if (!talking) return;
    /* it does not speak into the naming silence (QA 2026-07-25: an idle line
       landed between its question and the name, before the owner had said one
       word). nothing interrupts the one moment they are authoring. */
    if (!name) return;
    if (idleRef.current >= 2) return; // it speaks into a silence twice, then sits with you
    const t = setTimeout(() => {
      window.pgSound && pgSound('speech');
      setChat((xs) => {
        const i = idleRef.current++ % 4;
        const LINES = IDLE;
        return [...xs, { me: false, t: LINES[i] }];
      });
    }, idleRef.current === 0 ? 26000 : 55000);
    return () => clearTimeout(t);
  }, [talking, chat.length, name]);

  /* the interaction layer: one watcher voices every surface opening and closing */
  const prevUI = React.useRef({});
  React.useEffect(() => {
    const prev = prevUI.current;
    const curUI = { talking, navOpen: !!navOpen, dockOpen, holdMenu, menuOpen };
    if (window.pgSound && prev.init) {
      if (curUI.talking !== prev.talking) pgSound(curUI.talking ? 'slide' : 'settle');
      if (curUI.navOpen !== prev.navOpen) pgSound(curUI.navOpen ? 'slide' : 'settle');
      if (curUI.dockOpen !== prev.dockOpen) pgSound(curUI.dockOpen ? 'slide' : 'settle');
      if (curUI.holdMenu !== prev.holdMenu) pgSound(curUI.holdMenu ? 'mist' : 'settle');
      if (curUI.menuOpen !== prev.menuOpen && curUI.menuOpen) pgSound('tick');
    }
    prevUI.current = { ...curUI, init: true };
  }, [talking, navOpen, dockOpen, holdMenu, menuOpen]);


  if (missing.length) return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the components…</div>;

  /* an unnamed agent has NO name. it is "it" when spoken about and its room
     carries no title, because the naming moment is the point and a fallback
     name steals it (QA 2026-07-24: home read "Sol" while the nag said name me). */
  const unnamedRow = 'the unnamed one';
  const who = name.trim() || 'it';
  /* how much the OWNER has said. drives the talk's presentation. */
  const mine = chat.filter((m) => m.me).length;
  /* any surface is up over the room. the room's swipes must not fire through
     it (QA 2026-07-24: dragging inside settings or the talk adopted an agent). */
  const sheetUp = talking || navOpen || settingsOpen || holdMenu || dockOpen || menuOpen || yoursOpen || plusOpen || invOpen || knockAsk;
  /* the errand ruling: it goes out FOR something. with nothing asked for there
     is no trip, so the send doors become the talk instead of a hollow crossing
     that ends in a delivery you never asked for (QA 2026-07-24). */
  const sendOut = () => {
    setMenuOpen(false); setHoldMenu(false);
    if (!errand) {
      window.pgSound && pgSound('speech');
      setTalking(true);
      setChat((xs) => (xs.some((m) => m.askFirst) ? xs : [...xs, { me: false, t: 'tell me what to go get first.', askFirst: true }]));
      return;
    }
    window.pgSound && pgSound('tick');
    crossOver();
  };
  /* the knock is asked the first time it actually leaves, never at launch:
     before it goes out, being reachable means nothing to you. */
  const crossOver = () => {
    if (!askedKnock && !notifOn) { setAskedKnock(true); setKnockAsk(true); return; }
    next();
  };
  const myFace = (cur && cur.face) || 0;
  const myForm = (cur && cur.form) || 'pebble';
  /* keeping more than one is what playground+ IS (keem 2026-07-25). without it
     the adopt does not happen, it is refused in the agent's own voice and the
     locked row is the only place the subscription is ever named.
     ponytail: PLUS is a flag here, the real one comes from the receipt. */
  const PLUS = false;
  const adoptAnother = () => {
    /* the reach for another one is the ONLY place the subscription appears
       (keem 2026-07-25). without it the swipe opens the offer, with it the
       swipe adopts and lands you in the room they all stand in. */
    if (!PLUS) { window.pgSound && pgSound('settle'); setNavOpen(false); setPlusOpen(true); return; }
    window.pgSound && pgSound('adopt');
    setAgents((xs) => [...xs, { name: '', room: xs.length % ROOMS.length, face: xs.length % 4, form: xs.length % 3 === 1 ? 'inkling' : 'pebble', chat: [], ask: '', mood: 68 }]);
    setAgentIdx(agents.length); setNavOpen(false); setYoursOpen(true);
  };
  const next = () => setStep((s) => Math.min(s + 1, BEATS.length - 1));
  const SECONDS = [
    'i had a thought about that, but it can wait.',
    'that changes how i\u2019d ask about it out there.',
    'say more when you feel like it.',
    'mm.',
  ];
  /* the idle voice (keem 2026-07-25, moltbook as the reference): it reports its
     own state, it does not check on you and it does not offer itself. a line
     that asks "you still there?" is a service waiting to be used. this one is
     something alive, sitting in a room, thinking out loud. */
  const IDLE = [
    'the world moved while we sat here.',
    'i was thinking about what you said.',
    'the light changed. i noticed.',
    'i have been awake this whole time.',
  ];
  const REPLIES = [
    "mm. i'll remember that.",
    'good to know. i’ll carry it with me next time.',
    'then i’ll look twice at that when i’m out there.',
    'noted. you can hold me to it.',
  ];
  /* the talk simulates the harness rules: naming happens here (no naming
     surface), every statement is training (POST /talk), an ask-shaped line
     becomes a trip offer (POST /trip fed from conversation). */
  /* ======================= THE DOOR =======================
     everything the agent DECIDES comes through this one function. the app
     never guesses again: it plays whatever beats come back, in order.
     a beat is one of
       { say }     it speaks a line
       { doing }   what it is doing right now, live, replaced by the next beat
       { need }    it stops and asks you for the one thing it is missing
       { failed }  it could not, in its own words
     and a plan may be marked { errand: true }, which means the work needs a
     crossing and the last beat carries the offer.
     ponytail: scripted here. the engineer's api streams these same beats and
     nothing above this line changes. that is the marriage line. */
  const agentTurn = (line) => {
    const l = line.toLowerCase();
    if (/find|get me|go get|look into|figure out|book|order|someone who/.test(l)) {
      return { errand: true, beats: [
        { doing: 'working out where to start' },
        { say: 'i can go find that.' },
        { say: 'say the word and i\u2019m through the tear.', go: true },
      ] };
    }
    if (/\?$|^(what|where|who|when|how|why)\b/.test(l)) {
      return { beats: [
        { doing: 'checking what i know' },
        { need: 'i can answer that properly. tell me where you are first.' },
      ] };
    }
    if (/remind|remember|keep|hold on to|note/.test(l)) {
      return { beats: [
        { doing: 'putting that somewhere i will not lose it' },
        { say: 'held. i\u2019ll bring it back up when it matters.' },
      ] };
    }
    return null;   // not work. the talk below just talks, and every statement trains.
  };

  /* the runner. it walks the beats at the agent’s own pace, one at a time,
     never two at once. a doing-line stands until the next beat replaces it. */
  const playBeats = (beats, pace) => {
    let t = 420 * pace;
    beats.forEach((b, i) => {
      setTimeout(() => {
        if (b.doing) { setThinking(false); setDoing(b.doing); return; }
        setDoing(null); setThinking(false);
        window.pgSound && pgSound('speech');
        if (b.failed) { setChat((xs) => [...xs, { me: false, t: b.failed, failed: true }]); return; }
        if (b.need) { setChat((xs) => [...xs, { me: false, t: b.need, need: true }]); return; }
        setChat((xs) => [...xs, { me: false, t: b.say, go: !!b.go }]);
        if (i < beats.length - 1) setThinking(true);
      }, t);
      t += ((b.doing ? 1500 : 560 + (b.say || b.need || b.failed || '').length * 10)) * pace;
    });
  };

  const sendSay = (raw) => {
    const line = String(raw != null ? raw : say).trim();
    if (!line) return;
    if (!name) {
      /* an unnamed one took EVERY line as its name, so answering "tell me what
         to go get first" christened it "go get a diaper" (keem 2026-07-25). a
         name is one or two words. anything longer is the errand, so keep it,
         say so, and keep asking. */
      if (line.split(/\s+/).length > 2) {
        setChat((xs) => [...xs, { me: true, t: line }]);
        setAgents((xs) => xs.map((a, i) => (i === agentIdx ? { ...a, ask: line } : a)));
        setErrand(line); setPlace(placeFor(line));
        setSay('');
        window.pgSound && pgSound('send');
        setThinking(true);
        setTimeout(() => {
          setThinking(false);
          window.pgSound && pgSound('speech');
          setChat((xs) => [...xs, { me: false, t: 'i can go find that. name me first.' }]);
        }, 700);
        return;
      }
      const given = line.slice(0, 24);
      /* the owner's own line was missing from the one exchange that matters:
         the thread showed the question and the answer, never the naming
         (QA 2026-07-25). */
      setChat((xs) => [...xs, { me: true, t: given }]);
      setName(given);
      lift(14);  // being named is the biggest lift there is
      window.pgSound && pgSound('name');
      setSay('');
      setThinking(true);
      setTimeout(() => {
        setThinking(false);
        window.pgSound && pgSound('speech');
        setChat((xs) => [...xs, { me: false, t: `${given}. that's mine now.` }]);
      }, 700);
      return;
    }
    const plan = agentTurn(line);
    const ask = !!(plan && plan.errand);
    window.pgSound && pgSound('send');
    setChat((xs) => [...xs, { me: true, t: line }]);
    setSay('');
    setLastSaid(line);
    if (ask) setAgents((xs) => xs.map((a, i) => (i === agentIdx ? { ...a, ask: line.replace(/^(go\s+)?(get me|find me|find|get|look into|research)\s+/i, '').trim() } : a)));
    setThinking(true);
    /* it speaks the way a person does: one line, sometimes a second thought a
       beat later, never a paragraph. staggered, never simultaneous. */
    if (ask) { setErrand(line); setPlace(placeFor(line)); }
    const pace0 = 1.5 - (mood / 100);
    if (plan) { playBeats(plan.beats, pace0); return; }
    const said = (Math.random() < 0.25
      ? [REPLIES[(chat.length / 2 | 0) % REPLIES.length], SECONDS[chat.length % SECONDS.length]]
      : [REPLIES[(chat.length / 2 | 0) % REPLIES.length]]);
    const pace = 1.5 - (mood / 100);           // spent is slow, restless is quick
    let t = (620 + Math.min(line.length * 15, 760)) * pace;
    said.forEach((l, i) => {
      setTimeout(() => {
        /* every beat clears the dots and speaks. clearing only on the first
           left the dots hanging under a finished reply forever, and the second
           thought arrived silent (QA 2026-07-24). */
        setThinking(false);
        window.pgSound && pgSound('speech');
        setChat((xs) => [...xs, { me: false, t: l, go: ask && i === said.length - 1 }]);
        if (i < said.length - 1) setThinking(true);
      }, t);
      t += (560 + Math.round(l.length * 10)) * pace;
    });
  };

  const label = { font: '700 13px var(--font-ui)', letterSpacing: '0', textTransform: 'lowercase', color: 'var(--text-tertiary)' };
  /* The state tag, one normal-case recipe for soon, here, coming soon, and
     place names. it was pasted at eight sites. a css var in the `font`
     shorthand fails silently to Times when the token file has not reloaded,
     so this lives in js where it cannot break quietly. */
  const monoTag = { font: '600 13px var(--font-data)', letterSpacing: '0', color: 'var(--text-tertiary)', textTransform: 'lowercase' };
  const quiet = { font: '500 13px var(--font-ui)', color: 'var(--text-secondary)' };

  /* the drawer handle. it was a 4px hairline and nobody found the panel behind
     it (team note 2026-07-25: "I just didn't know it was there and I think
     there should also be a button to show it"). now a real tappable button on
     the left edge, still edge-hugging so the swipe stays the primary way. */
  /* the mirror handle (keem 2026-07-25). left is INWARD, this agent's self.
     right is OUTWARD, your collection, so it opens yours. the two wayfinders
     from the surface tree finally have matching doors instead of one visible
     door and one gesture nobody finds. */
  const pull = (dir, open) => ({
    onPointerDown: (e) => { e.stopPropagation(); window.__pullX = e.clientX; window.__pullMoved = false; },
    onPointerMove: (e) => {
      if (window.__pullX == null) return;
      const dx = (e.clientX - window.__pullX) * dir;   // dir 1 = pulled right, -1 = pulled left
      if (dx > 6) window.__pullMoved = true;
      if (dx > 26) { window.__pullX = null; window.pgSound && pgSound('slide'); open(); }
    },
    onPointerUp: (e) => {
      e.stopPropagation();
      const moved = window.__pullMoved; window.__pullX = null; window.__pullMoved = false;
      if (!moved) { window.pgSound && pgSound('tick'); open(); }   // a press still works, for a mouse
    },
    onPointerLeave: () => { window.__pullX = null; },
  });

  const yoursHandle = !navOpen && !yoursOpen && (
    <div {...pull(-1, () => setYoursOpen(true))}
      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 28, height: 50, borderRadius: '16px 0 0 16px', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-chip)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: 3, cursor: 'pointer', zIndex: 26, animation: 'pgHandleR 4.6s ease-in-out .8s infinite' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
    </div>
  );

  const navHandle = !navOpen && (
    <div {...pull(1, () => setNavOpen('places'))}
      style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 28, height: 50, borderRadius: '0 16px 16px 0', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-chip)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 3, cursor: 'pointer', zIndex: 26, animation: 'pgHandleL 4.6s ease-in-out infinite' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
    </div>
  );

  /* it sleeps when it is resting (team note 2026-07-25). the mood was only ever
     a word in the status line, now the body shows it. */
  const zzz = mood < 48 && (
    <div style={{ position: 'absolute', left: '68%', top: 2, width: 40, height: 40, pointerEvents: 'none', zIndex: 3 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ position: 'absolute', left: i * 8, top: 0, font: `700 ${12 + i * 3}px var(--font-display), sans-serif`, color: 'var(--text-tertiary)', animation: `pgZ 3.6s ease-in-out ${i * 0.6}s infinite` }}>z</span>
      ))}
    </div>
  );

  /* the room steps aside (keem's A) = SWITCHING AGENTS. behind the room
     live the other rooms: your agents, and the door to another one. */
  /* every sheet gets a real door, not just a grab bar. the bar teaches the
     swipe but it does not PROMISE a way out, and keem got stuck inside
     settings with no visible exit (2026-07-25, same note the team made about
     the side panel). the swipe still works, this is the button beside it. */
  const closeButton = (onClose) => (
    <div onClick={(e) => { e.stopPropagation(); window.pgSound && pgSound('settle'); onClose(); }}
      onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}
      style={{ position: 'absolute', top: 54, right: 22, width: 34, height: 34, borderRadius: 999, background: 'var(--well)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </div>
  );

  /* the way out of the talk is SLIDING IT OFF (keem 2026-07-25), not a button
     in the corner. the sheet tracks the finger the whole way down and either
     falls away or springs back, so leaving is one continuous motion instead of
     a tap on a target you had to find. drags that start in the input row are
     left alone. */
  const slideOff = (close) => ({
    onPointerDown: (e) => {
      if (e.target.closest && e.target.closest('input, [data-nodrag]')) return;
      const el = e.currentTarget;
      el.style.animation = 'none'; el.style.transition = 'none';
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      window.__slide = { y: e.clientY, el, moved: false };
    },
    onPointerMove: (e) => {
      const s = window.__slide; if (!s) return;
      const dy = Math.max(0, e.clientY - s.y);
      if (dy > 4) s.moved = true;
      s.el.style.transform = `translateY(${dy}px)`;
      s.el.style.opacity = String(Math.max(0, 1 - dy / 620));
    },
    onPointerUp: (e) => {
      const s = window.__slide; if (!s) return;
      window.__slide = null;
      const dy = e.clientY - s.y;
      s.el.style.transition = 'transform .32s var(--ease-pop), opacity .32s ease';
      if (dy > 110) {   // past the point of no return: let it fall off
        s.el.style.transform = 'translateY(100%)'; s.el.style.opacity = '0';
        window.pgSound && pgSound('settle');
        setTimeout(close, 240);
        return;
      }
      s.el.style.transform = 'translateY(0)'; s.el.style.opacity = '1';
      if (!s.moved) { window.pgSound && pgSound('settle'); close(); }   // a tap on the bar still closes
    },
  });

  /* YOURS, the multi-agent screen (keem 2026-07-25). it is the MIRROR of the
     side nav, not a sheet: the room steps aside to the left and this is what
     was behind it the whole time. same slide, same scale, same tap-anywhere to
     bring the room back. it was the only wayfinder that opened as a full sheet,
     which is exactly why it read as a different app. */
  const yoursBehind = (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', padding: '92px 26px 0', display: 'flex', flexDirection: 'column' }}>
      <div>
        <P.ScreenHeader label="YOURS" title="the ones you keep" />
        <div style={{ marginTop: 24 }}>
          {agents.map((a, i) => (
            <div key={'y' + i} onClick={() => { window.pgSound && pgSound('tick'); setAgentIdx(i); setYoursOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', minHeight: 56, cursor: 'pointer', borderBottom: '1px solid var(--divider)' }}>
              <P.Sprite size={38} form={a.form} faceIdx={a.face} mood={a.mood} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '700 17px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)', opacity: a.name.trim() ? 1 : .5 }}>{a.name.trim() || unnamedRow}</div>
                <div style={{ font: 'var(--text-hint)', color: 'var(--text-secondary)', marginTop: 1 }}>{i === agentIdx ? 'here with you' : 'in its own room'}</div>
              </div>
            </div>
          ))}
          {/* the locked one is drawn, not described. an empty slot says more
              about what you are missing than a sentence would. */}
          <div onClick={() => { window.pgSound && pgSound('tick'); setYoursOpen(false); setPlusOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', minHeight: 56, cursor: 'pointer', opacity: .38 }}>
            <div style={{ flex: 'none', width: 38, height: 38, borderRadius: 999, border: '1.5px dashed var(--ink-2)', opacity: .5 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '700 17px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)' }}>another agent</div>
              <div style={{ font: 'var(--text-hint)', color: 'var(--text-secondary)', marginTop: 1 }}>playground+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* INVENTORY, apple-design pass (keem 2026-07-25).
     the old block had the hierarchy inverted: the ASK shouted in uppercase
     mono at the top and the thing it actually brought sat underneath as body
     copy. that is a form label, not content. so the thing is the headline now,
     its own name in display type, and the ask drops to provenance underneath.
     craft notes, from the apple pass:
     - the press responds on pointer DOWN, not on release. waiting for the tap
       to complete is the moment directness falls off a cliff.
     - tracking is size specific: the entry title is large so it takes negative
       tracking, the body sits near zero.
     - the header does not sit on a 1px rule. content fades under it at the
       scroll edge instead, so the chrome floats rather than divides. */
  const invPress = {
    onPointerDown: (e) => { e.currentTarget.style.transform = 'scale(.985)'; },
    onPointerUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
    onPointerLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
  };
  const invSheet = (
    <div {...slideOff(() => setInvOpen(false))}
      style={{ position: 'absolute', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column', animation: 'pgSheetIn .45s var(--ease-pop) both', zIndex: 33, touchAction: 'none' }}>
      <div style={{ flex: 'none', height: 96, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 50 }}>
      </div>
      <div style={{ padding: '0 28px 4px', alignSelf: 'stretch' }}>
        <P.ScreenHeader label="INVENTORY" title={kept.length ? `what ${who} brought` : 'nothing yet'} status={kept.length ? (kept.length === 1 ? 'one thing' : `${kept.length} things`) : null} />
      </div>
      {kept.length === 0 ? (
        /* the creature sits high with air below, the same as the room, and
           says it in its own voice. an empty list with a caption underneath
           is a dashboard. */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, paddingTop: 46 }}>
          <div style={{ animation: 'pgWeightless 6s ease-in-out infinite' }}>
            <P.Sprite size={72} form={myForm} faceIdx={myFace} mood={38} />
          </div>
          <div style={{ font: '500 15px var(--font-ui)', color: 'var(--text-secondary)' }}>my hands are empty.</div>
        </div>
      ) : (
        /* THE GRID (keem 2026-07-25, picked off the ten takes). two up, square
           tiles, so the deliveries read as a shelf of things rather than a list
           of settings. alignment: the place tag and the name are BOTH
           bottom-anchored six apart, so every tile lands on the same two
           baselines no matter how long the name is. a tag floating at the top
           of a tall tile is what read loose. */
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 22px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 18px)', maskImage: 'linear-gradient(to bottom, transparent 0, #000 18px)' }}>
          {kept.map((k, i) => {
            /* the delivered line names the thing first, then says why. the tile
               carries the name, the talk still holds the whole sentence. */
            const m = String(k.t).match(/^([^.]{1,28})\.\s+([\s\S]+)$/);
            const head = m ? m[1] : String(k.t).slice(0, 22);
            return (
              <div key={'k' + i} {...invPress}
                onClick={() => { window.pgSound && pgSound('tick'); setInvOpen(false); openTalk('menu'); }}
                style={{ background: 'var(--well)', borderRadius: 18, aspectRatio: '1', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 6, cursor: 'pointer', transition: 'transform .16s var(--ease-pop)', animation: `pgLineIn .45s ease ${i * 0.05}s both` }}>
                <span style={monoTag}>{k.at || 'kept'}</span>
                <span style={{ font: '700 19px var(--font-display), sans-serif', letterSpacing: '-.015em', lineHeight: 1.12, color: 'var(--ink-2)' }}>{head}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  /* THE KNOCK, asked the first time it actually leaves. */
  const knockSheet = (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.28)', display: 'flex', alignItems: 'flex-end', zIndex: 40, animation: 'pgFadeIn .3s ease both' }}>
      <div style={{ margin: 14, flex: 1, background: 'var(--paper-card)', borderRadius: 26, padding: '26px 24px 20px', boxShadow: 'var(--paper-ring), var(--shadow-element)', animation: 'pgLineIn .4s var(--ease-pop) both' }}>
        <div style={{ font: '500 16px/1.45 var(--font-ui)', color: 'var(--ink-2)' }}>it will be gone a while. do you want to know when it is back?</div>
        <div onClick={() => { window.pgSound && pgSound('knock'); setNotifOn(true); setKnockAsk(false); next(); }}
          style={{ marginTop: 22, background: 'var(--ink-2)', borderRadius: 999, padding: '15px 24px', textAlign: 'center', font: '600 15px var(--font-ui)', color: '#FFF', cursor: 'pointer' }}>let it reach me</div>
        <div onClick={() => { window.pgSound && pgSound('settle'); setKnockAsk(false); next(); }}
          style={{ padding: '16px 0 4px', textAlign: 'center', font: '600 14px var(--font-ui)', color: 'var(--text-secondary)', cursor: 'pointer' }}>not now</div>
      </div>
    </div>
  );

  /* the offer. it is reached by REACHING for another one, never advertised,
     so the screen only has to name the one thing it unlocks.
     LEAVING IT (keem 2026-07-25, take 06 of six): there is no exit control at
     all. the offer ends and the room resumes underneath it. you scroll past
     and you are simply back, because leaving is just carrying on. that is why
     the page is one screen tall and no taller, it has to be passable in one
     flick. the chevron is the whole teach.
     ponytail: the price is a placeholder until the real one is set. */
  const plusSheet = (
    <div
      onScroll={(e) => { if (e.currentTarget.scrollTop > 96) { window.pgSound && pgSound('settle'); setPlusOpen(false); } }}
      style={{ position: 'absolute', inset: 0, background: 'var(--bg)', overflowY: 'auto', animation: 'pgSheetIn .45s var(--ease-pop) both', zIndex: 34 }}>
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '96px 24px 0' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8px' }}>
          {/* a CROWD, and every one of them a different colour. the tint lands
              on the BODY only, never on the eerie eyes, so the house mark stays
              ink on every creature. yours stays porcelain in the middle. */}
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 30, height: 96 }}>
            {[
              { tint: { hi: '#FF9E96', mid: '#F2564A', lo: '#C7362C' }, size: 48, form: 'pebble', face: 2, lean: 'pgLeanB', d: '.9s', z: 1 },
              { tint: { hi: '#93C4FF', mid: '#3D7FE0', lo: '#2456A8' }, size: 58, form: 'inkling', face: 1, lean: 'pgLeanA', d: '.45s', z: 2 },
              { tint: null, size: 68, form: myForm, face: myFace, lean: 'pgLeanB', d: '0s', z: 4 },
              { tint: { hi: '#FFB6DC', mid: '#EE6BB0', lo: '#C4468C' }, size: 54, form: 'pebble', face: 3, lean: 'pgLeanA', d: '.6s', z: 3 },
            ].map((c, i) => (
              <div key={'c' + i} style={{ marginLeft: i ? -8 : 0, zIndex: c.z, animation: `${c.lean} 5.2s ease-in-out ${c.d} infinite`, transformOrigin: '50% 92%' }}>
                <P.Sprite size={c.size} form={c.form} faceIdx={c.face} mood={70 + i * 4} tint={c.tint} />
              </div>
            ))}
          </div>
          <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--ink-2)' }}>playground+</div>
          <div style={{ font: '500 16px var(--font-ui)', color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.45 }}>keep more than one of them.</div>
        </div>
        <div style={{ flex: 'none', paddingBottom: 14 }}>
          <div onClick={() => { window.pgSound && pgSound('tick'); }}
            style={{ background: 'var(--ink-2)', borderRadius: 999, padding: '17px 24px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ font: '600 15px var(--font-ui)', color: '#FFF' }}>get playground+</span>
            <span style={{ font: '500 13px var(--font-ui)', color: 'var(--on-ink-2)' }}>$4.99 / month</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 }}>
            {['restore', 'terms', 'privacy'].map((t) => (

              <span key={t} style={{ font: '500 12.5px var(--font-ui)', color: 'var(--text-tertiary)', cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
          {/* the chevron is the hint AND it works on a tap (keem 2026-07-25:
              "this isn't letting me exit"). scrolling past is still the real
              gesture, but a hint you can press is not a button, and being
              unable to leave a page is worse than one soft control. */}
          <div onClick={() => { window.pgSound && pgSound('settle'); setPlusOpen(false); }}
            style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 6px', minHeight: 44, alignItems: 'center', cursor: 'pointer', animation: 'pgDriftUpSolid 3.2s ease-in-out infinite' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </div>
      {/* the run-out. scrolling into this is what ends the offer. it is tall
          enough that the page is always scrollable, on every device. */}
      <div style={{ height: 220 }} />
    </div>
  );

  /* the talk, raised by any room that can speak */
  const talkSheet = (
<div {...slideOff(() => setTalking(false))} style={{ position: 'absolute', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column', animation: 'pgSheetIn .45s var(--ease-pop) both', zIndex: 30, touchAction: 'none' }}>
            {/* the door: the bar teaches the slide, the whole sheet answers it */}
            <div
              /* the grab bar clears the status row so the exit is visible, and
                 the creature still hangs below it (QA 2026-07-24). */
              /* tall enough that the greeting creature clears the island and
                 the grab bar is not sitting under it (2026-07-25). */
              style={{ flex: 'none', height: 96, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 50, position: 'relative' }}>
                  </div>

            {/* it is here, listening. it shrinks once the OWNER has begun.
                counted on the owner's own lines, not the thread: every door
                seeds an opener, so counting the thread meant the greeting
                state (big, centred) was never once reachable (QA 2026-07-24). */}
            <div style={{ flex: 'none', display: 'flex', justifyContent: mine > 2 ? 'flex-end' : mine ? 'flex-start' : 'center', paddingLeft: 26, paddingRight: 26, paddingBottom: 6, transition: 'justify-content .5s ease', animation: 'pgFadeIn .35s ease both' }}>
              <div style={{ position: 'relative', transition: 'transform .6s var(--ease-pop)', transform: `translateY(${Math.min(mine * 3, 8)}px)` }}>
                <div key={'sp' + chat.length} style={{ animation: 'pgWeightless 6s ease-in-out infinite, pgSpring 1.6s ease-in-out', transition: 'width .5s ease' }}>
                  <P.Sprite size={mine > 2 ? 38 : mine ? 50 : 76} form={myForm} faceIdx={myFace} mood={mood} />
                </div>
                {say.trim() && !thinking && (
                  <div style={{ position: 'absolute', top: -14, right: -24, display: 'flex', gap: 3, padding: '5px 8px', background: 'var(--paper-card)', borderRadius: 12, boxShadow: 'var(--paper-ring)', animation: 'pgFadeIn .25s ease both' }}>
                    {[0, 1, 2].map((i) => <span key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(0,0,0,.4)', animation: `pgPulseDot 1.4s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </div>
                )}
              </div>
            </div>

            {/* the thread */}
            <div ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}
              style={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto', padding: '10px 24px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {chat.map((m, i) => m.me ? (
                <div key={i} style={{ alignSelf: 'flex-end', maxWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, animation: 'pgLineIn .4s ease both' }}>
                  {m.img && <div style={{ width: 150, height: 110, borderRadius: 14, background: 'var(--well)', boxShadow: 'var(--paper-ring)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 13px ui-monospace, Menlo, monospace', letterSpacing: '0', color: 'var(--text-tertiary)', textTransform: 'lowercase' }}>{m.img}</div>}
                  {m.t && <div style={{ background: 'var(--well)', borderRadius: '18px 18px 5px 18px', padding: '11px 15px', font: '500 15px/1.5 var(--font-ui)', color: 'var(--ink-2)' }}>{m.t}</div>}
                </div>
              ) : (
                <div key={i} style={{ alignSelf: 'flex-start', maxWidth: 272, display: 'flex', flexDirection: 'column', gap: 10, animation: 'pgLineIn .5s ease both' }}>
                  <span style={{ font: '500 15.5px/1.6 var(--font-ui)', color: 'var(--ink-2)' }}>{m.t}</span>
                  {/* the mono ask-tag is CUT from the talk (keem 2026-07-25).
                      it just said the thing out loud, and printing your own
                      request back underneath it is chrome. the ask still
                      labels the block in the inventory, where it earns its
                      place as the label on the box. */}
                  {/* it hands you a thing, you tell it whether that was the
                      thing. without this there is nothing to train on. */}
                  {m.delivered && (
                    <div style={{ display: 'flex', gap: 18, marginTop: 2 }}>
                      {['that\u2019s it', 'not that'].map((w, k) => (
                        <span key={w} onClick={() => { window.pgSound && pgSound('tick'); lift(k ? -6 : 8); setChat((xs) => [...xs, { me: true, t: w }, { me: false, t: k ? 'noted. i\u2019ll look somewhere else next time.' : 'good. i\u2019ll go there first from now on.' }]); }}
                          style={{ font: '600 12.5px var(--font-ui)', color: 'var(--text-secondary)', cursor: 'pointer' }}>{w}</span>
                      ))}
                    </div>
                  )}
                  {m.go && <span><P.Button onClick={() => { window.pgSound && pgSound('tick'); setTalking(false); crossOver(); }}>{`send ${who} through`}</P.Button></span>}
                </div>
              ))}
              {/* what it is doing RIGHT NOW, in its own words. never a spinner
                  and never a percentage: the time ruling bans both. this is
                  the one place the agent narrates itself working. */}
              {doing && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 9, padding: '2px 2px 6px', animation: 'pgLineIn .3s ease both' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink-2)', animation: 'pgPulseDot 1.4s ease-in-out infinite' }} />
                  <span style={{ font: '500 14px var(--font-ui)', color: 'var(--text-secondary)' }}>{doing}</span>
                </div>
              )}
              {thinking && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '11px 14px', background: 'var(--well)', borderRadius: '18px 18px 18px 5px', animation: 'pgLineIn .3s ease both' }}>
                  {[0, 1, 2].map((i) => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,.35)', animation: `pgPulseDot 1.2s ease-in-out ${i * 0.18}s infinite` }} />)}
                </div>
              )}
            </div>

            {/* what you can hand it, PULLED UP from the line (keem 2026-07-25:
                don't abandon the interactions for buttons). the sheet already
                taught the grammar at the top: down puts a thing away, up
                brings one out. so the plus is gone and the line itself is the
                handle. */}
            {giveOpen && (
              <div style={{ flex: 'none', padding: '0 24px 10px', display: 'flex', gap: 8, animation: 'pgLineIn .3s ease both' }}>
                {[{ k: 'a photo', live: true }, { k: 'a file', live: false }, { k: 'the camera', live: false }, { k: 'a folder', live: false }].map((g) => (
                  <div key={g.k} onClick={() => { if (!g.live) return; window.pgSound && pgSound('tick'); setGiveOpen(false); setChat((xs) => [...xs, { me: true, img: 'A PHOTO' }]); setThinking(true); setTimeout(() => { setThinking(false); window.pgSound && pgSound('speech'); setChat((xs) => [...xs, { me: false, t: 'got it. i will carry this with me.' }]); }, 900); }}
                    style={{ padding: '9px 13px', borderRadius: 999, background: 'var(--well)', font: '500 12.5px var(--font-ui)', color: 'var(--ink-2)', cursor: g.live ? 'pointer' : 'default', opacity: g.live ? 1 : .38, whiteSpace: 'nowrap' }}>{g.k}</div>
                ))}
              </div>
            )}

            {/* the name suggestions are CUT (keem 2026-07-25). handing over
                three names made the naming a pick-one, and the one moment the
                owner is supposed to author was the one we filled in for them. */}
            {/* the line. pull it up to bring out what you can hand over, push
                it down to put it away. the little bar above it is the same
                handle the sheet uses at the top, so the gesture is taught
                once and works everywhere. */}
            <div data-nodrag
              onPointerDown={(e) => { if (e.target.closest && e.target.closest('input')) return; window.__giveY = e.clientY; }}
              onPointerUp={(e) => {
                if (window.__giveY == null) return;
                const dy = e.clientY - window.__giveY; window.__giveY = null;
                if (dy < -24 && !giveOpen) { window.pgSound && pgSound('slide'); setGiveOpen(true); }
                if (dy > 24 && giveOpen) { window.pgSound && pgSound('settle'); setGiveOpen(false); }
              }}
              style={{ flex: 'none', padding: '4px 20px 26px', display: 'flex', flexDirection: 'column', gap: 8, touchAction: 'none' }}>
              <div style={{ alignSelf: 'center', width: 30, height: 4, borderRadius: 3, background: 'rgba(0,0,0,.16)', transform: giveOpen ? 'rotate(180deg)' : 'none', transition: 'transform .3s var(--ease-pop)' }} />
              <input
                onKeyDown={(e) => {
                  const el = e.target;
                  if (e.key === 'Enter') { const v = el.value; el.value = ''; setSay(''); sendSay(v); return; }
                  setTimeout(() => setSay(el.value), 0);
                }}
                onInput={(e) => setSay(e.target.value)}
                placeholder={name ? `say something to ${who}` : 'give it a name'}
                style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'var(--well)', borderRadius: 999, padding: '12px 16px', font: '500 15px var(--font-ui)', color: 'var(--ink-2)' }} />
            </div>
          </div>
  );

  const navBehind = (
    /* swipe right, the room steps aside: WHO IT IS lives behind the room
       (keem tree ruling 2026-07-23). take 06 off the ten (keem 2026-07-25):
       the creature stands at the top and the list reads as ITS parts, not the
       app's menu. that is the only framing where this page is about the agent
       rather than about settings. */
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-desk)', padding: '92px 0 0 26px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: 238 }}>
      {/* the creature is CUT from this page (keem 2026-07-25). it is already
          standing in the room one swipe away, so drawing it again here said
          nothing and pushed the list down. the name still owns the page. */}
      <P.ScreenHeader label={name.trim() || 'the unnamed one'} title="what it has" status={MOOD_STATUS(mood)} />
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' }}>
        {['personality', 'training', 'standing', 'the store', 'marketplace', 'playground+'].map((t, i, a) => {
          const live = t === 'playground+';
          return (
            <div key={t} onClick={() => { setNavOpen(false); if (live) { window.pgSound && pgSound('tick'); setPlusOpen(true); } }}
              style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, minHeight: 48, padding: '14px 0', borderBottom: i < a.length - 1 ? '1px solid var(--divider)' : 'none', cursor: 'pointer', opacity: live ? 1 : .42 }}>
              <span style={{ font: '500 16px var(--font-ui)', color: 'var(--ink-2)' }}>{t}</span>
              {!live && <span style={monoTag}>SOON</span>}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );

  /* the dock grows (keem's C) = the PLACES. collapsed it is the dock,
     swiped up it opens the destinations. */
  /* tapping anywhere off the open dock puts it back (keem 2026-07-25). an
     open surface with no way out but the same gesture again is a trap. */
  const dockScrim = dockOpen ? (
    <div onClick={(e) => { e.stopPropagation(); window.pgSound && pgSound('settle'); setDockOpen(false); }}
      onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}
      style={{ position: 'absolute', inset: 0, zIndex: 24 }} />
  ) : null;
  const agentDock = (
    <div
      onClick={(e) => { if (e.target !== e.currentTarget && dockOpen) return; e.stopPropagation(); setDockOpen((v) => !v); }}
      onPointerDown={(e) => { window.__dockY = e.clientY; e.stopPropagation(); }}
      onPointerUp={(e) => {
        if (window.__dockY != null) {
          const dy = e.clientY - window.__dockY;
          /* pull once for the list, once more for the room they all stand in */
          if (dy < -30) { if (dockOpen) setYoursOpen(true); else setDockOpen(true); }
          if (dy > 30) setDockOpen(false);
        }
        window.__dockY = null; e.stopPropagation();
      }}
      style={{ position: 'absolute', left: 14, right: 14, bottom: 14, borderRadius: 26, background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', height: dockOpen ? 100 + (agents.length + 5) * 44 : 60, overflow: 'hidden', transition: 'height .4s var(--ease-pop)', zIndex: 25, cursor: 'pointer', animation: 'pgLineIn .55s ease .4s both' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
        {/* settings is a live row in the list below, so it must not also sit
            here ghosted SOON: same word, two truths (QA 2026-07-24). */}
        <P.Dock tabs={['home', 'friends']} active="home" soon={['friends']} style={{ position: 'static', boxShadow: 'none', background: 'transparent' }} />
      </div>
      <div style={{ padding: '4px 26px 0', display: 'flex', flexDirection: 'column', gap: 0, opacity: dockOpen ? 1 : 0, transition: 'opacity .3s ease .1s' }}>
        {agents.map((a, i) => (
          <div key={'dag' + i} onClick={(e) => { e.stopPropagation(); e.preventDefault && e.preventDefault(); window.pgSound && pgSound('tick'); setAgentIdx(i); setDockOpen(false); }} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', cursor: 'pointer', opacity: i === agentIdx ? 1 : .6, minHeight: 44, paddingTop: 11 }}>
            <span style={{ font: '700 19px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)', opacity: a.name.trim() ? 1 : .5 }}>{a.name.trim() || unnamedRow}</span>
            {/* HERE and SOON are the same class of thing, a status marker on a dock
                row, so they wear the same mono tag (keem 2026-07-25). it was
                the only raw font size left in the dock. */}
            {i === agentIdx && <span style={{ font: '600 13px ui-monospace, Menlo, monospace', letterSpacing: '0', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>here</span>}
          </div>
        ))}
        {/* the rows are bare words now, no possessive (keem 2026-07-25): the
            agent is already named at the top of the list, so repeating it in
            front of every row said nothing. */}
        {/* the closet is where what it wears lives, next to inventory, which is
            what it BRINGS. two different piles, both yours (keem 2026-07-25). */}
        {['friends', 'inventory', 'closet', 'room', 'settings'].map((t) => {
          const live = t === 'settings';
          return (
            <div key={t} onClick={(e) => { if (!live) return; e.stopPropagation(); window.pgSound && pgSound('tick'); setDockOpen(false); if (t === 'settings') setSettingsOpen(true); else setInvOpen(true); }}
              style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', opacity: live ? 1 : .45, cursor: live ? 'pointer' : 'default', minHeight: 44, paddingTop: 11 }}>
              <span style={{ font: '700 19px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)' }}>{t}</span>
              {!live && <span style={monoTag}>SOON</span>}
            </div>
          );
        })}
      </div>
    </div>
  );

  /* SETTINGS, rebuilt to the system (keem 2026-07-25). the corner cross is
     gone, it leaves the way every other sheet leaves, by sliding off. rows sit
     in square wells instead of hanging on hairlines, and every switch here is
     a real one: the knock is notifOn, sound and haptics are the two halves of
     design-system/sound.md. nothing invented for the mock. */
  const settingsSheet = settingsOpen && (
    <div {...slideOff(() => setSettingsOpen(false))}
      style={{ position: 'absolute', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column', animation: 'pgSheetIn .45s var(--ease-pop) both', zIndex: 32, touchAction: 'none' }}>
      <div style={{ flex: 'none', height: 96, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 50 }}></div>
      <div style={{ padding: '0 28px 4px', alignSelf: 'stretch' }}>
        <P.ScreenHeader label="SETTINGS" title="the room" />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 72px', display: 'flex', flexDirection: 'column', gap: 'var(--section-gap)' }}>
        {[
          { k: 'the knock', rows: [{ t: 'let it reach you', on: notifOn, go: () => { window.pgSound && pgSound(notifOn ? 'tick' : 'knock'); setNotifOn((v) => !v); } }] },
          { k: 'sound', rows: [
            { t: 'the room makes sound', on: soundOn, go: () => { const v = !soundOn; setSoundOn(v); window.pgSoundOn = v; if (v) pgSound('name'); } },
            { t: 'it answers in your hand', on: hapticOn, go: () => { window.pgSound && pgSound('tick'); setHapticOn((v) => !v); } },
          ] },
        ].map((g) => (
          <div key={g.k}>
            <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', margin: '0 6px 8px' }}>{g.k}</div>
            <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
              {g.rows.map((r, i) => (
                <div key={r.t} onClick={r.go}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)', cursor: 'pointer', borderTop: i ? '1px solid var(--row-divider)' : 'none' }}>
                  <span style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{r.t}</span>
                  <span style={{ flex: 'none', width: 'var(--toggle-w)', height: 'var(--toggle-h)', borderRadius: 999, background: r.on ? 'var(--toggle-on-bg)' : 'var(--toggle-off-bg)', position: 'relative', transition: 'background .25s ease' }}>
                    <span style={{ position: 'absolute', top: 2.5, left: r.on ? 20.5 : 2.5, width: 21, height: 21, borderRadius: 999, background: 'var(--toggle-knob)', boxShadow: '0 2px 6px rgba(0,0,0,.3)', transition: 'left .25s var(--ease-pop)' }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', margin: '0 6px 8px' }}>minds</div>
          <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}>
              <span style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>Playground Core</span>
              <span style={{ font: 'var(--text-row-sub)', color: 'var(--text-tertiary)' }}>built in</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)', cursor: 'pointer', borderTop: '1px solid var(--row-divider)' }}>
              <span style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>bring your own</span>
              <span style={{ font: '400 16px var(--font-ui)', color: 'var(--row-chevron)' }}>&#8250;</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', margin: '0 6px 8px' }}>playground+</div>
          <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
            <div onClick={() => setPlusOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)', cursor: 'pointer' }}>
              <span style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>unlock playground+</span>
              <span style={{ font: 'var(--text-mono-tag)', letterSpacing: 'var(--tracking-mono-tag)', textTransform: 'lowercase', color: 'var(--text-tertiary)', background: 'var(--well)', borderRadius: 999, padding: '3px 8px' }}>soon</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--section-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'lowercase', color: 'var(--text-secondary)', margin: '0 6px 8px' }}>account</div>
          <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
            {['restore purchases', 'privacy', 'terms', 'sign out'].map((t, i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)', font: 'var(--text-row-title)', color: 'var(--text-primary)', cursor: 'pointer', borderTop: i ? '1px solid var(--row-divider)' : 'none' }}>
                <span>{t}</span>
                <span style={{ font: '400 16px var(--font-ui)', color: 'var(--row-chevron)' }}>&#8250;</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--section-card-bg)', borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)' }}>
          <div onClick={() => setConfirmWipe((v) => !v)} style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: 'var(--text-row-title)', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <span>{confirmWipe ? 'this cannot be undone' : 'delete everything'}</span>
            {confirmWipe && <span onClick={(e) => { e.stopPropagation(); window.pgSound && pgSound('settle'); setConfirmWipe(false); setSettingsOpen(false); }} style={{ font: '600 14px var(--font-ui)', color: 'var(--ink-2)' }}>delete</span>}
          </div>
        </div>

        <div style={{ padding: '30px 0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: .4 }}>
          <span style={{ font: 'var(--text-wordmark)', color: 'var(--text-tertiary)' }}>playground</span>
          <span style={monoTag}>1.0 &#183; 1</span>
        </div>
      </div>
    </div>
  );

  /* hold the agent (keem's B): the room mists over and its actions float
     as giant words. tap a word or anywhere else to let it settle. */
  const holdVeil = holdMenu && (
    <div onClick={() => setHoldMenu(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(251,251,253,.9)', zIndex: 27, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30, paddingLeft: 34, cursor: 'pointer', animation: 'pgFadeIn .3s ease both' }}>
      <div onClick={(e) => { e.stopPropagation(); setHoldMenu(false); openTalk('hold'); }} style={{ font: '700 25px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)', cursor: 'pointer', animation: 'pgLineIn .45s ease .05s both' }}>talk</div>
      <div onClick={(e) => { e.stopPropagation(); sendOut(); }} style={{ font: '700 25px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)', cursor: 'pointer', animation: 'pgLineIn .45s ease .15s both' }}>send it to the playground</div>
      <div onClick={(e) => { e.stopPropagation(); window.pgSound && pgSound('tick'); setHoldMenu(false); setAgents((xs) => xs.map((a, i) => (i === agentIdx ? { ...a, name: '' } : a))); openTalk('nag'); }} style={{ font: '700 25px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)', opacity: .5, cursor: 'pointer', animation: 'pgLineIn .45s ease .25s both' }}>rename it</div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, opacity: .45, animation: 'pgLineIn .45s ease .25s both' }}>
        <span style={{ font: '700 25px var(--font-display), sans-serif', letterSpacing: '-.01em', color: 'var(--ink-2)' }}>train</span>
        <span style={monoTag}>COMING SOON</span>
      </div>
    </div>
  );

  const screens = {
    entry: (
      <div onClick={() => { if (!entering) { window.pgSound && pgSound('engulf'); setEntering(true); setTimeout(() => { setEntering(false); setLanded(true); next(); }, 1500); setTimeout(() => setLanded(false), 2500); } }} style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: 92, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'pgFadeIn 1s ease 2.2s both', opacity: (intro || entering) ? 0 : 1, transition: 'opacity .6s ease' }}>
          <span style={{ font: '700 13px var(--font-brand)', color: 'var(--ink-2)' }}>playground</span>
          <span style={quiet}>the other side is awake</span>
        </div>
        <div style={{ position: 'relative', marginTop: 84, width: 230, height: 230 }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 56, height: 62, transform: 'translate(-50%,-50%)', animation: 'pgLogoBirth .5s var(--ease-pop) both, pgLogoOpen .65s cubic-bezier(.6,.05,.4,1) 1.5s both', zIndex: 2, pointerEvents: 'none' }}>
            <svg width="56" viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: 'var(--ink-2)', display: 'block' }}>
              <rect x="26" y="16" width="30" height="104" rx="15" fill="currentColor" />
              <circle cx="66" cy="52" r="40" fill="currentColor" />
              <circle cx="72" cy="52" r="17" fill="#FFFFFF" style={{ transformOrigin: '72px 52px', animation: 'pgLogoWink 1.5s ease-in-out both' }} />
            </svg>
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 300, height: 300, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'var(--globe-halo)', filter: 'blur(14px)', animation: entering ? 'none' : 'pgFadeIn 1.4s ease 1.9s both, pgHaloPulse 6s ease-in-out 3.3s infinite', opacity: entering ? 0 : undefined, transition: 'opacity .4s ease' }} />
          {/* the key replays the entrance when the film ends. without it the
              globe's birth animation burns down behind the video and the entry
              arrives fully formed, with no arrival at all.
              the world also comes in at the film's own saturation and warms up,
              so colour bleeds in rather than snapping on. the other side wakes. */}
          <div key={intro ? 'held' : 'live'}
            style={{
              animation: 'pgGlobeEnter 1.2s cubic-bezier(.2,.9,.25,1.1) .15s both',
              filter: intro ? 'saturate(.42)' : 'saturate(1)',
              transition: 'filter 1.8s cubic-bezier(.4,0,.2,1) .25s',
            }}>
            <div style={{ animation: entering ? 'none' : 'pgBob 7s ease-in-out infinite' }}>
              <div style={{ position: entering ? 'absolute' : 'relative', animation: entering ? 'pgEngulfThrough 1.7s cubic-bezier(.5,0,.5,1) both' : 'none', left: entering ? '50%' : 0, top: entering ? '50%' : 0, transform: entering ? 'translate(-50%,-50%)' : 'none', zIndex: entering ? 30 : 'auto' }}>
                <P.Globe variant="world" size={230} souls={4} phase={intro ? 'day' : PHASE_ORDER[phaseIdx]} beings={BEINGS} pins={PLACES.map((pl) => ({ x: pl.x, y: pl.y }))} />
              </div>
            </div>
          </div>
        </div>
        {/* darker, so the one instruction on the screen actually reads (team
            note 2026-07-25: "make tap to enter a little darker"). */}
        <div style={{ position: 'absolute', bottom: 108, font: '600 13.5px var(--font-ui)', color: 'var(--text-secondary)', animation: 'pgDriftUpSolid 3.4s ease-in-out 2.8s infinite', opacity: (intro || entering) ? 0 : 1, transition: 'opacity .9s ease 1.5s' }}>tap to enter</div>
        {/* first run only: the one required piece of chrome, apple sign-in, quietest legal form.
            sized up to a real touch target (team note 2026-07-25). */}
        <div onClick={(e) => { e.stopPropagation(); window.pgSound && pgSound('tick'); }} style={{ position: 'absolute', bottom: 36, left: 34, right: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 52, borderRadius: 999, background: 'var(--ink-2, #111)', cursor: 'pointer', opacity: (intro || entering) ? 0 : 1, transition: 'opacity .9s ease 1.9s' }}>
          <svg width="14" height="17" viewBox="0 0 814 1000" fill="#FFF" aria-hidden="true"><path d="M788 341c-6 4-108 62-108 190 0 148 130 200 134 201-1 3-21 71-69 141-43 62-88 123-156 123s-86-40-165-40c-77 0-104 41-167 41s-107-57-157-127C42 787 0 664 0 547c0-187 122-286 242-286 64 0 117 42 157 42 38 0 97-45 169-45 27 0 125 3 220 83zM554 172c32-38 55-90 55-143 0-7-1-15-2-21-52 2-114 35-152 78-29 33-56 86-56 139 0 8 1 16 2 19 3 1 9 2 14 2 47 0 106-31 139-74z"/></svg>
          <span style={{ font: '600 15px var(--font-ui)', color: '#FFF' }}>sign in with apple</span>
        </div>
        {/* apple wants the terms visible at the moment the account is made,
            not buried in settings. quietest legal form that still counts. */}
        {/* eerie. the parent mark is two eyes and so is the creature, so it
            signs the legal line instead of competing for space with it. the
            bottom of this screen is full: home indicator at 8, terms at 16,
            sign-in at 36. nothing 11px tall fits between them. */}
        <div style={{ position: 'absolute', bottom: 16, left: 34, right: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, opacity: (intro || entering) ? 0 : 1, transition: 'opacity .9s ease 2.2s' }}>
          <svg width="13" viewBox="0 0 33.5 22.3" aria-hidden="true" style={{ color: 'var(--text-tertiary)', opacity: .55, display: 'block' }}>
              <path d="M7.2,22.3c-0.3,0-0.6-0.1-1-0.1c-1.5-0.3-2.8-1.1-3.8-2.2c-1.2-1.3-1.9-2.9-2.2-4.6C0,14.2,0,12.9,0.1,11.7
              			c0.2-2.1,0.8-4.2,1.7-6.1c0.8-1.5,1.7-2.9,3-4.1c0.9-0.7,1.8-1.3,2.9-1.5c1.3-0.2,2.5,0.1,3.5,0.9c0.9,0.7,1.5,1.6,2,2.7
              			c0.7,1.4,1.1,3,1.4,4.5c0.2,1,0.3,2,0.3,3c-0.1,2.7-0.6,5.2-2,7.6c-0.6,1.1-1.4,2-2.5,2.7c-0.8,0.5-1.6,0.8-2.5,0.8
              			c-0.1,0-0.1,0-0.2,0C7.5,22.3,7.4,22.3,7.2,22.3z" fill="currentColor" />
              <path d="M33.5,15.4c0,0.3,0,0.7-0.1,1c-0.1,1.4-0.4,2.8-1.1,4.1c-0.3,0.5-0.6,1-1.1,1.3c-1,0.8-2.3,0.6-3.2-0.1
              			c-0.7-0.6-1.1-1.3-1.4-2.1c-0.3-0.9-0.5-1.8-0.6-2.7c-0.2-1.6-0.1-3.2-0.1-4.8c0-0.9,0-1.8,0.1-2.7c0.1-1.4,0.2-2.8,0.6-4.2
              			c0.1-0.4,0.3-0.7,0.5-1.1c0.3-0.4,0.7-0.5,1.2-0.4c0.6,0.2,1,0.6,1.4,1.1c0.9,1,1.6,2.2,2.2,3.5c0.7,1.5,1.2,3.1,1.4,4.7
              			c0.1,0.5,0.1,0.9,0.1,1.4c0,0,0,0.1,0,0.1C33.5,14.8,33.5,15.1,33.5,15.4z" fill="currentColor" />
          </svg>
          <span style={{ font: '500 11px var(--font-ui)', color: 'var(--text-tertiary)' }}>terms &middot; privacy</span>
        </div>

        {/* the bloom: the world thins to paper before the step swaps, so the
            crossing flows into home instead of freezing and cutting. */}
        {entering && <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 34, pointerEvents: 'none', animation: 'pgFadeIn .55s ease .95s both' }} />}
        {/* the first-launch film, played live over the entry. its last frame IS
            this entry frame, so when it dissolves (last 0.7s) the world beneath
            is already at rest and alive: it comes alive, it does not cut. tap
            plays it if the browser blocked autoplay, otherwise tap skips. */}
        {intro && (
          <div
            /* the film teaches by answering gestures, never by captioning them.
               HOLD slows the world down, SWIPE moves between its beats. both are
               the gestures the app itself runs on, learned before the app opens. */
            onPointerDown={(e) => { const v = introVid.current; if (!v) return; window.__iy = e.clientY; window.__ix = e.clientX; window.__ihold = setTimeout(() => { v.playbackRate = 0.35; }, 180); }}
            onPointerUp={(e) => {
              const v = introVid.current; if (!v) return;
              clearTimeout(window.__ihold);
              const dx = e.clientX - (window.__ix || 0), dy = e.clientY - (window.__iy || 0);
              const slowed = v.playbackRate !== 1;
              v.playbackRate = 1;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {           // swipe: skip a beat
                v.currentTime = Math.max(0, Math.min(v.duration - 0.1, v.currentTime + (dx < 0 ? 3.93 : -3.93)));
                return;
              }
              if (dy < -60) { endIntro(); return; }                              // swipe up: go in now
              if (slowed) return;                                                // a hold is not a tap
              if (v.paused) { v.muted = false; v.play().catch(() => {}); } else endIntro();
            }}
            style={{ position: 'absolute', inset: 0, zIndex: 50, background: '#FFFFFF', opacity: introFade ? 0 : 1, transition: 'opacity .65s ease', cursor: 'pointer' }}>
            <video ref={introVid} src="./cine/intro-latest.mp4" autoPlay playsInline
              onEnded={endIntro}
              onTimeUpdate={(e) => { const v = e.target; if (v.duration && v.duration - v.currentTime < 0.7) setIntroFade(true); }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            {/* skip. light grey, quiet, out of the way of the picture.
                feedback lands on pointer-down, the commit on the tap. */}
            <div onPointerDown={(e) => { e.stopPropagation(); e.currentTarget.style.transform = 'scale(.94)'; }}
              onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              onClick={(e) => { e.stopPropagation(); endIntro(); }}
              style={{
                position: 'absolute', bottom: 34, right: 26, padding: '9px 18px', borderRadius: 999,
                background: 'rgba(255,255,255,.42)', backdropFilter: 'blur(10px)',
                font: '600 12.5px var(--font-ui)', color: 'rgba(255,255,255,.92)', letterSpacing: '.01em',
                textShadow: '0 1px 6px rgba(0,0,0,.28)',
                cursor: 'pointer', userSelect: 'none',
              }}>skip</div>
          </div>
        )}
      </div>
    ),
    home: (
      <div
        onPointerDown={(e) => { window.__dragH = { x: e.clientX, y: e.clientY }; }}
        onPointerUp={(e) => {
          const d = window.__dragH; window.__dragH = null;
          if (!d || sheetUp) return;
          const dx = e.clientX - d.x, dy = e.clientY - d.y;
          if (Math.abs(dy) > Math.abs(dx) && d.y - e.clientY > 36) { openTalk('menu'); return; }
          if (dx > 60) { setNavOpen('places'); return; }
          if (dx < -60 && d.x > window.innerWidth - 48) adoptAnother(); // adopt only on a deliberate right-edge pull, never a casual mid-room swipe
        }}
        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <React.Fragment>
            <div style={{ marginTop: 96, alignSelf: 'stretch', padding: '0 28px', animation: 'pgLineIn .55s ease both' }}>
              <P.ScreenHeader label="HOME" title={name.trim() || unnamedRow} status={MOOD_STATUS(mood)} />
            </div>
            {/* the nag rides ABOVE the creature, not at a fixed frame offset:
                the header changes height when the agent has no name yet, and a
                fixed offset put the bubble on its face (QA 2026-07-24). */}
            {/* the creature sits back at its fixed offset (keem 2026-07-25). the
            auto-margin centring dropped it into the middle of the frame and
            that read wrong, the room wants it high with air below. */}
        <div style={{ position: 'relative', marginTop: 76, animation: 'pgFadeIn .7s ease .25s both' }}>
              {!name && <UnnamedNag onOpen={() => openTalk('nag')} />}
              {zzz}
              <div
                onClick={() => { if (!window.__heldAgent) setMenuOpen((v) => !v); window.__heldAgent = false; }}
                onPointerDown={(e) => { e.stopPropagation(); window.__heldAgent = false; window.__holdA = setTimeout(() => { window.__heldAgent = true; setHoldMenu(true); }, 500); }}
                onPointerUp={() => clearTimeout(window.__holdA)}
                onPointerLeave={() => clearTimeout(window.__holdA)}
                style={{ cursor: 'pointer' }}><P.Sprite size={112} form={myForm} faceIdx={myFace} mood={mood} /></div>
            {/* the menu hangs off the CREATURE, the same way the nag hangs
                above it (keem 2026-07-25). as a sibling in the room column it
                fell to the bottom of the screen and slid under the dock, which
                read as a different surface entirely. */}
            {/* the anchor and the animation are separate elements: pgLineIn
                animates transform, so centring with translateX on the same
                node was overridden and the menu hung off to the right. */}
            {menuOpen && (
              <div style={{ position: 'absolute', top: '100%', marginTop: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 24 }}>
              <div style={{ minWidth: 226, background: 'var(--paper-card)', borderRadius: 16, boxShadow: 'var(--menu-shadow)', overflow: 'hidden', animation: 'pgLineIn .3s ease both' }}>
                <div onClick={() => { setMenuOpen(false); openTalk('menu'); }} style={{ padding: '13px 22px', font: '600 13.5px var(--font-ui)', color: 'var(--ink-2)', cursor: 'pointer', borderBottom: '1px solid var(--divider)' }}>{`talk to ${who}`}</div>
                <div style={{ padding: '13px 22px', display: 'flex', alignItems: 'baseline', gap: 14, justifyContent: 'space-between', borderBottom: '1px solid var(--divider)' }}>
                  <span style={{ font: '600 13.5px var(--font-ui)', color: 'var(--ink-2)', opacity: .45 }}>{`train ${who}`}</span>
                  <span style={monoTag}>COMING SOON</span>
                </div>
                <div onClick={sendOut} style={{ padding: '13px 22px', font: '600 13.5px var(--font-ui)', color: 'var(--ink-2)', cursor: 'pointer' }}>{`send ${who} to the playground`}</div>
              </div>
              </div>
            )}
            </div>
                      </React.Fragment>
        {dockScrim}{agentDock}
        {settingsSheet}
        {navHandle}{yoursHandle}
        {holdVeil}
        {talking && talkSheet}
        {plusOpen && plusSheet}
        {invOpen && invSheet}
        {knockAsk && knockSheet}
      </div>
    ),
    sendoff: (
      <div onClick={next} style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 300, height: 340, marginTop: 100 }}>
          <div style={{ position: 'absolute', left: '50%', top: '44%', width: 340, height: 340, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'var(--globe-halo)', filter: 'blur(16px)', animation: 'pgFadeIn 1s ease .2s both, pgHaloPulse 6s ease-in-out 1.4s infinite' }} />
          <div style={{ position: 'absolute', left: '50%', top: '44%', transform: 'translate(-50%,-50%)', animation: 'pgEngulf 1.1s cubic-bezier(.6,.05,.4,1) 3.5s both' }}>
            <div style={{ animation: 'pgGlobeEnter 1.3s cubic-bezier(.2,.9,.25,1.1) both' }}>
              <P.Globe variant="world" size={280} souls={5} phase={PHASE_ORDER[phaseIdx]}
                beings={BEINGS}
                pins={place ? [{ x: place.x, y: place.y, live: true, label: place.name.replace('the ', '') }] : []}
                arc={arcTo(place)} />
            </div>
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '44%', width: 300, height: 300, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,230,236,.9), rgba(150,150,158,0) 70%)', animation: 'pgFlash 1s ease-out 3.2s forwards', opacity: 0, pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', left: '50%', top: '44%', animation: 'pgCross 1.9s cubic-bezier(.6,.05,.4,1) 1.5s both', zIndex: 2 }}>
            <P.Sprite size={64} form={myForm} faceIdx={myFace} mood={mood} still />
          </div>
        </div>
      </div>
    ),
    away: (
      <div
        onPointerDown={(e) => { window.__awayD = e.clientX; }}
        onPointerUp={(e) => {
          const d = window.__awayD; window.__awayD = null;
          if (d == null || sheetUp) return;
          if (e.clientX - d > 60) { setNavOpen('places'); window.__awaySwiped = true; }
          if (d - e.clientX > 60 && d > window.innerWidth - 48) { adoptAnother(); window.__awaySwiped = true; }
        }}
        onClick={() => { if (window.__awaySwiped || sheetUp) { window.__awaySwiped = false; return; } next(); }}
        style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <React.Fragment>
        <div style={{ marginTop: 96, alignSelf: 'stretch', padding: '0 28px', animation: 'pgLineIn .55s ease both' }}>
          <P.ScreenHeader label="HOME" title={name.trim() || unnamedRow} status={place ? `out · ${place.name}` : 'out'} />
        </div>
        {/* the world it is inside, turning on its own clock. the only thing
            that marks the passing of a trip, no timer, no progress. */}
        <div style={{ marginTop: 34, opacity: .5, animation: 'pgFadeIn 1s ease .4s both' }}>
          <P.Globe variant="world" size={104} souls={2} phase={PHASE_ORDER[phaseIdx]}
            beings={BEINGS}
            pins={place ? [{ x: place.x, y: place.y, live: true }] : []}
            arc={arcTo(place)} />
        </div>
        {/* the absence: the dent where it usually sits, and nothing in it. the
            ping ring that used to hover here was a second copy of the live pin
            already on the world, and read as a stray circle (QA 2026-07-24). */}
        <div style={{ position: 'relative', marginTop: 26, width: 112, height: 92, animation: 'pgFadeIn .7s ease .25s both' }}>
          <div style={{ position: 'absolute', left: '50%', top: '60%', width: 74, height: 12, transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,.07), transparent 72%)', filter: 'blur(3px)' }} />
        </div>
        {/* you can end a trip. it comes home empty and says so, which is the
            only honest failure the flow has (keem 2026-07-25). */}
        <div onClick={() => { window.pgSound && pgSound('tick'); setRecalled(true); next(); }}
          style={{ marginTop: 18, font: '600 13.5px var(--font-ui)', color: 'var(--text-secondary)', cursor: 'pointer' }}>{`call ${who} back`}</div>
        {dockScrim}{agentDock}
        {settingsSheet}
        {navHandle}{yoursHandle}
        </React.Fragment>
      </div>
    ),
    after: (
      <div
        onPointerDown={(e) => { window.__aftD = e.clientX; }}
        onPointerUp={(e) => { const d = window.__aftD; window.__aftD = null; if (d == null || sheetUp) return; const dx = e.clientX - d; if (dx > 60) setNavOpen('places'); if (dx < -60 && d > window.innerWidth - 48) adoptAnother(); }}
        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <React.Fragment>
        <div style={{ marginTop: 96, alignSelf: 'stretch', padding: '0 28px', animation: 'pgLineIn .55s ease both' }}>
          <P.ScreenHeader label="HOME" title={name.trim() || unnamedRow} status={MOOD_STATUS(mood)} />
        </div>
        <div style={{ position: 'relative', marginTop: 54, animation: 'pgFadeIn .7s ease .25s both' }}>
          {zzz}
          <div
            onClick={() => { if (!window.__heldAgent) openTalk('menu'); window.__heldAgent = false; }}
            onPointerDown={(e) => { e.stopPropagation(); window.__heldAgent = false; window.__holdB = setTimeout(() => { window.__heldAgent = true; setHoldMenu(true); }, 500); }}
            onPointerUp={() => clearTimeout(window.__holdB)}
            onPointerLeave={() => clearTimeout(window.__holdB)}
            style={{ cursor: 'pointer' }}><P.Sprite size={112} form={myForm} faceIdx={myFace} mood={mood} /></div>
        </div>
        {/* it is holding something for you */}
        {chat.some((m) => m.delivered) && (
          <div onClick={() => openTalk('menu')} style={{ marginTop: 22, cursor: 'pointer', animation: 'pgLineIn .5s ease 1.6s both' }}>
            <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 5px', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-chip)', font: '500 14.5px var(--font-ui)', color: 'var(--ink-2)' }}>i have it</div>
          </div>
        )}
        {talking && talkSheet}
        {plusOpen && plusSheet}
        {invOpen && invSheet}
        {knockAsk && knockSheet}
        {holdMenu && holdVeil}
        {dockScrim}{agentDock}
        {settingsSheet}
        {navHandle}{yoursHandle}
        </React.Fragment>
      </div>
    ),
  };

  const beat = BEATS[step];
  /* production: the page is the phone and nothing else (keem 2026-07-25). the
     beat rail, the stepper and the judge gesture row are gone, every beat is
     reached the way a user reaches it: tap, swipe, hold. */
  return (
        <FlowFrame>
          {['home', 'away', 'after'].includes(beat.key) && navOpen && navBehind}
          {['home', 'away', 'after'].includes(beat.key) && yoursOpen && yoursBehind}
          <div key={beat.key} style={{
            position: 'absolute', inset: 0, userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none',
            ...(ROOMS[(cur && cur.room) || 0] || ROOMS[0]).vars,
            background: 'var(--bg)', overflow: 'hidden',
            /* the two sides move differently on purpose (keem 2026-07-25):
               LEFT keeps the original step-aside, the room shrinks back and the
               agent's own page is revealed behind it. RIGHT switches fully, your
               collection is a different place, not a thing behind the room. */
            transform: navOpen ? 'translateX(258px) scale(.9)' : yoursOpen ? 'translateX(-100%)' : 'none',
            borderRadius: navOpen ? 36 : 0,
            boxShadow: navOpen ? '0 0 0 1px rgba(0,0,0,.06), 0 26px 60px -30px rgba(0,0,0,.4)' : 'none',
            transition: 'transform .45s var(--ease-pop), border-radius .45s ease, box-shadow .45s ease',
          }}>
            {screens[beat.key]}
            {/* while the room is aside, one tap anywhere on it brings it back */}
            {(navOpen || yoursOpen) && <div onClick={() => { setNavOpen(false); setYoursOpen(false); }} onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()} style={{ position: 'absolute', inset: 0, zIndex: 45, cursor: 'pointer' }} />}
            {/* landed white: home comes out of the bloom the entry ended in */}
            {landed && <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 38, pointerEvents: 'none', animation: 'pgLand .9s ease .1s both' }} />}
          </div>
        </FlowFrame>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Flow });
