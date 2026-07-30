// React is provided by the loader (DC x-import), no import, no bundler.

const TALK_OPEN = 'hello. i am alive. i don’t have a name yet.';
const TALK_REPLIES = [
  'mm. i’ll remember that.',
  'good to know. i’ll carry it with me next time.',
  'then i’ll look twice at that when i’m out there.',
  'noted. you can hold me to it.',
];
const TALK_SECONDS = [
  'that changes how i’d ask about it out there.',
  'say more when you feel like it.',
  'i had a thought about that.',
  'i’ll keep that close.',
];
const TALK_ASKS = /find|get me|go get|look into|someone who|book|order/i;
const CONTACT_SCALE = 0.42;

const defaultScript = (name = '') => ({
  name,
  mood: 55,
  exchange: [{ me: false, text: name ? `i’m here.` : TALK_OPEN }],
});

function talkPlan(line) {
  if (TALK_ASKS.test(line)) {
    return {
      trip: true,
      doing: 'working out where to start',
      lines: ['i can go find that.', 'say the word and i’m through the tear.'],
    };
  }
  if (/\?$|^(what|where|who|when|how|why)\b/i.test(line)) {
    return {
      doing: 'checking what i know',
      lines: ['i can answer that properly. tell me where you are first.'],
    };
  }
  if (/remind|remember|keep|hold on to|note/i.test(line)) {
    return {
      doing: 'putting that somewhere i will not lose it',
      lines: ['held. i’ll bring it back up when it matters.'],
    };
  }
  return null;
}

function useTalk({ script, frozen = false } = {}) {
  const seed = React.useMemo(() => {
    const source = script || defaultScript();
    return {
      name: source.name || '',
      mood: source.mood == null ? 55 : source.mood,
      exchange: (source.exchange || source.lines || []).map((m) => ({ ...m })),
      doing: source.doing || '',
      thinking: !!source.thinking,
      trip: !!source.trip,
    };
  }, [script]);
  const [name, setName] = React.useState(seed.name);
  const [mood, setMood] = React.useState(seed.mood);
  const [exchange, setExchange] = React.useState(seed.exchange);
  const [doing, setDoing] = React.useState(seed.doing);
  const [thinking, setThinking] = React.useState(seed.thinking);
  const [trip, setTrip] = React.useState(seed.trip);
  const [value, setValue] = React.useState('');
  const timers = React.useRef([]);

  React.useEffect(() => {
    setName(seed.name);
    setMood(seed.mood);
    setExchange(seed.exchange);
    setDoing(seed.doing);
    setThinking(seed.thinking);
    setTrip(seed.trip);
    setValue('');
  }, [seed]);

  React.useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const later = (fn, ms) => {
    const timer = window.setTimeout(fn, ms);
    timers.current.push(timer);
  };

  const speak = (text, extra = {}) => {
    setExchange((items) => [...items, { me: false, text, ...extra }]);
  };

  const sayLine = (raw) => {
    const line = String(raw == null ? value : raw).trim();
    if (!line || frozen) return;
    setValue('');

    if (!name) {
      setExchange((items) => [...items, { me: true, text: line }]);
      if (line.split(/\s+/).length <= 2) {
        const given = line.slice(0, 24);
        setName(given);
        setMood((current) => Math.min(100, current + 14));
        setThinking(true);
        later(() => {
          setThinking(false);
          speak(`${given}. that’s mine now.`);
        }, 700);
      } else {
        setThinking(true);
        later(() => {
          setThinking(false);
          speak('i can go find that. name me first.');
        }, 700);
      }
      return;
    }

    setExchange((items) => [...items, { me: true, text: line }]);
    setMood((current) => Math.min(100, current + 6));
    const plan = talkPlan(line);
    const pace = 1.5 - (mood / 100);
    setThinking(true);

    if (plan?.trip) {
      setDoing(plan.doing);
      setThinking(false);
      later(() => {
        setDoing('');
        speak(plan.lines[0]);
        setThinking(true);
      }, Math.round(850 * pace));
      later(() => {
        setThinking(false);
        setTrip(true);
        speak(plan.lines[1], { go: true });
      }, Math.round(1850 * pace));
      return;
    }

    if (plan) {
      setDoing(plan.doing);
      setThinking(false);
      later(() => {
        setDoing('');
        speak(plan.lines[0]);
      }, Math.round(950 * pace));
      return;
    }

    const index = exchange.filter((item) => !item.me).length;
    const lines = [TALK_REPLIES[index % TALK_REPLIES.length]];
    if (index % 4 === 2) lines.push(TALK_SECONDS[index % TALK_SECONDS.length]);
    lines.forEach((lineText, indexInReply) => {
      later(() => {
        setThinking(false);
        speak(lineText);
        if (indexInReply < lines.length - 1) setThinking(true);
      }, Math.round((620 + Math.min(line.length * 15, 760) + indexInReply * 620) * pace));
    });
  };

  const acceptTrip = () => {
    if (frozen) return;
    setTrip(false);
    setDoing('opening the tear');
    later(() => setDoing(''), 1200);
  };

  return {
    name, mood, exchange, doing, thinking, trip, value,
    setValue, sayLine, acceptTrip,
  };
}

function SpeechDots() {
  return (
    <span aria-label="thinking" style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <i key={i} style={{
          display: 'block', width: 5, height: 5, borderRadius: '50%',
          background: 'var(--ink-3)', animation: `pgPulseDot 1.2s ease-in-out ${i * 180}ms infinite`,
        }} />
      ))}
    </span>
  );
}

function TalkInput({ talk, named = false, docked = false }) {
  const P = window.PG || {};
  return (
    <div style={{
      width: '100%', display: 'flex', justifyContent: 'center',
      padding: docked ? '10px 14px 14px' : '0 0 26px',
      background: docked ? 'var(--paper-card)' : 'transparent',
      boxShadow: docked ? 'var(--paper-ring)' : 'none',
    }}>
      {named ? (
        <input
          value={talk.value}
          onChange={(event) => talk.setValue(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') talk.sayLine(); }}
          placeholder="say something"
          style={{
            width: '100%', minWidth: 0, background: 'var(--input-bg)',
            border: 'none', borderRadius: 'var(--input-radius)',
            padding: 'var(--input-pad)', font: 'var(--text-body)',
            color: 'var(--input-fg)', outline: 'none',
          }}
        />
      ) : (
        <P.HatchInput
          value={talk.value}
          onChange={(event) => talk.setValue(event.target.value)}
          onEnter={() => talk.sayLine()}
          placeholder="name me"
          style={{ width: 190, maxWidth: '100%' }}
        />
      )}
    </div>
  );
}

function TripOffer({ talk }) {
  const P = window.PG || {};
  if (!talk.trip) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
      <P.Button onClick={talk.acceptTrip} variant="primary">
        send {talk.name || 'it'} through
      </P.Button>
    </div>
  );
}

function BubblesVariant({ script, frozen = false }) {
  const P = window.PG || {};
  const talk = useTalk({ script, frozen });
  const visible = talk.exchange.slice(-3);
  const latestOwner = [...visible].reverse().find((item) => item.me);
  const latestCompanion = [...visible].reverse().find((item) => !item.me);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg)' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ flex: 1, width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', width: '100%', height: 72, padding: '0 18px 8px' }}>
            {visible.filter((item) => !item.me).length > 0 && (
              <P.Bubble bare maxW={286} style={{ position: 'absolute', left: '50%', bottom: 8 }}>
                {visible.filter((item) => !item.me).map((item, index) => (
                <P.Line key={`${item.text}-${index}`} delay={index ? 420 : 0}>{item.text}</P.Line>
                ))}
                {talk.thinking && <P.Line key="thinking" delay={840}><SpeechDots /></P.Line>}
              </P.Bubble>
            )}
          </div>
          <div style={{ height: 154, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <P.Sprite size={86} mood={talk.mood} />
          </div>
        </div>
        <div style={{ width: '100%', minHeight: 94, padding: '8px 18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {latestOwner && <P.Reply key={latestOwner.text}>{latestOwner.text}</P.Reply>}
          <TripOffer talk={talk} />
        </div>
        {talk.name ? (
          <TalkInput talk={talk} named />
        ) : (
          <TalkInput talk={talk} />
        )}
      </div>
    </div>
  );
}

function ThreadVariant({ script, frozen = false }) {
  const P = window.PG || {};
  const talk = useTalk({ script, frozen });
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '22px 20px 16px', boxShadow: 'var(--paper-ring)', flex: 'none' }}>
        <P.Sprite size={38} mood={talk.mood} still />
        <div style={{ minWidth: 0 }}>
          <div style={{ font: '600 15px/1.2 var(--font-display)', color: 'var(--text-primary)' }}>{talk.name || 'the unnamed one'}</div>
          <div style={{ font: 'var(--text-label)', color: 'var(--text-secondary)', marginTop: 3 }}>
            {talk.doing || (talk.thinking ? 'listening' : 'awake')}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '24px 18px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 13 }}>
        {talk.exchange.map((item, index) => item.me ? (
          <P.Reply key={`${item.text}-${index}`} style={{ alignSelf: 'flex-end', maxWidth: 260 }}>{item.text}</P.Reply>
        ) : (
          <div key={`${item.text}-${index}`} style={{ alignSelf: 'flex-start', maxWidth: 270, font: 'var(--text-speech)', color: 'var(--bubble-ink)', animation: 'pgLineIn .5s ease both' }}>
            {item.text}
          </div>
        ))}
        {talk.doing && <div style={{ alignSelf: 'flex-start', font: 'var(--text-speech)', color: 'var(--bubble-ink)' }}>{talk.doing}</div>}
        {talk.thinking && <div style={{ alignSelf: 'flex-start', padding: '6px 0' }}><SpeechDots /></div>}
        <TripOffer talk={talk} />
      </div>
      <TalkInput talk={talk} named={!!talk.name} docked />
    </div>
  );
}

function OneLineVariant({ script, frozen = false }) {
  const P = window.PG || {};
  const talk = useTalk({ script, frozen });
  const latest = talk.exchange[talk.exchange.length - 1];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ flex: 1, width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 22px' }}>
        {talk.trip && <P.World depth="Quick look" size={104} souls={1} style={{ marginBottom: 20 }} />}
        <P.Sprite size={132} mood={talk.mood} style={{ marginBottom: 24 }} />
        <div key={latest && latest.text} style={{ minHeight: 54, maxWidth: 260, textAlign: 'center', font: latest && latest.me ? 'var(--text-hint)' : 'var(--text-speech)', color: latest && latest.me ? 'var(--text-secondary)' : 'var(--bubble-ink)', animation: 'pgFadeIn var(--dur-enter) var(--ease-pop) both' }}>
          {talk.doing || (talk.thinking ? <SpeechDots /> : latest && latest.text)}
        </div>
        {talk.trip && <TripOffer talk={talk} />}
      </div>
      <TalkInput talk={talk} named={!!talk.name} />
    </div>
  );
}

const SHEET_BEATS = [
  {
    title: 'unnamed',
    script: { name: '', exchange: [{ me: false, text: TALK_OPEN }] },
  },
  {
    title: 'named',
    script: { name: 'Sol', exchange: [{ me: true, text: 'Sol' }, { me: false, text: 'Sol. that’s mine now.' }] },
  },
  {
    title: 'trained',
    script: { name: 'Sol', exchange: [{ me: true, text: 'look twice at the quiet parts' }, { me: false, text: 'mm. i’ll remember that.' }, { me: false, text: 'that changes how i’d ask about it out there.' }] },
  },
  {
    title: 'offering',
    script: { name: 'Sol', mood: 68, doing: '', trip: true, exchange: [{ me: true, text: 'find June in the lantern district' }, { me: false, text: 'i can go find that.' }, { me: false, text: 'say the word and i’m through the tear.', go: true }] },
  },
];

function ContactSheet() {
  const variants = [
    { label: 'room', Component: BubblesVariant },
    { label: 'thread', Component: ThreadVariant },
    { label: 'one line', Component: OneLineVariant },
  ];
  return (
    <div className="contact-sheet" style={{ '--contact-scale': CONTACT_SCALE }}>
      {variants.map((variant) => SHEET_BEATS.map((beat, index) => (
        <div key={`${variant.label}-${beat.title}`} className="contact-cell">
          <div className="contact-tag">{variant.label} · {beat.title}</div>
          <div className="contact-ph">
            <div style={{ transform: `scale(${CONTACT_SCALE})`, transformOrigin: 'top left', width: 320, height: 680 }}>
              <variant.Component script={beat.script} frozen />
            </div>
          </div>
        </div>
      )))}
    </div>
  );
}

function Phone({ children }) {
  return <div className="ph">{children}</div>;
}

function TalkLab() {
  return (
    <main className="talk-lab">
      <h1>the talk</h1>
      <p className="sub">the companion conversation, three ways to stay close to the door.</p>
      <section className="variants">
        <article>
          <div className="tag">01 · room</div>
          <p className="note">bubbles rise over the resting companion. older lines leave as the next one arrives.</p>
          <Phone><BubblesVariant /></Phone>
        </article>
        <article>
          <div className="tag">02 · thread</div>
          <p className="note">the thread is the surface, with a small presence row and the input held at the bottom.</p>
          <Phone><ThreadVariant /></Phone>
        </article>
        <article>
          <div className="tag">03 · one line</div>
          <p className="note">the companion stays large and speaks one line at a time. the world only appears inside its window.</p>
          <Phone><OneLineVariant /></Phone>
        </article>
      </section>
      <section style={{ marginTop: 52 }}>
        <div className="tag">04 · contact sheet</div>
        <p className="note">the same three surfaces, held at four beats.</p>
        <ContactSheet />
      </section>
    </main>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { TalkLab });
