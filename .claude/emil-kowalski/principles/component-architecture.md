# Component Architecture

Based on Emil Kowalski's Sonner, Vaul, and his writing on building UI components. The philosophy: the best API is the one users don't have to think about.

---

## Core Stance

> "Never had such good toast states with so little code." — Theo on Sonner

The goal is maximum capability with minimum surface area. A component library's quality is measured by what users don't have to configure, not by what they can.

---

## API Design

### Sensible Defaults Over Configuration
Every prop should have a default that works for 90% of cases. Users who need customization can opt in — but the default path requires zero configuration.

**Sonner example:**
```jsx
// This is the entire setup. Everything else is optional.
<Toaster />
toast('Hello world')
```

### Imperative + Declarative Hybrid
Some actions are inherently imperative (triggering a toast, opening a drawer). Don't force declarative patterns where imperative ones are natural.

- **Declarative:** Component placement (`<Toaster />`)
- **Imperative:** Triggering actions (`toast('message')`)

### Observer Over Context
React Context requires provider wrapping, creates coupling, and fails across module boundaries. The observer pattern enables truly decoupled components:

- `toast()` publishes an event
- `<Toaster />` subscribes and renders
- No shared React tree required
- Works from anywhere — event handlers, utilities, server actions

---

## Accessible Primitives

### Radix UI as Foundation
Build on unstyled, accessible primitives rather than styling from scratch:
- All ARIA attributes handled
- Keyboard navigation built-in
- Focus management automatic
- Screen reader support included

### Transform-Origin from Radix
Use `--radix-*-content-transform-origin` CSS variables to anchor animations to the trigger element's position. This creates origin-aware motion that feels spatially connected.

---

## Composition Patterns

### Compound Components
Group related components under a namespace:
```jsx
<Drawer.Root>
  <Drawer.Trigger />
  <Drawer.Content>
    <Drawer.Handle />
  </Drawer.Content>
</Drawer.Root>
```

Benefits: clear hierarchy, shared state without prop drilling, each piece is independently styleable.

### Minimal Props
Each component should accept only the props it truly needs. Push configuration to CSS variables and sensible defaults rather than prop APIs.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| React Context for cross-cutting triggers | Observer pattern |
| Many required props | Sensible defaults, opt-in configuration |
| CSS-in-JS for component libraries | CSS variables + plain CSS for zero runtime cost |
| Building accessibility from scratch | Radix UI primitives |
| Monolithic component with 30+ props | Compound components with clear hierarchy |
| Runtime theme providers | CSS custom properties (work without JS) |
