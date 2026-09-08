# Project Engineering Guidelines

This document defines the engineering standards for this repository. 
**Do not edit this Markdown file.**

The goal is to produce code that is:

- Maintainable
- Readable
- Consistent
- Reusable where appropriate
- Easy to extend
- Safe to modify

Follow these guidelines when creating or modifying code.

---

# Tech Stack

- **Framework:** React 19
- **Build tool:** Vite (via `@vitejs/plugin-react`)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`), plus plain CSS files (`index.css`, `App.css`) for custom theme tokens and component styles
- **Linting:** oxlint
- **Language:** JavaScript (JSX), no TypeScript compiler — `@types/react` / `@types/react-dom` are present for editor type-checking only

---

# 1. Before Writing Code

Before creating new files or implementing functionality:

1. Inspect the existing project structure.
2. Understand the relevant feature or module.
3. Search for similar implementations.
4. Search for existing components, hooks, utilities, services, and constants.
5. Reuse existing functionality where appropriate.
6. Follow established repository patterns.
7. Use `./` only for files in the same directory. If an import requires `../`, `../../`, or deeper traversal, use the `@/` absolute import alias instead.
8. Use only functional components for all React components (unless explicity asked for class components)
9. Prefer modern React patterns and APIs.
10. Identify whether a new request is a feature, bug fix, or refactor; ask for clarification if the intent is unclear.

Do not immediately create new folders, abstractions, utilities, or components without checking whether something similar already exists.

## Important

Do not introduce a second competing architecture.

If the repository already follows a pattern, extend that pattern unless the task explicitly involves an architectural migration.

---

# 2. Project Structure and Code Organization

Keep code organized by responsibility and ownership.

## Feature-Specific Code

Feature-specific code should stay close to the feature that owns it.

Example:

```text
src/
├── features/
│   └── user-profile/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── utils/
```

Do not move feature-specific code into global/shared folders prematurely.

## Shared Code

Promote code to a shared location only when it is genuinely reusable.

Examples of shared locations:

```text
src/
├── components/
├── hooks/
├── lib/
├── services/
└── utils/
```

Do not create shared abstractions "just in case."

A good rule:

> Keep code local until there is a clear reason for it to be shared.

---

# 3. Data Fetching and API Communication

Keep API communication separate from UI components.

## API Calls

Do not make API requests directly inside presentation components unless the component is explicitly responsible for data loading.

Prefer keeping API communication in a dedicated service or API module.

Example:

```text
src/
├── services/
│   └── users.js
```

---

# 4. Naming Conventions

Use consistent naming throughout the project.

## Folders

Use `kebab-case`.

Examples:

* `user-profile/`
* `payment-history/`
* `chat-feature/`
* `account-settings/`

## React Component Files

Use `kebab-case`.

Examples:

* `user-profile.jsx`
* `payment-history.jsx`
* `chat-message.jsx`

The filename should clearly describe the primary component.

## React Components

Use `PascalCase`.

Examples:

* `UserProfile`
* `PaymentHistory`
* `ChatMessage`

## Hooks

Use `kebab-case` for hook filenames and `camelCase` for hook names. Hook names must always start with `use`.

Examples of hook filenames:

* `use-user-profile.js`
* `use-payment-history.js`
* `use-chat.js`
* `use-debounce.jsx`

Examples of hook names:

```js
useUserProfile()
usePaymentHistory()
useChat()
useDebounce()
```

The hook filename and hook name should follow their respective naming conventions.

For example:

* **Filename:** `use-debounce.jsx`
* **Hook name:** `useDebounce`

# 5. Dependencies and Libraries

Do not introduce a new dependency or library unless it is genuinely necessary.

Before adding a new package:

1. Check whether the required functionality already exists in the project.
2. Search the repository for existing utilities, components, or libraries that solve the problem.
3. Prefer existing dependencies over adding another package.
4. Consider whether the functionality can be implemented cleanly with native JavaScript, React, or the existing tech stack.

Do not add a library for trivial functionality that can be implemented with a small amount of clear code.

Examples:

- Do not add a date library for simple date formatting if existing utilities are sufficient.
- Do not add a utility library for a simple one-line helper.
- Do not add another UI library when the project already uses Tailwind and existing components.
- Do not add another state management library without a clear architectural need.

Adding a dependency is a deliberate engineering decision.

Only add a new dependency when:

- The problem is non-trivial.
- The dependency provides significant value.
- The existing project does not already provide a suitable solution.
- Maintaining a custom implementation would be more complex or risky.

Before adding the dependency, briefly explain why it is necessary.

---

# 6. Colors and Styling

Use Tailwind CSS for styling.

## Color Selection Rules

When choosing a color, follow this order:

1. Use an existing Tailwind predefined color if it satisfies the requirement.
2. If the user specifies an exact custom color, check whether that exact color already exists as a project design token.
3. If the exact custom color does not exist as a project token, define it centrally in the project's CSS theme/token file.

   Give the token a meaningful, semantic name based on its purpose in the design system.

   Prefer names such as:

   - `primary`
   - `secondary`
   - `brand-primary`
   - `success`
   - `warning`
   - `error`

   Avoid naming tokens purely after their color value or appearance, such as:

   - `purple`
   - `dark-purple`
   - `purple-600`
   - `custom-purple`

   unless the color is genuinely intended to represent a color palette rather than a semantic design purpose.

4. If the exact custom color does not exist as a project token, define it centrally using Tailwind CSS v4's `@theme` syntax.

   Custom reusable colors must use the `--color-*` naming convention so Tailwind generates the corresponding utility classes.

   Example:

   ```css
   @theme {
     --color-primary: #6C3BFF;
   }
   ```

5. Use the resulting Tailwind utility class in components.

## Custom Colors

Do not use arbitrary color values directly inside JSX.

Never do this:

```jsx
<p className="text-[#6C3BFF]">Hello</p>
```