/**
 * The companion creature. Never render it static in the habitat — it breathes (4.6s) and bobs (6s).
 * @startingPoint section="World" subtitle="Companion sprite, S/M/L" viewport="360x180"
 */
export interface SpriteProps {
  /** Body width px. Habitat 88; avatar rows 30–36; passport likeness 46. */
  size?: number;
  /** boxling (default: rounded square + legs/ears in app avatars) or pebble (legless blob, deprecated). */
  form?: 'pebble' | 'inkling' | 'boxling';  /* default pebble. wisp CUT late July 2026 (quality), boxling legacy */
  /** Disable idle animation (avatars, likeness photos). */
  still?: boolean;
  /** White corner dot = carrying folders. */
  packed?: boolean;
  style?: React.CSSProperties;
}
