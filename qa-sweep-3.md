# QA sweep 3, the html, driven end to end (2026-07-24)

method: the prototype served locally and driven in a real browser, every fix
verified by operating the thing again and reading the result back out of the
rendered dom. static read of flow.jsx alongside, since two of the defects are
only visible in the code (dead branches, a mutated ref).

## what passed

the whole loop, start to finish, on one run: enter through the world, the nag,
the talk opening on the door you came through, silent naming with its
acknowledgment, an ask turning into a two-beat trip offer, the send, the
crossing, the away room routed to the right place with the world one phase
later, the homecoming, the "i have it" prompt, and the handover in the talk
holding what was actually asked for. sound calls fire clean. console clean.

## defects found and fixed

**1. the unnamed agent was already named.** home read "Sol" in display type
while the creature under it was asking to be named. a fallback name pre-empted
the one moment the product is built around. the room now carries no title until
the thing in it has one, the agent is "it" when spoken about, and the dock row
reads "the unnamed one".

**2. the greeting state of the talk was unreachable.** the creature's big,
centred "i am here" presentation keyed off the length of the thread, but every
door into the talk seeds an opening line, so the thread was never empty and the
creature was always in its shrunken corner pose. it now keys off how much the
OWNER has said, so the greeting is the state you actually arrive in.

**3. the thinking dots never cleared after a two-beat reply,** and the second
beat arrived silent. the dots were cleared only on the first beat and the
speech sound only played on the first. every beat now clears and speaks.

**4. sending it out with nothing asked for.** the creature menu and the hold
veil both fired the crossing regardless of whether there was an errand. the
result was a hollow trip, an away room whose status line was a hardcoded lie
about the lantern district, a crossing with no destination, and a homecoming
that handed you a printer you never asked for. that contradicts the errand
ruling at its centre. with no ask, both doors now open the talk and it says
"tell me what to go get first."

**5. any swipe inside a sheet drove the room underneath.** the home room
excluded only the talk and the nav from its swipe handler, and the after room
excluded only the nav, so dragging inside settings, the hold veil, the dock or
(in after) the talk itself would open the nav or ADOPT A NEW AGENT. one shared
guard now covers every surface that can be up.

**6. the eerie credit rendered as an empty box.** the mark in settings was a
truncated fragment of one path with fill:none. it now draws the real house mark
from the brand file.

**7. "settings" was ghosted SOON and live at the same time,** in the same
component: a soon-tagged tab in the dock's tab row, a working row in the list
right under it. the tab is gone, the row is the truth.

**8. "it's friends" read as "it is friends"** once the agent lost its fallback
name. the possessive is built separately now, so an unnamed agent gets "its
friends" and a named one gets "Moss's friends".

**9. the away room carried a stray ring.** a ping ring hovering in mid-air over
the empty spot, left from before the world itself carried the live pin. cut.
the absence is now what it should be: the dent where it usually sits, empty.

**10. the mood drained while you were still at the door.** the neglect timer
ran from mount, so a long look at the entry handed you an agent that was
already spent the first time you met it. it starts once you are inside.

**11. the delivery tag echoed the whole sentence** ("FIND ME A QUIET PLACE TO
WORK") instead of the thing asked for. the stripped ask was already kept on the
agent record and is now what the tag names.

**12. the mood was global, so a new agent inherited the last one's
temperament.** adopting a second creature handed it whatever mood the first one
had been worked into, which is the same break the shared conversation was in
the previous sweep, at the level of the thing the agent-identity law is about.
mood now lives in the agent record beside name, face, form, room and chat.
verified by driving: agent one starts at "awake, listening", four exchanges lift
it to "wide awake", the newly adopted one arrives at "awake, listening" of its
own, and switching back through the dock restores "wide awake".

## found later by keem, driving it himself

**13. the settings and talk sheets had no visible way out.** the grab bar that
closes them sat at paddingTop 26, which put it under the dynamic island where
it could not be seen, so keem opened settings and had to ask how to leave. a
hidden grab bar cannot teach the swipe it is there to teach. both bars now sit
below the status row, darker and wider, so the exit reads.

**14. an unnamed agent's header left a hollow gap.** the ScreenHeader always
rendered its 34px display title line even when the title was empty, so under an
unnamed agent the eye jumped from the small HOME label to the small status with
a blank 34px band between them, which read as a font or a missing element.
keem caught it. the title line now only exists when there is a name to put in
it, and the status closes the gap.

## deleted

the training deck: sixty lines of card-swiping ui behind a state flag nothing
ever set true, plus the twelve pieces of state and two helpers that only it
read. it was unreachable from every surface. the nav row that would open it is
still there and still tagged SOON, which is now the honest state. flow.jsx went
from 813 lines to 782 with twelve fixes added.

## corrected mid-sweep

two things i called defects and was wrong about, recorded because the record
should show the misses too. the talk input looked dead (enter did nothing),
that was the driving harness, not the app, and a real enter keydown sends
correctly. the away room looked empty on first look, which was a screenshot
caught inside the fade-in. and the mood fix looked like it had failed, which
was the browser serving a cached flow.jsx: the runtime fetches the component as
a subresource, so a forced page reload is not enough and a cache-busting query
is needed when driving a change.

## still off, deliberately not fixed

- there is no send control in the talk, only the return key. on iOS the
  keyboard carries it, so this is a prototype-only gap, but anyone judging the
  prototype with a mouse cannot send.
- a long line typed while the agent is unnamed becomes the name, cut at 24
  characters. it is ugly but it takes deliberate abuse to reach.
- the nav rows behind the room are all SOON except the act of closing.
