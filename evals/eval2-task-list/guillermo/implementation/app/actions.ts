/**
 * Server Actions - the Vercel way
 *
 * No API routes needed:
 * - Type-safe by default
 * - Direct database access
 * - Automatic revalidation
 * - Progressive enhancement (works without JS)
 */

'use server'

import { revalidatePath } from 'next/cache'
import { createTask, toggleTask, deleteTask } from './lib/db'

export async function addTask(formData: FormData) {
  const text = formData.get('text')

  if (!text || typeof text !== 'string') {
    return { error: 'Task text is required' }
  }

  if (text.trim().length === 0) {
    return { error: 'Task text cannot be empty' }
  }

  try {
    const task = await createTask(text.trim())

    // Revalidate the home page to show the new task
    revalidatePath('/')

    return { success: true, task }
  } catch (error) {
    console.error('Failed to create task:', error)
    return { error: 'Failed to create task' }
  }
}

export async function toggleTaskAction(id: string) {
  try {
    const task = await toggleTask(id)

    if (!task) {
      return { error: 'Task not found' }
    }

    // Revalidate to update the UI
    revalidatePath('/')

    return { success: true, task }
  } catch (error) {
    console.error('Failed to toggle task:', error)
    return { error: 'Failed to toggle task' }
  }
}

export async function deleteTaskAction(id: string) {
  try {
    const deleted = await deleteTask(id)

    if (!deleted) {
      return { error: 'Task not found' }
    }

    // Revalidate to update the UI
    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error('Failed to delete task:', error)
    return { error: 'Failed to delete task' }
  }
}
