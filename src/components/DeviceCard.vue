<script setup lang="ts">
import type { Device } from "@/data/types";
import PathBadge from "./PathBadge.vue";
import StatusBadge from "./StatusBadge.vue";

defineProps<{ device: Device; compact?: boolean }>();
</script>

<template>
  <router-link
    :to="`/devices/${device.slug}`"
    class="group flex min-w-0 flex-col border border-line-2 bg-bg-2 transition-colors hover:border-cyan hover:bg-panel"
  >
    <div
      class="relative overflow-hidden border-b border-line-2 bg-grid-sm"
      :class="compact ? 'aspect-[16/7]' : 'aspect-[16/10]'"
    >
      <img
        class="h-full w-full object-contain transition-transform duration-500 ease-lab group-hover:scale-[1.03]"
        :class="{ 'px-[1.4rem] py-[1.1rem]': (device.hero.fit ?? 'contain') === 'contain' }"
        :src="device.hero.src"
        :alt="device.hero.alt"
        :width="device.hero.width"
        :height="device.hero.height"
        loading="lazy"
        decoding="async"
      />
      <span
        class="absolute top-[0.6rem] left-[0.7rem] border border-line-2 bg-glass/80 px-[0.45rem] py-[0.2rem] font-mono text-[0.68rem] tracking-[0.08em] text-amber"
      >
        {{ device.year }}
      </span>
      <PathBadge class="absolute top-[0.6rem] right-[0.7rem] bg-glass/80" :path="device.pocket.path" short />
    </div>

    <div class="flex flex-1 flex-col gap-[0.45rem] px-[1.1rem] pt-4 pb-[1.1rem]">
      <h3 class="text-[1.08rem] font-semibold tracking-[-0.01em] text-ink">{{ device.shortName }}</h3>
      <p v-if="!compact" class="flex-1 text-[0.82rem] leading-[1.5] text-muted">{{ device.tagline }}</p>
      <div
        class="mt-1 flex flex-wrap gap-x-[0.9rem] gap-y-[0.2rem] border-t border-dashed border-line-2 pt-[0.6rem] font-mono text-[0.64rem] text-ink-2 [&>span+span]:before:mr-[0.9rem] [&>span+span]:before:text-line-3 [&>span+span]:before:content-['·']"
      >
        <span>{{ device.headline.cpu }}</span>
        <span>{{ device.headline.memory }}</span>
        <span>{{ device.headline.display }}</span>
      </div>
      <div class="mt-1.5 flex items-center justify-between gap-2.5">
        <StatusBadge :status="device.pocket.status" />
        <span
          class="font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase transition-colors group-hover:text-cyan"
          aria-hidden="true"
          >Open →</span
        >
      </div>
    </div>
  </router-link>
</template>
