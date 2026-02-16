# SQLite-Centric Architecture

Based on Simon Willison's design of Datasette, sqlite-utils, and his broader philosophy of using SQLite as a universal data layer. The philosophy: SQLite is the right default for more applications than developers realize.

---

## Core Stance

> "SQLite is the most deployed database in the world for a reason."

SQLite is not just for mobile apps. It's an incredibly powerful, zero-config, embedded database that works as a data interchange format, an application database, a CLI tool backend, and a publishable data format. Default to SQLite unless you have a specific reason not to.

---

## Key Principles

### The File IS the Database

A SQLite database is a single file. This means databases can be emailed, version-controlled, deployed to CDNs, and published as static assets. No server process, no connection strings, no configuration.

### Read-Heavy Workloads Are SQLite's Sweet Spot

SQLite excels at read-heavy workloads with occasional writes. Datasette serves thousands of requests per second from a single SQLite file. For publishing data, analytics dashboards, and reference databases, SQLite outperforms client-server databases.

### sqlite-utils as Data Swiss Army Knife

The `sqlite-utils` CLI and Python library turn SQLite into a powerful data manipulation tool. Import CSV/JSON/NL-JSON, create tables with inferred schemas, add full-text search, and transform data — all from the command line.

### Plugin Architecture on Top of SQLite

Both Datasette and LLM CLI use SQLite as their storage layer with Pluggy-based plugin systems on top. Plugins can add new data sources, visualization types, authentication methods, and export formats — all reading from and writing to the same SQLite database.

---

## Anti-Patterns

| Anti-Pattern | Better Alternative |
|---|---|
| PostgreSQL for single-user CLI tools | SQLite — zero config, file-based |
| JSON files for structured local data | SQLite — queryable, typed, indexed |
| Custom binary formats for data exchange | SQLite — universal, tooling-rich |
| Spinning up a database server for read-heavy data | SQLite — embedded, fast reads |
| Building data import/export from scratch | `sqlite-utils` — handles common formats |
| Monolithic feature-complete applications | Plugin architecture over SQLite storage |
