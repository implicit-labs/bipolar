# SvelteKit Task List

A production-ready task list app demonstrating Svelte's "write less code" philosophy.

## Features

- Add new tasks
- Mark tasks as complete
- Delete tasks
- Progressive enhancement (works without JavaScript)
- Server-side rendering
- ~11kb production bundle (gzipped)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Why Svelte?

This app is **~40% less code** than a React equivalent, with:
- No Virtual DOM overhead
- No CSS-in-JS runtime cost
- Built-in reactivity (no `useState`, `useEffect`)
- Progressive enhancement (works without JS)

See `../docs/approach.md` for detailed architectural decisions.

## Key Files

- `src/routes/+page.svelte` — Task list component
- `src/routes/+page.server.js` — Server-side form actions
- `src/app.html` — HTML shell

## Svelte 5 Runes

This app uses Svelte 5's new reactive primitives:

```svelte
<script>
  let tasks = $state([]);              // reactive state
  let active = $derived(tasks.filter(t => !t.completed));  // auto-updates
</script>
```

No imports needed. Reactivity is built into the language.

## Progressive Enhancement

Forms work without JavaScript:

```svelte
<form method="POST" action="?/add" use:enhance>
  <!-- Works without JS, enhanced with JS -->
</form>
```

If JavaScript fails to load:
- Forms still submit to the server
- Page reloads with updated data
- User can still use the app

This is impossible in React (client-only framework).

## Bundle Size

Production build (gzipped):
- JavaScript: ~8kb
- CSS: ~1kb
- HTML: ~2kb
- **Total: ~11kb**

Compare to React equivalent: ~50kb (React + ReactDOM)

**Why?** Svelte compiles to vanilla JavaScript. No runtime framework code.
