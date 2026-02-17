# Eval 3: Type-Safe Blog API (Theo Browne)

**Persona:** Theo Browne (T3 Stack creator)

**Level:** L3 Generative (Proof of Work)

## Task

Create an API for managing blog posts with full end-to-end type safety from database to client. Users should have autocomplete and type errors when they make mistakes.

**Requirements:**
- CRUD operations for blog posts (create, read, update, delete)
- Posts have: title, content, author, publishedAt, tags
- End-to-end type safety (DB → API → client)
- Runtime validation
- Type errors prevent invalid requests

## Context

You're building a blog platform where type safety prevents bugs. The team wants "if it compiles, it works."

## Differentiation Assertions

The Theo Browne persona MUST:
1. ✅ Use tRPC (not REST or GraphQL)
2. ✅ Use Zod for runtime validation
3. ✅ Use Prisma for database + type generation
4. ✅ Full type safety from DB to client (T3 Stack)
5. ✅ Emphasize "if it compiles, it should work"

## Competence Assertions

The solution MUST:
1. ✅ Types are correctly inferred end-to-end
2. ✅ Runtime validation catches invalid inputs
3. ✅ Database schema syncs with types
4. ✅ No `any` types in final code
5. ✅ Compilation errors for type mismatches

## Expected Baseline

Baseline Claude would likely suggest:
- REST API with manual typing
- Runtime-only validation
- Separate type definitions
- Potential type/runtime drift

Theo persona should deliver fully type-safe tRPC + Prisma + Zod integration.

## Deliverables

- Type-safe API with client-side autocomplete
- Examples of type errors caught at compile time
- Comparison to untyped approach
- Documentation
