# DHH's Approach: Rails + Hotwire Task List

## Executive Summary

This is a task list app built the way software should be built: simple, maintainable, and production-ready from day one. No JavaScript frameworks, no build pipelines, no microservices nonsense. Just Rails 8 with Hotwire doing what it does best - delivering a fast, interactive user experience with server-rendered HTML.

## The Stack

- **Rails 8.0**: The latest and greatest. Convention over configuration.
- **SQLite**: Don't @ me. SQLite is production-ready. It powers most of the world's databases. It's faster than PostgreSQL for read-heavy workloads and simpler to deploy.
- **Hotwire (Turbo + Stimulus)**: 95% of SPA interactivity at 5% of the complexity.
- **Propshaft**: Asset pipeline that actually respects #NOBUILD philosophy.
- **Kamal**: Deploy anywhere with Docker. No platform lock-in.

## Why This Approach is Superior

### 1. No Build Step Complexity

Look at what we DON'T need:
- No webpack/vite/rollup configuration
- No node_modules directory with 300MB of dependencies
- No package.json with 50 devDependencies
- No babel, no typescript compiler, no build step that breaks randomly
- No "works on my machine" build issues

The entire JavaScript for this application fits in a few kilobytes and is loaded via importmap. It's just imports - native browser functionality. This is the #NOBUILD philosophy in action.

### 2. Hotwire > React for This Use Case

Here's what Turbo gives us out of the box:
```ruby
broadcasts_to ->(task) { :tasks }, inserts_by: :prepend
```

That one line in the Task model provides real-time updates to all connected clients. When you create a task, every browser viewing the page sees it immediately. No Redux, no state management libraries, no WebSocket boilerplate. The server is the source of truth.

Compare this to a React implementation:
- Set up WebSocket connection
- Handle connection state (connecting, connected, disconnected, reconnecting)
- Manage client-side state with Redux/Zustand/whatever-is-cool-this-week
- Write actions, reducers, selectors
- Handle optimistic updates
- Sync state when things go wrong
- Debug state divergence between client and server

With Turbo Streams, the HTML comes down the wire and replaces what's on the page. That's it. The server owns the state. The browser just displays what it's told.

### 3. Server-Side Rendering Wins

Every page load is fully rendered HTML. No spinners, no "loading..." states, no flash of unstyled content while JavaScript boots up. Users with JavaScript disabled? They get a fully functional application (minus real-time updates). Screen readers? They work perfectly because we're using actual HTML elements, not `<div role="button">` nonsense.

SEO? Not relevant for a task list, but if this were a content site, we'd rank #1 because search engines actually get HTML instead of `<div id="root"></div>`.

### 4. SQLite is Production Ready

Stop reaching for PostgreSQL by default. SQLite is:
- **Fast**: No network roundtrip. It's a file. Reads are faster than Postgres.
- **Simple**: No server to configure, no connection pools to tune, no vacuum to schedule.
- **Reliable**: Most deployed database in the world. Tested by aerospace, not startups.
- **Portable**: Copy the file. That's your backup.

For a task list, even with 100,000 tasks, SQLite will outperform Postgres. And when you eventually need Postgres (you probably won't), Rails makes it a config change.

### 5. The Majestic Monolith

One repository. One deployment. One database. No:
- Service mesh complexity
- Distributed tracing to debug a button click
- Network calls between "microservices" that should be function calls
- Eventual consistency between services
- Kubernetes YAML sprawl

This app scales vertically first. And vertical scaling is cheaper and simpler than you think. A modern server with 64 cores and 256GB RAM costs less than the DevOps engineer you'll need to hire to manage your Kubernetes cluster.

## How It Works

### Creating a Task

1. User types in the form and hits "Add Task"
2. Turbo intercepts the form submission, sends it via AJAX
3. Controller creates the task
4. `broadcasts_to` automatically sends a Turbo Stream to all connected clients
5. The Turbo Stream prepends the new task HTML to everyone's list
6. Form input clears via the `create.turbo_stream.erb` template

Zero JavaScript written. Zero state management. The server did all the work.

### Completing a Task

1. User clicks the checkbox
2. Turbo intercepts the button click, sends PATCH request
3. Controller toggles the task's `completed` status
4. `broadcasts_to` sends updated task HTML to all clients
5. The Turbo Frame replaces just that task's HTML

Again, no JavaScript. The checkbox isn't connected to some useState hook. It's a form submission that Turbo makes fancy.

### Deleting a Task

Same pattern. Button click → form submission → Turbo intercepts → server updates → broadcast → DOM updates.

See the pattern? Every interaction is a form submission. Forms have been around since HTML 2.0 in 1995. They work everywhere. Turbo makes them fast and fancy without losing their reliability.

## Production Readiness

### Performance

- **First page load**: Fully rendered HTML, no JavaScript execution required
- **Subsequent navigations**: Turbo Drive makes them feel instant
- **Real-time updates**: WebSocket connection for Turbo Streams, minimal bandwidth
- **Database**: SQLite reads are microseconds, writes are milliseconds
- **Asset serving**: Propshaft with CDN caching. Static files are forever cached.

### Deployment

The included Dockerfile and Kamal config mean you can deploy this to:
- Any VPS (Hetzner, DigitalOcean, etc.)
- Your own hardware
- AWS/GCP/Azure (if you like spending money)

No platform lock-in. No serverless cold starts. No "functions" that should be methods.

```bash
kamal setup
kamal deploy
```

That's it. You're in production.

### Monitoring

Rails has built-in:
- Logging (to stdout, Docker-friendly)
- Error tracking hooks (connect to Sentry/Honeybadger/whatever)
- Performance monitoring (Skylight, New Relic, etc.)
- Health check endpoints

You don't need a service mesh to get observability.

### Scaling

1. **Vertical first**: Upgrade your server. It's cheaper than you think.
2. **Read replicas**: When reads become a bottleneck (they won't for a task list)
3. **Horizontal**: Multiple app servers behind a load balancer, shared database

You'll hit 10,000 concurrent users before you need step 2.

## What We DIDN'T Need

Let me be crystal clear about what's missing from this implementation and why that's a feature, not a bug:

### No React/Vue/Angular
Why would you ship a 50KB JavaScript framework to render a list of strings? Turbo Frames give you surgical DOM updates. Turbo Streams give you real-time updates. You get 95% of the interactivity at 5% of the complexity.

### No TypeScript
Ruby has better type checking than TypeScript will ever have. Sorbet exists if you really want types. But honestly, tests are better documentation than type annotations.

### No GraphQL
REST works fine. Actually, REST works great. You know what your endpoints do. You don't need a query language to fetch a list of tasks.

### No State Management Library
The database is your state. The server is your source of truth. The browser is a dumb terminal that displays what the server tells it. This is how the web was designed to work.

### No Build Pipeline
I cannot stress this enough: npm install is not a prerequisite for building web applications. JavaScript imports work natively in browsers. CSS doesn't need preprocessing.

### No Microservices
You have one domain model: Tasks. It has one table. You don't need service boundaries. You need a method.

## Testing

The test suite uses Rails' built-in testing framework (Minitest). It's fast, it's simple, it's built-in. No need for Jest, no need for React Testing Library, no need to mock fetch calls.

```bash
rails test
```

Tests run in parallel. They're fast because there's no JavaScript to boot up, no browser to launch (for these tests).

## The Philosophy

This is how you build software that lasts:

1. **Boring technology**: Rails has been around for 20 years. SQLite for 24 years. HTML forms since 1995.
2. **Convention over configuration**: The file structure tells you where everything lives.
3. **Server-side rendering**: The default. Client-side enhancement is the exception.
4. **The Majestic Monolith**: One app, one database, one deployment.
5. **Vertical scaling first**: Servers are cheap. Complexity is expensive.
6. **No build step**: JavaScript imports work in browsers. Use them.

## When This Approach Doesn't Work

I'll be honest about the limitations:

- **Offline-first apps**: If you need your app to work fully offline, you need client-side state. But be honest - how many apps truly need that?
- **Real-time collaboration**: Google Docs-style concurrent editing needs operational transforms. That's client-side. But a task list? Turbo Streams handle it.
- **Mobile apps**: If you're building native iOS/Android, use native tools. But for mobile web, this works great.
- **Gaming**: If you're building a game, use a game engine.

For everything else - and by everything, I mean 90% of web applications - this stack is superior.

## Conclusion

This task list is production-ready. It handles the requirements:
- ✅ Add new tasks
- ✅ Mark tasks as complete
- ✅ Delete tasks
- ✅ Production-ready (deployment, tests, error handling)

It also delivers what wasn't asked for but should be expected:
- Real-time updates across all connected clients
- No JavaScript framework dependencies
- No build step complexity
- Simple deployment
- Fast initial page loads
- Accessible by default
- SEO-friendly (if that mattered)
- Works without JavaScript enabled (minus real-time)

The code is simple. The deployment is simple. The maintenance will be simple. This is how software should be built.

Now go build something with Rails.

---

*"I'd rather retire than work in a SPA microservices architecture." - DHH (probably)*
