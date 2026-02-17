# Tasks - A Rails 8 Task List

A production-ready task list application built with Rails 8, Hotwire, and SQLite.

## Features

- Add new tasks
- Mark tasks as complete
- Delete tasks
- Real-time updates via Turbo Streams
- Zero JavaScript framework dependencies
- No build step required
- Production-ready deployment with Kamal

## Quick Start

```bash
# Install dependencies
bundle install

# Setup database
rails db:prepare

# Start the server
rails server
```

Visit http://localhost:3000

## Deployment

This app is ready to deploy to production with Kamal:

```bash
# Install Kamal
gem install kamal

# Setup your server in config/deploy.yml

# Deploy
kamal setup
kamal deploy
```

## Architecture

- **Framework**: Rails 8.0
- **Database**: SQLite (perfect for this scale)
- **Frontend**: Hotwire (Turbo + Stimulus)
- **Assets**: Propshaft (no build step)
- **Deployment**: Kamal + Docker

## Why This Stack?

See `docs/approach.md` for detailed architectural reasoning.

## Testing

```bash
# Run tests
rails test
```

## Production Considerations

- SQLite is production-ready for apps like this (see https://fly.io/blog/sqlite-on-the-edge/)
- Scales to hundreds of thousands of tasks
- Deploys anywhere with Docker
- Zero build complexity
- Minimal dependencies
