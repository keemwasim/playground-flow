// React is provided by the loader (DC x-import) — no import, no bundler. See README.

const WORLDS = {
  day: 'world-city.jpg',
  nightAvenue: 'world-night-street.webp',
  midnightSquare: 'world-night-square.jpg',
};

/** The tear, ruled July 2026: the MISTED VEIL. No hard edge, the wallpaper thins
    into fog and the world shows through it. Invisible unless open.
    The world layer reads --peer-x/--peer-y (px) from the host surface, so the
    tear behaves like a real window: pointer on web, gyroscope on iOS, move to
    peer around the world beyond. Unset vars = still window. */
function Tear({ open = false, size = 148, world = 'day', assetBase = './assets/', flash = false, style }) {
  size = Number(size) || 148;
  const img = assetBase + (WORLDS[world] || WORLDS.day);
  const spin = world === 'midnightSquare' ? 'pgWorldSpinB 32s linear infinite' : 'pgWorldSpinA 28s linear infinite';
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <div style={{
        position: 'absolute', inset: '-14%', borderRadius: '50%',
        opacity: open ? 1 : 0, transition: 'opacity var(--dur-tear) ease',
        background: 'radial-gradient(circle, rgba(120,120,130,.25), transparent 68%)', filter: 'blur(10px)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
        opacity: open ? 1 : 0, transform: open ? 'scale(1)' : 'scale(.6)',
        transition: 'opacity var(--dur-tear) ease, transform var(--dur-tear) var(--ease-pop)',
        WebkitMaskImage: 'radial-gradient(circle, black 52%, transparent 76%)',
        maskImage: 'radial-gradient(circle, black 52%, transparent 76%)',
      }}>
        <div style={{ position: 'absolute', inset: '-8%', backgroundImage: `url('${img}')`, backgroundSize: 'auto 150%', backgroundRepeat: 'repeat-x', animation: spin, transform: 'translate(var(--peer-x, 0px), var(--peer-y, 0px))', transition: 'transform .2s ease-out' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 36% 30%, rgba(255,255,255,.22), transparent 42%), radial-gradient(circle at 50% 50%, transparent 55%, rgba(10,10,14,.4) 82%, rgba(5,5,8,.78) 100%)' }} />
        <div style={{ position: 'absolute', left: '24%', top: '40%', width: 6, height: 13, borderRadius: '50%', background: 'rgba(255,255,255,.85)', filter: 'blur(2.5px)', animation: 'pgSoul 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', left: '62%', top: '48%', width: 4, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,.7)', filter: 'blur(2px)', animation: 'pgSoul2 9s ease-in-out 2.4s infinite' }} />
      </div>
      {flash && <div style={{ position: 'absolute', left: '50%', top: '50%', width: size * 1.15, height: size * 1.15, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,230,236,.9), rgba(150,150,158,0) 70%)', animation: 'pgFlash .9s ease-out forwards' }} />}
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { Tear });
