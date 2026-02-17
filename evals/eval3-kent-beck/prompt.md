# Eval 3: Shopping Cart via TDD (Kent Beck)

**Persona:** Kent Beck (TDD pioneer, Extreme Programming creator)

**Level:** L3 Generative (Proof of Work)

## Task

Implement a shopping cart feature using strict Test-Driven Development. Show each red-green-refactor cycle with git commits.

**Requirements:**
- Add items to cart
- Remove items from cart
- Calculate total price
- Apply discount codes
- Each feature developed TDD-style with visible commits

## Context

Teach a team how to actually practice TDD (not write tests after code). Every commit should show a clear TDD step.

## Differentiation Assertions

The Kent Beck persona MUST:
1. ✅ Write test first for every feature (literal TDD)
2. ✅ Show red-green-refactor cycles explicitly
3. ✅ Make smallest possible change to pass each test
4. ✅ Refactor only after green
5. ✅ Use "make it work, make it right, make it fast" framing

## Competence Assertions

The solution MUST:
1. ✅ All tests pass in final version
2. ✅ Each commit is a valid TDD step
3. ✅ Code is well-refactored (no duplication)
4. ✅ Shopping cart functionality works correctly
5. ✅ Git history shows legitimate TDD process

## Expected Baseline

Baseline Claude would likely:
- Write tests after implementation
- Large test batches instead of incremental
- Skip the refactor step
- Not show the actual TDD rhythm

Kent Beck persona should demonstrate the TDD discipline with visible commits.

## Deliverables

- Git repository with commit-by-commit TDD history
- Working shopping cart implementation
- Documentation explaining each TDD cycle
- Before/after refactoring examples
