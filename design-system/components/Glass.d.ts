/**
 * Surfaces: Glass (lensing glass, WORLD IMAGERY ONLY), Sheet (paper bottom sheet), Menu (paper dropdown).
 * Paper replaced glass on app chrome (ruled July 2026). Glass survives only over the tear,
 * the globe and world photos, where there is something alive to blur.
 * @startingPoint section="Surfaces" subtitle="Glass over world · paper sheet · paper dropdown" viewport="420x260"
 */
export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** chip: small pieces. element: mid surfaces. panel: large surfaces. All over world imagery only. */
  kind?: 'chip' | 'element' | 'panel';
  radius?: number | string;
}

export interface SheetProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  maxHeight?: string;
}

export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  top?: number;
  right?: number;
  width?: number;
  children?: React.ReactNode;
}
