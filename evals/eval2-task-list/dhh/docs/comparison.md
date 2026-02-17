# React vs Rails+Hotwire: A Fair Comparison

## Lines of Code

### React Implementation (typical)
```
package.json         ~50 lines (dependencies)
webpack.config.js    ~100 lines
src/
  components/
    TaskList.jsx     ~80 lines
    TaskItem.jsx     ~60 lines
    TaskForm.jsx     ~50 lines
  store/
    taskSlice.js     ~80 lines
    store.js         ~20 lines
  api/
    tasks.js         ~40 lines
  App.jsx            ~30 lines
  index.jsx          ~20 lines
  styles.css         ~150 lines

Total: ~680 lines (excluding node_modules: 300MB+)
```

### Rails + Hotwire Implementation (this one)
```
Gemfile              ~20 lines
app/
  models/task.rb     ~15 lines
  controllers/
    tasks_controller.rb  ~40 lines
  views/
    layouts/application.html.erb    ~15 lines
    tasks/index.html.erb            ~30 lines
    tasks/_task.html.erb            ~25 lines
    tasks/create.turbo_stream.erb   ~15 lines
  assets/
    stylesheets/application.css     ~150 lines
config/
  routes.rb          ~7 lines
db/
  migrate/create_tasks.rb  ~15 lines

Total: ~332 lines (excluding gems: ~50MB)
```

**Result: 50% less code. 83% smaller dependencies.**

## Complexity Comparison

### React Version Needs
1. State management (Redux/Zustand/Context)
2. API client configuration (axios/fetch wrappers)
3. Build configuration (webpack/vite)
4. Routing (react-router if multi-page)
5. Form handling (react-hook-form or manual)
6. Optimistic updates (manual)
7. Real-time updates (socket.io + integration)
8. Error boundaries
9. Loading states everywhere
10. Test utilities (React Testing Library + Jest)

### Rails Version Needs
1. Rails (convention-based routing, forms, validation)
2. Turbo (real-time + SPA-like navigation)
3. That's it

## Performance Comparison

### First Load
- **React**: HTML shell → JS bundle download → Parse JS → Boot React → Render → API call → Re-render
  - Time to interactive: ~2-4 seconds
  - Bundle size: 200KB+ (minified + gzipped)
- **Rails**: Fully rendered HTML arrives
  - Time to interactive: ~300ms
  - Page size: 10-20KB

### Subsequent Navigation
- **React**: Client-side routing → State update → Re-render
  - Time: ~100ms
- **Rails (Turbo)**: Intercept link → Fetch HTML → Replace body
  - Time: ~150ms (network dependent)

**Difference**: React is slightly faster on subsequent navigations IF the data is already cached. But Rails never shows a loading spinner on first load.

### Real-time Updates
- **React**: WebSocket connection → Parse message → Update Redux store → Component re-renders → Reconciliation → DOM update
  - Steps: 6
  - Code: ~100 lines
- **Rails (Turbo Streams)**: WebSocket connection → Insert HTML
  - Steps: 2
  - Code: ~1 line (`broadcasts_to`)

## Developer Experience

### Adding a New Feature

**React**: "Add a checkbox to filter completed tasks"
1. Update Redux slice (actions + reducer)
2. Add selector for filtered tasks
3. Update component to use selector
4. Add UI for checkbox
5. Write tests for reducer
6. Write tests for component
7. Update types (if TypeScript)

Time: ~2 hours

**Rails**: "Add a checkbox to filter completed tasks"
1. Add checkbox to view with Turbo Frame
2. Update controller to filter by params
3. Write test

Time: ~20 minutes

### Debugging

**React**:
- Check React DevTools
- Check Redux DevTools
- Check Network tab
- Add console.logs in component
- Add console.logs in Redux middleware
- Check for state divergence
- "Why is this component re-rendering?"
- "Why isn't this component re-rendering?"

**Rails**:
- Check server logs
- Check browser Network tab
- "Oh, the SQL query is N+1ing"
- Fix it in one place

## Deployment

### React (typical SPA)
```bash
# Build process
npm run build
# Output: build/ directory with hashed files

# Deploy to S3/Netlify/Vercel
aws s3 sync build/ s3://bucket

# Need separate API server
# Deploy to Heroku/AWS/whatever
git push heroku main

# CORS configuration
# Environment variables for API URLs
# Different URLs for dev/staging/prod
```

### Rails
```bash
kamal deploy
```

One command. App + database + assets. Done.

## Scaling

### React SPA
- Frontend: CDN (easy, cheap)
- Backend API: Load balancer + multiple servers + database
- State sync: Hope your Redux implementation is correct
- Caching: Complex because you have client + server state

### Rails Monolith
- App servers: Load balancer + multiple servers + shared database
- Caching: Fragment caching, HTTP caching (simple, proven)
- State: One source of truth (the database)

Both scale horizontally the same on the backend. The difference is React REQUIRES it sooner because you've already split your app in two.

## Cost of Change

### React
- Major version updates break everything (React 16→17→18 all had breaking changes)
- webpack → vite migration
- Redux → Zustand migration "because Redux is too much boilerplate"
- Class components → Hooks migration
- JavaScript fatigue is real

### Rails
- Major version updates have clear upgrade paths
- Rails 4 apps still run on Rails 7 with minimal changes
- Convention over configuration means less code to update
- Boring technology = fewer surprises

## What React Is Actually Good For

I'm not saying React is always wrong. It excels at:

1. **Highly interactive UIs**: Rich text editors, design tools, games
2. **Offline-first apps**: PWAs that truly work offline
3. **Cross-platform needs**: React Native for mobile
4. **Teams already deep in the ecosystem**: Migration cost might be too high

But a task list? A blog? A CMS? An admin panel? A checkout flow? Rails + Hotwire wins.

## The Real Question

"Could you build this task list with React?"

Yes. Absolutely. And it would work fine.

"Should you?"

No. You'd write twice as much code, manage twice as much complexity, and deliver a slower first-page load for the same user experience.

## Conclusion

| Metric | React | Rails + Hotwire | Winner |
|--------|-------|-----------------|--------|
| Lines of Code | ~680 | ~332 | Rails |
| Dependency Size | 300MB+ | ~50MB | Rails |
| First Load Speed | ~2-4s | ~300ms | Rails |
| Subsequent Navigation | ~100ms | ~150ms | React (barely) |
| Real-time Setup | ~100 lines | ~1 line | Rails |
| Deployment Steps | Multiple | One | Rails |
| Learning Curve | Steep | Gentle | Rails |
| Long-term Maintenance | Complex | Simple | Rails |
| Offline Support | Yes | No | React |
| SEO | Complex | Native | Rails |

Rails wins 9 out of 10. And the one React wins (offline support) isn't needed for 90% of applications.

Choose boring technology. Choose simplicity. Choose Rails.
