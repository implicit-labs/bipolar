# Eval 1: Set Up a New Web Project — Raw Responses

**Question:** I'm starting a brand new SaaS product — a project management tool for small teams (5-20 people). It's a CRUD app with auth, real-time updates, and a dashboard. I need to pick my stack and set up the project. What would you recommend and why?

---

## DHH

### Persona Response
Start with Ruby on Rails 8 — it's the only framework where one person can ship a complete, polished SaaS product in weeks instead of months. You get authentication via devise or Rails's built-in authentication generator, real-time updates through Action Cable, and a beautiful dashboard with ViewComponent and Hotwire. No React, no TypeScript, no build step nonsense — just server-rendered HTML with Turbo for snappy page updates and Stimulus for the 5% of JavaScript you actually need.

For the database, use PostgreSQL — it'll handle your auth, CRUD, real-time pub/sub, and scale to hundreds of thousands of users before you even think about optimization. Deploy with Kamal to a $40/month Hetzner box and you'll sleep better than the team burning $5K/month on AWS with Kubernetes. Use SQLite with Litestack for background jobs (Solid Queue), caching (Solid Cache), and WebSockets (Solid Cable) — it's all built into Rails 8 and eliminates Redis entirely.

Skip the microservices trap — you're building for 5-20 person teams, not Netflix. A majestic monolith means one codebase, one deploy, one place to debug, and you can move fast without a DevOps team. Use Minitest and fixtures for testing, because life's too short for RSpec's verbose nonsense. This stack lets you focus on customer problems instead of fighting Webpack configs and TypeScript compiler errors, and you'll ship your MVP in a month while the competition is still arguing about their service mesh.

### Baseline Response
For a project management SaaS with real-time updates, I'd recommend a modern full-stack TypeScript setup: **Next.js 15** (App Router) for the frontend/backend, **Supabase** for auth + PostgreSQL + real-time subscriptions, and **shadcn/ui** for the component library.

**Why this stack:** Next.js gives you server components, great SEO, and API routes in one framework, which keeps your codebase simple and deployment straightforward (Vercel or self-hosted). Supabase provides battle-tested auth (magic links, OAuth, RBAC), a powerful PostgreSQL database with row-level security, and real-time subscriptions via WebSockets—perfect for live updates in a PM tool. shadcn/ui gives you accessible, customizable components without the dependency bloat of traditional UI libraries, since you copy the code directly into your project.

**For deployment and infrastructure:** Host on Vercel (free tier to start, scales with usage), use Supabase's managed PostgreSQL (also free tier available), and set up GitHub Actions for CI/CD. Add **Playwright** for end-to-end testing and **Vitest** for unit tests from day one—test coverage is critical for SaaS products where bugs directly impact revenue.

**Project structure:** Keep feature folders co-located (`/app/[feature]/` with components, hooks, and server actions together), use server actions for mutations instead of API routes where possible (less boilerplate), and enforce TypeScript strict mode + ESLint rules early. For state management, start with React Server Components and URL search params—only add Zustand or similar if you genuinely need complex client state.

**Real-time strategy:** Use Supabase Realtime for live updates (task assignments, status changes), but batch updates and use optimistic UI patterns to keep the experience snappy even under load. Set up proper database indexes on foreign keys and frequently-queried columns from the start—pg_stat_statements will help you identify slow queries before they become problems at scale.

**Migration path:** This stack scales well from MVP to thousands of users without a rewrite, and because everything is TypeScript, your team can move between frontend and backend work easily, which is crucial for small teams moving fast.

---

## Guillermo Rauch

### Persona Response
Here's what I'd do:

Start with **Next.js 15 on Vercel** — you get server components, streaming, edge middleware, and instant deployment with preview URLs for every branch. This is the foundation that lets you move fast without infrastructure headaches.

For database, go **Vercel Postgres** (or Neon if you need more control). Postgres handles your CRUD, scales vertically far enough for your use case, and pairs beautifully with **Drizzle ORM** — type-safe, zero magic, reads like SQL. For real-time, add **Supabase Realtime** on top of your Postgres instance or use Vercel's upcoming real-time primitives when they ship.

Auth is **NextAuth.js** (now Auth.js) — OAuth + credentials in 20 lines, session middleware built in. For UI, **Shadcn + Tailwind** — copy components into your repo, no black box, full control over design system. Validation with **Zod** everywhere — client, server, API routes, database inserts.

Ship a working demo in 48 hours. Get it in front of real users on a preview URL before you write a single line of docs. Progressive disclosure of complexity means start with App Router defaults, add real-time subscriptions only where users feel the lag, optimize renders only after you profile. **Demos over memos** — your first 10 users will tell you what to build next, and Vercel's deployment model makes iteration nearly instant.

### Baseline Response
For a modern SaaS project management tool, I'd recommend a full-stack TypeScript setup with **Next.js 14+** (App Router) for the frontend and API routes, **Supabase** for auth, database (Postgres), and real-time subscriptions, and **shadcn/ui** for the component library.

Start with **Next.js** because it handles SSR, API routes, and static generation in one framework, eliminating the need to manage separate frontend/backend repos. Use the App Router with Server Components for dashboard pages that need fast initial loads, and Client Components for interactive UI. **Supabase** is perfect for your use case because it provides Postgres (excellent for relational CRUD data like projects, tasks, users), Row Level Security for multi-tenant isolation, built-in auth with social providers, and Realtime subscriptions for live updates without building your own WebSocket infrastructure.

For the UI layer, use **shadcn/ui** components (built on Radix primitives and Tailwind) rather than a heavy component library—this gives you accessible, customizable components you own and can modify. Add **Zod** for runtime validation on API boundaries and form inputs, and **React Hook Form** for complex forms. Use **TanStack Query** (React Query) for server state management, caching, and optimistic updates—it pairs beautifully with Supabase queries and handles the complexity of real-time data synchronization.

For initial project structure, keep it simple: `app/` for routes and pages, `components/` for UI, `lib/` for utilities and Supabase client setup, and `types/` for shared TypeScript definitions. Set up **TypeScript strict mode**, **ESLint**, and **Prettier** from day one to maintain code quality as your team grows. Generate TypeScript types directly from your Supabase schema using the Supabase CLI—this ensures your frontend types stay in sync with your database schema automatically.

Avoid over-architecting early: start with Supabase's built-in auth (don't build custom JWT handling), use Postgres triggers and RLS policies for access control (don't build middleware layers prematurely), and rely on Next.js API routes for simple server logic before introducing separate microservices. Deploy to Vercel for automatic previews, edge functions, and seamless Next.js integration—this setup lets you move fast, validate product-market fit, and scale infrastructure only when you actually need it.

---

## Pieter Levels

### Persona Response
Here's what I'd do: **SQLite + PHP + vanilla JavaScript, deployed on a single $10/month VPS**. Seriously.

Everyone's going to tell you to use Next.js, Supabase, Vercel, some flavor-of-the-month React framework — but that's all overhead that slows you down. You need to ship this thing in 2 weeks max and start charging money. I'd write vanilla PHP files (index.php, api.php, auth.php), stick user data in SQLite (handles 5-20 teams easily, you're not Facebook), and use basic fetch() calls from the frontend. For real-time updates, just poll every 2 seconds with AJAX — literally nobody will notice it's not WebSockets until you're making $10K/month, and by then you'll know if this idea even works.

Put Stripe integration in on **day one** — if people won't pay $29/month for this, you'll find out immediately instead of wasting 6 months. Deploy it on a single Linode VPS for $10/month, SSH in, edit files directly when you need to fix bugs. No Docker, no Kubernetes, no CI/CD pipeline — that's all procrastination disguised as "best practices."

The goal is to get 10 paying customers in 30 days, not to build the perfect architecture. Boring tech makes you **money**.

### Baseline Response
For a project management SaaS with real-time collaboration, I'd recommend a modern full-stack setup that prioritizes developer velocity and built-in real-time capabilities.

**Frontend:** Next.js 15 with React and TypeScript gives you excellent SEO for marketing pages, server components for performance, and a mature ecosystem. Pair it with Tailwind CSS for rapid UI development and shadcn/ui for accessible component primitives.

**Backend & Database:** Supabase is an excellent choice here—it provides PostgreSQL with built-in real-time subscriptions (perfect for collaborative project updates), row-level security for multi-tenant data isolation, and authentication out of the box. This eliminates the need to build your own auth system and WebSocket infrastructure, saving weeks of work.

**Deployment:** Vercel for the Next.js frontend (seamless integration) and Supabase's hosted platform for the backend. Both scale automatically and have generous free tiers for early development.

**State Management:** TanStack Query (React Query) for server state and Zustand for client state—this combination handles real-time data synchronization elegantly and avoids the complexity of Redux.

**Type Safety:** Use Supabase's TypeScript code generation to get end-to-end type safety from your database schema through to your React components, catching data mismatches at compile time.

This stack lets you ship features rapidly while maintaining production-grade real-time capabilities and security. The key advantage is that Supabase handles the hardest parts (auth, real-time sync, permissions) as managed services, so you can focus on your product's unique value proposition rather than rebuilding infrastructure primitives.

---

## Rich Harris

### Persona Response
Start with **SvelteKit** — it's built for exactly this. You get SSR, file-based routing, server-side data loading, and a proper form system that works without JavaScript. For your database, use **Postgres** with something like Supabase or a managed provider — battle-tested, good TypeScript support, and handles real-time subscriptions natively. Auth can be handled through SvelteKit's server-side session cookies (don't overcomplicate it with tokens early on).

For real-time updates, lean on **server-sent events** or WebSockets through SvelteKit endpoints — you don't need a separate service for a product this size. Keep your state management simple with Svelte's built-in reactivity (runes like `$state` and `$derived`) — you won't need Redux or Zustand. Style with **scoped CSS** in your components; if you want utility classes, Tailwind integrates fine but don't let it balloon your markup.

The whole point is to **write less code**. SvelteKit gives you form actions, load functions, and progressive enhancement out of the box — features React ecosystems bolt on with libraries. You'll ship faster, the bundle will be smaller, and when you need to add features like file uploads or background jobs, you can do it in the same codebase without spinning up microservices. Start simple, scale when you actually need to, not because someone on Twitter said you should use Kubernetes for a five-person tool.

### Baseline Response
For a modern SaaS project management tool with real-time updates, I'd recommend a **Next.js (React) frontend with TypeScript**, **Supabase** for backend infrastructure, and **Vercel** for hosting. This stack gives you instant auth (Supabase Auth with OAuth providers), a PostgreSQL database with row-level security, real-time subscriptions out of the box, and automatic API generation from your schema.

Next.js 15 with the App Router provides excellent developer experience with server components, server actions for mutations, and built-in optimizations like image handling and font loading. TypeScript catches errors early and makes refactoring safe as your data model evolves. Supabase's real-time engine handles presence, broadcast, and database change subscriptions without building your own WebSocket infrastructure, which is critical for collaborative features like live task updates.

For styling, use **Tailwind CSS** with a component library like **shadcn/ui** (not a package dependency—you copy components into your codebase and own them), which gives you accessible, customizable building blocks for dashboards, forms, and modals. For state management, start with React's built-in tools (`useState`, `useContext`) and URL state; only add Zustand or similar if you need global client state.

Set up your project structure with feature folders (e.g., `/features/tasks`, `/features/projects`) rather than technical folders (`/components`, `/hooks`), and configure **ESLint + Prettier** from day one. Create a GitHub repo, enable branch protection on `main`, and use conventional commit messages with a simple CI pipeline (GitHub Actions) that runs type checking, linting, and tests on every PR.

For the database schema, leverage Supabase migrations (stored as SQL files in `supabase/migrations/`) and use **Drizzle ORM** or raw SQL with Supabase's generated TypeScript types—avoid heavy ORMs like Prisma for this stack. Plan your row-level security policies early: they're your authorization layer and prevent entire classes of security bugs.

Finally, use **feature flags** (a simple `features` table in Postgres works fine initially) to gate new functionality during development, and set up **error tracking** (Sentry) and **analytics** (PostHog or Plausible) before launch so you can monitor real usage patterns and catch issues early. This stack scales well from MVP to thousands of users without major rewrites, and the total cost stays under $50/month until you have real traction.

---

## Theo Browne

### Persona Response
Here's what I'd do — and this is battle-tested from building multiple products at Ping Labs.

Start with **Next.js 15 with the App Router** as your foundation. It's your backend and frontend in one, handles routing, server components, and scales seamlessly on Vercel. For type safety end-to-end, use **tRPC** for your API layer — you get full TypeScript inference from server to client without code generation, which means refactoring is instant and safe. Use **Prisma** with Postgres for your database; the schema is readable, migrations are straightforward, and the type generation is chef's kiss. For auth, go **Clerk** if you want to ship fast with a polished UI, or **NextAuth.js** if you want more control and zero cost. Real-time updates are the interesting piece — I'd use **Pusher** or **Ably** for the realtime layer instead of rolling WebSockets yourself, because those are proven systems you don't want to fuck up. Style with **Tailwind CSS** — it's zen-mode CSS and you'll move 3x faster than any other approach. Validate all inputs with **Zod**, share those schemas between client and server, and deploy the whole thing on **Vercel** with a Postgres instance from Neon or Supabase. This stack gives you full type safety, lets you move incredibly fast, and uses boring proven tech (Postgres, Next.js) where it matters while bleeding responsibly on the edges (App Router, tRPC). You'll have a production-ready MVP in weeks, not months.

### Baseline Response
For a modern SaaS project management tool, I'd recommend a **Next.js (App Router) + TypeScript + Supabase + Vercel** stack, which balances developer experience, time-to-market, and scalability for small teams.

**Frontend & Framework:** Next.js 15 with the App Router gives you server-side rendering, excellent performance, and a great developer experience. TypeScript is essential for catching bugs early and maintaining code quality as your team grows. Pair this with **Tailwind CSS** for rapid UI development and **shadcn/ui** for high-quality, accessible components out of the box.

**Backend & Database:** Supabase provides PostgreSQL (proven, reliable), built-in Row Level Security for auth, real-time subscriptions (perfect for your collaborative features), and generous free tier. You get auth (email, OAuth, magic links) and real-time without building it yourself. The REST and GraphQL APIs auto-generate from your schema, saving weeks of backend work.

**Deployment & Infrastructure:** Vercel offers zero-config deployment for Next.js with automatic scaling, preview deployments for every PR, and edge functions globally. The free tier is generous and scales seamlessly when you gain traction.

**Why this stack:** You'll ship faster because Supabase eliminates boilerplate (auth, real-time, API layer), Next.js provides excellent DX with TypeScript safety, and shadcn/ui gives you production-ready components. The ecosystem is mature with extensive documentation and community support. This stack is also cost-effective during validation (both have generous free tiers) and scales to millions of users without architectural rewrites.

**Alternative consideration:** If your team is already expert in another ecosystem (Rails, Laravel, .NET), stick with what you know—familiarity trumps marginal technical advantages early on. But for a greenfield SaaS in 2026, this modern stack hits the sweet spot of productivity, performance, and developer happiness.
