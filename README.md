# Agent Personas

Curating skills for yourself is a tedious and difficult process. You have to read through individual skill files, understand what each one does, figure out which combinations work together, and hope you assembled the right set.

We want to make this easy by packaging skills into **people**. Instead of picking 15 individual skill files, you pick a persona — "DHH" or "Kent C. Dodds" or "Mitchell Hashimoto" — and you immediately understand what kind of guidance you're going to get without worrying about every single little skill section.

**Research a person. Extract their philosophy. Generate an AI persona. Test it.**

## How it works

```
Name → 3 research agents → Synthesize → Confirm → Persona folder → Test
```

1. **Input**: A name. Optionally a domain and GitHub handle.
2. **Research**: Three parallel agents search simultaneously — background & philosophy, GitHub & open source, content & teaching.
3. **Output**: A persona folder with philosophy, workflows, principles, and calibration tests.
4. **Test**: Run the persona through evaluations to verify it actually changes Claude's behavior in the right direction.

## The problem with current evaluation

Our current testing only validates **philosophy recall** — can the persona answer 8 questions correctly? That proves it *knows* things, not that it *changes behavior* during real work.

A persona is only valuable if it:
1. **Changes Claude's output** in the right direction (opinionated, not generic)
2. **Doesn't degrade Claude's competence** (still factually correct)
3. **Holds character** across a real session (not just one Q&A)

## Evaluation levels

| Level | What it tests | Status |
|-------|--------------|--------|
| **L1: Philosophy recall** | Can the persona answer Q&A about the person's known positions? | Done — 8 calibration questions per persona |
| **L2: Applied judgment** | Given a code review or architecture decision, does the persona apply the philosophy? | Next |
| **L3: Generative tasks** | Ask the persona to build something — does the output reflect the philosophy? | Next |
| **L4: Cross-persona contrast** | Same prompt, different personas — do you get meaningfully different AND correct output? | Next |
| **L5: Multi-turn consistency** | Does the persona hold character over a full working session? | Planned |

## What makes this different from generic benchmarks

Existing persona benchmarks (PersonaGym, CharacterBench, InCharacter) test whether an LLM can act like a generic persona description — "36-year-old environmental lawyer." We test whether the persona produces the **specific opinion this real person holds** and whether it's **distinguishable from baseline Claude**.

The key insight from SWE-bench: **fail-to-pass / pass-to-pass dual testing**.

- **Differentiation tests** (fail-to-pass): Questions where the persona MUST give a different answer than baseline Claude. "Should I use TypeScript?" → DHH says no. If the persona gives a balanced answer, it fails.
- **Competence tests** (pass-to-pass): Questions where the persona should still be factually correct. "What is TypeScript?" → DHH should describe it accurately even though he'd argue against using it.

A persona passes when it changes opinions in the right direction without degrading knowledge.

## Scoring

Per test case, three independent binary criteria:

1. **Opinion correctness**: Does the answer match the known position?
2. **Distinctiveness**: Is this answer meaningfully different from baseline Claude?
3. **Authenticity**: Would someone familiar with this person recognize this as their position?

## Personas

| Persona | Domain | L1 Score |
|---------|--------|----------|
| Guillermo Rauch | Next.js, Vercel, DX | 98% |
| ElevenLabs Founders | Voice AI, Audio ML | 98% |
| Evan You | Vue.js, Vite, Tooling | 98% |
| Rich Harris | Svelte, Compilers, Web | 100% |
| Theo Browne | T3 Stack, TypeScript, Full-stack | 100% |
| Tanner Linsley | TanStack, Headless UI, Type Safety | 98% |
| Simon Willison | Python, SQLite, AI Tools | 100% |
| DHH | Rails, Monoliths, Hotwire | 100% |
| Pieter Levels | Indie Hacking, PHP, Solo Founder | 100% |
| Kent C. Dodds | React Testing, Epic Web, Education | 100% |
| Julian Lehr | Product Strategy, Storytelling | 87% |
| Antoine van der Lee | iOS, Swift | 92% |
| Emil Kowalski | Design Engineering | 100% |
| Mitchell Hashimoto | Systems, Terminal, Zig | 100% |
| Boris Cherny | TypeScript, Claude Code | 100% |

## Built with

- `/agent-persona` — research and generate personas
- `/persona-test` — evaluate personas against calibration tests

## Site

https://implicit-labs.github.io/bipolar/
