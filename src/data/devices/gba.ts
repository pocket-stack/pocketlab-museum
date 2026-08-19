import type { Device } from "../types";
import hero from "@/assets/devices/gba.webp";
import shotBoot from "@upstream/site/assets/blog/vapor-gba-boot.png";
import shotEdit from "@upstream/site/assets/blog/vapor-gba-edit.png";
import shotAdded from "@upstream/site/assets/blog/vapor-gba-added.png";

export const gba: Device = {
  slug: "gba",
  name: "Nintendo Game Boy Advance",
  shortName: "Game Boy Advance",
  maker: "Nintendo",
  year: "2001",
  sortYear: 2001,
  family: "handheld-console",
  collection: "permanent",
  tagline: "A Vue component compiled to a 9.1 KB cartridge. No JavaScript engine on board.",
  plaque: [
    "The Game Boy Advance put a 16.78 MHz ARM7TDMI, 32 KB of fast internal RAM plus 256 KB of external work RAM, and a 240×160 reflective TFT with 32,768 colours into a landscape shell. It shipped in March 2001 and sold over 81 million units.",
    "Pocket Vapor lowers a strict Vue Vapor TodoMVC — real `ref`/`computed`, real JSX — into C for arm-none-eabi-gcc: every ref is a dirty bit, every dependency edge a bitmask baked into ROM, every byte of RAM planned at compile time. The whole cartridge is 9.1 KB, and the parity suite checks the emulated screen grid cell-for-cell against real Vue after every button press.",
  ],
  hero: {
    src: hero,
    alt: "An indigo Game Boy Advance, front-left view",
    width: 1600,
    height: 1049,
    fit: "contain",
    credit: {
      author: "Evan-Amos",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-self",
      source: "Wikimedia Commons \u00b7 Nintendo-Game-Boy-Advance-Purple-FL.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nintendo-Game-Boy-Advance-Purple-FL.jpg",
    },
  },
  gallery: [
    {
      src: shotBoot,
      alt: "The Pocket Vapor todo app booting on a Game Boy Advance",
      caption: "Boot: the emerald title bar is `class=\"bg-emerald-500 text-slate-950 align-center\"`, lowered to a GBA palette bank.",
      upstreamPath: "site/assets/blog/vapor-gba-boot.png",
    },
    {
      src: shotEdit,
      alt: "The todo app in edit mode with the amber editor bar",
      caption: "Edit mode: a reactive string ref being edited with the d-pad.",
      upstreamPath: "site/assets/blog/vapor-gba-edit.png",
    },
    {
      src: shotAdded,
      alt: "A new todo added to the list on the Game Boy Advance",
      caption: "After Start: the new item is in the pool, the remaining count is a computed.",
      upstreamPath: "site/assets/blog/vapor-gba-added.png",
    },
  ],
  headline: { cpu: "ARM7TDMI · 16.78 MHz", memory: "32 KB + 256 KB", display: "240 × 160" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "ARM7TDMI, 32-bit RISC, 16.78 MHz", note: "plus a Sharp SM83-compatible 8-bit core for Game Boy / Color cartridges" },
        { label: "RAM", value: "32 KB internal work RAM (IWRAM) + 256 KB external work RAM (EWRAM)" },
        { label: "Video RAM", value: "96 KB VRAM, 1 KB OAM, 1 KB palette RAM" },
        { label: "Cartridge", value: "ROM up to 32 MB, optional SRAM / Flash / EEPROM saves" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "2.9″ reflective TFT, 240 × 160, 15-bit colour (32,768), 512 on screen in tile modes" },
        { label: "Input", value: "D-pad, A, B, L, R, Start, Select" },
        { label: "Audio", value: "Two 8-bit PCM channels + the four Game Boy channels; mono speaker" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Power", value: "2 × AA, about 15 hours" },
        { label: "Dimensions", value: "144.5 × 82 × 24.5 mm" },
        { label: "Weight", value: "140 g" },
        { label: "Released", value: "21 March 2001 (Japan) · 11 June 2001 (North America)" },
      ],
    },
  ],
  pocket: {
    path: "aot",
    status: "aot",
    targetId: "gba (Pocket Vapor)",
    hostDir: "vapor/runtime/gba",
    summary:
      "`bun vapor/compiler/cli.ts vapor/examples/todo/todo.tsx` compiles the component to C and links it against `vapor/runtime/gba` with arm-none-eabi-gcc into `dist/vapor/todo.gba`. The logical screen is a 30×20 character grid; Tailwind class names lower into real palette banks (rgb555). The console shadow grid is the debug block at a fixed WRAM address, so the harness reads the logical screen from the emulator.",
    evidence:
      "Per-interaction emulator parity against the Vue oracle (headless libmgba), comparing logical characters and styles after every press.",
    docs: [
      { path: "vapor/README.md", label: "Pocket Vapor", summary: "The compiler, the oracle, the three cartridges, the commands and toolchains." },
      { path: "vapor/DESIGN.md", label: "Design", summary: "The thesis, the Vue Vapor subset, target and style contracts." },
      { path: "vapor/BOARDS.md", label: "Boards", summary: "How guest and AOT admission differ, and why MCU boards are data files." },
    ],
    code: [
      { path: "vapor/examples/todo/todo.tsx", label: "todo.tsx", summary: "The portable TodoMVC component: refs, computeds, keymaps, semantic components." },
    ],
    stories: ["pocket-vapor"],
    milestones: [
      { date: "2026-07-23", release: "0.7.0", text: "Pocket Vapor ships: one TodoMVC component becomes .gba, .gb and .nes carts, proven cell-identical against vue@3.6." },
      { date: "2026-08-16", release: "0.10.1", text: "Sparse conditional constant propagation and overlay slots shrink the reactive graph and permanent RAM." },
    ],
  },
  sources: [
    { label: "Game Boy Advance — Wikipedia", url: "https://en.wikipedia.org/wiki/Game_Boy_Advance" },
  ],
};
