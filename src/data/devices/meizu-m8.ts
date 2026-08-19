import type { Device } from "../types";
import hero from "@/assets/devices/meizu-m8.webp";
import shotFirst from "@upstream/site/assets/blog/meizu-m8-first-frame-320.png";
import shotNative from "@upstream/site/assets/blog/meizu-m8-native-frame-480.png";
import shotReadable from "@upstream/site/assets/blog/meizu-m8-readable-frame-480.png";
import shotShell from "@upstream/site/assets/blog/meizu-m8-sync-shell.png";

export const meizuM8: Device = {
  slug: "meizu-m8",
  name: "Meizu M8",
  shortName: "Meizu M8",
  maker: "Meizu",
  year: "2009",
  sortYear: 2009,
  family: "phone",
  collection: "permanent",
  tagline: "From message pump to multitouch on Windows CE. A 480×720 BGRA framebuffer over GDI.",
  plaque: [
    "Meizu's first phone was announced in 2007 and went on sale in China in February 2009: a 3.4-inch 720×480 capacitive multi-touch display at 255 ppi, a Samsung ARM11 at 667 MHz, 256 MB of RAM, and Meizu's own Mymobile interface on a Windows CE 6.0 kernel. It sold around 100,000 units in its first two months.",
    "PocketJS runs on it as a single Windows CE ARM executable: QuickJS, the app and its assets, and the Rust software renderer in one `PocketJS.exe` that copies a native 480×720 BGRA framebuffer to the LCD through GDI without stretching. Deployment goes over the phone's ActiveSync serial function through PPP and RAPI — no firmware is flashed.",
  ],
  hero: {
    src: hero,
    alt: "A Meizu M8 showing the Wikipedia portal in its browser",
    width: 900,
    height: 1200,
    fit: "cover",
    credit: {
      author: "Crimson05 (de.wikipedia)",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-user-de",
      source: "Wikimedia Commons \u00b7 Meizu m8 wikipedia.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Meizu_m8_wikipedia.jpg",
    },
  },
  gallery: [
    {
      src: shotFirst,
      alt: "The first PocketJS frame on the Meizu M8, clipped to 320×480",
      caption: "The first frame: clipped to 320×480 and stretched, before the host learned the native geometry.",
      upstreamPath: "site/assets/blog/meizu-m8-first-frame-320.png",
    },
    {
      src: shotNative,
      alt: "PocketJS on the Meizu M8 at its native 480×720",
      caption: "The native 480×720 frame composited through GDI.",
      upstreamPath: "site/assets/blog/meizu-m8-native-frame-480.png",
    },
    {
      src: shotReadable,
      alt: "The readable PocketJS hero frame on the Meizu M8",
      caption: "The readable result: matching logical and physical viewports, wide touch coordinates.",
      upstreamPath: "site/assets/blog/meizu-m8-readable-frame-480.png",
    },
    {
      src: shotShell,
      alt: "The Meizu M8 shell showing the PocketJS icon while synced over USB",
      caption: "PocketJS registered as a MiniOneShell icon in the phone's main shell.",
      upstreamPath: "site/assets/blog/meizu-m8-sync-shell.png",
    },
  ],
  headline: { cpu: "Samsung ARM11 · 667 MHz", memory: "256 MB", display: "720 × 480" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "SoC", value: "Samsung S3C6410" },
        { label: "CPU", value: "ARM1176JZF-S (ARM11), 667 MHz" },
        { label: "RAM", value: "256 MB" },
        { label: "Storage", value: "8 / 16 GB flash" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "3.4″ LCD, 720 × 480, 255 ppi, 3:2, 16.6 M colours" },
        { label: "Touch", value: "Capacitive multi-touch" },
        { label: "Sensors", value: "Ambient light, accelerometer, proximity" },
        { label: "Camera", value: "3.2 MP with autofocus" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "Radio", value: "Quad-band GSM, GPRS, EDGE" },
        { label: "Wireless", value: "Wi-Fi (M8SE / later firmware), Bluetooth" },
        { label: "Ports", value: "Mini-USB (USB 2.0), 3.5 mm" },
        { label: "Battery", value: "1200 mAh removable" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "105 × 58 × 11.8 mm" },
        { label: "Weight", value: "118 g" },
        { label: "Released", value: "Announced 2007 · on sale 18 February 2009 (China)" },
        { label: "OS", value: "Windows CE 6.0 kernel with Meizu Mymobile UI" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "hardware",
    targetId: "meizu-m8 (private, host ABI 8)",
    hostDir: "hosts/meizu-m8",
    capabilities: ["input.touch", "text.glyphs.baked"],
    viewport: { logical: [480, 720], density: 1 },
    summary:
      "The native build uses a digest-pinned CeGCC container and a clean pinned QuickJS checkout; the Meizu SDK archive is not a build input. The host turns WinCE messages into wide touch coordinates, closes cleanly on Home or Escape so the shell can regain the display, registers a build-qualified MiniOneShell icon and deploys over the phone's WceUsbSh ActiveSync serial function through macOS `pppd`, an isolated D-Bus and SynCE `dccm`.",
    evidence:
      "Status requires advancing guest frames, successful GDI composites and matching 480×720 logical and physical viewports; acceptance additionally requires a completed touch sequence and a changed `hero_tap` action. `capture` retrieves the device-generated 480×720 framebuffer BMP.",
    docs: [
      { path: "docs/MEIZU_M8.md", label: "Meizu M8 / M8SE", summary: "Build in the CeGCC container, USB bridge and PPP session, deploy, status, accept, capture." },
    ],
    code: [
      { path: "apps/meizu-m8-demo/app.tsx", label: "meizu-m8-demo/app.tsx", summary: "The 480×720 touch demo." },
      { path: "apps/meizu-m8-demo/pocket.json", label: "meizu-m8-demo/pocket.json", summary: "A fixed native 480×720 viewport." },
      { path: "hosts/meizu-m8/armv6-wince-asm.json", label: "armv6-wince-asm.json", summary: "The custom Rust target spec for ARMv6 Windows CE." },
    ],
    stories: ["pocketjs-on-windows-ce"],
    milestones: [
      { date: "2026-08-16", release: "0.10.1", text: "Windows CE runs a real Solid guest on the Meizu M8; the field report follows the port from the first clipped frame to the native result." },
    ],
  },
  sources: [
    { label: "Meizu M8 — Wikipedia", url: "https://en.wikipedia.org/wiki/Meizu_M8" },
  ],
};
