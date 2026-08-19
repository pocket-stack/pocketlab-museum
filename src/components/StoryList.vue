<script setup lang="ts">
import { computed } from "vue";
import { BLOG_POSTS, blogUrl } from "@/data/upstream";
import { formatDate } from "@/lib/format";

const props = defineProps<{ slugs: string[] }>();

// Titles and dates come from upstream site/nav.ts; an unknown slug still links.
const posts = computed(() =>
  props.slugs.map((slug) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    return {
      slug,
      url: blogUrl(slug),
      title: post?.title ?? slug,
      date: post?.date,
      description: post?.description,
      author: post?.author.name,
    };
  }),
);
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[0.8rem]">
    <li v-for="p in posts" :key="p.slug">
      <a
        class="flex h-full flex-col gap-[0.35rem] border border-line-2 bg-bg-2 px-4 pt-[0.9rem] pb-4 transition-colors hover:border-cyan hover:bg-panel"
        :href="p.url"
        target="_blank"
        rel="noreferrer"
      >
        <span class="mlabel">
          <template v-if="p.date">{{ formatDate(p.date) }}</template>
          <template v-if="p.author"> · {{ p.author }}</template>
          <template v-if="!p.date"> pocketjs.dev/blog</template>
        </span>
        <span class="leading-[1.35] font-semibold text-ink">{{ p.title }}</span>
        <span v-if="p.description" class="flex-1 text-[0.82rem] leading-[1.5] text-muted">{{ p.description }}</span>
        <span class="mt-1.5 font-mono text-[0.64rem] tracking-[0.1em] text-cyan uppercase">Read on pocketjs.dev ↗</span>
      </a>
    </li>
  </ul>
</template>
