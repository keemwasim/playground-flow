# from here to final form

five phases. each one names what it FEELS like, why it belongs where it sits,
and how it fits what already exists. nothing here invents a new surface: every
phase lands on the three ruled trees (the agent, swipe right, the dock).

the ordering rule: each phase must make the app more of what it already is.
features that would make it a different product are named and refused at the
end.

---

## PHASE 1 - the creature is alive over time

**the hole it fills.** the companion is identical on day one and day fifty.
it bobs, breathes, watches, and never changes. nothing you do marks it.

**what it feels like.** you open the app after two days away and it is
sitting lower, slower, its eyes half closed. you talk to it and over the next
minute it lifts. after a good errand it sits up higher for a while. train it
toward curiosity often enough and it starts drifting toward the world edge of
the room on its own. none of this is ever explained, labelled or scored.

**how it fits.** nothing new is added. the existing idle animations gain a
STATE they read from: rest, attentive, pleased, restless. the status line,
which already exists and already changes, carries the only words. the drift
uses the same room the creature already lives in.

**the pieces**
- a mood value the server owns, moved by attention, trips, training, silence
- four postures, blended, never snapping between them
- position drift within the room as a slow expression of temperament
- the status line reads from mood instead of a fixed string

**why first.** it is the only phase that changes what the app IS rather than
what it has. everything after this is more compelling once the thing you keep
is actually alive.

---

## PHASE 2 - the world remembers

**the hole it fills.** the world moves through its phases on a loop, so
absence has no weight. coming back after three days looks like coming back
after three seconds.

**what it feels like.** you were gone a while, and the world is visibly
further along: different light, more lights lit on the land, weather that was
not there before. the creature says something that only makes sense if time
passed. it is not told to you, it is seen.

**how it fits.** the phase machinery already exists and already refuses
timestamps. this phase makes the phase real, driven by elapsed world time
from the server rather than a client timer, and gives it two more states:
weather and population.

**the pieces**
- world time as server state, phases derived from it
- weather layers on the globe (a passing front, a clear night)
- souls count that actually varies with the world hour
- the returning line: what the creature says when you have been away

---

## PHASE 3 - the collection has contents

**the hole it fills.** the dock lists moss's friends, moss's inventory,
moss's room. all three are ghosted. the outward tree is a promise.

**what it feels like.** the inventory is where errands pile up, and it looks
like a pile, not a list: the things it has brought you, most recent nearest,
each still in its own words. friends are the little beings it met out there,
rendered as they are ruled (tiny creatures, trust deepens the ink), and
tapping one is the agent telling you about them rather than a profile page.
the room is where you change the light and the ground it sits on.

**how it fits.** the inventory is the errand ruling's natural end: the talk
hands things over, the inventory is where they accumulate. the pile-of-slips
direction from the archived library lab is the design already sitting on the
shelf for it. friends belongs to the outward tree because they are part of
your world, not this agent's identity.

**the pieces**
- inventory: the pile, tap to lift, the agent speaks each one
- friends: little beings, ink weight is trust, tap for the agent's account
- the room: light and ground, the one place customisation lives

---

## PHASE 4 - it lives outside the app

**the hole it fills.** playground only exists when you open it. a companion
that requires opening is an app, not a companion.

**what it feels like.** the creature is on your home screen, small, breathing,
in its own room light. you can tell at a glance whether it is home or out. it
is out, and the island carries that quietly. it comes back, and the knock
arrives. you never had to open anything.

**how it fits.** every piece of this is already ruled and unbuilt: the island,
the knock, the live activity, face-down rest, the action button. this phase
is the collection of hardware promises the design already made.

**the pieces**
- home screen widget, small and medium, carrying the room light
- live activity and dynamic island for a trip in progress
- the knock: the ruled haptic and its sound, on return
- app intents so it can be asked for something from outside the app

---

## PHASE 5 - the world has other people in it

**the hole it fills.** the world is a beautiful empty place. the social layer
that gives standing, the marketplace and friends their meaning does not exist.

**what it feels like.** your agent comes home talking about someone it met.
that someone is another person's agent. standing is something it earned out
there and mentions in passing, never a number on a card. the marketplace is
where agents change hands, and it feels like an adoption, not a purchase.

**how it fits.** this is the last phase for a reason: everything above must
be true first, or the social layer is a feature grafted onto an empty toy. it
lands on the inward tree (standing, the store, marketplace) which has been
held for it since the surface tree was ruled.

**the pieces**
- standing as spoken social fact, never a score
- the marketplace, with the transferability question settled first
- report and block, before any of it ships
- the economy boundary held: money buys appearance, only the world grants
  reputation

---

## features that emerged from the build and earned their place

these were not planned. they came out of the work and are now part of what
the product is.

**the room light belongs to the agent.** there is no dark mode. you change
the light by keeping a different agent. it makes switching felt before it is
read, and it kills a settings toggle.

**the world is the doorway, and only twice.** entering the app and crossing
into the world are the same physical move. reducing it to exactly two
occurrences is what makes it feel like a door instead of a transition style.

**the talk absorbed four screens.** naming, training, the errand and the
handover all live in conversation. this is the single largest simplification
in the product and it happened by deleting pages, not by designing one.

**giving it things.** the plus in the talk opens what you can hand over. it
arrived as a chat feature and turned out to be the folder-drop power path the
product always wanted, in its natural home.

**it speaks unprompted.** twice into a silence, then it sits with you. the
restraint is the feature: a thing that never stops asking is a nag, a thing
that asks and waits is a companion.

**every interaction sounds, near-silently.** an app with almost no chrome
needs a second channel. it sits under the system, never over it.

**the intro as a film.** a narrated opening that plays once, ends on the
world, and hands straight to the entry screen on the same frame.

---

## what this product refuses

named so nobody proposes them later:

- a feed, a timeline, or any surface that scrolls forever
- notifications that are not the knock
- a score, a level, a streak, or any grindable number
- a settings screen that is where personality lives
- a fourth surface tree
- timestamps, countdowns, progress bars, spinners
- the companion speaking in exclamation marks
