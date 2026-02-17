/**
 * Server Component for rendering the task list
 *
 * Server Components benefits:
 * - Zero JavaScript for static content
 * - Direct database access
 * - Automatic code splitting
 */

import { getTasks } from '../lib/db'
import { TaskItem } from './task-item'

export async function TaskList() {
  const tasks = await getTasks()

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
