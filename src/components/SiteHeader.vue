<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { SITE } from "@/lib/site";

const open = ref(false);
const route = useRoute();
watch(() => route.fullPath, () => (open.value = false));

const links = [
  { to: "/#collection", label: "Collection", match: "/" },
  { to: "/catalog", label: "Catalogue", match: "/catalog" },
  { to: "/#workbench", label: "Workbench", match: "/#workbench" },
  { to: "/about", label: "About", match: "/about" },
];

const linkClass =
  "whitespace-nowrap transition-colors hover:text-cyan max-md:border-t max-md:border-line max-md:px-[clamp(1.25rem,4vw,2.5rem)] max-md:py-4";
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
    <div class="wrap relative flex h-[3.6rem] items-center justify-between">
      <div class="flex min-w-0 items-baseline gap-2.5">
        <router-link
          to="/"
          class="whitespace-nowrap font-mono text-[0.95rem] font-semibold tracking-[0.06em] text-ink"
          aria-label="The Pocket Museum — home"
        >
          <span class="text-cyan">[</span> POCKET MUSEUM <span class="text-cyan">]</span>
        </router-link>
        <a
          class="hidden whitespace-nowrap font-mono text-[0.7rem] tracking-[0.08em] text-muted transition-colors hover:text-cyan md:inline"
          :href="SITE.lab.url"
          target="_blank"
          rel="noreferrer"
        >
          <span class="mr-1.5 text-line-3">/</span> pocketlab.build
        </a>
      </div>

      <button
        class="flex h-[2.6rem] w-[2.6rem] flex-col justify-center gap-[5px] border border-line-2 bg-panel p-[0.6rem] md:hidden"
        type="button"
        :aria-expanded="open"
        aria-controls="site-nav"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <span class="block h-0.5 bg-ink-2 transition-transform" :class="{ 'translate-y-[7px] rotate-45': open }"></span>
        <span class="block h-0.5 bg-ink-2 transition-opacity" :class="{ 'opacity-0': open }"></span>
        <span class="block h-0.5 bg-ink-2 transition-transform" :class="{ '-translate-y-[7px] -rotate-45': open }"></span>
      </button>

      <nav
        id="site-nav"
        class="font-mono text-[0.74rem] uppercase tracking-[0.1em] text-ink-2 max-md:absolute max-md:top-full max-md:right-0 max-md:left-0 max-md:flex-col max-md:border-b max-md:border-line-2 max-md:bg-bg-2 md:flex md:gap-[1.4rem]"
        :class="open ? 'flex' : 'hidden md:flex'"
        aria-label="Primary"
      >
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          :class="[linkClass, { 'text-cyan': l.match === route.path || (l.match === '/' && route.path === '/' && !route.hash) }]"
        >
          {{ l.label }}
        </router-link>
        <a :class="[linkClass, 'text-muted']" :href="SITE.pocketjs.url" target="_blank" rel="noreferrer">pocketjs.dev ↗</a>
        <a :class="[linkClass, 'text-muted']" :href="SITE.github.url" target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>
    </div>
  </header>
</template>
