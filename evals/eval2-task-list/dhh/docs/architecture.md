# Architecture Diagram

## Request Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ HTTP Request (GET /)
       ▼
┌─────────────────────────────────────┐
│         Rails Router                │
│    (config/routes.rb)               │
│    GET / → TasksController#index    │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│     TasksController                 │
│  - Loads all tasks from database    │
│  - Renders index.html.erb           │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│    app/views/tasks/index.html.erb   │
│  - Renders task form                │
│  - Renders task list                │
│  - Sets up Turbo Stream connection  │
└──────┬──────────────────────────────┘
       │
       │ Fully rendered HTML
       ▼
┌─────────────┐
│   Browser   │
│  - Displays │
│  - Connects │
│    WebSocket│
└─────────────┘
```

## Creating a Task

```
┌─────────────┐
│   Browser   │  User types + submits form
└──────┬──────┘
       │
       │ Turbo intercepts form submit
       │ POST /tasks (via AJAX)
       ▼
┌─────────────────────────────────────┐
│     TasksController#create          │
│  - Validates params                 │
│  - Creates Task.new(title: "...")   │
│  - task.save                        │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│      Task Model                     │
│  - validates :title, presence: true │
│  - broadcasts_to :tasks  ◄───────┐  │
└──────┬──────────────────────────  │  ┘
       │                            │
       │ Save to SQLite             │ Broadcast via Turbo Stream
       ▼                            │
┌─────────────────────────────────────┐
│     SQLite Database                 │
│  INSERT INTO tasks (title, ...)     │
└─────────────────────────────────────┘
                                     │
       ┌─────────────────────────────┘
       │
       │ Turbo Stream broadcasts to ALL connected clients
       ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Browser 1  │  │  Browser 2  │  │  Browser 3  │
│  (created)  │  │  (watching) │  │  (watching) │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       │ HTML fragment  │ HTML fragment  │ HTML fragment
       │ <turbo-stream> │ <turbo-stream> │ <turbo-stream>
       ▼                ▼                ▼
   Prepends new     Prepends new     Prepends new
   task to list     task to list     task to list
```

## The Magic: broadcasts_to

In `app/models/task.rb`:
```ruby
class Task < ApplicationRecord
  broadcasts_to ->(task) { :tasks }, inserts_by: :prepend
end
```

This one line:
1. Sets up after_create callback
2. Renders the task partial
3. Wraps it in a Turbo Stream
4. Broadcasts to the `:tasks` stream
5. All browsers subscribed to `:tasks` receive it
6. Turbo automatically updates their DOM

No JavaScript written. No state management. No WebSocket handling code.

## Data Flow Comparison

### React Way
```
Browser (useState)
   ↕ (setState)
Redux Store
   ↕ (dispatch/select)
API Client
   ↕ (fetch/axios)
Express Server
   ↕ (SQL query)
PostgreSQL
```

**State exists in**: Browser state + Redux + Database
**Syncing**: Manual (optimistic updates, error handling, retry logic)
**Lines of code**: ~200+ for state management alone

### Rails + Turbo Way
```
Browser (displays HTML)
   ↕ (HTTP/WebSocket)
Rails Controller
   ↕ (Active Record)
SQLite
```

**State exists in**: Database only
**Syncing**: Automatic (server renders, browser displays)
**Lines of code**: ~1 line (`broadcasts_to`)

## File Structure & Responsibility

```
app/
├── models/
│   └── task.rb                    ← Business logic + validations + broadcasting
├── controllers/
│   └── tasks_controller.rb        ← HTTP request handling + params
├── views/
│   ├── layouts/
│   │   └── application.html.erb   ← HTML wrapper, loads Turbo
│   └── tasks/
│       ├── index.html.erb         ← Main page, lists all tasks
│       ├── _task.html.erb         ← Single task component
│       └── create.turbo_stream.erb ← Response for AJAX create
└── assets/
    └── stylesheets/
        └── application.css         ← All styling (no preprocessor)
```

**Responsibilities**:
- **Model**: Domain logic, validations, database schema, broadcasting
- **Controller**: HTTP request/response, parameter validation, rendering
- **View**: HTML templates, forms, Turbo Frames/Streams
- **Assets**: CSS styling, static files

**NOT present**:
- No state management files
- No API client configuration
- No Redux store/slices/actions
- No React components
- No build configuration

## Turbo Frames vs Turbo Streams

### Turbo Frames (Lazy Loading)
```html
<turbo-frame id="tasks">
  <!-- Content here can be replaced independently -->
</turbo-frame>
```

When a link inside the frame is clicked, only the frame content updates.

### Turbo Streams (Real-Time Updates)
```erb
<%= turbo_stream_from :tasks %>
```

Subscribes to WebSocket. When Task model broadcasts:
```html
<turbo-stream action="prepend" target="tasks">
  <template>
    <!-- New task HTML here -->
  </template>
</turbo-stream>
```

Server sends this. Browser's Turbo receives it. DOM updates automatically.

## Deployment Architecture

### Development
```
┌────────────────┐
│  Your Machine  │
│  - Rails server│
│  - SQLite DB   │
│  - Port 3000   │
└────────────────┘
```

### Production (Kamal)
```
┌─────────────────────────────────────┐
│       Production Server (VPS)       │
│                                     │
│  ┌──────────────────────────────┐  │
│  │        Traefik (Proxy)       │  │
│  │  - SSL/TLS termination       │  │
│  │  - HTTP/2                    │  │
│  │  - Port 80/443               │  │
│  └───────────┬──────────────────┘  │
│              │                      │
│  ┌───────────▼──────────────────┐  │
│  │    Docker Container          │  │
│  │  - Rails app                 │  │
│  │  - Puma web server           │  │
│  │  - SQLite database (volume)  │  │
│  │  - All assets                │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  /var/lib/sqlite/            │  │
│  │  - production.sqlite3        │  │
│  │  - Persistent volume         │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

**One container** has:
- The Rails application
- The database (mounted volume)
- All assets
- The web server

**One command** deploys it:
```bash
kamal deploy
```

## Scaling Strategy

### Phase 1: Single Server (you are here)
```
[VPS] → Rails + SQLite
```
Handles: 1000s of concurrent users

### Phase 2: Multiple App Servers
```
[Load Balancer]
    ├─→ [App Server 1] ─┐
    ├─→ [App Server 2] ─┼→ [Shared SQLite via NFS]
    └─→ [App Server 3] ─┘
```
Handles: 10,000s of concurrent users

### Phase 3: Read Replicas (if needed)
```
[Load Balancer]
    ├─→ [App Server 1] → [SQLite Primary]
    ├─→ [App Server 2] → [SQLite Replica 1]
    └─→ [App Server 3] → [SQLite Replica 2]
```
Handles: 100,000s of concurrent users

### Phase 4: PostgreSQL (probably never)
```
[Load Balancer]
    ├─→ [App Server 1] ─┐
    ├─→ [App Server 2] ─┼→ [PostgreSQL Primary]
    └─→ [App Server 3] ─┘      │
                                ├→ [Replica 1]
                                └→ [Replica 2]
```

**Reality**: This task list will never hit Phase 2. Even Basecamp ran on a single database for years.

## Performance Characteristics

| Operation | Latency | Notes |
|-----------|---------|-------|
| SQLite Read | <1ms | No network, direct file I/O |
| SQLite Write | ~5ms | WAL mode, fsync |
| Rails Render | ~50ms | Server-side template rendering |
| Turbo Navigation | ~150ms | Fetch + replace body (feels instant) |
| First Page Load | ~300ms | Fully rendered HTML |
| Turbo Stream Update | ~50ms | WebSocket latency + DOM update |

Compare to React SPA:
| Operation | Latency |
|-----------|---------|
| First Load | 2-4 seconds (download + parse + boot JS) |
| Navigation | ~100ms (already have JS loaded) |
| Real-time Update | ~200ms (WebSocket + Redux + React render) |

**Result**: Rails is 10x faster on first load, slightly slower on subsequent navigations (but still <200ms).

## Conclusion

The architecture is simple because it's not fighting the web platform:

- **HTTP** for request/response (as designed in 1991)
- **HTML** for content structure (as designed in 1993)
- **CSS** for presentation (as designed in 1996)
- **Forms** for user input (as designed in 1995)
- **WebSocket** for real-time (standardized in 2011)

Rails + Turbo respects these primitives. React replaces them with a JavaScript layer. For most apps, that's unnecessary complexity.

**Choose boring technology. Ship fast. Maintain easily.**
