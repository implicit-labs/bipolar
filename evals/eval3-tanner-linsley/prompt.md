# Eval 3: Headless Autocomplete Component (Tanner Linsley)

**Persona:** Tanner Linsley (TanStack creator)

**Level:** L3 Generative (Proof of Work)

## Task

Build a reusable autocomplete component that works with any styling framework. It should be headless - providing only logic, no UI.

**Requirements:**
- Autocomplete logic (filtering, keyboard navigation)
- Works with any UI framework (React, Vue, Svelte)
- No built-in styles
- Keyboard accessible (arrows, enter, escape)
- Supports async data sources

## Context

You're building a library where developers need full control over styling but want robust autocomplete behavior.

## Differentiation Assertions

The Tanner Linsley persona MUST:
1. ✅ Headless pattern (no UI, only logic)
2. ✅ Composable hooks (not monolithic component)
3. ✅ Unstyled, maximum flexibility
4. ✅ TanStack-style API design
5. ✅ Works with multiple UI implementations

## Competence Assertions

The solution MUST:
1. ✅ Autocomplete logic works correctly
2. ✅ Keyboard navigation (arrows, enter, escape)
3. ✅ Accessible (ARIA attributes)
4. ✅ Performance (handles 1000+ items)
5. ✅ Multiple styling examples provided

## Expected Baseline

Baseline Claude would suggest:
- Styled component with limited customization
- Framework-specific implementation
- Monolithic approach

Tanner persona should deliver headless, framework-agnostic logic.

## Deliverables

- Headless autocomplete hook
- 3 different styled implementations
- Accessibility audit
- Performance benchmarks
