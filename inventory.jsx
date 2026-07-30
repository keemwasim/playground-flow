/* INVENTORY, where delivered things pile up (the dock tree, CLAUDE.md surface
   tree). the errand ruling holds: a trip hands you the thing you asked for, so
   this is the library of every ask and what came back, never citations, never
   an archive of papers. the demo haul is lived-world: a place, a person, a
   price.

   three directions, one exploration:
     shelf   1 · a shelf of delivered things, newest hands you the most
     trips   2 · grouped by the trip that brought them
     opened  3 · one delivery opened, the thing plus what it rests on

   the time ruling (rule 9) is why no row carries a stamp: a delivery is placed
   by the trip that brought it and by where it sits on the shelf, never by when.
   greyscale chrome, named tokens, the real window.PG components. */

const W = 320, H = 680;

/* one fixed haul so the shelf reads the same on every load. `rests` are the
   things a delivery stands on, which is what Finding was built for. */
const HAUL = [
  {
    id: 'june',
    brought: 'the maker\'s hall, third floor',
    ask: 'you asked for a quiet place',
    trip: 'the walk through the maker\'s quarter',
    by: 'Sol',
    line: 'she holds the corner desk for the people i send.',
    rests: [
      { text: 'ask for June. she keeps the corner desk free and it is hers to give.', sources: ['June, at the desk', 'the maker\'s hall'] },
      { text: 'the hall is quiet above the second floor, the presses all sit below it.', sources: ['i stood in it'] },
    ],
  },
  {
    id: 'vess',
    brought: 'Vess cuts, for a favor',
    ask: 'you asked for a cutter',
    trip: 'the walk through the maker\'s quarter',
    by: 'Sol',
    line: 'she owed me one. i spent it on you.',
    rests: [
      { text: 'she cut the last three things that came out of that quarter.', sources: ['Vess', 'Marn vouched'] },
    ],
  },
  {
    id: 'press',
    brought: 'nine a run at the press',
    ask: 'you asked what a run costs',
    trip: 'the errand to the square',
    by: 'Sol',
    line: 'i asked twice, in case the first price was for strangers.',
    rests: [
      { text: 'the quiet-day price holds for runs under two hundred.', sources: ['the press, at the counter'] },
    ],
  },
  {
    id: 'water',
    brought: 'Rell will carry the crates',
    ask: 'you asked how to move the crates',
    trip: 'the errand to the square',
    by: 'Sol',
    line: 'you never asked for this one. it seemed worth carrying home.',
    rests: [
      { text: 'he runs the water every quiet day and comes back empty.', sources: ['Rell'] },
    ],
  },
];

const SEALED = [
  {
    id: 'lamp',
    brought: 'a lamp shop by the hall',
    ask: 'you asked where to mend it',
    trip: 'the errand to the square',
    by: 'Sol',
    line: 'the man there mended one in front of me.',
    rests: [{ text: 'he does the work himself, there is no bench behind him.', sources: ['i watched him'] }],
  },
  {
    id: 'grain',
    brought: 'Tolm sets the grain price',
    ask: 'you asked who sets the price',
    trip: 'the errand to the square',
    by: 'Sol',
    line: 'everyone on the square waits to hear his number.',
    rests: [{ text: 'he holds the number for the whole square, nobody undercuts him.', sources: ['Tolm', 'the square'] }],
  },
];

function Frame({ children }) {
  return (
    <div style={{
      position: 'relative', width: W, height: H, borderRadius: 44, overflow: 'hidden',
      background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.14), 0 30px 80px -40px rgba(0,0,0,.45)',
    }}>{children}</div>
  );
}

/* the dock is the way back out, and inventory is a dock surface, so it is the
   library glyph that carries it. the tabs this version does not ship stay
   ghosted through the `soon` prop rather than being invented. */
function DockRail({ P }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 22, display: 'flex', justifyContent: 'center', zIndex: 6 }}>
      <P.Dock active="library" soon={['friends', 'settings']} />
    </div>
  );
}

/* the shelf. the thing it handed you is the row title, what you asked for sits
   under it quietly, and the newest delivery is given the most room. tapping a
   row lets the companion say why it brought that one. */
function Shelf({ P }) {
  const [opened, setOpened] = React.useState(false);
  const [said, setSaid] = React.useState(null);
  const shelf = opened ? SEALED.concat(HAUL) : HAUL;

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '54px 22px 116px' }}>
        <P.ScreenHeader label="inventory" title="what Sol brought" />

        {!opened && (
          <div style={{ marginTop: 20 }}>
            <P.SealedNote by="Sol" count={SEALED.length} onOpen={() => setOpened(true)} />
          </div>
        )}

        <P.Section label="on the shelf" style={{ marginTop: 22 }}>
          {shelf.map((d, i) => (
            <React.Fragment key={d.id}>
              <P.ListRow
                leading={<P.NoteDoc size={22} />}
                title={d.brought}
                sub={d.ask}
                chevron
                last={i === shelf.length - 1 && said !== d.id}

                onClick={() => setSaid(said === d.id ? null : d.id)}
                style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
              />
              {said === d.id && (
                <div style={{
                  padding: '0 15px 13px 52px', font: 'var(--text-speech)', color: 'var(--bubble-ink)',
                  borderBottom: i === shelf.length - 1 ? 'none' : '1px solid var(--row-divider)',
                  animation: 'pgLineIn .34s var(--ease-pop) both',
                }}>{d.line}</div>
              )}
            </React.Fragment>
          ))}
        </P.Section>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 'var(--scroll-edge-h)', background: 'var(--scroll-edge)', pointerEvents: 'none' }} />
      <DockRail P={P} />
    </Frame>
  );
}

/* grouped by the trip that brought them (density law: lists group by trip).
   the trip name is the group label, which is how a delivery gets placed in time
   without a stamp: it belongs to the walk it came off. */
function Trips({ P }) {
  const trips = [];
  HAUL.forEach((d) => {
    let t = trips.find((x) => x.trip === d.trip);
    if (!t) { t = { trip: d.trip, items: [] }; trips.push(t); }
    t.items.push(d);
  });

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '54px 22px 116px' }}>
        <P.ScreenHeader label="inventory" title="every trip, and what it held" />

        {trips.map((t) => (
          <P.Section key={t.trip} label={t.trip}>
            {t.items.map((d, i) => (
              <P.ListRow
                key={d.id}
                leading={<P.NoteDoc size={22} />}
                title={d.brought}
                sub={d.ask}
                chevron
                last={i === t.items.length - 1}
                style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
              />
            ))}
          </P.Section>
        ))}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 'var(--scroll-edge-h)', background: 'var(--scroll-edge)', pointerEvents: 'none' }} />
      <DockRail P={P} />
    </Frame>
  );
}

/* one delivery opened. the thing it handed you is the title of the screen, so
   the answer is the page rather than a field inside it. under it, the things it
   rests on, each one checkable (Finding plus SourceChip), then the companion
   says its piece and the verbs are Keep / Later. */
function Opened({ P }) {
  const d = HAUL[0];
  const [kept, setKept] = React.useState(false);

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '54px 22px 40px' }}>
        <P.ScreenHeader label={d.ask} title={d.brought} />

        <div style={{
          marginTop: 24, padding: '4px 16px 6px', background: 'var(--paper-card)',
          borderRadius: 'var(--section-card-radius)', boxShadow: 'var(--section-card-ring), var(--section-card-shadow)',
        }}>
          {d.rests.map((r, i) => (
            <P.Finding key={i} last={i === d.rests.length - 1} sources={r.sources.map((s) => ({ label: s }))}>{r.text}</P.Finding>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 26 }}>
          <div style={{ flex: 'none' }}><P.Sprite size={56} mood={72} /></div>
          <div style={{ flex: 1, minWidth: 0, font: 'var(--text-speech)', color: 'var(--bubble-ink)', paddingBottom: 6 }}>{d.line}</div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
          <P.Button onClick={() => setKept(true)} style={{ flex: 1 }}>{kept ? 'On the shelf' : 'Keep as a note'}</P.Button>
          <P.Button variant="ghost">Later</P.Button>
        </div>
      </div>
    </Frame>
  );
}

const VARIANTS = { shelf: Shelf, trips: Trips, opened: Opened };

function Inventory({ variant = 'shelf' }) {
  const P = (window.PG || {});
  const need = [P.ListRow, P.SealedNote, P.Finding, P.Section, P.ScreenHeader, P.Dock, P.Button, P.Sprite, P.NoteDoc];
  if (need.some((c) => !c)) {
    return <div style={{ font: '500 13px var(--font-ui)', color: 'var(--text-tertiary)', padding: 40 }}>waking the shelf…</div>;
  }
  const V = VARIANTS[variant] || Shelf;
  return <V P={P} />;
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Inventory });
