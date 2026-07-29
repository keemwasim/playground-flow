/**
 * Playground brand mark (backwards-P) with optional lowercase wordmark.
 * @startingPoint section="Brand" subtitle="Backwards-P mark + wordmark" viewport="300x120"
 */
export interface LogoProps {
  /** Mark width in px. Menubar 13–14, headers 16, boot screen 52. */
  size?: number;
  /** Render "playground" in Unbounded next to the mark. */
  wordmark?: boolean;
  /** Mark color. Black on light surfaces; #FFFFFF on ink surfaces. */
  color?: string;
  /** The P's counter hole. Match the surface behind the mark (e.g. #111111 on black cards). */
  hole?: string;
  gap?: number;
}
