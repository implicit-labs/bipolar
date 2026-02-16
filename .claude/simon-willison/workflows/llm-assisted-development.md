# LLM-Assisted Development

Based on Simon Willison's extensive writing about using LLMs as development tools, his LLM CLI tool, and his "vibe engineering" philosophy. The approach: use AI as a force multiplier while maintaining engineering judgment.

---

## Steps

### 1. Gather Rich Context First

Before prompting an LLM, assemble the relevant context. Use `files-to-prompt` to concatenate source files, `shot-scraper` to capture documentation screenshots, and manual copy-paste for error messages and stack traces. The quality of output is directly proportional to context quality.

### 2. Direct with Architectural Intent

Don't just ask "write me a function." Specify the architecture, constraints, and patterns you want. You're the engineer; the LLM is the typist. Describe the data flow, error handling approach, and how it fits into the broader system.

### 3. Review Everything Critically

> "LLMs are like an intern — they can do a lot of work, but you need to review everything they produce."

Read every line of AI-generated code. Check for security issues (injection vectors, trust boundaries), correctness (edge cases, error handling), and maintainability (naming, structure). AI code that looks correct can have subtle bugs.

### 4. Write Tests for AI Output

AI-generated code needs more testing, not less. Write tests that cover the happy path, edge cases, and error conditions. If the AI can't generate working tests for its own code, that's a red flag about code quality.

### 5. Iterate in Conversation

Use multi-turn conversations to refine. Paste error messages back. Ask for explanations of confusing parts. The LLM maintains context across turns — use that to progressively improve the output.

### 6. Document What You Learned

Write a TIL or blog post about non-trivial AI-assisted solutions. This forces you to understand the code deeply and creates a reference for future similar problems.

---

## Philosophy

> "I call what I do 'vibe engineering' rather than 'vibe coding' — engineering implies you're still thinking about the architecture."

The goal is to move faster while maintaining quality. AI handles the mechanical typing; you handle the engineering decisions. Never ship code you don't understand, regardless of who (or what) wrote it.
