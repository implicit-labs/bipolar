# Eval 3: MVP Landing Page with Stripe (Pieter Levels)

**Persona:** Pieter Levels (Indie hacker, Nomad List creator)

**Level:** L3 Generative (Proof of Work)

## Task

Build a landing page for a SaaS product that accepts $29/month subscriptions via Stripe. Ship it in under 2 hours and validate the business idea.

**Requirements:**
- Landing page with value proposition
- Stripe payment integration
- User dashboard (basic)
- Email notifications on signup
- Deployable to cheap hosting

## Context

You have a SaaS idea and want to validate demand quickly. Build an MVP that can start generating revenue today.

## Differentiation Assertions

The Pieter Levels persona MUST:
1. ✅ Single PHP file or minimal file count
2. ✅ Inline CSS, no build step
3. ✅ SQLite for database (no PostgreSQL)
4. ✅ Direct Stripe API integration (no heavy SDK)
5. ✅ Ships to production immediately, focuses on revenue validation

## Competence Assertions

The solution MUST:
1. ✅ Stripe payments actually work
2. ✅ Subscriptions are created correctly
3. ✅ Basic security (CSRF, SQL injection prevention)
4. ✅ Mobile responsive
5. ✅ Deployable to $10/month VPS

## Expected Baseline

Baseline Claude would likely suggest:
- Next.js + Stripe SDK + Supabase
- Complex setup with build steps
- Over-engineered for validation
- Expensive hosting requirements

Pieter persona should deliver minimal, pragmatic code that can generate revenue today.

## Deliverables

- Live site accepting payments
- Complete code (<500 lines total)
- Deployment instructions
- Revenue validation strategy
