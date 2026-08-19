<script setup lang="ts">
defineProps<{
  /** Two-digit index printed before the title, e.g. "01". */
  index: string;
  title: string;
  /** Right-aligned mono label. */
  label?: string;
  /** Heading level for the title (default h2). */
  level?: "h1" | "h2" | "h3";
  id?: string;
}>();
</script>

<template>
  <div class="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 scroll-mt-20 sm:flex-nowrap" :id="id">
    <span class="font-mono text-[0.8rem] text-cyan">{{ index }}</span>
    <component :is="level ?? 'h2'" class="text-[clamp(1.5rem,3.2vw,2.1rem)] leading-[1.15] font-semibold tracking-[-0.015em]">
      {{ title }}
    </component>
    <span class="hidden min-w-6 flex-1 -translate-y-[0.35rem] border-b border-dashed border-line-2 sm:block" aria-hidden="true"></span>
    <span v-if="label" class="mlabel w-full shrink-0 sm:w-auto">{{ label }}</span>
  </div>
</template>
