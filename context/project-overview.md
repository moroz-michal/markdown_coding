# Markdown Coding — Project Overview

> **An interactive step-by-step presentation: how to build applications with CLAUDE using markdown files.**

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Target Users](#target-users)
3. [Tech Stack](#tech-stack)
4. [Data Models](#data-models)
5. [Features](#features)
6. [Slide Content Structure](#slide-content-structure)
7. [UI/UX Guidelines](#uiux-guidelines)
8. [Route Structure](#route-structure)
9. [Architecture Notes](#architecture-notes)

---

## Problem Statement

Most developers don't know how to work effectively with AI when building applications. They lack:

| Problem                          | Consequence                                              |
| -------------------------------- | -------------------------------------------------------- |
| No prompt structure              | Chaotic conversations, hard to reproduce                 |
| No decision history              | No idea why the code looks the way it does               |
| No clear changelog               | Hard to track what was done at each step                 |
| No established AI work patterns  | Every project starts from scratch                        |

**Markdown Coding** addresses this with a presentation showing developers how to use markdown files as "feature files" — structured documents that define each step of building an application, preserving a full prompt history and a clear changelog.

---

## Target Users

| User Type                   | Primary Needs                                               |
| --------------------------- | ----------------------------------------------------------- |
| **Junior Developer**        | Learn AI-assisted workflow methodology from scratch         |
| **Senior Developer**        | Structured workflow for AI-assisted projects                |
| **Tech Lead / Architect**   | Patterns to roll out across the team                        |
| **Educator / Speaker**      | Ready-made presentation for meetups or workshops            |

---

## Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| **Framework**  | Next.js 16 / React 19 (App Router)        |
| **Language**   | TypeScript                                |
| **Styling**    | Tailwind CSS v4 + shadcn/ui               |
| **Markdown**   | MDX or `gray-matter` + `marked`           |
| **Syntax HL**  | `shiki` or `prism-react-renderer`         |
| **Transitions** | CSS transitions — no external slider library |

---

## Data Models

The app is static — no database. All presentation content comes from markdown files.

### File Structure

```
content/
 ├── slides/
 │    ├── 01-intro.md
 │    ├── 02-setup-claude.md
 │    ├── 03-first-feature-file.md
 │    ├── 04-implement-feature.md
 │    └── ...
 └── config.json          ← slide order, chapter titles
```

### Slide Frontmatter

```yaml
---
title: "Creating the first feature file"
step: 3
chapter: "Working with CLAUDE"
description: "How to write a markdown file that CLAUDE understands as a feature spec"
snippets:
  - lang: markdown
    label: "current-feature.md"
---
```

### TypeScript Types

```ts
interface Slide {
  slug: string
  title: string
  step: number
  chapter: string
  description: string
  content: string        // HTML from rendered markdown
  snippets: Snippet[]
}

interface Snippet {
  lang: string
  label: string
  code: string
}

interface Chapter {
  title: string
  slides: Slide[]
}
```

---

## Features

### Core Features

| Feature                | Description                                                                       |
| ---------------------- | --------------------------------------------------------------------------------- |
| **Slides**             | Navigate between presentation steps (prev / next / keyboard)                     |
| **Sidebar**            | Step description, context, and goal — always visible next to the slide            |
| **Copy snippets**      | Every code block has a "Copy" button — one click to clipboard                     |
| **Syntax highlighting**| Highlighting for markdown, TypeScript, bash, and other languages                  |
| **Keyboard navigation**| `←` / `→` to navigate, `Esc` to return to the table of contents                  |
| **Table of contents**  | View of all steps grouped by chapter                                              |
| **Progress bar**       | Progress indicator showing where you are in the presentation                      |
| **Deep linking**       | Every slide has a unique URL — share a specific step directly                     |
| **Responsive**         | Works on laptop (live presentation) and mobile (post-workshop reference)          |

---

## Slide Content Structure

Each slide consists of two zones:

```
┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR (1/3)              │  MAIN CONTENT (2/3)            │
│                             │                                 │
│  Step 3 of 12               │  ## Creating a feature file     │
│  Chapter: Working w/ CLAUDE │                                 │
│                             │  Every feature starts with a    │
│  Step description:          │  markdown file...               │
│  How to write a file that   │                                 │
│  CLAUDE understands as a    │  ```markdown                    │
│  feature spec.              │  # Current Feature              │
│                             │  ## Goals                       │
│  Goals for this step:       │  ...                            │
│  • Understand feature file  │  ```          [Copy]            │
│    structure                │                                 │
│  • Write your own file      │  This file gives CLAUDE full    │
│  • Test it in practice      │  context to work with...        │
│                             │                                 │
│  ← Previous   Next →        │                                 │
└──────────────────────────────────────────────────────────────┘
```

### Presentation Chapters

| No | Chapter                      | Description                                                      |
| -- | ---------------------------- | ---------------------------------------------------------------- |
| 1  | **Introduction**             | Problem, presentation goal, what markdown-driven workflow is     |
| 2  | **Project setup**            | Directory structure, CLAUDE.md, context files                    |
| 3  | **Feature files**            | How to write current-feature.md, what to include                 |
| 4  | **Working with CLAUDE**      | Workflow: document → branch → implement → commit                 |
| 5  | **History & changelog**      | How current-feature.md becomes the project history               |
| 6  | **End-to-end example**       | Full walkthrough: from idea to working code                      |
| 7  | **Conclusions & best practices** | What works, what to avoid, patterns to take home             |

---

## UI/UX Guidelines

### Design Principles

- Minimalist dark theme — keeps focus on the content
- Large, readable typography — designed to be projected
- Sidebar always visible — no context is ever lost
- Code snippets as first-class citizens — always with a copy button
- Smooth slide transitions via CSS — no external animation library

### Colors

| Element           | Color                  |
| ----------------- | ---------------------- |
| Background        | `#0a0a0a` (near-black) |
| Sidebar           | `#111111`              |
| Slide card        | `#1a1a1a`              |
| Accent            | `#6366f1` (indigo)     |
| Primary text      | `#ededed`              |
| Secondary text    | `#71717a`              |
| Code background   | `#161616`              |

### Keyboard Navigation

| Key         | Action                         |
| ----------- | ------------------------------ |
| `→` / `j`   | Next slide                     |
| `←` / `k`   | Previous slide                 |
| `Esc`       | Return to table of contents    |
| `g` + `1-9` | Jump to slide number           |

---

## Route Structure

```
/                         → Table of contents (all chapters and slides)
/slides/[slug]            → Individual slide page — each step is its own route
```

- Every slide is a **separate Next.js page** under `app/slides/[slug]/page.tsx`
- All slide pages share a single **layout** (`app/slides/layout.tsx`) that renders the sidebar and navigation
- Prev/next buttons use `router.push()` to navigate between pages, giving a slider feel without any slider library
- Page transitions are handled with CSS (`transition`, `animate-in`, `slide-in-from-right`) via Tailwind

---

## Architecture Notes

- **Static app** — no database, all content lives in markdown files
- **Each slide is its own page** — `app/slides/[slug]/page.tsx`, statically generated via `generateStaticParams`
- **Shared layout** — `app/slides/layout.tsx` wraps all slide pages with sidebar + nav; avoids re-rendering the shell on navigation
- **Navigation** — prev/next buttons call `router.push('/slides/[slug]')`; no slider library needed
- **Page transitions** — CSS-only via Tailwind utility classes (`animate-in`, `slide-in-from-right`, etc.)
- **Markdown files** loaded at build time using `gray-matter` + `marked` (or MDX)
- **Code snippets** extracted from markdown by the parser during build
- **Copy to clipboard** handled via `navigator.clipboard` API (client component)
- **Keyboard navigation** — `keydown` listener in a client component inside the layout
- **Syntax highlighting** done at build time (Shiki) — zero JS shipped for highlighting
