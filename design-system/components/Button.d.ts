/**
 * Playground button, ink returns v4 (user-picked 1b, July 2026). Primary is solid ink,
 * radius 12, zero shadow. Controls are flat. Raised-white is retired.
 * @startingPoint section="Controls" subtitle="Primary ink · ghost well · quiet text" viewport="360x140"
 */
export interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'quiet';
  size?: 'md' | 'lg';        /* lg = full-width sheet CTA */
  full?: boolean;
  onDark?: boolean;          /* over world imagery: luminous white pill, the one exception */
  children: React.ReactNode;
  onClick?: () => void;
}
