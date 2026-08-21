<script setup lang="ts">
import { computed, ref } from "vue";
import DeviceCard from "@/components/DeviceCard.vue";
import SectionHead from "@/components/SectionHead.vue";
import TimelineRail from "@/components/TimelineRail.vue";
import { devices, permanentCollection, workbench } from "@/data/devices";
import type { ExecutionPath } from "@/data/types";
import { POCKET_TARGETS } from "@/data/upstream";
import { homeSeo, usePageSeo, websiteJsonLd } from "@/lib/seo";

usePageSeo(homeSeo(devices), [websiteJsonLd()]);

type Filter = "all" | ExecutionPath;
const filter = ref<Filter>("all");
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All machines" },
  { key: "guest", label: "Guest · QuickJS" },
  { key: "aot", label: "Pocket Vapor · AOT" },
  { key: "native", label: "Native renderer" },
];

const shown = computed(() =>
  filter.value === "all" ? permanentCollection : permanentCollection.filter((d) => d.pocket.path === filter.value),
);

const years = permanentCollection.map((d) => d.sortYear);
const stats = [
  { value: String(permanentCollection.length), label: "machines in the collection" },
  { value: String(Object.keys(POCKET_TARGETS).length), label: "registered Guest targets" },
  { value: String(permanentCollection.filter((d) => d.pocket.path === "aot").length), label: "Pocket Vapor targets" },
  { value: `${Math.min(...years)}–${Math.max(...years)}`, label: "years of hardware" },
];
</script>

<template>
  <!-- hero -->
  <section class="border-b border-line pt-[clamp(4rem,10vw,7rem)] pb-[clamp(2.6rem,6vw,4rem)]">
    <div class="wrap">
      <span class="mlabel mb-5 block text-cyan">// pocketlab.build · permanent collection</span>
      <h1 class="max-w-[22ch] text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.03em]">
        New software for machines the industry <span class="text-cyan">finished with</span>.
      </h1>
      <p class="mt-6 max-w-[62ch] text-[1.06rem] text-ink-2 [&_strong]:font-semibold [&_strong]:text-ink">
        Every exhibit runs <strong>today's Pocket stack on the original hardware</strong> — as a live JavaScript guest or a
        compiled cartridge — and every port ships with an engineering story. The museum is how the runtime keeps its
        portability honest.
      </p>
      <div class="mt-8 flex flex-wrap gap-[0.8rem]">
        <a class="cta" href="#collection">Enter the collection →</a>
        <router-link class="cta cta-ghost" to="/catalog/">Compare the machines</router-link>
      </div>

      <dl class="mt-11 grid grid-cols-2 gap-px border border-line-2 bg-line-2 md:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="flex flex-col-reverse gap-[0.2rem] bg-panel px-[1.1rem] py-[0.9rem]">
          <dt class="mlabel">{{ s.label }}</dt>
          <dd class="font-mono text-2xl font-semibold tracking-[-0.02em] text-ink">{{ s.value }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- collection -->
  <section class="sect" id="collection">
    <div class="wrap">
      <SectionHead index="00" title="The collection" label="oldest machine first" />
      <TimelineRail :devices="permanentCollection" />

      <div class="mt-6 mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by execution path">
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          class="border px-[0.8rem] py-[0.45rem] font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-colors"
          :class="
            filter === f.key
              ? 'border-cyan bg-cyan/15 text-cyan'
              : 'border-line-2 bg-bg-2 text-ink-2 hover:border-line-3 hover:text-ink'
          "
          @click="filter = f.key"
        >
          {{ f.label }}
        </button>
        <span class="mlabel ml-auto">{{ shown.length }} shown</span>
      </div>

      <div class="grid grid-cols-1 gap-[0.9rem] min-[521px]:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        <DeviceCard v-for="d in shown" :key="d.slug" :device="d" />
      </div>
    </div>
  </section>

  <!-- workbench -->
  <section class="sect border-b-0" id="workbench">
    <div class="wrap">
      <SectionHead index="01" title="The workbench" label="not exhibits — the bench they were built on" />
      <p class="mb-6 max-w-[62ch] text-[1.06rem] text-ink-2">
        Development and verification hosts. They are where the goldens run, where new modules land first, and where
        the desktop form factors live. Listed for completeness; none of them is a museum piece.
      </p>
      <div class="grid grid-cols-1 gap-[0.9rem] min-[521px]:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <DeviceCard v-for="d in workbench" :key="d.slug" :device="d" compact />
      </div>
    </div>
  </section>
</template>
