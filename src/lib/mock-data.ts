import { Chapter, Slide } from "@/types/slides";

export const slides: Slide[] = [
  // ─── Chapter 1: Setup ───────────────────────────────────────────────────────

  {
    slug: "fresh-nextjs-installation",
    title: "Fresh Next.js Installation",
    step: 1,
    chapter: "Setup",
    description:
      "Start every project from a clean Next.js scaffold with TypeScript, Tailwind CSS v4, and App Router.",
    goals: [
      "Install a fresh Next.js project with the right flags",
      "Understand which options to pick at setup time",
      "Verify the dev server starts correctly",
    ],
    content: `## Start Clean

Every project in this workflow starts from a fresh Next.js installation. We use specific flags to get exactly what we need — no example pages, no Pages Router, correct import alias.

Run the command below and answer the prompts, or pass all flags to skip them entirely.

After installation, run \`npm run dev\` and confirm the app opens at \`localhost:3000\`.`,
    snippets: [
      {
        lang: "bash",
        label: "Terminal",
        code: `npx create-next-app@latest my-app \\
  --typescript \\
  --tailwind \\
  --app \\
  --src-dir \\
  --import-alias "@/*"`,
      },
    ],
  },

  {
    slug: "clean-up-boilerplate",
    title: "Clean Up Boilerplate",
    step: 2,
    chapter: "Setup",
    description:
      "Remove default Next.js boilerplate using prompts so only empty scaffolding remains.",
    goals: [
      "Strip page.tsx down to an empty Home component",
      "Remove unused styles from globals.css",
      "Delete public/ assets that ship with Next.js",
    ],
    content: `## Prompt-Driven Cleanup

A default Next.js project ships with demo content, styles, and SVG assets you don't need. Instead of deleting them manually, we describe what we want to Claude and let it handle the cleanup.

This is your first taste of the workflow: **write what you want, not what to do**.`,
    snippets: [
      {
        lang: "markdown",
        label: "Prompt to Claude",
        code: `Clean up the boilerplate from the default Next.js installation:

- app/page.tsx — remove all content, keep only an empty Home component
- app/globals.css — remove all styles, keep only \`@import "tailwindcss"\`
- Delete public/next.svg and public/vercel.svg`,
      },
      {
        lang: "typescript",
        label: "src/app/page.tsx (after cleanup)",
        code: `export default function Home() {
  return <main></main>
}`,
      },
    ],
  },

  // ─── Chapter 2: Context Files ────────────────────────────────────────────────

  {
    slug: "add-claude-md",
    title: "Add CLAUDE.md",
    step: 3,
    chapter: "Context Files",
    description:
      "CLAUDE.md is loaded automatically every session. It tells Claude your stack, commands, and where to find context files.",
    goals: [
      "Understand what CLAUDE.md is and why it matters",
      "Create it in the project root with the correct sections",
      "Reference all context files from within it",
    ],
    content: `## The AI Configuration File

\`CLAUDE.md\` sits in your project root and is automatically loaded by Claude Code at the start of every conversation. It answers the first question Claude always has: *what is this project?*

A good CLAUDE.md has three parts:
- **Stack** — framework, language, styling
- **Commands** — how to run, build, and lint
- **Context pointers** — where to find deeper documentation`,
    snippets: [
      {
        lang: "markdown",
        label: "CLAUDE.md",
        code: `# My App

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

- **Next.js 16** with App Router (\`src/app/\`)
- **TypeScript**
- **Tailwind CSS v4**`,
      },
    ],
  },

  {
    slug: "add-context-files",
    title: "Add Context Files",
    step: 4,
    chapter: "Context Files",
    description:
      "Four markdown files that give Claude the full picture of your project, standards, workflow, and current task.",
    goals: [
      "Create project-overview.md with project description and architecture",
      "Create coding-standards.md with TypeScript, React, and Tailwind rules",
      "Create ai-interaction.md with the Document → Branch → Implement → Commit workflow",
      "Create current-feature.md as the living feature tracker",
    ],
    content: `## The Brain of the Project

Context files are the documents Claude reads before touching any code. Together they answer four questions:

| File | Answers |
| ---- | ------- |
| \`project-overview.md\` | What are we building and why? |
| \`coding-standards.md\` | How do we write code here? |
| \`ai-interaction.md\` | How do we work together? |
| \`current-feature.md\` | What are we building right now? |

\`current-feature.md\` is the only file that changes frequently. The others are written once and updated rarely.`,
    snippets: [
      {
        lang: "markdown",
        label: "context/project-overview.md",
        code: `# My App — Project Overview

> Short tagline describing what this project is.

## Problem Statement

| Problem                         | Consequence                                |
| ------------------------------- | ------------------------------------------ |
| No prompt structure             | Chaotic conversations, hard to reproduce   |
| No decision history             | No idea why the code looks the way it does |
| No clear changelog              | Hard to track what was done at each step   |

## Target Users

| User Type            | Primary Needs                              |
| -------------------- | ------------------------------------------ |
| **Junior Developer** | Learn AI-assisted workflow from scratch    |
| **Senior Developer** | Structured workflow for AI-assisted work   |
| **Tech Lead**        | Patterns to roll out across the team       |

## Tech Stack

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| **Framework** | Next.js 16 / React 19 (App Router) |
| **Language**  | TypeScript                         |
| **Styling**   | Tailwind CSS v4 + shadcn/ui        |

## Features

- Navigation between slides (prev / next / keyboard)
- Sidebar with step description and goals
- Copy button on every code block
- Progress bar showing current position
- Responsive — sidebar collapses on mobile

## Route Structure

\`\`\`
/                   → Table of contents
/slides/[slug]      → Individual slide page
\`\`\`

## UI/UX Guidelines

- Dark mode by default
- Minimalist — focus on content
- Reference: Raycast

## Screenshots

- @context/screenshots/dashboard.png
- @context/screenshots/dashboard-sidebar.png`,
      },
      {
        lang: "markdown",
        label: "context/current-feature.md",
        code: `# Current Feature

## Status

## Goals

## Notes

## History`,
      },
      {
        lang: "markdown",
        label: "context/ai-interaction.md",
        code: `# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** - Document the feature in @context/current-feature.md.
2. **Branch** - Create new branch for feature, fix, etc
3. **Implement** - Implement the feature/fix that I create in @context/current-feature.md
4. **Test** - Verify it works in the browser. Run \`npm run build\` and fix any errors
5. **Iterate** - Iterate and change things if needed
6. **Commit** - Only after build passes and everything works
7. **Merge** - Merge to main
8. **Delete Branch** - Delete branch after merge
9. **Review** - Review AI-generated code periodically and on demand.
10. Mark as completed in @context/current-feature.md and add to history

Do NOT commit without permission and until the build passes.

## Branching

We will create a new branch for every feature/fix.
Name branch **feature/[feature]** or **fix/[fix]**, etc.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (feat:, fix:, chore:, etc.)
- Keep commits focused (one feature/fix per commit)
- Never put "Generated With Claude" in commit messages

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Code Review

Review AI-generated code periodically, especially for:

- Security (auth checks, input validation)
- Performance (unnecessary re-renders, N+1 queries)
- Logic errors (edge cases)
- Patterns (matches existing codebase?)`,
      },
    ],
  },

  // ─── Chapter 3: Design ───────────────────────────────────────────────────────

  {
    slug: "push-to-github",
    title: "Push to GitHub",
    step: 5,
    chapter: "Design",
    description:
      "Set up a remote repository and push the initial project state. Claude can do this for you.",
    goals: [
      "Create a repository on GitHub",
      "Ask Claude to set the remote and push",
      "Understand the initial commit structure",
    ],
    content: `## Let Claude Handle Git Setup

Once your context files and CLAUDE.md are in place, it's time to push. Instead of running git commands yourself, just tell Claude what you want. It will set the remote, create the initial commit, and push to main.

This is also a good moment to confirm your git workflow: one branch per feature, conventional commit messages, never auto-commit without permission.`,
    snippets: [
      {
        lang: "markdown",
        label: "Prompt to Claude",
        code: `Set remote origin to https://github.com/[user]/[repo].git
and push the current state to the main branch.`,
      },
      {
        lang: "bash",
        label: "What Claude runs",
        code: `git remote add origin https://github.com/user/repo.git
git branch -M main
git add .
git commit -m "chore: initial project setup with CLAUDE.md and context files"
git push -u origin main`,
      },
    ],
  },

  {
    slug: "design-ui-with-v0",
    title: "Design UI with v0",
    step: 6,
    chapter: "Design",
    description:
      "Use v0.dev to generate a visual mockup before writing any code. Paste your project overview as context.",
    goals: [
      "Understand when to use v0 vs Claude for UI",
      "Write an effective v0 prompt using your project overview",
      "Use the output as a visual reference, not production code",
    ],
    content: `## Prototype Before You Build

Before asking Claude to implement any UI, get a visual reference first. v0.dev (by Vercel) generates React component mockups from a text description — perfect for establishing layout and visual direction.

**The key rule:** paste your \`project-overview.md\` as context. v0 will generate something much closer to what you want than a generic prompt.

Ask for one specific view, not the whole app. A mockup of the slide page is enough to establish the visual language for everything else.`,
    snippets: [
      {
        lang: "markdown",
        label: "v0.dev prompt",
        code: `I want to prototype the UI for a step-by-step developer presentation app.
I am going to give you the entire project overview.
From that, I want you to create ONLY a mockup of the slide view.
It should not function other than visual elements.

Focus on:
- Two-zone layout (sidebar 1/3, main content 2/3)
- Sidebar with step info and prev/next navigation
- Main content with rendered markdown and code blocks with a "Copy" button
- Progress bar at the top
- Table of contents page
- Dummy slide content and a few dummy code snippets
- Responsive — on mobile the sidebar collapses

Project Overview:
[PASTE project-overview.md HERE]`,
      },
    ],
  },

  {
    slug: "screenshots-as-context",
    title: "Screenshots as Context",
    step: 7,
    chapter: "Design",
    description:
      "Save v0 screenshots to context/screenshots/ and reference them in project-overview.md so Claude knows how the UI should look.",
    goals: [
      "Take screenshots of the v0 mockup",
      "Save them to context/screenshots/",
      "Add a Screenshots section to project-overview.md",
    ],
    content: `## Give Claude a Visual Reference

Claude can read images. Once you have screenshots from v0, drop them into \`context/screenshots/\` and reference them in \`project-overview.md\`. From that point on, every time Claude reads your context files it will see the intended UI.

This is one of the most underused techniques in AI-assisted development. A screenshot is worth a thousand words of UI description.`,
    snippets: [
      {
        lang: "markdown",
        label: "context/project-overview.md (screenshots section)",
        code: `## Screenshots

Refer to the screenshots below as a base for the UI.
It does not have to be exact — use them as a reference.

- @context/screenshots/dashboard.png
- @context/screenshots/dashboard-sidebar.png
- @context/screenshots/dashboard-sidebar-code-example.png`,
      },
    ],
  },

  // ─── Chapter 4: Feature Workflow ─────────────────────────────────────────────

  {
    slug: "add-feature-skill",
    title: "Add Feature Skill",
    step: 8,
    chapter: "Feature Workflow",
    description:
      "Install the /feature skill — a set of markdown files that give Claude a structured workflow for managing features from spec to merge.",
    goals: [
      "Understand what a Claude skill is",
      "Create the .claude/skills/feature/ directory structure",
      "Add SKILL.md and all action files",
    ],
    content: `## Skills Extend Claude's Vocabulary

A skill is a folder of markdown files under \`.claude/skills/\`. When you type \`/feature\`, Claude Code loads \`SKILL.md\` and uses it to understand what \`/feature load\`, \`/feature start\`, and \`/feature complete\` mean.

The feature skill manages the full lifecycle of a feature: load a spec → create a branch → implement → review → commit → merge → reset.

You can write your own skills for any repeated workflow in your project.`,
    snippets: [
      {
        lang: "bash",
        label: "File structure",
        code: `.claude/
└── skills/
    └── feature/
        ├── SKILL.md
        └── actions/
            ├── load.md
            ├── start.md
            ├── review.md
            ├── explain.md
            ├── complete.md
            └── test.md`,
      },
      {
        lang: "markdown",
        label: ".claude/skills/feature/SKILL.md",
        code: `---
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
| complete | Commit, push, merge, reset                |`,
      },
    ],
  },

  {
    slug: "feature-workflow-in-action",
    title: "Feature Workflow in Action",
    step: 9,
    chapter: "Feature Workflow",
    description:
      "Walk through the full /feature lifecycle — from loading a spec to merging and resetting.",
    goals: [
      "Load a feature spec with /feature load",
      "Start implementation with /feature start",
      "Review and complete the feature with /feature review and /feature complete",
    ],
    content: `## One Command Per Phase

The \`/feature\` skill maps each phase of development to a single command. You write the spec once; Claude handles branching, implementing, reviewing, committing, and merging.

Each command reads \`current-feature.md\` to understand where you are. The file is the source of truth — not the conversation history.`,
    snippets: [
      {
        lang: "bash",
        label: "Full feature lifecycle",
        code: `# 1. Load the spec into current-feature.md
/feature load dashboard-1-spec

# 2. Create branch + implement goals one by one
/feature start

# 3. Verify all goals are met
/feature review

# 4. Commit → merge → delete branch → reset current-feature.md → push
/feature complete`,
      },
      {
        lang: "markdown",
        label: "current-feature.md (after /feature load)",
        code: `# Current Feature: Dashboard UI Phase 1

## Status
Not Started

## Goals
- ShadCN UI initialized with button, badge, progress components
- Dark mode set as default
- Table of contents home page with chapter sections and slide cards
- Slide page with sidebar and prev/next navigation

## Notes
- Spec: context/features/dashboard-1-spec.md
- Reference screenshots in context/screenshots/`,
      },
    ],
  },

  {
    slug: "history-as-changelog",
    title: "History as Changelog",
    step: 10,
    chapter: "Feature Workflow",
    description:
      "After every /feature complete, current-feature.md grows a new History entry. Over time it becomes your project's automatic changelog.",
    goals: [
      "Understand the append-only History section",
      "See how /feature complete populates it automatically",
      "Use History to onboard teammates and review past decisions",
    ],
    content: `## A Changelog That Writes Itself

After every \`/feature complete\`, Claude appends a summary entry to the \`## History\` section of \`current-feature.md\`. You never need to maintain a separate CHANGELOG.md.

The history is:
- **Append-only** — entries are never deleted
- **Dated** — each entry has a timestamp
- **Summarized** — bullet points of what changed and why

After a few features, this file becomes the best onboarding document in your project.`,
    snippets: [
      {
        lang: "markdown",
        label: "context/current-feature.md (History section)",
        code: `## History

### 2026-03-18 — Dashboard UI Phase 1

Initialized ShadCN UI and built the main dashboard layout.

- ShadCN UI initialized with button, badge, progress, separator components
- Dark mode set as default with custom palette (#0a0a0a background)
- Table of contents home page with hero, chapter sections, and slide cards
- Slide page with sidebar: step counter, chapter badge, goals list, prev/next nav

### 2026-03-18 — Dashboard UI Phase 2

Added interactivity, animations, and mobile support.

- Collapsible sidebar with slide+fade animation
- Keyboard navigation: ← / → to change slides, Esc returns to TOC
- Slide content fade+translate animation using Framer Motion
- Progress bar animates from the previous step's value`,
      },
    ],
  },

  {
    slug: "summary",
    title: "Summary",
    step: 11,
    chapter: "Feature Workflow",
    description:
      "A recap of the full markdown-driven workflow and where to explore the complete source code.",
    goals: [
      "Understand the full workflow end-to-end",
      "Know what to take home and apply to your own projects",
      "Explore the source code and commit history on GitHub",
    ],
    content: `## What You've Learned

You now have a complete, repeatable workflow for building applications with AI:

- **Steps 1–2** — Install and clean Next.js using prompts, not manual edits
- **Steps 3–4** — Write CLAUDE.md and context files so Claude always has full project context
- **Step 5** — Describe what to push; Claude sets the remote, commits, and pushes
- **Steps 6–7** — Prototype in v0, save screenshots, reference them so Claude sees your UI intent
- **Step 8** — Add the /feature skill to give Claude a structured lifecycle vocabulary
- **Steps 9–10** — Run /feature load → start → complete; Claude branches, implements, merges, and logs history automatically

## Key Principles

- **Document before you build** — a spec in markdown beats a vague prompt every time
- **Context files are the project's memory** — they survive across sessions, teammates, and model upgrades
- **History writes itself** — current-feature.md becomes your changelog with zero extra effort
- **Skills extend Claude's vocabulary** — one markdown file per workflow pattern you want to repeat

## Explore the Full Repository

All source code, context files, feature specs, and commit history for this presentation are on GitHub. Browse every feature branch, read the original spec for each step, and see exactly how each piece was built.

[View full repository and commit history on GitHub →](https://github.com/moroz-michal/markdown_coding)`,
    snippets: [
      {
        lang: "bash",
        label: "Start your own project today",
        code: `# 1. Install Next.js
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir

# 2. Add CLAUDE.md + context files
# (prompt Claude to create them)

# 3. Install the /feature skill
# Copy .claude/skills/feature/ from the repo

# 4. Write your first feature spec
# context/features/my-first-feature.md

# 5. Run the workflow
/feature load my-first-feature
/feature start`,
      },
    ],
  },
];

export const chapters: Chapter[] = [
  {
    title: "Setup",
    slides: slides.filter((s) => s.chapter === "Setup"),
  },
  {
    title: "Context Files",
    slides: slides.filter((s) => s.chapter === "Context Files"),
  },
  {
    title: "Design",
    slides: slides.filter((s) => s.chapter === "Design"),
  },
  {
    title: "Feature Workflow",
    slides: slides.filter((s) => s.chapter === "Feature Workflow"),
  },
];

export const TOTAL_STEPS = slides.length;

export function getSlideBySlug(slug: string): Slide | undefined {
  return slides.find((s) => s.slug === slug);
}

export function getAdjacentSlides(slug: string): {
  prev: Slide | null;
  next: Slide | null;
} {
  const index = slides.findIndex((s) => s.slug === slug);
  return {
    prev: index > 0 ? slides[index - 1] : null,
    next: index < slides.length - 1 ? slides[index + 1] : null,
  };
}
