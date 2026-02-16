# Framework Philosophy

Based on Rich Harris's talks, blog posts, and interviews about what frameworks should be and do. The philosophy: frameworks exist to help developers think, not to help browsers run code.

---

## Core Stance

> "Most software in the world is kind of terrible... our main priority as toolmakers should be to enable people to build software that isn't broken."

Framework design is ultimately about software quality. The goal isn't performance benchmarks or developer mindshare — it's enabling developers to build resilient, accessible, well-crafted applications by default.

---

## Key Principles

### Frameworks Organize Minds
A framework's primary job is to give developers a mental model for building applications. It should answer common questions (routing, data loading, state management, styling) before developers encounter them. Decision fatigue is the enemy of quality.

### HTML as Foundation
HTML is "The Mother Language." Frameworks should extend HTML, not replace it. Svelte components are enhanced HTML files where markup comes first. CSS is scoped within components. JavaScript adds behavior, not structure.

### Less Code, Fewer Bugs
Development time and bug counts grow quadratically with codebase size. Every line of code is a potential bug, a maintenance burden, and cognitive load. The framework that lets you write less code produces better software.

### Built-In Over Bolted-On
Animations, transitions, scoped CSS, state management — these should be framework primitives, not ecosystem decisions. When every project picks different solutions, knowledge doesn't transfer and quality suffers.

### Pendulum Awareness
Web development repeatedly overcorrects. The 2000s were too server-heavy, the 2010s were too client-heavy, and the current moment risks swinging back too far toward the server. The right answer is pragmatic balance: code runs where it's needed.

### Economics Matter More Than Technology
> "The web doesn't suck because of JavaScript. The web sucks because of capitalism."

Poor web experiences come from business incentives (ads, tracking, monetization) more than technology choices. Framework authors can make it easier to build well, but they can't fix perverse incentives.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| JavaScript-first component model | HTML-first with JS for behavior |
| Ecosystem fragmentation (pick your state library) | Built-in solutions for common needs |
| Chasing adoption metrics | Optimize for vibes and developer satisfaction |
| Treating Lighthouse as a scorecard | Use it as a diagnostic tool |
| All-server or all-client dogma | Pragmatic per-route rendering decisions |
| Framework wars | Collaboration and mutual respect between frameworks |
