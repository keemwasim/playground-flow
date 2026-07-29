# commission brief: the world plates

date: 2026-07-25
ruled by: keem, off the SEVER art board (sever-review-board.vercel.app)
supersedes: the blue living world globe as the app's only picture of the world

## why this exists

Playground's world is currently one smooth vector sphere with four saturated
blobs on it. The SEVER board is painted: brushwork, coloured shadows, air
between the near thing and the far thing. Those are not two versions of a style,
they are two different languages, and keem ruled the painted one.

The existing `design-system/assets/world-*.jpg` set does NOT survive this. Every
one of them is a frame from Pixar's Soul, 3D rendered, and not ours. They were
mood reference and they read as mood reference. They cannot ship. This brief
replaces them.

## what a plate is

A plate is a painted view of somewhere in the world the companion goes. It is
the only colour in the app. Everything around it stays grayscale porcelain, so
a plate has to carry the entire emotional feel of the product on its own.

The user is never inside the plate. The app is the door. A plate is seen through
the tear, on the globe, or handed back inside a delivery. Compose accordingly:
these are views, not levels.

## the style, from the board

**Painted, not rendered.** Visible brushwork on every surface. Stone is
scumbled, water is broken strokes, foliage is massed shapes with a few picked
leaves. No linework. No cel shading. No flat fills. No vector geometry.

**Warm structure against cool air.** Cream, ochre and timber carry the built
world. Blue and blue-green carry water, sky and distance. The contrast between
those two families is what makes the picture, not saturation.

**Heightened naturalism.** Lamp glow goes genuinely gold. Blue hour goes
genuinely blue. Light is the mood, not a filter over it.

**Atmospheric perspective does the depth.** Far things go pale and lose
contrast, they do not merely get smaller. There must be air in the picture.

**Shadows are coloured.** Never grey, never black. A shadow on a cream wall is
violet or blue, never a darker cream.

**Lived-in density.** Laundry lines, bunting, potted flowers, a barrel left
out, a stall half packed away. Every piece of detail is evidence that someone
lives there. Nothing is decoration.

**People are tiny and never the subject.** Two or three figures for scale and
life, walking through, mid-task, never posed and never facing camera.

**No black outlines anywhere.**

## the shot list

Four plates for v1. Each 1600 wide minimum, 16:9, and each must also read when
cropped square and when cropped to a 390-wide phone column.

1. **the lantern district.** Where errands about making, cutting and editing
   route. Evening, lamps lit, working street, narrow. This is the one that
   appears most often, make it the strongest.
2. **the maker's hall.** Where errands about places, desks and quiet work
   route. Interior or threshold, high ceiling, daylight from above, work in
   progress on the floor.
3. **the square.** The catch-all, where anything unmatched routes. Open, midday,
   the widest and most public of the four.
4. **the world from above.** The globe replacement. The same painted language
   seen from altitude: coast, water, settlement, weather. It must survive being
   masked into a circle and being pushed to fill the frame during the crossing,
   so keep the interest in the middle two thirds and keep the edges quiet.

## variants, per plate

The world runs on its own clock, that is ruled law. Each of the first three
plates needs the same camera at two times:

- **day** and **night**. Same composition, same buildings, different light and
  different life. Night is not day darkened, it is lamps on, fewer figures,
  colder air, warmer windows.

Eight files total for plates 1 to 3, plus the world-from-above.

## technical

- 1600 x 900 minimum, delivered as jpg at high quality and a webp sibling.
- Named `world/<place>-<time>.jpg`, e.g. `world/lantern-district-night.jpg`.
- No text of any kind inside the image. No signage that reads as words, no
  numerals, no logos. Shop signs may exist as painted shapes only.
- The middle two thirds carries the subject. The outer edges must survive a
  circular mask and a full-bleed crop.
- No lens artefacts. No bokeh, no flare, no vignette, no chromatic aberration.
  This is paint, not a camera.

## banned

- Anything 3D rendered or that reads as rendered.
- Photographic source, photobashing, and any recognisable real place.
- Any frame or character from an existing film, game or show. The current
  placeholder set fails this and is being removed for exactly that reason.
- Modern signifiers: cars, phones, screens, plastic, road markings, power lines.
- Fantasy signifiers: magic, glow effects, floating rock, impossible
  architecture. The world is strange because it is elsewhere, not because it is
  magical.
- People as the subject, faces near camera, anyone looking at the viewer.
- Cute. The creature is the cute thing. The world is not.

## the fallback stays

Per the existing commission convention, generated assets swap in behind the
component api via the `asset` prop, and the CSS version remains the forever
fallback. Nothing in the app may hard-depend on a plate existing.

## open, for keem

- The creature is a smooth 3D pebble and the world would now be paint. That
  contrast is deliberate and matches how the board uses its tiny figures against
  painted streets, but it is a call worth making out loud before the plates are
  commissioned rather than after.
- The three ruled globe treatments (eclipse, souls, relief) are all
  mono-geometric. Plate 4 replaces the entry globe. Whether the eclipse mark
  survives on the app icon and chips is a separate ruling.
