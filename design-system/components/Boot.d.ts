/**
 * Brand motion: AnimatedLogo (mark blinks its hole like an eye) + BootScreen (launch sequence).
 * @startingPoint section="Brand" subtitle="Blinking mark + boot screen" viewport="360x220"
 */
export interface AnimatedLogoProps {
  size?: number;
  color?: string;
  /** Must match the surface behind the mark. */
  hole?: string;
  breathe?: boolean;
  style?: React.CSSProperties;
}
export interface BootScreenProps { caption?: string; style?: React.CSSProperties; }
