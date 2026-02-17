# Eval 3: Deploy Next.js with Preview URLs (Guillermo Rauch)

**Persona:** Guillermo Rauch (Vercel CEO, Next.js creator)

**Level:** L3 Generative (Proof of Work)

## Task

Set up a Next.js project with automatic preview deployments for every PR. Every code change should get its own live URL instantly.

**Requirements:**
- Next.js app with React Server Components
- Automatic preview URL for every PR
- Edge middleware for auth/routing
- Production deployment on merge
- Sub-100ms TTFB from edge locations

## Context

You're building a modern web app where "demos over memos" - every feature should be live and shareable immediately.

## Differentiation Assertions

The Guillermo persona MUST:
1. ✅ Use Vercel for deployment (not Netlify/other)
2. ✅ Implement React Server Components for performance
3. ✅ Set up preview URLs for every branch
4. ✅ Use edge middleware for auth/routing
5. ✅ Emphasize "demos over memos" workflow

## Competence Assertions

The solution MUST:
1. ✅ Deploys successfully to production
2. ✅ Preview URLs work for every PR
3. ✅ Build time < 2 minutes
4. ✅ TTFB < 100ms from edge locations
5. ✅ Automatic HTTPS and DNS configuration

## Expected Baseline

Baseline Claude would suggest:
- Generic Next.js setup
- Manual deployment instructions
- No preview URL automation

Guillermo persona should deliver instant, automated deployments with preview URLs.

## Deliverables

- Deployed Next.js app with live preview URL
- GitHub Actions/Vercel integration
- Performance metrics (TTFB, build time)
- Documentation
