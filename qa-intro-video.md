# QA, the intro film: generation, alignment, and the route change (2026-07-24)

## the verdict in one line

both generated takes fail the brief, the second one for a reason the lab page
got wrong, and the deeper problem is that neither was ever going to pass:
the film was briefed from words while the app already owns the picture. the
film is now RENDERED FROM THE PRODUCT, so the last frame of the film and the
first frame of the app are the same image, by construction rather than by
resemblance.

## take A, rejected, verdict stands

real earth geography (africa, europe and south america are legible), a
starfield, sun rays raking across frame, and by the last second the camera has
pushed so far that the sphere is cropped past the edge. four breaks against a
brief that bans stars, bans recognisable earth, and asks for a shot that ends
on the world whole.

## take B, the lab's verdict is WRONG

intro-lab.html says of B: "invented geography, no stars."
that is not what is on screen. frame 1 of B shows africa, europe and south
america. frame 5 shows north america. it is the same real earth break that got
A rejected. B additionally has a lens flare streak across the upper frame, and
the object is sitting on a surface with a contact shadow under it, which makes
it a product photograph of an ornament rather than a world floating in a void.
its clouds are glazed bumps fixed to the shell, so nothing moves but the
rotation, against a brief that asks for weather.

B is a REJECT on the same count as A, plus two more. the lab copy has been
corrected.

## the alignment failure underneath both

the ruled world is not a ceramic ornament. it is P.Globe: a luminous blue
sphere with raised green and orange landmasses, rounded white cloud pills that
drift, a cool atmosphere ring and a halo, on pure white, with four phases on
the world's own clock. that component is what the entry screen draws and what
the crossing swells into.

the script says the film "ends on the world, so the entry screen is the same
frame the film ended on". with either generated take, the handoff from film to
app is a cut between two different objects in two different materials under two
different lights. the cut is the thing the film exists to make invisible, and
it was the one thing neither take could do.

## the route change

the film is rendered from P.Globe itself. intro-film.html mounts the real
component on the real white with the real halo and drives a camera over it.
nothing is drawn twice and nothing is imitated.

it is deterministic on purpose: the page has no clock. a capture script calls
__seek(t) for the camera and __freeze(t) pins every css animation to that
instant, so frame N is the same pixels every time it is rendered. that means
the film can be recut, retimed to a different read, or reshot at a different
length without ever regenerating anything, and a QA pass on it is repeatable
rather than a new roll of the dice.

the last frame is measured off the running entry screen, not guessed: the globe
is 0.59 of the frame wide and centred 0.44 down, taken by measuring the live
dom.

## what the render pass found and fixed

- **clipping the clouds was wrong.** the cloud pills ride off the limb, which
  reads as depth in a phone and as detached white lozenges at film scale. i
  clipped them to the atmosphere, and it made a hard pale rim like a petri dish
  AND broke the match with the entry screen, which is worse than the thing it
  fixed. reverted. the overhang is proportional to the globe's size, so the
  film already carries the app's exact proportions.
- **grain at 0.055 turned the white grey.** a multiply grain over a full white
  frame lifts the ground off #FFFFFF, and the app's entry is pure white, so the
  handoff broke. down to 0.02, where it only breaks up banding in the halo.
- **the eerie mark read as a speck.** it was 3.2 percent of frame width, which
  at the bottom of a white field looks like dirt on the lens. now 5.8 percent.

## the voices, judged on structure only

i can execute the read but i cannot hear it. timbre and delivery are keem's
call, unchanged. what i CAN measure is pace and whether the three written beats
survive the read, from the silence structure of each wav:

| take | length | pauses over 0.35s | verdict |
|---|---|---|---|
| Graham | 22.12s | 9, evenly spread | carries every beat, the most spacious read, at the ceiling |
| Rupert | 20.00s | 9, evenly spread | carries every beat, ends at 18.5 with a clean tail, the most economical |
| Mortimer | 21.74s | 7, one 7.2s unbroken run | the beat before "and when you need something from out there" is gone |
| Clive | 17.74s | 2 in the whole take | fails the brief on pace, there is no room in it for a written beat |

Clive is a technical reject: "unhurried" is a constraint, and a read with two
pauses in eighteen seconds is not unhurried. Mortimer is weak on the same
count. Graham and Rupert both pass, and the versions use those two.

## the picture is cut TO the read

the length of each version and the moment the world turns are taken from the
narration's own pause map, not chosen. the day passes over "things happen there
whether or not you are watching", because that is the line that says it.

## the experiment that proves the diagnosis

before writing generation off i re-ran it properly: same model family, same
brief, but with the app's OWN world handed in as the start frame instead of
described in words. two takes, ten seconds each.

both hold the world. no earth, no continents, no starfield, no lens flare, no
table, no cast shadow, no ceramic. the blue sphere with its green and orange
blobs and its cloud pills survives, rotates, and the camera drifts in. every
constraint that A and B broke, these keep.

so the original failure was never the model. it was the brief. the film was
described to a stranger when the picture already existed in the repo.

they still do not ship, for reasons that are about the medium and not the
picture:

- **the ground drifts off white.** measured at the frame corner: both takes
  start at rgb 254,254,254 and are at 246,249,248 by eight seconds, a green
  tinted grey. the rendered film reads 254,254,254 at every sample. the app's
  entry is pure white, so a drifting ground breaks the handoff by itself.
- **a hard circular ring** forms around the world a second or two in and stays.
- **ten seconds, 720 by 1280.** the read is twenty to twenty two seconds and
  the picture is 1080 by 1920. covering the script means three shots, which
  breaks the one continuous shot the script asks for, and upscaling a ring
  artifact is not a fix.
- **the last frame is wherever the model leaves it**, which is the one thing
  the film cannot be casual about.

kept as a comparison clip, not as a candidate. it is worth keeping because it
settles the question: the generated route is viable for LOOSE material and dead
for the one shot that has to hand off to a real screen.

## the handoff, proven by measurement

the claim "the film ends inside the app" is either true or it is marketing, so
it is measured rather than eyeballed: detect the world's own light in the
film's last frame and in a screenshot of the running entry screen, and compare
the width and the centre.

| | width of light | centre x | centre y |
|---|---|---|---|
| first attempt | 0.596 | 0.502 | 0.446 |
| after three fixes | **0.679** | **0.498** | 0.434 |
| the app's entry screen | **0.679** | **0.498** | 0.425 |

getting there took three corrections, and each one was a real defect rather
than a nudge:

1. **the key light was bleaching the app's halo.** i had added a white
   screen-blended bloom to stop the void reading as a blank page. it was
   washing out the product's own light, which is the one thing that has to
   match. cut. the halo IS the light and it belongs to the product.
2. **the halo was static while the app's breathes.** the entry runs
   pgHaloPulse, so a still halo can never land where a breathing one is,
   whatever its size. the film's halo now runs the same keyframes, pinned
   deterministically by the freeze.
3. **the world's own glow was fixed pixels.** this is the real one, and it is a
   defect in the design system rather than in the film: `PHASES[].glow` was a
   literal 46px and 120px box-shadow, which is 20 and 52 percent of a 230px
   entry globe and 7 and 19 percent of a 640px one. the world's light shrank as
   the world grew. made proportional against a 230 reference, so every existing
   surface renders exactly what it did before, and the film finally reads the
   same light as the screen it hands off to. the night lights and the
   atmosphere ring had the same defect and were fixed with it.

the remaining 0.9 percent of frame height between the two centres is the app's
own pgBob, the world floating where it always floats.
