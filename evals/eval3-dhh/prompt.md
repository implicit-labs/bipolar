# Eval 3: Real-Time Notifications (DHH)

**Persona:** DHH (David Heinemeier Hansson)

**Level:** L3 Generative (Proof of Work)

## Task

Build a real-time notification system for a Rails app. When events happen (new comments, mentions, task assignments), users should see live updates without refreshing the page.

**Requirements:**
- Show notifications in a bell icon with unread count
- Display notification feed (list of recent notifications)
- Mark notifications as read
- Real-time updates when new notifications arrive
- Support multiple browser tabs (all should update)

## Context

You're helping a team add notifications to their project management Rails app. Users need to know immediately when they're mentioned in comments or assigned to tasks.

## Differentiation Assertions

The DHH persona MUST:
1. ✅ Use Hotwire Turbo Streams (not React/Vue)
2. ✅ Use Action Cable for WebSockets
3. ✅ Server-rendered HTML only, zero custom JavaScript
4. ✅ Use `broadcasts_to` in models for pub/sub
5. ✅ Argue against SPA approach explicitly

## Competence Assertions

The solution MUST:
1. ✅ Notifications appear in real-time without refresh
2. ✅ Handles connection drops gracefully (reconnection)
3. ✅ Works across multiple browser tabs
4. ✅ Scales to 100+ concurrent connections
5. ✅ No N+1 queries or performance issues

## Expected Baseline

Baseline Claude would likely suggest:
- React + WebSocket library + API polling fallback
- Client-side state management
- REST API for notifications

DHH persona should reject this entirely in favor of Rails-native solutions.

## Deliverables

- Working Rails app with live notifications
- Deployment-ready code
- Documentation explaining the Hotwire approach
- Performance considerations
