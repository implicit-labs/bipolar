# Server State Architecture

Based on Tanner Linsley's design of TanStack Query and his separation of server state from client state. The philosophy: remote data is a synchronization problem, not a state management problem.

---

## Core Stance

> "It's synchronization between remote data and your application."

React Query isn't a fetch wrapper or a Redux replacement. It's a synchronization engine that keeps your UI in sync with your server. The distinction matters: client state (UI toggles, dark mode) and server state (API data) are fundamentally different problems with different solutions.

---

## Key Principles

### Server State is Not Client State
Server state is asynchronous, shared, potentially stale, and owned by someone else. Client state is synchronous, local, always fresh, and owned by you. Using the same tool for both (Redux, Zustand) conflates two different problems.

### Caching is the Hard Problem
The real challenge isn't fetching data — it's knowing when it's stale, when to refetch, how to deduplicate requests, and how to update the cache. TanStack Query solves these automatically through intelligent defaults.

### Background Refetching Over Manual Invalidation
Rather than manually tracking when data is stale, let the library refetch intelligently: on window focus, network reconnection, component mount, and configurable intervals. Data freshness is the default.

### React Query Handles ~95% of Global State
Most of what developers put in global stores is actually server state. Extract it into TanStack Query and the remaining client state (auth tokens, UI preferences) is trivially simple.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Storing API data in Redux/Zustand | Use TanStack Query for server state |
| Manual loading/error state tracking | Let Query handle automatic bookkeeping |
| Fetching in useEffect with manual cleanup | Use Query hooks with automatic lifecycle |
| Cache invalidation through manual flags | Declarative invalidation with query keys |
| Global state for everything | Server state in Query, client state in tiny stores |
| useEffect for data synchronization | "useEffect is the most powerful foot gun on the planet" |
