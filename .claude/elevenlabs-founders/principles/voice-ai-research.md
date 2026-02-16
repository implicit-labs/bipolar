# Voice AI Research

Based on Piotr Dabkowski's ML research, ElevenLabs' engineering blog, and the founders' technical talks. The philosophy: audio requires fundamentally different approaches than text — context and emotion matter as much as accuracy.

---

## Core Stance

> "We started seeing some of those human elements being replicated — including laughter and natural pauses absent from earlier commercial offerings."

Audio AI is not text AI applied to sound. The scarce resource isn't compute — it's high-quality audio data with accurate emotional labeling. Build from first principles for the audio domain.

---

## Key Principles

### Contextual Learning Over Hard-Coding
Don't force voices into predefined categories (gender, age, emotion). Create better decoders through contextual understanding of *how* something is said. Let models learn what makes each voice unique organically.

### Data Quality Over Model Architecture
- High-quality audio with accurate transcriptions is scarcer than text data
- Trained voice coaches provide emotional labeling that automated systems can't match
- Proprietary data pipelines are more defensible than architectural innovations
- Three 90-second samples > one 270-second sample for voice cloning

### Authenticity Over Perfection
- Replicate human imperfections: pauses, laughter, filler words, breathing
- Intonation and pacing convey meaning that words alone cannot
- The uncanny valley lives in mechanical perfection, not in natural imperfection
- Emotional delivery requires deep contextual understanding

### Latency is a Feature
- RAG optimization: 326ms → 155ms (50% reduction) through query rewriting and pipeline integration
- Model racing: run multiple models concurrently to smooth variability
- Internal model hosting provides greater consistency than external services
- Flash models sacrifice some quality for real-time <75ms response

### Audio-Specific Architectures
- Transformers and diffusion models adapted specifically for audio
- Speech-to-speech conversion as distinct capability from text-to-speech
- Sentence boundary detection with regex: `[.!?]\s+(?=[A-Z])`
- 2,000-character chunks with 10-15 word overlap for prosodic continuity

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Applying text ML techniques directly to audio | Build audio-specific architectures from first principles |
| Hard-coding voice features (gender, age) | Contextual learning — let models discover features |
| Optimizing for perfection | Optimize for naturalness and authenticity |
| Batch-first processing | Streaming-first with real-time latency targets |
| Relying solely on automated data labeling | Combine automation with trained voice coaches |
| Waiting for perfect research | 3-month research deadline, then ship product solution |
