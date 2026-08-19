import type { Device } from "../types";
import hero from "@/assets/devices/nes.webp";
import shotBoot from "@upstream/site/assets/blog/vapor-nes-boot.png";
import shotEdit from "@upstream/site/assets/blog/vapor-nes-edit.png";
import shotAdded from "@upstream/site/assets/blog/vapor-nes-added.png";

export const nes: Device = {
  slug: "nes",
  name: "Nintendo Entertainment System",
  shortName: "NES",
  maker: "Nintendo",
  year: "1983",
  sortYear: 1983,
  family: "home-console",
  collection: "permanent",
  tagline: "A 6502, 2 KB of RAM, and a reactive Vue program in a 40 KB cartridge.",
  plaque: [
    "The Famicom of 1983 — the NES outside Japan from 1985 — is a Ricoh 2A03 with a 6502 core at 1.79 MHz, 2 KB of CPU RAM, and a picture processor drawing 256×240 from character ROM on the cartridge. Nearly 62 million were sold.",
    "Pocket Vapor's NES build is the tightest of the three cartridges: grid, pools and computed views must all fit into 2 KB of CPU RAM, with the font in CHR-ROM. The compiler's memory plan says where every byte goes before cc65 ever sees the C; the parity suite replays the same tape through jsnes and compares the 22×18 cell grid after every press.",
  ],
  hero: {
    src: hero,
    alt: "A Nintendo Entertainment System NES-001 with a controller attached",
    width: 1600,
    height: 856,
    fit: "contain",
    credit: {
      author: "Evan-Amos",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-self",
      source: "Wikimedia Commons \u00b7 NES-Console-Set.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:NES-Console-Set.jpg",
    },
  },
  gallery: [
    {
      src: shotBoot,
      alt: "The Pocket Vapor todo app booting on a NES",
      caption: "Boot on the NES: a 22×18 grid drawn from CHR-ROM.",
      upstreamPath: "site/assets/blog/vapor-nes-boot.png",
    },
    {
      src: shotEdit,
      alt: "The todo app in edit mode on a NES",
      caption: "Edit mode with the glyph picker.",
      upstreamPath: "site/assets/blog/vapor-nes-edit.png",
    },
    {
      src: shotAdded,
      alt: "A new todo added on a NES",
      caption: "After Start: pools and views still inside 2 KB of CPU RAM.",
      upstreamPath: "site/assets/blog/vapor-nes-added.png",
    },
  ],
  headline: { cpu: "Ricoh 2A03 (6502) · 1.79 MHz", memory: "2 KB", display: "256 × 240" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "Ricoh 2A03 — MOS 6502 core without decimal mode, 1.79 MHz (NTSC) / 2A07 at 1.66 MHz (PAL)" },
        { label: "RAM", value: "2 KB CPU work RAM" },
        { label: "PPU", value: "Ricoh 2C02, 2 KB VRAM, 256 B OAM, 32 B palette RAM" },
        { label: "Cartridge", value: "PRG-ROM + CHR-ROM; 40 KB for the Pocket Vapor todo" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Output", value: "256 × 240 (NTSC shows about 256 × 224), 54-colour palette, 25 colours per scanline" },
        { label: "Input", value: "Two controllers: D-pad, A, B, Start, Select" },
        { label: "Audio", value: "Two pulse, one triangle, one noise, one DPCM channel" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Dimensions", value: "NES-001: 255 × 203 × 89 mm" },
        { label: "Released", value: "Famicom 15 July 1983 (Japan) · NES 18 October 1985 (North America)" },
      ],
    },
  ],
  pocket: {
    path: "aot",
    status: "aot",
    targetId: "nes (Pocket Vapor)",
    hostDir: "vapor/runtime/nes",
    summary:
      "`bun vapor/compiler/cli.ts vapor/examples/todo/todo.tsx --target nes` emits C for cc65 and links it against `vapor/runtime/nes` into a 40 KB `todo.nes`. The logical screen is 22×18 cells; the font sits in CHR-ROM and the shadow grid at a fixed CPU-RAM address for the harness.",
    evidence:
      "Per-interaction emulator parity against the Vue oracle (jsnes), comparing logical characters and styles after every press.",
    docs: [
      { path: "vapor/README.md", label: "Pocket Vapor", summary: "The compiler, the oracle, the three cartridges, the commands and toolchains." },
      { path: "vapor/DESIGN.md", label: "Design", summary: "The thesis, the Vue Vapor subset, target and style contracts." },
    ],
    code: [
      { path: "vapor/examples/todo/todo.tsx", label: "todo.tsx", summary: "The portable TodoMVC component." },
    ],
    stories: ["pocket-vapor"],
    milestones: [
      { date: "2026-07-23", release: "0.7.0", text: "Pocket Vapor ships with a 40 KB NES cart; grid, pool and views fit in 2 KB of CPU RAM." },
      { date: "2026-08-16", release: "0.10.1", text: "Overlay slots reduce permanent RAM and stack pressure on the NES and Game Boy." },
    ],
  },
  sources: [
    { label: "Nintendo Entertainment System — Wikipedia", url: "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System" },
  ],
};
