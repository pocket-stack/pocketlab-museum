// src/data/upstream.ts — everything the museum takes from the PocketJS
// repository, in one place.
//
// The checkout lives in external/pocketjs (a git submodule). Pure data modules
// are imported directly so the website cannot drift from the source of truth;
// documents and source files are rendered at build time by
// plugins/pocketjs-docs.ts and loaded lazily per page.

import upstreamMeta from "virtual:pocketjs-upstream";
import type { RenderedCode, RenderedDoc, UpstreamMeta } from "../../plugins/pocketjs-docs";

// The production Guest target registry and the capability vocabulary.
export {
  POCKET_CAPABILITIES,
  POCKET_TARGETS,
  type PocketCapabilityId,
  type PocketTargetId,
  type TargetProfile,
} from "@upstream/contracts/spec/platforms";

// The pocketjs.dev blog registry: slug → title, date, description, author.
export { BLOG_POSTS, type BlogPost } from "@upstream/site/nav";

// Pocket Vapor board profiles are data files; the MeowBit is the first.
import meowbitBoard from "@upstream/vapor/boards/meowbit.json";
export { meowbitBoard };

export const upstream: UpstreamMeta = upstreamMeta;

export const UPSTREAM_ROOT = "/external/pocketjs/";
export const POCKETJS_SITE = "https://pocketjs.dev";

/* ------------------------------------------------------------------------ */
/* Documents                                                                 */
/* ------------------------------------------------------------------------ */

type DocModule = { default: RenderedDoc };
type CodeModule = { default: RenderedCode };

// Every upstream markdown file a device page may render. The list is a set of
// globs rather than "everything" so the build only renders what the museum
// links to; add a pattern here when a new device needs a new directory.
const docModules = import.meta.glob<DocModule>(
  [
    "/external/pocketjs/docs/*.md",
    "/external/pocketjs/hosts/*/README.md",
    "/external/pocketjs/hosts/pocketbook/docs/*.md",
    "/external/pocketjs/hosts/esp32p4/examples/*/README.md",
    "/external/pocketjs/engine/backends/*/README.md",
    "/external/pocketjs/engine/apple/README.md",
    "/external/pocketjs/vapor/*.md",
    "/external/pocketjs/vapor/runtime/*/README.md",
    "/external/pocketjs/site/content/docs/getting-started.md",
    "/external/pocketjs/site/content/docs/platform-contracts.md",
    "/external/pocketjs/site/content/docs/build-pipeline.md",
    "/external/pocketjs/tools/cli/README.md",
  ],
  { query: "?doc" },
);

// Upstream source files shown as example code on device pages.
const codeModules = import.meta.glob<CodeModule>(
  [
    "/external/pocketjs/apps/*/app.tsx",
    "/external/pocketjs/apps/*/main.tsx",
    "/external/pocketjs/apps/*/pocket.json",
    "/external/pocketjs/vapor/examples/todo/*.tsx",
    "/external/pocketjs/vapor/boards/*.json",
    "/external/pocketjs/hosts/esp32p4/examples/data-smoke/src/main.rs",
    "/external/pocketjs/hosts/esp32p4/examples/ppa-smoke/CMakeLists.txt",
    "/external/pocketjs/hosts/vita/rust-toolchain.toml",
    "/external/pocketjs/hosts/pocketbook/deploy.ts",
    "/external/pocketjs/tools/cli/psp-toolchain.json",
    "/external/pocketjs/contracts/spec/platforms.ts",
    "/external/pocketjs/hosts/iphone2g/armv6-apple-ios.json",
    "/external/pocketjs/hosts/iphone4s/armv7-apple-ios.json",
    "/external/pocketjs/hosts/meizu-m8/armv6-wince-asm.json",
  ],
  { query: "?code" },
);

function stripRoot(key: string): string {
  return key.startsWith(UPSTREAM_ROOT) ? key.slice(UPSTREAM_ROOT.length) : key;
}

function indexByPath<T>(modules: Record<string, () => Promise<T>>): Map<string, () => Promise<T>> {
  const map = new Map<string, () => Promise<T>>();
  for (const [key, loader] of Object.entries(modules)) map.set(stripRoot(key), loader);
  return map;
}

const docLoaders = indexByPath(docModules);
const codeLoaders = indexByPath(codeModules);

/** All upstream-relative document paths the museum can render. */
export const availableDocs: readonly string[] = [...docLoaders.keys()].sort();
/** All upstream-relative source paths the museum can show. */
export const availableCode: readonly string[] = [...codeLoaders.keys()].sort();

export function hasDoc(path: string): boolean {
  return docLoaders.has(path);
}

export function hasCode(path: string): boolean {
  return codeLoaders.has(path);
}

export async function loadDoc(path: string): Promise<RenderedDoc> {
  const loader = docLoaders.get(path);
  if (!loader) throw new Error(`upstream document is not in the museum's glob list: ${path}`);
  return (await loader()).default;
}

export async function loadCode(path: string): Promise<RenderedCode> {
  const loader = codeLoaders.get(path);
  if (!loader) throw new Error(`upstream source file is not in the museum's glob list: ${path}`);
  return (await loader()).default;
}

/* ------------------------------------------------------------------------ */
/* Links                                                                     */
/* ------------------------------------------------------------------------ */

/** GitHub URL for an upstream path at the pinned revision. */
export function githubUrl(path: string): string {
  return `${upstream.url}/blob/${upstream.rev}/${path.replace(/^\/+/, "")}`;
}

export function githubTreeUrl(path: string): string {
  return `${upstream.url}/tree/${upstream.rev}/${path.replace(/^\/+/, "")}`;
}

export function blogUrl(slug: string): string {
  return `${POCKETJS_SITE}/blog/${slug}/`;
}

export function docsUrl(slug: string): string {
  return `${POCKETJS_SITE}/docs/${slug}/`;
}
