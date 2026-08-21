import { ViteSSG } from "vite-ssg";
import type { RouteRecordRaw } from "vue-router";
import App from "./App.vue";
import { devices } from "./data/devices";
import { devicePath } from "./lib/site";
import { routes } from "./router";
import "./styles/main.css";

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, saved) {
      if (saved) return saved;
      if (to.hash) return { el: to.hash, top: 80 };
      if (to.path === from.path) return false;
      return { top: 0 };
    },
  },
  () => {
    // No plugins beyond the router and head manager vite-ssg installs itself.
  },
);

// Static generation: expand the dynamic device route into one page per exhibit.
export function includedRoutes(paths: string[], _routes: Readonly<RouteRecordRaw[]>): string[] {
  const staticPaths = paths.filter((p) => !p.includes(":"));
  // "/404" renders the catch-all route; vite.config.ts copies it to dist/404.html
  // for hosts that serve a root-level 404 page.
  return [...staticPaths, ...devices.map((d) => devicePath(d.slug)), "/404"];
}
