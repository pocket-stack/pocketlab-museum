import type { Device } from "../types";
import hero from "@/assets/devices/vita.webp";
import shotGallery from "@upstream/site/assets/blog/vita-gallery-960.png";
import shotDensity from "@upstream/site/assets/blog/vita-density-compare.png";
import shotTalk from "@upstream/site/assets/blog/vita-pocket-talk-960.png";

export const vita: Device = {
  slug: "vita",
  name: "Sony PlayStation Vita",
  shortName: "PS Vita",
  maker: "Sony Computer Entertainment",
  year: "2011",
  sortYear: 2011,
  family: "handheld-console",
  collection: "permanent",
  tagline: "Twice the pixels, zero forks. The same bundles, byte-exact goldens at density 2.",
  plaque: [
    "The Vita paired a quad-core Cortex-A9 with a PowerVR SGX543MP4+, 512 MB of RAM and a 5-inch 960×544 OLED, plus a capacitive touchscreen and a rear touch pad. It launched in Japan in December 2011 and was discontinued in 2019.",
    "For PocketJS the Vita is the second profile of one application contract: the logical viewport stays 480×272, the profile sets raster density 2, and the same manifest resolves unchanged. It is also the reference for the GXM path of the Pocket3D cores.",
  ],
  hero: {
    src: hero,
    alt: "A PlayStation Vita PCH-1100 (first-generation OLED model), front view",
    width: 1600,
    height: 952,
    fit: "contain",
    credit: {
      author: "Evan-Amos",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-self",
      source: "Wikimedia Commons \u00b7 PlayStation-Vita-1101-FL.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:PlayStation-Vita-1101-FL.jpg",
    },
  },
  gallery: [
    {
      src: shotGallery,
      alt: "The PocketJS gallery demo at 960×544 on PS Vita",
      caption: "The gallery demo rendered at 960×544: geometry sampled at physical resolution, atlases baked at 2×.",
      upstreamPath: "site/assets/blog/vita-gallery-960.png",
    },
    {
      src: shotDensity,
      alt: "Side-by-side comparison of density 1 and density 2 rendering",
      caption: "Density 1 against density 2 — the same DrawList, twice the raster samples per logical pixel.",
      upstreamPath: "site/assets/blog/vita-density-compare.png",
    },
    {
      src: shotTalk,
      alt: "Pocket Talk messaging demo on PS Vita",
      caption: "Pocket Talk on the Vita: touch, the system keyboard and CJK text on a 960×544 surface.",
      upstreamPath: "site/assets/blog/vita-pocket-talk-960.png",
    },
  ],
  headline: { cpu: "Cortex-A9 ×4 · 333 MHz", memory: "512 MB + 128 MB VRAM", display: "960 × 544 OLED" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "ARM Cortex-A9 MPCore, 4 cores" },
        { label: "Clock", value: "333 MHz nominal, 444 MHz available to titles", note: "Sony never published the clock; the SoC tops out at 500 MHz" },
        { label: "GPU", value: "PowerVR SGX543MP4+, 4 cores" },
        { label: "RAM", value: "512 MB system + 128 MB video" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "5″ OLED, 960 × 544 (qHD), 220 ppi", note: "PCH-2000 uses a 5″ LCD of the same resolution" },
        { label: "Touch", value: "Capacitive multi-touch front panel, rear touch pad" },
        { label: "Input", value: "D-pad, two analog sticks, △ ○ ✕ □, L/R, Start/Select, PS" },
        { label: "Sensors", value: "3-axis gyroscope, 3-axis accelerometer, compass, two 0.3 MP cameras" },
      ],
    },
    {
      title: "Storage & connectivity",
      items: [
        { label: "Media", value: "PS Vita game card, proprietary memory card 4–64 GB", note: "PCH-2000 adds 1 GB internal" },
        { label: "Connectivity", value: "Wi-Fi 802.11b/g/n, Bluetooth 2.1+EDR, optional 3G" },
        { label: "Battery", value: "2210 mAh" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "182 × 83.5 × 18.6 mm (PCH-1000)" },
        { label: "Weight", value: "260 g Wi-Fi · 279 g 3G" },
        { label: "Released", value: "17 December 2011 (Japan) · 22 February 2012 (NA/EU)" },
        { label: "System software", value: "LiveArea; homebrew via HENkaku / VitaShell" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "registered",
    targetId: "vita",
    registryKey: "vita",
    hostDir: "hosts/vita",
    summary:
      "`pocketjs-vita` embeds QuickJS, feeds the normal PocketJS pak and renders the standard DrawList with vita2d/GXM. The JS/pak pair is recompiled from the resolved Vita plan so density and host-contract constants are target-correct; each manifest id becomes a stable nine-character title id, and every VPK carries complete LiveArea artwork.",
    evidence:
      "Real-hardware install, boot, GXM presentation, controller and interactive flows; a Vita3K-driven 960×544 CPU pixel oracle plus GXM texture/font residency checks in the e2e suite.",
    docs: [
      { path: "hosts/vita/README.md", label: "Vita host", summary: "VitaSDK + cargo-vita + Rust nightly; build, install with VitaShell, golden E2E." },
      { path: "docs/SVC-VITA.md", label: "System services", summary: "The svc mailbox over Wi-Fi: PKNT wire protocol, video plane, audio over TCP." },
      { path: "docs/LAUNCHER.md", label: "Launcher", summary: "The Cover Flow launcher ported to the Vita." },
      { path: "site/content/docs/platform-contracts.md", label: "Platform contracts", summary: "Why one manifest resolves for PSP and Vita." },
    ],
    code: [
      { path: "hosts/vita/rust-toolchain.toml", label: "rust-toolchain.toml", summary: "The pinned nightly recorded next to the host." },
      { path: "apps/hero/pocket.json", label: "hero/pocket.json", summary: "One manifest; the Vita profile supplies density 2." },
      { path: "apps/hero/app.tsx", label: "hero/app.tsx", summary: "The same Solid component the PSP runs." },
    ],
    stories: ["pocketjs-on-ps-vita"],
    milestones: [
      { date: "2026-07-13", release: "0.4.0", text: "PS Vita becomes a first-class target: native-density rendering, touch, VPK packaging, Vita goldens." },
      { date: "2026-07-23", release: "0.7.0", text: "Vita renders Pocket3D worlds through GXM instead of the CPU blitter." },
      { date: "2026-08-05", release: "0.8.0", text: "The Cover Flow launcher ports to Vita; the svc mailbox goes wireless." },
    ],
  },
  sources: [
    { label: "PlayStation Vita — Wikipedia", url: "https://en.wikipedia.org/wiki/PlayStation_Vita" },
    { label: "pocket-stack/pocketjs README — Platforms and evidence", url: "https://github.com/pocket-stack/pocketjs#platforms-and-evidence" },
  ],
};
