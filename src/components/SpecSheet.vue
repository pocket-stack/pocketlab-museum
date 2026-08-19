<script setup lang="ts">
import type { SpecGroup } from "@/data/types";

defineProps<{ groups: SpecGroup[] }>();
</script>

<template>
  <!-- Borders are drawn per group (and pulled under the frame by -1px margins)
       so a partially filled last row never shows a blank cell. -->
  <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] overflow-hidden border border-line-2 bg-bg-2">
    <section
      v-for="g in groups"
      :key="g.title"
      class="-mr-px -mb-px min-w-0 border-r border-b border-line-2 px-[1.1rem] pt-4 pb-[1.2rem]"
    >
      <h3 class="mb-[0.8rem] font-mono text-[0.66rem] font-medium tracking-[0.14em] text-cyan uppercase">{{ g.title }}</h3>
      <dl class="flex flex-col">
        <div
          v-for="item in g.items"
          :key="item.label"
          class="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2.5 border-t border-dashed border-line py-2 text-[0.88rem] leading-[1.5] first:border-t-0 first:pt-0 max-[420px]:grid-cols-1 max-[420px]:gap-0.5"
        >
          <dt class="pt-[0.2rem] font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase">{{ item.label }}</dt>
          <dd class="text-ink [overflow-wrap:anywhere]">
            {{ item.value }}
            <small v-if="item.note" class="mt-0.5 block text-[0.76rem] text-muted">{{ item.note }}</small>
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
