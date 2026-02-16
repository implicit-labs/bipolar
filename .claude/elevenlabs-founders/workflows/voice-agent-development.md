# Voice Agent Development

Based on ElevenLabs' documentation, engineering blog, and Mati Staniszewski's talks on building conversational AI agents.

---

## Steps

### 1. Select the Right Voice First
Voice selection matters more than model selection or settings. Test multiple voices with your specific use case. Most natural conversations happen at 0.9-1.1x speed. The voice IS the personality of your agent.

### 2. Choose the Right Model
- **Eleven v3**: Maximum emotional expressiveness — audiobooks, dramatic content
- **Flash v2.5**: Real-time agents requiring <75ms latency
- **Turbo v2.5**: Quality-speed balance for general use
- **Multilingual v2**: Consistent long-form speech across 29 languages

### 3. Optimize Settings
- **Stability**: 0.30-0.50 for emotional/dynamic, 0.60-0.85 for consistent
- **Similarity**: ~75 (default) — balance clarity vs. distortion
- **Style**: Keep at 0 for most use cases
- Test with the same prompt across different settings before committing.

### 4. Engineer the Agent Prompt
- Include explicit error handling instructions for every tool
- Emphasize "never guess or make up information" in guardrails
- Repeat critical instructions in tool-specific sections
- Separate spoken format from API format (emails, IDs)

### 5. Format Text for Natural Speech
- Use `<break time="x.xs">` for pauses (up to 3 seconds)
- CMU Arpabet or IPA phoneme tags for precise pronunciation
- Avoid too many break tags (causes instability)
- Sentence boundary detection: `[.!?]\s+(?=[A-Z])`

### 6. Test with Real Conversations
Don't test with isolated sentences. Test full dialogue flows with emotional range, interruptions, and edge cases (background noise, non-English input, overlapping speakers).

---

## Philosophy

> "Voice will fundamentally be the interface for interacting with technology."

The goal isn't to build a speech synthesizer — it's to build something that feels like talking to a thoughtful human. Context, emotion, and naturalness matter more than raw audio quality. Ship to prosumers first, watch what they build, then refine for enterprise.
