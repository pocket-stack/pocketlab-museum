<script setup lang="ts">
import { useHead } from "@unhead/vue";

useHead({ title: "Not in the collection", meta: [{ name: "robots", content: "noindex" }] });
</script>

<template>
  <section class="py-[clamp(4rem,12vw,8rem)]">
    <div class="wrap">
      <span class="mlabel mb-4 block text-amber">// 404 · not in the collection</span>
      <h1 class="mb-4 text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-[-0.03em]">No exhibit at this address.</h1>
      <p class="max-w-[62ch] text-[1.06rem] text-ink-2">
        The machine may have moved, or never been acquired. The collection index lists everything PocketJS runs on.
      </p>
      <div class="mt-8 flex flex-wrap gap-[0.8rem]">
        <router-link class="cta" to="/#collection">Back to the collection →</router-link>
        <router-link class="cta cta-ghost" to="/catalog">Open the catalogue</router-link>
      </div>
    </div>
  </section>
</template>
