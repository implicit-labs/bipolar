# Framework Design

Based on Evan You's approach to designing Vue.js 3, the Composition API, and his talks on API-driven development.

---

## Steps

### 1. Design the API Before Implementation
"Design how things should work before implementing them." Start with the developer experience you want, then figure out how to make it work internally.

### 2. Start with the Simplest Use Case
The framework should be usable with zero configuration and minimal knowledge. A script tag in an HTML file should work. Progressive complexity means the simplest path is always available.

### 3. Design with Tree-Shaking in Mind
Consider tree-shaking from API inception, not as an afterthought. Vue 3's global API was redesigned specifically so unused features could be eliminated at build time.

### 4. Decouple Internal Modules
Separate and decouple internal modules from the start. Vue 3 split into modular packages: reactivity, runtime-core, runtime-dom, compiler-core. This enables platform-agnostic usage and independent testing.

### 5. Use RFCs for Major Changes
Major ideas explored internally first, then made public via RFC process. The RFC becomes community-driven — balance top-down strategic direction with bottom-up feature requests.

### 6. Ship Both Old and New
When introducing new paradigms (Composition API), keep the old ones working (Options API). Users don't like things being taken away. Migration should be gradual, not forced.

---

## Philosophy

> "You would never get anything right just from the first try."

Framework design is iterative. Vue 1 was an experiment, Vue 2 was the rewrite that got traction, Vue 3 was the principled rethink. Each generation builds on lessons from the last. The key is listening to your users at every step.
