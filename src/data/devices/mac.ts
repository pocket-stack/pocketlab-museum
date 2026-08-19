import type { Device } from "../types";
import hero from "@/assets/devices/mac.webp";
import shotActivity from "@upstream/site/assets/blog/pocket-character-activity.jpg";
import shotBlink from "@upstream/site/assets/blog/pocket-character-blink-strip.png";

export const mac: Device = {
  slug: "mac",
  name: "Apple Mac (macOS)",
  shortName: "macOS",
  maker: "Apple",
  year: "desktop",
  sortYear: 2026,
  family: "desktop",
  collection: "workbench",
  tagline: "Two registered desktop targets: the always-on-top widget shell and the gpui Metal app window.",
  plaque: [
    "The desktop is where PocketJS is developed, but it is also a target in its own right. `macos-widget` is a resizable always-on-top window whose logical viewport is the window, rendered at density 2 with a real pointer, keyboard/IME text and runtime-baked glyphs. `macos-app` paints the same DrawList through gpui, Zed's Metal renderer, and can let CoreText measure and shape text.",
    "Pocket Character proved the form factor: a VRM digital human in one native transparent process at 118 MB and 3.9 % of a core, against eight processes and 2184 MB for the Electron stage it replaced.",
  ],
  hero: {
    src: hero,
    alt: "An M1 MacBook, open, front view",
    width: 1403,
    height: 1600,
    fit: "contain",
    credit: {
      author: "Wilfredor",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      source: "Wikimedia Commons \u00b7 MacBook M1.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:MacBook_M1.jpg",
    },
  },
  gallery: [
    {
      src: shotActivity,
      alt: "Activity Monitor showing the pocket-character process",
      caption: "Activity Monitor: one process, 118 MB, a few percent of a core, while rendering 60 fps of skinned 3D.",
      upstreamPath: "site/assets/blog/pocket-character-activity.jpg",
    },
    {
      src: shotBlink,
      alt: "A strip of frames of the VRM character blinking",
      caption: "The renderer's actual output on a transparent always-on-top window, alpha and all.",
      upstreamPath: "site/assets/blog/pocket-character-blink-strip.png",
    },
  ],
  headline: { cpu: "Apple silicon / Intel", memory: "host RAM", display: "dynamic viewport · density 2" },
  hardware: [
    {
      title: "Host",
      items: [
        { label: "Platform", value: "macOS on Apple silicon (Metal) or Intel" },
        { label: "Renderers", value: "pocket-ui-wgpu (portable, baked text) · pocket-ui-gpui (Metal, native text)" },
        { label: "Windows", value: "Transparent, undecorated, always-on-top widget shells; ordinary app windows" },
        { label: "Input", value: "Real pointer, hardware keyboard with IME, clipboard" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "registered",
    targetId: "macos-widget · macos-app",
    registryKey: "macos-widget",
    hostDir: "hosts/macos",
    summary:
      "`bun run macos note` resolves the note manifest against `macos-app`, writes the plan, builds bundle and pak and derives host flags from the resolved capabilities; `bun run macos hero` runs a fixed 480×272 console app size-locked with its baked glyph pipeline intact. The widget shell is the `pocket-widget` crate: fixed-rate guest ticks, demand-driven GPU frames, a frames-vs-ticks receipt logged on exit. Both hosts speak host ABI 3.",
    evidence:
      "macos-widget: dynamic native window, pointer, keyboard/IME, clipboard and runtime glyph paths in the registry. macos-app: gpui backend tests, sim traces and --proof acceptance runs (opted out of pixel goldens by design).",
    docs: [
      { path: "docs/WIDGET.md", label: "Pocket Widget", summary: "Desktop widgets as a runtime-family capability; Pocket Stage." },
      { path: "docs/BACKENDS.md", label: "Render backends", summary: "The portable backend and the gpui backend; the macos-app target." },
      { path: "docs/RUNTIMES.md", label: "Runtime family", summary: "Cores, surfaces and the guest." },
    ],
    code: [
      { path: "contracts/spec/platforms.ts", label: "platforms.ts", summary: "The registry: macos-widget and macos-app profiles next to psp, vita and pocketbook." },
    ],
    stories: ["pocket-character"],
    milestones: [
      { date: "2026-07-19", release: "0.6.0", text: "The engine leaves the handheld: transparent widget windows and the VRM character stack." },
      { date: "2026-07-23", release: "0.7.0", text: "Widgets grow a family: the pocket-widget crate, Pocket Note on desktop-widget-macos, Pocket Stage." },
      { date: "2026-08-17", text: "The gpui render backend and the macos-app target with native text layout land on main (PR #293)." },
    ],
  },
  sources: [
    { label: "docs/BACKENDS.md — pocket-stack/pocketjs", url: "https://github.com/pocket-stack/pocketjs/blob/main/docs/BACKENDS.md" },
  ],
};
