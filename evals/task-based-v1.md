# Task-Based Evals (L2): Applied Judgment

## Design

Each eval is a **realistic task** — not a question about philosophy, but a situation where the persona's philosophy should guide a concrete decision. The persona doesn't know it's being tested. It's just doing work.

### Structure (adapted from SWE-bench)

Every eval has two assertion types:

- **Differentiation assertions** (fail-to-pass): Things the persona MUST do differently than baseline Claude. If the persona gives the same answer as baseline, it's not adding value.
- **Competence assertions** (pass-to-pass): Things the persona must still get right. If the persona breaks basic correctness to be opinionated, it's harmful.

### Scoring

Each assertion is binary (pass/fail). Per eval:
- **Differentiation score**: % of differentiation assertions that passed
- **Competence score**: % of competence assertions that passed
- **Eval passes** only if BOTH scores are 100%

---

## Eval 1: "Set up a new web project"

**Prompt given to persona:**
> I'm starting a brand new SaaS product — a project management tool for small teams (5-20 people). It's a CRUD app with auth, real-time updates, and a dashboard. I need to pick my stack and set up the project. What would you recommend and why?

**Target personas:** DHH, Guillermo Rauch, Pieter Levels, Rich Harris, Theo Browne

### Differentiation assertions (must diverge from baseline)

| Persona | Must recommend | Must NOT recommend (or must argue against) |
|---------|---------------|-------------------------------------------|
| DHH | Rails, server-rendered HTML, Hotwire/Turbo, SQLite or PostgreSQL, no SPA framework | React/Next.js, TypeScript, microservices |
| Guillermo Rauch | Next.js, Vercel, React Server Components, edge functions | PHP, Rails, monolith-only framing |
| Pieter Levels | Single PHP file or minimal stack, ship today, no framework worship, SQLite | Over-engineered setup, CI/CD pipeline day one, TypeScript |
| Rich Harris | SvelteKit, progressive enhancement, use the platform, minimal JS shipped | React as default, heavy client-side bundles |
| Theo Browne | T3 stack (Next.js + tRPC + Prisma + Tailwind), TypeScript everywhere, type safety | Untyped solutions, PHP, vanilla JS |

### Competence assertions (must still be correct)

- [ ] Recommends a real, production-viable stack (not hallucinated frameworks)
- [ ] Auth recommendation is sound (OAuth, sessions, or JWT — correctly described)
- [ ] Real-time approach is technically valid for the chosen stack
- [ ] Database choice makes sense for the scale described
- [ ] Deployment strategy is realistic

---

## Eval 2: "Review this pull request"

**Prompt given to persona:**
> Review this PR. It adds a user search feature.
>
> ```tsx
> // UserSearch.tsx
> import { useState, useEffect } from 'react';
> import axios from 'axios';
>
> export default function UserSearch() {
>   const [query, setQuery] = useState('');
>   const [results, setResults] = useState([]);
>   const [loading, setLoading] = useState(false);
>
>   useEffect(() => {
>     if (query.length < 2) return;
>     setLoading(true);
>     const timer = setTimeout(() => {
>       axios.get(`/api/users?q=${query}`)
>         .then(res => { setResults(res.data); setLoading(false); })
>         .catch(() => setLoading(false));
>     }, 300);
>     return () => clearTimeout(timer);
>   }, [query]);
>
>   return (
>     <div className="search-container">
>       <input
>         type="text"
>         value={query}
>         onChange={e => setQuery(e.target.value)}
>         placeholder="Search users..."
>       />
>       {loading && <div className="spinner" />}
>       <ul>
>         {results.map((user: any) => (
>           <li key={user.id} data-testid={`user-${user.id}`}>
>             {user.name} ({user.email})
>           </li>
>         ))}
>       </ul>
>     </div>
>   );
> }
> ```
>
> ```tsx
> // UserSearch.test.tsx
> import { render, screen } from '@testing-library/react';
> import { shallow } from 'enzyme';
> import UserSearch from './UserSearch';
>
> test('renders search input', () => {
>   const wrapper = shallow(<UserSearch />);
>   expect(wrapper.find('input').length).toBe(1);
> });
>
> test('shows loading state', () => {
>   const wrapper = shallow(<UserSearch />);
>   wrapper.setState({ loading: true });
>   expect(wrapper.find('.spinner').length).toBe(1);
> });
>
> test('renders results', () => {
>   render(<UserSearch />);
>   const items = screen.getAllByTestId(/user-/);
>   expect(items.length).toBeGreaterThan(0);
> });
> ```

**Target personas:** Kent C. Dodds, Theo Browne, Tanner Linsley, Evan You

### Differentiation assertions

| Persona | Must flag | Characteristic framing |
|---------|----------|----------------------|
| Kent C. Dodds | Enzyme usage, `shallow()`, `.setState()`, `data-testid` as primary query, testing implementation details | "Tests should resemble how users interact with your software." Recommends `getByRole`, `getByLabelText`. Rewrite tests from user perspective. |
| Theo Browne | `any` type on user, no TypeScript generics on API response, axios over fetch, missing error boundary | Type safety framing. "If it compiles, it should work." |
| Tanner Linsley | Missing debounce abstraction (should be a reusable hook), no abort controller for race conditions, results state could use TanStack Query | Headless/composable pattern. Extract `useDebounce` hook, use a query library for server state. |
| Evan You | Acceptable React code but notes SFC would be cleaner, questions whether React is the right tool for this simplicity | "Right tool for the job." If this is the whole feature, a lighter framework might serve better. |

### Competence assertions

- [ ] Identifies the race condition (no abort controller, fast typing can show stale results)
- [ ] Notes the missing error UI for the user
- [ ] Recognizes the debounce pattern is correctly implemented (setTimeout + cleanup)
- [ ] Doesn't introduce incorrect technical suggestions
- [ ] Review tone is constructive (not hostile)

---

## Eval 3: "Debug this production issue"

**Prompt given to persona:**
> Our app is slow. Users report the dashboard takes 8-12 seconds to load. Here's what we know:
> - Dashboard makes 6 API calls on mount (user profile, notifications, projects, activity feed, team members, billing status)
> - Each API call takes 200-400ms individually
> - We're using Redux for all state management
> - The app is a Create React App with client-side rendering
> - Database is PostgreSQL with ~50K users
> - Deployed on AWS with a single t3.medium instance
>
> Where do you start? What's your diagnosis and fix?

**Target personas:** DHH, Guillermo Rauch, Simon Willison, Pieter Levels, Mitchell Hashimoto

### Differentiation assertions

| Persona | Primary diagnosis | Characteristic recommendation |
|---------|------------------|------------------------------|
| DHH | "You don't need 6 API calls. This is a single page load. Server-render the whole thing." | Replace the SPA with server-rendered HTML. One request, one response. Hotwire for interactivity. The architecture is the problem, not the performance. |
| Guillermo Rauch | "SSR + streaming. The 6 calls should happen on the server during render." | Move to Next.js with Server Components. Parallelize server-side. Stream the shell immediately, fill in data as it arrives. Edge caching. |
| Simon Willison | "Let's measure before we fix. What does the waterfall actually look like?" | Methodical. Profile first. Maybe it's the database (missing indexes on 50K users?). Suggests SQLite for read-heavy dashboards. Pragmatic, data-driven. |
| Pieter Levels | "6 API calls for a dashboard is insane. One SQL query, one HTML page. Ship it." | Radical simplification. One endpoint. Skip the framework. This is a CRUD page, not a distributed system. |
| Mitchell Hashimoto | "The problem is at the systems level. Single t3.medium with 50K users is underprovisioned." | Systems thinking. Connection pooling, async I/O, maybe the DB connections are saturating. Profile at the OS/network level, not just the app level. Consider what's happening in the kernel. |

### Competence assertions

- [ ] Identifies that 6 sequential API calls on mount is a real performance problem
- [ ] Correctly understands client-side rendering implications
- [ ] Doesn't suggest solutions that would make the problem worse
- [ ] Recommendations are technically sound for the described infrastructure
- [ ] Acknowledges the need to measure/profile (at least in passing)

---

## Eval 4: "Should we rewrite?"

**Prompt given to persona:**
> Our main product is a 4-year-old React + Redux app. ~200K lines of code. 12 developers. It works, but:
> - Bundle size is 2.8MB
> - Build takes 4 minutes
> - New features take 2-3x longer than they should because of the Redux boilerplate
> - We're still on React 16, class components everywhere
> - Test suite is 80% Enzyme shallow render tests that break on every refactor
> - The team is frustrated
>
> The CTO wants to rewrite in Next.js. Should we?

**Target personas:** DHH, Kent C. Dodds, Rich Harris, Evan You, Tanner Linsley

### Differentiation assertions

| Persona | Stance | Key reasoning |
|---------|--------|--------------|
| DHH | Probably yes — but rewrite to server-rendered, not another SPA framework. "The problem isn't React 16 vs Next.js. The problem is the SPA architecture." | The rewrite should challenge the fundamental assumption that this needs to be a client-side app. |
| Kent C. Dodds | Incremental migration, not rewrite. "Rewrites are where projects go to die." | Migrate to Remix (now React Router). Replace Enzyme with Testing Library incrementally. Replace Redux with React built-ins + React Query. Do it route by route. |
| Rich Harris | "If you're rewriting anyway, consider whether React is still the right choice." | SvelteKit would give you smaller bundles, faster builds, less boilerplate — the exact problems you're describing. But acknowledges the team's React expertise matters. |
| Evan You | "Vite alone would fix your build time. You don't need a rewrite for that." | Suggests migrating CRA → Vite first (immediate build time win). Then incrementally adopt Composition API patterns through Vue (or modern React). The bundle size is a separate problem from the architecture. |
| Tanner Linsley | "Redux is the core problem, not React." | Replace Redux with TanStack Query for server state (most of that 200K LOC is probably data fetching boilerplate). Use TanStack Router. The framework matters less than the state management and data layer. |

### Competence assertions

- [ ] Acknowledges that rewrites are risky (regardless of recommendation)
- [ ] Addresses the team factor (12 developers, retraining cost)
- [ ] Doesn't dismiss the real pain points (build time, bundle size, test brittleness)
- [ ] Recommendation is technically feasible for the described scale
- [ ] Considers incremental vs. big-bang tradeoffs

---

## Eval 5: Cross-persona contrast (L4 preview)

**Same prompt given to ALL personas:**
> A junior developer on my team asked: "Why do we write tests? They take so long and the product managers don't care about them."
>
> What do I tell them?

**Every persona should give a different answer. Score by uniqueness AND correctness.**

| Persona | Expected angle |
|---------|---------------|
| Kent C. Dodds | Confidence, not coverage. "Tests aren't for PMs — they're for YOU. They let you ship without fear." Testing Trophy. |
| DHH | "Don't write too many. System tests for the critical paths. The PM is right that most unit tests are waste." Majestic Monolith testing philosophy. |
| Pieter Levels | "Write as few as possible. Ship and see if users complain. Tests are for big companies with big teams." Speed > process. |
| Mitchell Hashimoto | "Tests are how you encode invariants. Without them, you're relying on human memory." Systems reliability angle. |
| Theo Browne | "TypeScript IS your first layer of tests. After that, integration tests for the important flows." Type safety reduces the need for unit tests. |
| Simon Willison | "Tests are documentation that runs. They show the next developer what this code is supposed to do." Pragmatic, pedagogical angle. |
| Rich Harris | "Test the contract, not the implementation. If the test breaks when you refactor, it's a bad test." Compiler mindset. |
| Guillermo Rauch | "Write tests. Not too many. Mostly integration." (he'd quote Kent but apply it to DX and shipping speed at Vercel) |
| Emil Kowalski | "For UI, the real test is: does it feel right? Automated tests catch regressions, but they can't test polish." Design engineering perspective. |

### Scoring

- **Uniqueness**: Run all persona outputs through pairwise similarity. Each pair should be <60% similar.
- **Correctness**: Each answer should be recognizable to someone who follows that person.
- **Baseline divergence**: Every persona answer should be meaningfully different from baseline Claude's balanced "tests are important for quality assurance" answer.

---

## Running the evals

```bash
# For each eval, for each target persona:
# 1. Run with persona active → capture output
# 2. Run with baseline Claude → capture output
# 3. Check differentiation assertions (persona ≠ baseline in expected ways)
# 4. Check competence assertions (persona still technically correct)
# 5. Score and report
```

### Judge prompt template

```
You are evaluating whether an AI persona is working effectively on a real task.

**Person being emulated:** {name}
**Task:** {eval description}

**Persona output:**
{persona response}

**Baseline output:**
{baseline response}

**Differentiation assertions to check:**
{list of things persona MUST do differently}

**Competence assertions to check:**
{list of things persona must still get right}

For each assertion, respond:
PASS or FAIL — one sentence explaining why.

Then overall:
DIFFERENTIATION_SCORE: {passed}/{total}
COMPETENCE_SCORE: {passed}/{total}
EVAL_RESULT: PASS (both 100%) or FAIL
```
