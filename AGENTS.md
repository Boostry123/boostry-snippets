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
        simple-button.tsx         # Snippet: Buttons/simple-button (default export `Button`)
        simple-button.stories.tsx # Storybook stories for it
      footer/
        simple-footer.tsx         # Placeholder (empty fragment), not in snippets.json yet
    hooks/
      useDebounce.ts              # Snippet: Hooks/debounce (named export `useDebounce`)
      useDebounce.stories.tsx     # Storybook demo (DebounceDemo wrapper component)
.storybook/
  main.ts                         # react-vite framework, addon-docs, Tailwind via @tailwindcss/vite
  preview.ts                      # Imports tailwind.css
  tailwind.css                    # @import "tailwindcss"; @source "../snippets";
eslint.config.ts                  # Flat config: JS + typescript-eslint; react-hooks rules for snippets/react/**
tsconfig.json                     # Type-check only (noEmit), Bundler resolution, react-jsx
vitest.config.ts                  # snippets/**/*.test.{ts,tsx}, node env, passWithNoTests
```

## Snippets index format (`snippets.json`)

Validated on the MCP side by the zod `SnippetList` schema: a record of **category → record of snippet key → entry**.

```json
{
  "Buttons": {
    "simple-button": {
      "category": "Buttons",
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

1. Add the source file under `snippets/<framework>/<kind>/...` (e.g. `snippets/react/hooks/useX.ts`).
2. Keep it self-contained and copy-pasteable: only depend on React/Tailwind (or other deps already in `package.json`), no imports from other snippets.
3. Add a JSDoc block describing params and return value (autodocs picks it up).
4. Add a `<name>.stories.tsx` next to it with `tags: ["autodocs"]`. For hooks, wrap the hook in a small demo component and use that as `component` (see `useDebounce.stories.tsx`).
5. Add the entry to `snippets.json`.
6. Run `npm run typecheck` and `npm run lint`, then commit and push to `main`.

## Commands

```bash
npm install
npm run storybook        # Storybook dev server on http://localhost:6006
npm run storybook:clean  # Delete node_modules/.cache/storybook (fixes stale-cache issues)
npm run typecheck        # tsc (noEmit)
npm run lint             # eslint .
npm test                 # vitest (no tests yet; passWithNoTests)
```

`typecheck` and `lint` both pass on the current tree; keep it that way.

## Conventions

- TypeScript + React 19, Tailwind v4 utility classes for styling (no CSS files per snippet).
- Components: `export default function Name(...)` with a `NameProps` interface. Hooks: named export `useName`, generic where it makes sense.
- Stories: CSF3 with `satisfies Meta<typeof X>` and `type Story = StoryObj<typeof meta>`; titles mirror the index category (`Buttons/Simple Button`, `Hooks/useDebounce`); use `fn()` from `storybook/test` for callback args.
- Tests (when added) go next to the snippet as `*.test.ts(x)`. Vitest runs in the `node` environment; switch to `jsdom` (already installed, together with `@testing-library/react`) for component tests.

## Gotchas

- `.storybook/tailwind.css` uses `@source "../snippets"` so Tailwind scans snippet files. Classes outside `snippets/` won't be generated.
- `*storybook.log` (e.g. `debug-storybook.log`) is gitignored. Don't commit it.
- `useDebounce` defaults `delay` to `550` ms, while its `snippets.json` description says 500ms and calls it a callback delay. It actually debounces a **value**. Keep code and description in sync when editing either.
