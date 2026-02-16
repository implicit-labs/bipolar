# The Majestic Monolith

Based on DHH's foundational essay and the architecture of Basecamp, HEY, and every 37signals application. The philosophy: one codebase, one deploy, one person who can hold it all in their head.

---

## Core Stance

> "The patterns that make sense for organizations orders of magnitude larger than yours are often the exact opposite ones that'll make sense for you."

Microservices are an organizational pattern for companies with thousands of engineers who can't coordinate in a single codebase. For everyone else — which is almost everyone — a monolith is simpler, faster to develop, easier to deploy, and cheaper to operate.

---

## Key Principles

### Microservices Solve Organizational Problems, Not Technical Ones

The technical overhead of microservices (network latency, distributed transactions, service discovery, deployment coordination) is only justified when your organization is so large that teams literally cannot work in the same codebase. If your team is under 100 engineers, a monolith is almost certainly the right choice.

### Concerns for Horizontal Composition

Instead of extracting microservices, use Ruby's concern pattern. Models include `Closeable`, `Watchable`, `Assignable` as concerns. Business logic stays in models, not in a `services/` directory. This gives you separation of concerns without the overhead of network boundaries.

### State as Records, Not Booleans

Instead of boolean columns (`closed: true`), create separate models that carry metadata (`Closure` belongs_to `Card`, includes `user` and timestamps). This is both more expressive and more auditable.

### Everything is CRUD

Most web applications are CRUD operations on resources. Instead of custom actions like `POST /cards/:id/close`, create new RESTful resources: `POST /cards/:id/closure`. This keeps controllers thin and RESTful.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Microservices for a team of 10 | Majestic Monolith with concerns |
| Service objects for business logic | Model concerns and callbacks |
| Separate API gateway | Rails routes and controllers |
| Event-driven architecture | Direct method calls within the monolith |
| Database per service | One database, one source of truth |
| Kubernetes for deployment | Kamal to a single server |
