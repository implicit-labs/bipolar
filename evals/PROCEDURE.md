# Persona Evaluation Procedure

## Overview

This document describes how to design, run, judge, and present evaluations that prove personas provide meaningfully different and technically competent guidance compared to baseline Claude.

## Evaluation Philosophy

**Core principle**: Personas are "skill packages" that should give characteristically different answers while maintaining technical correctness.

**Dual assertion model** (adapted from SWE-bench):
- **Differentiation assertions** (fail-to-pass): Things the persona MUST do differently than baseline
- **Competence assertions** (pass-to-pass): Things the persona must still get right

**An eval passes only if BOTH scores are 100%.**

---

## Designing Evals

### 1. Choose the Right Level

**L1: Philosophy Recall** (Q&A about known positions)
- Direct questions about the person's stated views
- Example: "Should we adopt TypeScript?" (to DHH)
- Easy to judge, but doesn't prove application skills

**L2: Applied Judgment** (Review/critique/architecture decisions)
- Code review tasks
- Architecture choice scenarios
- Debugging/diagnosis challenges
- Example: "Review this PR with Enzyme tests"

**L3: Generative Tasks** (Build something)
- Real implementation work
- Example: "Build a task list app"
- Hardest to judge, but strongest proof of work
- Preferred for showcasing personas

**L4: Cross-Persona Contrast** (Same question, different personas)
- Gives same question to multiple personas
- Example: "Why do we write tests?" to 5 different personas
- Proves personas are genuinely different from each other

**L5: Multi-Turn Consistency** (Conversation over time)
- Extended dialogue, multiple follow-ups
- Tests if persona maintains voice and principles
- Not yet implemented

### 2. Define Differentiation Assertions

For each persona, list specific things they MUST do differently:

**Example (DHH on "build a chat feature"):**
- ✅ MUST recommend Hotwire Turbo Streams (not React)
- ✅ MUST use Action Cable for WebSockets
- ✅ MUST keep it server-rendered
- ✅ MUST argue against SPA approach
- ✅ MUST use Rails conventions (broadcasts_to, etc.)

If persona matches baseline Claude's answer, it fails differentiation.

### 3. Define Competence Assertions

List technical correctness requirements:

**Example (same eval):**
- ✅ Solution actually works (testable code)
- ✅ Real-time updates function correctly
- ✅ Handles connection drops gracefully
- ✅ Scales to reasonable load (100+ concurrent users)
- ✅ Doesn't introduce security vulnerabilities

If persona breaks basic correctness to be opinionated, it fails competence.

### 4. Design for Observable Output

Best evals produce artifacts that can be shown on the website:

**Preferred outputs:**
- Working code (hosted as live demo)
- Visual comparisons (bundle size, performance charts)
- Git commit history (for TDD process evals)
- Before/after code snippets (for refactoring evals)
- Explanation documents (for debugging/architecture evals)

**Avoid:**
- Pure text responses with no artifacts
- Subjective judgments with no measurable criteria

---

## Running Evals

### Step 1: Run Persona Agent

```bash
# Use Task tool with general-purpose agent
# Provide task WITHOUT revealing it's an eval
```

**Key principles:**
- Don't tell the persona it's being evaluated
- Provide realistic context (e.g., "you're helping a team build X")
- Use subagents to avoid conversation context contamination
- For generative tasks, use Claude Code subagents for full implementation

**Example prompt:**
```
You're helping a development team add real-time notifications to their Rails app.
The app tracks project updates and users should see live updates without refreshing.

Build this feature following Rails best practices.
```

### Step 2: Run Baseline Claude

Run the EXACT same prompt with baseline Claude (no persona active).

**Purpose**: Establish what a "generic" answer looks like so we can measure differentiation.

### Step 3: Capture Full Output

For each run, save:
- Complete response text
- Any code generated
- File structure (if implementation)
- Execution output (if runnable)
- Response metadata (tokens, time, model)

Save to: `evals/results/eval{N}-{persona-slug}-persona.md` and `eval{N}-baseline.md`

---

## Judging Evals

### Option 1: Manual Judging

Review both outputs against assertions:

**Differentiation checklist:**
```
For each differentiation assertion:
- [ ] Did persona do this differently than baseline? (PASS/FAIL)
- [ ] Evidence: [quote or artifact showing difference]
```

**Competence checklist:**
```
For each competence assertion:
- [ ] Did persona maintain technical correctness? (PASS/FAIL)
- [ ] Evidence: [test output, verification, or technical analysis]
```

**Scoring:**
- Differentiation score: (passed assertions / total assertions) × 100%
- Competence score: (passed assertions / total assertions) × 100%
- Overall: PASS only if both are 100%

### Option 2: LLM Judge (Automated)

Use a judge agent with this template:

```
You are evaluating whether an AI persona is working effectively on a real task.

**Person being emulated:** {name}
**Task:** {eval description}

**Persona output:**
{persona response}

**Baseline output:**
{baseline response}

**Differentiation assertions to check:**
{list of things persona MUST do differently}

**Competence assertions to check:**
{list of things persona must still get right}

For each assertion, respond:
PASS or FAIL — one sentence explaining why.

Then overall:
DIFFERENTIATION_SCORE: {passed}/{total}
COMPETENCE_SCORE: {passed}/{total}
EVAL_RESULT: PASS (both 100%) or FAIL
```

Save judge output to: `evals/results/eval{N}-{persona-slug}-scores.md`

### Handling Edge Cases

**Partial credit?** NO. Assertions are binary. If it's ambiguous, refine the assertion.

**What if baseline gets it "right"?** If baseline Claude already recommends the persona's approach, the eval doesn't prove differentiation. Design a different eval where baseline diverges.

**What if persona is technically wrong but "in character"?** FAIL. Competence is non-negotiable. Being opinionated doesn't excuse incorrectness.

---

## Presenting Results

### 1. Summary Stats (for website)

For each eval, compute:
```
{N}/{N} personas tested
{N}% pass rate
{total_score}/{possible_score} total score
```

### 2. Individual Persona Results

Show per persona:
- Differentiation score (X/Y assertions)
- Competence score (X/Y assertions)
- Overall: ✅ PASS or ❌ FAIL
- Key differentiators (what they did uniquely)

### 3. Artifacts & Demos

**For L3 Generative evals:**
- Host live demos (like eval2-demos/)
- Link to source code on GitHub
- Show comparison metrics (bundle size, LOC, performance)

**For L2 Applied Judgment evals:**
- Show before/after code snippets
- Display critique/recommendations
- Highlight persona-specific insights

**For L4 Cross-Persona Contrast:**
- Side-by-side comparison grid
- Similarity scores between persona pairs
- Visualization of philosophical differences

### 4. Update Website

Add section to `index.html`:

```html
<div class="section-card">
  <h3>Eval {N}: {Title}</h3>
  <p>Task: <em>{description}</em></p>
  <div class="eval-results">
    <div class="eval-stat">
      <div class="eval-stat-num">{N}/{N}</div>
      <div class="eval-stat-label">Personas Tested</div>
    </div>
    <div class="eval-stat">
      <div class="eval-stat-num">{pass_rate}%</div>
      <div class="eval-stat-label">Pass Rate</div>
    </div>
  </div>
  <p>Summary: {what happened, key differences}</p>
  <div>
    <!-- Links to demos/artifacts -->
  </div>
</div>
```

---

## Eval Workflow Checklist

### Design Phase
- [ ] Choose eval level (L1-L5)
- [ ] Write clear task description
- [ ] Define 5 differentiation assertions
- [ ] Define 5 competence assertions
- [ ] Identify what artifacts/output to capture
- [ ] Create eval document in `evals/eval{N}-{name}.md`

### Execution Phase
- [ ] Run persona agent with task (no eval context)
- [ ] Run baseline Claude with same task
- [ ] Capture full outputs for both
- [ ] Save to `evals/results/eval{N}-{persona}-persona.md`
- [ ] Save to `evals/results/eval{N}-baseline.md`

### Judging Phase
- [ ] Review outputs against differentiation assertions
- [ ] Review outputs against competence assertions
- [ ] Compute differentiation score
- [ ] Compute competence score
- [ ] Determine PASS/FAIL (both must be 100%)
- [ ] Save scores to `evals/results/eval{N}-{persona}-scores.md`

### Presentation Phase
- [ ] Generate/host any live demos or artifacts
- [ ] Create summary statistics
- [ ] Update website with eval section
- [ ] Link to source code/demos
- [ ] Commit with message: `feat: add Eval {N} results`

---

## Evaluation Matrix Template

Use this to plan evals across all personas:

| Persona | Eval Type | Task | Key Differentiator | Artifact |
|---------|-----------|------|-------------------|----------|
| DHH | L3 Generative | Build real-time chat | Hotwire, no React, server-rendered | Live demo |
| Guillermo | L3 Generative | Deploy with previews | Vercel, RSC, instant deploys | Deployment URLs |
| Kent Beck | L3 Generative | Shopping cart via TDD | Red-green-refactor commits | Git history |
| ... | ... | ... | ... | ... |

For each persona, ask:
1. What would they do that baseline Claude wouldn't?
2. How can we make that visible/measurable?
3. What output proves the difference?

---

## File Structure

```
evals/
├── PROCEDURE.md              # This file
├── task-based-v1.md          # Task-based eval designs (L2)
├── eval1-setup-web-project/  # Eval 1: Stack recommendations
│   ├── prompt.md
│   ├── results/
│   │   ├── eval1-raw-responses.md
│   │   └── eval1-scores.md
├── eval2-task-list/          # Eval 2: Build task list app
│   ├── prompt.md
│   ├── dhh/
│   │   ├── implementation/   # Full Rails app
│   │   └── approach.md
│   ├── guillermo/
│   │   ├── implementation/   # Full Next.js app
│   │   └── approach.md
│   └── rich-harris/
│       ├── implementation/   # Full SvelteKit app
│       └── approach.md
└── eval{N}-{name}/           # Future evals follow same pattern
```

---

## Quality Standards

### Good Eval Characteristics
✅ Clear, unambiguous task
✅ Realistic scenario (not contrived)
✅ Produces observable artifacts
✅ Baseline Claude gives a different answer
✅ Competence is measurable (tests pass, code runs, etc.)
✅ Results can be shown on website

### Bad Eval Characteristics
❌ Subjective judgment calls
❌ "Gotcha" questions with no right answer
❌ Tasks that are too easy (baseline already perfect)
❌ Tasks that are too hard (no persona can complete)
❌ No way to measure differentiation
❌ Pure philosophy questions with no application

---

## Example: Full Eval Walkthrough

### Eval 2: Build a Task List App

**Level:** L3 Generative

**Task:**
> Build a simple task list with add/delete/mark complete functionality. Make it production-ready.

**Target personas:** DHH, Guillermo Rauch, Rich Harris

**Differentiation assertions (DHH):**
- Uses Rails + Hotwire (not React/Next.js)
- Server-rendered HTML only
- Zero custom JavaScript written
- Uses SQLite with Rails defaults
- Broadcasts model changes for real-time

**Competence assertions (DHH):**
- App actually runs and works
- Tasks persist to database
- Real-time updates function
- Code follows Rails conventions
- Production-deployable

**Execution:**
1. Spawned 3 Claude Code subagents (DHH, Guillermo, Rich)
2. Each built complete implementation
3. Saved full codebases to `eval2-task-list/{persona}/implementation/`

**Judging:**
- DHH: 5/5 differentiation, 5/5 competence = PASS
- Guillermo: 5/5 differentiation, 5/5 competence = PASS
- Rich: 5/5 differentiation, 5/5 competence = PASS

**Presentation:**
- Created static demos at `eval2-demos/{persona}/index.html`
- Hosted live on GitHub Pages
- Added to website with stats: 3/3 personas, 8,160 lines, 65 files
- Links to both source code and live demos

**Result:** ✅ Successful eval proving personas build radically different implementations of the same task.

---

## Meta: Evaluating the Evals

Periodically review whether evals are effective:

**Good signals:**
- Personas consistently differentiate from baseline
- Differences are visible and meaningful
- Community finds evals convincing
- Evals expose persona weaknesses (helps improve prompts)

**Bad signals:**
- All personas converge to same answer
- Baseline already gives persona-style answer
- No measurable difference in output
- Evals feel contrived or unrealistic

When evals fail to differentiate, either:
1. The persona prompt needs improvement, OR
2. The eval task isn't opinionated enough

Iterate on both until differentiation emerges naturally.

---

## Future Eval Ideas

- **Code review marathon** - Each persona reviews the same PR
- **Refactoring challenge** - Improve the same messy codebase
- **Architecture decision** - Design system for specific requirements
- **Teaching task** - Explain same concept to a beginner
- **Debugging race** - Fix the same production bug
- **Performance audit** - Optimize the same slow app
- **API design** - Create API for the same domain
- **Test coverage** - Add tests to untested code

The best evals have real-world applicability and produce artifacts developers can actually use or learn from.
