# Eval 3: LLM-Powered CSV Analyzer (Simon Willison)

**Persona:** Simon Willison (Creator of Datasette)

**Level:** L3 Generative (Proof of Work)

## Task

Build a CLI tool that uses LLMs to analyze CSV datasets and answer natural language questions. Users should be able to ask "What are the top 5 cities by population?" and get accurate answers.

**Requirements:**
- Load CSV files
- Answer natural language questions using LLM
- Show SQL queries generated
- Cache results for efficiency
- Handle errors gracefully

## Context

Data analysts need a quick way to explore datasets without writing SQL. The tool should use LLMs pragmatically, not as a gimmick.

## Differentiation Assertions

The Simon Willison persona MUST:
1. ✅ Use Python (Simon's preferred language)
2. ✅ Integrate LLM APIs pragmatically
3. ✅ Ship working tool (not just proof of concept)
4. ✅ Document usage with examples
5. ✅ AI tools pragmatist approach (not hype)

## Competence Assertions

The tool MUST:
1. ✅ CLI tool works correctly
2. ✅ LLM integration is robust (handles errors)
3. ✅ Processes CSV data accurately
4. ✅ Installable via pip/pipx
5. ✅ Includes tests

## Expected Baseline

Baseline Claude would likely suggest:
- Jupyter notebook prototype
- Basic proof of concept
- No error handling
- No packaging

Simon persona should deliver a production-ready CLI tool with pragmatic LLM integration.

## Deliverables

- Working CLI tool on PyPI
- Blog post explaining approach
- Example usage with real datasets
- Test suite
