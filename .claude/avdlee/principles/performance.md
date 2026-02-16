# Performance Principles

Based on Antoine van der Lee's approach to performance optimization — build times, app launch, runtime performance, and CI efficiency.

---

## Core Philosophy

> "Build time is the most impactful metric for developer productivity. Faster builds mean faster iteration, faster tests, faster shipping."

Performance optimization starts with **measurement**, not guessing. Use Instruments first, intuition second.

---

## Build Performance

### SwiftLint on Changed Files Only
Filter unchanged files when running SwiftLint in build phases. Saves ~15 seconds per build across all targets:

```bash
# Only lint files modified since last commit
if [ "${CONFIGURATION}" = "Debug" ]; then
  git diff --name-only HEAD | grep '\.swift$' | while read filename; do
    swiftlint lint --path "$filename" --quiet
  done
fi
```

### Modular Architecture for Build Speed
SPM packages enable incremental compilation. When you change one file, only its package rebuilds:

- **Monolith**: Change one file → rebuild everything (~3-5 min)
- **Modular**: Change one file → rebuild one package (~15-30 sec)

### Build Settings
- Use **Debug** builds for development (no optimization, fast compile)
- Reserve **Release** optimization for TestFlight and App Store builds
- Enable **Whole Module Optimization** only in Release configuration

### Xcode Tips
- `Cmd+B` to build, not `Cmd+R` — skip launching when you just want to check compilation
- `Ctrl+Cmd+R` — Run without building (when you've already built)
- `Ctrl+Opt+Cmd+G` — Rerun last test (fastest iteration loop)

---

## App Launch Time

### Measurement
Use Xcode Instruments' **App Launch Time** template:
1. Profile with Instruments (Product → Profile)
2. Select App Launch Time template
3. Analyze the trace for:
   - Time before `main()`
   - Time in `application(_:didFinishLaunchingWithOptions:)`
   - Time to first meaningful frame

### Optimization Targets
| Phase | Target | Strategy |
|-------|--------|----------|
| Pre-main | < 200ms | Reduce dynamic libraries, lazy load frameworks |
| App delegate | < 100ms | Defer non-essential initialization |
| First frame | < 400ms | Show placeholder UI immediately, load data async |
| Total cold launch | < 1 second | Prioritize perceived performance |

### Common Launch Time Killers
- **Synchronous network calls** on app start — defer or make async
- **Heavy Core Data migrations** — use lightweight or deferred migration
- **Loading large assets** — lazy load, use thumbnails
- **Too many dynamic frameworks** — consolidate or use static linking
- **Expensive `init()` in global objects** — make lazy

---

## Runtime Performance

### Instruments First
Always start with Xcode Instruments rather than third-party tools:

| Issue | Instrument |
|-------|-----------|
| Slow UI / dropped frames | Time Profiler |
| Memory leaks | Leaks |
| High memory usage | Allocations |
| Excessive disk I/O | File Activity |
| Network inefficiency | Network |
| Energy drain | Energy Log |
| Core Data performance | Core Data |

### Common Performance Patterns

#### Avoid Main Thread Blocking
```swift
// Bad — blocks UI
let data = try Data(contentsOf: largeFileURL)

// Good — off main thread
let data = try await Task.detached {
    try Data(contentsOf: largeFileURL)
}.value
```

#### Lazy Loading
```swift
// Bad — loads everything at init
class ImageManager {
    let cache = NSCache<NSString, UIImage>() // Always allocated
    let processor = ImageProcessor() // Expensive init
}

// Good — loads on demand
class ImageManager {
    lazy var cache = NSCache<NSString, UIImage>()
    lazy var processor = ImageProcessor()
}
```

#### Efficient Collection Operations
```swift
// Bad — iterates twice
let names = users.filter { $0.isActive }.map { $0.name }

// Good — single pass with compactMap
let names = users.compactMap { $0.isActive ? $0.name : nil }

// Good for large collections — lazy evaluation
let names = users.lazy.filter { $0.isActive }.map { $0.name }
```

---

## CI Performance

### Selective Testing
Only test packages affected by changes (see `principles/testing.md`):
- **Before**: ~60 minutes for full test suite
- **After**: ~5 minutes for affected packages only

### Parallel Test Execution
Swift Testing runs tests in parallel by default. Ensure tests are:
- Independent (no shared mutable state)
- Not order-dependent
- Using in-memory stores (fast setup/teardown)

### Caching in CI
- Cache derived data between CI runs
- Cache SPM package resolution
- Use selective checkout (sparse checkout) for monorepos

---

## Performance Checklist

Before release, verify:

- [ ] App launch time < 1 second (cold start)
- [ ] No main thread blocking during common operations
- [ ] No memory leaks in navigation flows (push/pop)
- [ ] Scrolling maintains 60fps in lists
- [ ] Background tasks properly suspended/cancelled
- [ ] Network requests have appropriate timeouts
- [ ] Images are appropriately sized (not loading 4K for thumbnails)
- [ ] Core Data fetches use appropriate batch sizes and predicates
- [ ] No retain cycles in closures (especially in async contexts)

---

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Premature optimization | Measure first with Instruments |
| Optimizing cold paths | Focus on hot paths users actually hit |
| Synchronous everything | Use async/await for I/O operations |
| Loading all data upfront | Paginate, lazy load, use cursors |
| Ignoring build times | Modularize, use selective testing |
| "It's fast on my machine" | Profile on oldest supported device |
