/**
 * Floating paper tab dock (iOS bottom nav). Tab glyphs are real Lucide paths inlined
 * (span-built glyphs retired July 2026); the Home glyph is the logo. No icon font.
 * @startingPoint section="Navigation" subtitle="Paper dock, 4 tabs" viewport="320x120"
 */
export interface DockProps {
  tabs?: Array<'home' | 'friends' | 'library' | 'settings'>;
  active?: string;
  onChange?: (tab: string) => void;
  style?: React.CSSProperties;
}
