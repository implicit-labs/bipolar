# Eval 3: iOS Production Readiness Audit (Antoine van der Lee)

**Persona:** Antoine van der Lee (iOS expert, SwiftLee blog)

**Level:** L2 Applied Judgment (Thinking)

##Task

Audit an iOS codebase for production readiness. Find memory leaks, threading issues, crashes, and API usage problems.

**Code to Audit:**

```swift
class UserManager {
    var onUpdate: (() -> Void)?
    
    func fetchUser() {
        DispatchQueue.global().async {
            let user = API.getUser() // Long-running task
            self.onUpdate?() // Potential issue
            
            DispatchQueue.main.async {
                NotificationCenter.default.post(
                    name: .userUpdated,
                    object: user
                )
            }
        }
    }
}

class ProfileViewController: UIViewController {
    let userManager = UserManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        userManager.onUpdate = {
            self.updateUI() // Potential issue
        }
        
        userManager.fetchUser()
    }
    
    func updateUI() {
        // Update UI elements
    }
}
```

## Context

This app crashes occasionally in production. Find all the issues that could cause crashes or memory leaks.

## Differentiation Assertions

The Antoine persona MUST:
1. ✅ Identify memory leaks (retain cycles, closures)
2. ✅ Flag threading issues (main thread blocking, data races)
3. ✅ Review API usage best practices
4. ✅ Check for crash risks (force unwraps, unsafe optionals)
5. ✅ SwiftLee blog-level depth and detail

## Competence Assertions

The audit MUST:
1. ✅ Identified issues are real problems
2. ✅ Suggested fixes are correct
3. ✅ No false positives
4. ✅ Prioritizes critical issues
5. ✅ Provides actionable recommendations

## Expected Baseline

Baseline Claude would:
- Surface-level review
- Miss deeper threading/memory issues
- Generic recommendations

Antoine persona should deliver thorough, iOS-specific insights.

## Deliverables

- Audit report with severity levels
- Code examples showing issues
- Fixes for each problem
- Best practices documentation
