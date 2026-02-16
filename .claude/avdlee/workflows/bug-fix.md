# Bug Fix Workflow (TDD-First)

Based on Antoine van der Lee's "Test-Driven Development for Bug Fixes" approach. Every bug fix starts with a failing test.

---

## The Process

### Step 1: Reproduce and Understand
Before writing any code:
1. **Confirm the bug exists** — reproduce it locally
2. **Assess severity** — does this warrant a fix or deprioritization?
3. **Check signal strength** — multiple user reports indicate broader impact; a single report may be edge-case

> "Not all bugs warrant fixes. Multiple support tickets indicate broader impact; single-user issues may be deprioritized."

### Step 2: Write the Failing Test
Write a test that **reproduces the exact bug scenario** before touching any implementation code.

```swift
import Testing

@Test func discountShouldNotExceedSubtotal() {
    // This test captures the reported bug:
    // applying a discount larger than subtotal produces negative total
    let result = PriceCalculator.total(subtotal: 10, discount: 15)
    #expect(result >= 0) // Currently fails — proves the bug exists
}
```

**Why test first:**
- Proves the bug exists in an automated, repeatable way
- Prevents regression — this test lives forever
- Forces you to understand the exact failure condition
- Gives you a clear "done" signal when the test passes

### Step 3: Fix the Bug (Minimal Change)
Make the **smallest possible change** that makes the test pass. Resist the urge to refactor surrounding code in the same commit.

```swift
static func total(subtotal: Int, discount: Int) -> Int {
    max(0, subtotal - discount) // Fix: clamp to non-negative
}
```

### Step 4: Verify
1. Run the new test — it should pass
2. Run the full test suite — nothing else should break
3. If other tests break, the fix has unintended side effects — investigate

### Step 5: Commit Separately
- Commit the test and fix in a single, focused commit
- Reference the bug report / issue number
- Keep the commit small and reviewable

---

## Bug Prioritization Framework

| Signal | Priority |
|--------|----------|
| Multiple user reports of same issue | High — fix now |
| Crash in critical path (auth, payment, data loss) | Critical — fix immediately |
| Single user report, non-critical path | Low — evaluate cost/benefit |
| Edge case in deprecated feature | Skip — document and move on |

---

## Debugging Toolkit

### Prefer OSLog Over Print
```swift
import OSLog

private let logger = Logger(subsystem: "com.app.module", category: "networking")

logger.debug("Request started: \(url)")
logger.error("Failed with: \(error.localizedDescription)")
```
Custom categories enable filtering in Console.app during development.

### Use Diagnostics for User Reports
For bugs that are hard to reproduce, give users a way to submit structured diagnostic reports (logs, app state, system info) rather than asking them to describe what happened.

### Minimal Reproducible Cases
When filing radar or investigating framework bugs:
1. Create a new project with minimum viable code that reproduces the issue
2. Remove everything unrelated
3. Document exact steps, OS version, and device

---

## Anti-Patterns

- **Fixing without a test** — the bug will return. "A bug that's been fixed without a test is a bug that will happen again."
- **Large refactors mixed with bug fixes** — makes review impossible and introduces risk
- **Guessing at the fix** — reproduce first, understand second, fix third
- **Ignoring related bugs** — if the root cause is systemic, file follow-up issues for related symptoms
