import type { Device } from "../types";
import hero from "@/assets/devices/meowbit.webp";

export const meowbit: Device = {
  slug: "meowbit",
  name: "ESP32 MeowBit (Xueersi / KittenBot)",
  shortName: "ESP32 MeowBit",
  maker: "Xueersi · KittenBot",
  year: "2019",
  sortYear: 2019,
  family: "mcu",
  collection: "permanent",
  tagline: "The fourth Pocket Vapor target, verified on the physical board over UART.",
  plaque: [
    "The MeowBit is a card-sized educational handheld from KittenBot — a 1.8-inch 160×128 ST7735 TFT, six buttons, a microSD slot and a sensor set — sold in China as Xueersi's 小喵掌机. The ESP32 revision carries an ESP32-WROVER-B module: two Xtensa LX6 cores at 240 MHz, 520 KB of SRAM, 8 MB of PSRAM and 4 MB of flash, with a GD32F350 co-processor bridging USB serial.",
    "It is Pocket Vapor's first board-as-data target: pins, panel and pad coverage live in `vapor/boards/meowbit.json`, and the compiler derives what the app demands and judges the board against it. A USB verifier replays the shared Vue-oracle tape against the physical board and compares all 360 logical cells after every press.",
  ],
  hero: {
    src: hero,
    alt: "A KittenBot Meowbit handheld on a grey surface",
    width: 1261,
    height: 1600,
    fit: "cover",
    credit: {
      author: "Xnou",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "Wikimedia Commons \u00b7 Kittenbot meowbit.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kittenbot_meowbit.jpg",
      note: "A KittenBot Meowbit is pictured; the Xueersi ESP32 revision shares the form factor.",
    },
  },
  gallery: [],
  headline: { cpu: "ESP32-D0WD · 2 × 240 MHz", memory: "520 KB SRAM + 8 MB PSRAM", display: "160 × 128 TFT" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "Module", value: "ESP32-WROVER-B (ESP32-D0WD)" },
        { label: "CPU", value: "Dual-core Xtensa LX6, 240 MHz" },
        { label: "RAM", value: "520 KB SRAM + 8 MB PSRAM" },
        { label: "Flash", value: "4 MB SPI flash" },
        { label: "Co-processor", value: "GD32F350G8 — USB serial bridge, motor and LED control" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "1.8″ TFT, 160 × 128, ST7735 over SPI (write-only in the Vapor runtime)" },
        { label: "Pocket grid", value: "20 × 18 cells of 8 × 7 px — 160 × 126 content area" },
        { label: "Input", value: "Up, Down, Left, Right, A, B (active low; GPIO34/35 with external pull-ups)" },
        { label: "Chords", value: "A+B → Start, Left+Right → Select, Up+Down → R; L is absent" },
        { label: "Sensors", value: "MPU6050 IMU, light sensor, thermistor, passive buzzer" },
      ],
    },
    {
      title: "Connectivity & body",
      items: [
        { label: "Wireless", value: "Wi-Fi 802.11b/g/n, Bluetooth 4.2 (ESP32)" },
        { label: "Ports", value: "USB serial via the GD32, microSD, micro:bit-style edge connector" },
        { label: "Released", value: "Meowbit 2019; the ESP32 revision followed for the Xueersi programme" },
      ],
    },
  ],
  pocket: {
    path: "aot",
    status: "aot",
    targetId: "esp32 · board meowbit (Pocket Vapor)",
    hostDir: "vapor/runtime/esp32",
    summary:
      "`bun run vapor:esp32` compiles the same todo component to C, generates an ESP-IDF v6.0.2 project in `dist/vapor/gen-esp32/` from the board definitions, and produces an app-only `todo.esp32.bin`. The runtime rasterizes the 20×18 logical grid into RGB565 cells on the ST7735, latches button chords on release, and speaks a line-oriented receipt protocol over UART at 115200 baud: `H` for the hardware receipt, `P <n>` to press a button, `D` to dump the grid.",
    evidence:
      "Optional physical-board UART replay verifies the logical grid against the Vue oracle — 32 full-grid receipts, 23,040 cell comparisons, firmware identity hash-checked. It neither reads panel pixels nor actuates the GPIO buttons; those remain manual checks.",
    docs: [
      { path: "vapor/runtime/esp32/README.md", label: "ESP32 runtime", summary: "Board profile, chords, build/flash/verify with ESP-IDF, the UART receipt protocol." },
      { path: "vapor/BOARDS.md", label: "Boards", summary: "Boards as data: the AOT admission rule and how the family scales." },
      { path: "vapor/README.md", label: "Pocket Vapor", summary: "The compiler, the oracle and every target." },
    ],
    code: [
      { path: "vapor/boards/meowbit.json", label: "boards/meowbit.json", summary: "The devicetree of the board: panel, pins, pad coverage." },
      { path: "vapor/examples/todo/todo.tsx", label: "todo.tsx", summary: "The portable TodoMVC component, unchanged." },
    ],
    stories: ["pocket-vapor"],
    milestones: [
      { date: "2026-07-23", release: "0.7.0", text: "ESP32 MeowBit becomes the fourth Pocket Vapor target, with boards-as-data and a physical USB verifier." },
    ],
  },
  sources: [
    { label: "ZyoungInc/xueersi-idf — hardware notes for the Xueersi ESP32 handheld", url: "https://github.com/ZyoungInc/xueersi-idf" },
    { label: "KittenBot Meowbit documentation", url: "https://learn.kittenbot.cc/docs/meowbit/" },
  ],
};
