# AGENTS.md

Guidance for coding agents working in this repository.

## Project overview

This repository contains `@scbd/vue-components`, a Vue 3 component library written in TypeScript. Components use the Composition API and `<script setup>`, build with Vite, and use CoreUI for their base UI controls.

There are two development applications. The root app (`src/app.vue`) exercises components directly from the library source. The separate `examples/vue-app` consumes the library through `file:../..`, verifying that its package exports work as expected. Both apps expose component props and behavior in a Storybook-like way, making them useful for development and manual testing.

## Repository layout

- `src/components/`: Vue single-file components.
- `src/utils/`: shared TypeScript utilities.
- `src/types/`: public TypeScript types.
- `src/data/`: shared static data and related types.
- `src/assets/scss/`: library styles and theme customizations.
- `src/app.vue`: root development app for exercising source components and their props.
- `src/index.ts`: package entry point, named exports, and global component registration.
- `tests/components/`: browser-based component tests.
- `examples/vue-app/`: standalone consumer app for exercising components through the packaged exports.

## Common commands

Use Yarn; the root and example app each have their own lockfile.

From the repository root:

```sh
yarn install
yarn test:install
yarn dev
yarn test
yarn test:headed
yarn test:watch
yarn build
yarn build:types
```

For the example application:

```sh
cd examples/vue-app
yarn install
yarn dev
yarn build
```

Browser component tests use Vitest Browser Mode with Playwright and live in `tests/components/` as `*.test.ts`. Run `yarn test:install` once to install Chromium, then use `yarn test` for a headless run, `yarn test:headed` for an interactive browser, or `yarn test:watch` during development. Use the root app to exercise source-level component behavior and props visually. When public exports or integration behavior changes, also build or manually exercise `examples/vue-app`.

`yarn clean-reinstall` removes generated output and dependencies, reinstalls packages, and installs the Chromium test browser.

## Working conventions

- Keep changes focused and follow the style of nearby files.
- Preserve strict TypeScript compatibility and use type-only imports where appropriate.
- Keep components compatible with Vue 3's Composition API and `<script setup lang="ts">`.
- Test observable component behavior through public props, events, and accessible browser interactions rather than component internals.
- Treat exported names and component props/events as public API. Avoid breaking changes unless explicitly requested.
- When adding a public component, export it from `src/index.ts` and add it to the plugin's global registration when appropriate.
- When adding a public utility or type, update `src/index.ts` and package exports if consumers need a dedicated subpath.
- Keep peer dependencies external to the library bundle when changing the Vite build configuration.
- Do not edit generated output in `dist/` or `dist-types/`; regenerate it with the build commands.
- Update the README or example app when a public API change would otherwise be unclear to consumers.

## Before handing off

- Review the diff for accidental generated or unrelated files.
- Run the narrowest relevant checks, with `yarn build` as the baseline.
- Report any checks that could not be run and any remaining uncertainty.
