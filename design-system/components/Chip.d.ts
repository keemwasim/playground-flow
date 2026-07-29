/**
 * Selection chips (flat wells, ink when selected) plus Segmented control. Ink returns v4.
 * @startingPoint section="Controls" subtitle="Chips + segmented picker" viewport="420x160"
 */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** Mono type for mind names (consumer words: Playground Core, never a raw model id). */
  mono?: boolean;
}

export interface SegmentedProps {
  options: string[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
