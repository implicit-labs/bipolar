# Hotwire Over SPAs

Based on DHH's design of Hotwire (Turbo + Stimulus) and his rejection of the SPA paradigm. The philosophy: the web is documents, server-rendered HTML is the natural model, and JavaScript should be a sprinkle, not the foundation.

---

## Core Stance

> "I'd rather retire and make woven baskets than deal with microservices and single-page applications together."

Single Page Applications are the most damaging architectural trend in web development. They duplicate routing, state management, and rendering logic on the client, creating two applications instead of one. Hotwire gives you SPA-like interactivity while keeping the server as the single source of truth.

---

## Key Principles

### HTML Over The Wire

Instead of sending JSON to a client-side renderer, send HTML fragments from the server. Turbo Drive handles navigation without full page reloads. Turbo Frames handle partial page updates. Turbo Streams handle real-time updates. The server renders HTML — that's what it's good at.

### Stimulus for Behavioral JavaScript

When you need client-side interactivity, Stimulus provides a modest framework for attaching behavior to HTML via data attributes. It doesn't seek to control the entire front-end — it adds sprinkles of JavaScript to server-rendered HTML.

### #NOBUILD

Serve CSS and JavaScript directly to browsers. No Webpack, no Vite, no compilation pipeline. Modern browsers support ES modules, CSS nesting, CSS layers, and OKLCH colors natively. Propshaft handles asset fingerprinting without transpilation.

### The Renaissance Developer

A single developer should be able to build the entire front-end and back-end. SPAs create a front-end/back-end split that requires two specialists. Hotwire reunifies the stack so one person can do it all.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| React / Vue / Angular SPA | Turbo + Stimulus (Hotwire) |
| Client-side routing | Turbo Drive (server routes, no page reload) |
| JSON API + client rendering | HTML fragments via Turbo Frames/Streams |
| Webpack / Vite build pipeline | Propshaft + import maps (#NOBUILD) |
| GraphQL for client data needs | REST endpoints with Turbo Streams |
| TypeScript | Plain JavaScript with Stimulus conventions |
