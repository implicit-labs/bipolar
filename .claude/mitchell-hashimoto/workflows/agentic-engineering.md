# Agentic Engineering Workflow

Based on Mitchell Hashimoto's "My AI Adoption Journey," "Vibing a Non-Trivial Ghostty Feature," and the Zed blog interview "Agentic Engineering in Action."

---

## Steps

### 1. Abandon Chatbots
Chatbots are inefficient for coding. Use agents — LLMs with file system access, execution environments, and HTTP capabilities. The difference between a chatbot and an agent is like the difference between asking someone to describe a fix and having them implement it.

### 2. Reproduce Your Own Work First
Before delegating to AI, complete the task manually. Then recreate it with agents. This calibrates expectations, reveals agent weaknesses, and ensures you understand the work deeply enough to review AI output.

### 3. Architect, Then Delegate
Never hand architectural decisions to AI. Maintain control over structure, data flow, and state management. Treat agents like junior engineers: give them well-scoped tasks with clear guardrails, not open-ended design problems.

> "If the AI writes something I do not understand, I stop and study it."

### 4. Scope Precisely
Break vague requests into planning vs. execution phases. Instead of "build this feature," ask: "Plan how you'd implement X given these constraints" then separately: "Implement step 2 of the plan." Small, sequential sessions produce better results than marathon sessions.

### 5. Build Verification Mechanisms
Give agents tools to check their own work. Custom verification scripts, test suites, linters — anything that provides automated feedback. This is "harness engineering": systematically preventing repeated mistakes through infrastructure.

### 6. Use AGENTS.md
Create repository-level AGENTS.md files that encode:
- Project conventions and file organization
- Language-specific patterns and idioms
- Testing requirements and verification commands
- Common agent mistakes and how to avoid them

This documentation prevents agents from making the same mistakes twice.

### 7. Run Agents During Low-Productivity Hours
Deploy agents at end-of-day or during context-switch breaks. Use the "oracle pattern" — check agent progress on your schedule, not via notifications. Deliberately disable interruptions.

### 8. Cleanup as Validation
After an AI session, restructure and clean up the code manually. This forces deep understanding and catches subtle errors. If you can't confidently clean up AI output, you didn't understand it well enough to ship.

---

## What Agents Excel At
- Refactoring code ("almost perfect")
- Well-scoped feature implementation (junior/mid-level tasks)
- Research and multi-page summaries
- Issue triage using CLI tools
- Parallel exploration of vague ideas

## What Agents Struggle With
- Architecture and system design
- Complicated data structures
- High-performance/low-level optimization
- Novel problem solving requiring domain expertise

---

## Philosophy

> "I want to see the contributor's thinking, not just output."

The goal is human-guided AI assistance, not AI-driven development. The human maintains architectural ownership and deep understanding. AI multiplies productivity on well-scoped tasks. The danger isn't AI usage — it's invisible reasoning and atrophied fundamentals.
