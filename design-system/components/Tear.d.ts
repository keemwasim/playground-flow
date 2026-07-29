/**
 * The tear: a circular window onto the living world beyond. THE rule: no sign of it unless a crossing is happening.
 * @startingPoint section="World" subtitle="Living-world portal" viewport="300x260"
 */
export interface TearProps {
  /** Closed = fully invisible. Open only while someone crosses. */
  open?: boolean;
  /** Diameter px. Habitat 148. */
  size?: number;
  /** Which world shows inside: day (1g) | nightAvenue (1i) | midnightSquare (1j). Map to trip depth: Quick look / Overnight / Deep. */
  world?: 'day' | 'nightAvenue' | 'midnightSquare';
  /** Path prefix to design-system/assets/. */
  assetBase?: string;
  /** One-shot silver burst on arrival/return. */
  flash?: boolean;
  style?: React.CSSProperties;
}
