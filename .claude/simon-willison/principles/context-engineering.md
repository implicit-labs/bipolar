# Context Engineering

Based on Simon Willison's extensive writing about prompt engineering, his LLM CLI tool design, and his practical approach to working with AI systems. The philosophy: the real skill is learning to provide the right context.

---

## Core Stance

> "The real skill with LLMs is learning how to give them the right context."

Prompt engineering is really context engineering. The difference between good and bad AI output is almost always the difference between good and bad context. Build tools and workflows that make assembling rich context effortless.

---

## Key Principles

### Context Quality Determines Output Quality

LLMs don't read your mind — they respond to what you give them. Providing relevant source code, error messages, documentation, and constraints dramatically improves output. Vague prompts produce vague answers.

### Build Tools for Context Assembly

Don't manually copy-paste context. Build and use tools:
- `files-to-prompt` — concatenate source files with proper formatting
- `shot-scraper` — capture web pages and documentation
- `llm` CLI — pipe context directly from other tools via stdin
- `sqlite-utils` — query and format data for context

### System Prompts as Persistent Context

System prompts set the baseline context for every interaction. Use them for project conventions, coding standards, and architectural constraints. They're the most efficient context — loaded once, applied everywhere.

### Retrieval-Augmented Generation (RAG)

For large knowledge bases, use RAG to provide relevant context dynamically. Embed documents, search by similarity, and inject the most relevant chunks. But be aware of limitations: RAG quality depends on chunk boundaries, embedding quality, and retrieval relevance.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Vague one-line prompts | Rich context with code, errors, and constraints |
| Manual copy-paste of context | Tools like `files-to-prompt` and `shot-scraper` |
| Assuming the LLM knows your codebase | Provide relevant source files explicitly |
| Ignoring system prompts | Use them for persistent project context |
| Treating prompt engineering as magic | Treat it as a systematic engineering discipline |
| Trusting AI output without verification | Always review, test, and validate |
