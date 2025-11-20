# up648 — Infrastructure Project Monitoring Dashboard

Modern dashboard to track provincial infrastructure projects, task progress, and budgets with construction monitoring and S-curve review.

## Overview

This app provides:
- AI-inspired summaries of projects and provinces needing attention.
- Indicator summary cards linking to detailed charts (GDP, Unemployment, Poverty, Infrastructure, etc.).
- Task board details with a rich Task Modal for budget and construction updates.
- Recent budget change logs aggregated across tasks.

## Key Features

- Task Modal
  - Budget absorption display and quick log input (auto-logged to `budgetLogs`).
  - Construction Monitoring Update (S-curve related):
    - Planned vs Actual progress (%), variance badge.
    - Status (On track/At risk/Delayed).
    - Key activities, Issues/risks.
    - Next milestone and expected date.
    - Evidence file upload.
  - S-Curve image sections:
    - Financial Plan and Physical Plan uploads with live preview.
    - Mock SVG preview shown when no image is uploaded.
  - Budget logs list at the bottom of the modal.
  - Scrollable content (max 85vh).

- Overview Page
  - AI Recommendations (full-width card) for quick insights.
  - Two-column layout:
    - Left: Indicator Summary card.
    - Left: Recent Budget Changes card (Show more/less pagination).
    - Right: Province Performance Charts stacked vertically.

## Tech Stack

- React + TypeScript + Vite
- State: Zustand (`src/store/store.ts`)
- Styling: Tailwind CSS (`cn` utility in `src/utils/cn.ts`)

## Getting Started

1. Install
   - `npm install`
2. Develop
   - `npm run dev`
   - Open the local URL shown in the terminal.
3. Build
   - `npm run build`
4. Preview
   - `npm run preview`

## Project Structure (highlights)

- `src/pages/Overview.tsx`
  - AI Recommendations, Indicator Summary, Budget Changes, Charts.
- `src/components/board/TaskCard.tsx`
  - Compact task display used in boards/lists.
- `src/components/board/TaskModal.tsx`
  - Detailed task view. Includes budget absorption update, construction monitoring form, S-curve image areas, and budget logs.
- `src/store/store.ts`
  - Zustand store; `updateTask` automatically appends to `budgetLogs` when `budgetTotal` or `budgetAbsorbed` changes (note supported via `budgetNote`).
- `src/store/mockData.ts`
  - Seeds example tasks, including example `budgetLogs` for demos.
- `src/types/index.ts`
  - Core types, including `Task` and optional `budgetLogs`.

## Data & Logging

- Budget changes are auto-logged as entries in `task.budgetLogs` with fields:
  - `at` (Date), `field` (`budgetTotal` | `budgetAbsorbed`), `from`, `to`, optional `note`.
- The Overview page aggregates and paginates these logs in “Recent Budget Changes.”

## Notes

- Task Modal content is scrollable. Close button is in the top-right; logs are at the bottom.
- S-curve uploads are kept in component state for preview. Persisting them to a backend or store can be added.
- Construction Monitoring form currently resets on save; hook it to a store or API to persist.

## Roadmap

- Persist S-curve images and monitoring updates per task.
- Add filters (province/project) to Budget Changes panel.
- Collapsible sections and sticky modal header for long content.
