# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this project is

**boostry-snippets** is a personal library of vetted, reusable code snippets. AI agents consume it through the **Boostry-MCP** server (https://github.com/Boostry123/boostry-mcp, local: `F:\coding\web-dev\boostry-mcp`):

1. The MCP server fetches `snippets.json` from this repo's `main` branch over raw GitHub URLs (`https://raw.githubusercontent.com/Boostry123/boostry-snippets/main/`).
2. Its `list-snippets` tool returns that index; `fetch-snippet` fetches a file by the index entry's `path`.

So **only what is pushed to `main` is visible to agents**, and every snippet must be listed in `snippets.json` to be discoverable. The MCP server fetches the index per call, so no server change or restart is needed when snippets are added.

Storybook is used as a local visual catalog/playground for the snippets. It is not consumed by the MCP server.

## Layout

```
snippets.json                     # Index read by the MCP server (category → key → entry)
snippets/
  react/
    components/
      buttons/
        simple-button.tsx         # Snippet: Components/simple-button (default export `Button`)
        simple-button.stories.tsx # Storybook stories for it
      footer/
        simple-footer.tsx         # Snippet: Components/simple-footer (default export; one equal-width column per child, stacks below `md`)
        simple-footer.stories.tsx
        simple-footer.test.tsx    # jsdom + @testing-library/react
    hooks/
      useDebounce.ts              # Snippet: Hooks/debounce (named export `useDebounce`)
      useDebounce.stories.tsx     # Storybook demo (DebounceDemo wrapper component)
  utils/                          # Framework-agnostic TS, no stories
    truncate.ts                   # Snippet: Utils/truncate (default export; suffix NOT counted in maxLength)
    truncate.test.ts
    once.ts                       # Snippet: Utils/once (default export; retries if fn throws)
    once.test.ts
    pickRandom.ts                 # Snippet: Utils/pickRandom (default export; throws RangeError on [])
    pickRandom.test.ts
.storybook/
  main.ts                         # react-vite framework, addon-docs, Tailwind via @tailwindcss/vite
  preview.ts                      # Imports tailwind.css
  tailwind.css                    # @import "tailwindcss"; @source "../snippets";
eslint.config.ts                  # Flat config: JS + typescript-eslint; react-hooks rules for snippets/react/**
tsconfig.json                     # Type-check only (noEmit), Bundler resolution, react-jsx
vitest.config.ts                  # snippets/**/*.test.{ts,tsx}, node env, passWithNoTests, restoreMocks
```

## Snippets index format (`snippets.json`)

Validated on the MCP side by the zod `SnippetList` schema: a record of **category → record of snippet key → entry**.

```json
{
  "Components": {
    "simple-button": {
      "category": "Components",
      "description": "This is a simple and light weight button with only onClick functionality",
      "path": "snippets/react/components/buttons/simple-button.tsx"
    }
  },
  "Hooks": {
    "debounce": {
      "category": "Hooks",
      "description": "Debounce hook that can be used to delay a callback for example search input after 500ms",
      "path": "snippets/react/hooks/useDebounce.ts"
    }
  }
}
```

- `path` is relative to the **repo root**, without a leading `./` (current convention), e.g. `snippets/react/hooks/useDebounce.ts`. It is resolved by the MCP server with `new URL(path, SNIPPETS_BASE_URL)`.
- `category` repeats the top-level key; keep them identical.
- Every entry needs all three fields (`category`, `description`, `path`), or the MCP `list-snippets` call fails schema validation for the whole index.
- Write `description` for an agent choosing a snippet: what it does, its API, and when to use it.

## Adding a snippet

1. Add the source file under `snippets/<framework>/<kind>/...` (e.g. `snippets/react/hooks/useX.ts`). Framework-agnostic TypeScript goes in `snippets/utils/`.
2. Keep it self-contained and copy-pasteable: only depend on React/Tailwind (or other deps already in `package.json`), no imports from other snippets.
3. Add a JSDoc block describing params, return value, `@throws`, and any non-obvious behavior (autodocs picks it up).
4. Add a `<name>.test.ts(x)` next to it (see Conventions → Tests).
5. For React snippets, add a `<name>.stories.tsx` next to it with `tags: ["autodocs"]`. For hooks, wrap the hook in a small demo component and use that as `component` (see `useDebounce.stories.tsx`). Utils get no stories.
6. Add the entry to `snippets.json`.
7. Run `npm run typecheck`, `npm run lint` and `npm run test:run`, then commit and push to `main`.

## Commands

```bash
npm install
npm run storybook        # Storybook dev server on http://localhost:6006
npm run storybook:clean  # Delete node_modules/.cache/storybook (fixes stale-cache issues)
npm run typecheck        # tsc (noEmit)
npm run lint             # eslint .
npm test                 # vitest in watch mode
npm run test:run         # vitest run (single run; use before committing)
```

`typecheck`, `lint` and `test:run` all pass on the current tree; keep it that way. Vitest does not type-check, so run `typecheck` too.

## Conventions

- TypeScript + React 19, Tailwind v4 utility classes for styling (no CSS files per snippet).
- Components: `export default function Name(...)` with a `NameProps` interface. Hooks: named export `useName`, generic where it makes sense. Utils: `export default function name(...)`, generic where it makes sense.
- Stories: CSF3 with `satisfies Meta<typeof X>` and `type Story = StoryObj<typeof meta>`; titles mirror the index category (`Buttons/Simple Button`, `Hooks/useDebounce`); use `fn()` from `storybook/test` for callback args.
- Tests go next to the snippet as `<name>.test.ts` (`.tsx` only if the file contains JSX). Vitest runs in the `node` environment; switch to `jsdom` (already installed, together with `@testing-library/react`) for component tests.
  - Import `describe`/`it`/`expect`/`vi` explicitly from `"vitest"` (globals are off).
  - Name tests after behavior. In `it.each`, put every per-row value (input *and* expected) in the table and reference them in the title (`$input`) so rows have unique names. No branching inside tests.
  - Cover the happy path, boundaries, each option/default, and invalid input. Assert exact values; avoid weak negatives like `not.toBe(x)`.
  - Use typed mocks (`vi.fn<(a: string) => void>()` or an implementation), assert on the mock's call log for arguments, and `vi.spyOn` for globals like `Math.random`. `restoreMocks: true` restores spies before each test.
  - `toThrow` needs a function: `expect(() => fn()).toThrow(RangeError)`. A string argument matches a substring of the message.
  - Component tests: start the file with `// @vitest-environment jsdom` (per-file, so utils stay in `node`) and add `afterEach(cleanup)` from `@testing-library/react`. Its auto-cleanup only registers when globals are on, so without it renders pile up and `getBy*` throws on multiple matches.
  - Query by role first (`getByRole("contentinfo")` for `<footer>`), then text; `container`/`data-testid` only when no role fits. `getBy*` throws when nothing matches, so wrapping it in `expect(...).toBeDefined()` adds nothing.
  - Check classes with `classList.contains("x")` or an exact `toBe(...)`; `toContain` on `className` is a substring match (`"gap-4"` contains `"p-4"`).

## Gotchas

- `.storybook/tailwind.css` uses `@source "../snippets"` so Tailwind scans snippet files. Classes outside `snippets/` won't be generated. Tailwind only sees complete class names written out in the source, so never build them at runtime (`` `grid-cols-${n}` ``); use static classes (e.g. `grid-flow-col auto-cols-fr`) or a lookup map.
- Build class strings with defaults (`className = ""`); a missing prop in a template string becomes the class `"undefined"`.
- `*storybook.log` (e.g. `debug-storybook.log`) is gitignored. Don't commit it.
- `useDebounce` defaults `delay` to `550` ms, while its `snippets.json` description says 500ms and calls it a callback delay. It actually debounces a **value**. Keep code and description in sync when editing either.
- `@testing-library/dom`, `@testing-library/jest-dom` and `@testing-library/user-event` exist in `node_modules` only as transitive deps (via Storybook). Add them to `devDependencies` before importing them in tests.
