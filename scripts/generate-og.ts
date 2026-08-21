import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { createServer } from "vite";
import type { Device } from "../src/data/types";
import type { OgAccent, OgCard, SeoPage } from "../src/lib/seo";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputDir = path.join(root, "public/og");
const fontDir = path.join(root, "scripts/assets/fonts");
const fontFiles = [
  path.join(fontDir, "SpaceGrotesk-Variable.ttf"),
  path.join(fontDir, "IBMPlexMono-Regular.otf"),
  path.join(fontDir, "IBMPlexMono-SemiBold.otf"),
];

const WIDTH = 1200;
const HEIGHT = 630;

const colors = {
  bg: "#0a0d12",
  panel: "#11161f",
  line: "#1e2735",
  line2: "#2a3648",
  ink: "#e8eef7",
  ink2: "#a7b4c8",
  muted: "#76839a",
  cyan: "#67e8f9",
  amber: "#fbbf24",
  green: "#4ade80",
} as const;

interface SeoRuntimeModule {
  allSeoPages(devices: readonly Device[]): SeoPage[];
  ogCardPath(card: OgCard): string;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character] ?? character;
  });
}

function glyphUnits(value: string): number {
  let units = 0;
  for (const character of value) {
    if (/\s/.test(character)) units += 0.5;
    else if (/[MW@#%&]/.test(character)) units += 1.25;
    else if (/[ilI1'.,:;|!]/.test(character)) units += 0.55;
    else if (character.codePointAt(0)! > 0xff) units += 1.05;
    else units += 1;
  }
  return units;
}

function estimatedWidth(value: string, fontSize: number, mono = false): number {
  return glyphUnits(value) * fontSize * (mono ? 0.61 : 0.56);
}

function wrapText(value: string, maxWidth: number, fontSize: number, maxLines: number, label: string, mono = false): string[] {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    if (estimatedWidth(word, fontSize, mono) > maxWidth) {
      throw new Error(`${label} contains a word wider than its card column: ${word}`);
    }
    const candidate = line ? `${line} ${word}` : word;
    if (estimatedWidth(candidate, fontSize, mono) <= maxWidth) {
      line = candidate;
      continue;
    }
    lines.push(line);
    line = word;
  }

  if (line) lines.push(line);
  if (lines.length > maxLines) {
    throw new Error(`${label} needs ${lines.length} lines; the card allows ${maxLines}: ${value}`);
  }
  return lines;
}

function textLines(
  lines: readonly string[],
  options: {
    x: number;
    y: number;
    fontSize: number;
    lineHeight: number;
    family: "sans" | "mono";
    weight: number;
    fill: string;
    letterSpacing?: number;
  },
): string {
  const family = options.family === "mono" ? "IBM Plex Mono" : "Space Grotesk";
  const spans = lines
    .map(
      (line, index) =>
        `<tspan x="${options.x}" dy="${index === 0 ? 0 : options.lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  return `<text x="${options.x}" y="${options.y}" fill="${options.fill}" font-family="${family}" font-size="${options.fontSize}" font-weight="${options.weight}"${options.letterSpacing ? ` letter-spacing="${options.letterSpacing}"` : ""}>${spans}</text>`;
}

function accentColor(accent: OgAccent): string {
  return colors[accent];
}

function renderCardSvg(card: OgCard): string {
  const accent = accentColor(card.accent);
  const titleSize = card.title.length > 30 ? 60 : card.title.length > 22 ? 66 : 72;
  const titleLineHeight = Math.round(titleSize * 1.08);
  const titleLines = wrapText(card.title, 1048, titleSize, 2, `${card.id} title`);
  const descriptionLines = wrapText(card.description, 1010, 25, 2, `${card.id} description`);
  const descriptionY = 229 + (titleLines.length - 1) * titleLineHeight + 55;

  const statColumns = card.stats
    .map((stat, index) => {
      const x = 72 + index * 365;
      const valueLines = wrapText(stat.value, 315, 19, 2, `${card.id} ${stat.label}`, true);
      return `
        <text x="${x}" y="500" fill="${colors.muted}" font-family="IBM Plex Mono" font-size="13" font-weight="600" letter-spacing="1.8">${escapeXml(stat.label.toUpperCase())}</text>
        ${textLines(valueLines, { x, y: 535, fontSize: 19, lineHeight: 25, family: "mono", weight: 500, fill: colors.ink })}`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <title>${escapeXml(card.title)}</title>
    <desc>${escapeXml(card.description)}</desc>
    <defs>
      <pattern id="bench-grid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M 56 0 L 0 0 0 56" fill="none" stroke="${colors.cyan}" stroke-opacity="0.055" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="${colors.bg}"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bench-grid)"/>
    <rect x="38" y="38" width="1124" height="554" fill="none" stroke="${colors.line2}" stroke-width="2"/>
    <path d="M 38 38 H 282" stroke="${accent}" stroke-width="3"/>
    <path d="M 38 592 H 156" stroke="${accent}" stroke-width="3"/>

    <text x="72" y="91" font-family="IBM Plex Mono" font-size="20" font-weight="600" letter-spacing="1.2">
      <tspan fill="${accent}">[</tspan><tspan fill="${colors.ink}"> POCKET MUSEUM </tspan><tspan fill="${accent}">]</tspan>
    </text>
    <text x="1128" y="90" text-anchor="end" fill="${colors.muted}" font-family="IBM Plex Mono" font-size="15" font-weight="400" letter-spacing="1">museum.pocketlab.build</text>

    <text x="72" y="153" fill="${accent}" font-family="IBM Plex Mono" font-size="16" font-weight="500" letter-spacing="1.7">${escapeXml(card.eyebrow.toUpperCase())}</text>
    <circle cx="853" cy="148" r="4" fill="${accent}"/>
    <text x="1128" y="153" text-anchor="end" fill="${colors.ink2}" font-family="IBM Plex Mono" font-size="15" font-weight="500" letter-spacing="1">${escapeXml(card.badge.toUpperCase())}</text>

    ${textLines(titleLines, { x: 72, y: 229, fontSize: titleSize, lineHeight: titleLineHeight, family: "sans", weight: 700, fill: colors.ink })}
    ${textLines(descriptionLines, { x: 72, y: descriptionY, fontSize: 25, lineHeight: 34, family: "sans", weight: 400, fill: colors.ink2 })}

    <rect x="39" y="463" width="1122" height="128" fill="${colors.panel}"/>
    <path d="M 39 463 H 1161" stroke="${colors.line2}" stroke-width="1"/>
    <path d="M 413 482 V 570 M 778 482 V 570" stroke="${colors.line2}" stroke-width="1" stroke-dasharray="4 7"/>
    ${statColumns}
  </svg>`;
}

function renderPng(card: OgCard): Buffer {
  const renderer = new Resvg(renderCardSvg(card), {
    fitTo: { mode: "original" },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: "Space Grotesk",
      sansSerifFamily: "Space Grotesk",
      monospaceFamily: "IBM Plex Mono",
    },
    shapeRendering: 2,
    textRendering: 2,
  });
  const rendered = renderer.render();
  if (rendered.width !== WIDTH || rendered.height !== HEIGHT) {
    throw new Error(`${card.id} rendered at ${rendered.width}×${rendered.height}, expected ${WIDTH}×${HEIGHT}`);
  }
  return rendered.asPng();
}

async function loadSeoPages(): Promise<{ pages: SeoPage[]; ogCardPath: SeoRuntimeModule["ogCardPath"] }> {
  const server = await createServer({
    root,
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true, hmr: false },
  });
  try {
    const [{ devices }, seo] = await Promise.all([
      server.ssrLoadModule("/src/data/devices.ts") as Promise<{ devices: readonly Device[] }>,
      server.ssrLoadModule("/src/lib/seo.ts") as Promise<SeoRuntimeModule>,
    ]);
    return { pages: seo.allSeoPages(devices), ogCardPath: seo.ogCardPath };
  } finally {
    await server.close();
  }
}

async function main(): Promise<void> {
  const { pages, ogCardPath } = await loadSeoPages();
  const expectedCount = pages.length;
  const uniqueIds = new Set(pages.map((page) => page.card.id));
  if (uniqueIds.size !== expectedCount) throw new Error("OG card ids must be unique");

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  for (const page of pages) {
    const publicPath = ogCardPath(page.card);
    if (!publicPath.startsWith("/og/") || !publicPath.endsWith(".png")) {
      throw new Error(`Invalid OG output path: ${publicPath}`);
    }
    await writeFile(path.join(root, "public", publicPath.slice(1)), renderPng(page.card));
  }

  process.stdout.write(`Generated ${expectedCount} OG cards in public/og\n`);
}

await main();
