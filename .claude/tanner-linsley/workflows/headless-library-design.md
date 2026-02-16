# Headless Library Design

Based on Tanner Linsley's design of TanStack Table, Query, Form, and the entire TanStack ecosystem. The philosophy: separate all logic from presentation and give developers complete control over UI.

---

## Steps

### 1. Build a Framework-Agnostic Core
Write all logic, state management, and utilities in pure TypeScript with zero framework dependencies. This core handles data manipulation, validation, state transitions, and API design.

### 2. Create Thin Framework Adapters
Add minimal adapter layers for React, Vue, Solid, Svelte, and Angular. These adapters translate the core's imperative API into each framework's reactive primitives (hooks, composables, signals).

### 3. Ship Zero UI
Don't render anything by default. Provide state and prop getters — functions that return the props developers should spread onto their own elements. "If you don't render anything by default, users don't need to disable features."

### 4. Design Sensible Defaults
Research best practices before exposing configuration. Most users should never need to configure anything. "Aggressive but sane defaults" means the library works correctly out of the box.

### 5. Enable Progressive Complexity
The API should gradually open to more complexity for power users. Simple use cases are one-liners. Advanced use cases unlock through optional configuration, not mandatory boilerplate.

### 6. Keep Dependencies Light
Minimize external dependencies for long-term maintainability. Each dependency is a potential breaking change, security risk, and bundle size increase.

---

## Philosophy

> "Being written in TypeScript and being designed type-safe are not the same thing."

Headless libraries eliminate the #1 source of issues in component libraries: styling conflicts. When you own zero UI, users own all of it. The result: fewer issues, more flexibility, longer library lifespan.
