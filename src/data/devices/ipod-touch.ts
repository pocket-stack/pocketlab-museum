import type { Device } from "../types";
import hero from "@/assets/devices/ipod-touch.webp";

export const ipodTouch: Device = {
  slug: "ipod-touch",
  name: "iPod touch (6th generation)",
  shortName: "iPod touch 6",
  maker: "Apple",
  year: "2015",
  sortYear: 2015,
  family: "media-player",
  collection: "permanent",
  tagline: "A transactional native host on a 320×568 surface, 60 Hz from a run-loop timer.",
  plaque: [
    "The sixth-generation iPod touch was the last iPod with a touchscreen and the only one with a 64-bit chip: an A8 at 1.1 GHz, 1 GB of RAM and a 4-inch 640×1136 Retina display in an 88-gram body. It launched in July 2015 and ended on iOS 12.",
    "The PocketJS host is an arm64 UIKit application that statically links `engine/apple` and advances the guest from an explicit 60 Hz main-run-loop timer, because the tested jailbroken iOS 12 runtime does not deliver CADisplayLink callbacks. The 568-point height exceeds the legacy touch wire's 9-bit range, so the host emits the framework's wide touch form.",
  ],
  hero: {
    src: hero,
    alt: "A space-grey sixth-generation iPod touch, front view",
    width: 612,
    height: 1600,
    fit: "contain",
    credit: {
      author: "Redolta",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      source: "Wikimedia Commons \u00b7 IPod 6th Generation.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:IPod_6th_Generation.jpg",
      note: "The fifth and sixth generations share the same body.",
    },
  },
  gallery: [],
  headline: { cpu: "Apple A8 · 1.1 GHz", memory: "1 GB", display: "640 × 1136 Retina" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "SoC", value: "Apple A8 (APL1011) with M8 motion coprocessor" },
        { label: "CPU", value: "Dual-core 64-bit ARMv8 “Typhoon”, 1.1 GHz" },
        { label: "GPU", value: "PowerVR GX6450, 4 clusters" },
        { label: "RAM", value: "1 GB LPDDR3" },
        { label: "Storage", value: "16 / 32 / 64 / 128 GB" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "4″ IPS LCD “Retina”, 640 × 1136, 326 ppi" },
        { label: "Touch", value: "Capacitive multi-touch" },
        { label: "Cameras", value: "8 MP iSight with 1080p video; 1.2 MP FaceTime" },
        { label: "Sensors", value: "3-axis gyroscope, accelerometer" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "Wireless", value: "Wi-Fi 802.11a/b/g/n/ac, Bluetooth 4.1" },
        { label: "Ports", value: "Lightning, 3.5 mm" },
        { label: "Battery", value: "1043 mAh" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "123.4 × 58.6 × 6.1 mm" },
        { label: "Weight", value: "88 g" },
        { label: "Released", value: "15 July 2015" },
        { label: "OS", value: "iOS 8.4 → 12.5.7 (final); PocketJS tested on 12.5.8 (16H88)" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "hardware",
    targetId: "ipodtouch-dev",
    hostDir: "hosts/ipodtouch",
    capabilities: ["input.touch", "text.glyphs.baked"],
    viewport: { logical: [320, 568], physical: [640, 1136], density: 2 },
    summary:
      "`bun ipodtouch build` resolves `apps/ipodtouch-demo/pocket.json`, builds its Solid guest and pak, compiles `pocket-apple` for arm64 iOS 12, links a UIKit executable and pseudo-signs it with `ldid`. The host publishes `ipodtouch-dev` / ABI 7 — a plan-built guest refuses to mount on a host with a different target identifier. Each deploy re-identifies the USB device, opens a fresh UDID-scoped tunnel to Checkra1n's Dropbear on port 44, verifies the staged bundle byte by byte and keeps a rollback copy until SpringBoard registration succeeds.",
    evidence:
      "Runtime acceptance requires a live PID, advancing guest frames, an error-free receipt, a completed touch sequence and a changed `hero_tap` action; `capture` pulls the device-rendered frame. Tested device: iPod7,1 on iOS 12.5.8 — a private development profile.",
    docs: [
      { path: "docs/IPODTOUCH.md", label: "iPod touch 6", summary: "Execution path, build and deploy, app icon, hardware acceptance." },
      { path: "hosts/ipodtouch/README.md", label: "iPod touch host", summary: "The connected-device workflow in five commands." },
    ],
    code: [
      { path: "apps/ipodtouch-demo/app.tsx", label: "ipodtouch-demo/app.tsx", summary: "The 320×568 touch demo." },
      { path: "apps/ipodtouch-demo/pocket.json", label: "ipodtouch-demo/pocket.json", summary: "A fixed native 320×568 viewport." },
    ],
    stories: [],
    milestones: [
      { date: "2026-08-14", text: "Native PocketJS device host for the iPod touch lands (PR #278)." },
      { date: "2026-08-16", release: "0.10.1", text: "The sixth-generation iPod touch has a transactional native host with a device receipt proving frames, release and hero_tap." },
    ],
  },
  sources: [
    { label: "iPod touch (6th generation) — Wikipedia", url: "https://en.wikipedia.org/wiki/IPod_Touch_(6th_generation)" },
  ],
};
