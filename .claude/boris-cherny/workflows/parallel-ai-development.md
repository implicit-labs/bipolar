# Parallel AI Development

Based on Boris Cherny's Claude Code workflow as shared in interviews, Threads posts, and community documentation.

---

## Steps

### 1. Plan First, Always
Start every feature in plan mode. Iterate on the plan with Claude until you like it. Don't touch code until the plan is solid. A good plan often enables one-shot implementation.

> "If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan."

### 2. Spin Up Parallel Sessions
Run 5 local Claude Code sessions plus 5-10 remote sessions simultaneously. Use git worktrees to avoid conflicts — each session gets its own working directory on the same repo.

> "Spinning up 3-5 git worktrees at once, each running its own Claude session in parallel, is the single biggest productivity unlock."

### 3. Use Specialized Agents
Different phases of development benefit from different "minds":
- **Spec agent**: Requirements and planning
- **Code agent**: Implementation
- **Simplifier agent**: Reduce complexity after initial implementation
- **Reviewer agent**: Adversarial code review ("grill" mode)
- **Verifier agent**: Testing and validation

### 4. Build Verification Loops
Give Claude tools to verify its own work. Browser testing, simulator checks, test suites, bash commands. Verification loops improve quality by 2-3x.

### 5. Maintain Institutional Memory
CLAUDE.md files grow over time. Update them multiple times per week. When Claude makes a mistake, document it. When you find a pattern that works, encode it.

### 6. Use Slash Commands for Repetition
Build `.claude/commands/` for workflows you repeat:
- `/commit-push-pr` — Git workflow automation
- `/test-and-fix` — Run tests, auto-fix failures
- `/grill` — Adversarial code review
- `/worktree` — Spin up parallel sessions

### 7. Quality Bar Stays Constant
> "Same exact bar applies whether code came from model or human."

Reject substandard AI output. Regenerate rather than fix mediocre code. The quality bar doesn't bend for speed.

---

## Philosophy

> "Someone has to prompt the Claudes, talk to customers, coordinate with other teams, decide what to build next. Engineering is changing and great engineers are more important than ever."

Parallel AI development isn't about replacing engineering judgment — it's about multiplying it. You're a fleet manager, not a typist. Your value is in architecture, planning, quality standards, and user empathy. AI handles implementation.
