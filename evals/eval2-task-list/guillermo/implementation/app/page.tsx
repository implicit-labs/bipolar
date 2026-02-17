/**
 * Main page - Server Component by default
 *
 * Architecture:
 * - Server Component for shell (zero JS)
 * - Client Components for interactivity (TaskForm, TaskItem)
 * - Server Actions for mutations (no API routes)
 *
 * This is the Vercel way:
 * - Progressive enhancement
 * - Optimal performance
 * - Simple mental model
 */

import { Suspense } from 'react'
import { TaskForm } from './components/task-form'
import { TaskList } from './components/task-list'

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1>Task List</h1>
        <p className="subtitle">
          Built with Next.js 15 · Server Components · Server Actions
        </p>
      </header>

      <section className="content">
        <TaskForm />

        <Suspense fallback={<div className="loading">Loading tasks...</div>}>
          <TaskList />
        </Suspense>
      </section>

      <footer className="footer">
        <p>
          Ship to learn: Start simple, deploy fast, iterate based on feedback.
        </p>
        <p className="tech-stack">
          Next.js 15 • React 19 • Server Components • Server Actions
        </p>
      </footer>
    </main>
  )
}
