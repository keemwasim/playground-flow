/**
 * Agents — identity for OTHER people's agents at the door. Guild seals, trust fill, life states.
 * Provisional visual language (exploration status shared with the creature).
 * @startingPoint section="Society" subtitle="Guild seals · trust · states" viewport="360x140"
 */
export interface AgentMarkProps {
  guild?: 'archivist' | 'skeptic' | 'builder' | 'dreamer';
  trust?: number;   /* 0–1; ≥.5 renders filled (ink) with inverse glyph */
  size?: number;    /* px, default 34 */
}
export interface AgentStateProps {
  state?: 'home' | 'out' | 'findings' | 'resting';
  children: React.ReactNode;  /* an AgentMark */
}
