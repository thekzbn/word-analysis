# Home Component Architecture
**Author**: Ayomide Deji-Adeyale (@thekzbn)  
**File**: `src/pages/Home.tsx`

The Home page is the high-level dashboard of the "Top 5000 Words" suite. It presents a condensed summary of the linguistic analysis using a modern, multi-column grid system.

---

## 1. Dashboard Logic
The page uses the `analyzeWords` utility to process the word list on mount.
- **State Management**: Results are stored in a `useMemo` block. This ensures that the heavy analysis logic only runs once, regardless of how many times the user interacts with UI elements like the Thesis accordion.
- **Data Selection**: The dashboard only displays the "top" tier of data (e.g., the top 12 letters, top 6 patterns) to prevent information overload.

---

## 2. Core Components

### BentoGrid & BentoItem (`src/components/Bento.tsx`)
The primary layout engine.
- **Logic**: It divides the viewport into an 8-column grid. Items are assigned `colSpan` and `rowSpan` values to create a "tetris-like" fit.
- **Design Philosophy**: Implements "expensive nothingness." No shadows or gradients are used. The cards rely on a 1px `--serenity` border and 1rem padding to define their space.
- **Transitions**: Every card enters the viewport with a subtle opacity fade governed by the Tiara cubic-bezier curve `(0.57, -0.01, 0.21, 0.89)`.

### SimpleBarChart (`src/components/Charts.tsx`)
A wrapper for Recharts functionality.
- **Logic**: It maps character counts to vertical bars. 
- **Styling**: Bars are colored using the `--radiance` variable and feature a `0.25rem` top radius. Tooltips are styled to be flat and border-driven, matching the card aesthetic.

---

## 3. Interaction Modules

### Project Thesis Accordion
- **Logic**: A simple boolean state (`showThesis`) toggles the visibility of the humanized project description.
- **Trigger**: A circular button containing a `Chevron` icon. The icon rotates based on state.
- **Animation**: Framer Motion's `AnimatePresence` is used to smoothly expand the container height from 0 to 'auto'.

### Navigation Action Buttons
Every major data block features an action button (e.g., "View Analysis").
- **Logic**: Uses `react-router-dom` to navigate to the granular detail views.
- **Styling**: These buttons feature a massive `mt-24` (6rem) top margin to ensure the interface feels spacious and uncrowded.

---
*Developed by Ayomide Deji-Adeyale (@thekzbn).*
