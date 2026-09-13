# testing

<!-- demo-pr-b: commit 1 of 2 -->
<!-- demo-pr-b: commit 2 of 2 -->


A small React + Vite + Tailwind CSS demo app with three self-contained
features: a todo list, a paginated product listing with infinite scroll, and
an editable user profile dashboard. Data fetching and caching go through
[TanStack Query](https://tanstack.com/query).

## Prerequisites

- Node.js and npm installed locally

## Setup

```sh
npm install
```

## Run / build / test

```sh
npm run dev      # start the Vite dev server
npm run build    # production build
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```

There is currently no automated test suite.

## Project structure

```
src/
├── App.jsx           # top-level page switcher
├── main.jsx          # app entry point
├── index.css         # global styles / Tailwind entry
├── lib/              # shared cross-feature utilities (e.g. the React Query client)
└── features/
    ├── todo-list/        # todo list feature (components, hooks)
    ├── product-listing/  # paginated product listing (components, hooks, services)
    └── user-dashboard/    # user profile dashboard (components, hooks, services, utils)
```

Each feature is self-contained: `components/` for UI, `hooks/` for state and
data logic, `services/` for API calls (where the feature talks to an API), and
`utils/` for feature-specific helpers.

## Where to look next

- [`CLAUDE.md`](./CLAUDE.md) — engineering guidelines and conventions for this
  repo (project structure, naming, dependency policy, styling rules).
