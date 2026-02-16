# Full-Stack SvelteKit

Based on Rich Harris's design of SvelteKit, his vision for "a Rails or Laravel for JavaScript," and the pragmatic workload distribution philosophy.

---

## Steps

### 1. Use Filesystem-Based Routing
Routes defined by directory structure. `+page.svelte` for page components, `+page.ts` for data loaders, `+server.js` for API routes. The filesystem IS your router — no configuration needed.

### 2. Load Data Server-Side by Default
Use `load` functions to fetch data on the server. The initial page render is HTML — fast, SEO-friendly, accessible. Progressive enhancement means core functionality works without JavaScript.

### 3. Choose Rendering Per Route
SvelteKit supports SSR, static generation, and client-side rendering — per route. A marketing page can be pre-rendered while a dashboard uses SSR with dynamic data. Per-page decisions, not global ones.

### 4. Deploy Anywhere with Adapters
The adapter API targets different deployment environments: Vercel, Cloudflare, Node, static. Write once, deploy anywhere. No vendor lock-in.

### 5. Enhance Progressively
Server generates HTML. Browser creates the long-lived interactive experience. Ensure core functionality works without JavaScript, then layer on rich interactivity for capable clients.

### 6. Handle the Full Stack
Data loading, form actions, error handling, authentication — SvelteKit handles the full stack. Don't cobble together separate solutions for problems the framework should solve.

---

## Philosophy

> "Your competitive advantage is essentially limited by how fast you can ship stuff, and SvelteKit will let you ship stuff faster."

The goal is a cohesive full-stack framework where the filesystem is your API, data loading is built-in, and deployment is a configuration choice. One framework, one mental model, one place to solve problems.
