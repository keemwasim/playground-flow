// React is provided by the loader (DC x-import), no import, no bundler. See design-system/README.

/* THE ROOM, the companion's own space, reached from the dock.
   It is a PLACE, not a panel: no header, no rows, no list of properties. The
   room is drawn as architecture (a wall, a floor, the light it keeps) and the
   companion lives inside it, so opening the room is walking in on it rather
   than opening its file.

   Three directions, one room, drawn by the same shell:
     1 the quiet room, a faint porcelain room around the companion
     2 its things, arranged, what it has been given and what it brought home
     3 the window, a way to look at the world set into the wall

   Everything here composes the ruled components off window.PG (Sprite, NoteDoc,
   FriendDiamond, Dock). Nothing new is drawn that the system already ships, and
   every value binds to a named token: greyscale chrome, world imagery only
   inside the window. */

const W = 320, H = 680;
const FLOOR = 0.66;                  /* where the wall meets the floor, as a fraction of H */

/* the room light, one soft source from the upper left. porcelain steps only,
   the ramp does the falloff so no ad-hoc grey is needed. */
const WALL_LIGHT = 'radial-gradient(120% 86% at 26% 4%, var(--porcelain-0) 0%, var(--porcelain-1) 52%, var(--porcelain-2) 100%)';
const FLOOR_TONE = 'var(--porcelain-3)';
const POOL = 'radial-gradient(ellipse at 44% 4%, var(--porcelain-1) 0%, transparent 74%)';

/* the ruled bodies: a pebble stands 0.82 of its size, an inkling 0.96. the
   companion has to stand ON the floor line, never near it. */
const standH = (size, form) => size * (form === 'inkling' ? 0.96 : 0.82);

function Wall() {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: H * FLOOR, background: WALL_LIGHT }} />
      {/* the floor, one porcelain step down from the wall, with the light lying on it */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: H * FLOOR, bottom: 0, background: FLOOR_TONE }}>
        <div style={{ position: 'absolute', left: '-14%', right: '-14%', top: '-18%', height: '150%', background: POOL }} />
      </div>
      {/* where wall meets floor. a hairline is the whole join, the room is not outlined */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: H * FLOOR, height: 1, background: 'var(--divider)' }} />
      {/* the corner the wall turns at, felt rather than drawn */}
      <div style={{ position: 'absolute', right: W * 0.17, top: 0, width: 1, height: H * FLOOR, background: 'var(--divider)', opacity: .6 }} />
    </React.Fragment>
  );
}

/* the owner's word for whose room this is. the name is identity, not a caption:
   it is the only text the room carries. */
function Nameplate({ name }) {
  return (
    <div style={{ position: 'absolute', left: 'var(--screen-margin)', top: 'var(--safe-top)', font: 'var(--text-sheet-title)', letterSpacing: '-.01em', color: 'var(--text-primary)' }}>{name}</div>
  );
}

/* the dock is the way out of the room and the way back to it (the dock is
   BACK, keem 2026-07-23). the room is not one of the four tabs, so nothing
   here is active: the room sits above the dock's collection, not inside it. */
function RoomDock({ P }) {
  if (!P.Dock) return null;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'var(--safe-bottom)', display: 'flex', justifyContent: 'center', zIndex: 'var(--z-dock)' }}>
      <P.Dock tabs={['home', 'friends', 'library', 'settings']} active="" soon={['friends', 'library', 'settings']} />
    </div>
  );
}

/* a plank of paper, the one raised surface the room is allowed. its things sit
   ON it, they are never listed in it. off the wall it floats, on the floor it
   only makes contact. */
function Ledge({ left, width, top, floating = true, children }) {
  return (
    <div style={{ position: 'absolute', left, width, top }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 11, display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)', padding: '0 var(--space-4)' }}>{children}</div>
      <div style={{ height: 11, borderRadius: 'var(--radius-chip)', background: 'var(--paper-card)', boxShadow: floating ? 'var(--paper-ring), var(--shadow-element)' : 'var(--paper-ring), var(--shadow-contact)' }} />
    </div>
  );
}

function Room({ variant = 1, name = 'Sol', faceIdx = 0, mood = 46, form = 'pebble' }) {
  const P = window.PG || {};
  const v = Number(variant) || 1;
  const Sprite = P.Sprite;
  const NoteDoc = P.NoteDoc;
  const FriendDiamond = P.FriendDiamond;

  /* 1, THE QUIET ROOM. the room is the whole idea: air, one light, and the
     companion keeping it. nothing to read, nothing to operate. */
  const quiet = (
    <div style={{ position: 'absolute', left: 0, right: 0, top: H * FLOOR - standH(116, form), display: 'flex', justifyContent: 'center' }}>
      {Sprite && <Sprite size={116} faceIdx={faceIdx} mood={mood} form={form} />}
    </div>
  );

  /* 2, ITS THINGS, ARRANGED. what it brought home and who it knows, set down
     the way a person sets things down, not the way a list holds them. */
  const things = (
    <React.Fragment>
      {/* the shelf, what it keeps: notes it brought home and one it met out there */}
      <Ledge left={W * 0.11} width={W * 0.47} top={H * 0.38}>
        {NoteDoc && <NoteDoc size={26} style={{ transform: 'rotate(-7deg)' }} />}
        {NoteDoc && <NoteDoc size={26} style={{ transform: 'rotate(2deg)', marginLeft: -11 }} />}
        {NoteDoc && <NoteDoc size={26} style={{ transform: 'rotate(9deg)', marginLeft: -9 }} />}
        {FriendDiamond && <FriendDiamond size={18} style={{ marginLeft: 'var(--space-1)' }} />}
      </Ledge>

      {/* two more leaning on the wall under the shelf, where they ran out of room */}
      {NoteDoc && (
        <div style={{ position: 'absolute', left: W * 0.13, top: H * FLOOR - 36, display: 'flex', alignItems: 'flex-end' }}>
          <NoteDoc size={28} style={{ transform: 'rotate(-6deg)' }} />
          <NoteDoc size={28} style={{ transform: 'rotate(5deg)', marginLeft: -12 }} />
        </div>
      )}

      {/* one it has not put away yet, lying flat on the floor where it was handed over */}
      {NoteDoc && (
        <div style={{ position: 'absolute', left: W * 0.19, top: H * FLOOR + 44, transform: 'rotate(-11deg) scaleY(.4)' }}>
          <NoteDoc size={44} />
        </div>
      )}

      <div style={{ position: 'absolute', right: W * 0.13, top: H * FLOOR - standH(104, form) }}>
        {Sprite && <Sprite size={104} faceIdx={faceIdx} mood={mood} form={form} />}
      </div>
    </React.Fragment>
  );

  /* 3, THE WINDOW. a way to look at the world, set into the wall of the room.
     the world keeps its color because the content IS the world, the rest of
     the room stays greyscale and the spill on the floor is porcelain light. */
  const window3 = (
    <React.Fragment>
      <div style={{ position: 'absolute', left: '50%', top: H * 0.19, transform: 'translateX(-50%)' }}>
        {/* the reveal, the thickness of the wall the window is cut through */}
        <div style={{ padding: 9, borderRadius: 'var(--radius-pill)', background: 'var(--paper-card)', boxShadow: 'var(--paper-ring), var(--shadow-element)' }}>
          {P.World && <P.World size={140} depth="Overnight" souls={2} base="design-system/assets" />}
        </div>
      </div>

      {/* the sill, tucked under the window, and the note it left on it */}
      <Ledge left={(W - 190) / 2} width={190} top={H * 0.19 + 156}>
        <div style={{ flex: 1 }} />
        {NoteDoc && <NoteDoc size={22} style={{ transform: 'rotate(6deg)' }} />}
      </Ledge>

      {/* what the window puts on the floor */}
      <div style={{ position: 'absolute', left: '50%', top: H * FLOOR + 1, width: 260, height: 140, transform: 'translateX(-50%)', background: 'radial-gradient(ellipse at 50% 0%, var(--porcelain-0) 0%, transparent 68%)' }} />

      {/* it stands under the window and looks up into it */}
      <div style={{ position: 'absolute', left: W * 0.15, top: H * FLOOR - standH(96, form) }}>
        {Sprite && <Sprite size={96} faceIdx={faceIdx} mood={mood} form={form} style={{ '--gaze-dx': '4px', '--gaze-dy': '-3px' }} />}
      </div>
    </React.Fragment>
  );

  const inside = v === 2 ? things : v === 3 ? window3 : quiet;

  return (
    <div className="pg-room-porcelain" style={{ position: 'relative', width: W, height: H, borderRadius: 'var(--radius-frame)', overflow: 'hidden', background: 'var(--bg)', boxShadow: 'var(--paper-ring), var(--shadow-panel)' }}>
      <Wall />
      <Nameplate name={name} />
      {inside}
      <RoomDock P={P} />
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Room });
