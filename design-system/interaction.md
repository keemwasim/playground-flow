# interaction, the ruled grammar

extracted from the session of 2026-07-23. this is how the app is operated.
the flow prototype (`../flow.html`) is the running proof of every line here.

## the surface tree, three trees and one principle

**swipe right goes INWARD, the dock goes OUTWARD.** every feature that
ships lands on one of these three, there is no fourth surface.

| surface | job | holds |
|---------|-----|-------|
| the agent (tap / hold) | do things with it | talk, send on an errand, train, touch reactions, giving it things |
| side nav (the room steps aside) | this agent's self | personality, training, standing, the store, marketplace, playground+ |
| dock (grows upward) | your collection | your agents and the switcher, friends, inventory, the room, settings |

## the gestures

| gesture | what happens |
|---------|--------------|
| swipe up | the talk |
| swipe right | the room steps aside, its self behind it |
| swipe left | a new agent is adopted, its room becomes yours |
| swipe up on the dock | the dock grows into your collection |
| tap the creature | its menu |
| hold the creature (500ms) | the room mists over, its actions float as giant words |
| swipe down | any risen surface leaves |
| tap the world (entry) | the world engulfs the screen and you pass through |

no back buttons. no tab bar labels. the drawer handle on the left edge is
the only affordance that teaches a swipe, and it is 4px wide.

## the two engulfs

globe transitions live in exactly TWO places: the entry (tap the world,
pgEngulf to 5.6, wall to wall, you land at home) and the crossing (the
world swells, the creature dives in, the takeover carries you to the away
room). the return (pgReturn) is CUT from the flow. a transition that plays
anywhere else is a defect.

## the talk is the app's only text surface

- naming happens here and nowhere else: while unnamed, whatever you type IS
  the name, taken silently, no bubble and no reply.
- talking is training. a statement gets an acknowledgment in the agent's
  voice, and the backend keeps it.
- an ask-shaped line becomes an errand: the agent offers to go, and the
  offer is the only button on the surface.
- it thinks before it answers (a three dot bubble, duration scaled to your
  line), and it notices you typing (a smaller thought beside it).
- the sheet closes on the whole top strip, or a swipe down.

## the errand ruling

a trip is an errand. you ask in the talk, it goes, it comes home and HANDS
you what you asked for. this is not research: no findings, no citations, no
sources, no library of quotes. demo content is lived-world (a place, a
person, a price), never archives or papers.

## time, the world's own clock

playground does not run on the owner's clock. the companion does not
experience hours the way the owner does, and the world CHANGES whether or
not anyone is watching.

the world moves through phases (day, dusk, night, dawn). each phase changes
the sea, the glow, the saturation, and how many lights are lit on the land.
a crossing costs the world time: it is later there when the agent lands.

- the phase is passed in, never read from the device clock. the server owns
  world time.
- absence, waiting and return are felt by the world visibly moving.
- BANNED: timestamps, relative time ("2h ago"), countdowns, progress bars,
  percentages, spinners. the world tells the time by looking different.

## sound

every interaction sounds, near-silently. eight event sounds plus four
interaction voices, all specified in `sound.md`, prototyped in `sound.js`.
silence is still the default state of the room.

## states in world words

no "error", no "offline", no "retry". the world behaves like a place:
the world is far away right now (no connection) · the agent reports its own
failure with its next move in hand (the errand came back empty) · the world
is asleep, it will wake (the server is down).
