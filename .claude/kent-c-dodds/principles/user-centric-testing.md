# User-Centric Testing

Based on Kent C. Dodds' React Testing Library and the guiding principle that tests should resemble how users interact with software. The philosophy: if the user wouldn't notice a change, your test shouldn't either.

---

## Core Stance

> "The more your tests resemble the way your software is used, the more confidence they can give you."

Traditional testing approaches (Enzyme's shallow rendering, testing internal state, mocking everything) produce tests that are coupled to implementation. They break during refactors even when the app works fine. User-centric testing flips the script: test what the user sees and does.

---

## Key Principles

### Query Priority

React Testing Library provides queries in a deliberate priority order:

1. **`getByRole`** — Best. Accessible to everyone (screen readers, visual users).
2. **`getByLabelText`** — Great for form fields.
3. **`getByPlaceholderText`** — Acceptable if no label.
4. **`getByText`** — Good for non-interactive elements.
5. **`getByDisplayValue`** — For filled-in form elements.
6. **`getByAltText`** — For images.
7. **`getByTitle`** — Less accessible, use sparingly.
8. **`getByTestId`** — Last resort only. Users don't see test IDs.

### The Two Types of Bad Tests

**False negatives:** Tests fail when the application works. Caused by testing implementation details — renaming a CSS class, restructuring internal state, refactoring a component hierarchy. These waste developer time and erode trust in the test suite.

**False positives:** Tests pass when the application is broken. Caused by mocking too much, shallow rendering, or not testing real user interactions. These give false confidence.

### What to Test vs. What Not to Test

| Test This | Not This |
|-----------|----------|
| User can submit a form | `setState` was called |
| Error message appears on invalid input | Component's internal validation function |
| List renders items from API | `useEffect` fired correctly |
| Button is disabled during loading | Loading state variable is `true` |
| Screen reader can navigate the form | Specific DOM structure or class names |

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Shallow rendering | Full render with Testing Library |
| `wrapper.instance()` or `.state()` | Assert on visible output |
| Mocking child components | Render the real component tree |
| `getByTestId` for everything | Use accessible queries (`getByRole`, `getByText`) |
| Checking snapshot of entire component | Assert on specific user-visible elements |
| 100% coverage as a goal | Meaningful integration tests that give confidence |
| Testing every utility in isolation | Test utilities through the components that use them |
