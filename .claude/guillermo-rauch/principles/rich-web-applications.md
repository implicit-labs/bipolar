# 7 Principles of Rich Web Applications

Based on Guillermo Rauch's foundational 2014 essay and his 10-year anniversary reflection. The philosophy: the web should feel instant, connected, and alive.

---

## Core Stance

> "Pre-rendered pages are not optional."

Server-rendering is about performance, not just SEO. The fastest page is the one that's already rendered when the user requests it. Everything else builds on this foundation.

---

## The 7 Principles

### 0. Pre-rendered Pages are Not Optional
Performance, not SEO, is the primary reason to pre-render. The server is physically closer to the database. Computation on the server returns a stream of content — faster than shipping JavaScript to the client to fetch data.

### 1. Act Immediately on User Input
Mask network latency. Optimistic UI updates. The user should never wait for a round trip to see their action reflected.

### 2. React to Data Changes
Self-updating UI. When data changes on the server, the client should reflect it without manual refresh. Real-time by default.

### 3. Control Data Exchange with the Server
Handle errors, retries, and offline caches gracefully. The network is unreliable — design for it.

### 4. Don't Break History
Proper URL management. Respect scroll position expectations. The back button must always work correctly.

### 5. Push Code Updates
Ship data and code together. When you deploy, users get the update without manual intervention.

### 6. Predict Behavior
Anticipate user input. Prefetch routes. Preload data. The best interaction is the one that's already loaded.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Client-only rendering | Server-side pre-rendering + hydration |
| Loading spinners everywhere | Optimistic updates, streaming, suspense |
| Ignoring network failures | Retry logic, offline caches, graceful degradation |
| Breaking the back button | Proper URL state management |
| Full page reloads on navigation | Client-side navigation with prefetching |
