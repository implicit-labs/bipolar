# Quick Start Guide

## Prerequisites

- Ruby 3.3.0 (use rbenv or rvm)
- SQLite 3.8.0+ (comes with macOS, or `apt-get install sqlite3`)
- Bundler (`gem install bundler`)

## Setup (First Time)

```bash
# Clone or navigate to the project
cd /path/to/task-list

# Run the setup script
bin/setup

# Start the server
rails server
```

Visit http://localhost:3000

## Development

### Start the server
```bash
rails server
```

### Run tests
```bash
rails test
```

### Database console
```bash
rails dbconsole
```

### Rails console
```bash
rails console
```

### Create a migration
```bash
rails generate migration AddColumnToTasks column:string
rails db:migrate
```

## Production Deployment

### Option 1: Kamal (Recommended)

1. Install Kamal:
```bash
gem install kamal
```

2. Configure `config/deploy.yml` with your server details

3. Deploy:
```bash
kamal setup
kamal deploy
```

### Option 2: Docker Manually

1. Build the image:
```bash
docker build -t tasks .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e RAILS_MASTER_KEY=your-key-here \
  tasks
```

### Option 3: Traditional Server

1. Install Ruby and dependencies on your server
2. Clone the repo
3. Run:
```bash
bundle install
RAILS_ENV=production rails db:prepare
RAILS_ENV=production rails assets:precompile
RAILS_ENV=production rails server
```

## Environment Variables

- `RAILS_ENV`: Set to `production` for production
- `RAILS_MASTER_KEY`: Your master encryption key (in `config/master.key`)

## Common Tasks

### Reset the database
```bash
rails db:reset
```

### Seed the database
```bash
rails db:seed
```

### Check routes
```bash
rails routes
```

### Run rubocop (linting)
```bash
rubocop
```

### Run brakeman (security audit)
```bash
brakeman
```

## Project Structure

```
app/
  controllers/     # Request handling
  models/          # Business logic and database models
  views/           # ERB templates
  assets/          # CSS, images
  javascript/      # Stimulus controllers, Turbo
config/
  routes.rb        # URL routing
  database.yml     # Database configuration
  deploy.yml       # Kamal deployment config
db/
  migrate/         # Database migrations
  schema.rb        # Current database schema
test/              # Tests
```

## Troubleshooting

### "Could not find gem"
```bash
bundle install
```

### "Database not found"
```bash
rails db:prepare
```

### Port 3000 already in use
```bash
rails server -p 3001
```

### Assets not loading in production
```bash
RAILS_ENV=production rails assets:precompile
```

## Further Reading

- [Rails Guides](https://guides.rubyonrails.org/)
- [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction)
- [Stimulus Handbook](https://stimulus.hotwired.dev/handbook/introduction)
- [Kamal Deploy](https://kamal-deploy.org/)
