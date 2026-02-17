const { useState, useEffect } = React;

// ============================================================================
// TASK ITEM COMPONENT
// ============================================================================
// Responsibility: Render a single task and handle its interactions
// Mental model: A task is data + two actions (toggle, delete)
// ============================================================================

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="task-text">{task.text}</span>
      </label>
      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task "${task.text}"`}
      >
        ×
      </button>
    </li>
  );
}

// ============================================================================
// TASK LIST COMPONENT
// ============================================================================
// Responsibility: Render a collection of tasks
// Mental model: Map over data, render each item with a stable key
// ============================================================================

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="task-list" role="list">
      {tasks.map(task => (
        <TaskItem
          key={task.id} // Stable key for React's reconciliation
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

// ============================================================================
// TASK INPUT COMPONENT
// ============================================================================
// Responsibility: Handle new task creation
// Mental model: Controlled component - React owns the input value
// ============================================================================

function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate: don't add empty tasks
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    // Notify parent (data flows up via callbacks)
    onAdd(trimmedValue);

    // Clear input for next task
    setValue('');
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task"
        autoFocus
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

// ============================================================================
// TASK STATS COMPONENT
// ============================================================================
// Responsibility: Show summary statistics
// Mental model: Derive state from existing data - don't store it separately
// ============================================================================

function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  if (total === 0) return null;

  return (
    <div className="task-stats">
      <span>{remaining} remaining</span>
      <span className="divider">·</span>
      <span>{completed} completed</span>
      <span className="divider">·</span>
      <span>{total} total</span>
    </div>
  );
}

// ============================================================================
// APP COMPONENT
// ============================================================================
// Responsibility: Own state, coordinate child components, handle persistence
// Mental model: State lives at the top, flows down via props
// ============================================================================

function App() {
  // State: The single source of truth for our tasks
  const [tasks, setTasks] = useState(() => {
    // Initialize from localStorage if available
    // We do this in the initializer function to only run once
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect: Persist to localStorage whenever tasks change
  // Mental model: Synchronize with an external system (browser storage)
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // Only run when tasks change

  // ========================================
  // STATE UPDATE FUNCTIONS
  // ========================================
  // Mental model: Never mutate, always create new arrays/objects
  // React detects changes by comparing references
  // ========================================

  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // Good enough for single-user, local-first app
      text: text,
      completed: false
    };

    // Create new array with new task
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    // Map creates a new array
    // We replace the object we want to change, keep others the same
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed } // New object, flipped completed
        : task // Same reference, no change
    ));
  };

  const deleteTask = (id) => {
    // Filter creates a new array without the deleted task
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // ========================================
  // RENDER
  // ========================================
  // Mental model: Describe what the UI should look like
  // React handles the DOM updates
  // ========================================

  const hasCompletedTasks = tasks.some(t => t.completed);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tasks</h1>
        <p className="subtitle">A mental model for React state and data flow</p>
      </header>

      <main className="app-main">
        <TaskInput onAdd={addTask} />

        <TaskStats tasks={tasks} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        {hasCompletedTasks && (
          <div className="actions">
            <button
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with React • Focus on mental models and fundamentals
        </p>
      </footer>
    </div>
  );
}

// ============================================================================
// BOOTSTRAP
// ============================================================================
// Render the app into the DOM
// ============================================================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
