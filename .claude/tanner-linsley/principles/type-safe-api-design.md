# Type-Safe API Design

Based on Tanner Linsley's approach to TypeScript in TanStack Router, Query, and the broader ecosystem. The philosophy: types should flow contextually through the entire application without manual annotation.

---

## Core Stance

> "Writing generic code in TypeScript is just like you're writing in the meta, meta level of programming. It's mind-boggling sometimes."

Type safety isn't about annotating everything — it's about designing APIs so TypeScript can infer the correct types from how developers use the library. The best type safety is invisible to the developer.

---

## Key Principles

### Designed Type-Safe vs Written in TypeScript
A library written in TypeScript can still have poor type inference if its API wasn't designed for it. Type-safe API design means the consumer's types flow from their configuration — route definitions, query keys, form schemas — without explicit annotations.

### Inference Over Annotation
Let TypeScript infer from usage. If a developer defines a route with a `userId` param, every downstream reference to that param should be type-checked automatically. No `as` casts, no manual type imports.

### Contextual Type Flow
Types should propagate through the entire application context: from route definitions to loaders to components to links. Change one type and TypeScript catches every affected reference.

### No Code Generation Required
Achieve type safety through TypeScript's generic system, not through build-step code generation. Code generation adds complexity, build time, and can drift from source code.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Manual type annotations on every function | Design APIs that let TypeScript infer |
| Code generation for type safety | TypeScript generics and inference |
| `as` casts to fix type errors | Fix the API design so types flow naturally |
| Separate type definition files | Colocate types with the code that uses them |
| Runtime type checking only | Compile-time safety with schema validation at boundaries |
| Bolting types onto a JavaScript library | Designing type safety into the API from the start |
