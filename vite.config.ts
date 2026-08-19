import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { pocketjsDocs } from "./plugins/pocketjs-docs.ts";

const root = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://museum.pocketlab.build";
const renderedRoutes = new Set<string>();

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
      renderedRoutes.add(route);
      return html;
    },
    onFinished() {
      const notFound = path.join(root, "dist/404/index.html");
      if (existsSync(notFound)) copyFileSync(notFound, path.join(root, "dist/404.html"));
      const urls = [...renderedRoutes]
        .filter((r) => r !== "/404")
        .sort()
        .map((r) => `  <url><loc>${SITE_URL}${r === "/" ? "/" : `${r.replace(/\/$/, "")}/`}</loc></url>`)
        .join("\n");
      writeFileSync(
        path.join(root, "dist/sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  },
});
