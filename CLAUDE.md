# NégoMaster — CLAUDE.md

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

Available gstack skills:
- `/office-hours` — describe what you're building, get structured guidance
- `/plan-ceo-review` — product/strategy review of a feature idea
- `/plan-eng-review` — engineering architecture review
- `/plan-design-review` — design review
- `/design-consultation` — design consultation
- `/design-shotgun` — rapid design exploration
- `/review` — code review on current branch
- `/ship` — prepare and ship a PR
- `/land-and-deploy` — land and deploy
- `/canary` — canary deploy
- `/benchmark` — benchmark
- `/browse` — headless browser navigation
- `/connect-chrome` — connect to Chrome
- `/qa` — QA with real browser
- `/qa-only` — QA without deploy
- `/design-review` — visual design review
- `/setup-browser-cookies` — setup browser cookies
- `/setup-deploy` — setup deploy config
- `/retro` — retrospective on recent commits
- `/investigate` — investigate a bug or issue
- `/document-release` — document a release
- `/codex` — Codex integration
- `/cso` — security officer review (OWASP + STRIDE)
- `/autoplan` — auto-generate a plan
- `/careful` — careful mode for risky changes
- `/freeze` — freeze a file from AI edits
- `/guard` — guard mode
- `/unfreeze` — unfreeze a file
- `/gstack-upgrade` — upgrade gstack
