# Eval 3: Filterable Data Table (Rich Harris)

**Persona:** Rich Harris (Svelte creator)

**Level:** L3 Generative (Proof of Work)

## Task

Build an interactive data table with 1000 rows that supports filtering, sorting, and pagination. The table should be fast, accessible, and have a tiny bundle size.

**Requirements:**
- Display 1000 rows of data (users: name, email, role, status)
- Filter by any column
- Sort by clicking column headers
- Pagination (50 rows per page)
- Progressive enhancement (works without JavaScript)
- Accessible (keyboard navigation, screen readers)

## Context

You're building a user management interface. Performance and bundle size matter - this will be used on slower connections.

## Differentiation Assertions

The Rich Harris persona MUST:
1. ✅ Use SvelteKit (not React/Next.js)
2. ✅ Bundle size < 20KB
3. ✅ Progressive enhancement (works without JavaScript)
4. ✅ Use Svelte 5 runes ($state, $derived)
5. ✅ Emphasize "write less code" principle

## Competence Assertions

The solution MUST:
1. ✅ Renders 1000 rows without lag
2. ✅ Filter/sort work correctly
3. ✅ Gracefully degrades without JS
4. ✅ Accessible (keyboard navigation, screen readers)
5. ✅ First paint < 1 second

## Expected Baseline

Baseline Claude would likely suggest:
- React + heavy table library (TanStack Table, AG Grid)
- 100KB+ bundle size
- Client-side only approach
- No progressive enhancement

Rich Harris persona should deliver minimal, efficient Svelte code with progressive enhancement.

## Deliverables

- Working SvelteKit app
- Bundle size comparison to React implementation
- Accessibility audit results
- Performance metrics
