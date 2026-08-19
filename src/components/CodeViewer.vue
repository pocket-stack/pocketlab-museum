<script setup lang="ts">
import { computed, ref, shallowReactive } from "vue";
import type { RenderedCode } from "../../plugins/pocketjs-docs";
import type { CodeRef } from "@/data/types";

const props = defineProps<{
  files: CodeRef[];
  initial: RenderedCode;
  load: (path: string) => Promise<RenderedCode>;
}>();

const cache = shallowReactive(new Map<string, RenderedCode>([[props.initial.path, props.initial]]));
const active = ref(props.initial.path);
const loading = ref<string | null>(null);
const error = ref<string | null>(null);

const current = computed(() => cache.get(active.value) ?? props.initial);
const currentRef = computed(() => props.files.find((f) => f.path === active.value));

async function select(path: string) {
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
}
</script>

<template>
  <div class="border border-line-2 bg-glass">
    <div class="flex overflow-x-auto border-b border-line-2 bg-panel" role="tablist" aria-label="Example files">
      <button
        v-for="f in files"
        :key="f.path"
        type="button"
        role="tab"
        class="-mb-px border-r border-b-2 border-line px-[0.9rem] py-[0.6rem] font-mono text-[0.72rem] whitespace-nowrap transition-colors hover:text-ink"
        :class="[f.path === active ? 'border-b-cyan text-cyan' : 'border-b-transparent text-ink-2', { 'opacity-60': f.path === loading }]"
        :aria-selected="f.path === active"
        :title="f.summary ?? f.path"
        @click="select(f.path)"
      >
        {{ f.label }}
      </button>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-dashed border-line px-4 py-[0.55rem]">
      <a class="group" :href="current.githubUrl" target="_blank" rel="noreferrer"
        ><code class="font-mono text-[0.74rem] text-cyan group-hover:underline">{{ current.path }}</code></a
      >
      <span class="mlabel">{{ current.lang }} · {{ current.lines }} lines · @{{ current.rev.slice(0, 7) }}</span>
    </div>
    <p v-if="currentRef?.summary" class="px-4 pt-2.5 text-[0.84rem] text-ink-2">{{ currentRef.summary }}</p>
    <p v-if="error" class="px-4 pt-2.5 text-[0.84rem] text-rose">Could not load this file: {{ error }}</p>
    <!-- the highlighted file reuses the fence styling from doc.css; the language
         badge is hidden because the bar above already names it -->
    <div class="doc code-file mt-2.5 [&_.doc-code::before]:hidden [&_pre.shiki]:max-h-[34rem] [&_pre.shiki]:overflow-auto">
      <div class="doc-code" :data-lang="current.lang" v-html="current.html"></div>
    </div>
  </div>
</template>
