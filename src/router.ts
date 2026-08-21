import type { RouteRecordRaw } from "vue-router";

// Pages are lazy so each route is its own chunk; the device page additionally
// lazy-loads the upstream documents it renders.
export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("./pages/HomePage.vue") },
  { path: "/catalog/", name: "catalog", component: () => import("./pages/CatalogPage.vue") },
  { path: "/devices/:slug/", name: "device", component: () => import("./pages/DevicePage.vue") },
  { path: "/about/", name: "about", component: () => import("./pages/AboutPage.vue") },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("./pages/NotFoundPage.vue") },
];
