# Basic Repo Standards Audit

**Date:** 2026-09-12
**Repo:** `testing` (single project, not a monorepo — one app at the root)
**Stack:** React 19, Vite, Tailwind CSS v4, oxlint (per `CLAUDE.md` / `package.json`)

## Summary

| Check | Status |
|---|---|
| 1. README | ❌ Generic → **fixed** |
| 2. CLAUDE.md | ⚠️ Missing a few sections → **not edited** (file explicitly says "Do not edit this Markdown file") |
| 3. CI | ❌ Missing entirely → **fixed** |
| 4. Secrets / .gitignore / .env.example | ✅ Clean, no action needed |
| 5. Codebase structure | ⚠️ One gap found (no tests) — pending decision |

## 1. README

**Finding:** `README.md` was the generic scaffolding template for "React Webview
Template" — `degit`-based setup instructions for a template repo, plus a stray
leftover `# testing` heading at the end. It did not describe this repo's actual
contents (a todo list, product listing, and user dashboard demo) or match its
actual scripts/structure.

**Fix applied:** Rewrote `README.md` to describe the actual app, its
prerequisites, the real `npm` scripts (`dev`, `build`, `preview`, `lint` — all
verified against `package.json`), the actual `src/features/*` structure, and a
pointer to `CLAUDE.md`.

## 2. CLAUDE.md

**Finding:** The existing `CLAUDE.md` already has: the required goal statement,
a factual Tech Stack section, and discrete headed sections for project
structure, data fetching, naming conventions, dependency policy, and
colors/styling. Per the standard rubric it is missing three sections: **Error
Handling** convention, **Testing** expectations, and **Commits & PRs**
conventions.

**Action taken:** None. The file's own first line states **"Do not edit this
Markdown file"** — that explicit, checked-in instruction was respected and
takes precedence over this skill's normal auto-fix behavior for `CLAUDE.md`.
This is left as an open item for the team to address directly if they choose.

## 3. GitHub Actions / CI

**Finding:** No `.github/workflows/` directory existed — no CI at all. The repo
has a `lint` script (oxlint) and a `build` script (`vite build`) but no test
script/framework.

**Fix applied:** Added `.github/workflows/ci.yml` with a workflow named `CI`
and two explicitly named jobs, `lint` and `build`, triggering on `push` and
`pull_request` to `[main, master]` (repo's actual default branch is `main`;
`master` included so the trigger survives a rename or a differently-configured
fork). No test job was added since no test framework/script exists yet (see
check 5).

## 4. Secrets, `.gitignore`, `.env.example`

**Finding:** No tracked env/secret-shaped files (`git ls-files` checked for
`.env*`, `*.pem`, `*.key`, `credentials*`, `*secret*` — none found).
`.gitignore` already covers `.env`. No environment variables are read anywhere
in the code (`import.meta.env` / `process.env` — no matches), so a
`.env.example` isn't needed.

**Action taken:** None needed — this check is clean.

## 5. Codebase structure

Single app at the repo root. Structure follows the feature-based layout
`CLAUDE.md` prescribes (`src/features/<feature>/{components,hooks,services,utils}`),
files are small (largest is 98 lines), and no duplicated logic or god-files
were found across `todo-list`, `product-listing`, or `user-dashboard`.

**Structural gap found:**

1. **No test coverage** — no test framework (no `vitest`/`jest`/etc. in
   `package.json`) and no test files exist anywhere in the repo. `todo-list`'s
   `useTodos` hook (localStorage persistence, filtering) and
   `user-dashboard`'s profile save/refresh flow are the two most testable and
   currently-untested pieces of logic.

**Refactor plan:** Asked whether to draft a plan to add test coverage; declined
for now. Left as an open item — no test framework or files were added.
