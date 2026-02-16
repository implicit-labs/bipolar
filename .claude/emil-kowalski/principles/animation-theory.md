# Animation Theory

Based on Emil Kowalski's "Great Animations," "Good vs Great Animations," "7 Practical Animation Tips," and the animations.dev course. The philosophy: understanding why animations feel right matters more than knowing which framework to use.

---

## Core Stance

> "Easing is the most important part of any animation. The built-in easing curves in CSS are usually not strong enough."

Animation quality is determined by micro-decisions: easing curves, duration, transform-origin, scale start values. These details compound — a mediocre easing with wrong timing creates an animation that feels "off" even if technically correct.

---

## Easing

### The Hierarchy
1. **Custom bezier curves** — Project-specific curves tuned for the product's feel
2. **Spring animations** — Natural, interruptible, physics-based
3. **Built-in CSS easing** — Last resort, usually too weak

### When to Use What
| Context | Easing |
|---------|--------|
| Element entering | ease-out (fast start, slow end) |
| Element exiting | ease-in (slow start, fast end) |
| Moving on screen | ease-in-out or spring |
| Hover/color change | ease |
| Gesture-driven | Spring (always) |

### Custom Curves
Built-in CSS curves lack energy. Custom curves with stronger acceleration create more expressive motion:
```css
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
```

---

## Timing

- **150ms** — Micro-interactions (hover, color, opacity)
- **200ms** — Standard UI transitions (modals, drawers, tabs)
- **250-300ms** — Page transitions, complex orchestrations
- **Never exceed 400ms** — Feels sluggish

Rule: if it feels slow, cut the duration. Users always prefer snappy.

---

## Springs

Springs create natural motion because they model real-world physics. Key parameters:

| Parameter | Effect | Typical Range |
|-----------|--------|--------------|
| **Stiffness** | How fast it moves | 100-300 |
| **Damping** | How quickly it settles | 10-30 |
| **Mass** | How heavy it feels | 0.5-2 |

Higher stiffness + moderate damping = snappy. Lower stiffness + lower damping = bouncy. Avoid excessive bounce in productivity tools.

---

## Performance

### The Composite-Only Rule
Only animate properties that trigger the composite step:
- `transform` (translate, scale, rotate)
- `opacity`

Never animate:
- `height`, `width` (triggers layout)
- `top`, `left`, `right`, `bottom` (triggers layout)
- `padding`, `margin` (triggers layout)
- `border-width` (triggers layout + paint)
- `background-color` (triggers paint)

### Hardware Acceleration
CSS transitions and the Web Animation API automatically get GPU acceleration. `requestAnimationFrame` runs on the main thread — avoid for smooth animations.

### Interruptibility
CSS transitions naturally support retargeting: when a property changes mid-transition, the browser starts a new transition from the current interpolated value. This is why transitions are preferred over keyframe animations for interactive elements.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| `transition: all 0.3s ease` | Specify exact properties: `transition: transform 200ms var(--ease-out-quart)` |
| `scale(0)` as start value | `scale(0.95)` or `scale(0.98)` for natural feel |
| Animating `height` for expand/collapse | `transform: scaleY()` or `clip-path` |
| Same easing for enter and exit | ease-out for enter, ease-in for exit |
| No `prefers-reduced-motion` | Always include: opacity-only fallback or skip |
| Bounce in productivity tools | Subtle overshoot (2-5%) or no bounce |
