<h1>The Pocket Museum</h1>

[museum.pocketlab.build](https://museum.pocketlab.build) — the permanent
collection of [Pocket Lab](https://pocketlab.build): every machine
[PocketJS](https://pocketjs.dev) runs on, from a 1983 NES to an ESP32-P4, with
its hardware, the upstream bring-up documents rendered verbatim, and example
code.

| | |
| --- | --- |
| **Exhibits** | `src/data/devices/*.ts` — curated hardware sheets, plaque text, photographs with credits |
| **Upstream** | `external/pocketjs` — a pinned git submodule of [pocket-stack/pocketjs](https://github.com/pocket-stack/pocketjs); bring-up docs, target profiles, board files, blog metadata and example code are read from it at build time |
| **Stack** | Vue 3 · Vite · vue-router · vite-ssg (static pages) · Tailwind CSS v4 · markdown-it + shiki at build time |
| **Design** | [`DESIGN.md`](DESIGN.md) — principles, palette, type, layout, components |
| **Working rules** | [`CLAUDE.md`](CLAUDE.md) (`AGENTS.md` is a symlink) |

## Develop

```sh
git clone --recurse-submodules --shallow-submodules <this repo>
bun install
bun run dev          # generate OG cards, then serve http://localhost:5173
bun run og:generate  # regenerate the ignored public/og/ preview assets
bun run check        # typecheck + OG generation + static build into dist/
```

If the submodule is missing (`external/pocketjs` empty), run
`bun run upstream:init`. To follow upstream main: `bun run upstream:update`,
then commit the submodule bump.

## How a page is made

```
src/data/devices/vita.ts ──┐
                           ├─> pages (Vue) ─> vite-ssg ─> dist/devices/vita/index.html
external/pocketjs/hosts/vita/README.md ──?doc──> plugins/pocketjs-docs.ts ─┘
external/pocketjs/contracts/spec/platforms.ts ── imported directly ────────┘
```

The plugin turns upstream markdown into HTML on the markdown-it token stream
(anchors, absolute links back to the pinned revision, shiki-highlighted
fences) — no regular expressions touch the source text, and nothing is copied
into this repository.

## Deploy

`bun run build` writes a fully static site to `dist/` (nested `index.html`
per route), including one content-hashed 1200×630 PNG social card per
indexable page. Any static host works; `museum.pocketlab.build` is expected to
serve `dist/` as-is.
