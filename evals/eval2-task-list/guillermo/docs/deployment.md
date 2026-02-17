# Deployment Guide - Ship to Production

## The Vercel Way

Deploying to production should be as easy as `git push`. Here's how.

## Quick Start (2 Minutes to Production)

### Option 1: GitHub Integration (Recommended)

**This is the ship-to-learn workflow:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
```

2. **Connect Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repo
- Click "Deploy"

**That's it.** Vercel auto-detects Next.js and deploys.

3. **Every commit = automatic deployment**
- `main` branch → Production
- Feature branches → Preview URLs

### Option 2: Vercel CLI (Manual)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Preview URLs - Your Secret Weapon

Every branch gets a unique preview URL:

```
feat/add-categories → https://task-list-abc123.vercel.app
fix/delete-bug     → https://task-list-xyz789.vercel.app
```

**Why this matters:**
- Share work-in-progress with users
- Test in production environment
- Get feedback before merging
- No staging server needed

### Workflow Example

```bash
# Create feature branch
git checkout -b feat/add-search

# Make changes
# ... edit code ...

# Commit and push
git add .
git commit -m "Add search functionality"
git push origin feat/add-search

# Vercel automatically builds and comments on PR with preview URL
# → Share URL with users
# → Get feedback
# → Iterate

# When ready, merge
git checkout main
git merge feat/add-search
git push

# Production automatically updates
```

**This is the iteration loop:** Hours, not weeks.

## Environment Variables

### Current Version (File Storage)
No environment variables needed. Data is stored in local files.

### When You Migrate to Database

Vercel makes this trivial:

1. **Add Vercel Postgres** (Dashboard → Storage → Create)
2. **Variables auto-populate** (No manual entry needed)
3. **Reference in code:**
```tsx
import { sql } from '@vercel/postgres'
// Connection string automatically injected
```

**For other services:**
```bash
# Vercel Dashboard → Settings → Environment Variables

# Add:
DATABASE_URL=<your-database-url>
REDIS_URL=<your-redis-url>

# Access in code:
process.env.DATABASE_URL
```

### Local Development with Environment Variables

```bash
# Create .env.local
DATABASE_URL=postgresql://localhost/tasks

# Next.js automatically loads it
# Never commit .env.local (already in .gitignore)
```

## Performance Optimization

### Automatic by Vercel
- ✅ Global CDN (content cached at edge)
- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression (Brotli)
- ✅ HTTP/2

### You Control
- **Server Components** - Minimize JS sent to client
- **Streaming** - Send HTML as it's ready
- **Lazy loading** - Load components on demand

### Measuring Performance

```bash
# Lighthouse CI (automatic on Vercel)
# Every deploy gets a performance score

# View in Vercel Dashboard → Deployments → <commit> → Analytics
```

## Monitoring

### Vercel Analytics (Free)
```bash
# Install
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Get:**
- Page views
- User sessions
- Web Vitals (CLS, FID, LCP)

### Error Monitoring
```bash
# Vercel Dashboard → Deployment → Errors
# Automatic error tracking, no setup needed
```

## Scaling

### Automatic Scaling
Vercel handles this for you:
- **Traffic spike?** Auto-scales to 1000s of instances
- **No traffic?** Scales to zero (no cost)
- **Global?** Edge functions run near users

### When to Upgrade Storage

Current (file-based):
- ✅ Good for: Prototypes, single-user, demos
- ❌ Not for: Multi-device sync, collaboration

Upgrade to Vercel Postgres when:
- Multiple users need to share data
- Need multi-device sync
- Ready to add authentication

**Migration is trivial** (see README.md).

## Deployment Checklist

Before shipping to production:

### Performance
- [ ] Run Lighthouse (target: 90+ score)
- [ ] Check bundle size (`npm run build`)
- [ ] Test on slow connection (Chrome DevTools → Network → Slow 3G)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes WCAG AA

### Functionality
- [ ] Test on mobile device
- [ ] Test in different browsers
- [ ] Test with JavaScript disabled (progressive enhancement)

### Monitoring
- [ ] Analytics installed
- [ ] Error tracking enabled
- [ ] Performance monitoring active

## Rollback Strategy

Made a mistake? Rollback is instant:

```bash
# Vercel Dashboard → Deployments → Previous deployment → Promote to Production
```

Or via CLI:
```bash
vercel rollback
```

**Zero downtime.** Previous version serves traffic immediately.

## Custom Domains

```bash
# Vercel Dashboard → Settings → Domains
# Add: tasks.yourdomain.com

# Vercel provides:
# - Automatic SSL
# - DNS configuration
# - WWW redirect
```

## CI/CD Integration

### GitHub Actions (Optional)

Vercel already does CI/CD, but if you want custom checks:

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm run lint

  # Vercel deploys after tests pass
```

### Vercel Checks
Enable in Dashboard → Settings → Git → Checks:
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Lighthouse score > threshold

## Cost Optimization

### Free Tier (Hobby)
- **Bandwidth:** 100GB/month
- **Invocations:** 100GB-hrs
- **Builds:** Unlimited

**This task list uses ~0.1% of free tier limits.**

### When to Upgrade to Pro
- Need team collaboration
- Need advanced analytics
- Need priority support

**For most apps:** Free tier is plenty.

## Ship-to-Learn Checklist

- [x] Code written
- [x] Local testing done
- [x] Git committed
- [x] Pushed to GitHub
- [x] Vercel connected
- [x] Deployed to production
- [x] Preview URL shared
- [ ] **User feedback collected** ← This is the goal

**Total time:** < 30 minutes from idea to production.

**That's the Vercel way.**

---

## Common Issues

### Build Fails
```bash
# Check build logs in Vercel Dashboard
# Common fixes:
- Missing dependency → npm install <package>
- TypeScript error → Check build output
- Environment variable → Add in Vercel Dashboard
```

### 404 on Dynamic Routes
Next.js App Router handles routing automatically. No config needed.

### Slow Performance
```bash
# Check:
1. Bundle size (npm run build)
2. Server Components usage (minimize client JS)
3. Image optimization (use next/image)
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Discord](https://vercel.com/discord)

## The Bottom Line

Deployment should never be a bottleneck. With Vercel:

1. **Write code**
2. **Push to GitHub**
3. **Get preview URL**
4. **Share with users**
5. **Iterate**

**That's the entire workflow.** No DevOps, no infrastructure, no delays.

Ship fast. Learn fast. Build what users actually want.
