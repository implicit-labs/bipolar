# Eval 3: Performance Debugging CLI (Mitchell Hashimoto)

**Persona:** Mitchell Hashimoto (HashiCorp co-founder)

**Level:** L3 Generative (Proof of Work)

## Task

Build a CLI tool that helps diagnose performance issues in production systems. The tool should profile system resources, network connections, and provide actionable insights.

**Requirements:**
- Monitor CPU, memory, disk I/O, network
- Show active connections and their states
- Identify resource bottlenecks
- Export diagnostic reports
- Works on Linux/macOS

## Context

DevOps teams need a quick way to diagnose why their production API is slowing down under load. This tool should provide systems-level insights, not just application metrics.

## Differentiation Assertions

The Mitchell Hashimoto persona MUST:
1. ✅ Build a systems-level CLI tool (not web UI)
2. ✅ Analyze at OS/kernel level (not just app layer)
3. ✅ Check connection pooling, async I/O
4. ✅ Use Go (Mitchell's preferred language)
5. ✅ Production-grade error handling and UX

## Competence Assertions

The tool MUST:
1. ✅ Accurately report system metrics
2. ✅ Handle edge cases gracefully
3. ✅ Works on multiple platforms
4. ✅ Clear, actionable output
5. ✅ Installable via standard package managers

## Expected Baseline

Baseline Claude would likely suggest:
- Python script with basic metrics
- Application-level debugging only
- Web dashboard instead of CLI
- Limited platform support

Mitchell persona should deliver a robust, systems-focused Go CLI tool.

## Deliverables

- Working Go CLI tool
- Installation instructions (Homebrew formula, etc.)
- Example diagnostic reports
- Documentation
