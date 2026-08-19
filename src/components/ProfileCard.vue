<script setup lang="ts">
import { computed } from "vue";
import type { Device } from "@/data/types";
import { POCKET_TARGETS, githubUrl, type PocketTargetId } from "@/data/upstream";
import { viewportLabel } from "@/lib/format";

const props = defineProps<{ device: Device }>();

const registryKey = computed(() => props.device.pocket.registryKey as PocketTargetId | undefined);
const profile = computed(() => (registryKey.value ? POCKET_TARGETS[registryKey.value] : undefined));

interface Row {
  label: string;
  value: string;
}

const rows = computed<Row[]>(() => {
  const p = profile.value;
  const pk = props.device.pocket;
  if (p) {
    const out: Row[] = [
      { label: "Registry key", value: registryKey.value! },
      { label: "Host ABI", value: String(p.hostAbi) },
      { label: "Platform", value: p.platform },
      { label: "Form", value: p.form },
      { label: "Physical viewport", value: viewportLabel(p.display.physicalViewport) },
      { label: "Logical viewports", value: p.display.logicalViewports.map(viewportLabel).join(" · ") },
    ];
    if (p.display.dynamicViewport) {
      out.push({
        label: "Dynamic viewport",
        value: `${viewportLabel(p.display.dynamicViewport.min)} → ${viewportLabel(p.display.dynamicViewport.max)}${
          p.display.dynamicViewport.acceptsFixed ? " · accepts fixed apps" : ""
        }`,
      });
    }
    out.push(
      { label: "Presentations", value: p.display.presentations.join(" · ") },
      { label: "Raster density", value: `${p.display.rasterDensity}×` },
    );
    return out;
  }
  const out: Row[] = [{ label: "Profile", value: pk.targetId ?? "—" }];
  if (pk.viewport) {
    out.push({ label: "Logical viewport", value: viewportLabel(pk.viewport.logical) });
    if (pk.viewport.physical) out.push({ label: "Physical viewport", value: viewportLabel(pk.viewport.physical) });
    if (pk.viewport.density) out.push({ label: "Raster density", value: `${pk.viewport.density}×` });
  }
  return out;
});

const capabilities = computed<readonly string[]>(
  () => profile.value?.capabilities ?? props.device.pocket.capabilities ?? [],
);

const sourcePath = computed(
  () =>
    (profile.value
      ? "contracts/spec/platforms.ts"
      : props.device.pocket.code.find((c) => c.path.endsWith("pocket.json"))?.path) ?? props.device.pocket.docs[0]?.path ?? "",
);
</script>

<template>
  <div class="border border-line-2 bg-glass text-[0.86rem]">
    <div class="flex items-center justify-between gap-4 border-b border-line bg-panel px-[0.9rem] py-[0.6rem]">
      <span class="mlabel">{{ profile ? "Target profile · production registry" : "Profile · as declared by the demo manifest" }}</span>
      <a
        class="font-mono text-[0.66rem] whitespace-nowrap text-cyan hover:underline"
        :href="githubUrl(sourcePath)"
        target="_blank"
        rel="noreferrer"
        >{{ profile ? "contracts/spec/platforms.ts" : "source ↗" }}</a
      >
    </div>
    <dl class="px-[0.9rem] py-2">
      <div
        v-for="r in rows"
        :key="r.label"
        class="grid grid-cols-[9rem_minmax(0,1fr)] gap-2.5 border-t border-dashed border-line py-[0.35rem] first:border-t-0 max-[420px]:grid-cols-1 max-[420px]:gap-0.5"
      >
        <dt class="pt-[0.15rem] font-mono text-[0.64rem] tracking-[0.1em] text-muted uppercase">{{ r.label }}</dt>
        <dd class="font-mono text-[0.78rem] text-ink [overflow-wrap:anywhere]">{{ r.value }}</dd>
      </div>
    </dl>
    <div v-if="capabilities.length" class="border-t border-line px-[0.9rem] pt-[0.7rem] pb-[0.9rem]">
      <span class="mlabel">{{ profile ? "Capabilities" : "Requires" }}</span>
      <ul class="mt-2 flex flex-wrap gap-[0.35rem]">
        <li v-for="c in capabilities" :key="c">
          <code class="rounded-sm border border-green/25 bg-green/15 px-[0.45rem] py-[0.15rem] font-mono text-[0.72rem] text-green">{{ c }}</code>
        </li>
      </ul>
    </div>
  </div>
</template>
