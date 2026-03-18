# Slides Mock Data Spec

## Overview

Replace the existing dummy data in `src/lib/mock-data.ts` with real presentation content — slides that walk through the step-by-step workflow of building projects with Claude and markdown files.

Each slide corresponds to one concrete workflow step. Slides include a title, description, goals, and at least one code or file snippet illustrating that step. No architecture changes required — only update `mock-data.ts`.

---

## Requirements

### Step 1 — Fresh Next.js Installation

**Description:** Start from a clean Next.js project with App Router, TypeScript, and Tailwind CSS.

**Assumptions:**
- Node.js 20+ and npm/pnpm installed
- App Router (not Pages Router)
- TypeScript enabled by default

**Example prompt:**
```
"Install a fresh Next.js project with TypeScript, Tailwind CSS v4, App Router, and no example files"
```

**Snippet (bash):**
```bash
npx create-next-app@latest markdown-coding \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

---

### Step 2 — Clean Up Boilerplate

**Description:** A default Next.js project ships with unnecessary files, styles, and assets. We clean it up using prompts so only empty scaffolding remains.

**Assumptions:**
- Remove all content from `app/page.tsx` (keep only `export default function Home()`)
- Remove unused styles from `globals.css` (keep only `@import "tailwindcss"`)
- Remove `public/` assets (vercel.svg, next.svg)
- Do NOT change folder structure

**Example prompt:**
```
"Clean up app/page.tsx — keep only an empty Home component.
Clean up globals.css — keep only @import tailwindcss.
Delete public/next.svg and public/vercel.svg."
```

**Snippet (app/page.tsx after cleanup):**
```tsx
export default function Home() {
  return <main></main>
}
```

---

### Step 3 — Add CLAUDE.md

**Description:** `CLAUDE.md` is Claude's configuration file — it is automatically loaded at the start of every session. It defines the tech stack, project commands, and points to context files.

**Assumptions:**
- File lives in the project root (next to `package.json`)
- References context files via `@context/...`
- Contains a `## Commands` section with the most common commands

**Example prompt:**
```
"Create a CLAUDE.md file in the project root.
Add sections: project description, stack, npm run dev/build/lint commands,
and references to context/project-overview.md, context/coding-standards.md,
context/ai-interaction.md, context/current-feature.md"
```

**Snippet (CLAUDE.md):**
```markdown
# My App

Short description of what this project does.

## Context files

Read the following to get the full context of the project.

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

\`\`\`bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
\`\`\`

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **TypeScript**
- **Tailwind CSS v4**
```

---

### Step 4 — Add Context Files

**Description:** Context files are documents loaded by Claude at the start of each session. They define the project, standards, and current state of work. Together they form the AI's "brain" for the project.

**Assumptions:**
- All files live in `context/`
- `current-feature.md` is reset after every feature (history is preserved)
- `coding-standards.md` defines TypeScript, React, and Tailwind rules

**Files to create:**
- `context/project-overview.md` — project description, stack, data models, features, UI guidelines, route structure
- `context/coding-standards.md` — TypeScript strict, no any, React hooks, Tailwind v4 CSS config
- `context/ai-interaction.md` — workflow (Document → Branch → Implement → Test → Commit → Merge)
- `context/current-feature.md` — current feature state (Status, Goals, Notes, History)

**Example prompt:**
```
"Create context/project-overview.md with a full project description.
Use this template as a reference: [paste structure here]"
```

**Snippet (context/current-feature.md — template):**
```markdown
# Current Feature

## Status

## Goals

## Notes

## History
```

---

### Step 5 — Push Initial Commit to GitHub

**Description:** After the project is configured, we set the remote repository and push changes to main. Claude can do this for us based on a simple instruction.

**Assumptions:**
- Repository already exists on GitHub
- Using `main` as the default branch
- Claude asks for the repository URL before proceeding

**Example prompt:**
```
"Set remote origin to https://github.com/[user]/[repo].git
and push the current state to the main branch."
```

**Snippet (bash):**
```bash
git remote add origin https://github.com/user/repo.git
git branch -M main
git add .
git commit -m "chore: initial project setup with CLAUDE.md and context files"
git push -u origin main
```

---

### Step 6 — Design UI with v0

**Description:** Instead of designing UI from scratch, we use [v0.dev](https://v0.dev) — Vercel's tool for generating React components. We paste `project-overview.md` as context and ask for a mockup of a specific view.

**Assumptions:**
- v0 generates a visual mockup, not a working application
- We ask only for one specific view (slide page), not the whole project
- The result is used as a visual reference — we don't copy the code 1:1

**Example v0 prompt:**
```
I want to prototype the UI for a step-by-step developer presentation app.
I am going to give you the entire project overview.
From that, I want you to create ONLY a mockup of the slide view.
It should not function other than visual elements.

Focus on:
- Two-zone layout (sidebar 1/3, main content 2/3)
- Sidebar with step info and prev/next navigation
- Main content with rendered markdown and code blocks with "Copy" button
- Progress bar at the top
- Table of contents page
- Dummy slide content and a few dummy code snippets
- Responsive — on mobile the sidebar collapses

Project Overview:
<!--PASTE project-overview.md HERE-->
```

**Screenshots from v0 (visual reference):**

- @context/screenshots/dashboard.png
- @context/screenshots/dashboard-sidebar.png
- @context/screenshots/dashboard-sidebar-code-example.png
- @context/screenshots/dashboard-sidebar-code-example-2.png

---

### Step 7 — Add Screenshots to Context

**Description:** Screenshots from v0 go into `context/screenshots/` and are referenced in `project-overview.md`. Claude will know how the UI should look during implementation.

**Assumptions:**
- Screenshots saved as `.png` in `context/screenshots/`
- File names describe the view (e.g. `dashboard.png`, `dashboard-sidebar.png`)
- `project-overview.md` has a `## Screenshots` section with the reference list

**Example prompt:**
```
"Add a ## Screenshots section to project-overview.md with references:
- @context/screenshots/dashboard.png
- @context/screenshots/dashboard-sidebar.png"
```

**Snippet (section in project-overview.md):**
```markdown
## Screenshots

Refer to the screenshots below as a base for the dashboard UI.
It does not have to be exact. Use it as a reference.

- @context/screenshots/dashboard.png
- @context/screenshots/dashboard-sidebar.png
- @context/screenshots/dashboard-sidebar-code-example.png
```

---

### Step 8 — Add Feature Skill

**Description:** The `/feature` skill is a set of markdown files under `.claude/skills/feature/` that define the feature management workflow. Once added, you can call `/feature load`, `/feature start`, `/feature complete`, etc.

**Assumptions:**
- Structure: `.claude/skills/feature/SKILL.md` + `actions/*.md`
- Each action is a separate markdown file with instructions for Claude
- The skill is loaded automatically by Claude Code

**File structure:**
```
.claude/
└── skills/
    └── feature/
        ├── SKILL.md
        └── actions/
            ├── load.md
            ├── start.md
            ├── review.md
            ├── explain.md
            ├── complete.md
            └── test.md
```

**Example prompt:**
```
"Create the .claude/skills/feature/ structure with SKILL.md
and actions: load, start, review, explain, complete, test.
Use the structure I'm showing you as a reference."
```

**Snippet (SKILL.md):**
```markdown
---
name: feature
description: Manage current feature workflow - start, review, explain or complete
argument-hint: load|start|review|explain|complete
---

# Feature Workflow

Manages the full lifecycle of a feature from spec to merge.

## Working File

@context/current-feature.md

## Task

Execute the requested action: $ARGUMENTS

| Action   | Description                               |
| -------- | ----------------------------------------- |
| load     | Load a feature spec or inline description |
| start    | Begin implementation, create branch       |
| review   | Check goals met, code quality             |
| explain  | Document what changed and why             |
| complete | Commit, push, merge, reset                |
```

---

### Step 9 — Feature Workflow in Action

**Description:** We walk through the full feature lifecycle — from spec to merge — using the `/feature` command.

**Example calls:**

```
/feature load dashboard-1-spec
```
→ Loads the spec, populates `current-feature.md` (Status: Not Started, Goals from the spec file)

```
/feature start
```
→ Creates branch `feature/dashboard-ui-phase-1`, sets Status: In Progress, implements goals one by one

```
/feature review
```
→ Reviews the code, verifies all Goals are met, suggests fixes

```
/feature explain
```
→ Describes what was implemented and why — ready to add to history

```
/feature complete
```
→ Commit → merge to main → delete branch → reset `current-feature.md` → push

---

### Step 10 — Feature History as Changelog

**Description:** After every `/feature complete` the `## History` section in `current-feature.md` grows. It becomes an automatic project changelog — with no extra effort.

**Assumptions:**
- History is append-only (entries are never deleted)
- Each entry has a date and feature title
- Claude adds the entry automatically during `complete`

**Snippet (History section after a few features):**
```markdown
## History

### 2026-03-18 — Dashboard UI Phase 1

Initialized ShadCN UI and built the main dashboard layout.

- ShadCN UI initialized with button, badge, progress, separator components
- Dark mode set as default with custom palette
- Table of contents home page with hero, chapter sections, and slide cards

### 2026-03-18 — Dashboard UI Phase 2

Added interactivity, animations, and mobile support.

- Collapsible sidebar with slide+fade animation
- Keyboard navigation: ← / → to change slides
- Slide content fade+translate animation using Framer Motion
```

---

## References

- @src/lib/mock-data.ts
- @context/project-overview.md
- @context/current-feature.md
- @context/screenshots/dashboard.png
- @context/screenshots/dashboard-sidebar.png
- @context/screenshots/dashboard-sidebar-code-example.png
- @context/screenshots/dashboard-sidebar-code-example-2.png
- @context/features/dashboard-1-spec.md
- @context/features/dashboard-2-spec.md

## Implementation Notes

- Keep existing TypeScript types (`Slide`, `Chapter`, `Snippet`) — do not change the architecture
- Every slide must have at least one snippet (bash, markdown, or typescript)
- Slide titles in English — the presentation will be delivered in English
- Total slides: 10 (one per step above)
- Split into chapters matching the main phases: Setup, Context Files, Design, Feature Workflow
