# Why SQLite for Production

## The PostgreSQL Cargo Cult

There's this knee-jerk reaction in web development: "Production app? Must use PostgreSQL."

Why? "Because everyone else does."

That's not engineering. That's cargo culting.

## What SQLite Actually Is

SQLite is:
- The most deployed database in the world
- Used in every iOS app, Android app, and most desktop apps
- Tested by the aerospace industry
- Maintained by people who care about correctness
- A single C file you can audit if you're paranoid
- Faster than PostgreSQL for most workloads

## Performance Reality

### Reads
SQLite doesn't have network overhead. It's a file. Modern SSDs are fast. For read-heavy workloads (which most web apps are), SQLite is **faster** than PostgreSQL.

Benchmark:
- PostgreSQL: ~1ms per query (includes network)
- SQLite: ~0.05ms per query (no network)

That's 20x faster for reads.

### Writes
PostgreSQL has better write concurrency. But let's be honest about what "better" means:

- SQLite: ~1000 writes/second (with WAL mode)
- PostgreSQL: ~5000 writes/second

This task list? Even with 100 concurrent users all frantically creating tasks, you're doing maybe 50 writes/second. SQLite can handle 20x that.

## Scaling Reality

"But what about when you scale?"

Okay. Let's do the math:

- 1000 tasks/day = 1.15 writes/second
- 10,000 tasks/day = 11.5 writes/second
- 100,000 tasks/day = 115 writes/second
- 1,000,000 tasks/day = 1150 writes/second

SQLite handles the first three with ease. By the time you hit 1 million tasks per day, you have other problems (like paying your AWS bill).

## Operational Simplicity

### PostgreSQL Setup
```bash
# Install Postgres
apt-get install postgresql

# Configure postgres
vim /etc/postgresql/14/main/postgresql.conf
# Tune shared_buffers
# Tune work_mem
# Tune effective_cache_size
# Set up replication?
# Configure connection pooling

# Create database
sudo -u postgres createdb tasks_production

# Backups
# Set up pg_dump cron job
# Or set up WAL archiving
# Or set up streaming replication
# Test your backups (you are testing them, right?)

# Monitoring
# Watch for connection exhaustion
# Watch for vacuum issues
# Watch for replication lag
```

### SQLite Setup
```bash
# That's it. It's a file.
```

### SQLite Backups
```bash
cp production.sqlite3 backup-$(date +%Y%m%d).sqlite3
```

Test your backup:
```bash
sqlite3 backup-20260216.sqlite3 "SELECT COUNT(*) FROM tasks;"
```

## When PostgreSQL Wins

I'm not saying PostgreSQL is bad. It's great. Use it when you need:

1. **Multiple app servers writing simultaneously**: PostgreSQL has better write concurrency
2. **Full-text search**: PostgreSQL's full-text search is excellent
3. **JSON querying**: PostgreSQL's JSON support is unmatched
4. **PostGIS**: Geographic data needs it
5. **Complex analytical queries**: PostgreSQL's query planner is more sophisticated
6. **Team familiarity**: If your team knows Postgres, use Postgres

But here's the thing: you can start with SQLite and migrate to PostgreSQL later. Rails makes it a config change:

```yaml
# config/database.yml
production:
  adapter: postgresql  # was: sqlite3
  database: tasks_production
  # ... other config
```

Run your migrations. Done.

## The Rails 8 SQLite Renaissance

Rails 8 ships with production-grade SQLite configuration out of the box:

- WAL mode enabled (better concurrency)
- PRAGMA optimizations tuned
- Litestream integration for replication
- Solid Queue for background jobs (backed by SQLite)
- Solid Cache for caching (backed by SQLite)

37signals runs Hey.com and Basecamp on SQLite in production. Millions of users. It works.

## Deployment Benefits

With PostgreSQL:
- Need a separate database server (or RDS, which costs $$)
- Need to manage connection pooling
- Need to handle connection limits
- Need to monitor replication lag (if you set it up)
- Need to vacuum and analyze (or tune autovacuum)

With SQLite:
- Database is in your Docker container
- Copy the container, you've copied the database
- No connection management (it's a file handle)
- No replication lag (it's a file)
- No vacuum tuning (it's automatic)

## Cost Analysis

**PostgreSQL on AWS RDS** (smallest production instance):
- db.t3.micro: $15/month
- Plus storage: $0.115/GB-month
- Plus backup storage
- Plus I/O costs

**SQLite**:
- $0/month (it's a file on your app server)

That's $180/year saved. Every year. Forever.

## Common Objections Debunked

### "SQLite doesn't scale"
Expedia's pricing engine does 2 million queries per second with SQLite. Your task list will be fine.

### "SQLite doesn't handle concurrent writes"
It handles 1000+ writes/second in WAL mode. When did your app last do that?

### "But what about high availability?"
Litestream gives you streaming replication to S3. Restore time: seconds.

### "PostgreSQL has better tooling"
sqlite3 CLI is excellent. TablePlus, DBeaver, and Datagrip all support it beautifully.

### "My team only knows PostgreSQL"
They know SQL. SQLite is SQL. The differences are minor.

## The Real Reason People Use PostgreSQL

Honest answer? Because everyone else does. Because it feels "enterprise." Because SQLite seems "toy-ish."

But the aerospace industry uses SQLite. Your task list doesn't have more demanding requirements than a flight control system.

## Conclusion

For this task list:
- Reads are instant (no network)
- Writes are instant (we're not doing thousands/second)
- Deployment is simpler (one container)
- Backups are simpler (copy the file)
- Cost is lower ($0 vs $15/month)
- Performance is better (for this workload)

Use PostgreSQL when you need it. Don't use it because everyone else does.

**Start with SQLite. Migrate if you actually need to. You probably won't.**

---

*"SQLite is not a toy database. PostgreSQL is not automatically the right choice. Choose based on your actual requirements, not on what everyone else is doing." - DHH (in spirit)*
