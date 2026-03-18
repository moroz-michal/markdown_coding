# Current Feature: Dashboard UI Phase 1

## Status

In Progress

## Goals

- Initialize ShadCN UI and install required components
- Set up main dashboard layout with global styles
- Configure dark mode as default
- Add top bar with progress bar showing current step
- Add placeholder dummy data to step fields

## Notes

- Reference screenshot: `context/screenshots/dashboard.png`
- Phase 1 of 2 — phase 2 spec is at `context/features/dashboard-2-spec.md`
- Mock data lives in `src/lib/mock-data.ts`
- Stack: Next.js 16, React 19, Tailwind CSS v4, TypeScript, ShadCN UI
- Dark mode first (background `#0a0a0a`, sidebar `#111111`, accent `#6366f1`)
- No `tailwind.config.ts` — Tailwind v4 uses CSS-based config in `globals.css`

## History

<!-- Keep this updated. Earliest to latest. -->
