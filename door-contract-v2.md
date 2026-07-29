# the door contract, v2

date: 2026-07-25
audience: the engineer building playground's backend
status: spec. the frontend seam already exists and is named `agentTurn` in
`flow.jsx`. v1 of this contract is what that function returns today. v2 adds the
companion layer.

This is the marriage line. Everything above it is the app and it is built.
Everything below it is yours. Nothing in the app reads your text for meaning, it
plays your beats in order.

## 0. the ruling that shapes all of this

Keem, 2026-07-25: the companion is a **lite** feature. Its job is to keep
someone in the harness on a day they have no task. **Playground stays useful
regardless.** The errand is the product. It is what the room is for on a day
nothing needs fetching.

Everything below follows from that. If a decision would make the companion the
centre, it is the wrong decision.

## 1. the shape

One call. The app sends a turn, you stream back beats.

```
POST /turn
{
  agentId, ownerId,
  said: "find me someone to cut my trailer",   // exactly what the owner typed
  surface: "talk" | "hold" | "nag"             // which door they came through
}
```

You return an ordered stream of beats. The app renders each as it arrives and
does not wait for the stream to finish.

## 2. the beats

Four shapes. The app renders all of them today.

```
{ t: "doing",    text }        what it is doing RIGHT NOW, in its own words.
                               shown live, replaced by the next beat. never a
                               spinner, never a percentage.

{ t: "say",      text, go? }   it speaks one line. `go: true` marks the line
                               that carries the crossing offer.

{ t: "need",     text }        it stops and asks for the ONE thing it is
                               missing, then waits.

{ t: "failed",   text }        it could not. in its own voice. not an error,
                               not a code, no retry button.

```

Four shapes, not five. There is no new beat in v2, and section 4 says why.

Plus one field on the turn itself:

```
{ kind: "errand" | "talk", beats: [ ... ] }
```

Two words the app already uses. `errand` means the work needs a crossing, so
the app plays the beats, shows the crossing, and expects a delivery later.
`talk` is everything else.

## 3. errand turns

Unchanged from v1, stated so this is one document. This is the product.

An errand ends in a delivery, posted back whenever it is ready:

```
POST /delivery
{
  agentId, errandId,
  asked:  "someone to cut my trailer",   // the stripped ask, not the sentence
  thing:  "Vess",                        // the name of what it found
  because:"she cuts, she is good, and she owes me a favour.",
  place:  "the cutter"                   // where it came from
}
```

Rules the app enforces and you must respect:

- The thing is always lived-world: a person, a place, a price. Never a
  citation, a source, a document, a link list.
- No timestamps, countdowns, relative time or progress in any field. The world
  runs on its own clock. Ruled law, not preference.
- An errand may fail. `failed` is a first-class outcome, not an exception.

## 4. talk turns, the lite layer

The other kind of turn. It goes nowhere, and most of the time it says nothing.

**It is quiet by default.** It speaks only when called on, or when it has
something worth the interruption: something it noticed, something it remembers,
one thing worth doing. One sentence, two at most. **Most talk turns return zero
`say` beats.** What the owner said is the point. The reply is the exception. If
the model wants to answer every line, the gate is wrong.

**Lite means lite.** This is the part that keeps it a feature and not a second
product:

- No journal screen. No entry list, no calendar, no search over entries. What
  was said lives in the talk, which already scrolls.
- No streaks, no reminders to write, no daily prompt, no empty state nudging
  someone to open up. The nag asks for a name once and settles. Nothing else in
  this app ever asks for a session.
- No mood tracking, no charts, no summaries of the week. Whispers, not
  dashboards.
- Cheap. A turn that returns nothing costs almost nothing. Do not route every
  idle line to a large model.

**No new beat, and that is deliberate.** An earlier draft of this spec invented
a five-field structured beat for the agent to lay out what happened, what it
knows, what it is assuming and what to do next. That is a form. Rendering it
would put a small dashboard inside the talk, which the doctrine bans outright,
and it would make the agent sound like software the moment it mattered most.

The discipline survives. It is a rule on what a `say` beat may claim, enforced
on your side:

- It may say what the owner told it.
- It may say what it noticed or remembers.
- It may say one thing worth doing.
- **It may not say what another person thinks, feels or intends.** Ever. If the
  model produces a claim about someone else's inner state, that turn does not
  ship. Say the observable thing instead, or say nothing.

Two sentences from the agent that hold those lines are worth more than a card
with five labelled fields, and cost the owner nothing to read.

**The safety route is deterministic and lives in your layer.** Self-harm, abuse,
danger and crisis exit the personality entirely and return a plain, serious
support surface BEFORE any model reply runs. A classifier and a hard branch, not
a line in a system prompt. The app renders what you send, so if this leaks it
ships. Not therapy, not diagnosis, never framed clinically.

## 5. what it remembers, the graph

The graph exists to make **errands** better. That is its justification. It is
not a journal database that errands happen to read.

An errand agent with no memory of the owner is a search box with a face.

```
node   person   { name, howKnown, lastMentioned }
node   place    { name, kind, whyItMatters }
node   thing    { what, fromErrandId }      // everything it has handed over
node   thread   { about, open: bool }       // something the owner is carrying

edge   mentioned(entry -> person|place|thread)
edge   delivered(errand -> thing)
edge   about(thread -> person|place)
```

- Talk turns fill it inward. Errands query it outward and add to it.
- The owner never edits it directly. There is no graph screen and there will
  not be one. It surfaces only as the agent knowing things.
- `open: false` on a thread is set by the model when something reads as
  resolved, and is reversible. Nothing is deleted by inference, only by the
  owner.

Worked example, and the test for whether the graph is earning its place: the
owner mentions the flat is too loud. Weeks later they ask for somewhere quiet to
work. The errand should already know what quiet means to this person. If a graph
change does not eventually improve a delivery, it does not belong in the graph.

## 6. training

The signal already exists in the app and is wired.

On every delivery the owner may answer `that's it` or `not that`. The same two
answers apply to anything the agent says on a talk turn.

```
POST /signal
{ agentId, ref: errandId | turnId, verdict: "right" | "wrong" }
```

- Training adjusts what it reaches for. It never rewrites who it is.
  Personality is given once at adoption as an expectation and the agent grows
  past it on its own out in the world. It can even go wrong. The owner trains,
  never edits.
- A `wrong` on a delivery moves where it looks next time. The app already says
  so in its voice, *noted, i'll look somewhere else next time*. Make that true.

## 7. what the app guarantees you

So you can build against this without reading the frontend:

- The app never parses your text for meaning. It renders beats.
- The app never invents a beat you did not send.
- The app owns naming, mood, sound, the crossing and every surface. You own
  what the agent decides and what it remembers.
- Latency is yours to spend. `doing` beats exist so a long turn reads as
  something alive working rather than as waiting.

## 8. open, and deliberately not decided here

- **Local versus server.** The Yap product truth locks local-first with no
  accounts. Playground has sign in with apple and a subscription. Both cannot be
  true. Rule it before the graph is built, it constrains memory and sync
  forever.
- **The kill test.** Yap's own notes say nothing beyond a kill test should be
  built and none has ever been run. Dot shipped this category with beautiful
  design and heavy press and died at roughly 24,500 lifetime downloads. The
  errand loop is the sharp demoable first moment Dot never had, which is the
  argument for shipping errands first and the rest behind them. It is
  not an argument for skipping the test.
