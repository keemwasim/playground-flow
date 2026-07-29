// React is provided by the loader (DC x-import), no import, no bundler. See README.

/** Real icons, Lucide path data (ISC license), inlined so there is no dependency
    and no font. Stroke currentColor, 2px, round caps, the standard 24 grid.
    Constructed span-glyphs were retired on the owner's word (July 2026). */
const Svg = ({ size = 20, style, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>{children}</svg>
);

function IconBack({ size, style }) {
  return <Svg size={size} style={style}><path d="m15 18-6-6 6-6" /></Svg>;
}
function IconClose({ size, style }) {
  return <Svg size={size} style={style}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Svg>;
}
function IconShare({ size, style }) {
  return <Svg size={size} style={style}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="m16 6-4-4-4 4" /><path d="M12 2v13" /></Svg>;
}
function IconFilter({ size, style }) {
  return <Svg size={size} style={style}><path d="M3 6h18" /><path d="M7 12h10" /><path d="M10 18h4" /></Svg>;
}
function IconMap({ size, style }) {
  return <Svg size={size} style={style}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></Svg>;
}
function IconSearch({ size, style }) {
  return <Svg size={size} style={style}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>;
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { IconBack, IconClose, IconShare, IconFilter, IconMap, IconSearch });
