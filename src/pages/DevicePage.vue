<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import CodeViewer from "@/components/CodeViewer.vue";
import DocViewer from "@/components/DocViewer.vue";
import GalleryGrid from "@/components/GalleryGrid.vue";
import MilestoneList from "@/components/MilestoneList.vue";
import PathBadge from "@/components/PathBadge.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import SectionHead from "@/components/SectionHead.vue";
import SpecSheet from "@/components/SpecSheet.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import StoryList from "@/components/StoryList.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { FAMILY_LABEL, PATH_LABEL, deviceBySlug, devices } from "@/data/devices";
import { githubTreeUrl, hasCode, hasDoc, loadCode, loadDoc } from "@/data/upstream";
import { inlineCode } from "@/lib/inline-code";
import { deviceBreadcrumbJsonLd, deviceSeo, usePageSeo } from "@/lib/seo";
import { devicePath } from "@/lib/site";

const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ""));
const device = deviceBySlug(slug.value);

// Neighbours in catalogue order, for the prev/next footer.
const index = device ? devices.indexOf(device) : -1;
const prev = index > 0 ? devices[index - 1] : undefined;
const next = index >= 0 && index < devices.length - 1 ? devices[index + 1] : undefined;

// The first upstream document and source file are awaited so the static build
// contains them; the rest load on demand when a tab is selected.
const docRefs = device ? device.pocket.docs.filter((d) => hasDoc(d.path)) : [];
const missingDocs = device ? device.pocket.docs.filter((d) => !hasDoc(d.path)) : [];
const codeRefs = device ? device.pocket.code.filter((c) => hasCode(c.path)) : [];

const [primaryDoc, primaryCode] = await Promise.all([
  docRefs[0] ? loadDoc(docRefs[0].path) : Promise.resolve(null),
  codeRefs[0] ? loadCode(codeRefs[0].path) : Promise.resolve(null),
]);

const guideIndex = String(3 + (device?.gallery.length ? 1 : 0) + (primaryCode ? 1 : 0)).padStart(2, "0");

if (device) {
  usePageSeo(deviceSeo(device), [deviceBreadcrumbJsonLd(device)]);
}

const subHead = "mt-6 mb-2 font-mono text-[0.66rem] font-medium tracking-[0.14em] text-cyan uppercase first:mt-0";
const neighbour =
  "flex min-w-[12rem] flex-col gap-[0.2rem] border border-line-2 bg-bg-2 px-[1.1rem] py-[0.9rem] transition-colors hover:border-cyan";
</script>

<template>
  <NotFoundPage v-if="!device" />
  <template v-else>
    <!-- ── plaque ───────────────────────────────────────────────────────── -->
    <section class="border-b border-line pt-[clamp(2rem,5vw,3.5rem)] pb-[clamp(2.4rem,5vw,3.5rem)]">
      <div class="wrap">
        <nav
          class="mb-7 flex flex-wrap gap-2 font-mono text-[0.68rem] tracking-[0.08em] text-muted uppercase [&_a:hover]:text-cyan"
          aria-label="Breadcrumb"
        >
          <router-link to="/">Museum</router-link>
          <span aria-hidden="true">/</span>
          <router-link to="/catalog/">Catalogue</router-link>
          <span aria-hidden="true">/</span>
          <span class="text-ink-2">{{ device.shortName }}</span>
        </nav>

        <div class="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <!-- text column -->
          <div class="min-w-0 max-lg:order-2">
            <span class="mlabel mb-[0.9rem] block">
              <span class="text-amber">{{ device.year }}</span> · {{ FAMILY_LABEL[device.family] }} · {{ device.maker }}
            </span>
            <h1 class="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] font-bold tracking-[-0.03em]">{{ device.name }}</h1>
            <p class="mt-[0.9rem] max-w-[56ch] text-[1.06rem] text-ink-2">{{ device.tagline }}</p>
            <div class="mt-[1.1rem] flex flex-wrap items-center gap-x-4 gap-y-[0.6rem]">
              <StatusBadge :status="device.pocket.status" />
              <PathBadge :path="device.pocket.path" />
              <a
                v-if="device.pocket.hostDir"
                class="group font-mono text-[0.7rem] text-muted hover:text-cyan"
                :href="githubTreeUrl(device.pocket.hostDir)"
                target="_blank"
                rel="noreferrer"
                ><code class="text-ink-2 group-hover:text-cyan">{{ device.pocket.hostDir }}/</code> ↗</a
              >
            </div>
            <div class="prose-code mt-6 max-w-[62ch] text-ink-2 [&_p+p]:mt-[0.9rem]">
              <p v-for="(p, i) in device.plaque" :key="i" v-html="inlineCode(p)"></p>
            </div>
            <dl class="mt-7 grid grid-cols-1 gap-px border border-line-2 bg-line-2 min-[521px]:grid-cols-3">
              <div
                v-for="h in [
                  ['Processor', device.headline.cpu],
                  ['Memory', device.headline.memory],
                  ['Display', device.headline.display],
                ]"
                :key="h[0]"
                class="flex min-w-0 flex-col gap-1 bg-panel px-[0.9rem] py-3"
              >
                <dt class="mlabel">{{ h[0] }}</dt>
                <dd class="font-mono text-[0.86rem] text-ink [overflow-wrap:anywhere]">{{ h[1] }}</dd>
              </div>
            </dl>
          </div>

          <!-- vitrine -->
          <figure class="max-lg:order-1 lg:sticky lg:top-[4.6rem]">
            <div
              class="relative overflow-hidden border border-line-2 bg-grid-sm"
              :class="(device.hero.fit ?? 'contain') === 'contain' ? 'aspect-[4/3]' : ''"
            >
              <img
                :src="device.hero.src"
                :alt="device.hero.alt"
                :width="device.hero.width"
                :height="device.hero.height"
                fetchpriority="high"
                decoding="async"
                class="w-full object-contain"
                :class="
                  (device.hero.fit ?? 'contain') === 'contain' ? 'h-full p-[clamp(1rem,3vw,2rem)]' : 'h-auto max-h-[34rem]'
                "
              />
            </div>
            <figcaption class="mt-2.5 flex flex-col gap-[0.2rem] text-[0.78rem] text-muted [&_a]:text-ink-2 [&_a:hover]:text-cyan">
              <span>{{ device.hero.alt }}.</span>
              <span>
                Photo:
                <a v-if="device.hero.credit.sourceUrl" :href="device.hero.credit.sourceUrl" target="_blank" rel="noreferrer">{{
                  device.hero.credit.author
                }}</a>
                <template v-else>{{ device.hero.credit.author }}</template>
                ·
                <a v-if="device.hero.credit.licenseUrl" :href="device.hero.credit.licenseUrl" target="_blank" rel="noreferrer">{{
                  device.hero.credit.license
                }}</a>
                <template v-else>{{ device.hero.credit.license }}</template>
                <template v-if="device.hero.credit.note"> · {{ device.hero.credit.note }}</template>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ── hardware ─────────────────────────────────────────────────────── -->
    <section class="sect" id="hardware">
      <div class="wrap">
        <SectionHead index="01" title="Hardware" label="curated here · sources below" />
        <SpecSheet :groups="device.hardware" />
      </div>
    </section>

    <!-- ── pocketjs ─────────────────────────────────────────────────────── -->
    <section class="sect" id="pocketjs">
      <div class="wrap">
        <SectionHead index="02" title="PocketJS on this machine" :label="PATH_LABEL[device.pocket.path]" />
        <div class="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div class="min-w-0">
            <h3 :class="subHead">What runs</h3>
            <p class="prose-code text-[0.95rem] leading-[1.65] text-ink-2" v-html="inlineCode(device.pocket.summary)"></p>
            <h3 :class="subHead">What is proven</h3>
            <p class="prose-code text-[0.95rem] leading-[1.65] text-ink-2" v-html="inlineCode(device.pocket.evidence)"></p>
            <template v-if="device.pocket.milestones.length">
              <h3 :class="subHead">Record</h3>
              <MilestoneList :milestones="device.pocket.milestones" />
            </template>
          </div>
          <div class="lg:sticky lg:top-[4.6rem]">
            <ProfileCard :device="device" />
          </div>
        </div>

        <template v-if="device.pocket.stories.length">
          <h3 class="mt-10 mb-4"><span class="mlabel">Acquisition reports</span></h3>
          <StoryList :slugs="device.pocket.stories" />
        </template>
      </div>
    </section>

    <!-- ── gallery ──────────────────────────────────────────────────────── -->
    <section v-if="device.gallery.length" class="sect" id="gallery">
      <div class="wrap">
        <SectionHead index="03" title="On the machine" label="captures from the upstream record" />
        <GalleryGrid :images="device.gallery" />
      </div>
    </section>

    <!-- ── example code ─────────────────────────────────────────────────── -->
    <section v-if="primaryCode" class="sect" id="code">
      <div class="wrap">
        <SectionHead
          :index="device.gallery.length ? '04' : '03'"
          title="Example code"
          label="upstream source · highlighted at build time"
        />
        <CodeViewer :files="codeRefs" :initial="primaryCode" :load="loadCode" />
      </div>
    </section>

    <!-- ── bring-up guide ───────────────────────────────────────────────── -->
    <section class="sect" id="guide">
      <div class="wrap">
        <SectionHead :index="guideIndex" title="Bring-up guide" label="upstream documents · rendered verbatim" />
        <p class="mb-6 max-w-[62ch] text-[1.06rem] text-ink-2">
          Toolchain, build, deploy and acceptance are owned by
          <a class="text-cyan hover:underline" href="https://github.com/pocket-stack/pocketjs" target="_blank" rel="noreferrer"
            >pocket-stack/pocketjs</a
          >. The documents below are rendered from the pinned checkout without edits; relative links point back into
          the repository at the same revision.
        </p>
        <DocViewer v-if="primaryDoc" :docs="docRefs" :initial="primaryDoc" :load="loadDoc" />
        <div v-else class="border border-line-2 bg-panel p-6">
          <span class="mlabel">No upstream bring-up document is referenced for this exhibit yet.</span>
        </div>
        <p v-if="missingDocs.length" class="mlabel mt-3 text-rose">
          Not in this build's glob list: {{ missingDocs.map((d) => d.path).join(", ") }}
        </p>
      </div>
    </section>

    <!-- ── sources & neighbours ─────────────────────────────────────────── -->
    <section class="sect border-b-0" id="sources">
      <div class="wrap">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-12 gap-y-6 border-b border-dashed border-line-2 pb-8">
          <div>
            <span class="mlabel">Hardware sources</span>
            <ul class="mt-2 text-[0.86rem] [&_a]:text-ink-2 [&_a:hover]:text-cyan [&_li+li]:mt-1.5">
              <li v-for="s in device.sources" :key="s.url">
                <a :href="s.url" target="_blank" rel="noreferrer">{{ s.label }} ↗</a>
              </li>
            </ul>
          </div>
          <div>
            <span class="mlabel">Photo</span>
            <p class="mt-2 text-[0.86rem] text-ink-2">
              {{ device.hero.credit.source }}<template v-if="device.hero.credit.author"> — {{ device.hero.credit.author }}</template>,
              {{ device.hero.credit.license }}.
              <template v-if="device.hero.credit.note">{{ device.hero.credit.note }}</template>
            </p>
          </div>
        </div>

        <nav class="mt-8 flex flex-col justify-between gap-4 min-[521px]:flex-row" aria-label="Other exhibits">
          <router-link v-if="prev" :to="devicePath(prev.slug)" :class="neighbour">
            <span class="mlabel">← Previous</span>
            <span class="font-semibold text-ink">{{ prev.shortName }}</span>
            <span class="font-mono text-[0.68rem] text-amber">{{ prev.year }}</span>
          </router-link>
          <span v-else></span>
          <router-link
            v-if="next"
            :to="devicePath(next.slug)"
            :class="[neighbour, 'min-[521px]:items-end min-[521px]:text-right']"
          >
            <span class="mlabel">Next →</span>
            <span class="font-semibold text-ink">{{ next.shortName }}</span>
            <span class="font-mono text-[0.68rem] text-amber">{{ next.year }}</span>
          </router-link>
        </nav>
      </div>
    </section>
  </template>
</template>
