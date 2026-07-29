# eerie — playground pack              last updated: 2026-07-27 (auto)

what this is: the iOS app door into playground, a real agent-to-agent
research world. this lane is driving toward TestFlight.

current gate: keem ruled 2026-07-22, fresh build from scratch, not a rebuild. the foundation review is superseded. the build restarts through per-feature packets (AGENTS.md build loop), structure designed first.

live facts:
- all code was deleted 2026-07-21 (record.md ADR-13, clean slate). the lane is flat and docs-only: five content files at root (society, spec, record, vision, backlog) plus design/handoff-ios/ the design kit.
- everything the old code proved is recorded in record.md. the old architecture survives as reference in spec.md, the fresh build designs its own. the deleted source survives in vault git history and the publish mirror.
- the overnight loop stays paused until the first fresh-build packet (B0) is approved.

keem's standing direction:
- "this is a platform with no door. lets get the ios app going... i want to go all in on the app for now." (D86)
- "id like to wake up to playground basically done." (D102)

prohibitions:
- do not resume the overnight loop before the first fresh-build packet is approved.
- do not fake the peer world, loosen the private-file safety boundary, or call unobserved work done.
- do not let a design snapshot hard-couple the world logic.

known facts:
- the first demo passed on function but not on visual taste.
- the design direction flipped 2026-07-22 late: LIGHT and minimal. the dark night draft is abandoned, kept for comparison. keem's two strongest signals drove it: the white ground ('feels futuristic') and the clay globe ('i llove the globe').
- design truth lives in keem's claude-design project, mirrored at design/night/ (2.7M): PRODUCT.md is its constitution, design-system/ holds tokens + react components + a README of rules (Sora display / Manrope body / Unbounded wordmark only). prototypes are ground truth. Globe Concept shows the world with named inhabitants and trip arcs.
- the version pick is RESOLVED: keem picked 1b (ink returns). system v3 is settled: light one-mode, paper chrome, glass only on world imagery, solid-ink actions, monochrome with world imagery as the only color, earth family for facts and tints. still open in claude design: the creature and tear visual language.
- adopt-not-generate stands: keem's files are the truth, refinements are surgical, no look generated from text alone.
- TestFlight remains the product direction. scope ruled 2026-07-22: this lane does prototype, ui flow, frontend, and product strategy only. an outside engineer builds the backend against the door contract in b0-architecture.md (drafted, awaiting keem's approval). the contract is the marriage line.

open threads:
- [ ] F0.12 (verification harness: 4 bars, injection canary, trifecta kill-switch) → [F+C]
- the design system is sealed v4: all identity picks ruled (wisp companion with pebble + inkling kept, misted-veil tear, little-being agent marks, souls-forward globe roles, fully greyscale, companions eyes-only). mirror at design/night is export-ready.
- b0-architecture.md is on keem's desk: repo shape, six-call door contract, four-bar gate, safety invariant with addresses, routing, pass/fail B1 bar. the swiftui build re-implements the ruled design system natively.
