# agent identity, one agent is one individual

ruled 2026-07-23. adopting brings more than a second creature: it brings a
different FACE in a different LIGHT. identity is carried by the agent record
and every surface reads it, so switching agents is felt before it is read.

## the record

```js
{ name: '',        // taken silently in its first talk, never a form
  face: 0,         // index into FACES, its individual face
  form: 'pebble',  // pebble (default) or inkling, the ruled family
  room: 0 }        // index into ROOMS, the light its room is kept in
```

nothing else identifies an agent visually. no color, no badge, no avatar
frame. the face and the light do the work.

## FACES, four individuals of one family

same species, different person. varies eye spacing, eye width and lid
height, the eye line, and the pebble's blob silhouette. implemented in
`components/Sprite.jsx` as the FACES table, selected with `faceIdx`.

| idx | eye inset | eye w / h | line | reads as |
|-----|-----------|-----------|------|----------|
| 0 | 25% | .100 / .135 | 38% | the default, calm and even |
| 1 | 21% | .088 / .170 | 35% | close-set and tall, watchful |
| 2 | 29% | .115 / .104 | 41% | wide-set and low, sleepy |
| 3 | 24% | .078 / .108 | 37% | small and neat, precise |

hard rules: monochrome, eyes only (no mouths, no brows), never a new
species, never a color. a face is an individual, not a costume.

## ROOMS, the light an agent keeps

each agent's room overrides the ground and ink tokens on the room
container, so every component reskins at once (cards, wells, dividers,
the dock and its active pill). tokens live in `tokens/rooms.css`, the flow
mirrors them in its ROOMS table.

| idx | key | ground | ink | reads as |
|-----|-----|--------|-----|----------|
| 0 | porcelain | #FBFBFD | #111111 | the default, daylight paper |
| 1 | night | #0D1024 | #F2F2F6 | deep indigo, the quiet one |
| 2 | dusk | #F4F1EC | #111111 | warm paper, late afternoon |

this AMENDS the one-mode law (README, July 2026: light only). the app has
no global dark mode and never will. the light belongs to the AGENT, not to
a settings toggle: you change it by keeping a different agent, not by
flipping a switch.

## how it is assigned

adopting rotates face, form, and room together, so consecutive agents never
arrive as twins. the backend owns the real assignment (an agent is born
with its identity), the prototype's rotation stands in for it.

## the world is exempt

world imagery keeps its own color and light in every room. the blue globe
is the blue globe on porcelain and on night alike. rooms tint the room,
never the world.
