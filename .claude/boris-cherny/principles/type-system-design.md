# Type System Design

Based on Boris Cherny's "Programming TypeScript," his SE Radio interview, and his open-source work (json-schema-to-typescript, flow-to-typescript, undux). The philosophy: types are contracts that the compiler enforces — the best documentation is documentation that can't become stale.

---

## Core Stance

> "TypeScript is intensely practical — fun, modern, and safe."

TypeScript succeeds because it's gradual, structural, and pragmatic. It doesn't demand type purity — it meets developers where they are and helps them get safer incrementally.

---

## Gradual Typing

TypeScript's killer feature is gradual adoption. You can start with `any` everywhere and tighten types incrementally. This is pragmatically correct — demanding 100% type coverage from day one would prevent adoption.

**But:** Aim for full coverage in production code. `any` is an escape hatch, not a destination. Use `unknown` instead of `any` when you don't know the type — it forces you to narrow before using.

### The Gradient
```
any → unknown → union types → discriminated unions → branded types
```
Each step rightward eliminates more runtime errors. Move as far right as practical.

---

## Structural Typing

TypeScript uses structural typing (duck typing for types) — if it has the right shape, it's the right type. This is more flexible than nominal typing (Java, C#) and enables patterns like:

- Interfaces as contracts without inheritance
- Implicit type compatibility across modules
- Easy mocking in tests (no need for DI frameworks)

---

## Make Invalid States Unrepresentable

The strongest type design principle: if the type system allows it, someone will write it. Use discriminated unions, literal types, and exhaustive checks to make impossible states impossible.

```typescript
// BAD: allows { loading: true, data: User, error: string }
type State = { loading: boolean; data?: User; error?: string };

// GOOD: exactly three valid states
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };
```

---

## Type Generation Over Maintenance

Never manually maintain types that can be derived from a source of truth:
- **API schemas** → `json-schema-to-typescript`
- **GraphQL schemas** → codegen tools
- **Database schemas** → type generation from migrations
- **Flow types** → `flow-to-typescript` for migration

The source of truth should be single, and types should flow from it.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| `any` in production code | `unknown` + type narrowing |
| Type assertions (`as Type`) | Type guards and narrowing |
| Optional fields for mutually exclusive states | Discriminated unions |
| Manually maintaining API types | Generate from schema (json-schema-to-typescript) |
| Nominal types via class inheritance | Branded types or tagged unions |
| `@ts-ignore` | Fix the type error or use `@ts-expect-error` with comment |
