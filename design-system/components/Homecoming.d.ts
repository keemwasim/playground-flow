/**
 * Homecoming — the product. Findings are sourced and checkable; they wait sealed at the door
 * until the human opens them (safety as a feeling, never security theater).
 * @startingPoint section="Homecoming" subtitle="Sealed note · finding · source chips" viewport="400x260"
 */
export interface SourceChipProps { children: React.ReactNode; onClick?: () => void; }
export interface FindingProps {
  children: React.ReactNode;                       /* field-journal prose, first person */
  sources?: { label: string; onOpen?: () => void }[];  /* "lumen · archive", "p.14" */
  last?: boolean;
}
export interface SealedNoteProps {
  by: string;          /* companion name (NOT `from` — reserved by x-import) */
  count: number;
  onOpen: () => void;  /* the door only opens inward when you open it */
}
