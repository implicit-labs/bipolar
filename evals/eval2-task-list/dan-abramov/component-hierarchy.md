# Component Hierarchy & Data Flow

This document visualizes the mental model of how components relate and how data flows through the application.

## Component Tree

```
App (owns state: tasks)
├── TaskInput
│   └── Props: onAdd callback
│   └── State: input value (local)
│
├── TaskStats
│   └── Props: tasks array
│   └── State: none (derives everything from props)
│
├── TaskList
│   ├── Props: tasks, onToggle, onDelete
│   ├── State: none (stateless component)
│   └── Children:
│       └── TaskItem (one per task)
│           ├── Props: task object, onToggle, onDelete
│           └── State: none (stateless component)
│
└── Clear Completed Button (conditional)
    └── Props: none (calls App's clearCompleted directly)
```

## State Ownership

```
┌─────────────────────────────────────────┐
│              APP COMPONENT              │
│                                         │
│  State:                                 │
│  • tasks: Array<Task>                   │
│                                         │
│  Task = {                               │
│    id: number,                          │
│    text: string,                        │
│    completed: boolean                   │
│  }                                      │
│                                         │
│  Methods:                               │
│  • addTask(text)                        │
│  • toggleTask(id)                       │
│  • deleteTask(id)                       │
│  • clearCompleted()                     │
└─────────────────────────────────────────┘
```

**Why state lives in App:**
- Multiple children need access to tasks
- Multiple children need to modify tasks
- App is the closest common ancestor

## Data Flow Diagram

### Downward Flow (Props)

```
┌─────────┐
│   App   │
│ [tasks] │
└────┬────┘
     │
     ├─────────────┬─────────────┬──────────────┐
     │             │             │              │
     ▼             ▼             ▼              ▼
┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│TaskInput│  │TaskStats │  │TaskList  │  │ Clear    │
│         │  │[tasks]   │  │[tasks]   │  │ Button   │
│[onAdd]  │  └──────────┘  │[onToggle]│  └──────────┘
└─────────┘                │[onDelete]│
                           └────┬─────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              ┌──────────┬──────────┬──────────┐
              │ TaskItem │ TaskItem │ TaskItem │
              │ [task]   │ [task]   │ [task]   │
              │[onToggle]│[onToggle]│[onToggle]│
              │[onDelete]│[onDelete]│[onDelete]│
              └──────────┴──────────┴──────────┘
```

### Upward Flow (Events)

```
┌──────────┐
│ TaskItem │  User clicks checkbox
└────┬─────┘
     │ calls onToggle(task.id)
     ▼
┌──────────┐
│TaskList  │  forwards callback
└────┬─────┘
     │ onToggle={toggleTask}
     ▼
┌─────────┐
│   App   │  Updates state:
└─────────┘  setTasks(tasks.map(...))
     │
     ▼
   Re-render
```

## Immutable Update Patterns

### Adding a Task

```javascript
// Old state
tasks = [
  { id: 1, text: 'Task 1', completed: false }
]

// Action: addTask('Task 2')

// New state (new array, new object added)
tasks = [
  { id: 1, text: 'Task 1', completed: false },  // same reference
  { id: 2, text: 'Task 2', completed: false }   // new object
]
```

### Toggling a Task

```javascript
// Old state
tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: false }
]

// Action: toggleTask(1)

// New state (new array, replaced object)
tasks = [
  { id: 1, text: 'Task 1', completed: true },   // new object (replaced)
  { id: 2, text: 'Task 2', completed: false }   // same reference
]
```

### Deleting a Task

```javascript
// Old state
tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: false }
]

// Action: deleteTask(1)

// New state (new array, one item removed)
tasks = [
  { id: 2, text: 'Task 2', completed: false }   // same reference
]
```

## Re-render Behavior

### When App's state changes:

```
App state changes
    ↓
App re-renders
    ↓
React compares new props to old props for each child
    ↓
Child re-renders only if props changed
```

### Example: Toggling task 1

1. User clicks checkbox on TaskItem (id: 1)
2. TaskItem calls `onToggle(1)`
3. App runs `toggleTask(1)`
4. App calls `setTasks(newTasksArray)`
5. React re-renders App
6. TaskStats receives new tasks array → re-renders
7. TaskList receives new tasks array → re-renders
8. Each TaskItem receives task prop:
   - Task 1: New object (completed changed) → re-renders
   - Task 2: Same object reference → React skips re-render
   - Task 3: Same object reference → React skips re-render

**This is why immutability matters**: React can quickly detect which items changed by comparing references.

## Controlled Component Pattern (TaskInput)

```
┌─────────────────────────────────────────┐
│           TaskInput Component           │
│                                         │
│  State: value = "Buy milk"              │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  <input                           │  │
│  │    value={value}     ←─────────┐  │  │
│  │    onChange={e =>   │          │  │  │
│  │      setValue(e.target.value)  │  │  │
│  │    }                │          │  │  │
│  └─────────────────────┼──────────┘  │  │
│                        │             │  │
│  React owns the value  │             │  │
│  User types → onChange → setValue    │  │
│              → re-render → new value │  │
└─────────────────────────────────────────┘
```

**Why controlled?**
- React is the single source of truth
- We can validate, transform, or clear the value easily
- Predictable: UI always matches state

## Persistence Flow (useEffect)

```
┌──────────────────────────────────────┐
│     Component Lifecycle              │
│                                      │
│  1. Mount                            │
│     └─> useState(() => {             │
│           return JSON.parse(          │
│             localStorage.tasks       │
│           )                           │
│         })                            │
│                                      │
│  2. Render                           │
│                                      │
│  3. After Render                     │
│     └─> useEffect(() => {            │
│           localStorage.tasks =       │
│             JSON.stringify(tasks)    │
│         }, [tasks])                  │
│                                      │
│  4. User updates tasks               │
│     └─> setTasks(newTasks)           │
│         └─> Re-render (step 2)       │
│             └─> useEffect runs again │
└──────────────────────────────────────┘
```

**Mental model**: Synchronize React state with an external system (localStorage).

## Key Takeaways

1. **State lives at the top** - App owns tasks because multiple children need access
2. **Data flows down** - Via props (tasks, callbacks)
3. **Events flow up** - Via callback functions
4. **Never mutate** - Always create new arrays/objects
5. **React is smart** - Only re-renders what changed
6. **Controlled components** - React owns all important state
7. **Effects synchronize** - Keep external systems in sync with React state

This mental model applies to ANY React application, no matter how complex.
