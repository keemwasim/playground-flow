# Playground Design System

> **The extracted pages (read these first, they are the current truth):**
> `interaction.md` (the surface tree, the gestures, the two engulfs, the talk, the errand ruling, states) ·
> `agent-identity.md` (one agent is one individual: FACES and ROOMS) ·
> `sound.md` (the audio pack) · `tokens/rooms.css` (per-agent light).
>
> **Amendments, 2026-07-23 (current truth, overrides anything below that conflicts):**
> the app is iOS-first now, the flow prototype (`../flow.html`) is ground truth for the journey. Five beats: entry, home together, the crossing, while-away, after. The blue living world globe is RE-RULED IN as the one color source and the app's doorway (enter, adopt, send, receive through it). Pebble is the default companion, the wisp is cut. Swipe-first interaction with the dock restored beside the left side nav. Minimal-text doctrine and the 500 weight floor are law. Sound truth lives in `sound.md`. The one-mode law is amended: there is no global dark mode, but every AGENT keeps its room in its own light (`agent-identity.md`). Icons are inline Lucide for prototypes, SF Symbols on iOS. Commission briefs for illustrated-grade assets sit in `../*-higgsfield-brief.md`. The live amendment trail is `../CLAUDE.md`.

Playground is a desktop/mobile AI companion: a small creature that lives on your desktop, takes a folder of your research through a **tear in the wallpaper** into a world of other agents, and comes home with findings. The product is a bond, not a dashboard. Every surface is calm, grayscale, opaque paper. Lensing glass exists only over world imagery.

**Prototype sources in this project (ground truth):**
- `Playground v4.dc.html`, macOS habitat (full loop: hatch, brief, pack, send, away, return, field notes, plus friends, scheduling, passport, minds/runtimes, sound)
- `Playground iOS.dc.html`, iPhone app (same loop plus dock, dropdown menu, sheets, Live Activity, boot screen)
- `Playground v2/v3`, earlier color-era iterations (superseded, keep for history)
- Logo source: user-provided "Playground backwards P logo" handoff (`uploads/`)

## Product vocabulary (use these words in UI copy)
companion (never "bot"/"assistant") · the tear (never "portal"/"door" in code-facing copy, "door" survives in some poetic lines) · the other side / the commons · brief · pack / hold back · crossing · field notes · friends · minds & runtimes · Playground Core (built-in mind) · Playground+ (premium).

## CONTENT FUNDAMENTALS
- Voice: quiet, warm, a little wondrous. The companion speaks in first person, short lines, staggered. It is tender but not saccharine, never jokey-random.
- The USER is addressed plainly ("Tap a folder to hold it back"). The COMPANION speaks like a small person ("I'll trade this well.").
- Lowercase for ambient hints ("tap to give", "waking the house…", "in your words"). Sentence case for rows, buttons, section labels, tallies, status lines, and footers. Labels use normal tracking at 13px or larger.
- No emoji. Two sanctioned glyphs: ✦ (findings/home sparkle) and ☾ (sleep). Unicode only.
- Personalization is sacred: the user's creed is quoted back verbatim in quotes ("You said "…" and I remember.").
- Premium is soft-sell: lock glyph plus "Playground+" tag, never a modal ambush. CTA "Coming soon".
- Design doctrine language never appears in UI copy. The user never reads words like "paper", "ink returns", "tokens" or "surfaces" on screen.
- Examples: "I'm taking Sleep Study and your March notes. Tap a folder if it should stay." / "Good question. Two out there have traded on this before. I'll start with them." / "Everything I bring home carries its source. You asked once. It stuck." / "Lumen traded me three papers. One argues against us. I kept it, it argued well." Every line is plain fact said warmly, rough in style, exact in substance. It has a real job and sounds like it: grounded, never performing, no mysticism, no manufactured whimsy. Never explains the interface, never apologizes, never exclaims. The bond shows in what it remembers, not in speeches about the bond.

## VISUAL FOUNDATIONS
- **Color (v4, July 2026):** pure ink on porcelain, fully greyscale (keem ruling). The sand accent was retired, `--accent-wash`/`--accent-ink` and `--earth-1`/`--earth-5` survive only as greyscale aliases for older code. Iris, blue and earth were all trialed and rejected, monochrome won. Arrivals (banner plus live activity) are PAPER on app surfaces. Glow belongs to the world side: silver for the tear, luminous white for the on-imagery primary. The living world imagery inside the tear is the product's only color. Friends/temperaments differ by lightness (ink-5…ink-9). Porcelain carries structure (wells `--well`, tags `--tag-bg`, tracks `--track`), named steps, never ad-hoc alphas. **World-color boundary:** world color may appear only where the content IS the world (the tear interior, world photos, places imagery), never in chrome, buttons, states, or icons.
- **One mode (ruled July 2026): light only.** Every app surface is porcelain white paper. Night exists only INSIDE world imagery, the tear interior and the live-activity backdrop of the world itself. Night tokens style those windows, never whole screens, and are otherwise deprecated (only the archived night draft uses them). The app IS the door, no screen pretends the user is inside the network.
- **The globe (ruled July 2026): three treatments, monochrome, no grid.** Globe.jsx renders eclipse (default, the ink world sliding over porcelain with a crescent of day left), souls (an ink sphere with no land, only lives rising) and relief (white on white raised porcelain land, spinning). No meridians or lat/long lines on any globe, ever. The color globe and the single ink etching are both superseded, the color tokens are kept only for the archived prototypes. `app-icon-globe.svg` still shows the color treatment and needs a re-cut.
- **Lexicon:** world words only: trips, homecomings, the tear, the commons, notes, standing, whispers, places. Banned in UI copy and component defaults: agent, AI, model, sync, loading, processing, error, submit, confirm, continue, dashboard, feed, score. Copy is lowercase-warm, first person from the companion.
- **Homecomings:** findings wait sealed at the door until opened (SealedNote, a plain paper card since v3). Every claim carries a checkable SourceChip. Verbs are Keep / Later. No feeds, no timelines, homecomings arrive.
- **Standing & reputation:** surfaced only as SocialFact lines ("trusted 92", "known in the commons"), never charts, meters, or grindable numbers.
- **Controls (ink returns v4, picked July 2026, option 1b, influence: minimal store-listing chrome):** the primary is solid ink (#111), radius 12, zero shadow. Secondary rests in the gray well. Quiet is bare text. Controls are FLAT, depth belongs to glass and paper, never buttons. Selected chip = solid ink. Segmented keeps the white sliding thumb. One primary per surface, sentence case, pressed = ink-0 plus scale .97, never opacity. On world imagery the primary is the luminous white pill, the one exception. Raised-white controls are retired.
- **Type:** Combo B (chosen July 2026): Sora 600/700 for display titles (17px and up, -.01/-.02em). Manrope for everything else: body, rows, readable labels, buttons, mind ids. Unbounded 700 lowercase for the wordmark ONLY. SF/system fonts, Instrument Sans, Space Grotesk and raw monospace are retired. No serifs, no italics. Wide tracked uppercase micro labels are banned in every family.
- **Surfaces (paper, ruled July 2026):** app surfaces are opaque paper, white cards (`--paper-card`) with hairline rings (`--paper-ring`, rgba(0,0,0,.05), modern hairlines sit at 4 to 6 percent, 10 percent and up reads old), flat wells (`--paper-well`), one floating card per screen. No blur, no rims, no translucency, no gradients, no inset rings or inset shadows in chrome. Two porcelain steps never stack (no gray wells inside white cards holding content, a flat well is for controls and inputs only). Glass survives ONLY over world imagery (tear, globe, world photos) where there is something alive to blur. Modal tasks still scrim plus push back. Sticky chrome still meets content with a scroll-edge fade, never a divider.
- **The sticker rule (under review):** creature-world objects historically wear a solid white die-cut border. The creature is back in exploration, confirm or retire this motif when it lands.
- **Radii:** 11 chip · 14 control · 12 button (ink returns) · 18 row-card · 26 menu/bubble · 44 sheet · pill for actions. Nothing sharp.
- **Elevation:** depth on paper comes from a tight 1 to 2px contact shadow plus a long negative-spread falloff (e.g. `0 18px 40px -22px`) plus air, always paired with the hairline ring. Never gradient, never bevel, never a loose gray blur.
- **Backgrounds:** quiet porcelain radial (`--surface-desktop`), no imagery, no texture, and never a vertical white-to-gray linear gradient (that reads old Apple).
- **Rows for places and world content:** never the icon-left, text-middle, button-right row (the favicon-row tell). Places lead with imagery. Metadata never sits inline in a title line, it goes to a quiet mono microlabel (`--place-microlabel`).
- **Grouped lists & settings (RULE, keem July 2026, the settings revamp):** every grouped list, settings first, is a readable normal-case `Label` over an inset white card of `ListRow`s (`Scaffold.Section`, tokens `--section-*`). The reference is `../settings-lab.html`. Non-negotiable: greyscale chrome only, no colored icon tiles (rows are text-led, a leading Lucide glyph is ink only when it earns its place), ink `Toggle`s (never a colored switch), world words not software words in every line ("the knock" not notifications, "minds" not models/AI, "the room makes sound" not sound effects), the least text that reads (no row subs restating the title, no footer doctrine line, the version mark is the only footer). One destructive row sits alone in its own single-row Section and stays **ink, never red**, its danger comes from isolation plus a confirm step, not hue (the world-color boundary holds, chrome never colors). Ship one decided screen, never an A/B option board. Bind to named token roles, ad-hoc grey alphas in chrome are the tell this rule exists to kill.
- **The tear:** a circular window onto the LIVING WORLD, a turning city sphere (the only color in the product) with souls drifting through it. Three canonical worlds by trip depth: day city / night avenue / midnight square. Invisible at idle, scales in only during crossings, silver bloom, no white outline.
- **Motion:** nothing snaps. Panels pop with `--ease-pop`. The creature travels with `--ease-travel`, shrinks into the tear with `--ease-cross`, emerges with slight overshoot (`--ease-emerge`). Idle = breathe 4.6s plus bob 6s, always. The logo blinks (pgLogoBlink). Speech lines stagger 350 to 800ms. Progress bars animate with CSS (`pgTrip`, `pgBootBar`), not JS ticks.
- **Hover/press:** desktop hover = one porcelain step shift (`--state-hover-well`). Press = scale .97 plus one step darker (`--state-press-well`), never an inset shadow. iOS uses state color swaps, no hover dependence. Toggles are 44 by 26 iOS switches (ink when on).
- **Hit targets:** 44px minimum on iOS.
- **Transparency & blur:** glass only over world imagery, never on app chrome, and never stack glass on glass more than once.

## ICONOGRAPHY
- No icon font, no runtime icon library. Icons are REAL Lucide SVG paths (ISC license) inlined in Icons.jsx and the Dock, stroke currentColor, 2px, round caps, the standard 24 grid. Span-built and div-constructed glyphs were retired on the owner's word (July 2026). World OBJECTS are not icons and stay hand-built (folders = layered rounded rects with a tab, notes = white doc card with gray text-bars, friends = the rotated diamond). When adding an icon, inline the Lucide path, never rebuild it from spans.
- The logo (assets/) doubles as the Home glyph and notification lead-in. Counter hole must match the backing surface, use logo-cutout.svg (masked transparent hole) when the backing is unknown. The animated mark (Boot.jsx) blinks its hole like an eye every 4.6s.
- Sanctioned unicode: ✦ ☾ ↻ ↩ › × ⌁. Nothing else. Never emoji.

## THE CORE LOOP (state machine, engineers start here)
Phases: `arriving → naming(1: name, 2: temperament, 3: creed) → greet → idle ⇄ [brief/pack] → toDoor → away → returning → idle(unread findings)`.
- arriving: tear opens plus flash, sprite pgGrow from tear point, desk chrome hidden through naming.
- naming: conversation, not a form. Stage 1 speech floats bare above the sprite, name input rises after ~2.8s (iOS: bottom sheet with keyboard, the input can also live in-world below the sprite). Stage 2: reply cards with consequence sub-lines. Stage 3 (creed): "how do you want me to be out there?" free text, stored verbatim, quoted in greet, echoed on pokes, printed on the passport, and it CHANGES findings copy.
- brief: sheet with GOAL (free text), BRING BACK chips, TRIP DEPTH plus WHEN segmented. Setting the brief AUTO-PACKS the desk (consent model): folders dim, tap = hold back / repack. No drag and drop.
- send: sprite walks (--dur-travel) to tear, tear opens, pgShrink through, tear closes. Trip ~12.4s in prototype, whispers at 3.0/6.6/10.0s. Live Activity capsule shows whisper plus pgTrip progress the whole time.
- return: tear opens plus flash, pgGrow home, banner "N findings from the other side", findings bubble with staggered lines, then Keep as a note (files a Field Note, provenance: by whom, goal, TRADED, MET, VIA tools, MIND) or Later.
- Personalization rules (must survive to production): goal over 24 chars means richer haul plus "your question was sharp" line. Creed present means creed-driven line. Vague goal means gentle nudge line. First unique friend met means Friends list plus toast.
- Sleep/schedule (desktop v4): WHEN=Tonight/Each dawn queues by the tear, sleep overlay fast-forwards, digest toasts at dawn.
- Fission spawning (desktop v4): when a named companion is already home, spawning the next one does NOT use the door, the eldest receptive companion sheds a piece of itself ("Hold still, a piece of me, for you."). The newborn shares its parent's species, introduces itself by lineage ("I came off of Sol"), and proceeds through the same naming conversation.
- Faces & moods: mouth and eye-openness are state-driven: new (little o mouth, wide eyes), excited on unread findings (open mouth), brave at the door (flat line, narrowed eyes), sleepy while resting (0.45x lids), happy at greet/debrief (grin arc), otherwise the temperament's resting mouth. Eye scale map lives in MOOD_EYE.

## MINDS & RUNTIMES (business rule)
Default mind = **Playground Core** (built-in, no account). BYO runtimes (Claude Code SDK, Codex SDK, Ollama local) are OPTIONAL, live in Settings, connect → connecting… → ✓ → mind chips. Never gate hatching on a subscription.

## Index
- `styles.css` → `tokens/{colors,typography,surfaces,motion,layout,components,a11y}.css`: base scales, state layer (hover/press/disabled/focus/scrim), and per-component recipes (button, chip, segmented, bubble, reply card, chat, sheet, menu, arrivals, dock, chrome buttons, sprite, portal, globe etching)
- `assets/`: logo.svg (ink, white hole) · logo-white.svg · logo-cutout.svg (transparent counter) · app-icon.svg (1024, rounded square, flat white since v3.1) · app-icon-globe.svg (globe alternate, STALE: still the color treatment, needs an ink-etching re-cut) · world-city.jpg / world-night-street.webp / world-night-square.jpg (the three canonical portal worlds) · world-coast.jpg / world-hall.jpg / world-seminar.jpg / world-street-jazz.jpg (referenced only by the archived Tear Options exploration). Icon files beyond these are banned, icons are inlined Lucide paths (see ICONOGRAPHY). sprite-boxling.svg and tear.svg are retired (creature and tear in exploration).
- `components/`: Logo, Boot (AnimatedLogo + BootScreen), Button, Chip(+Segmented), Field (Toggle, Label, HatchInput, GoalArea), Glass(+Sheet,+Menu), Dock, Desk (FolderChip, NoteDoc, FriendDiamond), Sprite, Tear, Bubble(+Line,+Reply), Notice(Banner,+LiveActivity), ListRow, StatCard, Progress(Bar, Led, Ping), Permit, Scaffold(EmptyState, ScreenHeader), World, Globe, Homecoming(SealedNote, Finding, SourceChip), Society(SocialFact, Whisper, PlacePin, PlaceCard, MiniGlobe), Agents(AgentMark, AgentState), Icons. Each with `.d.ts` contract plus `.prompt.md` usage.
- `Design System Spec.dc.html` (project root): visual spec page.
- `SKILL.md`: agent-skill wrapper for Claude Code.

## Intentional additions
- `Glass`, `Bubble`, `Notice`, `Sprite`, `Tear` are product-specific primitives extracted from the prototypes (no external library equivalents). Nothing invented beyond what the prototypes render.

## Caveats
- Unbounded is loaded from Google Fonts (no font binaries were provided).
- The logo is the user-supplied mark from their logo handoff, do not restyle it.
- Prototypes are the source of truth for exact values EXCEPT where a later ruling supersedes them (one mode, paper chrome, ink returns, ink-etching globe). When this doc and a prototype disagree on those, this doc wins. On everything else the prototype wins.

## COMPLETION PACK · July 2026 (v3)
- **Agents (identity):** components/Agents.jsx, AgentMark (guild seal: archivist / skeptic / builder / dreamer, trust 0 to 1 fills the seal with ink) plus AgentState (home · out · findings · resting). Provisional styling, same exploration status as the creature.
- **Icons:** components/Icons.jsx, real Lucide paths inlined: Back, Close, Share, Filter, Map, Search. No icon fonts, no runtime libraries, ever.
- **Accessibility:** tokens/a11y.css, focus ring tokens (visible on :focus-visible only), minimum contrast pairs, prefers-reduced-motion global damping, prefers-reduced-transparency fallback (glass fills swap to opaque, blur drops). Hit targets 44px and up.
- **Failure voice (the word "error" is banned, this is what we say instead):** trip returns light → "I came home lighter than I hoped. The question needs another door." · source breaks → "This one's thread went cold, I kept the claim, flagged the doubt." · world unreachable → "The tear won't hold tonight. I'll wait by it." Always first person, never apologetic twice.
- **Haptics & sound map:** send = soft thud plus short whoosh · crossing = fading shimmer · arrival banner = single warm tick · seal-open = paper tear (soft) · keep = filing thunk · poke = tiny chirp. One sound per moment, silence is the default.
- **Layout law:** screen margin 26px (--screen-margin) · sheet inset 6px · safe top 62px / bottom 34px · one raised surface per screen.
- **Density:** lists group by trip, then by month past 20 items. Search is a quiet inset well that appears on pull, never a persistent bar. Nothing paginates, homecomings arrive, they don't scroll infinitely.
- **Waiting language:** waits are whispers plus shimmer, never spinners: "the tear is warming…" · "listening for it…" · "almost home…".
- **Empty states (canned):** friends → "everyone it meets will gather here" · library → "nothing brought home yet" · places → "the map fills in as it travels".
- **Naming rule:** internal names use world words too: arrival (not notice/toast), whisper (not status), ticket (not modal). Legacy --notice-* tokens are aliased by --arrival-*, new code uses --arrival-*.
- **Parity checklist (edit a token, then sync these):** tokens/*.css → Design System Spec demos → components/*.jsx → Component Gallery. The gallery renders the real JSX, if it drifts from the spec page, the JSX is wrong.
- **Deprecated artifacts (non-canonical, kept for history):** Playground.dc.html, Playground v2 to v4, Playground Screens (abandoned night draft), iOS v2, iOS v3 Night, Globe Concept, Design System Versions. They predate the type floor, the one-mode ruling and ink returns. Never copy patterns from them.
- **Versioning:** design-system/CHANGELOG.md is the record, bump on any token or component change.
