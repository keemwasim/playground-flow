// React is provided by the loader (DC x-import) — no import, no bundler. See README.

const PLACES = {
  'Quick look': { img: 'world-city.jpg', spin: 30 },
  'Overnight': { img: 'world-night-street.webp', spin: 34 },
  'Deep': { img: 'world-night-square.jpg', spin: 40 },
};
const TREATMENTS = {
  none: '',
  dawn: 'sepia(.35) brightness(1.2)',
  rain: 'brightness(.85) contrast(1.1)',
  festival: 'saturate(1.6) brightness(1.12)',
};

/** Circular window onto the living world. depth picks the place; treatment picks the light. */
function World({ depth = 'Overnight', treatment = 'none', size = 120, base = 'design-system/assets', souls = 1, style }) {
  size = Number(size) || 120; souls = Number(souls) || 0;
  const p = PLACES[depth] || PLACES['Overnight'];
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <div style={{ position: 'absolute', inset: -Math.round(size * 0.075), borderRadius: '50%', background: 'radial-gradient(circle, rgba(150,150,158,.4), transparent 70%)', filter: 'blur(11px)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 22px rgba(150,150,158,.75)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${base}/${p.img}')`, backgroundSize: 'auto 150%', backgroundRepeat: 'repeat-x', animation: `pgWorldSpinA ${p.spin}s linear infinite`, filter: TREATMENTS[treatment] || '' }} />
        {treatment === 'rain' && <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(105deg, transparent 0px, transparent 6px, rgba(255,255,255,.14) 6px, rgba(255,255,255,.14) 7px)' }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 36% 30%, rgba(255,255,255,.22), transparent 42%), radial-gradient(circle at 50% 50%, transparent 55%, rgba(10,10,14,.4) 82%, rgba(5,5,8,.78) 100%)' }} />
        {Array.from({ length: souls }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${26 + i * 24}%`, top: `${42 + (i % 2) * 8}%`, width: 5, height: 11, borderRadius: '50%', background: 'rgba(255,255,255,.8)', filter: 'blur(2px)', animation: `pgSoul ${7 + i * 2}s ease-in-out ${i * 1.8}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { World });
