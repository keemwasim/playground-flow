/**
 * Desk & world objects: FolderChip (consent packing), NoteDoc (field note), FriendDiamond (other-side friend).
 * @startingPoint section="World" subtitle="Folders, notes, friends" viewport="380x200"
 */
export interface FolderChipProps {
  name: string;
  /** true = held back (full opacity, no packed badge). false = packed by the companion (dimmed, white badge). */
  held?: boolean;
  onTap?: () => void;
  style?: React.CSSProperties;
}
export interface NoteDocProps { size?: number; style?: React.CSSProperties; }
export interface FriendDiamondProps {
  size?: number;
  /** ink-5…ink-9 — friends differ by lightness, never hue. */
  tone?: string;
  style?: React.CSSProperties;
}
