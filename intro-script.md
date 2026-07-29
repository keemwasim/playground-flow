# the intro, first launch only

a whimsical cinematic opening, narrated. plays once, the first time the app
is ever opened, before the entry. skippable by touching the screen. after it
plays, the app never mentions it again.

## the tone

a deep, warm, unhurried british voice. storyteller, not announcer. the
voice of someone reading a good children's book to an adult, taking it
completely seriously. never grand, never a trailer voice, never a wink.

## the narration (about 22 seconds)

> There is a world.
>
> (beat)
>
> It is small enough to hold, and busy enough to have its own weather.
>
> Things happen there whether or not you are watching.
>
> (beat)
>
> Someone in it is going to be yours.
>
> They will learn your name, and you will learn theirs.
>
> And when you need something from out there...
>
> (beat)
>
> ...they will go, and they will bring it back to you.

then the world appears, and the app begins.

## the picture

one continuous shot, no cuts, matching the ruled look: porcelain white void,
the blue world small and turning, clouds moving on it. the camera drifts
toward it slowly for the whole take. the creature is NOT in the intro, it
arrives when the owner adopts it. no text on screen at any point, no logo
card. the world is the only image.

## constraints

- monochrome except the world, exactly as everywhere else
- no music with a melody. air, room tone, a single low sustained note if
  anything at all
- ends on the world, so the entry screen is the same frame the film ended on
- 22 seconds hard ceiling. under 20 is better

## the credit

if the eerie mark appears, it appears here and only here: small, in the last
two seconds, under the world. this is the one place a company mark belongs.

## how it is made (2026-07-24)

the film is RENDERED FROM THE PRODUCT, not generated. the world in it is
P.Globe, the same component the entry screen draws, on the same white, with the
same halo. that is what makes the last constraint above ("ends on the world, so
the entry screen is the same frame the film ended on") literally true instead of
approximately true.

- `intro-film.html` mounts the component and drives a camera over it.
- `intro-film.jsx` holds the camera, the four cuts, and the handoff numbers.
  the two numbers that matter are measured off the running app by reading the
  live dom: the globe is 0.590 of the frame wide, centred 0.436 down. the halo
  is matched too, 1.304 of the globe with a 0.0609 blur, because the halo is
  the last thing on screen before the app takes over.
- the page has NO CLOCK. `__seek(t)` moves the camera, `__freeze(t)` pins every
  css animation to that instant. frame N is the same pixels every time, so the
  film can be recut, retimed to a different read, or reshot at another length
  without reshooting anything.
- the picture is cut TO the narration: the length and the moment the world
  turns come from the wav's own pause map, so the day passes on the line that
  says a day passes.
- room tone is synthesised, no melody: one low sustained note, a fifth under
  it, and filtered air.

the four cuts and the rejected material are auditioned at `intro-cuts.html`.
the reasoning, the corrected verdict on take B, and the generation experiment
are in `qa-intro-video.md`.
