<script setup lang="ts">
import type { Milestone } from "@/data/types";
import { formatDate } from "@/lib/format";

defineProps<{ milestones: Milestone[] }>();
</script>

<template>
  <ol class="ml-[0.3rem] border-l border-dashed border-line-2">
    <li
      v-for="m in milestones"
      :key="m.date + m.text"
      class="relative pb-[1.1rem] pl-[1.4rem] last:pb-0 before:absolute before:top-[0.45rem] before:-left-[4px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-cyan before:glow-cyan"
    >
      <div class="flex items-baseline gap-2.5 font-mono text-[0.68rem] tracking-[0.08em] text-amber">
        <time :datetime="m.date">{{ formatDate(m.date) }}</time>
        <a
          v-if="m.release"
          class="rounded-sm border border-line-2 px-[0.35rem] text-muted transition-colors hover:border-cyan hover:text-cyan"
          :href="`https://pocketjs.dev/changelog/#${m.release.replace(/\./g, '')}`"
          target="_blank"
          rel="noreferrer"
          >v{{ m.release }}</a
        >
      </div>
      <p class="mt-1 text-[0.9rem] leading-[1.55] text-ink-2">{{ m.text }}</p>
    </li>
  </ol>
</template>
