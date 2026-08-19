<script setup lang="ts">
import type { GalleryImage } from "@/data/types";
import { githubUrl } from "@/data/upstream";

defineProps<{ images: GalleryImage[] }>();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[0.9rem]">
    <figure v-for="(g, i) in images" :key="g.src" class="flex flex-col border border-line-2 bg-bg-2">
      <a :href="g.src" target="_blank" rel="noreferrer" class="block border-b border-line-2 bg-black">
        <img class="aspect-[16/10] w-full object-contain" :src="g.src" :alt="g.alt" loading="lazy" decoding="async" />
      </a>
      <figcaption class="flex items-baseline gap-2.5 px-[0.8rem] pt-[0.6rem] pb-[0.7rem] text-[0.8rem] leading-[1.45] text-ink-2">
        <span class="shrink-0 font-mono text-[0.64rem] text-cyan">{{ String(i + 1).padStart(2, "0") }}</span>
        <span class="flex-1">{{ g.caption }}</span>
        <a
          v-if="g.upstreamPath"
          class="font-mono text-[0.6rem] tracking-[0.08em] whitespace-nowrap text-muted uppercase hover:text-cyan"
          :href="githubUrl(g.upstreamPath)"
          target="_blank"
          rel="noreferrer"
          :title="g.upstreamPath"
          >upstream ↗</a
        >
      </figcaption>
    </figure>
  </div>
</template>
