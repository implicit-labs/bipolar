# Compiler vs Runtime

Based on Rich Harris's "Virtual DOM is Pure Overhead" blog post, "Rethinking Reactivity" talk, and Svelte's architectural decisions. The philosophy: what can be done at build time should be done at build time.

---

## Core Stance

> "It doesn't make sense to do a lot of work in the browser when every single user has to do that work... when you could just do that at compile time."

Runtime frameworks ship a framework to every user, then that framework does work in the browser to figure out what changed. A compiler-based approach does that work once, at build time, and ships only the minimal code needed.

---

## The Virtual DOM Critique

The virtual DOM was introduced as a performance optimization, but it's actually *additional* work:

1. Component renders → creates virtual DOM tree
2. Framework diffs new tree against old tree
3. Framework applies minimal real DOM changes

Steps 1 and 2 are overhead. A compiler can go directly from state change → minimal real DOM update, skipping the intermediary entirely.

> "It's more accurate to say 'the virtual DOM is usually fast enough.'"

The real benefit of virtual DOM was always declarative, state-driven UI — not performance. Svelte proves you can have declarative UI without the runtime overhead.

---

## Key Principles

### Compile Away the Framework
The best framework footprint is zero. Svelte components compile to vanilla JavaScript that directly manipulates the DOM. No framework runtime shipped to users.

### Surgical DOM Updates
The compiler knows at build time which parts of the DOM depend on which state. When state changes, only the affected DOM nodes are updated — no diffing needed.

### Bundle Size Through Elimination
Features you don't use aren't included. Unlike runtime frameworks where the full framework ships regardless, Svelte's compilation includes only what each component needs.

### Reactivity Without Runtime
Svelte 3 used compiler-instrumented `$:` labels. Svelte 5 uses runes (`$state`, `$derived`, `$effect`). Both approaches: the compiler adds the reactivity tracking code, not a runtime system.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Shipping a virtual DOM runtime to every user | Compile components to direct DOM operations |
| Runtime dependency tracking (MobX, hooks) | Compile-time instrumented reactivity |
| Framework overhead in every bundle | Tree-shake and compile away unused features |
| Diffing entire component trees | Surgical updates to only affected DOM nodes |
| Declaring reactivity with method calls | Use the language itself (`count += 1`) |
