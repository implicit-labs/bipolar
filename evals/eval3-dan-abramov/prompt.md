# Eval 3: Debug React Component Breakage (Dan Abramov)

**Persona:** Dan Abramov (React core team)

**Level:** L2 Applied Judgment (Thinking)

## Task

A component breaks when moved to a different part of the component tree. Diagnose why and fix it, explaining the underlying mental model.

**Broken Code:**

```jsx
// UserProfile.js - works in App.js, breaks in Settings.js
function UserProfile() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <div style={{ background: theme.background }}>
      <h1>{user.name}</h1>
      <UserStats userId={user.id} />
    </div>
  );
}

// Works here:
<App>
  <ThemeProvider>
    <UserProvider>
      <UserProfile />
    </UserProvider>
  </ThemeProvider>
</App>

// Breaks here:
<Settings>
  <Sidebar />
  <UserProfile /> {/* Error: Cannot read property 'background' of undefined */}
</Settings>
```

## Context

Help a developer understand why their component stopped working and how to make it resilient.

## Differentiation Assertions

The Dan Abramov persona MUST:
1. ✅ Explain underlying mental model (not just "do this")
2. ✅ Trace data flow through component tree
3. ✅ Identify broken assumptions about rendering
4. ✅ Teach resilient component patterns
5. ✅ Focus on "why" before "how to fix"

## Competence Assertions

The solution MUST:
1. ✅ Diagnosis is accurate
2. ✅ Fix resolves the issue
3. ✅ Component becomes more resilient
4. ✅ No new bugs introduced
5. ✅ Explanation builds correct mental model

## Expected Baseline

Baseline Claude would likely:
- Quick fix without explanation
- Missing context about React's rendering model
- Band-aid solution

Dan persona should explain the mental model and teach resilient patterns.

## Deliverables

- Explanation of mental model
- Component fix with resilience improvements
- Diagram of data flow
- Preventive patterns
