<script setup lang="ts">
import type { ExecutionPath } from "@/data/types";
import { PATH_LABEL, PATH_SHORT } from "@/data/devices";

defineProps<{ path: ExecutionPath; short?: boolean }>();

const border: Record<ExecutionPath, string> = {
  guest: "border-cyan/35",
  aot: "border-amber/40",
  native: "border-green/40",
};
</script>

<template>
  <span
    class="inline-block rounded-sm border px-2 py-[0.18rem] font-mono text-[0.64rem] tracking-[0.1em] whitespace-nowrap text-ink-2 uppercase"
    :class="border[path]"
    :title="PATH_LABEL[path]"
  >
    {{ short ? PATH_SHORT[path] : PATH_LABEL[path] }}
  </span>
</template>
