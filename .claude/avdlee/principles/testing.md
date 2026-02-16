# Testing Principles

Based on Antoine van der Lee's testing strategy at WeTransfer: 500+ unit tests in the app, 1,100+ in the core framework, ~90% coverage on critical paths.

---

## Core Philosophy

> "Ensure to test critical business code at a minimum and avoid reaching 100% code coverage."

Testing is about **confidence in critical paths**, not vanity metrics. 90% coverage on business logic is better than 100% coverage including trivial getters.

---

## What to Test

### Always Test (High Priority)
- **Business logic** — Price calculations, discounts, eligibility checks
- **Data transformations** — JSON parsing, model mapping, formatting
- **State machines** — Auth flows, onboarding steps, order status transitions
- **Error handling** — Network failures, invalid input, permission denied
- **Edge cases** — Empty arrays, nil values, overflow, concurrent access

### Test When Practical (Medium Priority)
- **ViewModel behavior** — State changes in response to actions
- **Repository/Service layers** — Data access patterns with mocked stores
- **Coordinators/Routers** — Navigation decisions

### Skip (Low Priority / Not Worth It)
- **UI layout** — Fragile, slow, changes frequently
- **Trivial computed properties** — `var fullName: String { first + " " + last }`
- **Simple delegation pass-throughs** — Code that just forwards calls
- **Third-party library wrappers** — Trust the library's own tests

---

## UI Testing Stance

> "UI tests are simply unstable and really hard to maintain, especially if you have a young project in which the UI is changing quite a lot."

Antoine deliberately **skips UI tests**, accepting occasional hotfixes as a better trade-off than maintaining a brittle UI test suite. He prefers:
- QA team for visual/interaction verification
- Unit tests on ViewModels to verify logic
- Snapshot tests only for stable design system components (if at all)

---

## Testing Stack

### Swift Testing (New Code)
```swift
import Testing

@Test func discountNeverExceedsSubtotal() {
    let result = PriceCalculator.total(subtotal: 10, discount: 15)
    #expect(result >= 0)
}

@Test(arguments: [0, 1, 80, 443, 65535])
func validPorts(_ port: Int) {
    #expect(PortValidator.isValid(port))
}
```

### Mocking with Protocols (Not Third-Party Mocking Libraries)
```swift
protocol APIClientProtocol {
    func fetch<T: Decodable>(_ endpoint: Endpoint) async throws -> T
}

// Production
final class APIClient: APIClientProtocol { /* real network calls */ }

// Test
final class MockAPIClient: APIClientProtocol {
    var stubbedResult: Any?
    var stubbedError: Error?

    func fetch<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
        if let error = stubbedError { throw error }
        return stubbedResult as! T
    }
}
```

### Mocker for Network Tests
When testing code that directly uses URLSession, use Mocker to intercept requests without changing implementation code:

```swift
import Mocker

@Test func fetchUserReturnsDecodedResponse() async throws {
    let userJSON = #"{"id": 1, "name": "Antoine"}"#.data(using: .utf8)!
    let mock = Mock(url: URL(string: "https://api.example.com/user")!,
                    contentType: .json,
                    statusCode: 200,
                    data: [.get: userJSON])
    mock.register()

    let user = try await apiClient.fetchUser()
    #expect(user.name == "Antoine")
}
```

---

## TDD for Bug Fixes

Every bug fix follows this cycle:

1. **Write a failing test** that reproduces the bug
2. **Run it** — confirm it fails (proves the bug exists)
3. **Fix the bug** — minimal change
4. **Run the test** — confirm it passes
5. **Run the full suite** — confirm nothing else broke
6. **Commit together** — test + fix in one commit

See `workflows/bug-fix.md` for the full workflow.

---

## Test Organization

### By Feature, Not by Type
```
Tests/
├── Auth/
│   ├── LoginViewModelTests.swift
│   └── SessionManagerTests.swift
├── Pricing/
│   ├── DiscountCalculatorTests.swift
│   └── TaxServiceTests.swift
└── Shared/
    └── MockAPIClient.swift
```

### Naming Convention
Test names describe the **scenario and expected outcome**:
```swift
@Test func expiredTokenTriggersReauth()
@Test func emptyCartShowsZeroTotal()
@Test func offlineModeCachesLastResponse()
```

---

## CI Testing Optimization

### Selective Testing
In modularized apps, only test packages affected by the change:
1. Diff the PR to find changed files
2. Map files to their owning SPM package
3. Resolve downstream dependencies
4. Run tests only for affected packages

This reduced WeTransfer's CI from **~60 minutes to ~5 minutes**.

### Test Reliability
- **No shared mutable state** between tests
- **No dependency on execution order**
- **No network calls in unit tests** (use Mocker or protocol mocks)
- **No file system access** (use in-memory stores)
- **No arbitrary sleeps** — use `await` and confirmations

---

## Coverage Targets

| Layer | Target | Rationale |
|-------|--------|-----------|
| Business logic | 90%+ | Core value, highest risk |
| ViewModels | 80%+ | Logic correctness |
| Services/Repositories | 80%+ | Data access reliability |
| Extensions/Utilities | 70%+ | Shared code |
| Views | 0% | Too fragile, use QA instead |
| Generated code | 0% | Tested by generator |
