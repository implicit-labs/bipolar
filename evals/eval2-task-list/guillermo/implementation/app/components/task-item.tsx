/**
 * Client Component for individual tasks
 *
 * Optimistic UI:
 * - Checkbox updates immediately
 * - Delete removes item immediately
 * - Server confirms in background
 */

'use client'

import { useOptimistic, useTransition } from 'react'
import { toggleTaskAction, deleteTaskAction } from '../actions'
import type { Task } from '../lib/db'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticTask, setOptimisticTask] = useOptimistic(task)

  function handleToggle() {
    // Optimistically update the UI
    startTransition(async () => {
      setOptimisticTask({
        ...optimisticTask,
        completed: !optimisticTask.completed,
      })

      const result = await toggleTaskAction(task.id)

      if (result.error) {
        console.error(result.error)
      }
    })
  }

  function handleDelete() {
    // Optimistically remove from UI
    startTransition(async () => {
      const result = await deleteTaskAction(task.id)

      if (result.error) {
        console.error(result.error)
      }
    })
  }

  return (
    <li
      className={`task-item ${optimisticTask.completed ? 'completed' : ''} ${
        isPending ? 'pending' : ''
      }`}
    >
      <label className="task-label">
        <input
          type="checkbox"
          checked={optimisticTask.completed}
          onChange={handleToggle}
          disabled={isPending}
          className="task-checkbox"
        />
        <span className="task-text">{optimisticTask.text}</span>
      </label>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="delete-button"
        aria-label={`Delete task: ${optimisticTask.text}`}
      >
        ×
      </button>
    </li>
  )
}
