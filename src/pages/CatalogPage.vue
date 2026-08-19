<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, ref } from "vue";
import PathBadge from "@/components/PathBadge.vue";
import SectionHead from "@/components/SectionHead.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import { FAMILY_LABEL, devices } from "@/data/devices";
import type { Device } from "@/data/types";
import { SITE, absoluteUrl } from "@/lib/site";

useHead({
  title: "Catalogue",
  meta: [
    { name: "description", content: "Every machine in the Pocket Museum side by side: processor, memory, display, execution path and PocketJS status." },
    { property: "og:title", content: `Catalogue · ${SITE.name}` },
    { property: "og:url", content: absoluteUrl("/catalog") },
  ],
  link: [{ rel: "canonical", href: absoluteUrl("/catalog") }],
});

type SortKey = "year" | "name" | "family" | "path" | "status";
const sortKey = ref<SortKey>("year");
const sortDir = ref<1 | -1>(1);

function setSort(key: SortKey) {
  if (sortKey.value === key) sortDir.value = sortDir.value === 1 ? -1 : 1;
  else {
    sortKey.value = key;
    sortDir.value = 1;
  }
}

const keyOf: Record<SortKey, (d: Device) => string | number> = {
  year: (d) => d.sortYear,
  name: (d) => d.shortName.toLowerCase(),
  family: (d) => FAMILY_LABEL[d.family],
  path: (d) => d.pocket.path,
  status: (d) => d.pocket.status,
};

const rows = computed(() => {
  const k = keyOf[sortKey.value];
  return [...devices].sort((a, b) => {
    const x = k(a);
    const y = k(b);
    const c = x < y ? -1 : x > y ? 1 : a.sortYear - b.sortYear;
    return c * sortDir.value;
  });
});

const columns: { key: SortKey | null; label: string }[] = [
  { key: "year", label: "Year" },
  { key: "name", label: "Machine" },
  { key: "family", label: "Kind" },
  { key: null, label: "Processor" },
  { key: null, label: "Memory" },
  { key: null, label: "Display" },
  { key: "path", label: "Path" },
  { key: "status", label: "PocketJS status" },
];

const th = "bg-panel px-[0.8rem] py-[0.6rem] text-left font-mono text-[0.64rem] font-medium tracking-[0.14em] whitespace-nowrap text-muted uppercase";
const td = "border-t border-line px-[0.8rem] py-[0.6rem] align-middle text-ink-2";
const mono = "font-mono text-[0.74rem]";
</script>

<template>
  <section class="border-b border-line pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(2rem,4vw,3rem)]">
    <div class="wrap">
      <span class="mlabel mb-4 block text-cyan">// catalogue · every exhibit side by side</span>
      <h1 class="mb-4 text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-[-0.03em]">Catalogue</h1>
      <p class="max-w-[62ch] text-[1.06rem] text-ink-2">
        The machines PocketJS runs on, in one table: the three numbers that matter for a UI runtime — processor, memory,
        display — and how each machine executes PocketJS. Click a column to sort; click a row to open the exhibit.
      </p>
    </div>
  </section>

  <section class="sect border-b-0">
    <div class="wrap">
      <SectionHead index="00" title="Specification table" :label="`${devices.length} machines`" />
      <div class="overflow-x-auto border border-line-2 bg-bg-2">
        <table class="w-full min-w-[960px] border-collapse text-[0.86rem]">
          <thead>
            <tr>
              <th v-for="c in columns" :key="c.label" :class="[th, 'border-b border-line-2']" scope="col">
                <button
                  v-if="c.key"
                  type="button"
                  class="inline-flex items-center gap-[0.35rem] font-[inherit] tracking-[inherit] uppercase transition-colors hover:text-cyan"
                  :class="{ 'text-cyan': sortKey === c.key }"
                  @click="setSort(c.key)"
                >
                  {{ c.label }}
                  <span class="opacity-70" aria-hidden="true">{{ sortKey === c.key ? (sortDir === 1 ? "↑" : "↓") : "↕" }}</span>
                </button>
                <template v-else>{{ c.label }}</template>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in rows" :key="d.slug" class="transition-colors hover:bg-panel">
              <td :class="td"><span class="font-mono text-[0.72rem] text-amber">{{ d.year }}</span></td>
              <td :class="td">
                <router-link :to="`/devices/${d.slug}`" class="group flex items-center gap-[0.7rem] text-ink">
                  <img
                    :src="d.hero.src"
                    alt=""
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    class="h-12 w-12 shrink-0 border border-line-2 bg-glass object-contain"
                    :class="{ 'p-1': (d.hero.fit ?? 'contain') === 'contain' }"
                  />
                  <span>
                    <span class="block font-semibold transition-colors group-hover:text-cyan">{{ d.shortName }}</span>
                    <span class="block text-[0.72rem] text-muted">{{ d.maker }}</span>
                  </span>
                </router-link>
              </td>
              <td :class="td">{{ FAMILY_LABEL[d.family] }}</td>
              <td :class="[td, mono]">{{ d.headline.cpu }}</td>
              <td :class="[td, mono]">{{ d.headline.memory }}</td>
              <td :class="[td, mono]">{{ d.headline.display }}</td>
              <td :class="td"><PathBadge :path="d.pocket.path" short /></td>
              <td :class="td"><StatusBadge :status="d.pocket.status" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mlabel mt-[0.9rem]">
        Processor, memory and display are curated museum data with sources on each exhibit page. Path and status follow the
        upstream registry and evidence tables.
      </p>
    </div>
  </section>
</template>
