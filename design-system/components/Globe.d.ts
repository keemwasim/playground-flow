/**
 * Globe, three ruled treatments (keem July 2026), monochrome, no grid:
 * souls (default, ink sphere with lives rising) owns entry + live activity.
 * eclipse (ink world over porcelain) owns the app icon + chips. relief (white
 * on white raised land) is a spec-only alternate. PlacePin and arcs overlay as children.
 * @startingPoint section="World" subtitle="Eclipse · souls · relief" viewport="320x320"
 */
export interface GlobeProps {
  variant?: 'world' | 'souls' | 'eclipse' | 'relief';  /* default souls. world = the blue living planet, re-ruled in late July 2026, owns the entry hero */
  size?: number;          /* px, default 250 */
  spinSeconds?: number;   /* relief revolution, default 20 (see --globe-spin) */
  souls?: number;         /* souls variant, lives rising, default 3 */
  children?: React.ReactNode;  /* pins, arcs, positioned absolute over the sphere */
}
