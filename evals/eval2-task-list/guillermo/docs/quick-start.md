# Quick Start Guide

Get the task list app running locally in under 2 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm or yarn
- A code editor (VS Code recommended)

## Installation

```bash
# Clone or download the code
cd implementation/

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it.** No database setup, no environment variables, no configuration.

## Project Structure

```
app/
├── page.tsx              # Main page (Server Component)
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── actions.ts            # Server Actions (add/delete/toggle)
├── components/
│   ├── task-form.tsx     # Form with optimistic UI
│   ├── task-item.tsx     # Task with optimistic updates
│   └── task-list.tsx     # Server Component for rendering tasks
└── lib/
    └── db.ts             # Data layer (file-based)

data/
└── tasks.json            # Task data (auto-created)
```

## Making Changes

### Edit a Component

1. Open `app/components/task-form.tsx`
2. Change the placeholder text
3. Save
4. Browser auto-refreshes (~100ms)

### Add a Feature

Example: Add a "Clear Completed" button

1. **Add Server Action** (`app/actions.ts`):
```tsx
export async function clearCompleted() {
  'use server'
  const tasks = await getTasks()
  const activeTasks = tasks.filter(t => !t.completed)
  await saveTasks(activeTasks)
  revalidatePath('/')
  return { success: true }
}
```

2. **Add Button** (`app/page.tsx`):
```tsx
import { clearCompleted } from './actions'

<form action={clearCompleted}>
  <button type="submit">Clear Completed</button>
</form>
```

3. **Test immediately** (hot reload)

### Style Changes

Edit `app/globals.css`:
```css
.task-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Changes appear instantly.

## Testing

### Manual Testing Checklist

Open the app and verify:

- [ ] Can add a new task
- [ ] Task appears in the list
- [ ] Can toggle task completion
- [ ] Completed tasks show strikethrough
- [ ] Can delete a task
- [ ] Task disappears from list
- [ ] Data persists on page reload

### Test Progressive Enhancement

1. Open Chrome DevTools
2. Settings → Disable JavaScript
3. Reload page
4. Form should still work (full page reload)
5. Re-enable JavaScript
6. Now form works without page reload (optimistic UI)

### Test Performance

```bash
# Build production version
npm run build

# Check bundle size
# Output shows size of each route
```

Target: First Load JS < 100 KB

### Test Accessibility

1. Tab through all elements (keyboard navigation)
2. Use screen reader (VoiceOver on Mac, NVDA on Windows)
3. Check color contrast (Chrome DevTools → Lighthouse → Accessibility)

## Development Workflow

### Feature Branch Workflow

```bash
# Create feature branch
git checkout -b feat/add-categories

# Make changes
# ... edit code ...

# Test locally
npm run dev

# Build to check for errors
npm run build

# Commit
git add .
git commit -m "Add task categories"

# Push (triggers Vercel preview deployment)
git push origin feat/add-categories

# Get preview URL from Vercel
# Share with users/team for feedback
```

### Debugging

#### Server Component Issues
```tsx
// Add console.log in Server Components
export async function TaskList() {
  const tasks = await getTasks()
  console.log('Tasks:', tasks) // Shows in terminal
  return <ul>...</ul>
}
```

Check terminal output (not browser console).

#### Client Component Issues
```tsx
// Add console.log in Client Components
export function TaskItem({ task }) {
  console.log('Task:', task) // Shows in browser console
  return <li>...</li>
}
```

Check browser console (F12).

#### Server Action Issues
```tsx
export async function addTask(formData) {
  'use server'
  console.log('FormData:', formData) // Terminal
  try {
    const result = await createTask(text)
    console.log('Result:', result) // Terminal
    return { success: true }
  } catch (error) {
    console.error('Error:', error) // Terminal
    return { error: error.message }
  }
}
```

## Common Tasks

### Clear All Data

```bash
# Delete the data directory
rm -rf data/

# Restart dev server
npm run dev

# Fresh start with empty task list
```

### Reset to Default State

```bash
# Create data/tasks.json manually
echo '[]' > data/tasks.json
```

### View Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Open http://localhost:3000
```

This shows exactly what users will see in production.

## IDE Setup (VS Code)

### Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix them, then rebuild
npm run build
```

### Data File Locked

```bash
# On Windows, close any editors with data/tasks.json open
# Restart dev server
npm run dev
```

## Next Steps

1. **Read the documentation**
   - `approach.md` - Architectural decisions
   - `technical-deep-dive.md` - Implementation details
   - `deployment.md` - Shipping to production

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Share preview URL**
   - Get feedback from users
   - Iterate based on real usage

4. **Add features users request**
   - Not features you think they might need
   - Ship to learn

## Getting Help

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Discord:** [vercel.com/discord](https://vercel.com/discord)

## Ship Fast

Remember:

> The best way to learn what users want is to ship something and ask them.

Don't spend weeks building features users might not need. Ship the MVP, get feedback, iterate.

**Every hour spent planning is an hour not getting user feedback.**

---

Happy shipping!
