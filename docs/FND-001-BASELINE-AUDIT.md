# FND-001 — Baseline inventory and security audit

**Repository:** `vietkeynet/next-saas-starter`  
**Audited ref:** `feature/FND-001-baseline-inventory-security-audit`, based on `origin/feat/vkn-saas-foundation` at `ed940242262d46efe7c2daf3b5d43d922335910c` (fetched 2026-10-24).  
**Scope:** source inventory and local baseline only; no database connection or staging deployment performed.  
**Attribution:** Minh Tuấn — WhatsApp: 0912537003 — Email: vietkeynet@gmail.com

## Evidence and commands

Observed on this branch; these are local command outcomes, not hosted CI claims:

| Command | Result | Evidence |
|---|---|---|
| `pnpm install --frozen-lockfile` | BLOCKED | pnpm returned `ERR_PNPM_IGNORED_BUILDS` while downloading packages; install did not complete. Not retried. |
| `pnpm test` | PASS | Node test runner: 4 tests, 4 pass, 0 fail, 0 skipped; duration 96.907832 ms. Repository contract tests only, not domain or E2E coverage. |
| `pnpm lint` | PASS | `eslint` exited successfully; no diagnostics. |
| `pnpm typecheck` | PASS | `tsc --noEmit` exited successfully. |
| `pnpm build` | Build artifact observed; exit status UNCAPTURED | Next.js 16.3.4/Turbopack reached TypeScript completion and `.next/BUILD_ID` exists; command final exit code was not captured. Do not report build as verified PASS. |
| Production HTTP smoke | MIXED (local production server) | Started with detached `setsid sh -c 'pnpm start ...'` session and curled while server was alive, then killed recorded PID. `/` 200, `/api/search` 200, `/robots.txt` 200; `/login`, `/register`, `/dashboard` 404 because required local services/features are not configured. This is not authenticated-route E2E or staging evidence. |
| E2E | NOT RUN | No browser/E2E test runner or script observed in `package.json`. |
| Coolify preview | BLOCKED / UNVERIFIED | Coolify MCP access unavailable/rejected in this environment; no staging URL, deployment SHA, or runtime evidence. No production access used. |

Do not run `pnpm db:migrate`, `pnpm db:push`, or connect to a non-isolated database as part of this audit. Reproduction commands are from repository root.

## Free and Pro behavior from source

Feature flags in `config/features.ts` default `auth`, `billing`, `admin`, `docs`, `blog`, and `changelog` on. `config/foundation.ts` gates modules on required environment variables; flags hide/guard routes and APIs, not database schema. Pro state appears as nav metadata and preview components; no local Pro implementation found.

- Authentication uses Better Auth with Google/One Tap integration (`app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`, `lib/auth/server.ts`). Registration page states email sign-in is Pro; do not infer email/password support from plugin availability.
- Billing configures Better Auth Stripe subscriptions, organization references and plan names (`lib/auth/server.ts`, `modules/billing/plans.ts`). Price IDs are server-side environment values; client must not select arbitrary price/amount. Live Stripe checkout/webhook was not tested.
- Free admin page displays sample user records (`components/admin/sample-users.ts`, `components/admin/users-preview.tsx`); user-management API endpoints are explicitly denied at `/api/auth/admin/*` (`app/api/auth/[...all]/route.ts`). Preview-role cookie changes only displayed role, bound to session ID, and does not modify `user.role` (`modules/admin/preview.ts`, `modules/admin/preview-actions.ts`).
- Pro preview datasets are static/inert: member/invitation rows (`components/dashboard/pro/members-preview.tsx`), email log (`emails-preview.tsx`), invoice history (`invoices-preview.tsx`), security-session rows (`security-preview.tsx`), Sentry feature rows (`sentry-preview.tsx`), and billing/email-template previews. Routes mark sample data at invoices, email templates, emails, members and security. `components/marketing/onboarding-demo.tsx` is an illustrative animated demo, not persisted onboarding.
- Dashboard profile/general settings and account/org deletion have source-backed flows. Organization UI includes active-organization switching, but Pro members route is a static preview; generated Better Auth organization schema does not establish a working Pro membership UI.
- Docs/blog/changelog/legal are repository MDX (`content/docs`, `content/blog`, `content/changelog`, `content/legal`) surfaced through `lib/content/*`; no CMS editor or publishing database found.

## App Router route inventory

Route groups are omitted from public URLs. Dynamic segments shown literally. `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/favicon.ico` are metadata/assets, not page routes.

| Public route | Source | Behavior/guard |
|---|---|---|
| `/` | `app/(marketing)/page.tsx` | Marketing home |
| `/pricing` | `app/(marketing)/pricing/page.tsx` | Billing feature route |
| `/privacy` | `app/(marketing)/privacy/page.tsx` | Legal MDX |
| `/terms` | `app/(marketing)/terms/page.tsx` | Legal MDX |
| `/blog` | `app/(marketing)/blog/page.tsx` | MDX blog list |
| `/blog/[slug]` | `app/(marketing)/blog/[slug]/page.tsx` | MDX article |
| `/changelog` | `app/(marketing)/changelog/page.tsx` | MDX list |
| `/changelog/[slug]` | `app/(marketing)/changelog/[slug]/page.tsx` | MDX entry |
| `/docs/[[...slug]]` | `app/(docs)/docs/[[...slug]]/page.tsx` | Fumadocs optional catch-all |
| `/login` | `app/(auth)/login/page.tsx` | Auth UI |
| `/register` | `app/(auth)/register/page.tsx` | Google sign-up UX; email sign-in offered as Pro |
| `/dashboard` | `app/(app)/dashboard/page.tsx` | Auth + organization session guard |
| `/dashboard/settings/profile` | `app/(app)/dashboard/settings/profile/page.tsx` | Profile settings |
| `/dashboard/settings/security` | `app/(app)/dashboard/settings/security/page.tsx` | Pro preview |
| `/dashboard/organization/general` | `app/(app)/dashboard/organization/general/page.tsx` | Organization settings |
| `/dashboard/organization/members` | `app/(app)/dashboard/organization/members/page.tsx` | Pro preview |
| `/dashboard/onboarding` | `app/(app)/dashboard/onboarding/page.tsx` | Preview surface; persistence not established |
| `/dashboard/billing` | `app/(app)/dashboard/billing/page.tsx` | Billing module/Stripe configuration required |
| `/dashboard/billing/invoices` | `app/(app)/dashboard/billing/invoices/page.tsx` | Sample invoices + Pro preview |
| `/dashboard/email-templates` | `app/(app)/dashboard/email-templates/page.tsx` | Pro preview |
| `/dashboard/emails` | `app/(app)/dashboard/emails/page.tsx` | Pro preview |
| `/admin` | `app/(app)/admin/page.tsx` | Auth/admin-view guard; sample users only |
| `/admin/sentry` | `app/(app)/admin/sentry/page.tsx` | Pro preview |
| `GET,POST /api/auth/[...all]` | `app/api/auth/[...all]/route.ts` | Better Auth; disabled with auth off; admin endpoints refused; Stripe/subscription routes feature-gated |
| `GET /api/search` | `app/api/search/route.ts` | Fumadocs search; docs feature-gated |

## Data, schema, migration, dependencies

- `lib/db/schema/auth.ts` contains generated Better Auth PostgreSQL tables: account, invitation, member, organization, session, subscription, team, team_member, user, verification. It is auth/org/Stripe-oriented, not app-owned business entities.
- `drizzle/0000_lush_cyclops.sql` creates those tables, cascading foreign keys and indexes. Initial DDL (`CREATE TABLE`/`ALTER TABLE`/indexes); no drop operation observed in this file. Journal/snapshot: `drizzle/meta/_journal.json`, `drizzle/meta/0000_snapshot.json`. Fresh isolated DB and migration rollback/restore not tested. Schema exists independent of feature flags (`config/features.ts`).
- `lib/db/index.ts` uses `@neondatabase/serverless` `Pool` with `drizzle-orm/neon-serverless`; WebSocket Pool explicitly supports transactions during account/org/member creation. `drizzle.config.ts` prefers `DATABASE_URL_UNPOOLED` for migrations, falls back to `DATABASE_URL`. Neon-specific driver is a constraint for ordinary self-hosted PostgreSQL (FND-004); do not point migration scripts at production.
- `package.json` pins Next.js/React/Fumadocs/auth/Stripe/Drizzle libraries and includes test, lint, typecheck, build, migration and schema-push scripts. `pnpm test` is only `node --test tests/*.test.mjs`; no integration/E2E runner dependency/script observed. Frozen install blocked by ignored-build policy, so clean dependency install and package build scripts are unverified. No dependency audit command result produced.
- `LICENSE.md` identifies MIT; `tests/repository-contract.test.mjs` checks MIT text and `mickasmt` attribution. Preserve attribution. Inventory statements above derive from source/configuration, not README claims.

## Security findings and follow-up

No critical/high issue evidenced by this limited static baseline; not a penetration test or independent security sign-off. Risks:

| Severity | Finding / evidence | Follow-up |
|---|---|---|
| Medium — deployment risk | `modules/admin/preview-actions.ts` allows signed-in users to choose a display-only admin role when `DEMO_MODE=true`; `components/admin/demo-banner.tsx` exposes switch. It is not used for database/API authorization, and `/api/auth/admin/*` is denied. `.env.example` says keep it unset. | Keep `DEMO_MODE` unset on public deployments; test role boundaries in FND-006/FND-015. |
| Medium — compatibility constraint (not a vulnerability finding) | Neon serverless DB driver and pooled/direct URLs (`lib/db/index.ts`, `drizzle.config.ts`, `.env.example`) constrain self-hosting; migrations need deliberate direct staging connection. | FND-004: validate isolated PostgreSQL adapter, transactions, fresh migration, backup and rollback before claiming support. |
| Medium — coverage gap | Existing tests are four repository contract tests; no authorization/tenant integration or browser E2E suite. | FND-015: add domain tests and negative authorization/E2E before release. |
| Low — claim clarity | Several authenticated screens render static Pro preview datasets; CMS content is MDX. | Keep feature claims explicit; implement separately in assigned issues. |

No secret values are included. No database or production resource accessed.

## Status boundary

Inventory, test/lint/typecheck evidence and local public HTTP subset are recorded. Build final exit status remains uncaptured; staging, PR review and merge remain outstanding. Keep FND-001 unchecked and do not close issue before acceptance and staging verification.
