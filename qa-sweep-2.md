# QA sweep 2, after the fixes

method: every function invoked on the running prototype, every result read
back from the rendered DOM. one caveat learned the hard way: the preview pane
serves cached state, so a stale surface can read as a defect. every finding
below was confirmed on a forced-fresh instance.

## the three defects from sweep 1, re-tested

| # | defect | state |
|---|---|---|
| 1 | the errand was never delivered | **FIXED.** ask "someone to cut the trailer", it returns holding it, the room shows "i have it", and the talk delivers "Vess. she cuts, she is good, and she owes me a favour i already spent on you." with the original ask echoed underneath |
| 2 | the agent switcher silently failed | **FIXED.** the dock card's own toggle was swallowing the row click. verified: the new one to Sol |
| 3 | the away room was dead | **FIXED.** the world it is inside now turns there, dimmed, on its own clock. no timer, no progress |

a fourth defect surfaced while re-testing #1: the delivery was picked at
random, so it could label a workspace as a cutter. **FIXED**, the delivery now
matches the shape of the ask.

## the full walk, all five beats

| beat | result |
|---|---|
| 01 entry | world turns, wordmark, sign-in pill, tap-to-enter hint, tap engulfs and lands home |
| 02 home | nag asks (three times then stops), status reads the mood, dock, edge handle, all three surface trees open |
| the talk | door-aware opener, silent naming with acknowledgment, training reply, thinking dots, photo handover, ask becomes a trip offer with the send control |
| 03 crossing | dive, engulf, auto-advance, costs the world a phase |
| 04 away | absence, ping, the world turning, creature correctly gone |
| 05 after | back, holding, hands it over, status has visibly lifted to "wants to go out" |
| settings | the account layer opens from the dock: the knock, sound, restore, privacy, terms, sign out, delete everything, the eerie credit |
| moods | verified live: attention moved breath 4.6s to 3.9s, bob 6s to 4.8s, lift 0 to -3px, tilt 0 to 0.8deg, status "awake, listening" to "wide awake" |

## what is still open, and why it is not a patch

- **the second agent is cosmetic.** own face, room, name, but one shared
  conversation and no separate history. needs a data decision.
- **replies are canned.** the harness rules are simulated correctly, the
  content is a fixed bank. waits on the backend.
- **the world resets.** phases advance on a client timer, so returning after
  three days looks like three seconds. server-owned world time fixes it.
- **the ghosted destinations** are still ghosted, by design, until v4.
- **the intro film is rejected.** the first render broke three constraints
  (real Earth geography, stars, cropped past the frame). regenerated with
  hardened language, the narration takes are picked and waiting.
