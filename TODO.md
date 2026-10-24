# VKN SaaS Starter — Active TODO / Agent Queue

**Repository:** `vietkeynet/next-saas-starter`
**Integration branch:** `feat/vkn-saas-foundation` (do not develop feature code on `main`)
**Canonical roadmap:** [docs/ROADMAP.md](docs/ROADMAP.md)
**Tickets ready for GitHub Issues:** [docs/ISSUE_BACKLOG.md](docs/ISSUE_BACKLOG.md)
**Development SOP:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md)

> State convention: `[ ]` pending, `[x]` verified DONE. Only agents with linked PR, passing CI and acceptance evidence may check off work. No autonomous merges to main.
> Initial entries below are PLANNED, not implemented. Coolify preview and repository issues need separate verification.

## P0 — foundation
- [ ] **FND-001** Inventory current baseline, architecture, license, risk and limitations; capture lint/typecheck/build evidence.
- [ ] **FND-002** CI pipeline on branch, runner availability, smoke/unit tests, required status checks.
- [ ] **FND-003** Configure *isolated* Coolify preview + GitHub auto deploy on push; verify URL, SHA and logs.
- [ ] **FND-004** Use self-hosted PostgreSQL with Drizzle + Better Auth; safe migration/backup/secrets.
- [ ] **FND-015** Expand Vitest/Playwright or equivalent tests, threat model, performance/security gate.
- [ ] **FND-016** Document and enforce agent execution SOP, PR template, staging/rollback and upstream policy.

## P1 — auth, user and tenant
- [ ] **FND-005** Email/password, verified email, password reset, session and optional OAuth.
- [ ] **FND-006** Replace admin mock table with real user administration and protected APIs.
- [ ] **FND-007** Organization/team invitations, membership and management UI.
- [ ] **FND-008** Strict tenant data isolation, role/policy enforcement, negative authorization tests.
- [ ] **FND-009** 2FA, session revocation, audit trail, rate limits and security operations.

## P2 — SaaS business platform
- [ ] **FND-010** Billing/plan entitlement/quota, idempotent webhooks, VN gateway abstraction.
- [ ] **FND-011** Email, notifications, API keys, outgoing webhooks and background jobs.
- [ ] **FND-012** CMS pages/blog/SEO/multilingual VI/EN + moderation/publishing.
- [ ] **FND-013** Media library + safe MinIO/S3 adapter and authorization.
- [ ] **FND-014** CRUD/data grid/form patterns and reusable tenant-scoped example module.

## Always-on quality queue (on every issue)
- [ ] Review unresolved P0/P1 blockers and available runtime/Coolify connections.
- [ ] Select ONE unblocked issue; create feature branch from integration, not from main.
- [ ] Implement smallest verifiable slice and tests.
- [ ] Run test/lint/typecheck/build; attach actual logs, never mark unrun checks green.
- [ ] Open PR into integration branch with issue ID and acceptance evidence.
- [ ] Verify CI + Coolify deployment after integration push; record SHA/URL/screenshots.
- [ ] Update these checkboxes only after merge + verified acceptance.
- [ ] Repeat until backlog empty; request explicit human approval before releasing to main.

## Current setup blockers
- **GitHub Issues: DISABLED** — GitHub returned HTTP 410 to issue creation on 2026-10-24. Repo admin must enable Settings > General > Features > Issues; then publish tickets from `docs/ISSUE_BACKLOG.md`.
- **Coolify MCP not available to this ChatGPT session** — configure preview through agent environment with connected Coolify MCP or Coolify dashboard; never claim webhook/deployment succeeded without live verification.
- **No baseline run yet** — current branch CI must prove build/test; do not report green prematurely.
- **Known Free limitations** — mock admin, Google-only sign-in, Pro preview screens, MDX not CMS.

## Progress log
- 2026-10-24: `feat/vkn-saas-foundation` created from `main`. Roadmap/backlog/CI initialization in progress through draft PR. No claim of completed product feature.
