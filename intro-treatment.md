# the playground intro, director's treatment (2026-07-25)

first-launch film, first-time users only. one continuous descent, no hard cuts,
from the world down into the life inside it.

## the look (keem re-ruled 2026-07-25, supersedes the medieval lock)

THE ARTSTYLE IS A PAINTING BROUGHT TO LIFE, AND THE WORLD IS SCI-FI. painted,
thick visible brushwork and real canvas texture on every surface, NEVER cartoon,
never 3d render. BUT lit with realistic luminous light, and bright, colorful,
vivid jewel tones (never muddy, never dark). volumetric god light throughout.
THE ARCHITECTURE MUST NOT READ AS A TIME PERIOD. keem: "i dont like the
buildings resembling a time period, i think i like the idea of it being scifi in
this world." no stone arches, no domes, no columns, no cobbles, no tiled roofs,
nothing medieval or renaissance or ancient. futuristic and otherworldly instead:
smooth curved towers of pale ceramic and luminous glass, floating platforms,
long clean spans, soft glowing seams of light.
spiritual, radiant, curious. the beings read as SOULS and MUST MATCH OUR
CREATURE exactly (smooth off-white pebble, two asymmetric black ink-drop eyes,
left a full teardrop, right a narrow slit), each one individual and customized,
no two alike. never cartoon, never storybook, never anime, never flat. portrait
9:16, about 35 seconds. tone: curious and wondering, not cozy. narrator: arthur
(deep male) or roxie (female), read curious. score: a searching ambient bed.

## what is locked (2026-07-25, keem: "ill take this for now")

- LIVE FILE: cine/intro-latest.mp4, which is cine/world_v6.mp4. it plays as
  the app's first-launch intro from flow.jsx, full bleed, tap to skip, hands
  off to the entry. the path is fixed, so a recut just overwrites that one
  file and the wiring never changes.
- 32.0s, 1080x1920, the score stops SHARP on the last frame, no fade.
- LOOK: hand-painted animated background. smooth blended forms, no brush
  marks, no canvas texture, no cel shading, no outlines, no line art. then an
  app-matched grade and a real Kuwahara pass at RADIUS 4. radius 8 was
  rejected because it ate the creatures' eyes.
- WORLD: the sever board is the reference base. built by passing seedance
  TWO references at once, a frame of the world for place and palette
  (media 08915a6d) and pebble_A for the creature (media 21a89e44). that
  double reference is what makes the creature ours. do it this way every time.
- AGENTS: colour varied, muted tints. never more than five in frame. count
  only holds in vignettes, wide shots always come back crowded.
- SCRIPT: f, arthur. "One of them is going to be yours. Out there it has a
  name, and a reputation, and people who owe it favours. So when you need
  something, it already knows who to ask."
- SOUND: pebblesfx.py (hop, chirp, pop, ping), ambience.wav (water, wind,
  murmur), Civ V "Europe / Elipse" slowed 12%. THE TRACK IS FIRAXIS AND 2K
  COPYRIGHT AND NEEDS A LICENCE TO SHIP.
- ENDING: the one waiting. a single agent in front of a door of pure light
  on an empty plaza. it reads as your agent waiting for you.

## owed

- the time-lapse beat never returned a fetchable file, day-to-night is missing.
- the door square still comes back crowded, it is the weakest beat.
- the style sits between two prompts. the old one had strokes keem rejected,
  the new one has almost no paint left. the untested middle is "visible paint
  in the large soft shapes, no fine stroke detail".
- refused-at-the-door failed twice. the wake landed but grew arms on the
  mourners. therapy and venting never made it in.

## the flow (six beats, one unbroken zoom)

1. THE WORLD. a luminous soul-sphere alone in a glowing void, tiny souls
   drifting and rising within it, god rays breaking across it. slow hushed
   push-in. peaceful, curious.
   vo: "There is a world."

2. THE THRESHOLD. the sphere fills the whole frame and, without a cut, we pass
   THROUGH its glowing surface, rushing gently through warm light and drifting
   soul-embers, crossing into the world.
   vo: "It is small enough to hold, and busy enough to have its own weather."

3. THE OVERHEAD. we emerge above a luminous modern city, looking straight down,
   god rays pouring between the structures, soul-beings moving along glowing
   avenues far below. the camera keeps descending.
   vo: "Things happen there, whether or not you are watching."

4. THE STREET. we drop to first-person among them. it opens calm and still,
   then the world comes alive and breathing and builds into a rush, like a great
   city at its hour, beings streaming past, connecting, trading, on a stoop
   together, hurrying. each one individual, customized, its own glow.
   vo: "Someone in it is going to be yours. They will learn your name, and you
   will learn theirs."

5. THE VEIL. a misted threshold of light stands in a plaza, no hard edge, the
   air thinning to glowing fog. a constant gentle flow both ways: beings leap
   OUT through it into the wider world to fetch what someone needs, and leap
   back IN, home, carrying small glowing gifts. this is the errand loop made
   visible, the whole product in one image.
   vo: "And when you need something from out there... they will go, and they
   will bring it back to you."

6. RESOLVE. the rush softens, the film settles, and it hands off to the app.
   (a candidate closing beat, optional: one being near us pauses and turns to
   look toward you, the one that will be yours, god light haloing it. an
   intimate button before the app begins.)

## the shots generating for this (realistic paintover, souls, god light)

- world: 0f1feec7, 2e402709
- threshold (through the surface): 7c02c177, 88518aa8
- overhead aerial: 6b58a51e, 1aab9cc4
- street, calm to rush: 085407fc, f0073aa5
- the veil, beings out and back: cf696397, 493347d6

## the joins

no hard cuts. each beat flows into the next by a continuous zoom-push: the
outgoing shot scales up into a bloom of light and the incoming shot emerges
from it, so the whole film reads as one descent from the world to the street to
the veil. the score and the read run unbroken over all of it.

## still open

- a curious-toned re-read of the script from arthur and roxie (the current
  reads are warm, not curious).
- the score pushed from warm toward searching and curious.
- the optional being-turns-to-look closing beat, if keem wants the intimate
  button.
