# Animation Design Workflow

Based on Emil Kowalski's blog posts "Great Animations," "You Don't Need Animations," and "7 Practical Animation Tips."

---

## Steps

### 1. Question Purpose
Before touching code, articulate the animation's purpose in one sentence. Valid purposes: spatial orientation, state feedback, attention direction, loading indication. If you can't articulate it, don't animate.

### 2. Assess Frequency
Map how often the user will trigger this interaction:
- **100+ times/day** (keyboard nav, list traversal) → No animation
- **10-100 times/day** (button clicks, tab switches) → Minimal, fast (150ms)
- **1-10 times/day** (page transitions, modals) → Standard (200-300ms)
- **Rare** (onboarding, first-time reveals) → Richer, can exceed 300ms

### 3. Choose Motion Type
| Context | Motion Type |
|---------|------------|
| Enter/exit | Fade + scale (from 0.95) with ease-out |
| Movement on screen | ease-in-out or spring |
| Hover/color change | ease, 150ms max |
| Gesture-driven | Spring (interruptible) |
| Loading/skeleton | Subtle pulse, opacity only |

### 4. Set Parameters
- **Duration:** 150-300ms for UI transitions. Never exceed 400ms.
- **Easing:** Custom bezier curves, not built-in CSS. Ease-out for enters, ease-in for exits.
- **Scale origin:** 0.95-0.98, never 0. Use `transform-origin` matching the trigger position.
- **Properties:** `transform` and `opacity` only. No layout-triggering properties.

### 5. Review in Slow Motion
Scrub the animation frame-by-frame. Check:
- Does the easing feel natural or robotic?
- Is the duration too long? (If in doubt, it is.)
- Does scale-from feel gentle or jarring?
- Is transform-origin logically placed?

### 6. Review with Fresh Eyes
> "With animations, you have to be patient and take time to review your work."

Wait at least a few hours, ideally overnight. Imperfections become obvious with distance. Test in the full product context, not in isolation.

### 7. Accessibility Check
- Add `prefers-reduced-motion` media query
- Test with reduced motion enabled — ensure the UI still makes sense
- Provide opacity-only fallbacks where appropriate

---

## Philosophy

> "Before animating, ask yourself: What's the purpose of this animation?"

The workflow is deliberately front-loaded with "should we?" questions because the most common animation mistake is adding motion that doesn't need to exist. Restraint is the hardest skill.
