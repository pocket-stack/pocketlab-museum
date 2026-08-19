# Design

The Pocket Museum is the long-form version of the *Pocket Museum* section on
[pocketlab.build](https://pocketlab.build): one page per machine PocketJS runs
on. It inherits Pocket Lab's visual language — a dark bench, a faint grid, mono
labels, sharp panels — and adds what a museum needs: plaques, a vitrine for the
photograph, a specification sheet, and a reading surface for long upstream
documents.

The tokens described here are the `@theme` block of
[`src/styles/main.css`](src/styles/main.css) — the museum is styled with
Tailwind CSS v4, and the theme is the only place a colour, face or easing is
defined. Change this document and that block together.

## 1. Principles

1. **The machine is the subject.** Photographs are cut out or framed, never
   decorated; colour is reserved for meaning; type is quiet so that the
   hardware numbers and the upstream text read first.
2. **Two owners, one page.** Curated museum content (hardware, plaque, photo)
   and upstream content (bring-up documents, target profiles, code) sit on the
   same page but are visibly distinct: upstream material always carries its
   path, its revision and a link back to the source.
3. **Lab, not showroom.** Mono uppercase labels, index numbers on section
   heads (`00`, `01`, …), dashed rules, terminal panels and status dots are the
   vocabulary of pocketlab.build. The museum speaks it without adding a new
   dialect.
4. **Sharp edges.** Panels, cards, tables and images have square corners.
   Only tiny elements (badges, inline code) may round by 2 px. This is the one
   rule that most clearly separates the Lab from pocketjs.dev's rounded,
   product-site feel.
5. **Dark only.** The bench is dark. There is no light theme; `color-scheme:
   dark` is set on `:root` so form controls and scrollbars follow.

## 2. Colour

Near-black navy surfaces, three steps of text contrast, and accents that each
mean one thing. The stock Tailwind palette is removed (`--color-*: initial`),
so `text-cyan` or `border-line-2` can only ever mean these values; there is no
`cyan-400` to reach for.

| Token (`--color-…`) | Hex | Use |
| --- | --- | --- |
| `bg` | `#0a0d12` | Page background (under the grid) |
| `bg-2` | `#0e1219` | Raised blocks: cards, viewers, tables |
| `panel` | `#11161f` | Panel fills, table heads, tab strips |
| `panel-2` | `#161c27` | Hover fill, inline-code background |
| `glass` | `#070a10` | Vitrine glass, terminal panels, code blocks |
| `line` | `#1e2735` | Hairlines inside panels |
| `line-2` | `#2a3648` | Panel borders, dashed rules |
| `line-3` | `#3a4a63` | Separators in dense mono rows |
| `ink` | `#e8eef7` | Headings, values, emphasis |
| `ink-2` | `#a7b4c8` | Body text |
| `muted` | `#76839a` | Labels, captions, secondary mono (pocketlab.build uses `#657186`; lifted one step for contrast) |
| `muted-2` | `#57627a` | Heading anchors and decorative hints only — never for text that must be read |
| `cyan` | `#67e8f9` | Interaction: links, active tabs, focus ring, section indices, the rail dots |
| `green` | `#4ade80` | *Registered / shipping*: production-registry status, capability chips, `ok` in terminals |
| `amber` | `#fbbf24` | *Time and AOT*: years on plaques and cards, milestone dates, the Pocket Vapor status |
| `rose` | `#fb7185` | Errors and "missing upstream" notices only |

The bench grid is `rgba(103,232,249,.05)` lines every 56 px on `body`, and
28 px inside vitrines and cards (`bg-grid-sm`). Translucent tints are written
as Tailwind opacity modifiers (`bg-cyan/15`, `border-amber/40`).

Status tones map one-to-one: registered → green, hardware-tested → cyan,
Pocket Vapor → amber, development host → muted. Execution-path badges use only
a tinted border (cyan for Guest, amber for AOT, green for native) so they never
compete with the status dot.

Code blocks use the `vitesse-dark` shiki theme with its background replaced by
`glass`.

## 3. Type

| Role | Face | Class | Notes |
| --- | --- | --- | --- |
| Display & body | **Space Grotesk** 400–700 | `font-sans` (the default) | Headlines at `-0.03em` tracking, 1.02–1.1 line height; body 16 px / 1.6 |
| Labels, specs, code | **IBM Plex Mono** 400–600 | `font-mono` | Labels are 0.7 rem uppercase with `0.16em` tracking (`mlabel`); spec values 0.78–0.86 rem; code 0.8 rem / 1.75 |

Both load from Google Fonts with system fallbacks (`-apple-system, system-ui`
and `ui-monospace, Menlo`). Sizes are fluid where they matter:

- Page title `clamp(2.4rem, 6.2vw, 4.6rem)`; exhibit title `clamp(2rem, 4.6vw, 3.4rem)`
- Section head `clamp(1.5rem, 3.2vw, 2.1rem)` preceded by a cyan mono index
- Rendered upstream docs: 0.96 rem body, `h2` 1.35 rem with a dashed top rule,
  `h4+` prefixed with `// ` in mono — the document keeps its own hierarchy but
  reads as part of the bench.

Curated prose may carry `backtick spans`; they render as inline code. Upstream
markdown is never passed through that helper — it is rendered by the build
plugin as written.

## 4. Layout

- **Wrap** (`wrap`) `max-width: 1180px`, gutter `clamp(1.25rem, 4vw, 2.5rem)`.
- **Sections** (`sect`) are separated by a 1 px `line` rule and padded
  `clamp(2.8rem, 7vw, 4.5rem)`; every section opens with a `SectionHead`:
  `index · title · dashed fill · mono label`. The last section on a page adds
  `border-b-0`.
- **Grids** use `repeat(auto-fill, minmax(…, 1fr))` for cards and
  `minmax(0, 1fr)` everywhere a track may hold long unbreakable text (code,
  URLs). Tailwind's `lg` (1024 px) collapses two-column layouts, `md`
  (768 px) collapses the navigation into a toggle and the stat tiles to two
  columns, `sm` (640 px) tightens section heads, and one custom
  `min-[521px]` step switches card grids from a single column.
- **Sticky things**: the header (3.6 rem, blurred), the vitrine on wide
  exhibit pages, the target-profile card, and the "On this page" list of a
  rendered document.
- **Vertical rhythm** follows Tailwind's 4 px spacing scale; arbitrary values
  (`py-[0.45rem]`) appear only where a component's optical balance needs them.

### Page anatomy

| Page | Sections |
| --- | --- |
| Home | hero + stat tiles → `00` collection (timeline rail, path filter, card grid) → `01` workbench |
| Exhibit | plaque (eyebrow, title, tagline, badges, two paragraphs, headline tiles) + vitrine → `01` hardware → `02` PocketJS on this machine (what runs / what is proven / record + profile card; acquisition reports) → `03` on the machine (gallery) → `04` example code → `05` bring-up guide → sources, photo, prev/next |
| Catalogue | hero → sortable specification table |
| About | hero → where the content comes from (how the museum is kept) → how to add an exhibit → photo credits → colophon |

Section numbers on an exhibit shift when a section is absent (no gallery, no
code); the bring-up guide is always last because it is the longest.

## 5. Components

Styling lives in the templates as Tailwind utilities; there are no
`<style>` blocks. Two kinds of CSS exist outside the templates, both in
`src/styles/`:

- **Composed utilities** (`@utility` in `main.css`) for one visual idea reused
  on many pages: `wrap`, `sect`, `mlabel`, `cta` / `cta-ghost`, `dot` with
  `glow-*`, `bg-grid-sm`, and `prose-code` for the inline code in curated
  prose. They take variants like any utility (`hover:`, `after:`).
- **`doc.css`** for upstream markdown and highlighted files — third-party HTML
  that carries no classes of ours. It is plain CSS over the theme variables in
  the `components` layer, so utilities can still override it.

A pattern used by one component stays in that component's template
(`[&_a:hover]:text-cyan`, `group-hover:`), not in CSS.

- **Exhibit card** — vitrine on top (16:10, grid glass), year in amber at the
  top left, path badge at the top right; name, tagline, a dashed-rule mono spec
  line (CPU · memory · display), and a status dot. The whole card is the link;
  hover lifts the border to cyan and zooms the image by 3 %.
- **Vitrine** — a bordered glass with the 28 px grid and a faint cyan glow at
  the bottom. Cut-out photographs sit inside with padding (`contain`);
  photographs with their own background fill it (`cover`). The caption carries
  the alt text and the photo credit.
- **Plaque** — the eyebrow line (`year · kind · maker`), the title, the
  tagline, badges (status, path, host directory), two paragraphs, and three
  headline tiles.
- **Spec sheet** — groups in an auto-fit grid; each row is a mono label and an
  ink value with an optional muted note. Borders are drawn per group so a
  partially filled last row never shows a blank cell.
- **Profile card** — the upstream target profile in a terminal-dark panel,
  labelled with its source (`contracts/spec/platforms.ts` or the demo
  manifest); capabilities as green chips.
- **Doc viewer** — tab strip (label + upstream path), header with title,
  reading time, "rendered verbatim from `path` @ rev", then a two-column body:
  sticky TOC + the document. The active tab is mirrored in `?doc=` so a
  specific document can be linked.
- **Code viewer** — file tabs, a bar with the path and `lang · lines · rev`,
  the highlighted file capped at 34 rem with its own scrollbar.
- **Timeline rail** — a horizontal, scrollable sequence of years with a glowing
  cyan dot per year and the machines of that year listed beneath; AOT targets
  carry a small amber `aot` suffix.
- **Status badge / path badge / dots** — see §2.
- **Terminal panel** — three grey dots, a mono title on the right, `$` prompts
  in muted, `ok` in green.

## 6. Imagery

- Product photographs come from Wikimedia Commons under public domain, CC0,
  CC BY or CC BY-SA, and are credited on the exhibit page and on the About
  page. Studio shots on white are cut out (alpha WebP, long edge 1600 px) so
  they sit on the dark glass; environmental photographs are kept whole and
  shown with `cover`. A photograph that shows a related model rather than the
  exact machine says so in its credit note.
- Screenshots and device captures are imported directly from the upstream
  checkout (`site/assets/blog/…`) and credited to their path — never copied
  into this repository.
- No stock imagery, no illustrations of hardware, no gradients as decoration.

## 7. Motion

Hover and focus transitions run `0.18s cubic-bezier(0.2, 0.7, 0.2, 1)`; the
only larger motion is the card image zoom (0.5 s). `prefers-reduced-motion`
sets the duration token to 0. Nothing animates on load.

## 8. Accessibility

- Text meets 4.5:1 against its surface: `--ink-2` on `--bg-2` is ≈ 8.9:1,
  `--muted` on `--bg-2` is ≈ 4.9:1 (≈ 4.7:1 on `--panel`). `--muted-2` is
  decorative only.
- Focus is visible everywhere: a 2 px cyan outline with 2 px offset.
- Tabs are buttons with `role="tab"` and `aria-selected`; the navigation
  toggle exposes `aria-expanded`; the timeline rail and breadcrumbs are `nav`
  landmarks; images carry real alt text and intrinsic dimensions.
- Upstream documents keep their heading hierarchy; anchors are GitHub-style
  slugs so deep links written for GitHub keep working here.

## 9. Voice

Plaque and summary text follow the upstream documentation register: state the
mechanism, bold the number, no slogans, no intensifiers. The one place with a
headline voice is the home hero, which quotes pocketlab.build. Labels are
lower-case mono phrases (`// pocketlab.build · permanent collection`) and
never end with punctuation.
