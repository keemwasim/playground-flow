/**
 * Form primitives: Toggle (iOS switch), Label (normal case and tracking), HatchInput (bare centered input + fading rule), GoalArea (flat-well textarea).
 * @startingPoint section="Controls" subtitle="Switch, labels, inputs" viewport="380x220"
 */
export interface ToggleProps { on?: boolean; onChange?: (on: boolean) => void; style?: React.CSSProperties; }
export interface LabelProps { children?: React.ReactNode; style?: React.CSSProperties; }
export interface HatchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
  onEnter?: (e: React.KeyboardEvent) => void;
}
export interface GoalAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { rows?: number; }
