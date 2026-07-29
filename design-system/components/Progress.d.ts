/**
 * Progress + status primitives. Progress is CSS-driven (pgTrip / pgShimmer), never a JS tick.
 * @startingPoint section="Feedback" subtitle="Bar · LED · ping ring" viewport="360x120"
 */
export interface ProgressBarProps {
  value?: number;      /* 0–100 static fill */
  tripMs?: number;     /* CSS animates the full trip; overrides value */
  shimmer?: boolean;   /* live sheen while out */
}
export interface StatusLedProps { live?: boolean; }
export interface PingRingProps { size?: number; /* default 22 (--ping-size), spread max 1.55 */ delay?: number; }
