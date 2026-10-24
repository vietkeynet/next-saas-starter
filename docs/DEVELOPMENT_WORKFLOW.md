# Agent SDLC: Issue → Code → Test → PR → Coolify → Verify → Repeat

## Operating rules
- Work only on `vietkeynet/next-saas-starter`; protect original upstream and branch `main`.
- Long-lived integration branch: `feat/vkn-saas-foundation`. Feature branch: `feature/FND-XXX-short-name` based on latest integration HEAD.
- GitHub Issues #1–#16 are enabled and authoritative for status; use `docs/ISSUE_BACKLOG.md` to consult detailed acceptance criteria.
- Do not imply any action was performed if access, CI runner, Coolify MCP or credentials are missing.
- Do not copy private Pro version source; implement missing functionality independently using public framework APIs.
- No blind retry loops, auto-merge to main, secret exposure or destructive DB migration without permission.

## Loop for each issue (agent instructions)
1. **DISCOVER:** Pull/fetch branch and review `AGENTS.md`, `docs/ROADMAP.md`, `TODO.md`, ticket acceptance, existing code, module flags, Next.js 16 docs and upstream diffs. Inspect first; report blockers.
2. **PLAN:** Define smallest coherent change, affected interfaces, DB schema/migration, server-side authorization and tests. Reuse Better Auth, Drizzle, and existing UI. Prefer actual functionality over preview/mock pages.
3. **BRANCH:** From latest integration, create `feature/FND-XXX-slug`. One issue → one or more reviewable PRs, not one giant PR.
4. **BUILD:** Implement functionality and appropriate migrations; keep license, config/features.ts, nav, prune markers, AGENTS.md, docs and tests in sync. No hardcoded tokens or localhost defaults in production.
5. **VERIFY LOCALLY:** `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`. On auth/tenant/billing changes run integration+E2E; test negative permissions.
6. **OPEN PR:** Target `feat/vkn-saas-foundation`. Include ticket ID, before/after behavior, migration risk, screenshots, reproducible test results and rollback. Use repository PR template. Require review.
7. **CI/REVIEW:** Inspect all checks, run code/security review and address comments; never auto-approve own security-sensitive change.
8. **MERGE INTO INTEGRATION:** Only after green checks and reviewer approval. If any check is queued/blocked, resolve runner and document; do not bypass protections.
9. **VERIFY COOLIFY:** Auto-deploy from *integration branch push* through GitHub App/webhook. Read deployment logs; compare deployed SHA to merge SHA; check HTTPS URL, health, user journeys and responsive UI. If staging is not configured, mark blocked and do not close issue as fully verified.
10. **UPDATE STATUS:** Update TODO/roadmap/docs, add verification evidence and actual links to issue, close only after deployed acceptance.
11. **REPEAT:** Pick next unblocked ticket by priority/dependency and iterate; ask for owner decision on ambiguous scope or destructive actions.

## Current CI reality
- The fork initially had only `.github/workflows/prune.yml`.
- `.github/workflows/foundation-ci.yml` adds a baseline Node 22/pnpm 10 GitHub-hosted validation job for contract tests, lint, typecheck, production build and HTTP smoke until the organization self-hosted runner is verified online under FND-002.
- `pnpm test` starts with lightweight repository contract tests; these **do not replace** real domain unit tests, integration tests or browser E2E. FND-015 must add these and make them blocking for sensitive changes.
- Never execute untrusted fork PR code on a privileged self-hosted runner. The workflow limits PR execution to same-repository heads; review any future runner/trigger expansion.
- Self-hosted runner labels/group must be confirmed in GitHub Actions; if unavailable, document blocker and use an explicitly approved, isolated runner.

## Permission matrix required for all new domain models
| Actor | Public content | Own profile | Org data | Org users | Platform admin |
|---|---|---|---|---|---|
| Anonymous | Read published | No | No | No | No |
| Auth user | Read | Own only | Member scope | As role allows | No |
| Org member | Read | Own only | Authorized reads | No elevated writes | No |
| Org admin/owner | Read | Own only | Authorized writes | Manage by role | No |
| Platform admin | Read | Own/admin policies | Audited admin access | Audited | Yes |

Use `getActiveOrganization()` to derive tenant from session, server-side `requireRole` and appropriate policy helpers; do not trust `orgId` supplied by client. Negative test tenant IDOR, forged resource IDs, ownership transfer and cross-org membership.

## Pull request/release rules
- Feature PR: `feature/FND-XXX` → `feat/vkn-saas-foundation`.
- Integration PR: `feat/vkn-saas-foundation` → `main` stays DRAFT until M0–M5 requirements and owner approval.
- NEVER let Coolify preview auto-deploy main/production by modifying its repo branch.
- Auto-deploy on commit is independent from CI: staging might briefly receive a failing commit. Coolify should retain previous healthy deployment; if unsafe, route pushes through an approved gated deployment trigger.
- Production release requires owner approval, verified backups/migrations and a rollback strategy; no automatic production merge/deploy.

## Evidence template per PR
```
Ticket: FND-XXX / GitHub #NN (once Issues enabled)
Base / head:
Scope:
Security/tenant policy:
Schema/migration/rollback:
Commands + PASS/FAIL evidence:
CI run URL:
Coolify app/environment + deploy ID + SHA:
Preview URL (no secret) + screenshots:
Known gaps:
Reviewer decision:
```

## Agent status update
After each task update `TODO.md` and post issue/PR summary: DONE / IN PROGRESS / BLOCKED, code commit, tests, deploy status, next unblocked ticket. Never count documentation progress as completed functional implementation.
