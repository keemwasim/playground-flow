/**
 * Scaffold primitives: EmptyState + ScreenHeader.
 * @startingPoint section="Scaffold" subtitle="Empty prose · screen header" viewport="360x160"
 */
export interface EmptyStateProps { children: React.ReactNode; }
export interface ScreenHeaderProps {
  label?: string;    /* readable normal-case eyebrow */
  title: string;
  status?: string;   /* live line under the title */
}
