import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { pocketjsDocs } from "./plugins/pocketjs-docs.ts";

const root = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://museum.pocketlab.build";
const renderedPages = new Map<string, string>();

function tags(html: string, name: string): string[] {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) ?? [];
}

function attribute(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function requiredMeta(html: string, key: "name" | "property", value: string): string {
  const tag = tags(html, "meta").find((candidate) => attribute(candidate, key) === value);
  const content = tag ? attribute(tag, "content") : undefined;
  if (!content) throw new Error(`Missing ${key}="${value}" meta content`);
  return content;
}

function oneCanonical(html: string): string {
  const matches = tags(html, "link").filter((tag) => attribute(tag, "rel") === "canonical");
  if (matches.length !== 1) throw new Error(`Expected one canonical link, found ${matches.length}`);
  const href = attribute(matches[0]!, "href");
  if (!href) throw new Error("Canonical link must have an href");
  return href;
}

function assertPng(file: string): void {
  if (!existsSync(file)) throw new Error(`OG image does not exist: ${file}`);
  const image = readFileSync(file);
  if (image.length < 24 || image.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error(`OG image is not a PNG: ${file}`);
  }
  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  if (width !== 1200 || height !== 630) throw new Error(`OG image must be 1200×630, got ${width}×${height}: ${file}`);
}

function assertRenderedSeo(route: string, html: string): string | undefined {
  if (route === "/404") {
    if (!requiredMeta(html, "name", "robots").includes("noindex")) throw new Error("404 must be noindex");
    if (tags(html, "link").some((tag) => attribute(tag, "rel") === "canonical")) {
      throw new Error("404 must not declare a canonical URL");
    }
    return undefined;
  }

  if (route !== "/" && !route.endsWith("/")) throw new Error(`Indexable route must end in a slash: ${route}`);
  const canonical = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  if (oneCanonical(html) !== canonical) throw new Error(`Canonical URL mismatch for ${route}`);
  requiredMeta(html, "name", "description");
  const ogImage = requiredMeta(html, "property", "og:image");
  const imageUrl = new URL(ogImage);
  if (imageUrl.origin !== SITE_URL || !imageUrl.pathname.startsWith("/og/") || !imageUrl.pathname.endsWith(".png")) {
    throw new Error(`OG image must be a local PNG: ${ogImage}`);
  }
  assertPng(path.join(root, "dist", imageUrl.pathname.slice(1)));

  if (route === "/" && !html.includes('"@type":"WebSite"')) throw new Error("Home page is missing WebSite JSON-LD");
  if (route.startsWith("/devices/") && !html.includes('"@type":"BreadcrumbList"')) {
    throw new Error(`${route} is missing BreadcrumbList JSON-LD`);
  }
  return ogImage;
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    pocketjsDocs({
      upstreamDir: path.join(root, "external/pocketjs"),
      repo: "pocket-stack/pocketjs",
      siteUrl: "https://pocketjs.dev",
      theme: "vitesse-dark",
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(root, "src"),
      "@upstream": path.join(root, "external/pocketjs"),
    },
  },
  server: {
    fs: {
      // The upstream checkout lives inside the project, but be explicit.
      allow: [root],
    },
  },
  build: {
    target: "es2022",
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
    // Collect every prerendered route and write a sitemap next to the pages.
    onPageRendered(route, html) {
      renderedPages.set(route, html);
      return html;
    },
    onFinished() {
      const notFound = path.join(root, "dist/404/index.html");
      if (existsSync(notFound)) copyFileSync(notFound, path.join(root, "dist/404.html"));
      const images = new Set<string>();
      for (const [route, html] of renderedPages) {
        try {
          const image = assertRenderedSeo(route, html);
          if (image) images.add(image);
        } catch (error) {
          throw new Error(`SEO validation failed for ${route}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      if (images.size !== renderedPages.size - 1) {
        throw new Error(`Expected one unique OG image per indexable page, found ${images.size}`);
      }

      const urls = [...renderedPages.keys()]
        .filter((r) => r !== "/404")
        .sort()
        .map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`)
        .join("\n");
      writeFileSync(
        path.join(root, "dist/sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  },
});
