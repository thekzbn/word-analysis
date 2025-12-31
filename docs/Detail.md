# Detail View Architecture

**Author**: Ayomide Deji-Adeyale (@thekzbn)
**File**: `src/pages/Detail.tsx`

The Detail view renders focused inspections of individual analysis categories. Each view exposes the full dataset for its category and supports comparison without introducing additional abstraction layers.

## Routing

Routing is parameter-driven. The active analysis type is read from the URL and determines which layout and data slice are rendered.

The route shape is `/details/:type`. The `type` parameter is evaluated explicitly and mapped to a corresponding view. Unsupported values resolve to a safe fallback.

No data is recomputed during navigation.

## Pattern inspection

### Structural pattern modal

Pattern cards are interactive. Selecting a card updates a local state value representing the active pattern. This state controls the visibility and content of the modal.

The modal lists every word from the corpus that matches the selected structure. Filtering is performed against precomputed pattern groups. No additional passes over the word list occur at this stage.

The modal is rendered as a fixed overlay. Long lists are scrollable. The background is visually suppressed without introducing visual noise.

## Positional metrics

### PositionMetric

`PositionMetric` is a local component used in character distribution views. It represents the positional likelihood of a letter using a single horizontal bar.

The filled portion of the bar corresponds to the percentage of occurrences at a given position. Values are rendered directly. No smoothing or interpolation is applied.

## Comparative views

### Side-by-side distributions

Some views render paired bar charts to allow direct comparison. A common example is onset versus terminus distribution.

Charts share scale and configuration to preserve comparability. Their purpose is contrast, not decoration.

## Presentation constraints

Containers are separated using background colour and one-pixel gaps rather than shadows or elevation. Typography is uniform. Numeric values are not visually emphasised beyond their position in the layout.

Expandable descriptions follow the same interaction pattern used on the Home page. Triggers are colocated with titles to minimise scanning overhead.