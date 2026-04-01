# Clean Room Prompt Generator

Clean Room Prompt Generator is a Vite + React application that pairs a long-form article about clean room engineering with a guided prompt builder for behavior-driven implementations.

## What it does

- Explains the legal and engineering context behind clean room development
- Walks users through a multi-step prompt generator
- Produces copy-ready prompts for production-focused implementation work
- Ships as a static site that can be deployed to GitHub Pages

## Getting started

### Prerequisites

- Node.js 20+ (Node.js 22 is used in CI)

### Local development

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available scripts

```bash
npm run dev     # Start the local development server
npm run lint    # Type-check the app
npm run build   # Create a production build in dist/
npm run preview # Preview the production build locally
npm run clean   # Remove dist/
```

## Deployment

This repository is configured for GitHub Pages deployment.

- Production builds use `/CleanRoom/` as the base path when `GITHUB_ACTIONS=true`
- The deployment workflow lives at `.github/workflows/deploy-pages.yml`
- Pushing to `main` triggers an automatic build and Pages deployment

If you want to override the base path for another static host, set `VITE_BASE_PATH` before running `npm run build`.

## Key files

- `src/App.tsx` — page layout and scroll progress handling
- `src/components/Article.tsx` — long-form article content
- `src/components/Navigation.tsx` — sticky navigation and contribution link
- `src/components/PromptGenerator.tsx` — multi-step prompt generator UI
- `index.html` — app title, favicon, and social metadata
- `vite.config.ts` — Vite configuration, aliases, and Pages base path
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment workflow

## Key Files Detector helper prompt

Use this helper prompt with your preferred coding assistant when you need a quick orientation to the codebase:

```text
You are reviewing the Clean Room Prompt Generator repository.
Identify the smallest set of files I should read first to make a safe change.

For each file:
1. Explain why it matters.
2. Summarize what behavior it controls.
3. Call out any related files or deployment/configuration touchpoints.
4. Flag anything that looks generated, unused, or legacy.

Keep the answer focused on the files that are most relevant for production changes.
```

## Contributing

Contributions are welcome: https://github.com/voku/CleanRoom

When making changes, run:

```bash
npm run lint
npm run build
```
