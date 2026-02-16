# Modern React Patterns

Based on Theo Browne's production experience with React Server Components, his conference talks on streaming and Suspense, and his year of shipping RSCs in production.

---

## Core Stance

> "Really super excited about what React Server Components can enable."

RSCs fundamentally change how we think about server-client boundaries. Instead of artificial API layers, components themselves decide where they run. The result is simpler architecture and better performance — but the migration path requires real production experience to navigate.

---

## Key Principles

### Server Components Eliminate API Boundaries
RSCs let you fetch data directly in components that render on the server. No separate API route, no client-side fetch, no loading state management for initial data. The component IS the data layer.

### Suspense for Non-Blocking UX
> "Suspense is incredible because it allows you to do certain things without blocking other things."

Wrap slow data fetches in Suspense boundaries. The rest of the page renders instantly while slow components stream in. Users see content immediately instead of waiting for the slowest query.

### Out-of-Order Streaming
React can stream HTML to the client as components resolve, regardless of order. A fast component at the bottom of the page arrives before a slow component at the top. The browser reassembles them correctly.

### Server Actions for Mutations
Use server actions for form submissions and mutations. Type-safe, progressively enhanced, and no separate API endpoint needed. Zact (Theo's library) adds Zod validation to server actions.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Client-side fetch for initial data | Server Components with direct data access |
| Full-page loading spinners | Suspense boundaries around slow components |
| Separate API routes for every data need | Server Components as the data layer |
| Client Components for static content | Server Components by default, Client only for interactivity |
| Blocking renders on slowest query | Out-of-order streaming with Suspense |
| Unvalidated server actions | Zod-validated server actions via Zact |
