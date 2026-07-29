Feedback stays grayscale and CSS-driven. Shimmer = "alive right now"; LED pulses only while something is out; ping marks a place, once per beat.

```jsx
<ProgressBar tripMs={12400} shimmer />
<StatusLed live /> <span style={{ font: 'var(--text-label)' }}>live</span>
<PingRing size={22} />
```
