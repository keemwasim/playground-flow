# higgsfield brief, the companion creature

the illustrated-grade upgrade for the playground mascot. the CSS creature in
`design-system/components/Sprite.jsx` holds the interaction physics (bob,
breathe, gaze-follow, spring, weightless float, the dive). a generated asset
swaps in BEHIND the same P.Sprite api. nothing downstream changes. this is
the open commission named in the design law (illustrated-grade creature art).

## what the creature is

your agent's body. it lives in a porcelain-white room, watches you, listens,
and gets sent through a small blue world to fetch things. it is a BEING, not
a toy or an app icon: calm, a little shy, endlessly patient. warmth lives in
it (the chrome around it stays cold and minimal).

## the family (ruled, do not invent new members)

- **pebble** (the default): a small porcelain clay pebble that stood up. soft
  asymmetric rounded form, matte ceramic with subsurface glow, two ink-black
  teardrop eyes with a single white catchlight each, no mouth, a soft ground
  shadow. it breathes (subtle vertical swell) and bobs.
- **inkling**: a single ink brushstroke that stands on its foot and sways.
  one stroke, ink black with dry-brush edges, two small white eyes punched
  out of the ink. it never stops its slow sway.
- the WISP is CUT (keem: not good enough). do not render it.

## deliverables (in priority order, per form)

1. **idle loop**: 6 to 10s clean loop, breathing and bobbing, eyes blinking
   occasionally, square, transparent or solid-key background, 1080x1080 min.
2. **expression stills**: listening (eyes on you), asleep (eyes closed,
   slower breath), proud (just home, slight puff), curious (leaning).
3. **the dive**: a short clip of the creature gliding up and folding into a
   point of light (matches the pgCross move, used for the crossing).
4. **still master**: one 4k hero still per form.

## prompt skeleton (pebble)

> a small handcrafted porcelain pebble creature standing on a soft white
> void, matte white ceramic skin with gentle subsurface glow, softly
> asymmetric rounded body like a river stone that stood up, two ink-black
> teardrop eyes with a single white catchlight, no mouth, no arms, soft
> studio light from the upper left, faint warm shadow beneath it, calm and
> shy presence, breathing gently, minimal, macro-photography depth, no text

## prompt skeleton (inkling)

> a single black ink brushstroke standing upright on its own foot on a soft
> white void, sumi-e dry brush texture with feathered edges, the stroke
> forms a slender leaning figure, two small white eyes punched out of the
> ink near the top, it sways slowly like a reed, soft upper-left light, a
> faint ink-wash shadow at its foot, minimal, no text

## hard constraints (violate = reject the render)

- monochrome. the creature carries NO color, world imagery is the app's one
  color source. porcelain whites, greys, ink black only.
- eyes are the whole face: no mouth, no brows, no blush marks, no limbs.
- not pixar, not plastic, not glossy toy render. ceramic and ink, handmade.
- reads at 64px (the dock and the dive) AND at full screen. silhouette first.
- sits on pure white AND on the night ground (#0B0C12) without halos.
- light from upper left, same as every surface in the system.
- the two forms must read as family: same eyes, same calm.

## swap contract

- P.Sprite gains an `asset` prop per form: when present, renders the loop
  inside the same footprint, CSS body off, gaze/bob/spring wrappers
  unchanged since they animate the container.
- keep the CSS creature as the fallback forever, it ships in v1 either way.

## process notes

- generate 4 to 6 candidates per form before showing keem, pebble first.
- two-strikes law applies: a second rejection on a form means a rendered
  option set, never a third guess.
- run every candidate at 64px, 112px, and full screen, on white and night,
  before presenting.
