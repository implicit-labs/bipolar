/**
 * Simple file-based storage for tasks
 *
 * Ship to learn philosophy:
 * - Start with the simplest thing that works
 * - Migrate to Vercel Postgres/KV when you know the data model is right
 * - Don't over-engineer before you have users
 */

import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

const DATA_DIR = join(process.cwd(), 'data')
const TASKS_FILE = join(DATA_DIR, 'tasks.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    // Directory already exists, that's fine
  }
}

// Read tasks from file
export async function getTasks(): Promise<Task[]> {
  try {
    await ensureDataDir()
    const data = await readFile(TASKS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

// Write tasks to file
async function saveTasks(tasks: Task[]): Promise<void> {
  await ensureDataDir()
  await writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2))
}

// Create a new task
export async function createTask(text: string): Promise<Task> {
  const tasks = await getTasks()
  const newTask: Task = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  tasks.push(newTask)
  await saveTasks(tasks)
  return newTask
}

// Toggle task completion
export async function toggleTask(id: string): Promise<Task | null> {
  const tasks = await getTasks()
  const task = tasks.find(t => t.id === id)
  if (!task) return null

  task.completed = !task.completed
  await saveTasks(tasks)
  return task
}

// Delete a task
export async function deleteTask(id: string): Promise<boolean> {
  const tasks = await getTasks()
  const filteredTasks = tasks.filter(t => t.id !== id)

  if (filteredTasks.length === tasks.length) {
    return false // Task not found
  }

  await saveTasks(filteredTasks)
  return true
}
