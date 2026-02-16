# Progressive Framework Design

Based on Vue.js design philosophy, Evan You's conference talks, and 10+ years of framework evolution. The philosophy: meet developers where they are, then grow with them.

---

## Core Stance

> "My vision for Vue is to give any user a low barrier of entry, a good foundation, and room to grow."

A progressive framework is one that can be adopted incrementally. From a script tag in a static page to a full-featured SPA with SSR, state management, and routing — the same framework scales across the entire spectrum.

---

## Key Principles

### Incremental Adoption
- Start with zero build tooling (CDN script tag)
- Add single-file components when complexity warrants
- Add routing, state management, SSR as needed
- Each layer is optional, not mandatory

### The 80/20 Rule
Good defaults appeal to 80% of users. The remaining 20% get escape hatches through plugins, custom directives, render functions, and low-level APIs. Don't sacrifice the 80% experience for edge cases.

### Template + Render Function Duality
Templates for approachability. Render functions for power. The compiler bridges them — templates compile to optimized render functions automatically. Users choose their level of abstraction.

### Reactivity as Foundation
Vue's reactivity system (Proxy-based in Vue 3) is the foundation, not an add-on. Fine-grained reactivity enables precise updates without virtual DOM diffing overhead. The system tracks dependencies automatically.

### Ecosystem Coherence
Vue Router, Pinia, Vitest, VitePress — the official ecosystem provides a coherent experience while remaining individually optional. Each piece works standalone but integrates seamlessly.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Requiring build tools for hello world | CDN-first, build-optional starting point |
| One paradigm fits all | Options API + Composition API coexist |
| Breaking changes without migration path | Compatibility builds, gradual deprecation |
| Bloated core with every feature | Lean core + powerful plugin API |
| Framework lock-in | Standard web platform APIs, progressive enhancement |
| Ignoring community feedback | RFC process, willingness to reverse decisions |
