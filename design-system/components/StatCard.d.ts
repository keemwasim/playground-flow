/**
 * Stat card — hero number over tracked grotesk label. Used in trios (record).
 * @startingPoint section="Lists" subtitle="TRIPS / FRIENDS / FIELD NOTES" viewport="360x110"
 */
export interface StatCardProps {
  value: React.ReactNode;  /* keep it a number; no "+7%" deltas — this is a diary, not analytics */
  label: string;           /* rendered normal case with normal tracking */
}
