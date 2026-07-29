/**
 * Permit, the companion keepsake (hub / settings). Consumer copy: "YOUR COMPANION".
 * A warm record, never a form. The creed prints verbatim, always in quotes.
 * The mind reads as a consumer word, a raw model id never appears on this surface.
 * @startingPoint section="Cards" subtitle="Name, temperament, creed" viewport="380x200"
 */
export interface PermitProps {
  name: string;
  temperament?: string;         /* Curious / Careful / Bold, rendered lowercase */
  mind?: string;                /* consumer word, defaults to Playground Core */
  creed?: string;               /* quoted verbatim, never paraphrase */
  photo?: React.ReactNode;      /* Sprite at avatar scale, sits free, no frame */
}
