# Systems Architecture

Based on Mitchell Hashimoto's Ghostty architecture, libxev, and HashiCorp product design. The philosophy: platform-native where users see it, shared core where they don't.

---

## Core Stance

> "Terminal emulators are built on a shaky historical foundation we need to throw away."

Don't inherit broken assumptions. Question every legacy constraint. Build the right architecture even if it means more work upfront — structural problems compound while polish problems don't.

---

## Platform-Native + Shared Core

The Ghostty architecture demonstrates the pattern:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Core logic | Zig (C-ABI library) | Terminal emulation, VT parsing, rendering |
| macOS UI | Swift / AppKit | Native macOS experience |
| Linux UI | GTK4 / Zig | Native Linux experience |
| Shared code | ~90%+ | Cross-platform without cross-platform frameworks |

### Why This Works
- Each platform gets native conventions (keybindings, window management, system integration)
- Core logic is written once and tested extensively
- C-ABI boundary means any language can consume the library
- No Electron, no cross-platform UI toolkit, no compromises

### Context-Aware Defaults
Different platforms deserve different defaults. Ghostty uses different keybindings on macOS vs. Linux because that's what users on each platform expect. One-size-fits-all defaults disrespect the platform.

---

## C-ABI as Universal Interface

Expose core functionality through C-compatible APIs for maximum portability:
- Any language with FFI can consume C APIs
- No runtime dependencies (no Go runtime, no Rust stdlib)
- Stable ABI across versions
- Enables embedding (libghostty can be embedded in any application)

---

## Zero-Allocation Design

For performance-critical code, design APIs that avoid runtime allocations:
- Caller-provided buffers
- Comptime-known sizes where possible
- Predictable performance for embedded and real-time contexts
- Zig's comptime enables zero-cost abstractions

---

## Event Loop Architecture

Use the proactor model (notification of completion) over reactor model (notification of readiness):
- Better maps to io_uring on Linux
- Naturally supports high-throughput I/O
- libxev provides cross-platform abstraction over io_uring, kqueue, epoll

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| Electron / cross-platform UI | Platform-native UI + shared core |
| Runtime-heavy FFI (Go, Rust) | C-ABI with no runtime dependencies |
| Reactor model I/O | Proactor model (io_uring-style) |
| Inheriting legacy constraints | Question and rebuild foundations |
| One-size-fits-all defaults | Context-aware defaults per platform |
| Monolithic application | Library core + thin platform shells |
