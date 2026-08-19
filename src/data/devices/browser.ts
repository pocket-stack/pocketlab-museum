import type { Device } from "../types";
import hero from "@upstream/site/assets/pocketjs-demo-wall.jpg";
import shotDevtools from "@upstream/site/assets/blog/devtools-panel-device.png";
import shotTape from "@upstream/site/assets/blog/devtools-tape-frame.png";

export const browser: Device = {
  slug: "browser",
  name: "Browser, desktop & headless Bun",
  shortName: "Web & sim",
  maker: "pocket-stack",
  year: "dev hosts",
  sortYear: 2026,
  family: "desktop",
  collection: "workbench",
  tagline: "The same Rust core as WebAssembly, a wgpu desktop window, and a deterministic headless simulator.",
  plaque: [
    "Nothing on this page is a museum piece; it is the bench every exhibit was built on. `hosts/web` runs the core compiled to wasm32 in a browser with the software rasterizer — the online playground is this host. `hosts/sim` is a headless Bun host that ticks the guest deterministically for byte-exact frame goldens, tapes and DevTools traces, and it is where new modules such as `net`, `db` and `fs` land first.",
    "Every frame is one transaction over the input tape: same tape in, same trajectory out, which is what lets a UI be tested like a pure function and replayed over a USB cable from real hardware.",
  ],
  hero: {
    src: hero,
    alt: "A wall of sixteen PocketJS programs rendered by the engine",
    width: 1280,
    height: 726,
    fit: "cover",
    credit: {
      author: "pocket-stack/pocketjs",
      license: "MIT",
      source: "site/assets/pocketjs-demo-wall.jpg",
      sourceUrl: "https://github.com/pocket-stack/pocketjs/blob/main/site/assets/pocketjs-demo-wall.jpg",
      note: "Engine output only, baked by site/bake-demo-wall.ts.",
    },
  },
  gallery: [
    {
      src: shotDevtools,
      alt: "The PocketJS DevTools panel attached to a device",
      caption: "DevTools attached to a device over the USB debug bridge: tree, styles, tapes.",
      upstreamPath: "site/assets/blog/devtools-panel-device.png",
    },
    {
      src: shotTape,
      alt: "A DevTools tape frame",
      caption: "A tape frame: scrub time, diff state, replay byte-for-byte.",
      upstreamPath: "site/assets/blog/devtools-tape-frame.png",
    },
  ],
  headline: { cpu: "wasm32 / native", memory: "host RAM", display: "480 × 272 and any dynamic viewport" },
  hardware: [
    {
      title: "Hosts",
      items: [
        { label: "Browser", value: "hosts/web — the wasm core, software rasterizer, audio worklet, net adapter, DevTools" },
        { label: "Desktop", value: "pocket-ui-wgpu window host in the engine workspace" },
        { label: "Headless", value: "hosts/sim — deterministic Bun host: tapes, goldens, launcher, audio/db/fs/net sims" },
        { label: "Emulators", value: "PPSSPP and Vita3K journeys drive the console goldens" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "dev-host",
    targetId: "web · sim (development hosts)",
    hostDir: "hosts/web",
    summary:
      "`bun run dev` builds the WASM core and the hero app and serves the browser host; `bun run golden` renders deterministic frame goldens; `bun tools/tape.ts replay` replays an input tape headlessly and hashes every frame. Apps target the same profiles they ship with — the hosts inject themselves where a native PSP/Vita host would be detected.",
    evidence:
      "WASM/native rendering, interactive development, deterministic simulation and image goldens; the reference hosts for every capability registered ahead of a console (audio.pcm, net.http, data.sqlite, data.fs).",
    docs: [
      { path: "docs/DETERMINISM.md", label: "Determinism", summary: "The frame transaction, virtual clock, seeded state, tapes." },
      { path: "docs/DEVTOOLS.md", label: "DevTools", summary: "The panel, the USB debug bridge, time travel." },
      { path: "docs/NET.md", label: "net", summary: "Bounded whole-response HTTP behind five ops." },
      { path: "docs/DB.md", label: "db", summary: "SQLite behind five synchronous ops." },
      { path: "docs/FS.md", label: "fs", summary: "A per-app file tree behind nine ops." },
      { path: "docs/PLATFORM.md", label: "The .pocket platform", summary: "One app, every target, one file." },
    ],
    code: [
      { path: "apps/hero/main.tsx", label: "hero/main.tsx", summary: "The mount entry the dev host serves." },
    ],
    stories: ["ui-runtime-that-cant-flake", "time-travel-devtools", "introducing-pocketjs"],
    milestones: [
      { date: "2026-07-06", release: "0.1.0", text: "Browser WebAssembly, desktop wgpu window and headless Bun ship with the first release." },
      { date: "2026-07-08", text: "Time Travel over a USB Cable: PocketJS DevTools." },
      { date: "2026-08-15", release: "0.10.0", text: "net, db and fs land behind deterministic sim hosts and reference Rust cores." },
    ],
  },
  sources: [
    { label: "docs/DETERMINISM.md — pocket-stack/pocketjs", url: "https://github.com/pocket-stack/pocketjs/blob/main/docs/DETERMINISM.md" },
  ],
};
