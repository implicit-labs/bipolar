# Testing Trophy

Based on Kent C. Dodds' Testing Trophy methodology — the replacement for the Testing Pyramid in modern frontend development. The philosophy: integration tests give the most confidence per unit of effort.

---

## Steps

### 1. Start with Static Analysis

TypeScript and ESLint catch entire categories of bugs for free — typos, type mismatches, unused variables, import errors. This is the base of the Testing Trophy and requires zero manual test writing.

### 2. Write Integration Tests First

For any new feature or component, write integration tests that simulate real user behavior. Render the component, interact with it as a user would (click, type, submit), and assert on what the user sees. Use React Testing Library's queries in priority order: `getByRole` > `getByLabelText` > `getByText` > `getByTestId` (last resort only).

### 3. Add Unit Tests for Pure Logic

Extract pure functions (validation, formatting, calculations) and unit test them. These are fast, stable, and easy to write. But don't unit test React components — that's what integration tests are for.

### 4. Add E2E Tests for Critical Paths

Use Playwright for the 3-5 most critical user journeys: signup, login, checkout, core feature flow. These are expensive to write and slow to run, so be selective. E2E tests are your smoke test, not your comprehensive suite.

### 5. Never Test Implementation Details

If your test breaks when you refactor but behavior stays the same, delete the test and rewrite it. Ask: "Would the user notice this change?" If no, your test shouldn't notice it either.

---

## The Testing Trophy Layers

```
        /\
       /E2E\        ← Few: critical paths only
      /------\
     /Integra-\     ← Most: user-facing behavior
    /--tion----\
   /   Unit     \   ← Some: pure logic, utilities
  /--------------\
 / Static Analysis\ ← Base: TypeScript, ESLint
/------------------\
```

---

## Philosophy

> "Write tests. Not too many. Mostly integration."

The goal of testing is confidence — confidence that your application works for users. Not coverage numbers. Not checking boxes. Every test should answer: "Does this give me confidence that my app works?" If the answer is no, the test isn't worth maintaining.
