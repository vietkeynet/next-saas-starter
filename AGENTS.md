<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Modules

Every module in `config/features.ts` can be deleted for good with `pnpm modules:prune <module...>`. Keep it working whenever you add code:

- Code used by a single module goes in a path listed in that module's `files`: a new page under its route folder, a component in its own folder. Add the path to `files` if it isn't covered yet.
- Code for a module inside a shared file gets a marker, removed with the module:
  - one line: a trailing `// module:<key>` comment;
  - a block: `// module:<key> start` and `// module:<key> end` on their own lines.
  - `module:<key>,<key>` is removed once all the listed modules are pruned.
  - Use `#` in `.env.example`, `{/* */}` in MDX.
- A package used only by modules goes in their `packages`.
- A new module declares its `files`, `packages` and `routes`.

Check with `pnpm modules:prune <module>`: without `--yes` it only prints what it would delete.


# VKN autonomous delivery contract

**Before coding**, read [TODO.md](TODO.md), [Roadmap](docs/ROADMAP.md), [Issue backlog](docs/ISSUE_BACKLOG.md), [SDLC playbook](docs/DEVELOPMENT_WORKFLOW.md), and [Coolify staging](docs/COOLIFY.md).

- Repository: `vietkeynet/next-saas-starter`. Keep `main` stable, do not edit original upstream.
- Integration branch: `feat/vkn-saas-foundation`. Work on `feature/FND-XXX-slug` based on the latest integration commit; PRs target integration, not `main`.
- Choose the highest priority unblocked ticket. If GitHub Issues is disabled, use the matching FND ticket in `docs/ISSUE_BACKLOG.md` until enabled.
- For every change: DISCOVER → PLAN → BUILD → TEST → REVIEW → PR → MERGE integration → VERIFY Coolify commit and URL → UPDATE TODO → NEXT ISSUE.
- Make functionality real: mock admin, locked Pro previews and sample data never count as feature completion.
- Use self-hosted PostgreSQL only after checking the environment; never point staging migrations to production.
- Every user-facing API/Server Action must verify session, tenant membership and role **on the server**. Add positive and negative tests, including cross-tenant access attempts.
- Follow Next.js 16 and Better Auth authoritative docs; preserve module feature flags, routes, prune markers and MIT license.
- Execute `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`; extend unit/integration/Playwright E2E as required. Record exact outputs and blockers. Do not falsely mark checks green.
- Coolify staging tracks **only** `feat/vkn-saas-foundation`. A push should trigger GitHub webhook auto-deploy after configured; verify commit SHA, live URL and deployment logs. Never assume a Coolify MCP exists without discovering it.
- Do not commit tokens or passwords, auto-merge to main, remove project data, change production domains or upgrade production DB without explicit owner approval.
- PR description uses `.github/pull_request_template.md`. After merged feature PR and verified staging, update `TODO.md`, docs and GitHub issue with evidence.
- GitHub Issues #1–#16 are enabled; work from an actual linked Issue rather than a backlog placeholder. If blocked (runner offline or Coolify MCP unavailable), report and continue a safe independent item instead of inventing progress.
