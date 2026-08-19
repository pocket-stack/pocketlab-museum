import type { Device } from "../types";
import hero from "@/assets/devices/iphone-4s.webp";

export const iphone4s: Device = {
  slug: "iphone-4s",
  name: "iPhone 4S",
  shortName: "iPhone 4S",
  maker: "Apple",
  year: "2011",
  sortYear: 2011,
  family: "phone",
  collection: "permanent",
  tagline: "The retained UI through OpenGL ES 1.1 at Retina density, on iOS 6.1.3.",
  plaque: [
    "The 4S kept the iPhone 4's glass-and-steel body and added the dual-core A5, Siri and an 8 MP camera. Its 3.5-inch 640×960 Retina display was the densest phone screen of its day. Apple supported it through iOS 9.",
    "The PocketJS host targets the exact iPhone4,1 / iOS 6.1.3 tuple. Modern Xcode no longer ships ARMv7 iOS libraries, so the build derives hash-pinned linker stubs from the operator's own restore image and refuses to run unless the device reports a 640×960 GLES1 drawable for the 320×480 logical viewport.",
  ],
  hero: {
    src: hero,
    alt: "A black iPhone 4S showing its home screen",
    width: 1600,
    height: 1060,
    fit: "cover",
    credit: {
      author: "Domenic K. (Flickr)",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source: "Wikimedia Commons \u00b7 Apple iPhone 4S (7997974054).jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Apple_iPhone_4S_(7997974054).jpg",
    },
  },
  gallery: [],
  headline: { cpu: "Apple A5 · 2 × 800 MHz", memory: "512 MB", display: "640 × 960 Retina" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "SoC", value: "Apple A5 (APL0498)" },
        { label: "CPU", value: "Dual-core ARM Cortex-A9, 800 MHz" },
        { label: "GPU", value: "PowerVR SGX543MP2" },
        { label: "RAM", value: "512 MB LPDDR2" },
        { label: "Storage", value: "8 / 16 / 32 / 64 GB" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "3.5″ IPS LCD “Retina”, 640 × 960, 326 ppi" },
        { label: "Touch", value: "Capacitive multi-touch" },
        { label: "Cameras", value: "8 MP with 1080p video; VGA front" },
        { label: "Sensors", value: "3-axis gyroscope, accelerometer, proximity, ambient light, compass" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "Radio", value: "Quad-band GSM/EDGE, HSDPA 14.4, CDMA/EV-DO (dual-mode)" },
        { label: "Wireless", value: "Wi-Fi 802.11b/g/n, Bluetooth 4.0, GPS/GLONASS" },
        { label: "Ports", value: "30-pin dock connector, 3.5 mm" },
        { label: "Battery", value: "1432 mAh" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "115.2 × 58.6 × 9.3 mm" },
        { label: "Weight", value: "140 g" },
        { label: "Released", value: "14 October 2011" },
        { label: "OS", value: "iOS 5.0 → 9.3.6 (final); PocketJS targets 6.1.3 (10B329)" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "hardware",
    targetId: "iphone4s (private)",
    hostDir: "hosts/iphone4s",
    capabilities: ["input.touch", "text.glyphs.baked"],
    viewport: { logical: [320, 480], physical: [640, 960], density: 2 },
    summary:
      "The host compiles the shared legacy UIKit runtime for ARMv7 and links it against a local sysroot extracted from a validated iOS 6.1.3 restore image: `prepare-sysroot` reads the dyld shared cache, thins it to ARMv7 and generates TAPI linker stubs. The retained UI core initialises at density 2 and the UIKit view's content scale is set to 2 before the renderbuffer is allocated. Deploys hold a device-side lease, hash every staged file, keep the previous bundle and roll back on failure.",
    evidence:
      "Status requires a live PID, advancing heartbeat and frame counter, a byte-exact installed build receipt and an empty runtime error; `--require-action` adds a completed touch sequence and a `hero_tap` that changed guest state; `capture` accepts only the 640×960 GLES1 Retina drawable. Private profile — outside POCKET_TARGETS.",
    docs: [
      { path: "docs/IPHONE4S.md", label: "iPhone 4S", summary: "Device state, build inputs, build/deploy, hardware acceptance." },
      { path: "hosts/iphone4s/README.md", label: "iPhone 4S host", summary: "The exact hardware tuple, GLES1 requirement, SpringBoard artwork." },
    ],
    code: [
      { path: "apps/iphone4s-demo/app.tsx", label: "iphone4s-demo/app.tsx", summary: "The 320×480 logical demo rendered at 2×." },
      { path: "apps/iphone4s-demo/pocket.json", label: "iphone4s-demo/pocket.json", summary: "The manifest: input.touch, baked glyphs, native 320×480." },
      { path: "hosts/iphone4s/armv7-apple-ios.json", label: "armv7-apple-ios.json", summary: "The custom Rust target spec for ARMv7 iOS 6." },
    ],
    stories: [],
    milestones: [
      { date: "2026-08-16", release: "0.10.1", text: "The iPhone 4S runs the retained UI through OpenGL ES 1.1 at Retina density, with transaction leases and rollback." },
    ],
  },
  sources: [
    { label: "iPhone 4S — Wikipedia", url: "https://en.wikipedia.org/wiki/IPhone_4S" },
  ],
};
