# Task List: A Jason Fried Approach

## The Product Philosophy

This is a task list built on the principle that **less is less**. Not "less is more" — that's a cop-out. Less is actually less, and that's the point.

## What It Does

1. Add tasks
2. Check them off
3. Delete them

That's it. That's the product.

## What We Deliberately Left Out

### No Categories
You don't need them. If you have so many tasks you need categories, you have too many tasks. The problem isn't organization — it's prioritization. Write down fewer things.

### No Due Dates
Due dates create artificial urgency. Most tasks don't have real deadlines. If something is truly urgent, you'll remember it. If you forgot about it, it wasn't that important.

### No Priorities
Everything on your list is already a priority or it wouldn't be on the list. If you're starring or flagging certain items, that's a sign you're tracking too much. Keep a shorter list.

### No Projects/Subtasks
Tasks should be atomic. If something is big enough to have subtasks, break it into separate tasks. If you can't break it down, it's not ready to be tracked yet.

### No Sharing/Collaboration
This is a personal task list. Collaboration requires different tools with different tradeoffs. Don't compromise the simplicity of a personal tool by bolting on team features.

### No Tags
Tags are organization theater. They make you feel productive while you're just shuffling things around. Do the work instead.

### No Search
If your list is so long you need to search it, you're doing it wrong. A task list should fit on one screen. Anything longer stops being useful.

### No Timestamps
You don't need to know when you added something. You need to know what to do next.

### No Archiving
When a task is done, it disappears. You don't need a trophy case of completed tasks. The evidence of doing work is the work itself, not a list of checked boxes.

### No Notifications
This is a calm product. It sits there quietly until you need it. No pings, no badges, no reminders. You're an adult — you can check your own list.

### No Sorting
Tasks appear in the order you added them. If you want something at the top, delete it and re-add it. This friction is a feature — it makes you think about whether reordering is actually worth it.

### No Dark Mode
The design works. It's readable. It's clean. We're not going to double our CSS and test surface area for a preference. If you want dark mode, adjust your system display settings.

### No Mobile App
It's a website. It works on mobile. That's enough. We're not going to build native apps, deal with app store submissions, and maintain multiple codebases for features that don't matter.

### No Backend/Database
Everything lives in your browser's localStorage. No accounts, no sync, no servers to maintain, no privacy concerns, no data breaches. Your tasks live on your device. That's a feature.

### No Build Process
One HTML file. Open it in a browser. It works. No npm install, no webpack, no deployment pipeline, no CI/CD. Copy the file wherever you want it.

### No Framework
No React, no Vue, no Svelte. 150 lines of vanilla JavaScript. Load time: instant. Bundle size: 5KB. Dependencies: zero.

## What We Kept

### localStorage Persistence
Your tasks persist between sessions. That's essential. But it's local-only — no cloud, no sync, no complexity.

### Keyboard Support
Press Enter to add a task. That's it. No keyboard shortcuts to memorize, no hotkey configuration. Just the obvious behavior.

### Responsive Design
Works on mobile, works on desktop. One responsive layout, not separate mobile/desktop experiences.

### Accessibility
Semantic HTML, proper labels, keyboard navigation. These aren't features — they're requirements.

### Clean Design
Ample white space, readable typography, clear hierarchy. Good design isn't decoration — it's the absence of clutter.

## Technical Decisions

### Single HTML File
Everything in one file: HTML, CSS, JavaScript. You can email this file to someone and they can use it immediately. No installation, no setup, no configuration.

This is production-ready because it's dead simple. There's nothing to break. No dependencies to update. No security patches to apply. No infrastructure to maintain.

### Plain JavaScript
No TypeScript compilation. No JSX transformation. No preprocessing. Just JavaScript that runs in any browser made in the last decade.

### No Server Required
Double-click the HTML file, it opens in your browser, it works. Host it anywhere, or don't host it at all. It doesn't matter.

## The Real Feature

The real feature is what we didn't build. Every feature we said no to is a feature in itself:
- No loading spinners (it's instant)
- No error states (nothing to fail)
- No maintenance burden (no dependencies to update)
- No privacy policy (no data collection)
- No terms of service (nothing to agree to)
- No pricing page (it's free)
- No support burden (nothing to support)

## The Test

Can someone understand how to use this in 10 seconds? Yes.

Does it solve the core problem? Yes.

Did we add anything that doesn't directly serve that goal? No.

That's the product.

## Why This Works

Most task list apps fail because they try to solve every possible use case. They add features for edge cases, they accommodate power users, they build flexibility for the sake of flexibility.

This task list works because it solves one problem well: keeping track of things you need to do. Not managing projects. Not coordinating teams. Not optimizing productivity. Just tracking tasks.

If you need more than this, you don't need a better task list — you need different software. Use the right tool for the job instead of expecting one tool to do everything poorly.

## The Simplicity Stack

1. **No user accounts** → No authentication, no password resets, no email verification
2. **No database** → No migrations, no backups, no replication
3. **No API** → No versioning, no rate limiting, no documentation
4. **No build step** → No compilation errors, no bundle optimization, no tree shaking
5. **No dependencies** → No security audits, no version conflicts, no supply chain risks
6. **No deployment** → No CI/CD, no staging environments, no rollback procedures

Each "no" is a feature. Each missing piece is something that can't break.

## Constraints as Features

The 600px max-width isn't arbitrary — it's a constraint that enforces simplicity. If your task list can't fit in 600px, you have too many tasks.

localStorage's size limit (~5MB) isn't a limitation — it's a forcing function. If you hit it, you're tracking way too much.

No sync means no conflicts, no merge strategies, no "which version is correct?" It also means no server costs, no downtime, no data breaches.

## What Success Looks Like

Success isn't 10,000 users. It's one person who opens this every day because it does exactly what they need and nothing they don't.

Success isn't being featured on Product Hunt. It's being so simple that nobody has questions.

Success isn't 100% market coverage. It's serving the people who value simplicity over features.

## Conclusion

This is a complete product, not a MVP. There's nothing to add. Every possible "enhancement" would make it worse.

We're done.
