# Detail View Architecture
**Author**: Ayomide Deji-Adeyale (@thekzbn)  
**File**: `src/pages/Detail.tsx`

The Detail view is a dynamic component that provides a granular inspection of specific linguistic categories. It prioritizes data density and comparative analysis.

---

## 1. Dynamic Routing
The component uses `useParams` to identify the current analysis context.
- **Path**: `/details/:type`
- **Mechanism**: A `switch` statement evaluates the `:type` parameter to return the appropriate sub-layout (e.g., `letters`, `patterns`, `vowels`).

---

## 2. Special Components & Logic

### Phonological Pattern Modal
- **Logic**: When a user clicks a pattern card (e.g., "CVCV"), the `selectedPattern` state is updated.
- **Word Filtering**: The modal displays every single word from the 5,000-word list that matches the selected structure.
- **UI**: A fixed-position overlay with a backdrop blur. It uses `overflow-y-auto` to allow scrolling through long lists of words.

### PositionMetric
A custom sub-component used in the Character Distribution view.
- **Logic**: It visualizes the positional probability of a letter.
- **UI**: A thin 1px horizontal progress bar where the filled portion (`--radiance`) represents the percentage of time that letter appears in a specific position (Start, Middle, or End).

### SimpleBarChart (Comparative Mode)
In the Positional Matrix view, two bar charts are placed side-by-side.
- **Onset Chart**: Displays characters most likely to start a word.
- **Coda Chart**: Displays characters most likely to end a word.
- **Purpose**: This layout is designed to help the user identify "bookend" trends in English word construction.

---

## 3. Design Discipline
- **Borders**: All grid containers use `bg-serenity` with a `1px` gap. This creates sharp, clean dividing lines between data cells without increasing the visual "weight" of the cards.
- **Typography**: Strictly uses Inter Display. All technical values are rendered with the same weight as descriptive text to maintain an authoritative, non-decorative tone.
- **Accordions**: Like the Home page, each detail view has an expandable description header. The circular trigger is placed directly beside the title for compact accessibility.

---
*Developed by Ayomide Deji-Adeyale (@thekzbn).*
