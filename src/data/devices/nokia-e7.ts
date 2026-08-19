import type { Device } from "../types";
import hero from "@/assets/devices/nokia-e7.webp";
import shotLauncher from "@upstream/site/assets/blog/symbian-e7-launcher.png";
import shotPortrait from "@upstream/site/assets/blog/symbian-e7-hero-portrait.png";
import shotLandscape from "@upstream/site/assets/blog/symbian-e7-hero-landscape.png";
import shotFigma from "@upstream/site/assets/blog/symbian-e7-figma-zoom.png";

export const nokiaE7: Device = {
  slug: "nokia-e7",
  name: "Nokia E7-00",
  shortName: "Nokia E7",
  maker: "Nokia",
  year: "2011",
  sortYear: 2011,
  family: "phone",
  collection: "permanent",
  tagline: "Cover-flow launcher and a 3D FPS on Symbian Belle. The first phone family.",
  plaque: [
    "The E7 was Nokia's last Communicator: a 4-inch ClearBlack AMOLED at 640×360, a slide-out four-row QWERTY keyboard, an ARM11 at 680 MHz with 256 MB of RAM, HDMI out, and Symbian^3 upgradable to Belle. It shipped in February 2011, the month Nokia announced its move to Windows Phone.",
    "PocketJS apps run on it as installed Symbian applications with their own UIDs: a Qt/GLES2 runtime links the no_std Rust core and pinned QuickJS, embeds the app and its pak, and relayouts live between portrait and landscape. The toolchain is a 32-bit GCCE 4.6.3 from 2011, rebuilt inside a pinned Linux container.",
  ],
  hero: {
    src: hero,
    alt: "A Nokia E7-00 with its slider closed, showing the Symbian home screen",
    width: 1200,
    height: 1600,
    fit: "cover",
    credit: {
      author: "Villeke1",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "Wikimedia Commons \u00b7 Nokia E7-00 mobile phone.JPG",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nokia_E7-00_mobile_phone.JPG",
      note: "Slider closed; the four-row QWERTY keyboard is hidden in this shot.",
    },
  },
  gallery: [
    {
      src: shotLauncher,
      alt: "The PocketJS Cover Flow launcher running on a Nokia E7 in landscape",
      caption: "The Cover Flow launcher on the E7 in landscape, rendered through OpenGL ES 2.",
      upstreamPath: "site/assets/blog/symbian-e7-launcher.png",
    },
    {
      src: shotPortrait,
      alt: "The hero demo on the Nokia E7 in portrait",
      caption: "The hero demo in portrait …",
      upstreamPath: "site/assets/blog/symbian-e7-hero-portrait.png",
    },
    {
      src: shotLandscape,
      alt: "The hero demo on the Nokia E7 in landscape",
      caption: "… and relaid out live in landscape when the keyboard slides out.",
      upstreamPath: "site/assets/blog/symbian-e7-hero-landscape.png",
    },
    {
      src: shotFigma,
      alt: "Pocket Figma zoomed in on a Nokia E7",
      caption: "Pocket Figma's streamed tiles on a 640×360 AMOLED.",
      upstreamPath: "site/assets/blog/symbian-e7-figma-zoom.png",
    },
  ],
  headline: { cpu: "ARM11 · 680 MHz", memory: "256 MB", display: "640 × 360 AMOLED" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "ARM11 (ARM1176JZ-S), 680 MHz" },
        { label: "GPU", value: "Broadcom BCM2727, OpenGL ES 2.0" },
        { label: "RAM", value: "256 MB" },
        { label: "Storage", value: "1 GB ROM + 16 GB mass storage, non-expandable" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "4.0″ ClearBlack AMOLED, 640 × 360 (nHD), 16 M colours" },
        { label: "Touch", value: "Capacitive multi-touch" },
        { label: "Keyboard", value: "Slide-out four-row QWERTY with tilting display" },
        { label: "Sensors", value: "Accelerometer, magnetometer, proximity, ambient light" },
        { label: "Cameras", value: "8 MP EDoF with 720p video, dual LED flash; VGA front" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "Radio", value: "Pentaband HSDPA, quad-band GSM/EDGE" },
        { label: "Wireless", value: "Wi-Fi 802.11b/g/n, Bluetooth 3.0, GPS" },
        { label: "Ports", value: "Micro USB 2.0 with USB OTG, HDMI (mini), 3.5 mm" },
        { label: "Battery", value: "BL-4D 1200 mAh, non-removable" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "123.7 × 62.4 × 13.6 mm" },
        { label: "Weight", value: "176 g" },
        { label: "Released", value: "Announced September 2010 · shipped 7 February 2011" },
        { label: "OS", value: "Symbian^3 → Anna → Nokia Belle Refresh" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "hardware",
    targetId: "symbian-e7-dev",
    hostDir: "hosts/symbian",
    capabilities: ["text.glyphs.baked", "input.buttons", "display.viewport.live"],
    viewport: { logical: [640, 360], physical: [640, 360], density: 1 },
    summary:
      "`pocket symbian setup` downloads five pinned, SHA-256-verified inputs — the Belle SDK for Qt SDK 1.2.1, GCCE 4.6.3, Qt 4.7.4 source, GnuPoc's EKA2 tools and pocket-stack/quickjs-rs — and builds in an isolated linux/amd64 container, because the historical GCCE binaries are 32-bit Intel Linux executables. Rust nightly cross-compiles the no_std core as a static library for the ARMv6 Symbian EABI; the Qt runtime embeds the app and its pak and exposes the host ops for GLES2 drawing, keys and native-resolution touch. SIS packages go over MTP; an optional CODA agent launches apps over USB.",
    evidence:
      "SIS install, launch, visible rendering, keys and rotation on the reference device (RM-626); a hardware-tested development Guest host, not a production target profile.",
    docs: [
      { path: "docs/SYMBIAN_E7.md", label: "Nokia E7 / Symbian Belle", summary: "One-time setup, probe, building and staging apps and the launcher, the CODA agent, port boundaries." },
      { path: "tools/cli/README.md", label: "Toolchain CLI", summary: "pocket symbian doctor / setup / build / deploy / coda." },
    ],
    code: [
      { path: "apps/hero/app.tsx", label: "hero/app.tsx", summary: "The app staged into the E7 runtime." },
    ],
    stories: ["pocketjs-on-symbian"],
    milestones: [
      { date: "2026-07-26", text: "“Symbian Wanted a Frame Function”: the port story is published." },
      { date: "2026-08-05", release: "0.8.0", text: "Symbian is the first phone family: GLES2 renderer, app catalog, live portrait/landscape relayout, slide-out QWERTY." },
      { date: "2026-08-06", release: "0.9.0", text: "The GL backend splits into a DrawList walker plus ES 2 and ES 1.1 pipelines; Symbian's ES 2 output is unchanged." },
    ],
  },
  sources: [
    { label: "Nokia E7-00 — Wikipedia", url: "https://en.wikipedia.org/wiki/Nokia_E7-00" },
  ],
};
