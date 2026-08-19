import type { Device } from "../types";
import hero from "@/assets/devices/pocketbook.webp";

export const pocketbook: Device = {
  slug: "pocketbook",
  name: "PocketBook e-readers",
  shortName: "PocketBook",
  maker: "PocketBook International",
  year: "2023",
  sortYear: 2023,
  family: "ereader",
  collection: "permanent",
  tagline: "Animated partial refresh on a screen that loves stillness. The first e-ink surface.",
  plaque: [
    "PocketBook's readers run a Linux firmware with the inkview SDK over E Ink panels: grayscale Carta on the 6-inch Verse, Kaleido 3 colour on the 7-inch Era Color. Every pixel change costs a panel update, and a full refresh flashes the whole screen.",
    "The PocketJS host rasterizes incrementally, pixel-diffs 16×16 tiles inside the damage regions and chooses partial, dynamic or full updates per change. Boot, rendering, centring and animated partial refresh are validated on a Verse; touch, keys and colour panels are still on the checklist.",
  ],
  hero: {
    src: hero,
    alt: "A PocketBook 360\u00b0 Plus e-ink reader, front view",
    width: 1400,
    height: 1600,
    fit: "cover",
    credit: {
      author: "Artem Topchiy (user Art-top)",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "Wikimedia Commons \u00b7 2012-08-04 PocketBook 360 Plus.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2012-08-04_PocketBook_360_Plus.jpg",
      note: "A PocketBook 360\u00b0 Plus (2011) is pictured; the device PocketJS is validated on is the Verse.",
    },
  },
  gallery: [],
  headline: { cpu: "Dual-core 1 GHz (Verse)", memory: "512 MB", display: "6″ E Ink 758 × 1024" },
  hardware: [
    {
      title: "PocketBook Verse (PB629) — validated",
      items: [
        { label: "CPU", value: "Dual-core ARM, 2 × 1 GHz (Allwinner B288)" },
        { label: "RAM", value: "512 MB" },
        { label: "Storage", value: "8 GB + microSD up to 128 GB" },
        { label: "Display", value: "6″ E Ink Carta, 758 × 1024, 212 ppi, 16 grey levels, SMARTlight front light" },
        { label: "Input", value: "Capacitive touch, four page/menu buttons under the screen, G-sensor" },
        { label: "Connectivity", value: "Wi-Fi, USB-C" },
        { label: "Battery", value: "1500 mAh" },
        { label: "Firmware", value: "PocketBook Linux (kernel 3.10) with inkview" },
      ],
    },
    {
      title: "PocketBook Era Color (PB700K3) — colour path, untested",
      items: [
        { label: "CPU", value: "Quad-core 1.8 GHz" },
        { label: "RAM", value: "1 GB" },
        { label: "Storage", value: "32 GB" },
        { label: "Display", value: "7″ E Ink Kaleido 3, 1264 × 1680 B/W at 300 ppi, 4096 colours at 150 ppi" },
        { label: "Battery", value: "2500 mAh" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "registered",
    targetId: "pocketbook",
    registryKey: "pocketbook",
    hostDir: "hosts/pocketbook",
    summary:
      "`pocketbook-host` is a standalone Rust binary cross-compiled for ARMv7 glibc ≤ 2.23 that dlopens `libinkview.so` at runtime. It renders the DrawList incrementally to a retained 960×544 RGBA buffer (480×272 at density 2, matching the registered profile), diffs 16×16 tiles inside the damage regions, blits only changed pixels as RGB24 and drives the panel with a partial/dynamic/full refresh policy. The render is integer-fit and centred on whatever panel the model has.",
    evidence:
      "Hardware boot, rendering, centring and animated partial refresh confirmed on a PocketBook Verse (grayscale) by photo and video; broader input and colour-panel acceptance remains in progress.",
    docs: [
      { path: "hosts/pocketbook/README.md", label: "PocketBook host", summary: "Cross-compile with cargo-zigbuild, build the bundle, deploy over USB, device checklist." },
      { path: "hosts/pocketbook/docs/IMPLEMENTATION.md", label: "Implementation", summary: "The host design and ground-truth inkview API notes." },
      { path: "hosts/pocketbook/docs/INTEGRATION.md", label: "Integration notes", summary: "Framebuffer, refresh policy, input mapping in detail." },
    ],
    code: [
      { path: "hosts/pocketbook/deploy.ts", label: "deploy.ts", summary: "Installs applications/pocketjs-hero onto the mounted reader." },
      { path: "apps/hero/pocket.json", label: "hero/pocket.json", summary: "The manifest the pocketbook profile admits." },
    ],
    stories: [],
    milestones: [
      { date: "2026-07-24", text: "Boot, render, scale-to-fit centring, 2× text and animated partial updates confirmed on a Verse." },
      { date: "2026-08-05", release: "0.8.0", text: "PocketBook registered as the first e-ink surface: incremental rendering with per-update refresh policy from tile diffs." },
    ],
  },
  sources: [
    { label: "PocketBook Verse — manufacturer specifications", url: "https://pocketbook.ch/en-ch/catalog/verse" },
    { label: "PocketBook Era Color — Liliputing", url: "https://liliputing.com/pocketbook-era-color-is-a-7-inch-ereader-with-a-kaleido-3-display-and-page-turn-buttons/" },
  ],
};
