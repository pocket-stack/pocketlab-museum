<script setup lang="ts">
import { computed } from "vue";
import type { Device } from "@/data/types";

const props = defineProps<{ devices: readonly Device[] }>();

// Group machines that share a year so the rail reads as a sequence of years.
const groups = computed(() => {
  const map = new Map<number, Device[]>();
  for (const d of [...props.devices].sort((a, b) => a.sortYear - b.sortYear)) {
    const list = map.get(d.sortYear) ?? [];
    list.push(d);
    map.set(d.sortYear, list);
  }
  return [...map.entries()].map(([year, list]) => ({ year, list }));
});
</script>

<template>
  <div class="mb-2.5 overflow-x-auto pb-1.5" role="navigation" aria-label="Timeline">
    <ol class="relative flex min-w-max pt-1">
      <li
        v-for="(g, i) in groups"
        :key="g.year"
        class="relative flex min-w-[7.5rem] flex-col items-start pr-[1.6rem]"
      >
        <span class="font-mono text-[0.68rem] tracking-[0.1em] text-amber">{{ g.year }}</span>
        <!-- the dashed rail and the glowing dot -->
        <span
          class="relative my-[0.2rem] mb-[0.35rem] h-[1.1rem] w-full before:absolute before:top-1/2 before:left-0 before:border-t before:border-dashed before:border-line-2 after:absolute after:top-1/2 after:left-0 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rounded-full after:bg-cyan after:glow-cyan"
          :class="i === groups.length - 1 ? 'before:right-0' : 'before:-right-[1.6rem]'"
          aria-hidden="true"
        ></span>
        <div class="flex flex-col gap-[0.2rem]">
          <router-link
            v-for="d in g.list"
            :key="d.slug"
            :to="`/devices/${d.slug}`"
            class="font-mono text-[0.72rem] whitespace-nowrap text-ink-2 transition-colors hover:text-cyan"
          >
            {{ d.shortName }}<span v-if="d.pocket.path === 'aot'" class="ml-1 text-[0.58rem] tracking-[0.1em] text-amber">aot</span>
          </router-link>
        </div>
      </li>
    </ol>
  </div>
</template>
