<script setup lang="ts">
import { upstream } from "@/data/upstream";
import { isoDay } from "@/lib/format";
import { SITE } from "@/lib/site";

const col = "flex flex-col gap-[0.45rem] font-mono text-[0.74rem] text-ink-2 [&_a:hover]:text-cyan";
</script>

<template>
  <footer class="border-t border-line bg-bg/60 pt-10 pb-8">
    <div class="wrap flex flex-wrap items-start justify-between gap-x-16 gap-y-10">
      <div class="max-w-[34ch]">
        <span class="font-mono text-[0.95rem] font-semibold tracking-[0.06em] text-ink">
          <span class="text-cyan">[</span> POCKET MUSEUM <span class="text-cyan">]</span>
        </span>
        <p class="mt-3 text-[0.86rem] text-muted [&_a]:text-ink-2 [&_a:hover]:text-cyan">
          The permanent collection of <a :href="SITE.lab.url" target="_blank" rel="noreferrer">Pocket Lab</a>: every
          machine PocketJS runs on, with its hardware and the upstream bring-up record.
        </p>
      </div>

      <nav class="flex flex-wrap gap-x-12 gap-y-8" aria-label="Footer">
        <div :class="col">
          <span class="mlabel mb-1">Museum</span>
          <router-link to="/#collection">Collection</router-link>
          <router-link to="/catalog/">Catalogue</router-link>
          <router-link to="/#workbench">Workbench</router-link>
          <router-link to="/about/">About &amp; credits</router-link>
        </div>
        <div :class="col">
          <span class="mlabel mb-1">Pocket</span>
          <a :href="SITE.lab.url" target="_blank" rel="noreferrer">pocketlab.build</a>
          <a :href="SITE.pocketjs.url" target="_blank" rel="noreferrer">pocketjs.dev</a>
          <a :href="`${SITE.pocketjs.url}/blog/`" target="_blank" rel="noreferrer">Acquisition reports</a>
          <a :href="SITE.github.url" target="_blank" rel="noreferrer">github.com/pocket-stack</a>
        </div>
        <div :class="col">
          <span class="mlabel mb-1">Community</span>
          <a :href="SITE.x" target="_blank" rel="noreferrer">@pocket_js</a>
          <a :href="SITE.discord" target="_blank" rel="noreferrer">Discord</a>
          <a :href="SITE.repo.url" target="_blank" rel="noreferrer">Museum source</a>
        </div>
      </nav>
    </div>

    <div
      class="wrap mt-9 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-dashed border-line pt-5 font-mono text-[0.7rem] text-muted"
    >
      <span>© {{ SITE.year }} Pocket Lab · museum.pocketlab.build</span>
      <span>
        docs synced from
        <a class="text-ink-2 hover:text-cyan" :href="`${upstream.url}/tree/${upstream.rev}`" target="_blank" rel="noreferrer"
          >{{ upstream.repo }}@{{ upstream.shortRev }}</a
        >
        <template v-if="upstream.date"> · {{ isoDay(upstream.date) }}</template>
      </span>
    </div>
  </footer>
</template>
