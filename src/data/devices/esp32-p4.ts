import type { Device } from "../types";
import hero from "@/assets/devices/esp32-p4.webp";
import shotPi from "@upstream/site/assets/blog/pocket-pi-esp32-hero.png";
import shotHotplug from "@upstream/site/assets/blog/pocket-pi-hotplug-install-flow.png";

export const esp32p4: Device = {
  slug: "esp32-p4",
  name: "Espressif ESP32-P4",
  shortName: "ESP32-P4",
  maker: "Espressif · M5Stack",
  year: "2025",
  sortYear: 2025,
  family: "mcu",
  collection: "permanent",
  tagline: "Rendered by damage: an RGB565 raster path and a PPA hardware backend at 1280×720. QuickJS in 304 KB.",
  plaque: [
    "The ESP32-P4 is Espressif's high-performance MCU: two RISC-V cores at up to 400 MHz, a 40 MHz low-power core, 768 KB of on-chip SRAM, a Pixel Processing Accelerator, 2D-DMA, MIPI-DSI and CSI, and an H.264 encoder — Wi-Fi comes from a companion chip. M5Stack's Tab5 puts it behind a 5-inch 1280×720 IPS touchscreen with 32 MB of PSRAM and an ESP32-C6 for Wi-Fi 6.",
    "PocketJS meets it twice. `engine/backends/esp32p4-ppa` is a no_std Rust renderer that interprets DrawLists, batches A8 coverage and hands FILL, BLEND and SRM transactions to the PPA with an ordered RGB565 software fallback — contributed by @HalfSweet and hardware-verified on a Tab5 at 1280×720. And Pocket Pi runs the complete Pi coding agent on the chip: QuickJS in a 304 KB profile, with files, schedules and hot-pluggable apps on board.",
  ],
  hero: {
    src: hero,
    alt: "Close-up of an Espressif ESP32-P4 SoC on a small development board",
    width: 1600,
    height: 1469,
    fit: "cover",
    credit: {
      author: "Pathfinbird",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "Wikimedia Commons \u00b7 Espressif ESP32-P4.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Espressif_ESP32-P4.jpg",
      note: "The SoC on a development board; no M5Stack Tab5 photo is available under a free licence.",
    },
  },
  gallery: [
    {
      src: shotPi,
      alt: "Four screens of Pocket Pi's embedded device UI on the ESP32-P4",
      caption: "Pocket Pi on the ESP32-P4: chat, schedules, the LittleFS workspace and a file viewer, with live PSRAM, UI FPS and LCD telemetry.",
      upstreamPath: "site/assets/blog/pocket-pi-esp32-hero.png",
    },
    {
      src: shotHotplug,
      alt: "Three Pocket Pi simulator states: empty catalog, package review, app installed at runtime",
      caption: "A `.pocketapp` arriving over the network or UART, reviewed and activated while Pocket Pi is running.",
      upstreamPath: "site/assets/blog/pocket-pi-hotplug-install-flow.png",
    },
  ],
  headline: { cpu: "RISC-V ×2 · 400 MHz", memory: "768 KB + 32 MB PSRAM", display: "1280 × 720 (Tab5)" },
  hardware: [
    {
      title: "ESP32-P4 SoC",
      items: [
        { label: "CPU", value: "Dual-core 32-bit RISC-V HP system, up to 400 MHz (360 MHz on the Tab5's ESP32-P4NRW32)", note: "plus a single-core 40 MHz LP RISC-V" },
        { label: "SRAM", value: "768 KB on-chip L2 + 8 KB TCM; 32 MB octal PSRAM in-package on the Tab5" },
        { label: "Graphics", value: "Pixel Processing Accelerator (fill, blend, scale-rotate-mirror), 2D-DMA, MIPI-DSI 2-lane, MIPI-CSI, H.264 encoder" },
        { label: "Wireless", value: "None on-chip; Tab5 pairs an ESP32-C6-MINI-1U for Wi-Fi 6 / BLE / Thread" },
      ],
    },
    {
      title: "M5Stack Tab5 (reference board)",
      items: [
        { label: "Display", value: "5″ IPS TFT, 1280 × 720, MIPI-DSI, capacitive touch (GT911 / ST7123 / ST7121)" },
        { label: "Memory", value: "16 MB flash, 32 MB PSRAM, microSD" },
        { label: "Camera", value: "SC2356 2 MP over MIPI-CSI" },
        { label: "Audio", value: "ES8388 codec, ES7210 AEC with dual microphones, 1 W speaker, 3.5 mm" },
        { label: "I/O", value: "USB-C OTG, USB-A host, RS-485, Grove, M5-Bus; BMI270 IMU; RX8130CE RTC" },
        { label: "Power", value: "NP-F550 7.4 V 2000 mAh (Kit); about 6 hours" },
        { label: "Body", value: "128 × 80 × 12 mm, 118 g; released 9 May 2025" },
      ],
    },
  ],
  pocket: {
    path: "native",
    status: "integration",
    targetId: "esp32p4 (renderer integration)",
    hostDir: "hosts/esp32p4",
    summary:
      "`hosts/esp32p4/components/pocketjs_ppa` is the reusable ESP-IDF half: it registers one client each for FILL, BLEND and SRM and executes blocking transactions, while the product BSP owns display initialisation, presentation buffers and vblank scheduling. The Rust crate is enabled with its `esp-idf` feature and driven by one `EspIdfPpaOps` on the rendering task. The adapter is build-tested with ESP-IDF release/v6.0 and v6.1; it is a backend, not a stock application target.",
    evidence:
      "Reusable RGB565/PPA backend with a strip-equals-full parity suite and an ESP-IDF component smoke build; hardware-verified on an M5Stack Tab5 at 1280×720. Pocket Pi ships the QuickJS guest on the chip in a separate repository.",
    docs: [
      { path: "hosts/esp32p4/README.md", label: "ESP32-P4 host", summary: "Add the ESP-IDF component, enable the Rust adapter, the buffer contract, the smoke build." },
      { path: "engine/backends/esp32p4-ppa/README.md", label: "PPA backend crate", summary: "The no_std renderer: what the hardware does, what the software fallback does." },
      { path: "hosts/esp32p4/examples/data-smoke/README.md", label: "data-smoke example", summary: "The db/fs modules exercised on the chip." },
      { path: "docs/BACKENDS.md", label: "Render backends", summary: "Where the PPA path sits among the portable backends." },
    ],
    code: [
      { path: "hosts/esp32p4/examples/data-smoke/src/main.rs", label: "data-smoke/main.rs", summary: "A Rust ESP-IDF example against the engine crates." },
      { path: "hosts/esp32p4/examples/ppa-smoke/CMakeLists.txt", label: "ppa-smoke/CMakeLists.txt", summary: "The component wiring the smoke build verifies." },
    ],
    stories: ["pocket-pi-on-esp32-p4", "pocket-pi-agent-native-runtime", "agent-native-runtime-embedded-systems"],
    milestones: [
      { date: "2026-08-05", release: "0.8.0", text: "ESP32-P4, rendered by damage: RGB565 raster path and hybrid PPA backend, hardware-verified on an M5Stack Tab5 at 1280×720." },
      { date: "2026-08-06", text: "Pocket Pi ports the Pi coding agent to the ESP32-P4 — QuickJS in a 304 KB profile." },
      { date: "2026-08-15", text: "Hot-pluggable .pocketapp packages arrive over the network or UART on a running Pocket Pi." },
    ],
  },
  sources: [
    { label: "ESP32-P4 — Espressif", url: "https://www.espressif.com/en/products/socs/esp32-p4" },
    { label: "M5Stack Tab5 — documentation", url: "https://docs.m5stack.com/en/core/Tab5" },
  ],
};
