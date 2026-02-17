# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE NETWORK                      │
│                    (Global CDN + Edge Functions)                 │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              SERVER COMPONENTS (Zero JS)               │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │          page.tsx (Root Route)               │     │    │
│  │  │  - Main layout                               │     │    │
│  │  │  - Static HTML                               │     │    │
│  │  │  - Streams to client                         │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  │                        │                               │    │
│  │                        ▼                               │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │      TaskList.tsx (Server Component)         │     │    │
│  │  │  - Direct DB access                          │     │    │
│  │  │  - Renders on server                         │     │    │
│  │  │  - Zero JS shipped                           │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                 │                                │
│                                 ▼                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │       CLIENT COMPONENTS (Interactive Only)             │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │   TaskForm.tsx (Client Component)            │     │    │
│  │  │   - Form submission                          │     │    │
│  │  │   - useTransition for optimistic reset       │     │    │
│  │  │   - Calls Server Action                      │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  │                        │                               │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │   TaskItem.tsx (Client Component)            │     │    │
│  │  │   - Toggle checkbox                          │     │    │
│  │  │   - Delete button                            │     │    │
│  │  │   - useOptimistic for instant updates        │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                 │                                │
│                                 ▼                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │          SERVER ACTIONS (No API Routes)                │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │  addTask(formData)                           │     │    │
│  │  │  - Validate input                            │     │    │
│  │  │  - Create task in DB                         │     │    │
│  │  │  - revalidatePath('/')                       │     │    │
│  │  │  - Return { success, task }                  │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │  toggleTaskAction(id)                        │     │    │
│  │  │  - Update task.completed                     │     │    │
│  │  │  - revalidatePath('/')                       │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │  deleteTaskAction(id)                        │     │    │
│  │  │  - Remove task from DB                       │     │    │
│  │  │  - revalidatePath('/')                       │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                 │                                │
│                                 ▼                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   DATA LAYER                           │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │           lib/db.ts                          │     │    │
│  │  │                                              │     │    │
│  │  │  getTasks()    → Read from file             │     │    │
│  │  │  createTask()  → Write to file              │     │    │
│  │  │  toggleTask()  → Update file                │     │    │
│  │  │  deleteTask()  → Update file                │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────┐
                    │   data/tasks.json    │
                    │   (File Storage)     │
                    │                      │
                    │  [                   │
                    │    {                 │
                    │      id: "1",        │
                    │      text: "...",    │
                    │      completed: false│
                    │    }                 │
                    │  ]                   │
                    └──────────────────────┘
```

## Data Flow

### Adding a Task

```
1. User types text and submits form
         │
         ▼
2. TaskForm (Client Component)
   - Optimistically resets form
   - startTransition(() => addTask(formData))
         │
         ▼
3. addTask() Server Action
   - Validates input
   - Calls createTask() in db layer
   - revalidatePath('/') triggers re-render
         │
         ▼
4. lib/db.ts
   - Reads current tasks from file
   - Adds new task
   - Writes to file
         │
         ▼
5. data/tasks.json
   - Task persisted
         │
         ▼
6. Next.js re-renders Server Components
   - TaskList fetches fresh data
   - New task appears in UI
```

**Perceived latency:** 0ms (form resets immediately)
**Actual latency:** ~50-100ms (hidden from user)

### Toggling a Task

```
1. User clicks checkbox
         │
         ▼
2. TaskItem (Client Component)
   - Optimistically updates UI
   - setOptimisticTask({ completed: !completed })
   - startTransition(() => toggleTaskAction(id))
         │
         ▼
3. toggleTaskAction() Server Action
   - Calls toggleTask() in db layer
   - revalidatePath('/')
         │
         ▼
4. lib/db.ts
   - Updates task.completed
   - Writes to file
         │
         ▼
5. Next.js re-renders
   - Optimistic state becomes real state
   - UI remains consistent
```

**Perceived latency:** 0ms (checkbox toggles immediately)
**Actual latency:** ~50ms (hidden from user)

## Component Hierarchy

```
page.tsx (Server Component)
├── <header>
│   └── <h1>Task List</h1>
│
├── <TaskForm> (Client Component)
│   ├── useRef for form reset
│   ├── useTransition for optimistic UI
│   └── calls addTask() Server Action
│
└── <Suspense fallback={<Loading />}>
    └── <TaskList> (Server Component)
        ├── async function (fetches tasks)
        └── maps to <TaskItem>
            │
            └── <TaskItem> (Client Component)
                ├── useOptimistic for instant updates
                ├── checkbox → toggleTaskAction()
                └── delete button → deleteTaskAction()
```

## Bundle Size Breakdown

```
Route: /
├── Server Components                 0 KB (rendered on server)
│   ├── page.tsx
│   └── TaskList.tsx
│
├── Client Components                 ~5 KB
│   ├── TaskForm.tsx                  ~2 KB
│   └── TaskItem.tsx                  ~3 KB
│
└── React Runtime                     ~82 KB (shared across all pages)
    ├── react                         ~45 KB
    ├── react-dom                     ~30 KB
    └── scheduler                     ~7 KB

Total First Load:                     ~87 KB
```

**Optimization:** Server Components ship zero JavaScript, keeping bundle minimal.

## Progressive Enhancement Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: React Hydrated (Full Optimistic UI)              │
│  - Instant checkbox updates                                 │
│  - Instant form resets                                      │
│  - Smooth transitions                                       │
│  - Zero perceived latency                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: JavaScript Loaded (Interactive)                   │
│  - Form submission without page reload                      │
│  - Toggle checkbox without page reload                      │
│  - Delete without page reload                               │
│  - Basic interactivity works                                │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: HTML Only (No JavaScript)                         │
│  - Form uses native HTML form submission                    │
│  - POST to Server Action                                    │
│  - Full page reload                                         │
│  - All features work                                        │
└─────────────────────────────────────────────────────────────┘
```

**Every layer is functional.** Users get better experience with more capabilities.

## Deployment Flow

```
Developer                   GitHub                 Vercel
    │                          │                      │
    │  git push                │                      │
    ├─────────────────────────>│                      │
    │                          │                      │
    │                          │  Webhook             │
    │                          ├─────────────────────>│
    │                          │                      │
    │                          │                   [Build]
    │                          │                      │
    │                          │                   - npm install
    │                          │                   - next build
    │                          │                   - optimize
    │                          │                      │
    │                          │                   [Deploy]
    │                          │                      │
    │                          │                   - Edge CDN
    │                          │                   - Global replicas
    │                          │                   - Preview URL
    │                          │                      │
    │                          │  Comment on PR      │
    │                          │<─────────────────────┤
    │  Preview URL             │                      │
    │<─────────────────────────┤                      │
    │                          │                      │
    │  Share with users        │                      │
    │  Get feedback            │                      │
    │  Iterate                 │                      │
    │                          │                      │
    │  Merge to main           │                      │
    ├─────────────────────────>│                      │
    │                          │                      │
    │                          │  Webhook             │
    │                          ├─────────────────────>│
    │                          │                      │
    │                          │                   [Deploy to Production]
    │                          │                      │
    │  Production URL          │                      │
    │<──────────────────────────────────────────────┤
```

**Total time:** ~2 minutes from push to live URL

## Comparison: Traditional vs Vercel Approach

### Traditional Stack

```
Frontend (React SPA)
    │
    │  fetch('/api/tasks')
    ▼
Backend API (Express/Rails)
    │
    │  SQL query
    ▼
Database (Postgres)

Deployment:
- Frontend: S3 + CloudFront
- Backend: EC2/Heroku
- Database: RDS
- CI/CD: Jenkins/CircleCI
- Total setup time: Days
- Deploy time: 10-30 minutes
```

### Vercel Approach

```
Server Components + Client Components
    │
    │  Direct function call
    ▼
Server Actions
    │
    │  File I/O (or SQL)
    ▼
Storage (File/Database)

Deployment:
- Everything: Vercel Edge Network
- Setup time: < 5 minutes
- Deploy time: < 2 minutes
- Preview URLs: Automatic
```

## Migration Path

### Phase 1: Current (File Storage)
```
Server Actions → lib/db.ts → data/tasks.json
```

### Phase 2: Vercel Postgres
```
Server Actions → lib/db.ts → @vercel/postgres
```
**Change only `lib/db.ts`.** Components stay the same.

### Phase 3: Real-time (Supabase/Firebase)
```
Server Actions → lib/db.ts → Supabase Realtime
Client Components → useEffect → Subscribe to changes
```

**Encapsulation wins.** Data layer changes don't affect components.

## Key Insights

### Why Server Components Matter
- **Less JavaScript:** Only interactive parts ship JS
- **Better SEO:** Content rendered on server
- **Faster loads:** HTML streams immediately
- **Simpler code:** Direct data access, no API layer

### Why Server Actions Matter
- **No API boilerplate:** Just write functions
- **Type-safe:** End-to-end TypeScript
- **Progressive enhancement:** Forms work without JS
- **Automatic revalidation:** UI stays fresh

### Why Optimistic UI Matters
- **Perceived speed:** UI updates immediately
- **Better UX:** Users don't wait
- **Graceful failure:** Easy to revert if needed

### Why Vercel Matters
- **Deploy on push:** No CI/CD setup
- **Preview URLs:** Every branch is testable
- **Global edge:** Fast everywhere
- **Zero config:** Framework conventions work

---

This architecture represents the state-of-the-art in web development: minimal JavaScript, maximum performance, instant deploys, and rapid iteration.

**That's the Vercel way.**
