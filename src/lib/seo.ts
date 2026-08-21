import { useHead, useSeoMeta } from "@unhead/vue";
import { FAMILY_LABEL, PATH_SHORT, STATUS_LABEL } from "@/data/devices";
import type { Device } from "@/data/types";
import { SITE, absoluteUrl, devicePath, pagePath } from "@/lib/site";

export type OgAccent = "cyan" | "amber" | "green";

export interface OgCardStat {
  label: string;
  value: string;
}

export interface OgCard {
  /** Bump when the SVG template changes so social caches receive a new URL. */
  version: number;
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  accent: OgAccent;
  stats: readonly [OgCardStat, OgCardStat, OgCardStat];
}

export interface SeoPage {
  /** Undefined leaves the home page on the site-wide title template. */
  title?: string;
  socialTitle: string;
  description: string;
  path: string;
  imageAlt: string;
  card: OgCard;
}

export type JsonLd = Record<string, unknown>;

const OG_CARD_VERSION = 1;

const PATH_ACCENT: Record<Device["pocket"]["path"], OgAccent> = {
  guest: "cyan",
  aot: "amber",
  native: "green",
};

function hashString(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function ogCardPath(card: OgCard): string {
  const hash = hashString(JSON.stringify(card));
  return `/og/${card.id}-${hash}.png`;
}

function cardAlt(title: string): string {
  return `${title} — a typographic Pocket Museum card with the bracket mark, dark bench grid and exhibit details.`;
}

export function homeSeo(devices: readonly Device[]): SeoPage {
  const permanent = devices.filter((device) => device.collection === "permanent");
  const years = permanent.map((device) => device.sortYear);
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);
  const card: OgCard = {
    version: OG_CARD_VERSION,
    id: "home",
    eyebrow: "// pocketlab.build · permanent collection",
    title: SITE.name,
    description: "Modern software for any machine worth turning on.",
    badge: "museum index",
    accent: "cyan",
    stats: [
      { label: "collection", value: `${permanent.length} machines` },
      { label: "hardware", value: `${firstYear}–${lastYear}` },
      { label: "record", value: "upstream docs, verbatim" },
    ],
  };
  return {
    socialTitle: SITE.name,
    description: SITE.description,
    path: "/",
    imageAlt: cardAlt(SITE.name),
    card,
  };
}

export function catalogSeo(devices: readonly Device[]): SeoPage {
  const description =
    "Every machine in the Pocket Museum side by side: processor, memory, display, execution path and PocketJS status.";
  const families = new Set(devices.map((device) => device.family)).size;
  const paths = new Set(devices.map((device) => device.pocket.path)).size;
  const card: OgCard = {
    version: OG_CARD_VERSION,
    id: "catalog",
    eyebrow: "// catalogue · complete collection",
    title: "Compare every machine.",
    description,
    badge: "specification table",
    accent: "cyan",
    stats: [
      { label: "machines", value: String(devices.length) },
      { label: "families", value: String(families) },
      { label: "execution paths", value: String(paths) },
    ],
  };
  return {
    title: "Catalogue",
    socialTitle: `Catalogue · ${SITE.name}`,
    description,
    path: pagePath("/catalog"),
    imageAlt: cardAlt(`Catalogue · ${SITE.name}`),
    card,
  };
}

export function aboutSeo(devices: readonly Device[]): SeoPage {
  const description =
    "What the Pocket Museum is, where its content comes from, how to add an exhibit, and the credits for every photograph.";
  const card: OgCard = {
    version: OG_CARD_VERSION,
    id: "about",
    eyebrow: "// about · provenance and credits",
    title: "Two owners. One page.",
    description: "Hardware is curated here. Bring-up documents remain verbatim upstream.",
    badge: "open collection",
    accent: "cyan",
    stats: [
      { label: "hardware", value: "curated here" },
      { label: "bring-up", value: "owned upstream" },
      { label: "photo records", value: String(devices.length) },
    ],
  };
  return {
    title: "About & credits",
    socialTitle: `About & credits · ${SITE.name}`,
    description,
    path: pagePath("/about"),
    imageAlt: cardAlt(`About & credits · ${SITE.name}`),
    card,
  };
}

export function deviceSeo(device: Device): SeoPage {
  const description = `${device.name} in the Pocket Museum — ${device.tagline}`;
  const socialTitle = `${device.name} · ${SITE.name}`;
  const collectionLabel = device.collection === "permanent" ? "permanent collection" : "workbench";
  const card: OgCard = {
    version: OG_CARD_VERSION,
    id: `device-${device.slug}`,
    eyebrow: `// ${collectionLabel} · ${device.year} · ${FAMILY_LABEL[device.family]}`,
    title: device.name,
    description: device.tagline,
    badge: `${PATH_SHORT[device.pocket.path]} · ${STATUS_LABEL[device.pocket.status]}`,
    accent: PATH_ACCENT[device.pocket.path],
    stats: [
      { label: "processor", value: device.headline.cpu },
      { label: "memory", value: device.headline.memory },
      { label: "display", value: device.headline.display },
    ],
  };
  return {
    title: device.name,
    socialTitle,
    description,
    path: devicePath(device.slug),
    imageAlt: cardAlt(socialTitle),
    card,
  };
}

export function allSeoPages(devices: readonly Device[]): SeoPage[] {
  return [homeSeo(devices), catalogSeo(devices), aboutSeo(devices), ...devices.map(deviceSeo)];
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: {
      "@type": "Organization",
      name: SITE.lab.name,
      url: SITE.lab.url,
    },
  };
}

export function deviceBreadcrumbJsonLd(device: Device): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Catalogue", item: absoluteUrl(pagePath("/catalog")) },
      { "@type": "ListItem", position: 3, name: device.name, item: absoluteUrl(devicePath(device.slug)) },
    ],
  };
}

function jsonLdContent(value: JsonLd): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function usePageSeo(page: SeoPage, schemas: readonly JsonLd[] = []): void {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(ogCardPath(page.card));

  useSeoMeta({
    description: page.description,
    robots: "index,follow,max-image-preview:large",
    ogTitle: page.socialTitle,
    ogDescription: page.description,
    ogUrl: canonical,
    ogImage: image,
    ogImageType: "image/png",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: page.imageAlt,
    twitterTitle: page.socialTitle,
    twitterDescription: page.description,
    twitterImage: image,
    twitterImageAlt: page.imageAlt,
  });

  useHead({
    title: page.title,
    link: [{ rel: "canonical", href: canonical }],
    script: schemas.map((schema, index) => ({
      key: `page-json-ld-${index}`,
      type: "application/ld+json",
      innerHTML: jsonLdContent(schema),
    })),
  });
}
