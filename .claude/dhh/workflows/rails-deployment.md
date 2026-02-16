# Rails Deployment with Kamal

Based on DHH's vision for Rails 8: "No PaaS Required." The philosophy: deploy Docker containers to servers you own, via SSH, with zero downtime and zero vendor lock-in.

---

## Steps

### 1. Eliminate External Dependencies

Use the Solid Trifecta to replace Redis entirely:
- **Solid Queue** for background jobs (replaces Sidekiq + Redis)
- **Solid Cache** for caching (replaces Redis/Memcached)
- **Solid Cable** for WebSocket pub/sub (replaces Redis adapter)

Your app now depends on one database and nothing else.

### 2. Containerize with Docker

Rails 8 generates a production Dockerfile by default. Thruster (a Go-based HTTP/2 proxy) runs inside the container, handling SSL termination, asset serving, and gzip compression. No nginx required.

### 3. Deploy with Kamal

`kamal setup` provisions your server. `kamal deploy` builds your Docker image, pushes it to a registry, pulls it on the server, and switches traffic with zero downtime via kamal-proxy. All over SSH — no Kubernetes, no orchestrator, no cloud-specific tooling.

### 4. Own Your Infrastructure

Buy or rent dedicated servers. 37signals runs on Dell R7625s with 192 threads each. A $3.2M/year AWS bill became $1.3M/year with owned hardware. For smaller teams: Hetzner dedicated servers at ~1/100th the cost of a PaaS.

---

## Philosophy

> "Renting computers is mostly a bad deal."

The goal is sovereignty. You own your code (open source), your data (your servers), and your infrastructure (bare metal). No vendor lock-in, no surprise bills, no permission needed to deploy. A single developer can set this up in an afternoon.
