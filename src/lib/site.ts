// src/lib/site.ts — site-wide constants shared by head tags, header and footer.

export const SITE = {
  name: "The Pocket Museum",
  shortName: "Pocket Museum",
  url: "https://museum.pocketlab.build",
  language: "en",
  locale: "en_US",
  description:
    "Every machine PocketJS runs on — consoles, phones, e-readers and microcontrollers from 1983 to today — with hardware specifications, the upstream bring-up documents and example code.",
  lab: { name: "Pocket Lab", url: "https://pocketlab.build" },
  pocketjs: { name: "pocketjs.dev", url: "https://pocketjs.dev" },
  github: { name: "pocket-stack", url: "https://github.com/pocket-stack" },
  repo: { name: "pocketlab-museum", url: "https://github.com/pocket-stack/pocketlab-museum" },
  discord: "https://discord.gg/cTce4eXzSK",
  x: "https://x.com/pocket_js",
  year: 2026,
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE.url}/`).toString();
}

/** The public host serves nested static pages with a trailing slash. */
export function pagePath(path: string): string {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash === "/") return "/";
  return `${withLeadingSlash.replace(/\/+$/, "")}/`;
}

export function devicePath(slug: string): string {
  return pagePath(`/devices/${slug}`);
}
