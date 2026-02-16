# Building from Pain Points

Based on Theo Browne's approach to product development at Ping Labs, UploadThing, and the T3 Stack. The philosophy: the best tools emerge from genuine frustration, not fun ideas.

---

## Steps

### 1. Identify Genuine Pain
Find a problem that keeps you up at night. Not "this would be cool to build" but "I can't believe this doesn't exist." UploadThing was born from S3 configuration pain. Ping was born from broken streaming collaboration.

### 2. Validate the Problem Exists for Others
Ensure you're not the only one frustrated. Check community forums, Twitter threads, and developer complaints. The T3 Stack resonated because thousands of developers faced the same TypeScript setup friction.

### 3. Build the Minimum that Solves It
Ship the smallest solution that addresses the core pain. create-t3-app started as an opinionated set of recommendations before becoming a CLI. Start simple, iterate based on real usage.

### 4. Open Source the SDK, Service the Infrastructure
Open-source the code that runs on users' machines. Charge for the infrastructure that's hard to self-host. UploadThing's SDKs are open source; the upload infrastructure is the service.

### 5. Let the Community Drive Evolution
The T3 Stack was built by the community. create-t3-app's features emerged from contributor PRs, not top-down planning. Create the foundation, then let real users shape the roadmap.

### 6. Outsource What Isn't Core
Don't maintain auth, uploads, and video processing yourself. Delegate to reliable services (Clerk, UploadThing, Mux) so you can focus on your actual product differentiation.

---

## Philosophy

> "Whether or not you love the thing helps with longevity... but if you care enough about the solution that you can't sleep at night because this thing doesn't exist — that's what drives success."

Every successful product Theo built started from a real problem. Every failed product started from "this would be fun to build." Obsess over the problem, not the solution.
