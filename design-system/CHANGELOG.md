# Playground Design System — changelog

## v4.4 · 2026-07-30, the ink radio and the connecting whisper
Minds and runtimes needed two marks the system did not have, both added as named token roles in components.css (no component was changed, `../minds.jsx` composes the existing Section, ListRow, Toggle, Chip and Whisper).
- **`--radio-*`, the ink radio.** The in-use mark on a grouped list is a radio, never a checkmark: a check reads as done and put away, and a check on three rows reads as three minds running at once. Connected but idle is the bare ink ring, in use fills the ring, reaching holds the ring at half ink. Greyscale, hairline, no glyph inside it.
- **`--whisper-shimmer*`, the connecting whisper.** Waiting is the companion's own line with the light sweeping through the letters (pgShimmer), never a spinner, a bar, or a percentage. Consumed by `Society.Whisper` through its `style` prop.
- **Lab:** `../minds-lab-3up.html`, three directions on the same screen at 320 by 680, live and tappable.

## v4.3 · 2026-07-26, wide tracked uppercase micro labels removed
- The shared label and state-tag recipes now use normal case, normal tracking, and a 13px floor.
- Field, Scaffold, StatCard, Globe, the flow, the spec board, the gallery, live labs, and live mocks were restyled without changing the font family.
- Wide tracked uppercase or small-caps text at roughly 12px or below with about 0.08em or more tracking is now a hard treatment rejection in every family.

## v4.2 · 2026-07-26, the settings revamp becomes a rule
Keem approved the rebuilt settings screen and ruled the pattern into the system ("make this design style a rule, no grey default shit, really follow the design system").
- **New grouped-list / settings recipe.** `--section-*` tokens (components.css) and `Scaffold.Section` (Label over an inset white card of ListRows). `--shadow-contact` added (surfaces.css): grouped cards get a contact shadow only, they sit calm on the desk, they do not float.
- **The rule documented** under VISUAL FOUNDATIONS in README: greyscale chrome only, no colored icon tiles, ink switches, world words not software words, minimal text, destructive stays ink (never red, danger from isolation), one decided screen never an A/B board.
- **Reference implementation** is `../settings-lab.html`, rebuilt so every value is a named token, zero ad-hoc grey alphas. It replaces the old "apple-design" A/B lab. Content de-softwared: notifications became "the knock", model ids became "minds" (Playground Core built-in plus bring-your-own), the footer doctrine line was cut to a quiet version mark.

## v4.1 · 2026-07-24, QA pass off the intro film
Rendering the intro film from P.Globe at 1080 wide surfaced a family of defects nobody could see at 230px: **the world was built with fixed pixel values where it needed factors of its own size.** Three of them, all fixed against a 230px reference so every existing surface renders exactly what it did before.
- **The phase glow is now proportional.** `PHASES[].glow` was a literal box-shadow (46px and 120px), which is 20 and 52 percent of a 230px entry globe and 7 and 19 percent of a 640px one, so the world's own light shrank as the world grew and a large globe read tighter and colder than the entry screen. Stored as factors now and built from `size`.
- **The atmosphere ring's glow is now proportional** for the same reason (12px, 5.2 percent of the reference).
- **The world's night lights are now proportional.** `PH.lights` drew fixed 2.5px dots regardless of `size`, so "the lights come on as its day ends" was invisible at every size the app actually draws. Now `size * 0.0109` with a 2px floor.
- Net effect, measured: the last frame of the intro film and the app's entry screen now read the same width of light (0.679 of frame) at the same centre (0.498), where before the film read 0.596.

## v4 · July 2026, hardening pass
- Parity and tells sweep toward shippable v4 (parity-2026-07-22.md is the full record).
- Globe ruling propagated everywhere: three monochrome treatments (eclipse default, souls, relief), no grid or meridian lines on any globe. README, SKILL, CLAUDE.md and the spec board now describe the shipped Globe.jsx instead of the superseded single etch, and the spec board's color-globe demo was replaced with the three ruled variants.
- Icons ruling propagated: real Lucide paths only. Dock tab glyphs (friends, library, settings) rebuilt from span-divs to inlined Lucide SVG paths (Home stays the logo). README ICONOGRAPHY, Icons and Dock docs, and the spec board assets text rewritten off the constructed-div doctrine.
- Raw model ids scrubbed from consumer-facing demos: chip demo and spec board metadata tag now say Playground Core.
- Numbered-record naming retired: no № anywhere in the system, ListRow demo renamed, typography comment updated. Quill removed from demo copy (lumen, moth substituted).
- Permit tokens de-bureaucratized: document rule token removed, dashed photo-frame comment removed, permit name token aligned to the shipped 600 22px keepsake and Permit.jsx now consumes it.
- Ping ruling enforced: PingRing default 22px (was 30), spread stays 1.55 max, docs and gallery mount updated.
- LiveActivity width tokenized to --notice-w (was a hardcoded 326 while the token says 330).
- Spec board re-synced with tokens: v4 stamp, accent-pair color text (tokens win over the older no-accent wording), paper rings lightened to .05, swatch outlines un-inset, place microlabel moved off uppercase tracked monospace onto the --place-microlabel recipe, world row wraps instead of overflowing.
- Button Styles board recorded as a decision record (1b chosen), card chrome rings lightened to .05.
- Archival notes added to every superseded board (Playground, v2, v3, v4, iOS v2, iOS v3 Night, Globe Concept, Design System Versions). Tear Options and Naming Screen Options stay live explorations.
- QA: all 23 components pass esbuild, zero undefined var() references, zero broken asset paths in the system and the live boards.

## v3.1 · July 2026, audit
- Full-system audit (audit-2026-07-22.md): components brought onto the paper and ink-returns tokens (Chip, Sheet, Menu, Bubble, Reply, Banner, LiveActivity, Dock, FolderChip, GoalArea, SealedNote), --paper-ring lightened to .05, duplicate and dead tokens removed, night and color-globe tokens fenced into deprecated blocks, ink-etching globe token group added (Globe and MiniGlobe restyled), PlaceCard made imagery-led with a mono microlabel, Permit label Model renamed Mind, app-icon.svg flattened to white, README/SKILL/docs realigned, app-icon-globe.svg flagged for an ink-etching re-cut.

## v3 · July 2026 — completion pack
- Paper replaces glass (user ruling): bubbles, sheets, menus, notices, dock, chrome buttons all opaque paper; lensing glass scoped to world imagery only.
- Earth accent family (--earth-1…6 sand/ochre/clay/umber/moss): facts + tints + selected warmth; ink keeps primary actions. SealedNote stub/wax-mark removed — plain paper card. Hero bumped to v3.
- Buttons v4 “Ink returns” (user-picked 1b; store-listing influence): solid ink primary r12, flat wells, shadows removed from all controls, chosen chip = ink; raised-white retired.
- New-Apple glass pass: lensing recipe — blur 24/36/60 + saturate 1.6–1.8 (+brightness on thick), lighter fills, luminous edge rims (--glass-edge), optional --glass-sheen; ring lightened to .08; radii menu/bubble 26 · sheet 44 (live activity follows menu).
- One-mode ruling: light & minimal everywhere; night demoted to world-imagery only (tear, globe, world glass).
- World-color boundary codified: color only where content IS the world; chrome stays grayscale.
- Added: Agents (AgentMark trust-fill seals + AgentState), Icons (constructed set), tokens/a11y.css (focus ring, contrast pairs, reduced-motion/transparency), layout law (26px margin, safe areas), interactive-state matrix, --arrival-* aliases (world-word naming), --radius-frame (presentation only), provisional blob sprite tokens.
- Components made browser-native (`const React = window.React`) so the Component Gallery can mount them without a bundler.
- Docs: failure voice, haptics/sound map, density rules, waiting language, canned empty states, parity checklist, deprecated-artifacts list.

## v2 · July 2026 — PRODUCT.md alignment
- Two-sides tokens (night ramp, night glass), Homecoming (SealedNote claim ticket, Finding, SourceChip), Society (SocialFact, Whisper, PlacePin, PlaceCard, MiniGlobe), World + Globe components, globe tokens, lexicon section, app-icon-globe asset.

## v1 · July 2026 — foundation + audit
- Ink/porcelain ramps, Sora/Manrope/Unbounded (combo B), liquid glass tiers, raised-white controls (black retired), radii scale + 8 micro, motion vocabulary, porcelain-as-accent (--well/--tag-bg/--track), type floor 11px / +8% tracking cap, buttons radius unified to 16.

## 2026-07-23 — the session's rulings extracted into the system
- `interaction.md` NEW: the surface tree (swipe right inward, dock outward, no fourth surface), the full gesture grammar, the two-engulf rule, the talk as the only text surface, the errand ruling, states in world words.
- `agent-identity.md` NEW: one agent is one individual. the agent record (name, face, form, room), the FACES table (four individuals of one family, eyes only, monochrome), the ROOMS table, and the amendment to the one-mode law: no global dark mode, the light belongs to the agent.
- `tokens/rooms.css` NEW: porcelain, night, dusk as container-scoped token sets, imported into styles.css. world imagery is exempt.
- `components/Sprite.jsx`: gains `faceIdx` and the FACES table.
- `components/Dock.jsx`: gains `soon` for ghosted, inert tabs.
- `components/Globe.jsx`: world variant gains the cloud deck on its own rotation, islets, polar caps, sun glints, ping rings, atmosphere rim.
- `sound.md` amended: navigation sounds now, near-silently. `sound.js` NEW: the prototype synth for all twelve voices.
