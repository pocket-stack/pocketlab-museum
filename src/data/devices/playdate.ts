import type { Device } from "../types";
import hero from "@/assets/devices/playdate.webp";

export const playdate: Device = {
  slug: "playdate",
  name: "Panic Playdate",
  shortName: "Playdate",
  maker: "Panic",
  year: "2022",
  sortYear: 2022,
  family: "handheld-console",
  collection: "permanent",
  tagline: "The crank as a hardware-neutral relative axis. The fifth Pocket Vapor target.",
  plaque: [
    "Panic's Playdate is a small yellow handheld with a 400×240 one-bit Sharp Memory LCD, a 168 MHz Cortex-M7, 16 MB of RAM and a fold-out crank. It shipped in April 2022 with a season of games and an SDK for Lua and C.",
    "Pocket Vapor maps a 50×30 logical grid byte-for-cell into the SDK's 52-byte-stride framebuffer and packages `.pdx` bundles for the Simulator and for the device. The crank arrives through the `RelativeAxis.Primary` contract as signed millidegrees: the runtime never picks a detent, the todo app chooses 45° itself — so the app code names no Playdate API.",
  ],
  hero: {
    src: hero,
    alt: "A yellow Panic Playdate, three-quarter view with the crank extended",
    width: 1600,
    height: 852,
    fit: "contain",
    credit: {
      author: "Louie Mantia (Louiemantia)",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "Wikimedia Commons \u00b7 Playdate with crank.png",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Playdate_with_crank.png",
    },
  },
  gallery: [],
  headline: { cpu: "Cortex-M7 · 168 MHz", memory: "16 MB", display: "400 × 240 · 1-bit" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "ARM Cortex-M7, 168 MHz (STM32F746; STM32H7B0 on later revisions)" },
        { label: "RAM", value: "16 MB SDRAM, 8 KB L1 cache" },
        { label: "Storage", value: "4 GB flash" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "2.7″ Sharp Memory LCD, 400 × 240, 1-bit monochrome, 173 ppi, no backlight" },
        { label: "Pocket grid", value: "50 × 30 cells, 1 byte per cell into the 52-byte-stride framebuffer" },
        { label: "Input", value: "D-pad, A, B, Menu, Lock; the crank; 3-axis accelerometer" },
        { label: "Audio", value: "Mono speaker, stereo headphone jack, condenser mic + TRRS mic in" },
      ],
    },
    {
      title: "Connectivity & body",
      items: [
        { label: "Wireless", value: "Wi-Fi 802.11b/g/n 2.4 GHz; Bluetooth (hardware present, unused)" },
        { label: "Ports", value: "USB-C" },
        { label: "Battery", value: "About 8 hours active, 14 days standby" },
        { label: "Dimensions", value: "76 × 74 × 9 mm" },
        { label: "Released", value: "18 April 2022" },
      ],
    },
  ],
  pocket: {
    path: "aot",
    status: "aot",
    targetId: "playdate (Pocket Vapor)",
    hostDir: "vapor/runtime/playdate",
    summary:
      "`bun vapor/compiler/cli.ts vapor/examples/todo/todo.playdate.tsx --target playdate --playdate-mode simulator|device` resolves the Playdate SDK, links `gen_app.c` and `vapor_core.c` into a Playdate C application and emits independent Simulator and device `.pdx` packages. The runtime writes the raw 1-bpp framebuffer directly, samples `getCrankChange()` into signed millidegrees with sub-millidegree carry, and drains docked or lifecycle-reset motion so it cannot reappear as a ghost event. Receipts (`PVREADY`, `PVFRAME`, `PVINPUT`, `PVERROR`) go to the console.",
    evidence:
      "Native-boundary tests and Simulator/device package smoke; a checked-in fake-framebuffer test verifies byte layout. Physical display polarity and crank feel remain a manual acceptance checklist.",
    docs: [
      { path: "vapor/runtime/playdate/README.md", label: "Playdate runtime", summary: "Prerequisites, build, framebuffer contract, crank axis, manual acceptance checklist." },
      { path: "vapor/README.md", label: "Pocket Vapor", summary: "The compiler, the oracle and every target." },
      { path: "vapor/DESIGN.md", label: "Design", summary: "§5: incremental input through RelativeAxis, never device SDK concepts in app code." },
    ],
    code: [
      { path: "vapor/examples/todo/todo.playdate.tsx", label: "todo.playdate.tsx", summary: "The crank-driven input variant: onAxisDelta with a 45° detent chosen by the app." },
    ],
    stories: [],
    milestones: [
      { date: "2026-08-05", release: "0.8.0", text: "Playdate is the fifth Pocket Vapor target: 400×240 as a 50×30 grid, .pdx packaging, the crank through RelativeAxis." },
    ],
  },
  sources: [
    { label: "The Specs — Playdate Help", url: "https://help.play.date/hardware/the-specs/" },
    { label: "Playdate (console) — Wikipedia", url: "https://en.wikipedia.org/wiki/Playdate_(console)" },
  ],
};
