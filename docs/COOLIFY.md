# Coolify: isolated development-branch preview and automatic deployments

## Objective
Live, reviewable, self-hosted staging deployment of `vietkeynet/next-saas-starter` branch `feat/vkn-saas-foundation` with rebuild on **push**. Production `main` and existing apps/databases MUST remain unchanged.

## Preconditions and approval
1. Discover existing Coolify MCP/tools in the agent runtime. Check server, project, environment, application list and permissions first. DO NOT create duplicate apps or replace production.
2. Require explicit approval before destructive app/domain/database changes. Never disclose Coolify tokens, keys or credentials in issues/PR/logs.
3. Check DNS, network, domain availability, CPU/RAM/disk and available ports; choose a *distinct staging URL*, not a known production hostname.
4. The application is publicly visible only after access controls are configured; use basic auth/allowlist on the preview as appropriate.
5. Dedicated STAGING database and least-privileged user; never reuse a production database.

## Recommended connection and auto-deploy
**Preferred:** In Coolify, add GitHub App source with repository access limited to `vietkeynet/next-saas-starter`; create/reuse application from that repo with branch `feat/vkn-saas-foundation`; under **Advanced > Deployment**, select **Deploy on push (webhooks)**. GitHub App integrates webhooks; no manual webhook needed.

**Public Git source fallback:** Create app from `https://github.com/vietkeynet/next-saas-starter.git`, set same branch, then configure a **signed manual Git webhook** in Coolify Webhooks and GitHub Settings > Webhooks (push event, JSON, matching secret). Merely pasting a public repository URL does **NOT** enable auto deploy.

Do not depend on MCP to monitor commits continuously: Coolify's built-in GitHub webhook starts deployment. MCP is for discovery/configuration/inspection when available.

Official documentation:
- https://coolify.io/docs/applications/sources/github/auto-deploy
- https://coolify.io/docs/applications/deployments/automatic-deployments
- https://coolify.io/docs/applications/deployments/manual-webhooks

## Application build configuration (starting point)
| Setting | Value / guard |
|---|---|
| Repository | `vietkeynet/next-saas-starter` |
| Branch | `feat/vkn-saas-foundation` only |
| Build pack | Nixpacks initially, or Railpack after trial; Dockerfile if deterministic packaging required |
| Base directory | `/` |
| Node runtime | 22 |
| Install | `corepack enable && pnpm install --frozen-lockfile` (builder-specific shell) |
| Build | `pnpm build` |
| Start | `pnpm start` |
| Internal port | `3000` |
| Persistent data | PostgreSQL separate service, NEVER bundled into disposable app filesystem |
| Domain | User-approved STAGING subdomain; do not invent one |

**Environment variables** (secrets set in Coolify, never repo):
- `DATABASE_URL`: staging Postgres; original Free code uses Neon driver, see FND-004 for local PG support.
- `DATABASE_URL_UNPOOLED`: direct migration connection where needed.
- `BETTER_AUTH_SECRET`: secure newly generated staging secret.
- `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL`: actual HTTPS preview URL, matched exactly.
- `GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET`: optional initially; Free starter's real sign-in depends on Google while FND-005 unfinished.
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, prices: sandbox ONLY if testing billing. Otherwise billing stays disabled.
- Exclude known demo admin mode from any internet-facing instance.

**Migration:** First snapshot/backup staging DB, run `pnpm db:migrate` against staging database as a deliberate release step. No `db:push` on production. Do not auto-run destructive migrations on every push.

## Deployment verification (required on every integration push)
1. Record pushed `commit SHA`, CI status and Coolify deploy event ID/time.
2. Verify webhook delivery + matching configured branch and commit.
3. Inspect Coolify build and runtime logs for dependency/build/runtime errors.
4. Check HTTP `/`, `/login`, `/dashboard` expected auth behavior; real role/org E2E when credentials are available.
5. Test small viewport/mobile and major user navigation flows.
6. Publish sanitized screenshot, URL, SHA and result in PR/issue.
7. Failed deployment: preserve logs and rollback to last healthy staging SHA; **never** silently deploy main or production.

## Blocking conditions
No connected Coolify MCP/project credentials in an agent runtime means **configuration is unverified**. Produce clear blocker with exact resource/scope needed. Do not assert preview is live.
