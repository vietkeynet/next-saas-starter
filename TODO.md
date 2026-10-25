# VKN SaaS Starter — Active TODO / Agent Queue

**Repository:** `vietkeynet/next-saas-starter`
**Integration branch:** `feat/vkn-saas-foundation` (do not develop feature code on `main`)
**Canonical roadmap:** [docs/ROADMAP.md](docs/ROADMAP.md)
**Tickets ready for GitHub Issues:** [docs/ISSUE_BACKLOG.md](docs/ISSUE_BACKLOG.md)
**Development SOP:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md)

> State convention: `[ ]` pending, `[x]` verified DONE. Only agents with linked PR, passing CI and acceptance evidence may check off work. No autonomous merges to main.
> Initial entries below are PLANNED, not implemented. GitHub Issues #1–#16 now exist; Coolify preview still requires independent verification.

## P0 — foundation
- [ ] **[FND-001 #1](https://github.com/vietkeynet/next-saas-starter/issues/1)** Inventory current baseline, architecture, license, risk and limitations. Audit: [FND-001 baseline inventory & security audit](docs/FND-001-BASELINE-AUDIT.md). Local test/lint/typecheck/build pass (build exit 0 captured); frozen install blocked by `ERR_PNPM_IGNORED_BUILDS`; local public smoke 200, auth/dashboard 404 without configured services. PR #18 is open; current CI and review status are tracked on PR. CI uses noncompliant `ubuntu-latest`, not required `[self-hosted, Linux, X64, ci]`; does not verify LXC209 eligibility. No formal GitHub review recorded; Coolify staging unverified. Keep unchecked until review/merge and staging acceptance.
- [ ] **[FND-002 #2](https://github.com/vietkeynet/next-saas-starter/issues/2)** CI pipeline on branch, runner availability, smoke/unit tests, required status checks.
- [ ] **[FND-003 #3](https://github.com/vietkeynet/next-saas-starter/issues/3)** Configure *isolated* Coolify preview + GitHub auto deploy on push; verify URL, SHA and logs.
- [ ] **[FND-004 #4](https://github.com/vietkeynet/next-saas-starter/issues/4)** Use self-hosted PostgreSQL with Drizzle + Better Auth; safe migration/backup/secrets.
- [ ] **[FND-015 #15](https://github.com/vietkeynet/next-saas-starter/issues/15)** Expand Vitest/Playwright or equivalent tests, threat model, performance/security gate.
- [ ] **[FND-016 #16](https://github.com/vietkeynet/next-saas-starter/issues/16)** Document and enforce agent execution SOP, PR template, staging/rollback and upstream policy.

## P1 — auth, user and tenant
- [ ] **[FND-005 #5](https://github.com/vietkeynet/next-saas-starter/issues/5)** Email/password, verified email, password reset, session and optional OAuth.
- [ ] **[FND-006 #6](https://github.com/vietkeynet/next-saas-starter/issues/6)** Replace admin mock table with real user administration and protected APIs.
- [ ] **[FND-007 #7](https://github.com/vietkeynet/next-saas-starter/issues/7)** Organization/team invitations, membership and management UI.
- [ ] **[FND-008 #8](https://github.com/vietkeynet/next-saas-starter/issues/8)** Strict tenant data isolation, role/policy enforcement, negative authorization tests.
- [ ] **[FND-009 #9](https://github.com/vietkeynet/next-saas-starter/issues/9)** 2FA, session revocation, audit trail, rate limits and security operations.

## P2 — SaaS business platform
- [ ] **[FND-010 #10](https://github.com/vietkeynet/next-saas-starter/issues/10)** Billing/plan entitlement/quota, idempotent webhooks, VN gateway abstraction.
- [ ] **[FND-011 #11](https://github.com/vietkeynet/next-saas-starter/issues/11)** Email, notifications, API keys, outgoing webhooks and background jobs.
- [ ] **[FND-012 #12](https://github.com/vietkeynet/next-saas-starter/issues/12)** CMS pages/blog/SEO/multilingual VI/EN + moderation/publishing.
- [ ] **[FND-013 #13](https://github.com/vietkeynet/next-saas-starter/issues/13)** Media library + safe MinIO/S3 adapter and authorization.
- [ ] **[FND-014 #14](https://github.com/vietkeynet/next-saas-starter/issues/14)** CRUD/data grid/form patterns and reusable tenant-scoped example module.

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
- **GitHub Issues: ENABLED** — #1–#16 created on 2026-10-24. Track actual progress and blockers in each linked issue; do not close until implemented, reviewed and staging-verified.
- **Coolify MCP not available to this ChatGPT session** — configure preview through agent environment with connected Coolify MCP or Coolify dashboard; never claim webhook/deployment succeeded without live verification.
- **CI status** — GitHub Actions was triggered; existing Prune initially failed due an unmarked changelog link and a React lint error, both patched on the integration branch. Foundation CI initially queued without an available self-hosted runner; validation temporarily moved to GitHub-hosted runners, and all checks require fresh evidence before marking DONE.
- **Known Free limitations** — mock admin, Google-only sign-in, Pro preview screens, MDX not CMS.

## Progress log
- 2026-10-24: Created `feat/vkn-saas-foundation`; roadmap/agent workflow and GitHub Issues #1–#16 active; draft integration PR [#17](https://github.com/vietkeynet/next-saas-starter/pull/17). Initial prune/lint fixes landed; CI rerun is required. Coolify preview not verified.
