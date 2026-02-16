# Code Review Workflow

Based on Antoine van der Lee's review practices at WeTransfer, where new developers reached productivity in under two weeks thanks to consistent code quality standards.

---

## Review Philosophy

> "The more senior you become, the less hands-on you should be. Those who handle the code daily should feel confident in what they write."

Code review is **mentorship**, not gatekeeping. The goal is to elevate the team, not demonstrate expertise.

---

## The Review Checklist

### 1. Correctness
- [ ] Does the code do what the PR description says?
- [ ] Are edge cases handled? (nil, empty, overflow, concurrent access)
- [ ] Are errors handled gracefully? (no force unwraps, no unhandled throws)
- [ ] Does it handle the unhappy path? (network failure, disk full, permission denied)

### 2. Modern APIs
- [ ] Uses `@Observable` instead of `ObservableObject` (iOS 17+)
- [ ] Uses `NavigationStack` instead of `NavigationView`
- [ ] Uses `async/await` instead of completion handlers (where possible)
- [ ] Uses Swift Testing (`#expect`, `@Test`) instead of XCTest for new tests
- [ ] No deprecated APIs without a migration plan

### 3. Concurrency Safety
- [ ] `@MainActor` only where truly needed (UI code)
- [ ] No data races — shared state protected by actors or isolation
- [ ] Sendable conformance where required
- [ ] No force `@unchecked Sendable` without documentation

### 4. Performance
- [ ] No unnecessary `@MainActor` on non-UI code
- [ ] Expensive operations not on main thread
- [ ] Appropriate use of `lazy` for heavy initialization
- [ ] No retain cycles in closures (check `[weak self]` patterns)

### 5. Testability
- [ ] Critical business logic has test coverage
- [ ] Dependencies are injectable (protocols, not concrete types)
- [ ] Tests use in-memory stores, not real network/disk

### 6. Simplicity
- [ ] Could this be done with fewer lines using standard APIs?
- [ ] Is the abstraction justified, or is it premature?
- [ ] Would a new team member understand this in 5 minutes?

---

## Communication Style

### Do
- **Use "we"**: "We could simplify this by..." not "You should..."
- **Explain why**: "This might cause a retain cycle because..." not just "Add weak self"
- **Acknowledge good work**: "Nice use of task groups here" — positive feedback matters
- **Ask questions**: "What happens if this returns nil?" — Socratic method teaches better than directives
- **Be immediate**: Raise issues when you see them, don't stockpile

### Don't
- **Don't be prescriptive about style**: That's SwiftLint's job
- **Don't nitpick formatting**: That's SwiftFormat's job
- **Don't block on preferences**: If it works and is readable, approve it
- **Don't pile on**: If 3 issues are all symptoms of one root cause, point out the root cause once
- **Don't use "you"**: It creates defensiveness. "We" creates collaboration

---

## What Should Be Automated (Not in Review)

These belong in SwiftLint/Danger, not in human review comments:

| Feedback | Automation |
|----------|------------|
| "Add a space here" | SwiftFormat |
| "This line is too long" | SwiftLint |
| "Missing documentation" | SwiftLint opt-in rule |
| "Force unwrap detected" | SwiftLint `force_unwrapping` |
| "PR is too large" | Danger size check |
| "No tests added" | Danger test file check |
| "Coverage dropped" | CI coverage reporting |

**Rule of thumb:** If you've given the same feedback 3 times, it should be a lint rule.

---

## Review Size Guidelines

| PR Size | Approach |
|---------|----------|
| < 100 lines | Quick review, same-day turnaround |
| 100-300 lines | Standard review, detailed pass |
| 300-500 lines | Consider splitting. Review in sections |
| > 500 lines | Ask author to split. "This PR is doing too much" |

---

## Handling Disagreements

1. **Discuss, don't argue** — Present your reasoning, listen to theirs
2. **If it's a preference, yield** — The author owns the code
3. **If it's correctness, insist** — Data races, force unwraps, and missing error handling are not preferences
4. **If unresolved, timebox** — 15 minutes of discussion max, then escalate to team consensus or try both approaches
