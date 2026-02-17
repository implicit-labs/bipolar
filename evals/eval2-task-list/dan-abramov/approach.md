# Mental Model: Task List Application

## The Core Question

Before writing any code, I ask: **What is the minimal mental model needed to understand this application?**

A task list is fundamentally about:
1. A collection of tasks (state)
2. Operations on that collection (add, toggle, delete)
3. A view of that state (rendering)

That's it. Everything else is details.

## Data Flow: The React Way

React has one data flow direction: **props down, events up**.

```
State (tasks array)
    ↓
Props (task data + callbacks)
    ↓
Rendered UI
    ↓
User events
    ↓
State updates (via setState)
    → (cycle repeats)
```

This unidirectional flow makes the application predictable. When something goes wrong, you trace the flow in one direction.

## State: What Changes Over Time?

I need to track:
- `tasks`: An array of task objects
- Each task has: `id`, `text`, `completed`

That's the entire state tree. Simple.

**Do I need Redux?** No. This is local component state. Redux is for when you need:
- Time-travel debugging
- State shared across distant components
- Complex state updates that benefit from reducers

We have none of those needs. `useState` is perfect.

## Identity and Keys

Every task needs a stable identity. React uses keys to track which items changed, were added, or were removed.

**Bad:** Using array index as key (breaks when reordering)
**Good:** Using a unique ID (stable across renders)

I'll use `Date.now()` for IDs - good enough for a single user. In production with real users, you'd use UUIDs or server-generated IDs.

## Component Structure: Optimizing for Change

I'll split this into components based on **responsibility**, not arbitrary boundaries:

1. **App**: Owns the state, coordinates everything
2. **TaskInput**: Handles new task creation (controlled component)
3. **TaskList**: Renders the collection
4. **TaskItem**: Renders a single task

This structure makes changes easy:
- Want to add filtering? Add it to App, pass filtered tasks to TaskList
- Want to edit tasks? Add edit mode to TaskItem
- Want persistence? Add useEffect to App

Each component has a clear job.

## The "Controlled Component" Pattern

TaskInput is a controlled component - React owns the input value:

```jsx
const [value, setValue] = useState('')
<input value={value} onChange={e => setValue(e.target.value)} />
```

Why? Because it makes the data flow explicit. The input displays what React tells it to display. No hidden DOM state.

## Event Handlers: Callbacks Up

Child components don't mutate parent state directly. They call callbacks:

```jsx
// Parent
<TaskItem task={task} onToggle={toggleTask} onDelete={deleteTask} />

// Child
<button onClick={() => onToggle(task.id)}>
```

This keeps components decoupled. TaskItem doesn't know *how* toggling works, just that it should notify its parent.

## Immutability: The Key to Predictability

When updating state, I never mutate:

```jsx
// Bad
tasks[0].completed = true
setTasks(tasks)  // React won't detect the change!

// Good
setTasks(tasks.map(t =>
  t.id === id ? { ...t, completed: !t.completed } : t
))
```

Why? React compares references to detect changes. Mutation breaks that. Immutable updates make React's reconciliation work.

## Production Ready Means...

1. **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels
2. **Persistence**: localStorage (synchronous, simple)
3. **Edge cases**: Empty states, long text, rapid actions
4. **Performance**: Already fast (no premature optimization needed)
5. **Code quality**: Clear variable names, comments where needed

## What I'm NOT Doing

- **No TypeScript**: Keeping it simple for mental model clarity
- **No build tools**: Plain React, no webpack complexity
- **No testing code**: Would add it in real production, but not core to the mental model
- **No fancy animations**: CSS transitions are enough
- **No Redux**: State is local and simple
- **No prop-types**: Would use TypeScript in real production

## The Implementation Philosophy

Every line of code should answer: **"What problem does this solve?"**

If I can't answer that clearly, the code shouldn't exist.

React is a library for building user interfaces by composing components with one-way data flow. That's the mental model. Everything else follows from understanding that deeply.

## Learning from This Code

If you're reading this to learn React, focus on:

1. **Where state lives** (always in the closest common ancestor)
2. **How data flows** (down via props, up via callbacks)
3. **When components re-render** (when state or props change)
4. **Why we avoid mutation** (breaks React's change detection)

Master these four concepts and you understand React.
