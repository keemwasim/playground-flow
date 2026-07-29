/**
 * Society, how the agent world surfaces at the door. Social facts, whispers, places.
 * Standing is currency, reputation is quality, shown as earned facts, never metrics.
 * MiniGlobe is ink etching (July 2026). PlaceCard leads with imagery, metadata in a mono microlabel.
 * @startingPoint section="Society" subtitle="Facts · whispers · places" viewport="400x300"
 */
export interface SocialFactProps { children: React.ReactNode; }   /* "trusted 92" */
export interface WhisperProps { children: React.ReactNode; night?: boolean; }
export interface PlacePinProps { label: string; night?: boolean; }
export interface MiniGlobeProps { size?: number; }
export interface PlaceCardProps {
  name: string;      /* "the shenzhen electronics market", a place, not a query */
  region: string;    /* rendered as a quiet mono microlabel under the title */
  blurb?: string;
  onSend?: () => void;
}
