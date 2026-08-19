<script setup lang="ts">
import { computed, onMounted, ref, shallowReactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RenderedDoc } from "../../plugins/pocketjs-docs";
import type { DocRef } from "@/data/types";
import { readingMinutes } from "@/lib/format";

const props = defineProps<{
  docs: DocRef[];
  /** The first document, already rendered (so the page can be prerendered). */
  initial: RenderedDoc;
  load: (path: string) => Promise<RenderedDoc>;
}>();

const route = useRoute();
const router = useRouter();

const cache = shallowReactive(new Map<string, RenderedDoc>([[props.initial.path, props.initial]]));
const active = ref(props.initial.path);
const loading = ref<string | null>(null);
const error = ref<string | null>(null);

const current = computed(() => cache.get(active.value) ?? props.initial);
const currentRef = computed(() => props.docs.find((d) => d.path === active.value));
const minutes = computed(() => readingMinutes(current.value.words));
const hasToc = computed(() => current.value.toc.length > 2);

async function select(path: string, pushQuery = true) {
  if (!props.docs.some((d) => d.path === path)) return;
  error.value = null;
  if (!cache.has(path)) {
    loading.value = path;
    try {
      cache.set(path, await props.load(path));
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      loading.value = null;
      return;
    }
    loading.value = null;
  }
  active.value = path;
  if (pushQuery) {
    const query = { ...route.query };
    if (path === props.docs[0]?.path) delete query.doc;
    else query.doc = path;
    router.replace({ query, hash: "" });
  }
}

onMounted(() => {
  const wanted = route.query.doc;
  if (typeof wanted === "string" && wanted !== active.value) select(wanted, false);
});
</script>

<template>
  <div class="border border-line-2 bg-bg-2">
    <!-- tabs -->
    <div class="flex overflow-x-auto border-b border-line-2 bg-panel" role="tablist" aria-label="Upstream documents">
      <button
        v-for="d in docs"
        :key="d.path"
        type="button"
        role="tab"
        class="-mb-px flex flex-col items-start gap-[0.15rem] border-r border-b-2 border-line px-4 pt-[0.7rem] pb-[0.6rem] text-left whitespace-nowrap transition-colors hover:bg-panel-2 hover:text-ink"
        :class="[
          d.path === active ? 'border-b-cyan bg-bg-2 text-cyan' : 'border-b-transparent text-ink-2',
          { 'opacity-60': d.path === loading },
        ]"
        :aria-selected="d.path === active"
        :title="d.summary ?? d.path"
        @click="select(d.path)"
      >
        <span class="text-[0.86rem] font-semibold">{{ d.label ?? cache.get(d.path)?.title ?? d.path.split("/").pop() }}</span>
        <span class="font-mono text-[0.6rem] tracking-[0.04em] text-muted">{{ d.path }}</span>
      </button>
    </div>

    <!-- header -->
    <header class="border-b border-dashed border-line-2 px-4 pt-5 pb-4 sm:px-[1.4rem]">
      <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
        <h3 class="text-[1.35rem] font-semibold tracking-[-0.01em]">{{ current.title }}</h3>
        <span class="mlabel">{{ minutes }} min read · {{ current.words.toLocaleString() }} words</span>
      </div>
      <p v-if="currentRef?.summary" class="mt-1.5 text-[0.9rem] text-ink-2">{{ currentRef.summary }}</p>
      <div class="mt-[0.7rem] flex flex-wrap items-center gap-x-[0.7rem] gap-y-2 text-[0.8rem]">
        <span class="mlabel">rendered verbatim from</span>
        <a class="group" :href="current.githubUrl" target="_blank" rel="noreferrer"
          ><code class="font-mono text-[0.76rem] text-cyan group-hover:underline">{{ current.path }}</code></a
        >
        <span class="font-mono text-[0.66rem] text-muted">@ {{ current.rev.slice(0, 7) }}</span>
        <a class="font-mono text-[0.66rem] text-muted hover:text-cyan" :href="current.rawUrl" target="_blank" rel="noreferrer">raw ↗</a>
      </div>
      <p v-if="error" class="mt-2.5 text-[0.85rem] text-rose">Could not load this document: {{ error }}</p>
    </header>

    <!-- body -->
    <div class="p-4 sm:p-[1.4rem]" :class="{ 'lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start lg:gap-8': hasToc }">
      <aside
        v-if="hasToc"
        class="mb-6 border border-line-2 bg-panel px-4 py-[0.8rem] text-[0.8rem] lg:sticky lg:top-[4.6rem] lg:mb-0 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:border-0 lg:bg-transparent lg:p-0 lg:pr-2"
        aria-label="On this page"
      >
        <span class="mlabel">On this page</span>
        <ol class="mt-[0.6rem] border-l border-line-2">
          <li v-for="t in current.toc" :key="t.id">
            <a
              :href="`#${t.id}`"
              class="-ml-px block border-l-2 border-transparent py-1 pl-[0.8rem] leading-[1.35] transition-colors hover:border-cyan hover:text-cyan"
              :class="t.level === 3 ? 'pl-[1.6rem] text-[0.74rem] text-muted' : 'text-ink-2'"
              >{{ t.text }}</a
            >
          </li>
        </ol>
      </aside>
      <article class="doc min-w-0" v-html="current.html"></article>
    </div>
  </div>
</template>
