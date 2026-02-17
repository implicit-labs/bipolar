# Guillermo's Approach: Ship to Learn

## Philosophy

**Ship to learn.** Get something in front of users fast, then iterate based on real feedback. This task list app demonstrates the Vercel stack at its best: instant deploys, progressive enhancement, and zero backend infrastructure to manage.

## Architecture Decisions

### 1. Server Components First (Progressive Enhancement)

```
Server Components by default → Client Components only where needed
```

The entire app starts as Server Components:
- Task list renders on the server
- Zero JavaScript shipped for read-only views
- Instant first paint, great for slow connections

Client Components only for:
- Form interactions (optimistic UI)
- Delete buttons (immediate feedback)

**Why:** Performance is non-negotiable. Users see content instantly. Progressive enhancement means the app works even before JS loads.

### 2. Server Actions (Zero API Routes)

```tsx
// No API routes needed
export async function createTask(formData: FormData) {
  'use server'
  // Direct database access
}
```

**Why:**
- No API route boilerplate
- Type-safe by default
- Automatic serialization
- Progressive enhancement (works without JS via form POST)

### 3. Local-First Storage (Ship Fast)

Using JSON file storage to start:
- Zero database setup
- Deploy anywhere
- Migrate to Postgres/Vercel KV later if needed

**This is the "ship to learn" principle:**
1. Ship with local storage TODAY
2. Get user feedback
3. Upgrade to Postgres when you know the data model works

### 4. Optimistic UI (Feel Instant)

```tsx
// Add task → UI updates immediately
// Server confirms → reconcile if needed
```

**Why:** Perceived performance = actual performance. Users don't wait for server round-trips.

### 5. Vercel Deployment (Preview URLs)

```bash
git push → automatic preview URL
```

Every commit gets a unique URL:
- Share with users instantly
- Test in production environment
- No staging server complexity

**Why:** Feedback loops are everything. Preview URLs let you iterate hourly, not monthly.

## File Structure

```
app/
├── page.tsx              # Server Component (task list)
├── actions.ts            # Server Actions (add/delete/toggle)
├── components/
│   ├── task-form.tsx     # Client Component (optimistic add)
│   ├── task-item.tsx     # Client Component (optimistic toggle/delete)
│   └── task-list.tsx     # Server Component (render tasks)
└── lib/
    └── db.ts             # Simple file-based storage
```

## Trade-offs

### What We Optimize For
- **Time to first ship:** < 1 hour
- **Time to first feedback:** < 1 day (via preview URL)
- **Perceived performance:** Optimistic UI feels instant
- **Real performance:** Server Components minimize JS

### What We Defer
- **Complex data modeling:** JSON file → migrate later if needed
- **Authentication:** Add when users ask for it
- **Persistence across deploys:** Use Vercel KV/Postgres when ready

## The Vercel Advantage

1. **Deploy on `git push`** → No CI/CD setup
2. **Preview URLs** → Every branch is production
3. **Edge Functions** → Globally distributed by default
4. **Zero config** → Framework detection just works

## Iteration Path

**Version 1 (Today):**
- Local JSON storage
- Basic task CRUD
- Optimistic UI
- Deploy to Vercel

**Version 2 (After user feedback):**
- Migrate to Vercel Postgres
- Add task categories if users need them
- Add search if users ask for it

**Version 3 (If users love it):**
- Multi-user support
- Real-time sync
- Mobile app

**This is ship to learn:** Build the simplest thing that could work, deploy it, and let users guide the roadmap.

## Why This Beats Alternatives

**vs Rails:** No server to manage, deploys in seconds, scales to zero
**vs SPA:** Better performance (Server Components), better SEO, works without JS
**vs Traditional SSR:** Simpler (no API routes), faster (streaming), more composable

## Developer Experience = User Experience

When the framework makes it easy to:
- Ship fast (Vercel deploys)
- Iterate fast (preview URLs)
- Build fast (Server Actions, no API boilerplate)

...you end up with better products because you can respond to users faster.

**That's the whole game.**
