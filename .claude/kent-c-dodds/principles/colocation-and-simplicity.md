# Colocation and Simplicity

Based on Kent C. Dodds' writing on code organization, state management, and the principle that proximity reduces complexity. The philosophy: keep things close to where they're used and avoid premature abstractions.

---

## Core Stance

> "Place code as close to where it's relevant as possible."

When code is far from where it's used, you forget about it, duplicate it, or make it drift from its purpose. Colocation is a forcing function for simplicity — if everything a component needs is right next to it, the component is self-documenting.

---

## Key Principles

### State Colocation

State should be managed as close to where it's rendered as possible. Don't lift state to a global store when it only matters to one component or a small subtree.

**The decision tree:**
1. Does only this component use this state? → `useState` in that component.
2. Does a parent and its children share this state? → Lift to the nearest common parent.
3. Is this state needed across distant parts of the tree? → Context or a state management library.
4. Is this state from a server? → It's not state — it's cache. Use a data-fetching library.

### File Colocation

Place related files next to each other:
- `Button.tsx` + `Button.test.tsx` + `Button.module.css` in the same directory
- Not `src/components/Button.tsx` + `src/__tests__/Button.test.tsx` + `src/styles/Button.css`

When files are colocated, deleting a feature means deleting a folder. When they're scattered, deleting a feature means hunting across the project.

### AHA Programming

"Avoid Hasty Abstractions." The progression:
1. Write code inline (duplicated if needed).
2. When the pattern appears 2-3+ times and the shape is clear, abstract.
3. If the abstraction becomes awkward, don't be afraid to inline it and start over.

The cost of the wrong abstraction compounds over time as more consumers depend on it. Duplication is cheap. Wrong abstractions are expensive.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Global state for form values | `useState` in the form component |
| Separate `__tests__` directory tree | Colocate test files next to source |
| DRY at all costs — extracting after 2 occurrences | AHA — wait until the pattern is clear |
| `utils/` folder with hundreds of helpers | Colocate utilities with their consumers |
| Premature Redux/Zustand adoption | Start with React built-ins, add when painful |
| Deeply nested folder hierarchies | Flat structures with colocated files |
