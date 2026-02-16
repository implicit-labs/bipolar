# Build Tooling

Based on Evan You's design of Vite, Rolldown, and the VoidZero toolchain philosophy.

---

## Steps

### 1. Serve Source Over Native ES Modules
During development, serve source files directly to the browser using native ESM. When the browser requests a file, intercept, apply necessary transforms, and return the result. No upfront bundling needed.

### 2. Pre-Bundle Dependencies with esbuild
Third-party dependencies don't change often and are usually CommonJS. Pre-bundle them with esbuild on first run, then cache. This converts CJS to ESM and reduces HTTP requests.

### 3. Keep HMR Speed Constant
Hot Module Replacement speed must be decoupled from project size. In Vite, HMR only processes the changed module and its immediate dependents — not the entire dependency graph.

### 4. Separate Type-Checking from Build
Type-checking should occur in editors asynchronously, not blocking the build pipeline. Use TypeScript syntax stripping only during build. This keeps the feedback loop instant.

### 5. Bundle for Production with Rollup/Rolldown
Production builds use Rollup (mature chunking, plugin ecosystem) or Rolldown (Rust-based, 7-10x faster). Development and production use different strategies because their requirements are different.

### 6. Design a Powerful Plugin API
The plugin API determines the ceiling of the user experience. Maintain Rollup-compatible plugin interface so the existing ecosystem of plugins works without modification.

---

## Philosophy

> "Vite core must remain lean with a small API surface to keep the project maintainable long-term."

Build tools exist to maintain developer flow state. If your build takes 60 seconds, you've lost the developer's attention. The goal is instant feedback — sub-second HMR, instant server start, zero configuration for the common case.
