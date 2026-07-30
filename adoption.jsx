/* THE ADOPTION, three ways a personality is given (PG-125).

   the ruling this sits under: personality is given ONCE at adoption as an
   EXPECTATION. the companion grows past it on its own out in the world, and
   it can even go wrong. the owner never rewrites it, only trains it. this is
   one question at a time, in the companion's own voice, and it ends in a
   seal moment. the creed is kept VERBATIM and quoted back.

   the three directions carry the same five beats and the same shared model:

     1  one question at a time       the companion is above the question and
                                    the answer is the only thing below it.
     2  reply cards                  each answer is a paper card with the
                                    consequence it will carry into the world.
     3  the seal moment              the permit is present from the first
                                    question and fills blank by blank until
                                    the owner's signature closes it.

   this is a LAB, not a shipped screen. the frames are 320x680 and the contact
   sheet under them is the same three components at thumbnail scale in their
   name, temperament, creed, and sealed states, so every beat can be judged
   without clicking through. flow.jsx is untouched: everything here composes
   the real window.PG (Sprite, HatchInput, Chip, Button).

   greyscale chrome throughout, no world imagery: nothing here is a window onto
   the world, so nothing here carries color. */

const W = 320, H = 680;
const FRAME_R = 46;          // 320 wide phone. --radius-frame is cut for 390.

const BEATS = [
  {
    key: 'name',
    question: 'what will you call me?',
    field: 'name',
  },
  {
    key: 'temperament',
    question: 'how should i carry myself out there?',
    field: 'temperament',
    options: [
      ['curious', 'i will wander, and come home late'],
      ['skeptical', 'i will doubt first, and verify twice'],
      ['gentle', 'i will leave room for what people mean'],
      ['bold', 'i will knock before i wait to be invited'],
    ],
  },
  {
    key: 'voice',
    question: 'how should i speak to you?',
    field: 'voice',
    options: [
      ['plain', 'i will say the thing without dressing it up'],
      ['dry', 'i will keep the sharp edge, and not make a show of it'],
      ['warm', 'i will tell you what i see, and stay close to it'],
      ['few words', 'i will bring the answer, and leave the room'],
    ],
  },
  {
    key: 'chases',
    question: 'what should i chase when i am out there?',
    field: 'chases',
    options: [
      ['the truth', 'i will keep looking when the easy answer arrives'],
      ['a good story', 'i will follow the thread that makes a place live'],
      ['the cheap way', 'i will look twice before you spend'],
      ['whatever you point at', 'i will start where your hand is'],
    ],
  },
  {
    key: 'creed',
    question: 'how do you want me to be out there?',
    field: 'creed',
  },
];

const sound = (n) => {
  if (typeof window !== 'undefined' && window.pgSound) window.pgSound(n);
};

const emptyAnswers = () => ({
  name: '',
  temperament: '',
  voice: '',
  chases: '',
  creed: '',
  signature: '',
});

function answerText(answers, beat) {
  return answers[beat.field] || '';
}

function nextBeat(beat) {
  return Math.min(BEATS.length - 1, beat + 1);
}

function Question({ beat, answers, onAnswer, onNext }) {
  const P = window.PG;
  const spec = BEATS[beat];
  const [ownWords, setOwnWords] = React.useState(false);
  const current = answerText(answers, spec);

  React.useEffect(() => {
    setOwnWords(false);
  }, [beat]);

  const commit = (value) => {
    if (value.length === 0) return;
    onAnswer(spec.field, value);
    onNext();
  };

  return (
    <div style={{ position: 'absolute', left: 20, right: 20, bottom: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ maxWidth: 278, textAlign: 'center', font: 'var(--text-speech)', color: 'var(--text-primary)' }}>{spec.question}</div>

      {spec.field === 'name' || spec.field === 'creed' || ownWords ? (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
          <P.HatchInput
            key={`${spec.field}-${current}-${ownWords}`}
            placeholder={spec.field === 'name' ? 'a name' : 'say it in your words'}
            defaultValue={current}
            onEnter={(e) => commit(e.currentTarget.value)}
            aria-label={spec.question}
            style={{ width: spec.field === 'creed' ? 248 : 190 }}
          />
          {ownWords && (
            <P.Button variant="quiet" onClick={() => setOwnWords(false)}>choose one</P.Button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, maxWidth: 286 }}>
          {spec.options.map(([value]) => (
            <P.Chip
              key={value}
              selected={current === value}
              onClick={() => { sound('tick'); onAnswer(spec.field, value); onNext(); }}
            >{value}</P.Chip>
          ))}
          <P.Button variant="quiet" onClick={() => setOwnWords(true)}>say it your way</P.Button>
        </div>
      )}
    </div>
  );
}

function SealAction({ answers, onSeal, onReset, variant, sealed = false }) {
  const P = window.PG;
  const name = answers.name || 'the companion';
  const creed = answers.creed ? `"${answers.creed}"` : '""';
  const traits = [answers.temperament, answers.voice, answers.chases].filter(Boolean).join(', ');

  if (variant === 'cards') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '136px 28px 30px', textAlign: 'center', animation: 'pgLineIn .42s var(--ease-pop) both' }}>
        <div style={{ font: 'var(--text-screen-title)', color: 'var(--text-primary)', letterSpacing: 'var(--tracking-display)' }}>this is {name}.</div>
        <div style={{ marginTop: 24, font: 'var(--text-body)', color: 'var(--text-primary)' }}>{traits}.</div>
        <div style={{ marginTop: 20, font: 'var(--text-speech)', color: 'var(--text-primary)' }}>{creed}</div>
        {!sealed && <P.Button style={{ marginTop: 32 }} onClick={onSeal}>seal it</P.Button>}
        <P.Button variant="quiet" onClick={() => { sound('settle'); onReset(); }}>start over</P.Button>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '116px 28px 30px', textAlign: 'center', animation: 'pgLineIn .42s var(--ease-pop) both' }}>
      <P.Sprite size={64} form="pebble" still={sealed} />
      <div style={{ marginTop: 18, maxWidth: 270, font: 'var(--text-speech)', color: 'var(--text-primary)' }}>
        i am {name}. i carry myself {answers.temperament}, speak {answers.voice}, and chase {answers.chases}.
      </div>
      <div style={{ marginTop: 18, maxWidth: 270, font: 'var(--text-body)', color: 'var(--text-primary)' }}>{creed}</div>
      {!sealed && <P.Button style={{ marginTop: 28 }} onClick={onSeal}>that's you</P.Button>}
      <P.Button variant="quiet" onClick={() => { sound('settle'); onReset(); }}>start over</P.Button>
    </div>
  );
}

function OneQuestion({ answers, setAnswer, beat, setBeat, stage, setStage, onReset, frozen }) {
  const P = window.PG;
  if (stage !== 'asking') return <SealAction answers={answers} variant="question" sealed={stage === 'sealed'} onSeal={() => { sound('adopt'); setStage('sealed'); }} onReset={onReset} />;

  const commit = (field, value) => {
    setAnswer(field, value);
    if (field === 'name') sound('name');
    if (beat < BEATS.length - 1) sound('slide');
  };

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, right: 0, top: frozen ? 76 : 88, display: 'flex', justifyContent: 'center', animation: 'pgLineIn .4s var(--ease-pop) both' }}>
        <P.Sprite size={74} form="pebble" still={!!frozen} />
      </div>
      <Question beat={beat} answers={answers} onAnswer={commit} onNext={() => { if (beat < BEATS.length - 1) setBeat(nextBeat(beat)); else setStage('seal'); }} />
    </React.Fragment>
  );
}

function ReplyCards({ answers, setAnswer, beat, setBeat, stage, setStage, onReset, frozen }) {
  const P = window.PG;
  const [ownWords, setOwnWords] = React.useState(false);
  const spec = BEATS[beat];
  React.useEffect(() => {
    setOwnWords(false);
  }, [beat]);
  if (stage !== 'asking') return <SealAction answers={answers} variant="cards" sealed={stage === 'sealed'} onSeal={() => { sound('adopt'); setStage('sealed'); }} onReset={onReset} />;
  const commit = (field, value) => {
    setAnswer(field, value);
    if (field === 'name') sound('name');
    else sound('slide');
  };

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, right: 0, top: frozen ? 66 : 76, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <P.Sprite size={58} form="pebble" still={!!frozen} />
        <div style={{ maxWidth: 270, textAlign: 'center', font: 'var(--text-speech)', color: 'var(--text-primary)' }}>{spec.question}</div>
      </div>
      <div style={{ position: 'absolute', left: 24, right: 24, top: 222, bottom: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
        {spec.field === 'name' || spec.field === 'creed' || ownWords ? (
          <P.HatchInput
            key={`${spec.field}-${answers[spec.field]}-${ownWords}`}
            placeholder={spec.field === 'name' ? 'a name' : 'say it in your words'}
            defaultValue={answers[spec.field]}
            onEnter={(e) => {
              if (e.currentTarget.value.length === 0) return;
              commit(spec.field, e.currentTarget.value);
              if (beat < BEATS.length - 1) setBeat(nextBeat(beat)); else setStage('seal');
            }}
            aria-label={spec.question}
            style={{ alignSelf: 'center', width: spec.field === 'creed' ? 248 : 190 }}
          />
        ) : (
          <React.Fragment>
            {spec.options.map(([value, consequence]) => (
              <P.Chip
                key={value}
                selected={answers[spec.field] === value}
                onClick={() => { sound('tick'); commit(spec.field, value); if (beat < BEATS.length - 1) setBeat(nextBeat(beat)); else setStage('seal'); }}
                style={{ width: '100%', minHeight: 62, padding: '12px 16px', borderRadius: 'var(--radius-row-card)', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-contact)', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}
              >
                <span style={{ font: 'var(--text-row-title)', color: 'var(--text-primary)' }}>{value}</span>
                <span style={{ font: 'var(--text-row-sub)', color: 'var(--text-secondary)' }}>{consequence}</span>
              </P.Chip>
            ))}
            <P.Button variant="quiet" onClick={() => setOwnWords(true)}>say it your way</P.Button>
          </React.Fragment>
        )}
        {ownWords && spec.field !== 'name' && spec.field !== 'creed' && (
          <P.Button variant="quiet" onClick={() => setOwnWords(false)}>choose one</P.Button>
        )}
      </div>
    </React.Fragment>
  );
}

function Permit({ answers, beat, sealed, signature, onSignature, signatureReady }) {
  const P = window.PG;
  const lines = [
    ['carries itself', answers.temperament],
    ['speaks', answers.voice],
    ['chases', answers.chases],
    ['lives by', answers.creed ? `"${answers.creed}"` : ''],
  ];

  return (
    <div style={{ position: 'absolute', left: 22, right: 22, top: sealed ? 92 : 64, background: 'var(--paper-card)', borderRadius: 'var(--radius-row-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)', padding: '20px 20px 18px', transition: 'top .42s var(--ease-pop)', animation: 'pgLineIn .42s var(--ease-pop) both' }}>
      <div style={{ font: 'var(--text-sheet-title)', color: answers.name ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{answers.name || 'your companion'}</div>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lines.map(([lead, value]) => (
          <div key={lead} style={{ font: 'var(--text-body)', color: value ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
            <span>{lead} </span><span style={{ color: value ? 'var(--ink-2)' : 'var(--text-tertiary)', borderBottom: `1px solid ${value ? 'var(--ink-2)' : 'var(--divider)'}` }}>{value || '· · ·'}</span>
          </div>
        ))}
      </div>
      {sealed ? (
        <div style={{ marginTop: 20, font: 'var(--text-label)', color: 'var(--text-primary)' }}>sealed · {signature}</div>
      ) : signatureReady ? (
        <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--divider)' }}>
          <P.HatchInput
            key={`signature-${signature}`}
            placeholder="sign here"
            defaultValue={signature}
            onEnter={(e) => { if (e.currentTarget.value.length > 0) onSignature(e.currentTarget.value); }}
            style={{ width: 190 }}
          />
        </div>
      ) : null}
    </div>
  );
}

function SealMoment({ answers, setAnswer, beat, setBeat, stage, setStage, onReset, signature, setSignature, frozen }) {
  const P = window.PG;
  const spec = BEATS[beat];
  const [ownWords, setOwnWords] = React.useState(false);
  const signatureReady = beat === BEATS.length - 1 && !!answers.creed;
  React.useEffect(() => {
    setOwnWords(false);
  }, [beat]);
  const commit = (field, value) => {
    setAnswer(field, value);
    if (field === 'name') sound('name');
    else sound('slide');
  };

  if (stage === 'sealed') {
    return (
      <React.Fragment>
        <Permit answers={answers} beat={beat} sealed signature={signature} onSignature={() => {}} signatureReady />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 38, display: 'flex', justifyContent: 'center' }}>
          <P.Sprite size={60} form="pebble" still />
        </div>
        <P.Button variant="quiet" onClick={() => { sound('settle'); onReset(); }} style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)' }}>start over</P.Button>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Permit answers={answers} beat={beat} sealed={false} signature={signature} onSignature={(value) => { setSignature(value); sound('adopt'); setStage('sealed'); }} signatureReady={signatureReady} />
      {!signatureReady && <div style={{ position: 'absolute', left: 22, right: 22, bottom: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13, animation: 'pgLineIn .32s var(--ease-pop) both' }}>
        <div style={{ maxWidth: 276, textAlign: 'center', font: 'var(--text-speech)', color: 'var(--text-primary)' }}>{spec.question}</div>
        {spec.field === 'name' || spec.field === 'creed' || ownWords ? (
          <P.HatchInput
            key={`permit-${spec.field}-${answers[spec.field]}-${ownWords}`}
            placeholder={spec.field === 'name' ? 'a name' : 'say it in your words'}
            defaultValue={answers[spec.field]}
            onEnter={(e) => {
              if (e.currentTarget.value.length === 0) return;
              commit(spec.field, e.currentTarget.value);
              if (beat < BEATS.length - 1) setBeat(nextBeat(beat));
            }}
            aria-label={spec.question}
            style={{ width: spec.field === 'creed' ? 250 : 190 }}
          />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {spec.options.map(([value]) => (
              <P.Chip key={value} selected={answers[spec.field] === value} onClick={() => { sound('tick'); commit(spec.field, value); if (beat < BEATS.length - 1) setBeat(nextBeat(beat)); }}>{value}</P.Chip>
            ))}
            <P.Button variant="quiet" onClick={() => setOwnWords(true)}>say it your way</P.Button>
          </div>
        )}
        {ownWords && spec.field !== 'name' && spec.field !== 'creed' && (
          <P.Button variant="quiet" onClick={() => setOwnWords(false)}>choose one</P.Button>
        )}
      </div>}
    </React.Fragment>
  );
}

const VARIANTS = [
  { key: 'question', tag: '1 · one question at a time', Screen: OneQuestion },
  { key: 'cards', tag: '2 · reply cards with consequences', Screen: ReplyCards },
  { key: 'permit', tag: '3 · the seal moment', Screen: SealMoment },
];

/* one 320x680 screen. `frozen` pins it to a beat for the contact sheet, so
   the thumbnails are the real screens rather than drawings of them. */
function Screen({ variant, frozen }) {
  const V = VARIANTS.find((v) => v.key === variant);
  const frozenBeat = frozen === 'name' ? 0 : frozen === 'temperament' ? 1 : frozen === 'creed' ? BEATS.length - 1 : 0;
  const [answers, setAnswers] = React.useState(() => emptyAnswers());
  const [beat, setBeat] = React.useState(frozen ? frozenBeat : 0);
  const [stage, setStage] = React.useState(frozen === 'sealed' ? 'sealed' : 'asking');
  const [signature, setSignature] = React.useState(frozen === 'sealed' ? 'you' : '');
  const frozenAnswers = React.useMemo(() => {
    if (frozen === 'name') return { ...emptyAnswers(), name: 'Mara' };
    if (frozen === 'temperament') return { ...emptyAnswers(), name: 'Mara', temperament: 'skeptical' };
    if (frozen === 'creed') return { ...emptyAnswers(), name: 'Mara', temperament: 'curious', voice: 'plain', chases: 'the truth', creed: 'leave a light on for the strange thing' };
    if (frozen === 'sealed') return { name: 'Mara', temperament: 'curious', voice: 'plain', chases: 'the truth', creed: 'leave a light on for the strange thing', signature: 'you' };
    return null;
  }, [frozen]);
  const model = frozenAnswers || answers;
  const setAnswer = (field, value) => setAnswers((prev) => ({ ...prev, [field]: value }));
  const reset = () => {
    setAnswers(emptyAnswers());
    setBeat(0);
    setStage('asking');
    setSignature('');
  };

  return (
    <div style={{ position: 'relative', width: W, height: H, borderRadius: FRAME_R, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 34px 90px -40px rgba(0,0,0,.45)' }}>
      <V.Screen answers={model} setAnswer={setAnswer} beat={beat} setBeat={setBeat} stage={stage} setStage={setStage} onReset={reset} signature={signature} setSignature={setSignature} frozen={!!frozen} />
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 5, borderRadius: 3, background: 'rgba(0,0,0,.3)' }} />
    </div>
  );
}

function Thumb({ variant, frozen, scale }) {
  return (
    <div style={{ width: W * scale, height: H * scale, position: 'relative', overflow: 'hidden', flex: 'none', borderRadius: FRAME_R * scale, boxShadow: 'var(--paper-ring)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
        <Screen variant={variant} frozen={frozen} />
      </div>
    </div>
  );
}

function AdoptionLab() {
  const P = (window.PG || {});
  if (!P.Sprite || !P.HatchInput || !P.Chip || !P.Button) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the companion…</div>;
  }

  const label = { font: 'var(--text-label)', color: 'var(--text-tertiary)' };

  return (
    <div style={{ padding: '54px 40px 96px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>adoption</div>

      <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap', marginTop: 34 }}>
        {VARIANTS.map((v) => (
          <div key={v.key}>
            <div style={{ ...label, marginBottom: 12 }}>{v.tag}</div>
            <Screen variant={v.key} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 74, paddingTop: 34, borderTop: '1px solid var(--divider)' }}>
        <div style={label}>contact sheet</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 22 }}>
          {VARIANTS.map((v) => (
            <div key={v.key}>
              <div style={{ ...label, marginBottom: 10 }}>{v.tag}</div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                {['name', 'temperament', 'creed', 'sealed'].map((f) => (
                  <div key={f}>
                    <Thumb variant={v.key} frozen={f} scale={0.34} />
                    <div style={{ font: 'var(--text-hint)', color: 'var(--text-tertiary)', marginTop: 7 }}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { AdoptionLab });
