# Production Deployment

Based on ElevenLabs' API documentation, engineering blog, and production best practices for voice AI at scale.

---

## Steps

### 1. Choose Your API Architecture
- **REST**: Batch processing, audiobooks, complete files
- **Streaming (SSE)**: Progressive delivery, immediate playback start
- **WebSocket**: Lowest latency, bidirectional, dynamic real-time scenarios

### 2. Implement Resilient Error Handling
- **400/401/403/422** (non-retriable): Fix request, don't retry
- **429 too_many_concurrent_requests**: Implement request queuing
- **429 system_busy**: Exponential backoff (1s → 32s with jitter)
- Use circuit breaker pattern during outages

### 3. Optimize Request Pipeline
- Pre-flight validation: check text length against model limits
- Long-form content: 10-15 word overlap between chunks for prosodic continuity
- 2,000-character chunks for consistent latency
- Monitor concurrency limits by tier

### 4. Manage WebSocket Connections
- Default timeout: 20 seconds inactivity
- Implement keep-alive (periodic space character)
- Connections during speech/playback don't consume concurrency
- State preservation for reconnection scenarios

### 5. Optimize for Latency
- Target <300ms for conversational AI
- Use model racing: run multiple models concurrently to smooth variability
- Host models internally for consistency vs. externally-hosted
- Query rewriting: collapse dialogue history into precise, self-contained queries

### 6. Monitor and Scale
- Track p99 latency, not just averages
- 600+ hours of generated audio per hour of real time is the benchmark
- Forward-deployed engineers work with enterprise customers on-site for scaling challenges

---

## Philosophy

> "Models will commoditize over time. Defensibility comes from full-stack product, integrations, and data quality."

Production deployment isn't an afterthought — it's where the real product lives. The difference between a demo and a product is latency, reliability, and graceful degradation at scale.
