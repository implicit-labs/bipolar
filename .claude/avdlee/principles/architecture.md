# Architecture Principles

Based on Antoine van der Lee's architectural decisions at WeTransfer and his open-source projects. The philosophy: align with platform conventions, modularize early, keep it simple.

---

## Core Stance

> "There was always an easy way to solve the same problem with code that aligned with the Apple APIs."

Antoine rejected ReactiveSwift/RxSwift at WeTransfer because standard Apple patterns solved the same problems without the dependency cost, learning curve, or debugging complexity.

---

## Pattern: MVVM + Apple Native

### Why MVVM
- **Separation of concerns** — Views stay declarative, logic stays testable
- **Fast onboarding** — New developers at WeTransfer reached productivity in < 2 weeks
- **Testability** — ViewModels can be unit tested without UI
- **Flexibility** — Not a rigid framework, just a guideline

### Structure
```swift
// View — Declarative, no business logic
struct ProfileView: View {
    @State private var viewModel = ProfileViewModel()

    var body: some View {
        // Pure UI declaration
    }
}

// ViewModel — Testable business logic
@Observable
final class ProfileViewModel {
    private(set) var user: User?
    private let service: UserServiceProtocol

    init(service: UserServiceProtocol = UserService()) {
        self.service = service
    }

    func loadUser() async throws {
        user = try await service.fetchCurrentUser()
    }
}

// Service — Abstracted behind protocol for testability
protocol UserServiceProtocol {
    func fetchCurrentUser() async throws -> User
}
```

### Key Rules
- **ViewModels use `@Observable`** (not `ObservableObject`) on iOS 17+
- **Services are protocol-based** for dependency injection and testing
- **Views never call network/persistence directly**
- **ViewModels don't import SwiftUI** (they don't know about views)

---

## Modularization via Swift Package Manager

### Why Modularize Early
- **Faster builds** — Only recompile changed modules
- **Enforced boundaries** — Modules can't accidentally reach into each other
- **Reusability** — Share packages across apps, extensions, and test targets
- **Parallel development** — Teams work on separate modules without conflicts

### Package Structure
```
App/
├── Package.swift          # Root package (or Xcode project)
├── Packages/
│   ├── Core/              # Models, protocols, utilities
│   ├── Networking/         # API client, request/response types
│   ├── Persistence/        # Core Data stack, repositories
│   ├── Features/
│   │   ├── Auth/           # Login, signup, session management
│   │   ├── Profile/        # User profile feature
│   │   └── Settings/       # Settings feature
│   └── DesignSystem/       # Reusable UI components
```

### Rules
- **Lower layers never import higher layers** — Core doesn't know about Features
- **Features depend on Core and Services, not on each other**
- **Each package has its own test target**
- **Start with 2-3 packages, split further when boundaries become clear**

---

## Dependency Injection

### Prefer Swift-Native Patterns
Antoine uses Swift's own features (property wrappers, static subscripts, generics) for DI rather than third-party frameworks.

### Protocol-Based Injection
```swift
// Protocol defines the contract
protocol CacheStoring {
    func save(_ data: Data, forKey key: String) async throws
    func load(forKey key: String) async throws -> Data?
}

// Production implementation
final class DiskCacheStore: CacheStoring {
    func save(_ data: Data, forKey key: String) async throws { /* ... */ }
    func load(forKey key: String) async throws -> Data? { /* ... */ }
}

// Test implementation
final class InMemoryCacheStore: CacheStoring {
    private var storage: [String: Data] = [:]
    func save(_ data: Data, forKey key: String) async throws { storage[key] = data }
    func load(forKey key: String) async throws -> Data? { storage[key] }
}

// Usage — injectable via init
final class ImageLoader {
    private let cache: CacheStoring

    init(cache: CacheStoring = DiskCacheStore()) {
        self.cache = cache
    }
}
```

---

## API Design

### Type Safety Everywhere
- Use `enum` for finite sets of values, not raw strings
- Use `struct` for value types with clear identity
- Use `Codable` with explicit `CodingKeys` for API responses
- Use `Result` or `async throws` — never callbacks with optional error and optional value

### Extension-Driven Organization
Organize related functionality via extensions rather than massive class bodies:

```swift
// User+Formatting.swift
extension User {
    var displayName: String { "\(firstName) \(lastName)" }
    var initials: String { "\(firstName.prefix(1))\(lastName.prefix(1))" }
}

// User+Validation.swift
extension User {
    var isProfileComplete: Bool { !email.isEmpty && !firstName.isEmpty }
}
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Better Alternative |
|---|---|
| God ViewController / View | Split into focused ViewModels and child views |
| Singleton everything | Protocol-based dependency injection |
| Stringly-typed APIs | Enums, strong types, phantom types |
| Massive `AppDelegate` | Separate into `AppDelegate` extensions or dedicated services |
| Third-party for everything | Check if Apple provides a native solution first |
| Premature abstraction | "You don't need a protocol for a class with one conformer" |
