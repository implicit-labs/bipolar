# Interface Design

Based on Julian Lehr's "The Case Against Conversational Interfaces" (2025), "A Meta-Layer for Notes" (2020), "Multi-Layered Calendars" (2023), and "Superhuman & the Productivity Meta-Layer" (2020). The philosophy: new interfaces succeed by adding capabilities, not replacing existing ones.

---

## Core Stance

> "Progress rarely follows a simple path of replacement. It unlocks new, previously unimaginable things rather than merely displacing what came before."

The biggest mistake in interface design is zero-sum thinking — assuming new technology must replace what came before. Touch didn't kill the keyboard. Voice won't kill the GUI. AI should complement, not substitute.

---

## The Complementary Principle

**Why conversational interfaces fail as replacements:**
- Speaking: ~150 words per minute
- Typing: ~80 wpm (but with precision, editing, structure)
- Thinking: ~1,000-3,000 wpm
- Natural language is a bottleneck, not a liberation

**When voice/chat AI works (additive):**
- Brainstorming while walking (you couldn't otherwise be productive)
- Ambient assistance during physical tasks
- As a "thinking partner" for ideation
- Summarizing and synthesizing existing content

**When voice/chat AI fails (substitutive):**
- Replacing keyboard shortcuts in power tools (Linear, Figma, Superhuman)
- Complex multi-step workflows where precision matters
- Anything where the user's intent is faster to express through direct manipulation

**Design rule:** Voice/AI should be an always-on command meta-layer spanning multiple tools, not a primary interface for any single tool.

---

## Meta-Layer Thinking

The most powerful interfaces are meta-layers — lightweight overlays that span across existing tools without replacing them.

### Examples

| Meta-Layer | What It Spans | Why It Works |
|------------|--------------|-------------|
| Superhuman | Email, calendar, contacts | Keyboard-driven speed layer over email |
| Spotlight/Raycast | All apps on your Mac | Universal search + action layer |
| Sticky notes | Physical objects, monitors, books | Spatial, contextual, disposable |
| AI assistant | All tools in your workflow | Ambient intelligence across contexts |

### Design Principles for Meta-Layers
1. **Span multiple tools** — The value is in the cross-cutting, not the depth
2. **Surface contextually** — Appear when relevant, disappear when not
3. **Spatial, not chronological** — Attach to objects, not timelines
4. **Lightweight** — Add minimal friction to existing workflows
5. **Keyboard-first** — Speed is the value proposition

---

## Spatial Information Architecture

**The problem with notes, calendars, and most information tools:** They organize by creation time (chronological) rather than by context (spatial).

### Notes Should Be Spatial
- Attach to emails, contacts, bookmarks, calendar events
- Surface automatically when you revisit the context
- Like physical sticky notes — visible where they matter
- Not buried in a chronological feed inside a siloed app

### Calendars Should Be Layered
- Different event types (tasks, meetings, blocked time, activities) as separate layers
- Toggle layers on/off like map layers
- Incorporate retrospective data (sleep, listening, exercise) for pattern recognition
- Bidirectional: planning forward + reflecting backward

### The Limited Real Estate Principle
Screen space is finite and valuable. The most powerful product position is controlling scarce interface real estate:
- Home screen slots (iOS allows ~24)
- Default browser, email client, calendar
- Notification center presence
- Menu bar / status bar items

Whoever controls the real estate sets the default.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Better Alternative |
|---|---|
| Replacing GUIs with chatbots | Add AI as a complementary layer on top of GUIs |
| Chronological feeds for everything | Spatial, contextual organization |
| General-purpose flexibility | Purpose-built tools with strong opinions |
| Siloed note apps | Meta-layer notes that attach to objects across tools |
| Flat calendar grids | Multi-layered calendars with toggleable event types |
| Voice-first interfaces for precision tasks | Voice for ideation + keyboard for execution |
