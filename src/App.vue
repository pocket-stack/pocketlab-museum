<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import { SITE } from "@/lib/site";

useHead({
  titleTemplate: (title?: string) => (title ? `${title} · ${SITE.name}` : SITE.name),
  htmlAttrs: { lang: SITE.language },
  meta: [{ name: "theme-color", content: "#0a0d12" }],
});

useSeoMeta({
  ogSiteName: SITE.name,
  ogLocale: SITE.locale,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@pocket_js",
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
