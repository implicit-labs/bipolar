# CI/CD Setup Workflow

Based on Antoine van der Lee's CI stack at WeTransfer and his open-source CI tooling. The philosophy: automate every piece of feedback that can be automated.

---

## The Stack

```
SwiftLint        → Code style enforcement (build-time + CI)
SwiftFormat      → Auto-formatting (pre-commit or CI)
Danger           → Automated PR review feedback
Fastlane         → Build, test, and release automation
Selective Testing → Only test what changed
```

---

## Layer 1: SwiftLint

### Purpose
Enforce code standards automatically. Common feedback that reviewers would give (force unwraps, long functions, naming) becomes a compiler warning or error.

### Setup
```yaml
# .swiftlint.yml
disabled_rules:
  - trailing_whitespace
opt_in_rules:
  - force_unwrapping        # Warn on force unwraps
  - empty_count              # Prefer .isEmpty over .count == 0
  - closure_end_indentation
  - contains_over_filter_count
  - discouraged_optional_collection
analyzer_rules:
  - unused_import
excluded:
  - Pods
  - .build
  - DerivedData
```

### Build Integration
Add a Run Script build phase that runs SwiftLint only on changed files (saves ~15 seconds per build):
```bash
if [ "${CONFIGURATION}" = "Debug" ]; then
  "${PODS_ROOT}/SwiftLint/swiftlint" lint --quiet
fi
```

---

## Layer 2: Danger

### Purpose
Automated PR review bot ("WeTransferBot"). Catches issues before human reviewers spend time on them.

### What to Automate
- **PR hygiene**: Title format, description presence, size warnings
- **Test coverage**: Warn if coverage drops below threshold
- **Build results**: Surface Xcode warnings and errors inline in the PR
- **SwiftLint**: Run lint and post violations as inline PR comments

### Example Dangerfile
```ruby
# Dangerfile

# PR should have a description
warn("Please provide a PR description.") if github.pr_body.length < 10

# Warn about large PRs
warn("This PR is quite large. Consider splitting it.") if git.lines_of_code > 500

# SwiftLint inline comments
swiftlint.lint_files inline_mode: true

# Xcode build summary
xcode_summary.report 'build/reports/errors.json'
```

---

## Layer 3: Fastlane

### Purpose
Standardize build, test, and release workflows. Every team member and CI system runs the same commands.

### Core Lanes
```ruby
# Fastfile

default_platform(:ios)

platform :ios do
  desc "Run tests"
  lane :test do
    run_tests(
      scheme: "AppScheme",
      devices: ["iPhone 16"],
      code_coverage: true,
      output_types: "junit"
    )
  end

  desc "Build for release"
  lane :build do
    build_app(
      scheme: "AppScheme",
      export_method: "app-store"
    )
  end

  desc "Submit to App Store"
  lane :release do
    build
    upload_to_app_store(
      skip_metadata: true,
      skip_screenshots: true
    )
  end
end
```

---

## Layer 4: Selective Testing

### Purpose
In modularized apps (SPM packages), only run tests for packages affected by the PR's changes. This reduced WeTransfer's CI from ~60 minutes to ~5 minutes.

### Strategy
1. Identify which files changed in the PR
2. Map changed files to their owning package
3. Build a dependency graph of packages
4. Test only affected packages (direct changes + downstream dependents)

### Implementation
```bash
# Pseudocode for selective test runner
changed_packages=$(git diff --name-only origin/main | extract_packages)
affected_packages=$(resolve_dependencies $changed_packages)
for package in $affected_packages; do
  xcodebuild test -scheme "$package" -destination "platform=iOS Simulator,name=iPhone 16"
done
```

---

## Release Train Model

### Philosophy
> "Everybody on the team knows that every Monday there's a new release coming, and we don't have to think about releasing anymore."

### Process
1. **Daily** (7 PM): CI builds and delivers to QA with auto-generated changelog
2. **QA review**: Testers mark builds as "green-light" via GitHub releases
3. **Monday 10 AM**: Newest green-lit build auto-submits to App Store
4. **No manual intervention**: The train leaves the station whether you're ready or not

### Benefits
- Removes release anxiety and decision fatigue
- Forces small, shippable increments
- Catches issues early through continuous QA
- Predictable cadence for stakeholders

---

## Checklist for New CI Setup

- [ ] SwiftLint configured with team rules
- [ ] SwiftFormat configured for consistent style
- [ ] Dangerfile catching PR hygiene issues
- [ ] Fastlane lanes for test, build, release
- [ ] Code coverage reporting (aim for 90% on critical paths)
- [ ] Build results surfaced in PR comments
- [ ] Selective testing for multi-package projects
- [ ] Daily builds to QA (if team > 1)
- [ ] Release train schedule established
