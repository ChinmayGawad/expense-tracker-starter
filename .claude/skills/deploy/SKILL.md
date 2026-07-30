---
name: deploy
description: Run tests, build the production bundle, and push to the staging branch.
---

# Deploy Skill

Run the full deploy pipeline: lint → build → push to staging.

## Steps

### 1. Run lint checks

```bash
npm run lint
```

If lint fails, stop and report the errors. Do not proceed to build.

### 2. Build production bundle

```bash
npm run build
```

If the build fails, stop and report the errors. Do not proceed to push.

### 3. Push to staging branch

Create or update the `staging` branch from the current commit and push to origin:

```bash
git branch -f staging HEAD
git push origin staging --force
```

> **Note:** The staging branch is force-pushed so it always reflects the exact commit that passed lint + build. This is a linear deploy pipeline — the staging branch is overwritten each time, not merged into.

## Rollback

If a staging deployment needs to be rolled back, re-run this skill at the previous known-good commit (using `git checkout <previous-tag-or-hash>` first), or manually force-push an earlier commit to the staging branch.
