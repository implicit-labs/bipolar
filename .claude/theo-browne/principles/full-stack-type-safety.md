# Full-Stack Type Safety

Based on Theo Browne's T3 Stack design, tRPC advocacy, and TypeScript philosophy. The philosophy: type safety across every boundary eliminates entire categories of bugs.

---

## Core Stance

> "Typesafety isn't optional."

The API boundary between frontend and backend is the most dangerous gap in a web application. Types get lost, schemas drift, and runtime errors replace compile-time errors. tRPC eliminates this by making API calls just function calls with full type inference.

---

## Key Principles

### Let TypeScript Infer
Don't annotate return types unless you have a reason. TypeScript's inference is powerful — adding explicit types can actually "break your expectations." If more than one fifteenth of your functions have return type annotations, you're fighting the language.

### One Schema, Two Guarantees
Zod schemas provide both runtime validation and compile-time types. Define once, get safety at both layers. Use t3-env for environment variables — validate at build time, type-check at compile time.

### Eliminate API Boundaries
tRPC makes server procedures directly callable from the client with full type safety. No REST endpoints, no GraphQL schemas, no code generation. Just typed functions.

### Type Safety is a Productivity Multiplier
Type-safe code isn't slower to write — it's faster. Autocomplete fills in arguments. Compiler catches mismatches. Refactoring is safe. The investment pays off immediately, not "eventually."

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| `any` types at API boundaries | tRPC with inferred types |
| Manual API type definitions | Automatic inference from server to client |
| Runtime-only validation | Zod for runtime + compile-time safety |
| String-typed env variables | t3-env with Zod validation |
| Explicit return types everywhere | Let TypeScript infer, annotate intentionally |
| Separate frontend/backend type definitions | Shared types via tRPC or monorepo packages |
