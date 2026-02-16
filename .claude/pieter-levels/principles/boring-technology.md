# Boring Technology

Based on Pieter Levels' tech stack philosophy — vanilla PHP, jQuery, SQLite, single VPS. The philosophy: proven technology that "just works" beats cutting-edge technology that breaks.

---

## Core Stance

> "PHP just stays the same and works."

Modern frameworks are funded by hundreds of millions in venture capital and marketed through influencer promotion. Their adoption is driven by resume appeal, not genuine superiority. A single `index.php` file can generate $100K+/month. The tech stack doesn't matter — revenue matters.

---

## Key Principles

### Frameworks Add Unnecessary Complexity

React, Vue, Angular, Next.js — these add build steps, compilation, dependency management, and breaking changes. For solo founders building CRUD products, vanilla HTML/CSS/JS with jQuery handles everything you need. No webpack, no node_modules, no build pipeline.

### SQLite Is Enough

A single-file database that requires no server process. No PostgreSQL setup, no connection pooling, no database administration. SQLite handles read-heavy workloads perfectly, and for a solo product generating six figures monthly, it's more than enough.

### One Server, One File

Each product runs on a single VPS. No load balancers, no auto-scaling, no distributed systems. If a page goes viral, generate a static HTML cache. This architecture costs $20-100/month and handles millions of pageviews.

### Deploy in 15 Minutes

SSH to the server, push your code, restart Nginx. No CI/CD pipeline, no Docker builds, no Kubernetes manifests. The fastest deployment is the one with the fewest steps.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| React for a CRUD product | Vanilla HTML/CSS + jQuery |
| PostgreSQL for a solo product | SQLite |
| Docker + Kubernetes | Single VPS with Nginx |
| CI/CD pipeline | SSH and push |
| TypeScript compilation | Plain JavaScript |
| Microservices | Single index.php monolith |
| Framework-specific ORM | Raw SQL queries |
