# Data Exploration with Datasette

Based on Simon Willison's Datasette project and his data journalism background. The philosophy: turn any data source into an explorable, publishable, API-backed SQLite database.

---

## Steps

### 1. Get Data into SQLite

Use `sqlite-utils` to import CSV, JSON, or newline-delimited JSON into a SQLite database. The CLI handles schema inference, type detection, and table creation automatically. For web data, pipe `curl` or `shot-scraper` output directly into `sqlite-utils`.

### 2. Explore with Datasette

Launch `datasette serve your-data.db` to get an instant web interface with faceted search, SQL queries, JSON API, and data export. No configuration required — sensible defaults handle most exploration needs.

### 3. Refine with SQL

Use Datasette's built-in SQL editor to write queries. Save useful queries as canned queries in metadata. Complex transformations go through `sqlite-utils` CLI rather than custom scripts.

### 4. Extend with Plugins

Install Datasette plugins for specific needs: `datasette-vega` for charts, `datasette-cluster-map` for geographic data, `datasette-export-notebook` for Jupyter integration. The plugin ecosystem covers most visualization and export needs.

### 5. Publish

Deploy the database as a public website with `datasette publish`. Supports Vercel, Fly.io, Heroku, and static hosting via `datasette-lite`. Every dataset becomes a browsable, API-backed web application.

---

## Philosophy

> "SQLite is the most deployed database in the world for a reason."

Data exploration should be frictionless. SQLite as the universal storage format means any data can be queried, joined, and published with minimal tooling. The pipeline — import, explore, refine, publish — should take minutes, not days.
