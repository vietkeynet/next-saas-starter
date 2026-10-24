# VKN SaaS Starter — Product Roadmap

> Owner: vietkeynet | Integration branch: `feat/vkn-saas-foundation` | Base: `main` | Started: 2026-10-24
> Source: MIT-licensed fork of `mickasmt/next-saas-stripe-starter`. Preserve upstream license and attribution.
> Truth policy: a checkbox is complete ONLY after source changes, passing test evidence and a reviewed PR. Never confuse a Pro-only preview with a working feature.

## North star
Reusable, self-hosted Next.js/TypeScript/PostgreSQL starter with three real surfaces: public marketing website (optionally CMS-managed), authenticated customer dashboard, and authenticated super admin. Support B2B organizations, secure tenant isolation, configurable modules and subscriptions. Agents should be able to create new apps without rewriting foundation.

## Boundaries and baseline
- `main` remains protected and receives only reviewed integration PRs.
- Changes and CI execute on `feat/vkn-saas-foundation`; individual feature PRs target this branch.
- A separate Coolify **staging/preview** app tracks the integration branch. Never overwrite production app, deploy production secrets or migrate production data.
- Existing repository contains `prune.yml` but no general-purpose unit/E2E suite at baseline. Add test coverage incrementally and report real status, not an invented green.
- Free starter's `/admin` and some organization/security screens use mock/Pro upsell content; replace with authorized real functionality.
- Blog/docs/changelog use source-controlled MDX, not an admin CMS.
- Free sign-in uses Google, with additional auth flows to implement.
- Existing database driver is Neon-oriented; aim for ordinary self-hosted PostgreSQL while keeping Drizzle schema and auth migrations compatible.

## Prioritized delivery phases

### M0 — Bootstrap and reproducible preview (P0)
Tickets: FND-001..004
- Audit dependency/security/Free-versus-demo scope and record existing behavior.
- Stand up trusted push CI: install, static contract tests, lint, typecheck, production build, HTTP smoke; preserve prune CI.
- Verify isolated Coolify preview from `feat/vkn-saas-foundation`, GitHub webhook on push, per-commit deploy logs and preview URL.
- Support self-hosted PostgreSQL, migration plan, least-privileged users, secret handling and runtime validation.
**Exit:** clean build and smoke, reproducible migrations, working restricted preview with commit SHA verified. If unavailable, mark blocker; do not declare done.

### M1 — Identity and operational admin (P1)
Tickets: FND-005..007
- Email/password, verification, password reset, optional OAuth, sessions and anti-abuse.
- Replace sample admin users with real authorized CRUD, role assignment, ban/unban, filter/pagination and audit.
- Organizations, invitations, member lifecycle, ownership transfer and team roles.
**Exit:** end-to-end account onboarding, separate admin/user access, working invite/accept/revoke and tests on at least two organizations.

### M2 — Security and observability hardening (P1)
Tickets: FND-008..009
- Centralized org-aware policy/RBAC and explicit server guards on routes, actions, APIs, read queries.
- Data access tests proving user from tenant A cannot access B, including direct URL and forged IDs.
- Security settings, 2FA, revoke sessions, audit events, rate limits and incident logging.
**Exit:** negative-authorization integration/E2E suite passes and security review has no unresolved critical/high findings.

### M3 — Commercial SaaS operations (P2)
Tickets: FND-010..011
- Subscription plans, entitlements, quotas, invoicing state, webhook idempotency; keep Stripe adapter isolated.
- Prepare optional VN payment gateway abstraction for later approved integration; no fabricated provider credentials.
- Notifications, email templates, background jobs, API keys and outgoing webhooks with rotation/retry.
**Exit:** sandbox billing paths tested (success, fail, cancel, duplicate webhook) and feature entitlement enforced server-side.

### M4 — Website/CMS and application building blocks (P2)
Tickets: FND-012..014
- Admin-managed pages/posts/categories/media, draft/publish, SEO, multilingual VI/EN and role-scoped editing.
- Object-storage adapter compatible with MinIO/S3; file validation/quota/access control.
- Reusable CRUD forms, data grids, sorting/filtering, import/export and example tenant-scoped business module.
**Exit:** admin publishes public page without Git edit; a fresh product module ships with no auth rewrites.

### M5 — Production readiness, agent automation and release (P0 gate)
Tickets: FND-015..016
- Unit/integration/E2E/performance/security checks, migrations, backup/restore drills, dependency audits.
- Agent issue-to-PR SOP, CI evidence, Coolify verification, update/upstream sync and maintainers' approval gates.
**Exit:** preview validated; manual release approval, deployment/rollback runbook, zero open critical/high security issues, and recorded go/no-go.

## Definition of done for every feature
1. Issue scoped with behavior, permission matrix, dependency and measurable acceptance.
2. Implementation isolated on `feature/<issue-id>-short-slug` based on current integration branch.
3. Code follows Next.js 16 docs, repo `AGENTS.md`, feature flags and prune markers where applicable.
4. Tests cover positive, negative, organization boundaries and regressions; no skipped/faked success.
5. `pnpm install --frozen-lockfile && pnpm test && pnpm lint && pnpm typecheck && pnpm build` succeed on trusted runner; E2E is required for auth/billing/tenant changes once harness lands.
6. Feature PR targets `feat/vkn-saas-foundation`, links issue, includes test logs/screenshots when relevant.
7. After merge/push, verify Coolify deploy exactly the head SHA, URL, health and browser checks.
8. Update `TODO.md`, release notes and docs; close issue only with linked merged PR and evidence.
9. Promotion from integration branch to `main` requires explicit review and approval.

## Management
- Backlog source of truth while GitHub Issues disabled: `docs/ISSUE_BACKLOG.md`. Once enabled, create issues and replace FND identifiers with GitHub #numbers.
- Live execution queue: `TODO.md`; agent operating manual: `docs/DEVELOPMENT_WORKFLOW.md`.
- Coolify setup and runbook: `docs/COOLIFY.md`.
- Never assume a Coolify MCP exists in every agent runtime. Discover and verify connectivity before deployment changes.
- Prefer upstream cherry-pick/sync via reviewed PR after dependency/security review, not blindly overwriting fork.
