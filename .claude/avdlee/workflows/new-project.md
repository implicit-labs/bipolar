# New Project Setup Workflow

Based on Antoine van der Lee's "7 Changes I Do for Every New Xcode Project" and his broader project initialization philosophy.

---

## The 7 Immediate Changes

### 1. Enable Approachable Concurrency
In Build Settings, enable **Approachable Concurrency** (Swift 6.2+). This adds progressive disclosure to concurrency — Swift only asks you to understand as much concurrency as you actually use.

### 2. Review Upcoming Features
Check Build Settings > **Upcoming Features** and enable relevant ones. These become standard in future Swift versions. Enabling them now prevents future migration pain.

### 3. Switch to Swift 6
Set the **Swift Language Version** to Swift 6 with strict concurrency checking. Starting strict from day one is exponentially easier than migrating later.

### 4. Remove Unused Targets
Delete any test targets or extensions you won't use immediately. They add build time and noise. You can always add them back when needed.

### 5. Fix Default Build Settings
Review and correct Apple's defaults that don't match best practices:
- Set **Default Actor Isolation** to `@MainActor` (for apps with UI)
- Review optimization levels for Debug vs Release

### 6. Add App Group Early
Configure an **App Group** in the target's capabilities, even if you don't need one yet. Adding it later requires a migration for existing user data (UserDefaults, shared containers). Doing it from the start is free.

### 7. Establish Folder Structure
Create a clear, consistent folder structure immediately:

```
Sources/
├── App/              # App entry point, AppDelegate
├── Models/           # Data models, entities
├── Views/            # SwiftUI views
├── ViewModels/       # View models (if using MVVM)
├── Services/         # Network, persistence, business logic
├── Extensions/       # Swift extensions
├── Utilities/        # Helpers, constants
└── Resources/        # Assets, fonts, localization
```

---

## Extended Setup Checklist

Beyond the 7 core changes, also consider:

### Code Quality
- [ ] Add `.swiftlint.yml` with team rules
- [ ] Add `.swiftformat` configuration
- [ ] Configure pre-commit hooks for lint/format

### Git
- [ ] Create `.gitignore` with Xcode-appropriate rules
- [ ] Set up branch protection on `main`
- [ ] Establish branch naming: `feat/`, `fix/`, `docs/`, `refactor/`

### CI/CD (if applicable)
- [ ] Set up Fastlane with basic lanes (`test`, `build`, `release`)
- [ ] Add Danger for automated PR feedback
- [ ] Configure selective testing for multi-package projects

### Dependencies
- [ ] Prefer Swift Package Manager over CocoaPods/Carthage
- [ ] Start modularizing early — create packages for distinct domains
- [ ] Document why each dependency was added

### Testing
- [ ] Create test target with Swift Testing (not XCTest for new code)
- [ ] Set up in-memory stores/mocks for unit tests
- [ ] Establish 90% coverage target for critical business logic

---

## Philosophy

> "You can only spend your time once, so you need to be careful with your decisions."

Every minute spent on project setup saves hours of migration later. Start strict, start organized, start automated.
