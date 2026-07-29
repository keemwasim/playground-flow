/**
 * Conversation primitives: Bubble (creature speech container, paper), Line (staggered speech line), Reply (user's answer card, flat well).
 * @startingPoint section="World" subtitle="Speech bubble + reply cards" viewport="380x240"
 */
export interface BubbleProps {
  /** bare = no paper chrome. Used for the hatch conversation floating in the world. */
  bare?: boolean;
  maxW?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface LineProps {
  /** ms. Stagger successive lines 350 to 800ms. */
  delay?: number;
  children?: React.ReactNode;
}

export interface ReplyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  delay?: number;
  /** Consequence line, e.g. "verifies twice · shares sparingly · home early". */
  sub?: string;
}
