// src/data/types.ts — the shape of one museum exhibit.
//
// Two kinds of information meet on a device page and they have different
// owners:
//
// - Hardware facts (CPU, RAM, panel, release date, photo) are museum content:
//   curated here, in src/data/devices.ts.
// - Everything about how PocketJS runs on the machine (toolchain, build and
//   deploy steps, acceptance rules, target profiles) is OWNED UPSTREAM in the
//   PocketJS repository and only referenced from here by path. The museum
//   renders those files verbatim from the git submodule at build time.

export type ExecutionPath =
  /** A JavaScript guest (QuickJS) driving the native core and host modules. */
  | "guest"
  /** Pocket Vapor: a strict Vue Vapor subset compiled to native code — no JS engine on the machine. */
  | "aot"
  /** The native renderer integrated into a product firmware; no stock application target. */
  | "native";

export type AdoptionStatus =
  /** A production Guest profile in contracts/spec/platforms.ts. */
  | "registered"
  /** Live-hardware receipts exist, but the profile is private / development-only. */
  | "hardware"
  /** A Pocket Vapor compiler target with emulator or device parity. */
  | "aot"
  /** A renderer/backend integration, verified on a product board. */
  | "integration"
  /** A development or verification host (simulator, browser, headless). */
  | "dev-host";

export type DeviceFamily =
  | "handheld-console"
  | "home-console"
  | "phone"
  | "media-player"
  | "ereader"
  | "mcu"
  | "desktop";

export type Collection =
  /** The permanent collection: physical machines, most of them finished with by their industry. */
  | "permanent"
  /** The workbench: hosts that exist to build, verify and demonstrate — not exhibits. */
  | "workbench";

export interface SpecItem {
  label: string;
  value: string;
  /** A short caveat, e.g. "PSP-2000 and later carry 64 MB". */
  note?: string;
}

export interface SpecGroup {
  title: string;
  items: SpecItem[];
}

export interface ImageCredit {
  /** Author or rights holder, plain text. */
  author: string;
  /** License short name, e.g. "CC BY-SA 4.0" or "MIT". */
  license: string;
  licenseUrl?: string;
  /** Where the file came from (a Commons file page, a repository path, …). */
  source: string;
  sourceUrl?: string;
  note?: string;
}

export interface HeroImage {
  /** Public path (served from /public) or an imported asset URL. */
  src: string;
  alt: string;
  /** Intrinsic size, used to reserve layout before the image loads. */
  width: number;
  height: number;
  credit: ImageCredit;
  /** `contain` for product shots on flat backgrounds, `cover` for photographs. */
  fit?: "contain" | "cover";
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  /** Upstream-relative path the image was imported from, for the credit line. */
  upstreamPath?: string;
}

export interface DocRef {
  /** Path relative to the upstream repository root, e.g. "hosts/vita/README.md". */
  path: string;
  /** Short label for the tab; falls back to the document's own H1. */
  label?: string;
  /** One line on what the document covers, shown in the tab list. */
  summary?: string;
}

export interface CodeRef {
  path: string;
  label: string;
  /** Language override for the highlighter; inferred from the extension otherwise. */
  lang?: string;
  summary?: string;
}

export interface Milestone {
  /** ISO date (yyyy-mm-dd). */
  date: string;
  /** The upstream release (e.g. "0.8.0") the milestone shipped in, if any. */
  release?: string;
  text: string;
}

export interface PocketAdoption {
  path: ExecutionPath;
  status: AdoptionStatus;
  /** The target/profile identifier upstream uses (registry key, private profile id, or Vapor target). */
  targetId?: string;
  /** A registry key in POCKET_TARGETS when the profile is production. */
  registryKey?: string;
  /** Where the host lives upstream, e.g. "hosts/vita". */
  hostDir?: string;
  /** One paragraph: what runs, how it is rendered, what is proven. */
  summary: string;
  /** Evidence level as upstream states it, e.g. "Real-hardware install … Vita3K pixel oracle". */
  evidence: string;
  /** Upstream documents, rendered verbatim. The first is the primary bring-up guide. */
  docs: DocRef[];
  /** Upstream source files shown as example code. */
  code: CodeRef[];
  /** Blog post slugs on pocketjs.dev (titles/dates resolve from upstream site/nav.ts). */
  stories: string[];
  milestones: Milestone[];
  /** Capabilities the demo app declares, when no registry profile exists. */
  capabilities?: string[];
  /** Logical viewport and density when no registry profile exists. */
  viewport?: { logical: [number, number]; physical?: [number, number]; density?: number };
}

export interface Device {
  slug: string;
  name: string;
  /** A short name for dense layouts (cards, tables). */
  shortName: string;
  maker: string;
  /** Release year shown on the plaque; free text so "1983 · 1985" works. */
  year: string;
  /** Numeric year used for sorting the timeline. */
  sortYear: number;
  family: DeviceFamily;
  collection: Collection;
  /** One line under the name, in the voice of a museum plaque. */
  tagline: string;
  /** One or two short paragraphs: what the machine was, and why it is here. */
  plaque: string[];
  hero: HeroImage;
  gallery: GalleryImage[];
  hardware: SpecGroup[];
  /** The three numbers every card shows: CPU, memory, display. */
  headline: { cpu: string; memory: string; display: string };
  pocket: PocketAdoption;
  /** Where the curated hardware numbers came from. */
  sources: { label: string; url: string }[];
}
