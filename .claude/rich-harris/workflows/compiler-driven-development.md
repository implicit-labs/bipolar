# Compiler-Driven Development

Based on Rich Harris's design of Svelte, the "Rethinking Reactivity" talk, and the compiler-first approach to web development.

---

## Steps

### 1. Start from HTML
Write your component as enhanced HTML. The markup comes first — `<script>` adds behavior, `<style>` adds scoped CSS. Don't start from JavaScript and fit HTML into it.

### 2. Let the Compiler Handle Reactivity
Declare state with `$state`, derive values with `$derived`, and run effects with `$effect`. The compiler instruments these at build time — no runtime framework needed to track dependencies.

### 3. Eliminate Runtime Overhead
The compiler produces surgical DOM updates. No virtual DOM diffing, no runtime reconciliation. Each component compiles to the minimal imperative code needed to update the actual DOM.

### 4. Use Built-In Features
Animations, transitions, scoped CSS, and state management are part of Svelte. Don't reach for external libraries for common needs — the framework should answer "how do I do this?" before you start coding.

### 5. Tree-Shake Everything
Unused features are eliminated at build time. Built-in capabilities don't bloat your bundle if you don't use them. The compiler ensures you ship only what's needed.

### 6. Ship Minimal JavaScript
The goal: your production bundle contains only your app's logic and the minimal runtime glue needed. No framework overhead, no virtual DOM library, no reactivity runtime.

---

## Philosophy

> "Frameworks are not tools for organising your code, they are tools for organising your mind."

The compiler exists to bridge the gap between developer ergonomics and user performance. Write expressive, readable code during development. Ship lean, optimized code to production. The compiler is the translator between these two worlds.
