# brief: voice models for the playground intro read (2026-07-24)

question: which voice model sounds most human and can actually nail the
playground intro script, a deep warm unhurried british male storyteller,
8 short lines, ruled pauses, quiet weight, never trailer, one 22s forever read.

## verdict

for THIS job the axis that matters is direction, not raw naturalness, because
every prior take failed on delivery (trailer energy) and not on timbre. so:

1. try first, ELEVENLABS V3. generally available since feb 2026. the finest
   bracket-tag control of pauses and tone that ships today: [pause] [long pause]
   [softly] [thoughtful], plus ellipses for weight. strong stock british
   literary voices (daniel, david british storyteller, james). one-off license
   is a few dollars. knock: it sometimes reads the tags out loud, creative mode
   drifts, and careful ears still clock it. verified: v3 GA + tag syntax read
   live on elevenlabs docs.
2. co-pick for the DELIVERY, HUME OCTAVE 2. you direct in plain-english acting
   notes ("speak slowly, warm, quiet, a serious children's book to an adult, no
   trailer energy"), which is the exact instruction this script wants. lower on
   raw-human arena, built for emotional direction. commercial from $14/mo.
3. the MOST HUMAN bet, CARTESIA SONIC 3.5. #1 on artificial analysis's
   controlled voice arena (same 8 cloned voices across all models), and it
   leads BOTH the us and uk male categories. en-gb male voices (archie, george),
   ssml break/speed/emotion. verified: controlled arena, cartesia 1122 > eleven
   v3 1088 > inworld tts-2 1070.
4. best big-lab director control, GOOGLE GEMINI 2.5 PRO TTS. you write a
   director prompt. but british is steered not stock and timbre drifts run to
   run. openai gpt-4o-mini-tts often refuses to stay british and has reports of
   cut-off tails, which would kill the last line. amazon and azure are weaker
   for this specific quiet emotional read.
5. the insurance that actually guarantees the bar, A REAL BRITISH ACTOR. bunny
   studio (~$25) or voices.com. for a 22s file that opens the whole app, a human
   removes all delivery risk, and it is cheap. or record a scratch and lock it
   with murf "say it my way".

## the honest gap

nobody has heard any of these on the actual 8 lines yet, me included. arena elo
measures "sounds human," not "deep warm british male reading 8 quiet lines."
that is taste and it is decided by ear on the real script.

## recommended move

it is ONE 22-second file. generate the same 8 lines on eleven v3 (daniel /
david / james, calm tags), hume octave 2 (acting note), and cartesia (archie /
george, slow), audition them side by side like the voice takes already are,
and if none clear the bar, hire the human. i can drive the generation.

## dead ends (do not chase)

play / playht (shut down dec 2025, meta bought the team). inworld (already
tried, not good enough). sesame (open weights only, no clean commercial api,
no british stock). vibevoice (research, microsoft says not for commercial).

## sources

- elevenlabs v3 GA + audio tags, docs read live 2026-07-24
- artificial analysis controlled voice arena (cartesia sonic 3.5 leads uk male)
- hume octave 2 (oct 2025), cartesia sonic 3.5 (may 2026), gemini tts docs
- r/TextToSpeech "tested elevenlabs vs cartesia vs murf" (jul 21 2026)
- "what are your ai narrator tells" thread (the delivery risk, in the open)
- four sol researcher briefs: sandbox/voice-research/*.out
- directed-read detail: design/night/research-directed-voice-2026-07-24.md
