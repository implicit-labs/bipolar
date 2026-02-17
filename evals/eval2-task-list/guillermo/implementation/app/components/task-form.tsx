/**
 * Client Component for adding tasks
 *
 * Optimistic UI:
 * - Form resets immediately
 * - Shows feedback before server confirms
 * - Gracefully handles errors
 */

'use client'

import { useRef, useTransition } from 'react'
import { addTask } from '../actions'

export function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    // Optimistically reset the form
    formRef.current?.reset()

    // Submit to server
    startTransition(async () => {
      const result = await addTask(formData)

      if (result.error) {
        // In production, show a toast or error message
        console.error(result.error)
      }
    })
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="task-form"
    >
      <input
        type="text"
        name="text"
        placeholder="What needs to be done?"
        required
        autoComplete="off"
        disabled={isPending}
        className="task-input"
      />
      <button
        type="submit"
        disabled={isPending}
        className="add-button"
      >
        {isPending ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}
