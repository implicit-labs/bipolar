# Type-Driven Development

Based on Boris Cherny's "Programming TypeScript," his SE Radio interview, and his approach to building type-safe systems at Meta and Anthropic.

---

## Steps

### 1. Define the Domain Types
Before writing any logic, define the types that model your domain. Interfaces, type aliases, enums, discriminated unions — these are your contract.

```typescript
type User = { id: string; name: string; role: 'admin' | 'member' };
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
```

### 2. Sketch Function Signatures
Write the type signatures for your functions before implementing them. The types should make invalid states unrepresentable.

```typescript
function fetchUser(id: string): Promise<ApiResult<User>>;
function updateRole(user: User, role: User['role']): User;
```

### 3. Let the Compiler Guide You
Fill in implementations. TypeScript will tell you when types don't align. Trust the compiler — if it compiles, the structure is correct. Focus your testing on business logic, not type-level concerns.

### 4. Narrow Exhaustively
Use discriminated unions and exhaustive checks. Never reach for `any` — use `unknown` and narrow with type guards.

```typescript
function handle(result: ApiResult<User>) {
  if (result.ok) {
    // TypeScript knows result.data exists here
    return result.data;
  }
  // TypeScript knows result.error exists here
  throw new Error(result.error);
}
```

### 5. Generate Types When Possible
Use tools like `json-schema-to-typescript` to generate types from external schemas. Don't manually maintain types that can be derived from a source of truth.

---

## Philosophy

> "Type signatures are the most important part of code."

Types are documentation that the compiler enforces. If your types are right, the implementation almost writes itself. If your types are wrong, no amount of testing will save you. Start with types, always.
