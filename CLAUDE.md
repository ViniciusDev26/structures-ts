# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`structures-ts` is a small, type-safe TypeScript library of data structure factories (Stack, Queue, LinkedList, PriorityQueue, BinarySearchTree, CircularBuffer, WatchedList), published to npm. Structures are plain factory functions that close over local state and return an object literal of operations — no classes.

## Commands

```bash
pnpm install       # install deps (pnpm is the package manager — pnpm-lock.yaml is committed)
pnpm test          # run the full vitest suite once
pnpm test:watch    # run vitest in watch mode
pnpm test -- Queue        # run a single spec file by name pattern
pnpm test -- -t "should peek"   # run tests matching a name
pnpm lint          # biome check . — formatting, import sorting, lint rules
pnpm lint:fix      # biome check --write . — applies safe fixes
pnpm build         # rimraf dist && tsc — compiles lib/**/* to dist/ (commonjs, es2019, with .d.ts)
```

Biome (`biome.json`) is the linter/formatter: tabs, double quotes, import organization on save/check. CI (`.github/workflows/ci.yml`) runs `lint`, `test`, then `build` on every push/PR to `main`.

## Architecture

- `lib/index.ts` is the public entrypoint — it re-exports every structure that makes up the package's public API. **Only what's exported here ships to consumers of `structures-ts` on npm.** When adding a new structure, it must be added to this barrel file or it will be unreachable to library users.
- `lib/structures/<Name>.ts` — one file per structure, each following the same shape:
  - A factory function `<Name><T>(params?: <Name>Params<T>)` that holds internal state in closured `let` variables (not a class), and returns an object of methods/getters.
  - A `<Name>Params<T>` interface exported alongside the factory for the constructor options.
  - TSDoc on the factory (with a usage `@example`) and on each returned method/getter — this is what IDE intellisense shows to consumers, since there's no other API doc.
  - Colocated `<Name>.spec.ts` unit tests (vitest) next to the implementation, including edge cases (e.g. operating on an empty structure).
- Structures that need custom ordering/equality take it as a required param instead of assuming a default: `BinarySearchTree` takes `compare: (a, b) => number`, `WatchedList` takes `compareItems: (a, b) => boolean`. Follow this pattern for any new structure that needs to compare `T` values, since `T` is unconstrained generic data.
- `tsconfig.json` only includes `lib/**/*` and excludes `**/*.spec.ts` — spec files are test-only and never part of the compiled `dist/` output.
- `examples/<name>/index.ts` — one runnable usage example per structure, importing from `../../lib` (source, not the built package). These aren't wired into any script; they're read/run manually (e.g. `pnpm exec tsx examples/<name>/index.ts`) to see a structure in use.
- Build output (`dist/`) is what's published to npm (see `package.json` `files`/`main`/`types`), so `lib/index.ts`'s exports are effectively the package's contract.
