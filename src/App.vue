<script setup lang="ts">
import { useHead } from "@unhead/vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import { SITE } from "@/lib/site";

useHead({
  titleTemplate: (title?: string) => (title ? `${title} · ${SITE.name}` : SITE.name),
  htmlAttrs: { lang: "en" },
  meta: [
    { name: "description", content: SITE.description },
    { property: "og:site_name", content: SITE.name },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@pocket_js" },
    { name: "theme-color", content: "#0a0d12" },
  ],
});
</script>

<template>
  <SiteHeader />
  <main id="main">
    <router-view v-slot="{ Component, route }">
      <Suspense timeout="0">
        <component :is="Component" :key="route.path" />
        <template #fallback>
          <div class="wrap py-24" aria-busy="true">
            <span class="mlabel">// loading exhibit …</span>
          </div>
        </template>
      </Suspense>
    </router-view>
  </main>
  <SiteFooter />
</template>
