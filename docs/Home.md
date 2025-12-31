# Home Component Architecture

**Author**: Ayomide Deji-Adeyale (@thekzbn)
**File**: `src/pages/Home.tsx`

The Home page functions as the primary dashboard. It presents a constrained overview of the analysis results and acts as the entry point to deeper inspection. The page is intentionally summarised. It does not attempt to expose the full dataset.

## Dashboard behaviour

The analysis is performed by the `analyzeWords` utility during initial render. The result is memoised to ensure the computation runs exactly once. Subsequent UI interactions do not trigger recomputation.

Only the highest-frequency subsets of each dataset are displayed. This is a deliberate restriction. The dashboard exists to show structure at a glance, not to exhaust the data.

## Layout system

### Bento grid

The layout is implemented by the `BentoGrid` and `BentoItem` components in `src/components/Bento.tsx`. The grid is defined as an eight-column system. Each item declares its own column and row span, allowing asymmetric placement without manual positioning.

Cards are visually defined using spacing and borders only. No shadows or gradients are used. Each container uses a single one-pixel `--serenity` border and standardised padding to establish separation.

Cards enter the viewport with a minimal opacity transition. The motion curve and duration follow the Tiara system and are applied uniformly.

## Data visualisation

### Bar charts

Simple bar charts are rendered through a thin wrapper around Recharts in `src/components/Charts.tsx`. The wrapper exists to centralise configuration and styling.

Bars represent raw counts only. No smoothing or interpolation is applied. Colour usage is limited to the `--radiance` token. Tooltips are flat and border-defined, matching the surrounding containers.

## Interaction

### Project thesis

The project thesis is hidden by default and toggled via a single boolean state. Its purpose is explanatory rather than navigational.

Visibility changes are animated using Framer Motion’s presence handling. Height transitions expand from zero to content height without easing exaggeration.

### Navigation actions

Each summary block exposes a single action that links to its corresponding detailed view. Navigation is handled by `react-router-dom`.

Vertical spacing around these actions is intentionally generous. The goal is to prevent visual crowding and preserve scanning rhythm, not to optimise for density.