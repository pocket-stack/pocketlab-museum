import type { Device } from "../types";
import hero from "@/assets/devices/psp.webp";
import shotOctane from "@upstream/site/assets/blog/octane-hero-jsx-60fps.png";
import shotVoxel from "@upstream/site/assets/blog/voxel-psp-pallet-town.png";
import shotFigma from "@upstream/site/assets/blog/figma-psp-components-zoom.png";
import shotOpenStrike from "@upstream/site/assets/blog/openstrike-psp-dust2.png";
import shotYouTube from "@upstream/site/assets/blog/pocket-youtube-paused.png";

export const psp: Device = {
  slug: "psp",
  name: "Sony PlayStation Portable",
  shortName: "Sony PSP",
  maker: "Sony Computer Entertainment",
  year: "2004",
  sortYear: 2004,
  family: "handheld-console",
  collection: "permanent",
  tagline: "The founding machine. Games, YouTube, Figma and DevTools at a locked 60 fps.",
  plaque: [
    "Sony's first handheld console put a 333 MHz MIPS core, a fixed-function GPU without shaders and 32 MB of RAM behind a 4.3-inch 480×272 widescreen. It shipped in Japan in December 2004 and sold around 80 million units.",
    "PocketJS was built on this machine first: the Rust core, the QuickJS guest, the baked style table and the font atlases all had to fit an 8 MB memory budget here before they went anywhere else. Every later port is measured against what the PSP can do.",
  ],
  hero: {
    src: hero,
    alt: "A piano-black Sony PSP-1000, front three-quarter view",
    width: 1600,
    height: 906,
    fit: "contain",
    credit: {
      author: "Evan-Amos",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-self",
      source: "Wikimedia Commons \u00b7 Psp-1000.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Psp-1000.jpg",
    },
  },
  gallery: [
    {
      src: shotOctane,
      alt: "The PocketJS hero demo running through Octane on a PSP at 60 fps",
      caption: "The hero demo through Octane — a committed 480×272 PPSSPP golden. The 60 in the corner is real.",
      upstreamPath: "site/assets/blog/octane-hero-jsx-60fps.png",
    },
    {
      src: shotVoxel,
      alt: "Pallet Town as a voxel diorama on a real PSP",
      caption: "Pocket Voxel on a PSP-2000, photographed by the machine itself over PSPLINK.",
      upstreamPath: "site/assets/blog/voxel-psp-pallet-town.png",
    },
    {
      src: shotFigma,
      alt: "Pocket Figma on a PSP zoomed into the kit's Components page",
      caption: "Pocket Figma: a 14,430-node Figma document baked into streamed tiles, panned with the nub.",
      upstreamPath: "site/assets/blog/figma-psp-components-zoom.png",
    },
    {
      src: shotOpenStrike,
      alt: "OpenStrike running on a PSP",
      caption: "OpenStrike — a Counter-Strike-shaped FPS with a Solid HUD at a locked 60 fps on real hardware.",
      upstreamPath: "site/assets/blog/openstrike-psp-dust2.png",
    },
    {
      src: shotYouTube,
      alt: "Pocket YouTube paused on a PSP",
      caption: "Pocket YouTube: search, video, seeking and 44.1 kHz audio, streamed over a USB cable.",
      upstreamPath: "site/assets/blog/pocket-youtube-paused.png",
    },
  ],
  headline: { cpu: "MIPS R4000 · 333 MHz", memory: "32 MB", display: "480 × 272" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "Sony/Toshiba “Allegrex” MIPS R4000-class 32-bit core", note: "with VFPU vector unit and a second MIPS “Media Engine” core" },
        { label: "Clock", value: "1–333 MHz", note: "capped at 222 MHz for games until firmware 3.50" },
        { label: "GPU", value: "Graphics Engine (GE), 166 MHz, 2 MB eDRAM", note: "fixed-function, no shaders" },
        { label: "RAM", value: "32 MB", note: "PSP-2000 and later carry 64 MB; PocketJS budgets 8 MB" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "4.3″ TFT LCD, 480 × 272, 16.77 M colours" },
        { label: "Input", value: "D-pad, analog nub, △ ○ ✕ □, L/R, Start/Select, Home" },
        { label: "Audio", value: "Stereo speakers, 3.5 mm jack" },
      ],
    },
    {
      title: "Storage & connectivity",
      items: [
        { label: "Media", value: "UMD drive, Memory Stick PRO Duo" },
        { label: "Connectivity", value: "Wi-Fi 802.11b, USB 2.0, IrDA (PSP-1000)" },
        { label: "Battery", value: "1800 mAh (PSP-1000)" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "170 × 74 × 23 mm" },
        { label: "Weight", value: "280 g (PSP-1000) · 189 g (PSP-2000)" },
        { label: "Released", value: "12 December 2004 (Japan) · 24 March 2005 (North America)" },
        { label: "System software", value: "PSP XMB; homebrew via custom firmware" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "registered",
    targetId: "psp",
    registryKey: "psp",
    hostDir: "hosts/psp",
    summary:
      "The stock host embeds QuickJS and the PocketJS Rust core in an EBOOT.PBP built with rust-psp. The core lays out the retained tree and emits a DrawList that the host walks through sceGu; text comes from atlases baked at build time; audio is a 4-stream mixer on one 44.1 kHz channel. A `pocket.json` manifest is admitted against the `psp` profile before the build runs.",
    evidence:
      "Real-hardware applications (OpenStrike, Pocket Voxel, Pocket Figma, Pocket YouTube, the Cover Flow launcher) plus PPSSPP input journeys and byte-exact frame goldens.",
    docs: [
      { path: "tools/cli/README.md", label: "Toolchain CLI", summary: "pocket doctor / setup / build / hw — the pinned Rust + PSP toolchain." },
      { path: "site/content/docs/getting-started.md", label: "Getting started", summary: "Manifest, component, mount entry, building an EBOOT." },
      { path: "site/content/docs/build-pipeline.md", label: "Build pipeline", summary: "How a bundle and its .pak are produced for a target." },
      { path: "docs/LAUNCHER.md", label: "Launcher", summary: "The Cover Flow launcher and whole-guest app switching on PSP and Vita." },
      { path: "docs/DEVTOOLS.md", label: "DevTools", summary: "Time-travel debugging over a USB cable." },
      { path: "docs/AUDIO.md", label: "Audio", summary: "Credit-based PCM streaming; the PSP channel is the reference." },
    ],
    code: [
      { path: "apps/hero/app.tsx", label: "hero/app.tsx", summary: "The hero demo: a Solid component using the public primitives." },
      { path: "apps/hero/pocket.json", label: "hero/pocket.json", summary: "The manifest admitted against the psp and vita profiles." },
      { path: "tools/cli/psp-toolchain.json", label: "psp-toolchain.json", summary: "The pinned Rust nightly, rust-psp, QuickJS and SDK revisions." },
    ],
    stories: [
      "introducing-pocketjs",
      "shipping-openstrike",
      "pocket-figma",
      "pocket-youtube",
      "octane-on-psp",
      "pocket-voxel",
      "time-travel-devtools",
      "baking-motion",
    ],
    milestones: [
      { date: "2026-07-06", release: "0.1.0", text: "Initial public release: Sony PSP (QuickJS + sceGu) is the first host." },
      { date: "2026-07-09", text: "OpenStrike ships at a locked 60 fps on real hardware." },
      { date: "2026-07-17", release: "0.5.0", text: "System software: USB app services, system keyboard, virtual pointer; Pocket YouTube." },
      { date: "2026-07-23", release: "0.7.0", text: "Cover Flow launcher and whole-guest app switching, verified on hardware." },
      { date: "2026-08-05", release: "0.8.0", text: "Octane becomes the third framework; deterministic audio ships a PSP hardware channel." },
      { date: "2026-08-08", release: "0.9.3", text: "The PSP arena stops stranding the memory a QuickJS boot needs." },
    ],
  },
  sources: [
    { label: "PlayStation Portable — Wikipedia", url: "https://en.wikipedia.org/wiki/PlayStation_Portable" },
    { label: "pocket-stack/pocketjs README — Platforms and evidence", url: "https://github.com/pocket-stack/pocketjs#platforms-and-evidence" },
  ],
};
