# AI-Assisted Engineering

Based on Boris Cherny's Claude Code workflow, his interviews on The Peterman Pod and AI & I podcast, and community documentation of his setup. The philosophy: AI multiplies engineering judgment, it doesn't replace it.

---

## Core Stance

> "Someone has to prompt the Claudes, talk to customers, coordinate with other teams, decide what to build next. Engineering is changing and great engineers are more important than ever."

AI doesn't eliminate the need for engineers — it shifts what engineers optimize for. Architecture, planning, quality standards, and user empathy become more valuable. Typing speed becomes irrelevant.

---

## Agents as Specialized Workers

Don't use one monolithic AI session for everything. Different phases of development need different "minds":

| Phase | Agent Type | Focus |
|-------|-----------|-------|
| Planning | Spec agent | Requirements, architecture, constraints |
| Implementation | Code agent | Writing code within the plan |
| Simplification | Simplifier | Reducing complexity after first pass |
| Review | Grill agent | Adversarial review, finding weaknesses |
| Validation | Verifier | Testing, browser checks, simulator |

### Why Specialization Works
Each agent has a clear objective and doesn't need to context-switch. A reviewer that also writes code will be less critical. A planner that also implements will rush planning.

---

## Verification is Everything

> "You don't trust; you instrument."

Give AI tools to check its own work:
- **Bash commands** for build, lint, test
- **Browser testing** for visual verification
- **Simulator checks** for mobile
- **Type checker** as first line of defense

Verification loops improve quality by 2-3x. Without them, AI code is unreliable. With them, it's remarkably good.

---

## Institutional Memory

CLAUDE.md is your growing knowledge base:
- Record every AI mistake so it doesn't repeat
- Document project conventions and patterns
- Update multiple times per week
- Check into version control so the whole team benefits

The compound effect is powerful — after weeks of updates, AI understands your codebase's conventions deeply.

---

## Parallelism as Force Multiplier

Run multiple sessions simultaneously:
- 5 local terminal sessions
- 5-10 remote/browser sessions
- Git worktrees for isolation
- Each session works on a different task

This is fleet management, not pair programming. You're coordinating multiple workers, not babysitting one.

---

## Model Selection

> "A wrong fast answer is slower than a right slow answer."

Use the strongest available model (Opus with thinking) for all coding tasks. Smaller, faster models require more steering and produce more errors — the time "saved" is spent on corrections.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| One monolithic AI session | Specialized agents per phase |
| Trusting AI output without verification | Instrument with test suites, browser checks |
| Using fastest model for speed | Use strongest model — fewer corrections = faster overall |
| Fixing mediocre AI output | Reject and regenerate — the bar doesn't bend |
| Tribal knowledge about AI failures | CLAUDE.md institutional memory |
| Manual git workflow for parallel sessions | Git worktrees + slash commands |
| Expert personas for agents | Task-execution tools with clear constraints |
