# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is **Agent Personas** — a static HTML/CSS/JS site served via GitHub Pages at `https://implicit-labs.github.io/bipolar/`. There is no build step, no backend, and no package manager at the root level. See `README.md` for full context.

### Running the site locally

Serve the repository root with any static file server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. All persona pages (`*.html`), `style.css`, and `eval2-demos/` are served from the root.

### Linting

There is no configured linter in the project. You can run ad-hoc HTML validation with `npx html-validate <file>`, but inline styles and aria-label patterns used in the codebase will produce warnings — these are intentional and not blocking.

### Eval sub-projects

The `evals/eval2-task-list/` directory contains independent implementation artifacts from persona evaluations. These are **not** part of the main site and do not need to run for the product to function. If you need to run one:

- **Guillermo (Next.js):** `cd evals/eval2-task-list/guillermo/implementation && npm install && npm run dev`
- **Rich Harris (SvelteKit):** `cd evals/eval2-task-list/rich-harris/implementation && npm install && npm run dev`
- **Kent Beck (Node tests):** `cd evals/eval2-task-list/kent-beck/implementation && npm install && npm test`
- **DHH (Rails):** Requires Ruby 3.3 + SQLite3 — see its `Dockerfile`

### Key gotchas

- The site has **no build step** — edits to HTML/CSS files are immediately reflected on refresh.
- The `eval2-demos/` apps use `localStorage` only; no backend or API calls.
- The `.claude/` directory contains persona definition files (principles, workflows, calibration tests) — these are data files, not code to execute.
