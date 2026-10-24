# Ready-to-create GitHub Issues — vietkeynet/next-saas-starter

> GitHub Issues were enabled on 2026-10-24. All 16 tickets have been created as real GitHub Issues #1–#16. This file is their durable planning reference; use GitHub Issues for actual task state.
> Priority execution: P0 foundation → P1 auth/admin/tenant → P2 SaaS/CMS/UX, with FND-015 and FND-016 running as release-quality tracks. All feature PRs target `feat/vkn-saas-foundation` and finish with test evidence and Coolify verification.

## Rules for ticket implementers
- Use ONE issue per feature PR; create `feature/FND-XXX-slug` from updated integration branch.
- Reference `docs/DEVELOPMENT_WORKFLOW.md`; never commit secrets or bypass server authorization.
- Provide screenshots for UI, test/CI links for all work, exact commit SHA/deployment for staging.
- A ticket is DONE only after passing acceptance conditions, code review, PR merge to integration and preview verification.
- If dependencies unresolved, mark blocked and work the next independent ticket. Don't silently skip acceptance.

## FND-001 / [#1](https://github.com/vietkeynet/next-saas-starter/issues/1) — [P0] Baseline inventory & security audit

**Dependencies:** None.

**Tasks**
- [ ] Document actual Free/Pro behavior, all app routes, mock datasets, migration and dependency risks; run baseline pnpm lint/typecheck/build with raw evidence.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Inventory linked paths and reproducible commands; risks have severity and follow-up; no product claims based on README alone.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-002 / [#2](https://github.com/vietkeynet/next-saas-starter/issues/2) — [P0] Trusted CI on integration branch

**Dependencies:** FND-001.

**Tasks**
- [ ] Verify self-hosted runner LXC209 and new foundation-ci workflow; enforce smoke/contract/lint/typecheck/build; integrate genuine tests and protect main.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Push and same-repo PR checks execute; no missing tests portrayed as complete; log links and gating recommendations recorded.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-003 / [#3](https://github.com/vietkeynet/next-saas-starter/issues/3) — [P0] Coolify auto-deploy staging preview

**Dependencies:** FND-002, FND-004 for authenticated preview.

**Tasks**
- [ ] Discover Coolify via MCP, create/reuse **isolated staging** app tracking integration branch; set secrets, webhook and domain; verify every push SHA.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Signed push webhook or GitHub App verified; healthy HTTPS preview, commit SHA/logs/screenshots recorded; production untouched.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-004 / [#4](https://github.com/vietkeynet/next-saas-starter/issues/4) — [P0] Self-hosted PostgreSQL & secret/migration discipline

**Dependencies:** FND-001.

**Tasks**
- [ ] Replace Neon-specific DB driver with node-postgres-compatible Drizzle driver; preserve transaction/auth, isolated staging DB, migration/rollback/backup.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Fresh migration and org/user persistence after restart; no shared production DB or secrets in repo.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-005 / [#5](https://github.com/vietkeynet/next-saas-starter/issues/5) — [P1] Email/password, verification, reset, OAuth

**Dependencies:** FND-004.

**Tasks**
- [ ] Enable Better Auth email/password, reset+verification via SMTP, optional Google; implement UI and rate limits; test anti-enumeration.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] E2E register, verify, login, logout, reset, session persistence and invalid-token cases all pass.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-006 / [#6](https://github.com/vietkeynet/next-saas-starter/issues/6) — [P1] Real super-admin user management

**Dependencies:** FND-005.

**Tasks**
- [ ] Remove sample-user mock and Pro-blocked actions; implement server-authorized admin user list/search, role assignment, ban/unban, pagination and auditable actions; safely expose necessary admin APIs.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Authenticated non-admin cannot call admin endpoints; admin actions persist to DB and reflect in UI; tests cover privilege escalation.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-007 / [#7](https://github.com/vietkeynet/next-saas-starter/issues/7) — [P1] Organizations, members, team invitations

**Dependencies:** FND-005.

**Tasks**
- [ ] Implement organization list/switch, invite/accept/revoke, owner/admin/member roles, role changes, membership lifecycle and email UX.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Two-org test: user roles and invites persist; unauthorized cross-tenant invitations blocked; proper pending/expired invite UX.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-008 / [#8](https://github.com/vietkeynet/next-saas-starter/issues/8) — [P1] RBAC policy engine and strict tenant isolation

**Dependencies:** FND-006, FND-007.

**Tasks**
- [ ] Enforce server-side org scope in every route/action/query/API; define permission matrix and least privilege; add negative tests for forged org IDs/resource IDs and cross-tenant reads/writes.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Automated tenant A→B attempts return 403/404, no leaks; security review approves permission matrix.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-009 / [#9](https://github.com/vietkeynet/next-saas-starter/issues/9) — [P1] Account security, 2FA, audit and abuse prevention

**Dependencies:** FND-005, FND-008.

**Tasks**
- [ ] Add Better Auth two-factor/session revocation where supported, event audit logs with actor/org, rate limits, retention and safe privacy controls.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] 2FA enrol/recovery/revoke E2E, admin actions audited, sensitive logs redacted, request throttling tested.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-010 / [#10](https://github.com/vietkeynet/next-saas-starter/issues/10) — [P2] SaaS billing, entitlements, quota and VN payment adapter

**Dependencies:** FND-007, FND-008.

**Tasks**
- [ ] Separate subscriptions/entitlements from Stripe provider; test webhook signatures/idempotency, upgrades/downgrades/cancel/failed payments; design optional VN gateway.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Stripe sandbox lifecycle passing, no privilege from forged pricing, effective entitlements enforced server-side; VN provider only if credentials approved.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-011 / [#11](https://github.com/vietkeynet/next-saas-starter/issues/11) — [P2] Email, notifications, API keys, outgoing webhooks and jobs

**Dependencies:** FND-008.

**Tasks**
- [ ] SMTP/React Email templates, in-app notifications, hashed scoped API keys, revocation, signed outgoing webhooks/retry/dead-letter, background tasks.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Tenant-scoped token checks; expired/revoked keys rejected; event retries idempotent; email test delivered.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-012 / [#12](https://github.com/vietkeynet/next-saas-starter/issues/12) — [P2] CMS website: pages, posts, publishing and VI/EN SEO

**Dependencies:** FND-006, FND-008.

**Tasks**
- [ ] Evaluate Payload vs native CMS without changing existing MDX route blindly; add admin content editor with draft/publish, pages/categories, metadata and VI/EN locales.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Authorized editor publishes page without code commit, public page renders on mobile; unauthorized publishing forbidden.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-013 / [#13](https://github.com/vietkeynet/next-saas-starter/issues/13) — [P2] Media library and MinIO/S3-compatible storage

**Dependencies:** FND-008.

**Tasks**
- [ ] Implement storage adapter local/S3, signed access, MIME and size validation, virus scan optional, tenant quotas, cleanup and object lifecycle.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Upload/download/delete access controlled per tenant; MinIO staging smoke; object keys and URLs not exposed across tenants.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-014 / [#14](https://github.com/vietkeynet/next-saas-starter/issues/14) — [P2] Reusable CRUD/grid/forms and sample tenant-scoped app

**Dependencies:** FND-008, FND-012 optional.

**Tasks**
- [ ] Create templates for paginated searchable grid, filters, forms, validation, import/export, permissions; ship one product/project CRUD module.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] All CRUD operations run against PostgreSQL with tenant tests; new app can reuse components without editing auth core.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-015 / [#15](https://github.com/vietkeynet/next-saas-starter/issues/15) — [P0 release gate] Real automated test coverage, security & performance

**Dependencies:** FND-002, FND-008.

**Tasks**
- [ ] Add Vitest/integration DB/Playwright E2E and critical regression suite, audit deps, accessibility/mobile, perf budgets, backups restore drill.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Full green test evidence for auth/admin/tenant/billing/CMS, zero high/critical, documented backup restore and rollback.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.


## FND-016 / [#16](https://github.com/vietkeynet/next-saas-starter/issues/16) — [P0 release gate] Agent SDLC, PR automation, Coolify verification, upstream-sync and release

**Dependencies:** FND-001..003.

**Tasks**
- [ ] Codify issue→feature branch→commit→CI→PR→review→merge integration→Coolify verify; protect main; maintain docs, CHANGELOG and upstream updates.
- [ ] Add/update unit/integration/E2E tests and follow project conventions, security model and documentation.
- [ ] Raise feature PR against integration branch with screenshots where appropriate and logs.
- [ ] Verify commit SHA and review in Coolify preview (unless blocked; document blocker explicitly).

**Acceptance criteria**
- [ ] Two sample issue-to-PR cycles validated; release checklist and owner approval; evidence links in every merged PR.
- [ ] No unresolved critical/high security issue introduced.
- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build` and relevant E2E have recorded results.
- [ ] PR reviewed/merged and TODO updated.



## Tracking real GitHub Issues

All tickets exist at [GitHub Issues](https://github.com/vietkeynet/next-saas-starter/issues), numbered #1 through #16. Use these IDs, preserve acceptance criteria, and close only after reviewed PR merge and verified staging. Maintain `TODO.md` and roadmap links if ticket scope changes.
