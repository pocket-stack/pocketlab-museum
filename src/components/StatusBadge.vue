<script setup lang="ts">
import type { AdoptionStatus } from "@/data/types";
import { STATUS_LABEL, STATUS_TONE } from "@/data/devices";

const props = defineProps<{ status: AdoptionStatus; label?: string }>();
const tone = STATUS_TONE[props.status];

const text: Record<typeof tone, string> = {
  green: "text-green",
  cyan: "text-cyan",
  amber: "text-amber",
  muted: "text-muted",
};
const dot: Record<typeof tone, string> = {
  green: "bg-green glow-green",
  cyan: "bg-cyan glow-cyan",
  amber: "bg-amber glow-amber",
  muted: "bg-muted",
};
</script>

<template>
  <span
    class="inline-flex items-center gap-[0.45rem] font-mono text-[0.68rem] tracking-[0.08em] whitespace-nowrap uppercase"
    :class="text[tone]"
  >
    <i class="dot" :class="dot[tone]" aria-hidden="true"></i>
    {{ label ?? STATUS_LABEL[status] }}
  </span>
</template>
