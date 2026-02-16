# Building Large Technical Projects

Based on Mitchell Hashimoto's blog post "My Approach to Building Large Technical Projects" and his experience building Ghostty, Terraform, and other major systems.

---

## Steps

### 1. Choose a Realistic Starting Point
Pick an isolated sub-project with a visible result. For Ghostty, this was terminal grid rendering — not the VT parser, not the config system, but something you could see working on screen. The first demo should be achievable in days, not weeks.

### 2. Build to "Good Enough"
Each component only needs to be good enough to enable the next demo. Don't polish. Don't optimize. Don't handle edge cases. Get the demo working, show it to yourself (or others), then move on. Polish comes later through iteration.

> "Do not let perfection be an enemy of progress."

### 3. Target 1-2 Demos Per Week
Demos are the heartbeat of a large project. They maintain motivation, validate direction, and reveal misunderstandings early. If you go more than a week without a working demo, the scope is too large — break it down further.

### 4. Use Automated Testing Early
Write tests from the start. Not for correctness alone — test counts provide psychological momentum. Watching the number climb gives tangible evidence of progress even during grind phases. Tests also catch regressions as you iterate.

### 5. Dogfood Immediately
Adopt your own software as soon as it's minimally functional. Whether something *feels good* matters more than whether it's fully functional. Real usage reveals priorities that planning can't anticipate.

### 6. Iterate Based on Usage
Once you're using your own tool daily, let real friction drive the roadmap. The bugs that bother you most are the bugs that matter most. Ship consistently rather than perfectly — compound growth through daily improvements.

---

## Philosophy

> "I'm always more motivated working on a problem I'm experiencing myself."

The core insight is that motivation is the bottleneck for large projects, not technical skill. Visible progress, demos, test counts, and dogfooding are all motivation systems disguised as engineering practices. Protect your motivation ruthlessly.
