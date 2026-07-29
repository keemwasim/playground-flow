/**
 * World — the circular window onto the living world (tear interior, globe, spec demos).
 * Depth picks the place; treatment picks the light. The world imagery is the product's only color.
 * @startingPoint section="World" subtitle="Place × light treatment" viewport="160x160"
 */
export interface WorldProps {
  depth?: 'Quick look' | 'Overnight' | 'Deep';        /* city / night street / midnight square */
  treatment?: 'none' | 'dawn' | 'rain' | 'festival';  /* light treatments, in exploration */
  size?: number;        /* px, default 120 */
  souls?: number;       /* drifting souls, default 1 */
  base?: string;        /* asset path prefix, default design-system/assets */
}
