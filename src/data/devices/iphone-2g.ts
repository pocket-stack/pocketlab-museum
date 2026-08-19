import type { Device } from "../types";
import hero from "@/assets/devices/iphone-2g.webp";
import shotHero from "@upstream/site/assets/blog/iphone2g-hero-320.png";
import shotGl from "@upstream/site/assets/blog/iphone2g-device-gl-frame.png";
import shotParity from "@upstream/site/assets/blog/iphone2g-gl-parity.png";
import shotIcon from "@upstream/site/assets/blog/iphone2g-icon-4x.png";

export const iphone2g: Device = {
  slug: "iphone-2g",
  name: "iPhone (first generation)",
  shortName: "iPhone 2G",
  maker: "Apple",
  year: "2007",
  sortYear: 2007,
  family: "phone",
  collection: "permanent",
  tagline: "A UIKit host with no Objective-C. Zero shaders on the MBX Lite. 59.99 fps.",
  plaque: [
    "The original iPhone ran iPhone OS on a Samsung S5L8900: an ARM11 clocked down to 412 MHz, a PowerVR MBX Lite with no programmable shaders, 128 MB of RAM and a 3.5-inch 320×480 multi-touch display. Apple's last update for it was iPhone OS 3.1.3.",
    "PocketJS targets exactly that firmware. Current Xcode still emits ARMv6 and ld-classic still links a 2008 sysroot, but it crashes on the Objective-C relocations modern Clang emits — so the host is plain C that registers its view and delegate through the Objective-C runtime API. The guest, its asset pack and QuickJS ride inside the executable as Mach-O sections.",
  ],
  hero: {
    src: hero,
    alt: "An original 8 GB iPhone showing the iPhone OS 3.1.3 home screen",
    width: 1069,
    height: 1600,
    fit: "cover",
    credit: {
      author: "Pavel \u0160evela",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "Wikimedia Commons \u00b7 Apple iPhone 2G 8GB (15).jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Apple_iPhone_2G_8GB_(15).jpg",
    },
  },
  gallery: [
    {
      src: shotHero,
      alt: "The PocketJS hero demo on the first iPhone at 320×480",
      caption: "The hero demo on the phone's own 320×480 framebuffer.",
      upstreamPath: "site/assets/blog/iphone2g-hero-320.png",
    },
    {
      src: shotGl,
      alt: "A frame captured from the device's OpenGL ES 1.1 renderbuffer",
      caption: "A frame read back from the device's ES 1.1 renderbuffer over USB.",
      upstreamPath: "site/assets/blog/iphone2g-device-gl-frame.png",
    },
    {
      src: shotParity,
      alt: "Pixel parity between the device capture and the reference core",
      caption: "Device capture against the reference rasterizer: mean channel difference 0.04 of 255.",
      upstreamPath: "site/assets/blog/iphone2g-gl-parity.png",
    },
    {
      src: shotIcon,
      alt: "The PocketJS SpringBoard icon for the classic iPhone, at 4×",
      caption: "The 59×60 SpringBoard icon: black enamel, chrome bevel and a pre-baked glass highlight.",
      upstreamPath: "site/assets/blog/iphone2g-icon-4x.png",
    },
  ],
  headline: { cpu: "ARM11 · 412 MHz", memory: "128 MB", display: "320 × 480" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "SoC", value: "Samsung S5L8900" },
        { label: "CPU", value: "ARM1176JZ(F)-S (ARMv6), 620 MHz rated, run at 412 MHz" },
        { label: "GPU", value: "PowerVR MBX Lite, 103 MHz, OpenGL ES 1.1 — no shaders" },
        { label: "RAM", value: "128 MB eDRAM" },
        { label: "Storage", value: "4 / 8 / 16 GB flash" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "3.5″ TFT LCD, 320 × 480, 163 ppi" },
        { label: "Touch", value: "Capacitive multi-touch" },
        { label: "Sensors", value: "Accelerometer, proximity, ambient light" },
        { label: "Camera", value: "2 MP" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "Radio", value: "Quad-band GSM, EDGE" },
        { label: "Wireless", value: "Wi-Fi 802.11b/g, Bluetooth 2.0" },
        { label: "Ports", value: "30-pin dock connector, 3.5 mm (recessed)" },
        { label: "Battery", value: "1400 mAh" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "115 × 61 × 11.6 mm" },
        { label: "Weight", value: "135 g" },
        { label: "Released", value: "29 June 2007" },
        { label: "OS", value: "iPhone OS 1.0 → 3.1.3 (final)" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "hardware",
    targetId: "iphone2g (private)",
    hostDir: "hosts/iphone2g",
    capabilities: ["input.touch", "text.glyphs.baked"],
    viewport: { logical: [320, 480], density: 1 },
    summary:
      "The host is built against an iPhone OS 1.1.4 ABI floor and targets 3.1.3, probing both UIKit generations at runtime with `respondsToSelector:` and `dlsym`. Two render paths exist: the software rasterizer, default, holds 60 fps at ~7.6 ms per frame because both rasterize and composite are limited to the damaged rectangle; the OpenGL ES 1.1 backend for the MBX Lite is opt-in, pixel-verified, and slower because it re-submits the whole DrawList every frame. Deployment is a signed transaction with byte-exact readback and rollback over key-only USB SSH.",
    evidence:
      "Live-device schema-2 receipt: a live PID, advancing heartbeat, a completed touch release and an application-reported `hero_tap`; device framebuffer read back and diffed against the reference core (mean channel difference 0.04/255). The target stays outside the production registry, with a test asserting it.",
    docs: [
      { path: "hosts/iphone2g/README.md", label: "iPhone 2G host", summary: "doctor → bootstrap → build → deploy → launch; the two render paths; acceptance." },
      { path: "docs/IPHONE2G.md", label: "Development record", summary: "The complete 3.1.3 workflow, render-path measurements, the archived 1.1.4 incident and acceptance layers." },
    ],
    code: [
      { path: "apps/iphone2g-demo/app.tsx", label: "iphone2g-demo/app.tsx", summary: "The 320×480 touch demo the device receipt reports on." },
      { path: "apps/iphone2g-demo/pocket.json", label: "iphone2g-demo/pocket.json", summary: "Requires input.touch and baked glyphs; a fixed native 320×480 viewport." },
      { path: "hosts/iphone2g/armv6-apple-ios.json", label: "armv6-apple-ios.json", summary: "The custom Rust target spec for ARMv6 iPhone OS." },
    ],
    stories: ["pocketjs-on-the-first-iphone"],
    milestones: [
      { date: "2026-08-05", text: "Erase restore to the pinned 3.1.3 CustomHJ image; USB SSH and transactional deployment verified." },
      { date: "2026-08-06", release: "0.9.0", text: "Experimental ARMv6 target for iPhone1,1; the GL backend learns fixed-function ES 1.1." },
      { date: "2026-08-06", release: "0.9.1", text: "The GPU path was never losing: three measurement bugs corrected; first host verified by reading pixels back off hardware." },
      { date: "2026-08-06", release: "0.9.2", text: "The software composite follows the damage plan: 22–26 fps becomes 59.99." },
    ],
  },
  sources: [
    { label: "iPhone (1st generation) — Wikipedia", url: "https://en.wikipedia.org/wiki/IPhone_(1st_generation)" },
  ],
};
