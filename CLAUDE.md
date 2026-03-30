# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
```

No linting, testing, or type-checking is configured.

## Architecture

This is a **pure client-side Next.js app** — no backend, no database, no API routes. It is a prompt-building tool: users fill in forms, the app assembles a Claude prompt, and they copy-paste it into claude.ai.

### Data flow

User input → React state → `generate()` assembles a prompt string → copied to clipboard → pasted into claude.ai externally.

Nothing is persisted. All state lives in `useState` within each component and is lost on refresh.

### Structure

- `pages/index.js` — root page with tab navigation between the two tools; defines the shared colour palette `C` used inline everywhere
- `components/SignalScanner.js` — Tab 1: user pastes raw LinkedIn post blocks; `parseLinkedInPost()` strips UI noise and extracts name/role/content; generates a signal analysis prompt
- `components/WeeklyBriefing.js` — Tab 2: user inputs conversation threads with contacts; generates a prioritised outreach plan prompt
- `styles/globals.css` — minimal global resets only

### Styling convention

All styles are **inline JS objects** defined in a local `s` constant at the top of each component. The shared colour tokens are a local `C` constant (duplicated across files). There is no CSS framework, no CSS modules, no Tailwind.

### Prompt methodology

Both tools generate prompts framed around Matthew Dixon's "Activator's Advantage" methodology. The prompt templates are inline strings inside `generate()` in each component — that's where the product logic lives.
