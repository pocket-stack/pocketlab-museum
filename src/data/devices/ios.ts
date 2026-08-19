import type { Device } from "../types";
import hero from "@/assets/devices/ios-modern.webp";

export const ios: Device = {
  slug: "ios",
  name: "Modern iOS (NativeScript shell)",
  shortName: "iOS simulator",
  maker: "Apple",
  year: "simulator",
  sortYear: 2026,
  family: "phone",
  collection: "workbench",
  tagline: "A transitional iOS target: one guest realm in a NativeScript shell on the arm64 simulator.",
  plaque: [
    "`pocket ios` builds against an `ios-dev` plan and launches inside a NativeScript shell on an arm64 iOS simulator, over the `pocket-apple` crate: one guest realm, one UI surface, the software rasterizer driven incrementally through a damage tracker behind a small C ABI, and a UIKit view compositing only what changed. The published `@nativescript/pocketjs` plugin carries a prebuilt `PocketApple.xcframework`, so the default flow needs no Rust toolchain.",
    "The profile stays out of POCKET_TARGETS until it has device-level acceptance — the same convention the iPhone 2G target used. The iPod touch and iPhone 4S hosts reuse the same `engine/apple` core on real hardware.",
  ],
  hero: {
    src: hero,
    alt: "An iPhone 14 Pro, top-down front view",
    width: 854,
    height: 1600,
    fit: "contain",
    credit: {
      author: "iGeeksBlog",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "Wikimedia Commons \u00b7 IPhone 14 Pro.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:IPhone_14_Pro.jpg",
    },
  },
  gallery: [],
  headline: { cpu: "Apple silicon Mac (simulator)", memory: "host RAM", display: "density 1–4, default 3" },
  hardware: [
    {
      title: "Host",
      items: [
        { label: "Runs on", value: "An Apple silicon Mac with Xcode and an arm64 iOS 16+ simulator runtime" },
        { label: "Shell", value: "NativeScript app (hosts/apple/ns-shell) with @nativescript/pocketjs 0.2.1" },
        { label: "Guest modes", value: "Sidecar QuickJS realm, or the NativeScript runtime itself as the guest engine" },
        { label: "Profile", value: "ios-dev / host ABI 7; 120 Hz path published by the native bridge" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "dev-host",
    targetId: "ios-dev",
    hostDir: "hosts/apple",
    summary:
      "`pocket ios doctor` checks Xcode, the simulator runtime, node and the ns CLI; `pocket play ios nsengine` resolves the manifest against `ios-dev`, runs the build from the plan, stages the bundle, pak and plan into the shell and launches `ns run ios` on a booted simulator. Density is load-bearing: glyph atlases bake at build time and the shell sets the surface's raster scale from the staged plan.",
    evidence:
      "Simulator boot, rendering at 60 fps, touch with aspect-fit inverse mapping, and the guest↔host service round trip in both guest modes. A real-device run is not yet exercised.",
    docs: [
      { path: "docs/APPLE.md", label: "Modern iOS via NativeScript", summary: "Status table, one-time setup, build and run, the ios-dev profile." },
      { path: "tools/cli/README.md", label: "Toolchain CLI", summary: "pocket ios doctor / setup / play." },
    ],
    code: [
      { path: "apps/nsengine/app.tsx", label: "nsengine/app.tsx", summary: "The demo that pings the host service from the guest." },
      { path: "apps/nsengine/pocket.json", label: "nsengine/pocket.json", summary: "The manifest resolved against ios-dev." },
    ],
    stories: [],
    milestones: [
      { date: "2026-08-15", release: "0.10.0", text: "Modern iOS runs guests as a transitional target inside a NativeScript shell on the simulator." },
      { date: "2026-08-16", release: "0.10.1", text: "The 120 Hz path completes with @nativescript/pocketjs 0.2.1." },
    ],
  },
  sources: [
    { label: "docs/APPLE.md — pocket-stack/pocketjs", url: "https://github.com/pocket-stack/pocketjs/blob/main/docs/APPLE.md" },
  ],
};
