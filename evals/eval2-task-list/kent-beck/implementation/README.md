# Task List - Built with TDD

A production-ready task list application built using Test-Driven Development.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Persistent storage (localStorage)
- Clean, simple interface

## Running the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Open in browser:
   ```bash
   open index.html
   ```

Or use a local server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Architecture

- `task-list.js` - Core business logic (TaskList class)
- `ui-controller.js` - DOM rendering logic
- `app.js` - Application glue and event handling
- `*.test.js` - Test files (using Node.js test runner)

## Tests

All business logic is thoroughly tested:
- Task creation
- Task retrieval
- Completion/incompletion
- Deletion
- Unique IDs
- DOM rendering

Run with:
```bash
npm test
```

## TDD Process

This application was built using strict Test-Driven Development:
1. Write a failing test (RED)
2. Write minimal code to pass (GREEN)
3. Refactor while keeping tests green (REFACTOR)

See git history for the complete TDD cycle progression.
