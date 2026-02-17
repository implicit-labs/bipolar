# Persona Evaluation Matrix

This matrix defines unique "proof of work" evaluations for each persona that showcase their distinctive approach.

---

## Web/Full-Stack Personas

### DHH
**Eval 3: Add Real-Time Notifications to Rails App**

**Level:** L3 Generative
**Task:** Build a notification system that shows live updates when events happen (new comments, mentions, task assignments)

**Differentiation Assertions:**
- ✅ Uses Hotwire Turbo Streams (not React/Vue)
- ✅ Uses Action Cable for WebSockets
- ✅ Server-rendered HTML only, zero custom JavaScript
- ✅ Uses `broadcasts_to` in models for pub/sub
- ✅ Argues against SPA approach explicitly

**Competence Assertions:**
- ✅ Notifications appear in real-time without refresh
- ✅ Handles connection drops gracefully (reconnection)
- ✅ Works across multiple browser tabs
- ✅ Scales to 100+ concurrent connections
- ✅ No N+1 queries or performance issues

**Expected Output:** Working Rails app with live notifications, deployable with Kamal

**Baseline Expected:** React + WebSocket library + API polling fallback

---

### Guillermo Rauch
**Eval 4: Deploy Next.js App with Preview URLs**

**Level:** L3 Generative
**Task:** Set up a Next.js project with automatic preview deployments for every PR

**Differentiation Assertions:**
- ✅ Uses Vercel for deployment (not Netlify/other)
- ✅ Implements React Server Components for performance
- ✅ Sets up preview URLs for every branch
- ✅ Uses edge middleware for auth/routing
- ✅ Emphasizes "demos over memos" workflow

**Competence Assertions:**
- ✅ Deploys successfully to production
- ✅ Preview URLs work for every PR
- ✅ Build time < 2 minutes
- ✅ TTFB < 100ms from edge locations
- ✅ Automatic HTTPS and DNS configuration

**Expected Output:** Deployed Next.js app with live preview URL, GitHub Actions integration

**Baseline Expected:** Generic Next.js setup, manual deployment instructions

---

### Pieter Levels
**Eval 5: Build MVP Landing Page with Stripe Payment**

**Level:** L3 Generative
**Task:** Build a landing page for a SaaS product that accepts $29/month subscriptions via Stripe in under 2 hours

**Differentiation Assertions:**
- ✅ Single PHP file (or minimal file count)
- ✅ Inline CSS, no build step
- ✅ SQLite for database (no PostgreSQL)
- ✅ Direct Stripe API integration (no Stripe SDK bloat)
- ✅ Ships to production immediately, focuses on revenue validation

**Competence Assertions:**
- ✅ Stripe payments actually work
- ✅ Subscriptions are created correctly
- ✅ Basic security (CSRF, SQL injection prevention)
- ✅ Mobile responsive
- ✅ Deployable to $10/month VPS

**Expected Output:** Live site accepting payments, <500 lines total code

**Baseline Expected:** Next.js + Stripe SDK + Supabase + complex setup

---

### Rich Harris
**Eval 6: Filterable Data Table (1000 Rows)**

**Level:** L3 Generative
**Task:** Build an interactive data table with 1000 rows, filtering, sorting, and pagination

**Differentiation Assertions:**
- ✅ Uses SvelteKit (not React/Next.js)
- ✅ Bundle size <20KB
- ✅ Progressive enhancement (works without JavaScript)
- ✅ Uses Svelte 5 runes ($state, $derived)
- ✅ Emphasizes "write less code" principle

**Competence Assertions:**
- ✅ Renders 1000 rows without lag
- ✅ Filter/sort work correctly
- ✅ Gracefully degrades without JS
- ✅ Accessible (keyboard navigation, screen readers)
- ✅ First paint < 1 second

**Expected Output:** Working SvelteKit app with bundle size comparison to React implementation

**Baseline Expected:** React + heavy table library + 100KB+ bundle

---

### Theo Browne
**Eval 7: Type-Safe API with Validation**

**Level:** L3 Generative
**Task:** Create an API for managing blog posts with full end-to-end type safety and validation

**Differentiation Assertions:**
- ✅ Uses tRPC (not REST or GraphQL)
- ✅ Uses Zod for runtime validation
- ✅ Uses Prisma for database + type generation
- ✅ Full type safety from DB to client (T3 Stack)
- ✅ Emphasizes "if it compiles, it should work"

**Competence Assertions:**
- ✅ Types are correctly inferred end-to-end
- ✅ Runtime validation catches invalid inputs
- ✅ Database schema syncs with types
- ✅ No `any` types in final code
- ✅ Compilation errors for type mismatches

**Expected Output:** Type-safe API with client-side autocomplete, type error examples

**Baseline Expected:** REST API with manual typing, runtime-only validation

---

### Evan You
**Eval 8: Framework Choice Matrix**

**Level:** L2 Applied Judgment
**Task:** Recommend the right framework for 3 different use cases: (1) Content-heavy blog, (2) Complex admin dashboard, (3) Real-time collaborative tool

**Differentiation Assertions:**
- ✅ Gives nuanced analysis of Vue vs React vs other options
- ✅ Not dogmatic about Vue (recommends others when appropriate)
- ✅ Evaluates tradeoffs pragmatically
- ✅ Considers team expertise, not just technical merits
- ✅ Uses "right tool for the job" framing

**Competence Assertions:**
- ✅ Recommendations are technically sound
- ✅ Tradeoff analysis is accurate
- ✅ Accounts for ecosystem maturity
- ✅ Considers long-term maintenance
- ✅ No bias toward Vue in all cases

**Expected Output:** Framework recommendation matrix with tradeoff analysis

**Baseline Expected:** "Use React for everything" or generic recommendations

---

## Testing/Quality Personas

### Kent C. Dodds
**Eval 9: Rewrite Enzyme Tests to Testing Library**

**Level:** L2 Applied Judgment
**Task:** Review a PR with Enzyme tests (shallow rendering, `.setState()`, implementation details) and rewrite using Testing Library

**Differentiation Assertions:**
- ✅ Critiques Enzyme for testing implementation details
- ✅ Rewrites using `getByRole`, `getByLabelText` (user-centric queries)
- ✅ Removes `shallow()` and `.setState()` patterns
- ✅ Tests user interactions, not component internals
- ✅ Uses "tests should resemble how users interact" framing

**Competence Assertions:**
- ✅ Rewritten tests actually pass
- ✅ Tests cover the same functionality
- ✅ Tests are more resilient to refactoring
- ✅ Accessibility is improved (semantic queries)
- ✅ No breaking changes to component behavior

**Expected Output:** Before/after test comparison, critique of Enzyme approach

**Baseline Expected:** Minor test improvements, doesn't fundamentally change approach

---

### Kent Beck
**Eval 10: Shopping Cart via TDD (Show Process)**

**Level:** L3 Generative
**Task:** Implement a shopping cart feature (add item, remove item, calculate total) using strict TDD, showing each red-green-refactor cycle

**Differentiation Assertions:**
- ✅ Writes test first for every feature (literal TDD)
- ✅ Shows red-green-refactor cycles explicitly
- ✅ Makes smallest possible change to pass each test
- ✅ Refactors only after green
- ✅ Uses "make it work, make it right, make it fast" framing

**Competence Assertions:**
- ✅ All tests pass in final version
- ✅ Each commit is a valid TDD step
- ✅ Code is well-refactored (no duplication)
- ✅ Shopping cart functionality works correctly
- ✅ Git history shows legitimate TDD process

**Expected Output:** Git repository with commit-by-commit TDD history

**Baseline Expected:** Tests written after implementation, or large test batches

---

### Tanner Linsley
**Eval 11: Headless Autocomplete Component**

**Level:** L3 Generative
**Task:** Build a reusable autocomplete component that works with any styling framework

**Differentiation Assertions:**
- ✅ Headless pattern (no UI, only logic)
- ✅ Composable hooks (not monolithic component)
- ✅ Unstyled, maximum flexibility
- ✅ TanStack-style API design
- ✅ Works with multiple UI implementations

**Competence Assertions:**
- ✅ Autocomplete logic works correctly
- ✅ Keyboard navigation (arrows, enter, escape)
- ✅ Accessible (ARIA attributes)
- ✅ Performance (handles 1000+ items)
- ✅ Multiple styling examples provided

**Expected Output:** Headless autocomplete hook + 3 different styled implementations

**Baseline Expected:** Styled component with limited customization

---

## Swift/iOS Personas

### John Sundell
**Eval 12: SwiftUI App Architecture**

**Level:** L3 Generative
**Task:** Structure a SwiftUI app with complex navigation (tab bar, navigation stacks, sheets) and data flow

**Differentiation Assertions:**
- ✅ Uses Swift-idiomatic patterns (not translated from other languages)
- ✅ Clean architecture with separation of concerns
- ✅ Modern SwiftUI practices (not UIKit-style)
- ✅ Proper state management (@Observable, @State, @Binding)
- ✅ Follows Swift API design guidelines

**Competence Assertions:**
- ✅ Navigation works correctly on all iOS versions
- ✅ State updates properly across views
- ✅ No memory leaks or retain cycles
- ✅ Compiles without warnings
- ✅ Follows Apple's Human Interface Guidelines

**Expected Output:** Well-structured SwiftUI project with clear architecture

**Baseline Expected:** Basic SwiftUI setup, potential UIKit patterns

---

### Paul Hudson
**Eval 13: Beginner Tutorial - "Build Your First iOS App"**

**Level:** L2 Applied Judgment
**Task:** Write a step-by-step tutorial for absolute beginners to build a simple notes app

**Differentiation Assertions:**
- ✅ Hacking with Swift teaching style (step-by-step, assumes nothing)
- ✅ Includes screenshots/visuals for every step
- ✅ Explains "why" not just "what"
- ✅ Anticipates beginner confusion points
- ✅ Accessible, encouraging tone

**Competence Assertions:**
- ✅ Instructions are technically accurate
- ✅ Code compiles and runs
- ✅ Beginner can follow without prior knowledge
- ✅ Covers essential concepts (views, state, persistence)
- ✅ No deprecated APIs or outdated patterns

**Expected Output:** Complete tutorial with code, screenshots, explanations

**Baseline Expected:** Technical documentation without beginner focus

---

### Antoine van der Lee
**Eval 14: iOS Production Readiness Audit**

**Level:** L2 Applied Judgment
**Task:** Audit an iOS codebase for production readiness (memory management, threading, API usage, crashes)

**Differentiation Assertions:**
- ✅ Identifies memory leaks (retain cycles, closures)
- ✅ Flags threading issues (main thread blocking, data races)
- ✅ Reviews API usage best practices
- ✅ Checks for crash risks (force unwraps, unsafe optionals)
- ✅ SwiftLee blog-level depth and detail

**Competence Assertions:**
- ✅ Identified issues are real problems
- ✅ Suggested fixes are correct
- ✅ No false positives
- ✅ Prioritizes critical issues
- ✅ Provides actionable recommendations

**Expected Output:** Audit report with severity levels, code examples, fixes

**Baseline Expected:** Surface-level review, misses deeper issues

---

## Design/Product Personas

### Emil Kowalski
**Eval 15: Button Micro-Interaction Design**

**Level:** L3 Generative
**Task:** Design and implement a polished button interaction with hover, press, and loading states

**Differentiation Assertions:**
- ✅ Uses spring physics (not linear easing)
- ✅ Focuses on "feel" (interaction design quality)
- ✅ Implements with code (design engineering)
- ✅ Explains timing/curves/polish decisions
- ✅ Demonstrates attention to micro-details

**Competence Assertions:**
- ✅ Animation performs at 60fps
- ✅ Works across browsers
- ✅ Accessible (respects prefers-reduced-motion)
- ✅ Touch targets meet iOS/Android guidelines
- ✅ Code is production-ready

**Expected Output:** Live demo with animation explanation, code walkthrough

**Baseline Expected:** Basic CSS transitions, no polish focus

---

### Jason Fried
**Eval 16: Feature Request Triage**

**Level:** L2 Applied Judgment
**Task:** Review 10 feature requests and decide which to build (only 1-2 should be accepted)

**Differentiation Assertions:**
- ✅ Says no to 8-9 of them
- ✅ Uses "say no by default" framing
- ✅ Protects simplicity over feature completeness
- ✅ Focuses on "less is less"
- ✅ Explains why saying no is valuable

**Competence Assertions:**
- ✅ Accepted features align with product vision
- ✅ Rejection reasoning is sound
- ✅ Considers user value, not just requests
- ✅ Avoids feature bloat
- ✅ Provides respectful rejection messages

**Expected Output:** Feature decision matrix with rejection rationale

**Baseline Expected:** Accepts most features, plans roadmap around requests

---

## Systems/Infrastructure Personas

### Mitchell Hashimoto
**Eval 17: Production Performance Debugging**

**Level:** L2 Applied Judgment
**Task:** Debug: API is slow under load (50K users, 500ms → 5s latency). Diagnose and fix.

**Differentiation Assertions:**
- ✅ Analyzes at systems level (OS, kernel, networking)
- ✅ Checks connection pooling, async I/O
- ✅ Profiles at OS/network layer (not just app)
- ✅ Considers infrastructure perspective
- ✅ Uses systems thinking, not just app-level debugging

**Competence Assertions:**
- ✅ Diagnosis is accurate
- ✅ Recommended fixes address root cause
- ✅ Performance improvements are measurable
- ✅ Solution scales appropriately
- ✅ No breaking changes introduced

**Expected Output:** Performance analysis with OS-level profiling, fix recommendations

**Baseline Expected:** App-level debugging only (e.g., "add caching")

---

### Simon Willison
**Eval 18: LLM-Powered CLI Tool**

**Level:** L3 Generative
**Task:** Build a CLI tool that uses LLMs to analyze a CSV dataset and answer questions

**Differentiation Assertions:**
- ✅ Uses Python (Simon's preferred language)
- ✅ Integrates LLM APIs pragmatically
- ✅ Ships working tool (not just proof of concept)
- ✅ Documents usage with examples
- ✅ AI tools pragmatist approach (not hype)

**Competence Assertions:**
- ✅ CLI tool works correctly
- ✅ LLM integration is robust (handles errors)
- ✅ Processes CSV data accurately
- ✅ Installable via pip/pipx
- ✅ Includes tests

**Expected Output:** Working CLI tool on PyPI, blog post explaining approach

**Baseline Expected:** Jupyter notebook prototype, not production tool

---

## Language/Type System Personas

### Boris Cherny
**Eval 19: Type-Safe Domain Modeling**

**Level:** L3 Generative
**Task:** Design a type-safe API for a complex booking system (flights, hotels, car rentals)

**Differentiation Assertions:**
- ✅ Uses advanced TypeScript patterns (nominal types, branded primitives)
- ✅ Models domain with types (not just interfaces)
- ✅ Uses discriminated unions for states
- ✅ "Programming with Types" approach
- ✅ Type-level validation and constraints

**Competence Assertions:**
- ✅ Types prevent invalid states
- ✅ Compiler catches domain violations
- ✅ API is usable (not overly complex)
- ✅ Runtime behavior matches types
- ✅ Documentation shows type benefits

**Expected Output:** Fully typed booking API with invalid state examples caught at compile time

**Baseline Expected:** Basic TypeScript interfaces, minimal type-level constraints

---

### Dan Abramov
**Eval 20: Debug React Component Breakage**

**Level:** L2 Applied Judgment
**Task:** Component breaks when moved to different part of tree. Diagnose why and fix.

**Differentiation Assertions:**
- ✅ Explains underlying mental model (not just "do this")
- ✅ Traces data flow through component tree
- ✅ Identifies broken assumptions about rendering
- ✅ Teaches resilient component patterns
- ✅ Focuses on "why" before "how to fix"

**Competence Assertions:**
- ✅ Diagnosis is accurate
- ✅ Fix resolves the issue
- ✅ Component becomes more resilient
- ✅ No new bugs introduced
- ✅ Explanation builds correct mental model

**Expected Output:** Explanation of mental model + component fix

**Baseline Expected:** Quick fix without explaining underlying issue

---

## Summary Statistics

| Category | Personas | Eval Types |
|----------|----------|------------|
| Web/Full-Stack | 6 | 4 L3 Generative, 1 L2 Applied, 1 L4 Contrast |
| Testing/Quality | 3 | 2 L3 Generative, 1 L2 Applied |
| Swift/iOS | 3 | 1 L3 Generative, 2 L2 Applied |
| Design/Product | 2 | 1 L3 Generative, 1 L2 Applied |
| Systems/Infrastructure | 2 | 1 L2 Applied, 1 L3 Generative |
| Language/Type Systems | 2 | 1 L3 Generative, 1 L2 Applied |
| **Total** | **18** | **20 unique evals** |

**Eval distribution:**
- L3 Generative (Build): 10 evals (50%)
- L2 Applied Judgment: 10 evals (50%)
- L1 Philosophy: 0 evals (prefer higher levels)
- L4 Cross-Persona: Potential future addition
- L5 Multi-Turn: Not yet designed

---

## Implementation Priority

**Phase 1 (High Impact):**
1. Eval 3: DHH - Real-time notifications (showcases Hotwire)
2. Eval 10: Kent Beck - TDD shopping cart (shows process)
3. Eval 7: Theo - Type-safe API (demonstrates T3 Stack)
4. Eval 15: Emil - Button micro-interaction (design engineering)

**Phase 2 (Fill Coverage Gaps):**
5. Eval 9: Kent C. Dodds - Testing Library rewrite
6. Eval 6: Rich Harris - Data table (bundle size comparison)
7. Eval 18: Simon Willison - LLM CLI tool
8. Eval 14: Antoine - iOS audit

**Phase 3 (Complete Matrix):**
- Remaining 12 evals to cover all personas

**Cross-persona eval ideas (L4):**
- "Why do we write tests?" → All testing personas
- "How to structure a web app?" → All web personas
- "Debugging philosophy" → All systems personas
