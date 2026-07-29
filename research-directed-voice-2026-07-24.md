# research: which voice tools can nail a directed read
date: 2026-07-24
scope: playground intro film (~22s, 8 short lines, deep warm unhurried british male storyteller, real pauses between ruled beats)
question: delivery control not raw voice quality

labels: **verified** = primary docs or page read this session. **assumed** = inferred or single-source marketing.

---

## answer first

for this job the delivery winners are:

1. **elevenlabs v3** for tag-based direction mid-line (pause, breath, calm, drawn out)
2. **inworld tts-2** for plain-english director prompts that stack mood + pace + pitch
3. **murf say it my way** if you want to act a scratch take and force the ai onto that delivery
4. **hire a human** (bunny studio / voices.com) when the read must be perfect once and forever

timed silence to the millisecond is cartesia / older elevenlabs break tags. emotional quiet weight without trailer-voice is still mostly pick-the-right-voice + many takes + human ear.

---

## 1. finest control over delivery

### elevenlabs v3 — audio tags (verified)
mechanism: square-bracket performance cues in the script. not a fixed closed list. docs show emotion, reaction, pacing, non-verbals.

real syntax from elevenlabs docs:
```
[whispers] I never knew it could be this way...
[sighs] ...
"It was a VERY long day [sigh] … nobody listens anymore."
```
also used in their blog: `[pause]`, `[breathes]`, `[rushed]`, `[drawn out]`, `[hesitant]`, `[exhales]`

pause rules (verified, same docs page):
- **v3 does not support** `<break time="x.xs" />`
- use audio tags + ellipses + text structure for v3 pauses
- **older models** (not v3): `<break time="1.5s" />` up to 3 seconds; too many breaks can cause instability

speed slider on site/api: 0.7–1.2 (verified docs)

pvc caveat (verified docs): professional voice clones are **not fully optimized for v3** in research preview. for v3 features prefer instant clone or designed/library voice.

sources: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices · https://elevenlabs.io/blog/v3-audiotags · https://elevenlabs.io/blog/eleven-v3-audio-tags-precision-delivery-control-for-ai-speech

practitioner note (verified reddit): users invent large tag lists; some report tags get spoken aloud on certain custom/clone voices instead of applied. tag effectiveness is voice-dependent.  
source: https://www.reddit.com/r/ElevenLabs/comments/1l94d6r/ · https://www.reddit.com/r/ElevenLabs/comments/1l8k45e/

### inworld tts-2 — natural-language director prompt (verified)
mechanism: free-form square-bracket instructions at the start of text. eight dimensions plus non-verbals. `deliveryMode`: STABLE | BALANCED | CREATIVE.

real syntax from inworld docs:
```
[say sadly with deliberate pauses in a low voice and hushed style] I don't think he's coming back.
[say excitedly with a high pitch and fast pace] I have great news.
[sigh] [breathe] [laugh]
```
best practice they state: longer descriptive instructions beat single words like `[sad]`. one delivery tag set per input; non-verbals can go inline.

pause controls: separate ssml-style break tags (docs link from prompting page).

sources: https://docs.inworld.ai/tts/best-practices/prompting-for-tts-2 · https://docs.inworld.ai/tts/capabilities/steering · https://inworld.ai/resources/inworld-vs-cartesia-sonic-3-5 (vendor comparison page; treat competitive claims as single-source)

### cartesia sonic 3 / 3.5 — ssml-like tags (verified)
mechanism: timed break + speed + volume + emotion enums. less "direct an actor," more "set knobs."

real syntax from cartesia docs:
```
Hello, my name is Sonic.<break time="1s"/>Nice to meet you.
<speed ratio="1.5"/> I like to speak quickly...
<volume ratio="0.5"/> I will speak softly.
<emotion value="angry"/> ... <emotion value="sad"/> ...
```
speed 0.6–1.5. volume 0.5–2.0. emotion is beta; mid-generation emotion shifts recommended as separate generations. break tags split context and can reduce naturalness if stacked.

laughter can be written as `[laughter]` in transcript (marketing page).

sources: https://docs.cartesia.ai/build-with-cartesia/capability-guides/ssml-tags · https://docs.cartesia.ai/build-with-cartesia/capability-guides/volume-speed-emotion

### murf gen2 — word graph + "say it my way" (verified vendor pages)
mechanism:
1. per-word emphasis graph (pitch/speed nodes on individual words)
2. fixed pause presets plus custom pause length
3. **say it my way**: record your own take of the line; model matches intonation, pace, pitch, and pause lengths onto a murf voice

this is the only major tool that explicitly markets "act it once, force delivery onto a stock voice" as a first-class path.

sources: https://murf.ai/text-to-speech-gen-2 · https://murf.ai/blog/text-to-speech-emphasis · https://help.murf.ai/basic-settings-speed-and-pitch · https://murf.ai/ (faq: say it my way)

### ranking for THIS intro (assumed synthesis from above)
| need | best fit | why |
|---|---|---|
| ruled beats / silence length | cartesia break OR elevenlabs non-v3 break OR murf timed pause | only these give clocked silence |
| quiet emotional weight mid-line | elevenlabs v3 tags OR inworld long direction string | breath, sigh, calm, measured |
| match a human scratch read | murf say it my way | designed for that |
| british library voices already near target | elevenlabs voice library (assumed from prior playground candidates) | playground already has clive/graham/mortimer/rupert wavs |

no tool was verified here as "pixel-perfect director for 8 ruled lines in one pass." all docs push experiment + regenerate.

---

## 2. voice cloning in 2026 — delivery not just timbre

### elevenlabs
- **instant voice clone (ivc):** ~1–2 min audio (verified docs)
- **professional voice clone (pvc):** min ~30 min, ideal 1–3 hours; fine-tunes a dedicated model (verified docs)
- style in training data is replicated: if you train on warm unhurried book-read samples, output tends that way; mix styles and consistency drops (verified docs: "keep the style consistent")
- pvc only of **your own** voice with verification; cannot pvc someone else even with consent — they must create and share from their account (verified docs)
- clone captures prosody tendencies present in data, not a single perfect take of a new script (verified conceptual docs: clone is a representation, not a recording)

sources: https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning · https://elevenlabs.io/docs/eleven-api/concepts/voice-cloning · https://elevenlabs.io/blog/7-tips-for-creating-a-professional-grade-voice-clone-in-elevenlabs

### murf say it my way (delivery clone of a take)
records your performance of **this** line and transfers delivery onto their voice. closest thing to "clone the directed read" rather than "clone the person forever." (verified vendor)

### cartesia
clone from as little as ~3s claimed on comparison/marketing pages. primary docs on delivery control are ssml not clone-delivery fidelity. clone delivery retention for cartesia: **not verified** this session beyond vendor claims.

### how good is delivery hold? (honest)
- **verified:** training style biases the clone; clean consistent style samples matter more than raw length
- **verified:** pvc not fully optimized for eleven v3 tags right now
- **assumed:** a 22s scratch read cloned as ivc will hold **timbre + some cadence**, not the exact pause map of that take, unless you use murf-style take-matching or regenerate with tags
- **not found this session:** independent blind study proving any clone holds an exact directed 8-line performance without retakes

### license / consent
- **verified:** elevenlabs requires you own or have rights to cloned voice; pvc self-verification; public-figure clone banned in practice under tos
- **verified secondary legal summaries:** right of publicity + state voice-clone laws (tn elvis act, ca/ny likeness-style rules, 12+ us states discussed in secondary guides). treat as legal context not legal advice.
- **assumed for product use:** cloning a hired actor without a written synthetic-voice / replica clause is a rights risk. hire with AI-use rights or don't clone.

sources: elevenlabs help on upload restrictions · https://terms.law/ai-output-rights/elevenlabs/ (secondary) · https://www.soundverse.ai/blog/article/is-voice-cloning-legal-state-by-state-guide-1041 (secondary)

---

## 3. hire a human on the api / marketplace

### real humans
1. **bunny studio** — marketplace + api/widget path. 13k+ actors, "no ai" human pros, starting ~$25, median voice turnaround under 1 hour claimed, unlimited revisions marketed. uk talent listed on homepage (e.g. kim bretton uk).  
   sources: https://bunnystudio.com/ · https://www.voicecrafters.com/blog/voice-crafters-bunny-studio-voiceover-platform-comparison/  
   practitioner caution (older youtube comments): talent-side fee opacity; not a quality judgment on client delivery.

2. **voices.com** — large talent marketplace; also sells "branded voice ai" (actor-licensed synthetic). human hire is the classic path.  
   source: https://www.voices.com/

3. **fiverr / upwork / direct talent** — still the default indie path (assumed industry practice; not re-audited as APIs).

for a **22s one-shot app intro**, human is cheap relative to product risk and gives real breath and ruled beats by direction.

### "indistinguishable" ai for 22s
- marketing claims exist (revoicer etc.). **not verified** by independent test this session for deep british storyteller delivery.
- independent-ish 2026 roundups often put elevenlabs first for expressive narration quality (secondary blogs). still not a substitute for listening on **this** script.
- **assumed:** for 22s with three hard beats, a careful human or a human-directed murf/eleven take can both pass casual listeners. "genuinely indistinguishable under critical ear" is unproven here.

---

## 4. workflow best narration people actually use

assembled from product best-practices + practitioner fragments. not one single "guild handbook."

1. **cast first, direct second** (elevenlabs docs): voice must already be near the target delivery. whispering tags on a shouting voice fail. playground already has four british candidates — correct instinct.
2. **style-match the clone data** (elevenlabs pvc docs): if cloning, train only on warm unhurried reads, not mixed promo energy.
3. **script for the ear** (elevenlabs + inworld): ellipses, short lines, capital emphasis sparingly, one director tag at the head of a beat.
4. **generate many takes, pick by ear** (universal practice across docs that say "experiment"; not a single reddit masterpost this session). for 8 lines, batch 10–20 with small tag/seed/stability changes.
5. **scratch-read then transfer** when tags fail: murf say it my way, or record yourself/actor and hire human final.
6. **splice silence in the editor** if model pauses are unstable (implied by break-tag warnings on both cartesia and elevenlabs: too many breaks hurt naturalness).
7. **final gate is human listen at intended volume** — trailer-voice is a delivery problem; if it still announces, change voice not tags (assumed from intro-script taste constraints).

for playground intro specifically (assumed plan from findings):
1. keep best of current four library reads as baseline
2. run eleven v3 with calm/measured/pause/breathes tags on the three beats
3. if beats won't land, murf say-it-my-way from a human scratch of the exact script
4. if still not quiet enough, bunny studio or voices.com british male with direction note pasted from intro-script.md
5. never clone a random actor voice without written rights

---

## gaps (said out loud)

- no side-by-side listen of all tools on **this** 8-line script this session (audio proof not run)
- no independent 2026 paper on "delivery fidelity of clones vs tags" found and read
- open-source stacks (orpheus, chatterbox, etc.) not deeply verified here
- sesame / openai / google gemini voice not primary-doc'd this pass
- practitioner corpus thinner than vendor docs; reddit is noisy and tag lists are partly folklore

---

## count

found 18 things, 14 verified.

(verified = primary docs/pages read: elevenlabs best practices + pvc + blogs; cartesia ssml; inworld prompting + steering; murf gen2/emphasis; bunny/voices pages; elevenlabs consent restrictions. remaining 4 are synthesis or secondary legal/marketplace practice.)
