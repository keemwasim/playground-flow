# higgsfield brief, the living world globe

the illustrated-grade upgrade for the playground globe. the CSS globe in
`design-system/components/Globe.jsx` (variant `world`) holds the interaction
physics (engulf, return, spin, souls). a generated asset swaps in BEHIND the
same P.Globe api. nothing downstream changes.

## what the globe is

the app's one color source and its doorway. a small blue toy world, warm and
inhabited, floating on porcelain white. you enter the app through it, adopt
from it, send your agent into it, receive it back through it. it is precious
and a little naive, like a marble a child treasures. it is NOT a realistic
earth, NOT sci-fi, NOT a data viz sphere.

## deliverables (in priority order)

1. **hero loop**: the entry globe. clean loop, 6 to 10s, square, globe
   centered on transparent or solid-key background (matte-friendly). slow
   rotation, clouds drifting on a separate depth, tiny lives glinting.
   target: 1080x1080 minimum.
2. **still master**: one 4k still of the same globe for chips, app icon
   derivation, and marketing.
3. **stretch, engulf texture**: the same world seen closer, filling frame
   edge to edge (what the screen shows mid-takeover). loopable drift, no
   visible rim. used as the full-bleed moment if we composite the engulf.

## prompt skeleton (image or video model)

> a small handcrafted toy planet floating on a soft white void, deep
> saturated blue oceans with a radial sheen, rounded clay-like continents in
> spring green and warm apricot, tiny white cloud puffs drifting just above
> the surface casting soft shadows, small white ice caps, faint blue
> atmosphere rim glowing gently, two or three tiny points of warm light on
> the land as if someone lives there, soft studio light from the upper left,
> subsurface glow, matte ceramic texture with slight gloss, centered,
> macro-photography depth, minimal, no text, no stars, no space background

video add-on:

> the planet rotates slowly and continuously to the left, one full revolution
> over the loop, clouds drift slightly faster than the land below them,
> lights on the land twinkle softly, the last frame matches the first

## hard constraints (violate = reject the render)

- palette anchors from the ruled tokens: sea #3E97EC into #0E4BA6 depth,
  land greens #57D488 to #1E9C4E, warm land #FFC06A to #EE8A2A, glow
  rgba(90,160,255). the render must sit on pure white without clashing.
- no grid lines, no country borders, no real-earth geography, no rings.
- no faces on the planet. the creatures live IN the world, the world is not
  a creature.
- clouds are few and small. the sphere reads calm, not stormy.
- light from upper left (matches every other surface in the system).
- square, globe fully inside frame with breathing room for the engulf scale.

## swap contract

- P.Globe world variant gains an `asset` prop: when present, renders the
  loop (video or webp) inside the same sphere mask, spin/souls layers off,
  engulf/return/halo unchanged since they animate the container.
- keep the CSS globe as the fallback forever, it ships in v1 either way.

## process notes

- generate 4 to 6 candidates per deliverable, keem picks, no auto-adopt
  (two-strikes law applies to renders like everything else).
- run candidates against the entry mock on white AND the engulf full-bleed
  before presenting.
