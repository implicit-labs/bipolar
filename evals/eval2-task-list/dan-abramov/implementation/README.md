# Task List Application

A production-ready task list built with React, focusing on mental models and fundamental principles.

## Running the Application

This application has **zero build steps** to keep the focus on React fundamentals:

1. Open `index.html` in a modern web browser
2. That's it!

The app uses:
- React 18 from CDN (development build for better error messages)
- Babel standalone for JSX transformation in the browser

## Features

- **Add tasks**: Type and press Enter or click "Add Task"
- **Mark complete**: Click the checkbox
- **Delete tasks**: Click the × button
- **Clear completed**: Remove all finished tasks at once
- **Persistence**: Tasks are saved to localStorage automatically
- **Statistics**: See remaining, completed, and total counts

## Production Ready Features

### Accessibility
- Semantic HTML (`<form>`, `<label>`, `<ul>`, `<li>`)
- ARIA labels for screen readers
- Keyboard navigation works everywhere
- Focus states visible for keyboard users
- Proper contrast ratios (WCAG AA compliant)

### Persistence
- Automatic save to localStorage
- Survives page reloads
- No backend needed

### Edge Cases Handled
- Empty task validation (can't add blank tasks)
- Empty state messaging
- Long text word-wrapping
- Dark mode support (respects OS preference)
- Reduced motion support (respects OS preference)

### Performance
- No unnecessary re-renders (React is smart about this)
- Stable keys for list reconciliation
- Immutable state updates for predictable behavior

## Code Philosophy

Every component has a single, clear responsibility:

- `App`: Owns state, coordinates everything
- `TaskInput`: Handles new task creation
- `TaskList`: Renders the collection
- `TaskItem`: Renders a single task
- `TaskStats`: Displays derived statistics

Data flows in one direction:
```
State → Props → Rendered UI → Events → State Updates
```

## What's NOT Included (and why)

- **No TypeScript**: Keeping focus on React mental models, not type systems
- **No build tools**: Zero friction to understand the code
- **No testing files**: Would add Jest/React Testing Library in real production
- **No Redux**: Local state is perfect for this use case
- **No CSS-in-JS**: Plain CSS is simple and performant
- **No routing**: Not needed for a single-page task list
- **No fancy animations**: CSS transitions are sufficient

## Learning from This Code

If you're reading this to learn React, study:

1. **State placement** (`App` component - where it's needed)
2. **Data flow** (props down via `tasks`, events up via `onToggle`)
3. **Component re-rendering** (happens when state or props change)
4. **Immutability** (always create new arrays/objects, never mutate)
5. **Controlled components** (`TaskInput` - React owns the input value)
6. **Keys in lists** (stable `id` for each task)
7. **Derived state** (`TaskStats` - compute from existing data)

## For Production Deployment

To deploy this to production:

1. **Switch to production React builds**:
   ```html
   <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
   <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
   ```

2. **Use a build tool** (Vite, Create React App, Next.js) for:
   - TypeScript support
   - Better developer experience
   - Code splitting
   - Tree shaking

3. **Add testing**:
   - Unit tests with Jest
   - Component tests with React Testing Library
   - E2E tests with Playwright or Cypress

4. **Add error boundaries** for graceful error handling

5. **Consider a real backend** for multi-device sync

But for learning React fundamentals? This code is complete as-is.

## Questions This Code Answers

- Where should state live? (Closest common ancestor)
- When do components re-render? (State or props change)
- Why immutability? (React's change detection)
- Do I need Redux? (Not for local state)
- What are controlled components? (React owns the value)
- How do I handle forms? (onSubmit + controlled inputs)
- How do I update arrays immutably? (map, filter, spread)

---

Built with focus on **mental models over memorization**.
