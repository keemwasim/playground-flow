# handoff, cinematic intro film (2026-07-25)

pick this up in a FRESH session. the prior session hit its context ceiling
mid-production. everything needed is here and in intro-treatment.md.

## what we are building

the first-launch intro film for first-time users. ONE continuous descent, no
hard cuts: our WORLD (globe), then a forward fly-over showing the city SCALE,
then down to the STREET and first-person among the beings, then the VEIL
(beings leap out and back home). ends handing off to the app entry. about 33 to
36s, portrait 9:16. full beat list and vo mapping: intro-treatment.md.

## LOCKED decisions (do not relitigate)

- ARTSTYLE (keem re-ruled 07-25 07:40, supersedes the medieval lock): PAINTED
  but NOT CARTOON, and the world is SCI-FI. thick visible brushwork and canvas
  texture, BUT realistic luminous light, bright, colorful, vivid jewel tones.
  never muddy, never cartoon, never flat, never 3d render. THE BUILDINGS MUST
  NOT RESEMBLE A TIME PERIOD, keem's words. futuristic and otherworldly, no
  arches, domes, columns, cobbles or tiled roofs. the medieval cut
  (cine/med_arthur.mp4) is the closest pass so far, keep it for reference.
- SCRIPT (keem approved, natural, no forced pauses), use verbatim:
  "There's a whole world in here. Small enough to hold, but alive, and busy,
  with its own weather. Things happen in it whether you're watching or not. And
  someone in it is going to be yours. They'll learn your name, and you'll learn
  theirs. And whenever you need something from out there, they'll go and get it,
  and bring it home to you."
- VOICES: Arthur (preset voice_id 30fc8796-ceb6-4a66-b3a7-4a145ef7f346) and
  Roxie (preset voice_id f6448975-768e-4327-b932-1b7c973d58e9). build BOTH.
  seed_audio, voice_type preset. NO ellipses in the prompt text, they cause the
  random pauses keem flagged. keem's ear picks the winner and the mix, because
  the agent cannot hear audio.
- THE GLOBE MUST BE OURS: repaint the app's own globe (blue world, green and
  orange clay land, white cloud pills). feed plate media_id
  fd1e4566-f471-44d8-bc32-7b2189e4eb0e as start_image.
- THE BEINGS MUST MATCH OUR CREATURE every detail: smooth off-white pebble body,
  two asymmetric black ink-drop eyes (left a full teardrop, right a narrow
  slit), no other features, each one customized and individual. creature
  REFERENCE images generated (job ids 73099cf2-5a83-4b6d-a3bf-8dc45ddd26e8 and
  d0d305c9-828f-4e7e-b740-2efbe98d942b). download, pick the best sheet, crop ONE
  clean creature, upload via media_upload (curl PUT bytes) plus media_confirm,
  and pass it as a reference on the street, first-person, and veil regens so the
  beings are ours.
- CUT: the abstract amber "threshold" beat (keem: "remove this, idk what this
  shot even is"). do not include it.
- keem's frame.io notes on the prior cut: globe must be ours (handled above),
  cut the threshold (handled), the overhead must MOVE FORWARD and show scale.

## shots generating (medieval pass), get exact ids and rawUrls via the MCP

run: mcp show_generations(type video, size 24). all recent kling3_0_turbo 9:16
jobs are these beats, identify by prompt. known job-id prefixes:
- WORLD, ours, medieval (from plate): 55b83dfa, 387e0475
- world, medieval, text-only backup: 19e0b639, f39cd0d5
- STREET, medieval: e6743abb, 6b80c531
- FIRST-PERSON from the creature, medieval (keem liked this): ff6fd372, 3b263dfd
- OVERHEAD forward fly-over showing scale, medieval: 50380679
- VEIL or portal (older realistic style, may need a medieval redo): cf696397, 493347d6
get each rawUrl with mcp job_display(id), then curl it down.

## assets already made (local, in the session scratchpad)

scratchpad dir:
/private/tmp/claude-501/-Users-booman-Workspaces-Vault-lanes-playground/ab787e00-50e5-42be-9b42-ab84723fc52a/scratchpad
- score.sh, run `bash score.sh 36 score36.wav` for a 36s ambient bed. push it
  toward searching and curious if there is time, keem does not want a lullaby.
- cine/narr_arthur.wav and cine/narr_roxie.wav are the OLD lofty script, 32s,
  with the random pauses. REGENERATE both with the locked natural script.
- the NATURAL Arthur read is job c7a5cdee (already generated, natural script, no
  pauses). download it, and also generate the Roxie natural read.
- the prior realistic descent cut is design/night/cine/descent_arthur.mp4,
  superseded, keep for reference.

## the assembly recipe

1. download the picked medieval beats, view a mid-frame of each variant, pick
   the better one. order: world, forward fly-over, street or first-person, veil.
2. join with CONTINUOUS zoom-push transitions (xfade fade or fadewhite with
   about 0.8s overlaps, plus a slow zoompan on each clip) so it reads as one
   unbroken descent with no hard cuts. scale and crop all to 1080x1920. fade
   from black at the start, fade out at the end.
3. lay the natural narration (adelay about 500ms, loudnorm I=-17) and the 36s
   score (volume about 0.85) under it, amix, fade out. build TWO outputs, one
   Arthur and one Roxie.
4. write finals to design/night/cine/ and rebuild the review player.

## how keem reviews

the frame.io-style annotator is design/night/review.html. point its video tag at
the new cut. he plays, draws on frames, and pins timestamped notes. read them
back from the browser via localStorage key 'descent_review_v2'. a static server
runs on localhost:7311 serving design/night with no-cache headers. restart
script: scratchpad/nocache_server.py if it is down.

## honest open items

- the agent cannot HEAR audio. the voice pick (Arthur versus Roxie) and the mix
  are keem's ear.
- creature-match on wide and crowd shots will be approximate. the close beats
  (street, first-person, veil) are where it must be exact, via the reference.
- the film is generated, not rendered-from-product. that is keem's explicit call
  for a full cinematic video, superseding the old exact-match handoff rule.
