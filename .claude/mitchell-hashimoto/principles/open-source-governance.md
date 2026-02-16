# Open Source Governance

Based on Mitchell Hashimoto's management of Ghostty, his "vouch" trust system, and his AI disclosure policies. The philosophy: open source faces a transparency crisis, not an AI crisis.

---

## Core Stance

> "Before AI, I might get one bad PR every six months. Now it feels like every other week."

The problem isn't that contributors use AI — it's that they submit AI output without understanding it. The solution is transparency infrastructure, not prohibition.

---

## AI Disclosure Policy

Ghostty requires contributors to disclose AI usage in pull requests. Within weeks, ~50% of PRs disclosed AI use, confirming it's routine. The disclosure requirement:

1. **Normalizes AI usage** — removes stigma, encourages honesty
2. **Surfaces reasoning** — reviewers can ask "did you understand what the AI suggested?"
3. **Preserves learning** — contributors must demonstrate comprehension alongside output
4. **Builds trust** — transparency about tools used increases confidence in contributions

### What Disclosure Looks Like
Contributors must show:
- Prompts used (or describe the process)
- Decisions made on top of AI output
- Corrections applied to AI suggestions
- Understanding demonstrated through code review discussion

---

## Trust Systems

The **vouch** project combats AI-generated low-quality contributions through explicit community trust:
- New contributors need vouches from trusted members to participate
- Trust is earned through demonstrated understanding, not volume of contributions
- Combats "spray and pray" AI-generated PRs that waste maintainer time

---

## Sustainability

Ghostty transitioned to non-profit governance (via Hack Club fiscal sponsorship) to ensure:
- Long-term sustainability without profit extraction
- Community ownership over corporate control
- Transparent financial management
- No pressure to monetize users

---

## Version Control for AI Era

> "If someone wanted to invent a new version control system, this is the biggest opening since Git."

Git lacks infrastructure for:
- Capturing reasoning alongside code changes
- Co-authorship metadata for human-AI collaboration
- Prompt blame (which prompts led to which code)
- Confidence levels in AI-generated sections

The tooling gap between how we write code (increasingly with AI) and how we track code (Git, designed for solo human authors) is widening.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Banning AI in open source | Require transparency about AI usage |
| Reviewing AI output without disclosure | Mandate disclosure so reviewers know what to scrutinize |
| Trust based on contribution volume | Trust based on demonstrated understanding |
| Corporate-owned open source | Non-profit governance for community tools |
| Git blame for AI-assisted code | New metadata for prompts, reasoning, confidence |
