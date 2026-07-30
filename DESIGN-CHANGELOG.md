# design changelog

every design decision that changes the product, newest first. an entry
records WHO decided it, HOW the decision was reached, WHAT changed, WHY, and
WHERE the proof lives, so a choice can be re-read years later without the
people who made it.

**who** — the seat that held authority for that decision.

| seat | authority |
|------|-----------|
| design lead | creative authority. what the product is, what it looks like, what ships. the only seat that accepts or rejects a look. |
| design system | technical authority. implementation, consistency with the tokens, verification that a claim is true. never decides the look. |

**how** — the mechanism that produced the decision.

| mechanism | meaning |
|-----------|---------|
| ruled | the design lead decided directly, no options needed |
| rejected then rendered | a surface was rejected, operable alternatives were built, one was picked or hybridised |
| reframe | a change to what the product IS, invalidating surfaces downstream |
| technical correction | a defect found by verification, fixed without a creative decision |
| extracted | an existing pattern promoted to a rule that binds future work |

rulings that constrain future work are marked **LAW**.

---

## v5 - the flow reduced, the agent made individual

### minds and runtimes: three directions, awaiting judgement
**who** design system · **how** rejected then rendered (the pick is the design lead's)

**what.** three directions built for the minds screen (the grouped list, the
connect flow, connected minds as chips), two marks held constant across all
three so the pick is about layout and not about the marks. in use is an INK
RADIO, never a checkmark: connected but idle is the bare ink ring, in use fills
it, reaching holds it at half ink. connecting is a SHIMMER WHISPER in the
agent's own voice, never a spinner, a bar, or a percentage.

**why.** a checkmark says done and put away, which is wrong twice: getting a
runtime is not an achievement, and a check on three rows reads as three minds
thinking at once. exactly one mind is ever in play, and a radio is the only mark
that says so. the spinner was already banned by the time ruling, the wait had
nothing to say it with.

**proof.** `minds-lab-3up.html` (three directions at 320 by 680, live),
`minds.jsx`, tokens `--radio-*` and `--whisper-shimmer*`.

### the flow: nine surfaces to five
**who** design lead · **how** ruled, surface by surface, over one working session

**what.** four pages removed: home-empty, personality, the homecoming, and
findings. the journey is five beats: the entry, home together, the crossing,
home while away, after.

**why.** each removed page turned out to be doing a job something already in
the app could do better. naming and personality belong in conversation. the
homecoming is a transition, not a destination. findings were rejected in
three separate formats before the surface itself was found to be the problem.

**proof.** `flow.html`, beats 01 to 05.

### the errand ruling **LAW**
**who** design lead · **how** reframe

**what.** a trip is an errand. the owner asks in conversation, the agent
goes, it comes home and hands over what was asked for. the product is not a
research tool: no findings, no citations, no sources, no library of quotes.

**why.** the research framing was generating surfaces nobody wanted (a
findings page, a library) and a vocabulary that read academic rather than
lived. the reframe invalidated both in a single sentence.

**proof.** `design-system/interaction.md`, the errand ruling.

### time: the world runs on its own clock **LAW**
**who** design lead · **how** ruled

**what.** the world moves through phases (day, dusk, night, dawn), each with
its own sea, glow, saturation and lights across the land. a crossing costs
the world time. banned everywhere: timestamps, relative time strings,
countdowns, progress bars, percentages, spinners.

**why.** the companion does not experience hours the way the owner does. a
world that visibly changes carries absence and return better than any
elapsed-time string can, and it keeps clock chrome out of a product that has
almost no chrome.

**proof.** `components/Globe.jsx` PHASES, `interaction.md` time section.

### the agent is an individual **LAW**
**who** design lead · **how** ruled

**what.** an agent record carries name, face, form and room. FACES holds four
individuals of one family (eye spacing, size, lid height and body silhouette
differ). ROOMS holds the light an agent keeps: porcelain, night, dusk. the
light is applied per room, never globally, and there is no app-wide dark
mode setting.

**why.** switching agents should be felt before it is read. a second creature
that looks identical in an identical room is a list item, not a companion.

**proof.** `design-system/agent-identity.md`, `components/Sprite.jsx`.

### the surface tree **LAW**
**who** design lead · **how** extracted, then amended once in place

**what.** three surfaces, one principle: swipe right goes inward (this
agent), the dock goes outward (everything you have). the agent itself is
where you do things with it. every future feature lands on one of the three.
there is no fourth surface.

**why.** without a rule, each new feature invents a screen. the tree makes
the answer to "where does this go" mechanical. the amendment moved friends
and inventory outward once the inward/outward principle was named.

**proof.** `interaction.md`, the surface tree.

### navigation: the room steps aside
**who** design lead · **how** rejected then rendered

**what.** the side drawer was replaced. the room itself is now a card that
slides aside, revealing what was behind it. holding the creature mists the
room and floats its actions as words.

**why.** the drawer was a flat panel covering the room and connected to
nothing. four operable alternatives were built and two were kept for
different jobs.

**proof.** `flow.html`, swipe right and hold the creature.

### the talk absorbs four screens
**who** design lead · **how** ruled, then technical correction

**what.** conversation now carries naming (silently, whatever is typed is the
name), training, the errand offer, and the handover. the agent thinks before
answering and notices the owner typing.

**why.** each of those was a page. together they are one surface that already
had to exist. the naming exchange was later removed from the transcript
entirely: naming is not a conversation.

**proof.** `flow.html`, swipe up on home.

### the world became the doorway
**who** design lead · **how** ruled

**what.** the globe gained a cloud deck on its own rotation, islets, polar
caps, sun glints, ping rings and an atmosphere rim. globe transitions were
reduced to exactly two: the entry and the crossing, both filling the frame
edge to edge.

**why.** the world is the product's only colour and its only door. the
transitions were appearing in places where nothing was actually being
crossed, which cheapened them.

**proof.** `components/Globe.jsx`, `tokens/motion.css` pgEngulf.

### sound
**who** design lead ruled that it exists · design system specified and built it

**what.** twelve voices: eight events and four near-silent interaction
sounds. every one has a haptic sibling and the product is complete on a
muted phone.

**why.** an app with almost no chrome needs another channel to confirm
action. it has to sit under the system, never over it.

**proof.** `design-system/sound.md`, working prototype in `sound.js`.

### typography and weight
**who** design lead flagged it · design system executed the sweep

**what.** 400 weight retired from running text, floor is 500. agent speech
set at reading weight, not caption weight. one mono size for backend labels
and SOON tags.

**why.** secondary text read thin against the porcelain ground, and the
agent sounded like chrome instead of a person.

**proof.** `tokens/typography.css`.

### unbuilt destinations are visible
**who** design lead · **how** ruled

**what.** friends, settings, the store, marketplace, playground+, inventory
and training render ghosted with a mono SOON tag in their assigned place.

**why.** hiding them loses the map. showing them ghosted keeps the shape of
the product legible and stops new surfaces being invented for them later.

**proof.** `flow.html`, the side nav and the dock.

### defects found by verification
**who** design system · **how** technical correction

**what.** three fixed: a hooks-order crash that took the prototype down, an
input the runtime had silently unwired so conversation could not be sent,
and a scroll handler that opened conversation on entry.

**why.** all three were found by operating the interface rather than reading
the code. none required a creative decision.

**proof.** `flow.html`, current build.

---

## v4 and earlier

see `design-system/CHANGELOG.md` for the token and component record.
