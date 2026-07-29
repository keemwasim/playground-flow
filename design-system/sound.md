# playground sound, the ruled pack

the audio arm of the design system. same law as text and motion: silence is
the default, a sound must earn its moment. the app is a quiet room with a
world inside it, so sound belongs to the WORLD and the BEING, never to the
chrome. no ui ticks, no keyboard clicks, no notification chimes.

## principles

- the world is wet and warm (water, air, glass). the room is dry and near
  silent. the creature is soft and small.
- every sound pairs with a haptic sibling (CoreHaptics), the phone speaks
  through the hand first, the speaker second.
- nothing loops audibly. ambience breathes below notice or does not exist.
- respect the ring switch absolutely: muted phone = haptics only, and the
  app must feel complete that way.

## the pack (v1, eight sounds, nothing else)

| id | moment | character | length | haptic sibling |
|----|--------|-----------|--------|----------------|
| pg-snd-engulf | the world takes the screen (entry tap, the crossing) | a deep soft whoosh swelling into a hush, like a wave closing overhead, low-passed | 900ms | one long rising rumble, fading with the swell |
| pg-snd-dive | the creature folds into the world | a small ascending sparkle that ends in the engulf's hush, glassy | 600ms | light double-tick as it vanishes |
| pg-snd-adopt | a creature appears at the globe's touch | one warm low bloom, felt more than heard, like a bubble surfacing | 450ms | single soft thump, slightly springy |
| pg-snd-name | the name is taken in the talk | the shortest possible chime, one note, porcelain struck once, instantly damped | 300ms | one crisp light tap |
| pg-snd-home | it is back in the room (after) | two low notes, close together, a settling sound, wood and felt | 500ms | soft double thump, the landing |
| pg-snd-knock | word arrives while it is away (the island, the knock) | a real knuckle knock on wood, twice, muffled and polite | 400ms | the ruled haptic knock, sound optional on top |
| pg-snd-send | a user line is sent in the talk | air, barely there, a breath of paper sliding | 150ms | none, the keyboard already spoke |
| pg-snd-speech | the agent begins speaking (first line of a reply only) | sub-audible warm presence swell, not a chime | 250ms | none |

## banned

- AMENDED (keem 2026-07-23, "go through each interaction and add sound effects"): navigation now SOUNDS, but near-silent: tick (the smallest touch), slide (a surface arriving), settle (a surface leaving), mist (the room fogging over). all sit far below the eight event sounds. the old blanket nav ban is lifted by keem's word.
- any sound on high-frequency actions (typing, scrolling, card swiping).
- stock ui kits, marimba notes, apple-adjacent chimes, anything branded.
- more than one sound in the same 500ms, the engulf swallows its neighbors.

## delivery spec

- format: CAF (little-endian PCM or AAC) for iOS, 48kHz, mono is fine for
  everything except pg-snd-engulf (stereo, the wave should wrap).
- loudness: normalized to -23 LUFS integrated, true peak under -3dB. the
  pack must sit BELOW system sounds, never compete.
- names as in the table, one file each, plus a silent 50ms lead-in on every
  file (avoids the iOS audio-session pop).
- haptics ship as AHAP files with matching names (pg-hpt-engulf, etc).

## commission route

sound generation is its own pass (elevenlabs sfx or a sound designer, the
higgsfield briefs cover imagery only). candidate rule matches the render
law: 4 to 6 takes per sound, keem picks, two-strikes then a rendered option
set (an audible a/b page in the lab style). every candidate is auditioned
inside the flow at real volume on the phone speaker AND muted with haptics
only, before presenting.

## prototype wiring (later, on keem's word)

the flow can carry the pack behind a single `pgSound(id)` helper gated on a
sound toggle in the artifact chrome, off by default in the pane. not built
yet, spec first.
