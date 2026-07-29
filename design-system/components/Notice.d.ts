/**
 * Arrival surfaces: Banner (paper notification) and LiveActivity (paper trip capsule).
 * Paper on app surfaces. Glass only when one of these floats over world imagery.
 * @startingPoint section="Notifications" subtitle="Return banner + trip capsule" viewport="380x220"
 */
export interface BannerProps {
  title: string;   // "Sol is home ✦"
  body: string;    // "4 findings from the other side"
  meta?: string;   // "now"
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface LiveActivityProps {
  name: string;    // companion name
  status: string;  // whisper text, updates through the trip
  /** Trip duration in ms. CSS animates the bar 4% to 100% linearly. */
  tripMs?: number;
  /** Or drive the bar manually, 0 to 1. */
  progress?: number;
  style?: React.CSSProperties;
}
