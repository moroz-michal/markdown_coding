# Markdown coding

Step-by-step AI programming demonstration using markdown.

## Context files

Read the following to get the full context of the project.

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19** with React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, no config file
- **TypeScript**
- **Geist** fonts (sans + mono) loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`
