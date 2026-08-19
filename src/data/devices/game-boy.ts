import type { Device } from "../types";
import hero from "@/assets/devices/game-boy.webp";
import shotBoot from "@upstream/site/assets/blog/vapor-gb-boot.png";
import shotEdit from "@upstream/site/assets/blog/vapor-gb-edit.png";
import shotAdded from "@upstream/site/assets/blog/vapor-gb-added.png";

export const gameBoy: Device = {
  slug: "game-boy",
  name: "Nintendo Game Boy",
  shortName: "Game Boy",
  maker: "Nintendo",
  year: "1989",
  sortYear: 1989,
  family: "handheld-console",
  collection: "permanent",
  tagline: "Reactive Vue on an 8-bit SM83 at 4 MHz, in a 32 KB cart.",
  plaque: [
    "The original Game Boy ran a Sharp LR35902 — an 8-bit SM83 core at 4.19 MHz — with 8 KB of work RAM and 8 KB of video RAM behind a 160×144 four-shade STN screen. It launched in April 1989 and, with the Color, sold 118 million units.",
    "The Pocket Vapor Game Boy build compiles the same Vue component with sdcc into a 32 KB cartridge. The DMG has one palette, so logical palettes lower to two glyph styles by luminance; sdcc 4.6's SM83 port miscompiles some 8-bit multiplies, so generated indexing is 16-bit pointer arithmetic and bit masks come from a ROM table. A 1 MHz-class CPU trickling VRAM through vblank still answers every button press in lockstep with the oracle.",
  ],
  hero: {
    src: hero,
    alt: "An original Nintendo Game Boy DMG-01, front-left view",
    width: 1328,
    height: 1600,
    fit: "contain",
    credit: {
      author: "Evan-Amos",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-self",
      source: "Wikimedia Commons \u00b7 Game-Boy-FL.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Game-Boy-FL.jpg",
    },
  },
  gallery: [
    {
      src: shotBoot,
      alt: "The Pocket Vapor todo app booting on a Game Boy",
      caption: "Boot on the DMG: a 20×18 grid, two glyph styles by luminance.",
      upstreamPath: "site/assets/blog/vapor-gb-boot.png",
    },
    {
      src: shotEdit,
      alt: "The todo app in edit mode on a Game Boy",
      caption: "Edit mode: the narrow help strings cost zero bytes on GBA because `SCREEN` folds per target.",
      upstreamPath: "site/assets/blog/vapor-gb-edit.png",
    },
    {
      src: shotAdded,
      alt: "A new todo added on a Game Boy",
      caption: "After Start: the same pool compaction, compiled for an 8-bit core.",
      upstreamPath: "site/assets/blog/vapor-gb-added.png",
    },
  ],
  headline: { cpu: "Sharp SM83 · 4.19 MHz", memory: "8 KB + 8 KB VRAM", display: "160 × 144" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "Sharp LR35902 (SM83 core, 8-bit), 4.194 MHz" },
        { label: "RAM", value: "8 KB work RAM" },
        { label: "Video RAM", value: "8 KB VRAM, 160 B OAM" },
        { label: "Cartridge", value: "32 KB ROM without a mapper; up to 8 MB with MBC bank switching" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Display", value: "2.6″ STN LCD, 160 × 144, 4 shades of grey-green" },
        { label: "Input", value: "D-pad, A, B, Start, Select" },
        { label: "Audio", value: "Two pulse channels, one wave channel, one noise channel; mono speaker, stereo on the jack" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Power", value: "4 × AA, 15–30 hours" },
        { label: "Dimensions", value: "148 × 90 × 32 mm" },
        { label: "Weight", value: "220 g without batteries" },
        { label: "Released", value: "21 April 1989 (Japan) · 31 July 1989 (North America)" },
      ],
    },
  ],
  pocket: {
    path: "aot",
    status: "aot",
    targetId: "gb (Pocket Vapor)",
    hostDir: "vapor/runtime/gb",
    summary:
      "`bun vapor/compiler/cli.ts vapor/examples/todo/todo.tsx --target gb` emits C for sdcc and fixes the header with rgbfix into a 32 KB `todo.gb`. The logical screen is 20×18 cells; the shadow grid lives at a fixed WRAM address so the harness can read the screen even while the SM83 trickles VRAM through vblank.",
    evidence:
      "Per-interaction emulator parity against the Vue oracle (headless libmgba), comparing logical characters and styles after every press.",
    docs: [
      { path: "vapor/README.md", label: "Pocket Vapor", summary: "The compiler, the oracle, the three cartridges, the commands and toolchains." },
      { path: "vapor/DESIGN.md", label: "Design", summary: "The thesis, the Vue Vapor subset, target and style contracts." },
    ],
    code: [
      { path: "vapor/examples/todo/todo.tsx", label: "todo.tsx", summary: "The portable TodoMVC component." },
    ],
    stories: ["pocket-vapor"],
    milestones: [
      { date: "2026-07-23", release: "0.7.0", text: "Pocket Vapor ships with a 32 KB Game Boy cart among its first three targets." },
      { date: "2026-08-16", release: "0.10.1", text: "Overlay slots reduce permanent RAM and stack pressure on the Game Boy and NES." },
    ],
  },
  sources: [
    { label: "Game Boy — Wikipedia", url: "https://en.wikipedia.org/wiki/Game_Boy" },
  ],
};
