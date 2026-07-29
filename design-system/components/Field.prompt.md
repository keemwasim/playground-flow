Form primitives. HatchInput is the intimate one — used when the user gives the companion its name; keep it bare (no glass box).

```jsx
<Label>Goal</Label>
<GoalArea placeholder="e.g. Find what contradicts chapter 2 of my thesis" />
<HatchInput placeholder="Sol?" onEnter={give} />
<Toggle on={sound} onChange={setSound} />
```
