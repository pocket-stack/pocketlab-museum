# Repository Instructions

The Pocket Museum (`museum.pocketlab.build`) is a static Vue site: one exhibit
page per machine PocketJS runs on, with the machine's hardware, the upstream
bring-up documents rendered verbatim, and example code. `AGENTS.md` is a
symlink to this file.

## Commands

```sh
bun install                 # dependencies (Bun is the package manager)
bun run upstream:init       # fetch the PocketJS submodule on a fresh clone (shallow)
bun run dev                 # Vite dev server
bun run typecheck           # vue-tsc over src/, plugins/, vite.config.ts
bun run build               # vite-ssg: prerenders every route into dist/
bun run check               # typecheck + build — run before opening a PR
bun run upstream:update     # move external/pocketjs to upstream main and stage it
```

`bun run check` must pass before a change is considered done. There is no CI
and no test suite by design; the build is the gate — a missing upstream path,
a bad type or a broken page fails it.

## Layout

| Path | What lives there |
| --- | --- |
| `external/pocketjs/` | Git submodule: `pocket-stack/pocketjs`, pinned. **Read-only.** Never edit, copy or vendor files from it. |
| `plugins/pocketjs-docs.ts` | Vite plugin. Renders upstream markdown (`?doc`), highlights upstream source (`?code`), exposes `virtual:pocketjs-upstream` (repo, rev, date). |
| `src/data/types.ts` | The `Device` shape and its vocabulary (execution path, status, collection). |
| `src/data/devices/*.ts` | One file per exhibit: curated hardware + pointers to upstream docs/code/stories. |
| `src/data/devices.ts` | Catalogue order, lookups, label maps. |
| `src/data/upstream.ts` | Everything imported from the submodule: target registry, blog registry, board JSON, the doc/code glob loaders. |
| `src/assets/devices/` | Product photographs (WebP, long edge 1600 px, cut out when the source is a studio shot on white). |
| `src/pages/`, `src/components/` | Home, Catalogue, Device, About, NotFound; the building blocks. |
| `src/styles/` | `main.css` — Tailwind CSS v4 entry: the `@theme` tokens (mirrors `DESIGN.md`), base layer, composed `@utility` classes; `doc.css` — styling for rendered upstream markdown. |
| `DESIGN.md` | Design principles, palette, type, layout, components. Read it before touching styles. |

## The single-source-of-truth rule

- **Adaptation content is owned upstream.** Toolchains, build/deploy steps,
  acceptance rules, target profiles, board definitions, blog titles and
  screenshots come from `external/pocketjs` and are rendered as written. If a
  device lacks a bring-up document upstream, the exhibit says so; do not write
  one here — tell the user so it can be landed upstream, then referenced.
- **Hardware facts are owned here** (`src/data/devices/*.ts`), with a
  `sources` list per device. Keep numbers specific (model, clock, RAM, panel
  resolution) and note caveats in `note` fields.
- **Never parse upstream markdown with regular expressions.** The plugin works
  on the markdown-it token stream (links, images, headings, fences) and nothing
  else. Extend it with token rules or renderer overrides, not string
  replacement.
- Pure data modules upstream (`contracts/spec/platforms.ts`, `site/nav.ts`,
  `vapor/boards/*.json`) are imported directly; prefer that over restating
  their contents.
- Upstream-relative links in rendered docs resolve to GitHub at the pinned
  revision; site-absolute links resolve to pocketjs.dev. Images resolve to
  raw.githubusercontent.com.

## Adding or changing an exhibit

1. Add `src/data/devices/<slug>.ts` (copy the shape of an existing one) and
   register it in `src/data/devices.ts` in chronological order.
2. Photograph: freely licensed only (public domain, CC0, CC BY, CC BY-SA),
   credited in `hero.credit` with author, licence, source URL and a note when
   the pictured model differs from the one PocketJS runs on.
3. Upstream docs/code: list paths relative to the submodule root. If a path is
   in a directory not yet covered, add a glob to `src/data/upstream.ts`
   (globs are explicit so the build renders only what the museum links to).
4. Stories: use pocketjs.dev blog slugs; titles and dates resolve from
   `site/nav.ts`.
5. `bun run check`.

## Conventions

- Conventional Commits: `type(scope): summary` — `feat(devices): add 3ds`,
  `fix(doc-viewer): …`, `docs: …`, `chore(upstream): bump pocketjs to abc1234`.
- TypeScript strict; `<script setup lang="ts">`; styling is Tailwind utilities
  in templates — no `<style>` blocks, no raw colours: only theme classes
  (`text-ink-2`, `border-line-2`, `bg-cyan/15`). A pattern reused across
  pages becomes an `@utility` in `src/styles/main.css`; a one-off stays in
  its template. Upstream markdown is styled by `src/styles/doc.css` because
  that HTML carries no classes.
- Prose on exhibits follows the upstream documentation register: state the
  mechanism, bold concrete facts, no slogans or intensifiers. Site copy is
  English.
- No CI workflows, no test framework, no analytics. Keep the dependency list
  small.
