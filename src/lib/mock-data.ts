import { Chapter, Slide } from "@/types/slides";

export const slides: Slide[] = [
  {
    slug: "introduction-to-markdown-coding",
    title: "Introduction to Markdown Coding",
    step: 1,
    chapter: "Introduction",
    description:
      "Learn why structured markdown files are the key to effective AI-assisted development.",
    goals: [
      "Understand the problem with unstructured AI workflows",
      "Learn what markdown-driven development is",
      "See the benefits of a documented approach",
    ],
    content: `## Why Markdown Coding?

Most developers don't know how to work effectively with AI when building applications. They face several challenges:

- **No prompt structure** — Chaotic conversations that are hard to reproduce
- **No decision history** — No idea why the code looks the way it does
- **No clear changelog** — Hard to track what was done at each step

This presentation introduces **Markdown Coding** — a methodology where you use structured markdown files to guide AI through your development process.`,
    snippets: [],
  },
  {
    slug: "project-setup",
    title: "Project Setup",
    step: 2,
    chapter: "Project Setup",
    description:
      "Set up your project directory structure for markdown-driven development.",
    goals: [
      "Create the required folder structure",
      "Understand the purpose of each directory",
      "Set up your CLAUDE.md file",
    ],
    content: `## Setting Up Your Project

Every markdown-coding project starts with a specific folder structure. This structure helps CLAUDE understand your project context and keeps your documentation organized.

Create these directories in your project root:`,
    snippets: [
      {
        lang: "bash",
        label: "Terminal",
        code: `mkdir -p docs/features docs/history
touch CLAUDE.md
touch docs/current-feature.md`,
      },
      {
        lang: "markdown",
        label: "CLAUDE.md",
        code: `# Project: My App

## Tech Stack
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui

## Current Focus
See \`docs/current-feature.md\` for the active feature.

## Conventions
- Use TypeScript strict mode
- Follow the existing code patterns
- Write tests for new features`,
      },
    ],
  },
  {
    slug: "creating-your-first-feature-file",
    title: "Creating Your First Feature File",
    step: 3,
    chapter: "Feature Files",
    description:
      "Learn how to write a markdown file that CLAUDE understands as a feature spec.",
    goals: [
      "Understand the feature file structure",
      "Write your own feature file",
      "Test it in practice",
    ],
    content: `## The Feature File Format

A feature file is a structured markdown document that tells CLAUDE exactly what you want to build. It has four key sections:

1. **Goals** — What success looks like
2. **Notes** — Constraints and context
3. **Status** — Where you are in the workflow
4. **History** — What was already done`,
    snippets: [
      {
        lang: "markdown",
        label: "docs/current-feature.md",
        code: `# Current Feature: Add User Authentication

## Status
In Progress

## Goals
- User can sign up with email and password
- User can log in and receive a JWT token
- Protected routes redirect to login

## Notes
- Use NextAuth.js for session management
- Store users in PostgreSQL
- Hash passwords with bcrypt`,
      },
    ],
  },
  {
    slug: "implementing-the-feature",
    title: "Implementing the Feature",
    step: 4,
    chapter: "Working with CLAUDE",
    description: "Walk through the workflow of implementing a feature with CLAUDE's help.",
    goals: [
      "Learn the implementation workflow",
      "Understand how to guide CLAUDE effectively",
      "See the iterative development process",
    ],
    content: `## The Implementation Workflow

With your feature file ready, you can start working with CLAUDE. The workflow follows these steps:

1. **Share the feature file** — Give CLAUDE the full context
2. **Start with scaffolding** — Ask for the basic structure first
3. **Iterate on details** — Refine each component
4. **Document changes** — Update the feature file as you go

This creates a natural conversation that's easy to follow and reproduce.`,
    snippets: [
      {
        lang: "typescript",
        label: "app/auth/login/page.tsx",
        code: `import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6">
          Sign In
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}`,
      },
    ],
  },
  {
    slug: "history-and-changelog",
    title: "History & Changelog",
    step: 5,
    chapter: "History & Changelog",
    description:
      "See how the feature file becomes a living record of your project's evolution.",
    goals: [
      "Learn how to maintain the history section",
      "Understand the value of a documented changelog",
      "See how to review past decisions",
    ],
    content: `## Your Feature File as a Changelog

Every time you complete a feature, you append it to the History section of your feature file. Over time, this becomes a complete record of your project.

This is invaluable for:
- **Onboarding** new team members
- **Debugging** — understanding why decisions were made
- **Auditing** — a clear record of every change`,
    snippets: [
      {
        lang: "markdown",
        label: "docs/current-feature.md (History)",
        code: `## History

### 2024-01-15 — User Authentication
Added NextAuth.js with email/password login.
JWT tokens stored in httpOnly cookies.
Protected routes implemented via middleware.

### 2024-01-22 — Dashboard UI
Built the main dashboard layout with shadcn/ui.
Dark mode set as default.
Progress bar added to slide navigation.`,
      },
    ],
  },
  {
    slug: "conclusions-and-best-practices",
    title: "Conclusions & Best Practices",
    step: 6,
    chapter: "Conclusions & Best Practices",
    description:
      "Key takeaways and patterns to bring back to your own projects.",
    goals: [
      "Summarize the markdown-driven workflow",
      "Learn the most common pitfalls to avoid",
      "Leave with actionable patterns for your team",
    ],
    content: `## What We Learned

The markdown-driven development workflow gives you:

- **Reproducibility** — Every conversation is documented
- **Context** — CLAUDE always has the full picture
- **History** — A changelog that writes itself
- **Clarity** — Goals defined before implementation begins

## Start Small

You don't need to adopt everything at once. Start with a single CLAUDE.md and one feature file. The workflow will grow naturally from there.`,
    snippets: [],
  },
];

export const chapters: Chapter[] = [
  {
    title: "Introduction",
    slides: slides.filter((s) => s.chapter === "Introduction"),
  },
  {
    title: "Project Setup",
    slides: slides.filter((s) => s.chapter === "Project Setup"),
  },
  {
    title: "Feature Files",
    slides: slides.filter((s) => s.chapter === "Feature Files"),
  },
  {
    title: "Working with CLAUDE",
    slides: slides.filter((s) => s.chapter === "Working with CLAUDE"),
  },
  {
    title: "History & Changelog",
    slides: slides.filter((s) => s.chapter === "History & Changelog"),
  },
  {
    title: "Conclusions & Best Practices",
    slides: slides.filter((s) => s.chapter === "Conclusions & Best Practices"),
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
