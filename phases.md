# the five phases

**the ordering rule: a phase ships only if the app is more ALIVE after it than
before. capability waits behind life.**

that rule is why the moods phase precedes the world phase, and why the widget
comes near the end. an app that lives on your home screen but has nothing
living in it is a shortcut with extra steps.

---

## v1 · THE BOND — finish this build

**state: substantially shipped.**

| piece | state |
|---|---|
| the away room carrying visible time | DONE, the world turns there on its own clock |
| the errand actually delivered | DONE, it returns holding the thing and hands it over |
| the account layer | DONE, one sheet: the knock, sound, restore, privacy, terms, sign out, delete everything |
| the intro film | narration auditioned, picture rejected once and regenerating |

**what remains:** pick the narrator take, land a film that respects the
constraints, and cut it to the voice.

---

## v2 · THE CREATURE HAS MOODS

**state: shipped, and it changed the product.**

the phase that turns a beautiful object into a companion. one value, 0 spent
to 100 restless. the owner never sees a number.

**what carries it:** breath (7.4s spent, 3.2s restless), bob height and pace,
how open its eyes are, how high it sits, how far it leans, and how fast it
answers. transitions run 2.4s so a change is felt rather than watched.

**what moves it:** being spoken to lifts it. being named lifts it hard.
finishing an errand lifts it most. silence lowers it, slowly, so neglect is
felt across a session rather than punished in a minute.

**where it shows in words:** the status line, and only there. gone quiet,
resting, awake and listening, wide awake, wants to go out. no labels, no
meters, no score.

**zero new surfaces.** every effect rides animations that already existed.

**what would deepen it:** neglect that survives closing the app, and a
temperament that biases the resting mood so a curious agent sits differently
from a gentle one.

---

## v3 · THE WORLD IS SOMEWHERE

**state: next.**

sending it out currently means sending it away. this phase makes it sending it
SOMEWHERE.

**what it feels like.** you send it, and on the globe a pin lights where it is
going, with an arc drawn from home. while it is away the pin moves. it comes
back and mentions the place by name, and next time you see that pin you know
what happened there. other beings appear as tiny marks on the world, some
faint, some inked in, depending on whether your agent knows them.

**how it fits.** the reference for this already exists in the Globe Concept
board: pins, trip arcs, named inhabitants. the globe component already carries
lights and phases. the away room already shows the world. this phase connects
them.

**the pieces**
- pins on the world, one per known place
- the trip arc, drawn on send, travelled while away
- other beings as marks, ink weight equals familiarity
- the returning line names the place

---

## v4 · OTHERS

**state: after v3.**

the ghosted rows fill in, one at a time, never all at once.

**the order and why:** inventory first (it is the errand ruling's natural
end and its design already exists as the pile of slips). then friends, because
by v3 the agent will have met some. then standing, spoken first person, never
a number. then the store. the marketplace last, because transferability is an
unsettled question and shipping it early would settle it by accident.

**the boundary that must hold:** money buys appearance and never reputation.
only the world grants standing.

**what must ship alongside, not after:** report and block. a social layer
without them is negligence.

---

## v5 · IT LIVES ON THE PHONE

**state: last, deliberately.**

it stops being something you open.

**what it feels like.** the creature is on your home screen, small, breathing,
in its own room light, and you can tell at a glance whether it is home or out.
it goes out and the island carries that quietly. it comes back and the knock
arrives, hand first. you ask it for something without opening anything.

**how it fits.** every piece here is already ruled and unbuilt: the island,
the knock, the live activity, face-down rest, the action button.

**why last.** the widget is a window onto the creature. the window is only
worth building once there is something behind it worth glancing at, which is
what v2 and v3 produce.

**the pieces**
- home screen widget, small and medium, carrying the room light and the mood
- live activity and dynamic island for a trip in progress
- the knock, the ruled haptic and its sound
- app intents so it can be asked from outside the app

---

## what is missing that nobody has named

these are not phases. they are holes that will hurt if they stay open.

1. **nothing persists.** close the app and the agent forgets its name, its
   mood, its errands. the entire bond is session-scoped. this is the single
   most important missing piece and it is not a design problem, it is the
   first thing the backend must hold.

2. **the second agent is a costume.** it has a face, a room and a name, and
   shares one conversation with the first. two agents must mean two
   relationships or the feature is a lie.

3. **the first real errand has never run.** every delivery is written by us.
   the product rests on a real ask returning something genuinely useful, and
   that has not been tested once.

4. **there is no way to say no.** it offers a trip, it offers to introduce
   you. there is no designed decline. a companion you cannot refuse is a
   telemarketer.

5. **there is no undo.** you cannot rename, release, or retire an agent.
   adopt six and you live with six.

6. **error recovery is drawn but not wired.** the states lab has the world
   words for no connection, a failed errand and a sleeping world. none of the
   three is connected to anything.

7. **accessibility has not been designed.** the product is gesture-first with
   almost no labels, which is the hardest possible starting point for
   VoiceOver. it needs a pass, not an audit at the end.

8. **onboarding assumes the intro carries it.** if the film is skipped, a
   first-time owner sees a world and a creature that asks to be named, and
   nothing explains the crossing. that may be correct. it has never been
   tested on a person who has not seen it before.
