Chips are multi-select flat wells (BRING BACK, toolbelt, mind ids, use `mono` for ids). Chosen chip is solid ink, never an outline. Segmented is single-choice in a recessed track (TRIP DEPTH, WHEN), its white sliding thumb survives ink returns.

```jsx
<Chip selected>Papers</Chip> <Chip>Surprises</Chip>
<Chip mono selected>Playground Core</Chip>
<Segmented options={["Quick look","Overnight","Deep"]} value={depth} onChange={setDepth} />
```
