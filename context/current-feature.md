# Current Feature

<!-- Current feature here -->

## Status

<!-- Current status here -->

## Goals

<!-- Add goals here -->

## Notes

<!-- Add notes here -->

## History

<!-- Keep this updated. Earliest to latest. -->

### 2026-03-18 — Dashboard UI Phase 1

Initialized ShadCN UI and built the main dashboard layout.

- ShadCN UI initialized with button, badge, progress, separator components
- Dark mode set as default with custom palette (#0a0a0a background, #6366f1 indigo accent)
- Table of contents home page with hero, chapter sections, and slide cards
- Slide page with sidebar: step counter, chapter badge, goals list, prev/next navigation
- Top progress bar on sidebar showing current step position
- Mock data with 6 slides across 6 chapters with goals and code snippets
- TypeScript types for Slide, Chapter, and Snippet

### 2026-03-18 — Dashboard UI Update

Rebranded accent color from indigo to red and applied Raycast-style UI polish.

- Primary color changed to `rgb(245, 51, 63)` across all UI elements
- "Markdown" in the hero title is now red; "Coding" stays white
- All red-background containers (badges, number circles, active TOC card) now use white text
- Active TOC slide card uses solid red background

### 2026-03-18 — Dashboard UI Phase 2

Added interactivity, animations, and mobile support to the slide layout.

- Collapsible sidebar with slide+fade animation (desktop panel, mobile Sheet drawer)
- Keyboard navigation: ← / → to change slides, Esc returns to table of contents
- Slide content fade+translate animation using Framer Motion (`motion`)
- Progress bar now animates from the previous step's value instead of always from 0
- Prev/Next navigation routed through `navigate()` for consistent fade transitions
- Example markdown snippets added to all slides
