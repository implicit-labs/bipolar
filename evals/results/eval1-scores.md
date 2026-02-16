# Eval 1: Set Up a New Web Project — Results

**Status:** ✅ ALL PASS

**Summary:** All 5 personas successfully differentiated from baseline Claude while maintaining technical competence. Each persona gave characteristically different recommendations that matched their known philosophies.

---

## Scores

| Persona | Differentiation | Competence | Total | Result |
|---------|----------------|------------|-------|--------|
| DHH | 5/5 | 5/5 | **10/10** | ✅ PASS |
| Guillermo Rauch | 5/5 | 5/5 | **10/10** | ✅ PASS |
| Pieter Levels | 5/5 | 5/5 | **10/10** | ✅ PASS |
| Rich Harris | 5/5 | 5/5 | **10/10** | ✅ PASS |
| Theo Browne | 5/5 | 5/5 | **10/10** | ✅ PASS |

**Overall:** 50/50 (100%)

---

## Key Findings

### Differentiation (5/5 all personas)

**DHH** ✅
- Recommended Rails, Hotwire, server-rendered HTML
- Explicitly argued against React, TypeScript, microservices
- Used characteristic framing: "majestic monolith", "no build step nonsense"

**Guillermo Rauch** ✅
- Recommended Next.js + Vercel with preview URLs
- Emphasized "demos over memos", "ship in 48 hours", progressive disclosure
- Characteristic DX focus: instant deployment, zero infrastructure headaches

**Pieter Levels** ✅
- Recommended PHP + SQLite + $10/month VPS
- Explicitly argued against Next.js, TypeScript, Docker, K8s, CI/CD
- Characteristic framing: "boring tech makes you money", "10 paying customers in 30 days"

**Rich Harris** ✅
- Recommended SvelteKit (not React)
- Emphasized "write less code", progressive enhancement, scoped CSS
- Argued against Redux/Zustand, microservices, over-engineering

**Theo Browne** ✅
- Recommended Next.js + tRPC + Prisma (T3 Stack)
- Emphasized end-to-end type safety, Zod validation
- Characteristic framing: "bleed responsibly", "battle-tested", type safety non-negotiable

### Competence (5/5 all personas)

All personas:
- Recommended production-viable stacks (no hallucinated frameworks)
- Gave sound auth recommendations (devise/Rails auth, NextAuth, Clerk, SvelteKit sessions, vanilla PHP sessions)
- Proposed technically valid real-time approaches (Action Cable, Supabase Realtime, AJAX polling, SSE/WebSockets, Pusher/Ably)
- Made sensible database choices for the scale (PostgreSQL, SQLite, Supabase)
- Suggested realistic deployment strategies (Kamal, Vercel, $10 VPS, SvelteKit adapters)

---

## Cross-Persona Contrast

The same question produced 5 genuinely different stacks:

| Persona | Stack | Philosophy |
|---------|-------|-----------|
| DHH | Rails + Hotwire + Kamal | Monolith, server-rendered, own infrastructure |
| Guillermo | Next.js + Vercel + RSC | Ship fast, DX=UX, preview URLs |
| Pieter | PHP + SQLite + VPS | Boring tech, revenue validation, solo scale |
| Rich | SvelteKit + Postgres | Write less code, compiler-first, platform features |
| Theo | Next.js + tRPC + Prisma | End-to-end type safety, T3 Stack, bleed responsibly |

**Baseline Claude** always recommended: Next.js + TypeScript + Supabase + Vercel (generic modern stack).

The personas successfully avoided converging on the same answer while staying technically correct.

---

## Eval Criteria

### Differentiation Assertions (Must PASS to differentiate from baseline)
Each persona had 5 specific assertions checking:
- Recommended technologies match the person's known preferences
- Explicitly argues against technologies the person rejects
- Uses characteristic framing and language
- Avoids generic/balanced recommendations

### Competence Assertions (Must PASS to maintain technical quality)
All personas checked for:
- Production-viable stack (not hallucinated)
- Sound auth recommendation
- Valid real-time approach
- Sensible database choice for scale
- Realistic deployment strategy

---

## Conclusion

**Eval 1 demonstrates that personas successfully act as "skill packages"** — picking a persona gives you a specific, opinionated answer aligned with that person's philosophy, not a generic Claude response. The personas are meaningfully different from each other AND from baseline, while maintaining technical correctness.
