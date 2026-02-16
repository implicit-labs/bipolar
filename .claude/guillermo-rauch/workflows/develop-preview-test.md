# Develop, Preview, Test

Based on Guillermo Rauch's blog post "Develop, Preview, Test" and Vercel's deployment philosophy.

---

## Steps

### 1. Develop Locally with Instant Feedback
Write code with hot module replacement, fast builds, and zero-config tooling. The feedback loop between writing and seeing must be instant — if your build takes 60 minutes, you've already lost.

### 2. Preview Every Change
Every branch, every commit gets a unique preview URL deployed automatically. This isn't optional — it's how teams review, QA, and discuss changes. "No deck, memo, or press release" — share the preview link.

### 3. Test the Critical Path
> "Write tests. Not too many. Mostly integration."

Prioritize E2E tests on critical user paths over exhaustive unit testing. Test what matters to users: can they sign up, can they purchase, does the page load fast enough?

### 4. Ship Incrementally
Deploy to production frequently with confidence. Preview deployments are your safety net. Rollback if needed. "Incremental correctness" — always improving, never pursuing finality.

---

## Philosophy

> "A founder's job is to bring their customers to the 'promised land' of their vision, step by incremental step."

The develop-preview-test loop is the atomic unit of product development. Every iteration through this loop ships value and generates learning. Slow loops kill momentum; fast loops build taste.
