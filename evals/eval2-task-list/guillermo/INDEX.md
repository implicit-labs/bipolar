# Task List - Guillermo Rauch Implementation

## Quick Navigation

### Start Here
- **[SUMMARY.md](SUMMARY.md)** - Complete overview of the implementation
- **[implementation/README.md](implementation/README.md)** - Main documentation

### Get Running
- **[docs/quick-start.md](docs/quick-start.md)** - Run locally in 2 minutes
- **[docs/deployment.md](docs/deployment.md)** - Deploy to production

### Understand the Code
- **[docs/approach.md](docs/approach.md)** - Architectural philosophy
- **[docs/technical-deep-dive.md](docs/technical-deep-dive.md)** - Implementation details
- **[docs/architecture-diagram.md](docs/architecture-diagram.md)** - Visual architecture

---

## File Structure

```
guillermo/
│
├── INDEX.md                          ← You are here
├── SUMMARY.md                        ← Start here for overview
│
├── implementation/                   ← Working Next.js app
│   ├── README.md                     ← Main documentation
│   ├── package.json                  ← Dependencies
│   ├── tsconfig.json                 ← TypeScript config
│   ├── next.config.ts                ← Next.js config
│   ├── .gitignore                    ← Git ignore rules
│   │
│   └── app/                          ← Next.js App Router
│       ├── page.tsx                  ← Main page (Server Component)
│       ├── layout.tsx                ← Root layout
│       ├── globals.css               ← Styles
│       ├── actions.ts                ← Server Actions
│       │
│       ├── components/
│       │   ├── task-form.tsx         ← Form (Client Component)
│       │   ├── task-item.tsx         ← Task item (Client Component)
│       │   └── task-list.tsx         ← List (Server Component)
│       │
│       └── lib/
│           └── db.ts                 ← Data layer
│
└── docs/                             ← Documentation
    ├── approach.md                   ← Why we built it this way
    ├── technical-deep-dive.md        ← How it works
    ├── architecture-diagram.md       ← Visual architecture
    ├── deployment.md                 ← Production deployment
    └── quick-start.md                ← Local development
```

---

## Reading Paths

### Path 1: "I want to understand the philosophy"
1. [SUMMARY.md](SUMMARY.md) - Overview
2. [docs/approach.md](docs/approach.md) - Architectural decisions
3. [implementation/README.md](implementation/README.md) - Full documentation

### Path 2: "I want to run this locally"
1. [docs/quick-start.md](docs/quick-start.md) - Get running in 2 minutes
2. [implementation/README.md](implementation/README.md) - Features and usage
3. [docs/technical-deep-dive.md](docs/technical-deep-dive.md) - How it works

### Path 3: "I want to deploy to production"
1. [docs/deployment.md](docs/deployment.md) - Deployment guide
2. [implementation/README.md](implementation/README.md) - Features and configuration
3. [SUMMARY.md](SUMMARY.md) - Iteration strategy

### Path 4: "I want to understand the code"
1. [docs/architecture-diagram.md](docs/architecture-diagram.md) - Visual overview
2. [docs/technical-deep-dive.md](docs/technical-deep-dive.md) - Implementation details
3. [implementation/app/](implementation/app/) - Source code

---

## Key Concepts

### Server Components
- **What:** React components that render on the server
- **Why:** Zero JavaScript shipped, faster loads
- **Where:** `app/page.tsx`, `app/components/task-list.tsx`
- **Learn more:** [docs/technical-deep-dive.md#server-components](docs/technical-deep-dive.md)

### Server Actions
- **What:** Functions that run on the server, called from client
- **Why:** No API routes needed, type-safe, progressive enhancement
- **Where:** `app/actions.ts`
- **Learn more:** [docs/technical-deep-dive.md#server-actions](docs/technical-deep-dive.md)

### Optimistic UI
- **What:** Update UI immediately, confirm with server later
- **Why:** Zero perceived latency
- **Where:** `app/components/task-form.tsx`, `app/components/task-item.tsx`
- **Learn more:** [docs/technical-deep-dive.md#optimistic-ui-patterns](docs/technical-deep-dive.md)

### Progressive Enhancement
- **What:** App works at multiple levels (HTML → JS → React)
- **Why:** Works for everyone, better for modern browsers
- **Where:** All components use native HTML semantics
- **Learn more:** [docs/technical-deep-dive.md#progressive-enhancement](docs/technical-deep-dive.md)

---

## Quick Commands

### Development
```bash
cd implementation/
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
```

### Deployment
```bash
# Option 1: Push to GitHub (Vercel auto-deploys)
git push

# Option 2: Deploy via CLI
npm install -g vercel
vercel
```

---

## Core Files Explained

### `app/page.tsx`
Main page. Server Component by default.
- Imports TaskForm (Client Component)
- Imports TaskList (Server Component)
- Zero JavaScript for static content

### `app/actions.ts`
Server Actions (no API routes).
- `addTask()` - Create new task
- `toggleTaskAction()` - Toggle completion
- `deleteTaskAction()` - Remove task
- All include automatic revalidation

### `app/components/task-form.tsx`
Client Component for adding tasks.
- `useTransition` for optimistic form reset
- Calls `addTask()` Server Action
- Progressive enhancement (works without JS)

### `app/components/task-item.tsx`
Client Component for task interactions.
- `useOptimistic` for instant checkbox updates
- Toggle and delete buttons
- Zero perceived latency

### `app/components/task-list.tsx`
Server Component for rendering tasks.
- Direct database access
- Maps tasks to TaskItem components
- Zero JavaScript shipped

### `app/lib/db.ts`
Data layer (file-based storage).
- `getTasks()` - Read all tasks
- `createTask()` - Add new task
- `toggleTask()` - Update completion
- `deleteTask()` - Remove task
- Easy to migrate to database later

---

## The Vercel Philosophy

### Ship to Learn
1. Build the simplest thing that could work
2. Deploy it to real users (preview URLs)
3. Get feedback
4. Iterate based on real usage
5. Don't build features before users need them

### Key Principles
- **Performance is non-negotiable** - Server Components, optimistic UI
- **DX = UX** - Good developer experience leads to good user experience
- **Progressive disclosure** - Start simple, add complexity when needed
- **Deploy on push** - Preview URLs for every branch
- **Iterate fast** - Hours, not months

---

## Common Questions

### "Why file storage instead of a database?"
**Answer:** Ship to learn. Start with the simplest thing that works. Migrate to Postgres when you need multi-device sync. Don't over-engineer before you have users.

See: [docs/approach.md#trade-offs](docs/approach.md)

### "How do I add authentication?"
**Answer:** After you have users who need it. Start with single-user, add auth when multiple people want to use it.

See: [implementation/README.md#iteration-path](implementation/README.md)

### "How fast is it?"
**Answer:** ~87 KB initial load, < 2s time to interactive, 0ms perceived latency (optimistic UI).

See: [docs/technical-deep-dive.md#performance-characteristics](docs/technical-deep-dive.md)

### "How do I deploy?"
**Answer:** `git push` to GitHub, Vercel automatically deploys. Or use `vercel` CLI.

See: [docs/deployment.md](docs/deployment.md)

### "How do I migrate to Postgres?"
**Answer:** Update `app/lib/db.ts` functions. Components stay the same.

See: [docs/technical-deep-dive.md#migration-path](docs/technical-deep-dive.md)

---

## Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### React
- [React Documentation](https://react.dev)
- [useTransition](https://react.dev/reference/react/useTransition)
- [useOptimistic](https://react.dev/reference/react/useOptimistic)

### Vercel
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Deployment](https://vercel.com/docs/deployments/overview)

### This Implementation
- All documentation in `docs/` folder
- Working code in `implementation/` folder
- Summary in [SUMMARY.md](SUMMARY.md)

---

## What Makes This "Guillermo-Style"

1. **Server Components first** - Minimize JavaScript
2. **Server Actions** - No API boilerplate
3. **Optimistic UI** - Instant perceived performance
4. **Progressive enhancement** - Works at multiple levels
5. **Ship to learn** - Deploy early, iterate fast
6. **Preview URLs** - Feedback loops measured in hours
7. **Zero config** - Framework conventions work
8. **Performance non-negotiable** - < 100 KB bundles

---

## Next Steps

1. **Run locally** - [docs/quick-start.md](docs/quick-start.md)
2. **Understand the code** - [docs/technical-deep-dive.md](docs/technical-deep-dive.md)
3. **Deploy to Vercel** - [docs/deployment.md](docs/deployment.md)
4. **Read the philosophy** - [docs/approach.md](docs/approach.md)
5. **See the big picture** - [SUMMARY.md](SUMMARY.md)

---

Built with Next.js 15, React 19, and the belief that **the best way to learn what users want is to ship something and ask them.**

*"Ship to learn. Deploy on push. Iterate based on feedback."*

— Guillermo Rauch (persona), CEO of Vercel
