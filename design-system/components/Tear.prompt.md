The tear is a circular window onto a living, turning world (a rotating city sphere with souls drifting through it). Three canonical worlds, mapped to trip depth: `day` (Quick look), `nightAvenue` (Overnight), `midnightSquare` (Deep). It scales in from nothing — never visible at idle.

```jsx
<Tear open world="nightAvenue" size={148} assetBase="./design-system/assets/" />
<Tear open flash world="day" />
```

Images: assets/world-city.jpg · world-night-street.webp · world-night-square.jpg. Spin uses pgWorldSpinA/B (tile-multiple travel — no loop snap); souls use pgSoul/pgSoul2.
