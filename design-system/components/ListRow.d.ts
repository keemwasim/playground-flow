/**
 * List row — the one row shape for roster, friends, library, settings.
 * @startingPoint section="Lists" subtitle="Leading slot · title/sub · trailing" viewport="360x120"
 */
export interface ListRowProps {
  leading?: React.ReactNode;   /* FriendDiamond, NoteDoc, runtime glyph tile */
  title: React.ReactNode;
  sub?: React.ReactNode;
  trailing?: React.ReactNode;  /* ghost button, ✓, unread dot */
  chevron?: boolean;
  last?: boolean;              /* suppress divider on final row */
  onClick?: () => void;
}
