# React Webview Template

A minimal React + Vite + Tailwind CSS starter template with HMR and Oxlint, meant as a clean base for people starting out with web development.

## Getting Started

Scaffold a new project from this template using [degit](https://github.com/Rich-Harris/degit):

```sh
npx degit lokal-app/react-webview-template my-webview-app
cd my-webview-app
npm install
npm run dev
```

This template ships with a `CLAUDE.md` defining the project's engineering guidelines (project structure, naming conventions, dependency policy, etc.). If you're using Claude Code, read and follow those rules when building on top of this template.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# testing
