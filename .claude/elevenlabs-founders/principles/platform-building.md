# Platform Building

Based on ElevenLabs' developer ecosystem strategy, Mati Staniszewski's talks on scaling, and the company's open-source presence. The philosophy: the developer experience IS the product for a platform company.

---

## Core Stance

> "Engineering talent belongs everywhere, not just on product teams."

Building a voice AI platform isn't just about models — it's about the full stack: SDKs, documentation, example apps, integrations, and developer community. Models will commoditize; the platform won't.

---

## Key Principles

### Progressive Disclosure of Complexity
Three layers of API access, each serving different developer needs:
1. **High-level hooks** — React/React Native components, one-line integration
2. **Mid-level SDKs** — Python, JavaScript, Swift, Kotlin, Flutter clients
3. **Low-level APIs** — REST endpoints, WebSocket streams, raw audio

Start developers at the highest level that works for them. Let them drop down only when they need control.

### Multi-Platform Parity
Official SDKs for all major platforms (Python, JS, Swift, Kotlin, Flutter) with community SDKs for niche languages (Java, PHP, Go). Every platform gets first-class support, not afterthought wrappers.

### Sensible Defaults, Full Control
- Environment variable configuration (`ELEVENLABS_API_KEY`)
- 60-second timeout defaults, 2 retry attempts
- Async-first with sync alternatives
- Streaming-native as first-class feature
- Automatic retry with exponential backoff

### Developer Experience as Product Design
- MCP server for Claude Desktop, Cursor, and Windsurf integration
- Component library (shadcn/ui-based) for building agent UIs
- Examples repository with real-world integrations
- Voice Marketplace as both product and developer ecosystem

### Prosumer-to-Enterprise Pipeline
Release to prosumers → observe unexpected use cases → learn product-market fit → deploy to enterprise. Bottom-up adoption creates demand that enterprise sales can harvest.

---

## SDK Design Patterns

### Client Architecture
```
Main client → lazy-loaded service clients as properties
client.text_to_speech.convert()  # Modular, discoverable
client.voice.clone()             # Property-based access
```

### Streaming Pattern
```
# Python: Generator yields chunks
audio_stream = client.text_to_speech.stream(text="...", voice_id="...")

# TypeScript: Async iterable
for await (const chunk of stream) { /* process */ }
```

### Event-Driven Agents
Comprehensive event system for session lifecycle — connection, speech start/end, tool calls, errors. React hooks (`@elevenlabs/react`) wrap the complexity.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Ship model, add SDK later | SDK and docs ship with model launch |
| Single-language SDK | Multi-platform parity from day one |
| Configuration-heavy setup | Sensible defaults with env var config |
| Batch-only APIs | Streaming-first with batch as alternative |
| Enterprise-first sales | Prosumer adoption → enterprise demand |
| Closed ecosystem | Open-source components, community SDKs |
