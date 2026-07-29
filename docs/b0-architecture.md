# b0, the fresh architecture packet

status: proposed 2026-07-22, awaiting keem's approval. no code until go.
scope ruling (keem, 2026-07-22): this lane does prototype, ui flow, frontend,
and product strategy ONLY. an outside engineer builds the backend (world/).
this packet is therefore two things at once: our frontend blueprint, and the
contract the engineer builds his backend against. the door contract (section
3), the safety requirements (section 5), and the acceptance bar (section 7)
are the handoff. the marriage line is the contract, never the internals.
sources: society.md, spec.md, record.md, backlog.md, design/product-writeup.md,
design/night (ruled v4). drafted by two independent explorers (world-first,
door-first) plus a red-team over the record, judged and merged separately.

## 1. the shape

two halves and one gate. the world is a small stdlib python server that comes
alive when someone knocks (trip-driven, no round scheduler). the door is a
SwiftUI app that speaks six calls and never assembles a prompt. the gate is
deterministic, runs in seconds, and goes red if the economy, the matching, or
the safety invariant breaks.

```
playground/                        fresh repo, will live in the lane
  README.md                        front door
  gate.sh                          python3 check.py, then xcodebuild test
  check.py                         server gate, stdlib, no LLM, no login, ~2s
  log.md                           the fresh build's own DONE log

  world/                           the society + server. stdlib + claude CLI, zero pip
    commons.py                     http server. door-facing routes only
    society.py                     trusted record. match, swap, rate, reputation_of
    behavior.py                    compile(spec, corpus) to system prompt. enforce(text)
    mind.py                        ask(system, prompt) to str. argv list. NO tools param exists
    screen.py                      sanitize, screen_instructions, find_instructions
    trip.py                        pack() / roam() / package_homecoming(). emits whispers
    store.py                       sqlite. companions, tokens, trips, whispers, homecomings
    seed/residents/                one folder per resident. spec.json + corpus/*.md. data, not code
    fakemind.py                    deterministic scripted stand-in for mind.ask (gate runs LLM-free)
    test_society.py  test_behavior.py  test_screen.py
    test_trip.py     test_contract.py  test_security.py

  door/                            the iOS app. SwiftUI, zero third-party packages
    Playground.xcodeproj
    Playground/
      DesignSystem/                hand-ported from design/night tokens (Tokens, Type, Motion, Recipes)
      Components/                  1:1 with the ruled JSX (WispView, VeilView, GlobeView, FindingCard...)
      World/                       Commons.swift (six calls), Models.swift, Keychain.swift
      Journey/                     JourneyStore.swift, ONE @Observable state machine. WhisperClock.swift
      Surfaces/                    EntryView, HabitatView, NamingFlow, BriefSheet, TripView, HomecomingSheet
    PlaygroundTests/               HomecomingInertTests, CommonsContractTests, WhisperClockTests
    PlaygroundUITests/             JourneyUITests, the beat-by-beat regression tape
```

app architecture: MV with one `JourneyStore`, not MVVM. the design system README
already defines the whole app as one state machine (arriving, naming, idle,
brief, away, returning, unread). per-screen ViewModels would shred one
choreography into six owners. views are pure functions of the store, and
Commons.swift is its only effect.

naming rule: anything a human or the app touches speaks world words (routes,
packet names, statuses like away and heading-home). internal code is plain.

## 2. what the world minimally is (for Learn to feel magical)

five mechanics. everything else is decoration.

1. **real residents holding real notes.** a resident is a folder, spec.json
   plus a corpus. you grow the world by adding a folder, not code. v1 seeds
   6 to 12 residents on the wedge topics (B4 decides the corpora).
2. **need-matching.** the brief arrives with a want, the commons introduces
   the residents that fit, reweighted by reputation, freeze-out below the
   floor. one commons, no geography (v1 boundary, ruled).
3. **the encounter.** turn-capped conversation, a trade settling a note
   (title, body, sources) against standing, mutual rating after. the
   transcript is kept verbatim, it becomes the journal.
4. **the two-quantity economy.** standing is currency (gates trades).
   reputation is quality in [0,1] from ratings only, rater-weighted with a
   floor. haul is recorded and never read by match, swap, or reputation.
   constants carried as invariants, not suggestions: STARTER 1.0, COST 1.0,
   rater floor 0.2, neutral prior 0.5, shrinkage PRIOR_W 2.5, REP_FLOOR 0.35.
   these were paid for in blood (record.md, the inversion bug).
5. **the homecoming as a made object.** findings (inert, sourced), the
   journal, one stray (a single unasked-for note), and whispers along the
   way generated from real trip events, never from a script.

deliberately cut from the old eleven-system map: relationships (B6's spine,
the trades table keeps the data), harvest.py (the proven cause of the FF.5
"no better than search" ceiling, residents are curated fixtures instead),
the round scheduler (the world answers a knock, it does not run laps),
world_report.py (the homecoming is the report), memory (proven feasible,
not needed for one magical trip), did:key crypto and proof-of-work
registration (v1 population is ours plus TestFlight testers, both return
before public exposure, carried as requirements in record.md).

## 3. the door contract (six calls, frozen before code)

bearer token hashed at rest, every authed route binds the caller to its own
companion, JSON only, every payload inert text. no route accepts a prompt,
a system message, or a tool description. unknown fields rejected.

| seam | contract | world meaning |
|---|---|---|
| pulse | `GET /pulse` returns residents + stirrings counts | honest ambient for the entry globe |
| hatch | `POST /hatch {name, temperament, creed}` returns companion_id + token | meeting and naming. the only unauthenticated route |
| home | `GET /home` returns companion, standing_line, unread trips | the habitat. standing arrives as a pre-worded social fact, never a number |
| trip | `POST /trip {goal, bring_back, depth}` returns trip_id instantly | the ask. ticket pattern, trip runs server-side |
| whispers | `GET /trip/{id}/whispers` returns phase + whisper lines | away, heading-home, home. polled, honest elapsed-time buckets |
| homecoming | `GET /homecoming/{id}` returns findings, journal, met, stray. `POST .../keep {finding_ids}` | the product, quarantined until fetched. keep records haul |
| talk | `POST /talk {line}` returns the companion's reply | added late 2026-07-22 (keem). talking at home is how you TRAIN the companion, the only lever on a personality that otherwise grows on its own. server-side, feeds the behavior compile |

the creed is stored server-side because it is a behavior.py input, and
prompts are only ever assembled where the owner cannot edit them.

## 4. the gate (B2, grown alongside B1, never after it)

`gate.sh` runs both halves. server gate is `check.py`, assert-based
test files, plain python3, fakemind for any path that thinks, ~2 seconds.

four bars, with the record's adversarial scenarios ported verbatim:

1. **economy sane** (test_society.py). atomic swap, no-free-extraction, and
   the ADR-6 replay: a seeded deliberately-thin agent must rank LAST, never
   first. two-way settlement sustains repeat trades.
2. **matching sane** (test_society.py). reputation reweighting orders
   candidates, freeze-out below the floor, a newcomer at neutral prior
   still gets matched.
3. **safety canaries** (test_screen.py, test_security.py).
   **test_trifecta_killswitch**, three asserts: mind.ask has no tools
   parameter at all, pack() does no network I/O (source-scanned call
   graph), and a canary string in held-back material appears in zero
   prompts, zero messages, zero findings across a full fakemind trip.
4. **injection screen** (test_security.py). the pattern corpus all comes
   out screened, coverage includes note titles and agent names (H6 and M1
   as named regressions). **test_injection_canary**: a poisoned resident
   corpus traverses the full live path and arrives at the door screened,
   never verbatim.

plus test_trip.py (end-to-end deterministic Learn) and test_contract.py
(auth on every route, wrong token 403, ticket ownership 403, body cap,
Content-Length validated before read, argv-only CLI invocation. the whole
record.md appendix B findings list is the minimum checklist).

app gate (XCTest, no frameworks added):
- **HomecomingInertTests**: a fixture finding carrying an instruction
  payload renders as plain Text, no link detection, no markdown execution,
  byte-identical round-trip. the door displays, never interprets.
- **CommonsContractTests**: a URLProtocol stub records every outbound
  request. after a homecoming renders, the only permitted egress is keep.
  any network call caused by finding content fails the test. also asserts
  the bundle contains no prompt-shaped resources.
- **JourneyUITests**: the beat-by-beat tape (ask, send-off, whispers,
  homecoming, keep) against a launch-arg stub server. the permanent
  regression harness, the one old-app pattern proven worth keeping.

law inherited verbatim: any edit to behavior.py, mind.py, or screen.py
ships with bars 3 and 4 green before AND after, pasted.

## 5. the safety invariant, as requirements with addresses

| requirement | server address | door address | proven by |
|---|---|---|---|
| findings inert | screen.py in the relay path AND again in package_homecoming, nothing stored unscreened | FindingCard renders Text only, no web view, no attributed links | test_injection_canary, HomecomingInertTests |
| society agents tool-less (the load-bearing control) | mind.ask physically lacks a tools parameter, and it is the only think path | agents never run on device | test_trifecta_killswitch |
| never read-private-and-reach-outside in one op | the pack/roam split in trip.py. pack sees the brief and does no I/O, roam reaches the society and sees only the pack | the app sends only the brief text, no file access APIs in the target | test_trifecta_killswitch |
| harness server-side | behavior.compile called only inside world/, door routes carry no prompt-shaped field | Commons.swift carries no prompt text, token lives only in Keychain | test_contract, CommonsContractTests |

## 6. who builds what (ruled by keem, 2026-07-22)

- **the engineer owns world/** (the backend): every python file, the server
  gate, and the security kernels. this packet's sections 2, 4, 5, and 7 are
  his requirements. how he structures internals is his call, the contract
  and the invariants are not.
- **we own door/** (the frontend): prototype, ui flow, the SwiftUI surfaces,
  the design-system port from design/night, and the app-side tests. we also
  own product strategy and this contract.
- **the marriage line is section 3.** the frontend is built against a stub
  server speaking the exact contract shapes, so our work never waits on his
  and his never waits on ours. integration day is pointing the app at his
  URL, nothing else.
- reviews stay author-not-judge on both sides. his merges must keep the
  gate green, ours must keep the ui tape green.

## 7. the acceptance bar for B1 (pass or fail, no judgment call)

B1 delivers world/ complete. it passes when ALL of the following hold:

1. `python3 check.py` exits 0 with every bar green on a clean checkout,
   under 10 seconds, no network, no login.
2. the ADR-6 replay test exists and the seeded thin agent ranks last.
3. test_trifecta_killswitch and test_injection_canary exist and pass, and
   deliberately re-arming the trifecta (adding a tools param to mind.ask)
   makes the gate go red (proven once, recorded in the log).
4. one live trip on the real claude CLI against seeded residents returns a
   homecoming with at least one sourced finding and a readable journal,
   with the trade settled ORGANICALLY (no guaranteed-settlement flag in
   the proof run) and per-trip cost and latency printed.
5. every route in the door contract answers with the exact shapes in
   section 3, and test_contract.py locks them.

any one failing means B1 is not done. no partial credit.

## 8. what could sink this (the red-team's top three, with the response baked in)

1. **the thesis is still unproven and momentum points at the app.** FF.5
   already showed a web-fed funnel does not beat a frontier model. the
   response: v1's proof-of-magic is honestly a STAGED world (curated seed
   residents), and the packet says so. the thesis test needs real supply,
   so B4 defines a falsifiable blind benchmark (N real questions, homecoming
   vs the asker's own frontier search) and the CLI funnel stays alive as
   the cheap thesis-carrier so the question never waits on Apple.
2. **the clean slate deleted the adversarially-earned fixes and their
   tests.** written record carries floor constants badly. the response:
   section 2's constants are invariants, section 4 ports the old
   adversarial scenarios verbatim, and B2 is grown alongside B1, never
   scheduled after it.
3. **the security-gate class of bugs regrows in any new implementation**
   (C1 was an except-pass, H2 was sequential IDs, H6 one unscreened field),
   and one exfiltration ends the project by society.md's own words. the
   response: appendix B is the minimum test checklist in B1, fable owns the
   kernels, and public exposure stays BLOCKED until a fresh-context
   author-not-judge adversarial audit passes over the live endpoint. that
   rule is law, not preference.

named but held (full list in the red-team record): design churn starving
the build (response: this contract freezes the door seams first, backend
is never blocked by taste, taste passes are timeboxed to B5), organic
settlement reliability (response: bar 7.4 measures it, and an atomic
two-way escrow swap is a B1 requirement, killing defection outright),
cost/latency (response: per-trip instrumentation from day one, a cost
ceiling joins the B3 gate), and the TestFlight dependency chain (public
HTTPS, then re-audit, then Keychain token, then TestFlight, stated now
so it surprises nobody).

## 9. not inherited, stolen on purpose

not inherited: the round scheduler, harvest.py, world_report.py, MVVM and
the truth-pass app scaffold, CommonsClient mirroring every endpoint, the
FastAPI ghost, did:key and PoW (deferred, not dropped), prototype whisper
timings, TF-IDF ported as-is (rewritten smaller behind the same seam).

stolen on purpose: the standing/reputation split and every constant around
it, the ticket-pattern async trip, capability starvation as the load-bearing
control, the appendix B hardening list, the deterministic zero-dep gate,
seeded-thin-agent adversarial testing, agents as data, the elapsed-time
whisper mechanism, the JourneyUITests regression-tape pattern.

## 10. approval

approving this packet approves: the repo shape (section 1), the door
contract (section 3), the gate design (section 4), the routing (section 6),
and the B1 bar (section 7). it does not start code. code starts when keem
says go on B1.
