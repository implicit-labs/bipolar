# T3 Stack Development

Based on Theo Browne's design of create-t3-app, the T3 Stack documentation, and his "simplicity, modularity, and type safety" philosophy.

---

## Steps

### 1. Scaffold with create-t3-app
Run the interactive CLI to generate a customized Next.js project. Pick only what you need — tRPC, Tailwind, Prisma/Drizzle, NextAuth. Don't add everything "just in case." Every dependency must solve a specific problem.

### 2. Establish Type-Safe API Layer with tRPC
Define your API as typed procedures on the server. Import the types directly on the client — no code generation, no OpenAPI specs, no GraphQL schemas. The API boundary disappears; it's just functions with type safety.

### 3. Validate at Every Boundary with Zod
Use Zod schemas for input validation on API procedures, form data, and environment variables (via t3-env). Runtime validation feeds compile-time types — one schema, two guarantees.

### 4. Style with Tailwind CSS
Use utility classes for rapid UI development. Tailwind provides meaningful defaults for colors, spacing, and typography. Write custom CSS only when Tailwind's utilities don't cover the case.

### 5. Handle Auth with NextAuth.js or Clerk
Don't roll your own authentication. Use NextAuth.js for flexibility or Clerk for managed auth. Outsource infrastructure concerns so you can focus on product logic.

### 6. Type-Safe Database Access
Use Prisma or Drizzle for database queries. Both provide TypeScript types from your schema. The ORM layer should be as type-safe as your API layer — no `any` types leaking from the database.

---

## Philosophy

> "Any decision that compromises the typesafe nature of create-t3-app is a decision that should be made in a different project."

The T3 Stack exists to make full-stack TypeScript development simple, modular, and type-safe. Every piece is optional, every piece is composable, and every piece preserves end-to-end type safety.
